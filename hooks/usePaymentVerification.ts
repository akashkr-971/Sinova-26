// hooks/usePaymentVerification.ts
import { useState } from 'react';
import Tesseract from 'tesseract.js';
import { supabase } from '@/lib/supabase'; // 1. Import Supabase

interface VerificationResult {
  status: 'VERIFIED' | 'REVIEW' | 'REJECTED';
  confidence: number;
  details: {
    amountFound: boolean;
    transactionIds: string[];
    successStatus: boolean;
    upiAppDetected: boolean;
    dateFound: boolean;
  };
  recommendations: string[];
  imageHash: string;
}

export function usePaymentVerification() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Generates a unique digital fingerprint of the image
  const calculateImageHash = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  // 2. NEW: Check Supabase for duplicates instead of localStorage
  const checkDatabaseForDuplicate = async (hash: string): Promise<boolean> => {
    const { data, error } = await supabase
      .from('teams')
      .select('team_number')
      .eq('payment_hash', hash)
      .maybeSingle(); // Returns null if not found, doesn't throw error

    if (error) {
      console.error("Database check failed:", error);
      return false;
    }
    return !!data; // Returns true if a team already used this hash
  };

  const extractTextFromImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      Tesseract.recognize(file, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        },
      })
        .then(({ data: { text } }) => {
          resolve(text);
        })
        .catch(reject);
    });
  };

  const verifyPaymentDetails = (ocrText: string): VerificationResult['details'] => {
    const textLower = ocrText.toLowerCase();
    
    // Pattern for ₹400 (Adjusted for SINOVA pricing)
    const amountPatterns = [/₹\s*400/i, /rs\.?\s*400/i, /400\.00/i, /400\/-/i];
    const amountFound = amountPatterns.some(pattern => pattern.test(textLower));

    const transactionIdPatterns = [/\d{12,16}/g, /[A-Z0-9]{10,20}/g, /utr[:\s]*\d+/gi];
    const transactionIds: string[] = [];
    transactionIdPatterns.forEach(pattern => {
      const matches = ocrText.match(pattern);
      if (matches) transactionIds.push(...matches);
    });
    
    const uniqueIds = [...new Set(transactionIds)].slice(0, 3);
    const successKeywords = ['success', 'successful', 'completed', 'paid', 'sent'];
    const successStatus = successKeywords.some(keyword => textLower.includes(keyword));
    const upiApps = ['gpay', 'google pay', 'phonepe', 'paytm', 'bhim', 'upi'];
    const upiAppDetected = upiApps.some(app => textLower.includes(app));
    const dateFound = /\d{1,2}[-/]\d{1,2}[-/]\d{2,4}/.test(ocrText);

    return { amountFound, transactionIds: uniqueIds, successStatus, upiAppDetected, dateFound };
  };

  const verifyPayment = async (file: File, teamName: string): Promise<VerificationResult> => {
    setIsVerifying(true);
    setProgress(0);

    try {
      // Step 1: Digital Fingerprinting
      setProgress(10);
      const imageHash = await calculateImageHash(file);
      
      // Step 2: Global Duplicate Check (Supabase)
      setProgress(20);
      const isDuplicate = await checkDatabaseForDuplicate(imageHash);
      if (isDuplicate) {
        setIsVerifying(false);
        return {
          status: 'REJECTED',
          confidence: 0,
          details: { amountFound: false, transactionIds: [], successStatus: false, upiAppDetected: false, dateFound: false },
          recommendations: ['This screenshot has already been used by another team in the SINOVA database.'],
          imageHash,
        };
      }

      // Step 3: OCR Analysis
      setProgress(30);
      const ocrText = await extractTextFromImage(file);

      // Step 4: Verification Logic
      setProgress(90);
      const details = verifyPaymentDetails(ocrText);
      
      let score = 0;
      if (details.amountFound) score += 35;
      if (details.transactionIds.length > 0) score += 30;
      if (details.successStatus) score += 20;
      if (details.upiAppDetected) score += 15;

      const recommendations = [];
      if (!details.amountFound) recommendations.push("Amount (₹400) not detected.");
      if (details.transactionIds.length === 0) recommendations.push("UTR/Transaction ID not found.");

      let status: 'VERIFIED' | 'REVIEW' | 'REJECTED';
      if (score >= 70) status = 'VERIFIED';
      else if (score >= 40) status = 'REVIEW';
      else status = 'REJECTED';

      setProgress(100);
      setIsVerifying(false);
      return { status, confidence: score, details, recommendations, imageHash };

    } catch (error) {
      console.error('Verification error:', error);
      setIsVerifying(false);
      return {
        status: 'REJECTED',
        confidence: 0,
        details: { amountFound: false, transactionIds: [], successStatus: false, upiAppDetected: false, dateFound: false },
        recommendations: ['Error processing image. Please try again.'],
        imageHash: '',
      };
    }
  };

  return { verifyPayment, isVerifying, progress };
}