"use client";

import { useState } from "react";
import { Search, Loader2, CheckCircle2, Clock, ShieldCheck, Terminal, Fingerprint, AlertCircle, Activity } from "lucide-react";
import { supabase } from "@/lib/supabase"; // Ensure this path is correct

type StatusResult = {
  teamId: string;
  teamName: string;
  leaderName: string;
  paymentStatus: string;
  registrationStatus: string;
  lastUpdated: string;
  isWaitlist: boolean;
};

export default function CheckStatusPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StatusResult | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      // 1. Determine if query is a Number (Team ID) or String (Email)
      const isNumber = !isNaN(Number(query));
      
      let supabaseQuery = supabase.from("teams").select("*");

      if (isNumber) {
        supabaseQuery = supabaseQuery.eq("team_number", Number(query));
      } else {
        // Search by looking into the members JSONB array for the leader's email (index 0)
        // Or you can use the syntax to search the entire array if needed
        supabaseQuery = supabaseQuery.filter('members->0->>email', 'eq', query.toLowerCase().trim());
      }

      const { data, error: dbError } = await supabaseQuery.single();

      if (dbError || !data) {
        setError("No entry matching this Team ID or Leader Email was found.");
      } else {
        // 2. Map Supabase data to our StatusResult type
        setResult({
          teamId: data.team_number.toString(),
          teamName: data.team_name,
          leaderName: data.members[0].name,
          paymentStatus: data.payment_status === 'confirmed' ? 'Confirmed' : 'Pending',
          registrationStatus: data.is_waitlist ? "Waitlisted" : "Approved",
          lastUpdated: new Date(data.created_at).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          isWaitlist: data.is_waitlist
        });
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred while accessing the database.");
    } finally {
      setLoading(false);
    }
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
          <p className="text-gray-500 max-w-md mx-auto text-sm md:text-base font-mono uppercase tracking-tight">
            SINOVA DATABASE v2.0 // SEARCH BY TEAM ID OR LEADER EMAIL
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
              placeholder="Ex: 12 or arjun@gmail.com"
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
            <div className="p-8 rounded-3xl border border-red-500/20 bg-red-500/5 text-red-400 text-center animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center gap-4">
              <AlertCircle size={40} />
              <div>
                <p className="font-bold text-lg uppercase tracking-tighter">Entry Not Found</p>
                <p className="text-sm opacity-70 font-mono">{error}</p>
              </div>
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
                    <div className="flex items-center gap-2 text-blue-400 font-mono text-[10px] uppercase tracking-widest mb-2">
                       <Activity size={12} /> Live Database Entry
                    </div>
                    <h2 className="text-3xl font-black italic text-white uppercase tracking-tight mb-2">{result.teamName}</h2>
                    <p className="text-gray-500 font-mono text-xs mt-1 tracking-widest">TEAM ID: #{result.teamId}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <StatusBox 
                      label="Payment Proof" 
                      value={result.paymentStatus} 
                      confirmed={result.paymentStatus === "Confirmed"} 
                    />
                    <StatusBox 
                      label="Admission" 
                      value={result.registrationStatus} 
                      confirmed={!result.isWaitlist} 
                    />
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="md:col-span-5 space-y-4">
                <div className="p-6 rounded-3xl bg-blue-600/10 border border-blue-500/20">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">Verification Audit</h4>
                  <ul className="space-y-4">
                    <AuditStep step="Database Identity Sync" active />
                    <AuditStep step="Leader Email Verified" active />
                    <AuditStep step="Slot Secured" active={!result.isWaitlist} />
                  </ul>
                  <p className="mt-6 pt-4 border-t border-white/5 text-[10px] text-gray-500 font-mono">
                    Last Database Update: {result.lastUpdated}
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