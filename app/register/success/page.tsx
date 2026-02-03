"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  CheckCircle2, Users, Mail, Phone, Utensils, 
  Hash, Calendar, Download, Share2, Home, 
  MessageCircle, Loader2 
} from "lucide-react";
import Link from "next/link";

import { jsPDF } from "jspdf"; // Import jsPDF

export default function RegistrationSuccessPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const [team, setTeam] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const dataString = searchParams.get("team_data");
    if (dataString) {
      try {
        setTeam(JSON.parse(dataString));
      } catch (e) {
        console.error("Failed to parse team data", e);
      }
    }
  }, [searchParams]);

  if (!team) return <LoadingState />;

  const registrationDate = new Date(team.created_at).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(`${team.team_number}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- NEW: RECEIPT GENERATION LOGIC ---
  const handleDownloadReceipt = () => {
    const doc = new jsPDF();
    const margin = 20;
    
    // Background & Header
    doc.setFillColor(2, 6, 23); // #020617 (Dark Navy)
    doc.rect(0, 0, 210, 297, 'F');
    
    doc.setTextColor(34, 211, 238); // Cyan
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text("SINOVA '26", margin, 30);
    
    doc.setFontSize(10);
    doc.setFont("courier", "normal");
    doc.text("OFFICIAL REGISTRATION RECEIPT", margin, 38);
    
    // Horizontal Line
    doc.setDrawColor(255, 255, 255, 0.1);
    doc.line(margin, 45, 190, 45);

    // Team ID Highlight
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(`TEAM ID: #${team.team_number}`, margin, 60);
    doc.setFontSize(22);
    doc.text(team.team_name.toUpperCase(), margin, 70);

    // Registration Details Table-like structure
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("DATE:", margin, 85);
    doc.text("STATUS:", 80, 85);
    doc.text("TXN ID:", 140, 85);

    doc.setTextColor(255, 255, 255);
    doc.text(registrationDate, margin, 92);
    doc.text(team.payment_status.toUpperCase(), 80, 92);
    doc.text(team.transaction_id || "N/A", 140, 92);

    // Members Section
    doc.setFontSize(12);
    doc.setTextColor(34, 211, 238);
    doc.text("TEAM MEMBERS", margin, 110);
    
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    let yPos = 120;
    team.members.forEach((m: any, i: number) => {
      doc.text(`${i + 1}. ${m.name} (${m.mealPreference})`, margin, yPos);
      doc.setTextColor(150, 150, 150);
      doc.text(`   ${m.email} | ${m.phone}`, margin, yPos + 5);
      doc.setTextColor(255, 255, 255);
      yPos += 15;
    });

    // Footer Note
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("Please present this digital receipt at the venue for verification.", margin, 270);
    doc.text("SCMS School of Technology and Management", margin, 275);

    // Save PDF
    doc.save(`SINOVA_Receipt_Team_${team.team_number}.pdf`);
  };
  // -------------------------------------

  return (
    <main className="relative min-h-screen bg-[#020617] text-white py-24 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute top-[-5%] right-[-5%] h-[600px] w-[600px] rounded-full bg-cyan-600/10 blur-[130px]" />
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Success Banner */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="relative bg-green-500/20 p-6 rounded-full border-2 border-green-500/30 animate-pulse">
              <CheckCircle2 size={64} className="text-green-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter">
            <span className="text-green-400">REGISTRATION</span><br />SUCCESSFUL!
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Welcome to SINOVA'26! Your team details are secured in our database.
          </p>
        </div>

        {/* Team Number Card */}
        <div className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-10 backdrop-blur-xl text-center shadow-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <Hash size={16} className="text-cyan-400" />
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Official Team ID</span>
          </div>
          <p className="text-7xl md:text-8xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
            #{team.team_number}
          </p>
          <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">{team.team_name}</h2>
          
          <button onClick={handleCopy} className="flex items-center gap-2 mx-auto px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
            {copied ? <span className="text-green-400 font-bold">Copied ID!</span> : <><Share2 size={16} /> <span>Copy Team ID</span></>}
          </button>
        </div>

        {/* Team Details Section */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DetailCard label="Registered On" value={registrationDate} icon={<Calendar size={18} />} />
            <DetailCard label="Team Size" value={`${team.members.length} Members`} icon={<Users size={18} />} />
            <DetailCard 
                label="Status" 
                value={team.payment_status.toUpperCase()} 
                icon={<CheckCircle2 size={18} />} 
                color={team.is_waitlist ? "text-orange-400" : "text-green-400"} 
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest ml-1">Member Roster</h3>
            {team.members.map((m: any, i: number) => (
              <div key={i} className="p-5 rounded-2xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-bold">{m.name} {i === 0 && <span className="text-[9px] bg-blue-500 px-2 py-0.5 rounded ml-2 text-white">LEAD</span>}</p>
                    <p className="text-xs text-gray-500 font-mono">{m.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Phone size={12}/> {m.phone}</span>
                  <span className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full"><Utensils size={12}/> {m.mealPreference}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={handleDownloadReceipt}
            className="py-5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            <Download size={20} /> DOWNLOAD RECEIPT
          </button>
          <Link href="/" className="py-5 bg-white/5 border border-white/10 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
            <Home size={20} /> BACK TO HOME
          </Link>
        </div>
      </div>
    </main>
  );
}
function DetailCard({ label, value, icon, color = "text-white" }: any) {
  return (
    <div className="p-5 rounded-2xl bg-black/20 border border-white/5">
      <p className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-2">
        {icon} {label}
      </p>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-4">
      <Loader2 size={48} className="text-cyan-400 animate-spin" />
      <p className="text-gray-500 font-mono text-sm animate-pulse">RETRIVING TEAM DATA...</p>
    </div>
  );
}