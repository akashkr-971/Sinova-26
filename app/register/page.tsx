"use client";

import { useState, useMemo, useEffect } from "react";
import { User, Users, ShieldCheck, Utensils, CreditCard, ClipboardList, AlertTriangle, Upload, AlertCircle, CheckCircle2, Loader2, Link } from "lucide-react";
import Image from "next/image";
import { usePaymentVerification } from "../../hooks/usePaymentVerification"
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import imageCompression from 'browser-image-compression';
import NextLink from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [teamSize, setTeamSize] = useState(2);
  const [registeredTeams, setRegisteredTeams] = useState(0);
  const maxTeams = 20;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [duplicateError, setDuplicateError] = useState<{show: boolean, msg: string}>({ show: false, msg: "" });
  
  const { verifyPayment, isVerifying, progress } = usePaymentVerification();

  const isWaitlist = registeredTeams >= maxTeams;
  const registrationProgress = useMemo(() => (registeredTeams / maxTeams) * 100, [registeredTeams]);

  // Sync count with database on load and in real-time
  useEffect(() => {
    const fetchTeamCount = async () => {
      try {
        const { count, error } = await supabase
          .from('teams')
          .select('*', { count: 'exact', head: true })
          .eq('is_waitlist', false);

        if (error) throw error;
        if (count !== null) setRegisteredTeams(count);
      } catch (err) {
        console.error("Error fetching team count:", err);
      }
    };

    fetchTeamCount();

    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'teams' }, () => fetchTeamCount())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;
    
    const teamName = formData.get("teamName") as string;
    if (!teamName || teamName.length < 3) {
      newErrors["teamName"] = "Team name must be at least 3 characters.";
      isValid = false;
    }

    for (let i = 0; i < teamSize; i++) {
      const name = formData.get(`member${i}_name`) as string;
      const email = formData.get(`member${i}_email`) as string;
      const phone = formData.get(`member${i}_phone`) as string;
      if (!name) newErrors[`member${i}_name`] = "Name is required.";
      if (!email || !emailRegex.test(email)) {
        newErrors[`member${i}_email`] = "Enter a valid email address.";
        isValid = false;
      }
      const cleanPhone = phone?.replace(/[\s-]/g, "");
      if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
        newErrors[`member${i}_phone`] = "Enter a valid 10-digit mobile number.";
        isValid = false;
      }
    }

    if (!isWaitlist) {
      if (!uploadedFile) {
        newErrors["paymentProof"] = "You must upload the payment screenshot.";
        isValid = false;
      } else if (!verificationResult || (verificationResult.status !== 'VERIFIED' && verificationResult.status !== 'REVIEW')) {
        newErrors["paymentProof"] = "Please verify your payment screenshot first.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setVerificationResult(null);
      setErrors(prev => ({ ...prev, paymentProof: '' }));
    }
  };

  const handleVerifyPayment = async () => {
    if (!uploadedFile) return;
    const teamName = (document.querySelector('input[name="teamName"]') as HTMLInputElement)?.value;
    if (!teamName) {
      setErrors(prev => ({ ...prev, teamName: "Please enter team name first" }));
      return;
    }
    const result = await verifyPayment(uploadedFile, teamName);
    setVerificationResult(result);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  const formData = new FormData(e.currentTarget);
  const pHash = verificationResult?.imageHash || null;
  const transactionId = verificationResult?.details?.transactionIds?.[0] || null;

  if (validateForm(formData)) {
    try {
      // 1. ATOMIC SYNC: Re-check actual count right before insert to prevent overbooking
      const { count: latestCount } = await supabase
        .from('teams')
        .select('*', { count: 'exact', head: true })
        .eq('is_waitlist', false);
      
      const finalCount = latestCount || 0;
      const currentIsWaitlist = finalCount >= maxTeams;
      const teamName = formData.get("teamName") as string;
      
      // Calculate next sequential number (only for confirmed teams)
      const nextNumber = currentIsWaitlist ? null : finalCount + 1;

      // 2. DUPLICATE CHECK: Verify Transaction ID (UTR) doesn't exist in DB
      if (transactionId) {
        const { data: existingTxn } = await supabase
          .from('teams')
          .select('team_number')
          .eq('transaction_id', transactionId)
          .maybeSingle();

        if (existingTxn) {
          setDuplicateError({ 
            show: true, 
            msg: "This Transaction ID (UTR) has already been used by another team!" 
          });
          setIsSubmitting(false);
          return;
        }
      }

      let publicUrl = null;

      // 3. IMAGE COMPRESSION & STORAGE UPLOAD
      if (!currentIsWaitlist && uploadedFile) {
        // Options for compression (Target < 1MB for safety, well under your 2MB limit)
        const options = {
          maxSizeMB: 0.8,           // Aim for ~800KB
          maxWidthOrHeight: 1920,  // Keep resolution high for manual verification
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(uploadedFile, options);
        
        // Define path: e.g., proofs/5_Team_Name.jpg
        const fileExt = uploadedFile.name.split('.').pop();
        const fileName = `${currentIsWaitlist ? 'WL' : nextNumber}_${teamName.replace(/\s+/g, '_')}_${Date.now()}.${fileExt}`;
        const filePath = `proofs/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('payment-proofs')
          .upload(filePath, compressedFile);

        if (uploadError) throw uploadError;

        // Get the accessible URL
        const { data: urlData } = supabase.storage
          .from('payment-proofs')
          .getPublicUrl(filePath);
        
        publicUrl = urlData.publicUrl;
      }

      // 4. DATABASE INSERTION
      const members = Array.from({ length: teamSize }).map((_, i) => ({
        name: formData.get(`member${i}_name`),
        email: formData.get(`member${i}_email`),
        phone: formData.get(`member${i}_phone`),
        mealPreference: formData.get(`member${i}_meal`),
      }));

      const { data, error } = await supabase
        .from('teams')
        .insert([{
          team_number: nextNumber,
          team_name: teamName,
          members: members,
          payment_hash: pHash,
          transaction_id: transactionId,
          payment_proof_url: publicUrl,
          payment_status: currentIsWaitlist ? 'waitlisted' : 'confirmed',
          is_waitlist: currentIsWaitlist
        }])
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          setDuplicateError({ show: true, msg: "Payment screenshot already used." });
        } else throw error;
      } else {
        // 5. REDIRECT TO SUCCESS
        const params = new URLSearchParams({ team_data: JSON.stringify(data) });
        router.push(`/register/success?${params.toString()}`);
      }

    } catch (err) {
      console.error("Submission Error:", err);
      alert("Registration failed. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  } else {
    setIsSubmitting(false);
    document.querySelector(".text-red-500")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

  return (
    <main className="relative min-h-screen bg-[#020617] text-white py-24 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute top-[-5%] left-[-5%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[130px]" />
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Registration Progress Bar */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-cyan-400">
                SINOVA<span className="text-white">'26</span>
              </h1>
              <p className="text-gray-400 text-sm font-mono tracking-widest uppercase mt-2">Registration Status</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-white">{registeredTeams}/{maxTeams}</span>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Teams Joined</p>
            </div>
          </div>
          <div className="h-3 w-full bg-white/5 rounded-full border border-white/10 overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(34,211,238,0.5)] ${isWaitlist ? 'bg-orange-500' : 'bg-gradient-to-r from-blue-600 to-cyan-400'}`}
              style={{ width: `${Math.min(registrationProgress, 100)}%` }}
            />
          </div>
          {isWaitlist && (
            <div className="flex items-center justify-center gap-2 text-orange-500 bg-orange-500/10 py-2 rounded-lg border border-orange-500/20 animate-pulse">
              <AlertTriangle size={16} />
              <p className="text-[10px] font-bold uppercase tracking-widest">Waitlist Active: No Payment Required Now</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-10 mt-4">
          
          {/* SECTION 1: TEAM DATA */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-md space-y-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4 text-cyan-400">
              <ClipboardList size={24} />
              <h2 className="text-xl font-bold uppercase tracking-wider mb-1">Step 1: Enter Team Details</h2>
            </div>
            
            <div className="grid grid-cols-1 mt-2 md:grid-cols-2 gap-6">
              <InputField 
                label="Team Name" 
                icon={<ShieldCheck size={18} />} 
                placeholder="e.g. Neural Ninjas" 
                name="teamName" 
                error={errors.teamName}
              />
              
              <div className="relative group w-full">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1 flex items-center gap-2 mb-3">
                  <Users size={16} className="text-blue-500" /> Team Size (2-4 Members)
                </label>
                <div className="relative">
                  <select 
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer text-sm font-medium text-white hover:bg-black/80 hover:border-white/20"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                  >
                    <option value={2} className="bg-[#020617] text-white">2 Members</option>
                    <option value={3} className="bg-[#020617] text-white">3 Members</option>
                    <option value={4} className="bg-[#020617] text-white">4 Members</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Dynamic Member Fields */}
            <div className="space-y-10 pt-4">
              {Array.from({ length: teamSize }).map((_, index) => (
                <div key={index} className="p-6 rounded-2xl bg-black/20 border border-white/5 space-y-6 mt-2">
                  <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                    <User size={16} /> {index === 0 ? "Team Leader" : `Member ${index + 1}`}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputField 
                      label="Name" 
                      placeholder="Full Name" 
                      name={`member${index}_name`} 
                      error={errors[`member${index}_name`]}
                    />
                    <InputField 
                      label="Email" 
                      type="email" 
                      placeholder="email@gmail.com" 
                      name={`member${index}_email`} 
                      error={errors[`member${index}_email`]}
                    />
                    <InputField 
                      label="Phone" 
                      placeholder="+91 ..." 
                      name={`member${index}_phone`} 
                      error={errors[`member${index}_phone`]}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2 mb-1">
                      <Utensils size={14} /> Meal Preference
                    </label>
                    <div className="flex gap-6">
                      {["Veg", "Non-Veg"].map((pref) => (
                        <label key={pref} className="flex items-center gap-2 cursor-pointer group">
                          <input 
                            type="radio" 
                            name={`member${index}_meal`} 
                            value={pref} 
                            defaultChecked={pref === "Non-Veg"}
                            className="w-4 h-4 accent-cyan-400 bg-black/40 border-white/10" 
                          />
                          <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{pref}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {isWaitlist && (
              <div className="pt-6 mt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white p-4 text-black font-black italic py-5 rounded-2xl transition-all shadow-[0_0_30px_rgba(234,88,12,0.4)] active:scale-95 disabled:opacity-70"
                >
                  {isSubmitting ? "VALIDATING..." : "JOIN WAITLIST (NO PAYMENT)"}
                </button>
              </div>
            )}
          </section>

          {/* PAYMENT & UPLOAD */}
          {!isWaitlist && (
            <>
              {/* SECTION 2: PAYMENT */}
              <section className="bg-white/5 border border-white/10 rounded-3xl p-8 mt-4 md:p-10 backdrop-blur-md space-y-8">
                <div className="flex items-center gap-3 border-b border-white/10 mb-4 text-cyan-400">
                  <CreditCard size={24} />
                  <h2 className="text-xl font-bold uppercase tracking-wider">Step 2: Payment</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <p className="text-gray-400 text-sm uppercase tracking-widest">Entry Fee</p>
                      <p className="text-5xl font-black text-white italic">₹400</p>
                      <p className="text-xs text-blue-400 font-mono tracking-tighter">PER TEAM (NOT PER HEAD)</p>
                    </div>
                    <ul className="space-y-3 text-xs text-gray-400">
                      <li className="flex items-center gap-2">• Scan the QR code shown here</li>
                      <li className="flex items-center gap-2">• Pay via any UPI App (GPay or PhonePe)</li>
                      <li className="flex items-center gap-2"><span>•</span><p className="text-white underline">Must take a screenshot after payment</p></li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-3xl flex flex-col items-center gap-3 w-fit mx-auto shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    <Image 
                      src="/sinova-logo.png" 
                      alt="Payment QR Code" 
                      width={220} 
                      height={220}
                      className="rounded-xl object-cover object-bottom h-48"
                    />
                    <div className="bg-blue-600 px-4 py-1 rounded-full">
                      <p className="text-white font-black text-[10px] uppercase tracking-tighter">Official SINOVA'26 UPI</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 3: PROOF UPLOAD WITH VERIFICATION */}
              <section className="bg-white/5 border border-white/10 rounded-3xl mt-4 p-8 md:p-10 backdrop-blur-md space-y-8">
                <div className="flex items-center mb-2 gap-3 border-b border-white/10 pb-4 text-cyan-400">
                  <Upload size={24} />
                  <h2 className="text-xl font-bold uppercase tracking-wider">Step 3: Payment Proof & Verification</h2>
                </div>
                
                <div className="space-y-6">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Upload Transaction Screenshot</label>
                  
                  <div className={`group relative border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer bg-black/20 
                    ${errors.paymentProof 
                      ? "border-red-500/50 bg-red-500/5 hover:border-red-500" 
                      : verificationResult?.status === 'VERIFIED'
                      ? "border-green-500/50 bg-green-500/5"
                      : "border-white/10 hover:border-cyan-400/50"
                    }`}
                  >
                    <input 
                      type="file" 
                      name="paymentProof"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      accept="image/jpeg,image/png,image/jpg"
                    />
                    
                    <div className={`p-4 rounded-full mb-4 transition-transform group-hover:scale-110 
                      ${errors.paymentProof 
                        ? "bg-red-500/10 text-red-500" 
                        : verificationResult?.status === 'VERIFIED'
                        ? "bg-green-500/10 text-green-500"
                        : "bg-cyan-400/10 text-cyan-400"
                      }`}>
                      {verificationResult?.status === 'VERIFIED' ? <CheckCircle2 size={32} /> : <Upload size={32} />}
                    </div>
                    
                    <p className={`text-sm font-bold ${errors.paymentProof ? "text-red-400" : verificationResult?.status === 'VERIFIED' ? "text-green-400" : "text-gray-300"}`}>
                      {uploadedFile ? uploadedFile.name : "Drop screenshot here or click to browse"}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-2 uppercase">Supports: JPG, PNG (Max 5MB)</p>
                  </div>

                  {errors.paymentProof && (
                    <p className="text-[10px] text-red-400 font-medium ml-1 animate-in slide-in-from-top-1">
                      {errors.paymentProof}
                    </p>
                  )}

                  {/* Verification Button */}
                  {uploadedFile && !verificationResult && (
                    <button
                      type="button"
                      onClick={handleVerifyPayment}
                      disabled={isVerifying}
                      className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Verifying Payment... {progress}%
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={20} />
                          Verify Payment Screenshot
                        </>
                      )}
                    </button>
                  )}

                  {/* Progress Bar */}
                  {isVerifying && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Processing screenshot...</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-600 to-blue-600 transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Verification Result */}
                  {verificationResult && (
                    <div className={`p-6 rounded-2xl border-2 ${
                      verificationResult.status === 'VERIFIED'
                        ? 'bg-green-500/10 border-green-500/30'
                        : verificationResult.status === 'REVIEW'
                        ? 'bg-orange-500/10 border-orange-500/30'
                        : 'bg-red-500/10 border-red-500/30'
                    }`}>
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full ${
                          verificationResult.status === 'VERIFIED'
                            ? 'bg-green-500/20'
                            : verificationResult.status === 'REVIEW'
                            ? 'bg-orange-500/20'
                            : 'bg-red-500/20'
                        }`}>
                          {verificationResult.status === 'VERIFIED' ? (
                            <CheckCircle2 size={24} className="text-green-400" />
                          ) : (
                            <AlertCircle size={24} className={verificationResult.status === 'REVIEW' ? 'text-orange-400' : 'text-red-400'} />
                          )}
                        </div>
                        <div className="flex-1 space-y-3">
                          <div>
                            <h4 className={`font-bold text-lg ${
                              verificationResult.status === 'VERIFIED'
                                ? 'text-green-400'
                                : verificationResult.status === 'REVIEW'
                                ? 'text-orange-400'
                                : 'text-red-400'
                            }`}>
                              {verificationResult.status === 'VERIFIED' ? '✓ Payment Verified!' : 
                               verificationResult.status === 'REVIEW' ? '⚠ Needs Manual Review' : 
                               '✗ Verification Failed'}
                            </h4>
                            <p className="text-sm text-gray-400 mt-1">
                              Confidence Score: {verificationResult.confidence}/100
                            </p>
                          </div>

                          {verificationResult.details && (
                            <div className="grid grid-cols-2 gap-3 text-xs">
                              <div className={verificationResult.details.amountFound ? 'text-green-400' : 'text-red-400'}>
                                {verificationResult.details.amountFound ? '✓' : '✗'} Amount (₹400)
                              </div>
                              <div className={verificationResult.details.successStatus ? 'text-green-400' : 'text-red-400'}>
                                {verificationResult.details.successStatus ? '✓' : '✗'} Success Status
                              </div>
                              <div className={verificationResult.details.upiAppDetected ? 'text-green-400' : 'text-red-400'}>
                                {verificationResult.details.upiAppDetected ? '✓' : '✗'} UPI App
                              </div>
                              <div className={verificationResult.details.transactionIds?.length > 0 ? 'text-green-400' : 'text-red-400'}>
                                {verificationResult.details.transactionIds?.length > 0 ? '✓' : '✗'} Transaction ID
                              </div>
                            </div>
                          )}

                          {verificationResult.recommendations && verificationResult.recommendations.length > 0 && (
                            <div className="pt-3 border-t border-white/10">
                              <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Recommendations:</p>
                              <ul className="space-y-1 text-xs text-gray-400">
                                {verificationResult.recommendations.map((rec: string, idx: number) => (
                                  <li key={idx}>• {rec}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {verificationResult.status !== 'VERIFIED' && (
                            <button
                              type="button"
                              onClick={() => {
                                setUploadedFile(null);
                                setVerificationResult(null);
                              }}
                              className="text-xs text-cyan-400 hover:text-cyan-300 underline"
                            >
                              Upload different screenshot
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-400 -mt-6">
                    If you are unable to verify the payment screenshot, please reach out to our 
                    student coordinators via{" "}
                    <NextLink 
                      href="/contact" 
                      className="text-cyan-400 hover:text-white underline underline-offset-4 transition-colors font-medium"
                    >
                      WhatsApp or Email
                    </NextLink>
                  </p>
                </div>
                <div className="pt-6 mt-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting || !verificationResult || verificationResult.status !== 'VERIFIED' && verificationResult.status !== 'REVIEW'}
                    className="w-full bg-blue-600 p-4 hover:bg-white hover:text-black text-white font-black italic py-5 rounded-2xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale"
                  >
                    {isSubmitting ? "SUBMITTING..." : "COMPLETE REGISTRATION"}
                  </button>
                </div>
              </section>
            </>
          )}
        </form>
      </div>
      {duplicateError.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/80 animate-in fade-in duration-300">
          <div className="max-w-md w-full bg-[#020617] border-2 border-red-500/50 rounded-3xl p-8 space-y-6 shadow-[0_0_50px_rgba(239,68,68,0.2)] text-center relative overflow-hidden">
            {/* Background Warning Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_center,red_0,transparent_100%)]" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-red-500/10 border-2 border-red-500/50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500 animate-pulse">
                <AlertCircle size={40} />
              </div>
              
              <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">
                Duplicate <span className="text-red-500">Hash Detected</span>
              </h3>
              
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 mt-4 text-xs font-mono text-red-400 leading-relaxed">
                [SYSTEM_ERROR]: THE PROVIDED PAYMENT SCREENSHOT HAS ALREADY BEEN INDEXED IN OUR DATABASE BY ANOTHER TEAM. 
                REUSE OF TRANSACTION PROOF IS STRICTLY PROHIBITED.
              </div>

              <button 
                onClick={() => setDuplicateError({ show: false, msg: "" })}
                className="w-full mt-8 bg-red-600 hover:bg-white text-white hover:text-black py-4 rounded-2xl font-black italic transition-all uppercase tracking-widest text-sm"
              >
                Acknowledge & Re-upload
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function InputField({ label, icon, placeholder, name, type = "text", error }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 flex items-center gap-2">
          {icon} {label}
        </label>
      </div>
      
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={`w-full bg-black/40 border rounded-xl px-5 py-4 outline-none transition-all text-sm placeholder:text-gray-700
            ${error ? 'border-red-500/50 focus:border-red-500 bg-red-500/5' : 'border-white/10 focus:border-blue-500'}`}
        />
        {error && (
          <div className="mt-2 text-red-500 flex items-center gap-2">
            <AlertCircle size={14} />
            <p className="text-[10px] text-red-400 font-medium">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}