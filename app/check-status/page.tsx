"use client";

import { useState } from "react";
import { Search, Loader2, CheckCircle2, Clock, ShieldCheck, Activity, Terminal, Fingerprint } from "lucide-react";

type StatusResult = {
  teamId: string;
  teamName: string;
  leaderName: string;
  paymentStatus: "Pending" | "Confirmed" | "Failed";
  registrationStatus: "Under Review" | "Approved" | "Rejected";
  lastUpdated: string;
};

export default function CheckStatusPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StatusResult | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    // Simulated fetch - Replace with your actual database call
    setTimeout(() => {
      setLoading(false);
      // Mock data for demonstration
      if (query.toLowerCase().includes("team") || query.includes("@")) {
        setResult({
          teamId: "SNV-26-4022",
          teamName: "Neural Ninjas",
          leaderName: "Akash KR",
          paymentStatus: "Confirmed",
          registrationStatus: "Approved",
          lastUpdated: "Feb 02, 2026",
        });
      } else {
        setError("Database Error: No entry matching this ID was found in our records.");
      }
    }, 1500);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#020617] text-white py-24 px-6 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none">
            CHECK <span className="text-blue-500">STATUS</span>
          </h1>
          <p className="text-gray-500 max-w-md mx-auto text-sm md:text-base">
            Access the SINOVA database to verify your team's registration and payment clearance.
          </p>
        </div>

        {/* Centered Search Form */}
        <div className="w-full max-w-2xl relative group mb-16">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
          <form onSubmit={handleSearch} className="relative bg-black/60 border border-white/10 rounded-2xl p-2 flex backdrop-blur-xl justify-between items-center">
            <div className="flex items-center pl-6 text-gray-500 px-4">
              <Fingerprint size={20} />
            </div>
            <input
              type="text"
              required
              placeholder="Enter Team ID or Email..."
              className="flex-1 bg-transparent border-none px-4 py-5 outline-none text-white font-mono placeholder:text-gray-700"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-white text-black font-black italic px-10 py-4 rounded-xl transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
              <span>{loading ? "SCANNING..." : "SEARCH"}</span>
            </button>
          </form>
        </div>

        <div className="w-full min-h-[300px] flex items-center justify-center">
          {!result && !error && !loading && (
            <div className="text-center opacity-20 select-none">
              <Terminal size={80} className="mx-auto mb-4" />
              <p className="font-mono text-xs tracking-widest uppercase">Waiting for User Input...</p>
            </div>
          )}

          {error && (
            <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 text-red-400 text-center animate-in fade-in slide-in-from-bottom-4">
              <p className="font-bold">Entry Not Found</p>
              <p className="text-sm opacity-70">{error}</p>
            </div>
          )}

          {result && (
            <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 animate-in fade-in zoom-in duration-500">
              {/* Main Result Card */}
              <div className="md:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <ShieldCheck size={120} />
                </div>
                
                <div className="relative z-10 space-y-8">
                  <div className="border-b border-white/10 pb-6">
                    <h2 className="text-3xl font-black italic text-blue-400 uppercase tracking-tight mb-2">{result.teamName}</h2>
                    <p className="text-gray-500 font-mono text-xs mt-1 tracking-widest mb-1">ID: {result.teamId}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <StatusBox label="Payment Status" value={result.paymentStatus} confirmed={result.paymentStatus === "Confirmed"} />
                    <StatusBox label="Registration" value={result.registrationStatus} confirmed={result.registrationStatus === "Approved"} />
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="md:col-span-5 space-y-4">
                <div className="p-6 rounded-3xl bg-blue-600/10 border border-blue-500/20">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">Verification Audit</h4>
                  <ul className="space-y-4">
                    <AuditStep step="Team Validated" active />
                    <AuditStep step="Payment Proof Received" active />
                    <AuditStep step="Final Approval" active={result.registrationStatus === "Approved"} />
                  </ul>
                  <p className="mt-6 pt-4 border-t border-white/5 text-[10px] text-gray-500 font-mono">
                    Last Sync: {result.lastUpdated}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

/* Sub-components for better organization */

function StatusBox({ label, value, confirmed }: { label: string; value: string; confirmed: boolean }) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{label}</p>
      <div className={`flex items-center gap-2 font-bold ${confirmed ? "text-green-400" : "text-yellow-500"}`}>
        {confirmed ? <CheckCircle2 size={16} /> : <Clock size={16} />}
        <span>{value}</span>
      </div>
    </div>
  );
}

function AuditStep({ step, active }: { step: string; active: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`h-2 w-2 rounded-full ${active ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "bg-gray-700"}`} />
      <span className={`text-sm ${active ? "text-gray-200" : "text-gray-600"}`}>{step}</span>
    </div>
  );
}