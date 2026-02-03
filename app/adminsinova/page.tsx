"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Download, Eye, Lock, Search, Users, 
  Loader2, X, Activity,
  Phone, Mail, Utensils, Maximize2, CreditCard
} from "lucide-react";
import * as XLSX from "xlsx";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<any>(null); 
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [vegCount, setVegCount] = useState(0);
  const [nonVegCount, setNonVegCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalTeams, setTotalTeams] = useState(0);

  const ADMIN_PASSWORD = "SINOVA26ADMIN"; 

  useEffect(() => {
    if (isAuthenticated) fetchTeams();
  }, [isAuthenticated]);

  async function fetchTeams() {
    setLoading(true);
    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setTeams(data);
      setTotalParticipants(data.reduce((acc, t) => acc + (t.members?.length || 0), 0));
      setVegCount(data.reduce((acc, t) => acc + t.members.filter((m: any) => m.mealPreference === 'Veg').length, 0));
      setNonVegCount(data.reduce((acc, t) => acc + t.members.filter((m: any) => m.mealPreference === 'Non-Veg').length, 0));
      setTotalRevenue(data.filter(t => !t.is_waitlist).length * 400);
      setTotalTeams(data.length);
    }
    setLoading(false);
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) setIsAuthenticated(true);
    else alert("Invalid Access Code");
  };

  const exportToExcel = () => {
    const detailedData = teams.flatMap(t => 
      t.members.map((m: any, index: number) => ({
        "Team #": t.team_number || "WL",
        "Team Name": t.team_name,
        "Name": m.name,
        "Designation": index === 0 ? "Leader" : "Member",
        "Phone": m.phone,
        "Email": m.email,
        "Meal Preference": m.mealPreference,
        "UTR ID": t.transaction_id,
        "Status": t.is_waitlist ? "Waitlist" : "Confirmed"
      }))
    );

    const summaryData = [
      { "Metric": "Total Confirmed Teams", "Value": teams.filter(t => !t.is_waitlist).length },
      { "Metric": "Total Participants", "Value": totalParticipants },
      { "Metric": "Total Veg Meals", "Value": vegCount },
      { "Metric": "Total Non-Veg Meals", "Value": nonVegCount },
      { "Metric": "Total Revenue", "Value": `₹${totalRevenue}` },
    ];

    const wb = XLSX.utils.book_new();
    const wsDetailed = XLSX.utils.json_to_sheet(detailedData);
    const wsSummary = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsDetailed, "Participant List");
    XLSX.utils.book_append_sheet(wb, wsSummary, "Summary Report");
    XLSX.writeFile(wb, `SINOVA_26_Report.xlsx`);
  };

  const filteredTeams = teams.filter(t => 
    t.team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-white">
        <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl text-center">
          <Lock size={48} className="mx-auto mb-6 text-cyan-400" />
          <h1 className="text-2xl font-black italic mb-6">ADMIN ACCESS</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Enter Security Key"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 outline-none text-white text-center"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-cyan-400 text-black font-black py-4 rounded-xl hover:bg-white transition-all">UNLOCK DASHBOARD</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white p-4 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-16">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter">SINOVA <span className="text-cyan-400">CONTROL</span></h1>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1 font-mono">Live Registration Database</p>
          </div>
          <button onClick={exportToExcel} className="flex items-center gap-2 bg-green-600 hover:bg-green-500 px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(22,163,74,0.2)]">
            <Download size={18} /> EXPORT EXCEL
          </button>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Teams" value={totalTeams} icon={<Activity size={20} className="text-blue-400" />} trend="Total" />
          <StatCard label="Revenue" value={`₹${totalRevenue}`} icon={<CreditCard size={20} className="text-yellow-400" />} trend="Confirmed" />
          <StatCard label="Students" value={totalParticipants} icon={<Users size={20} className="text-cyan-400" />} trend={`${teams.length} Teams`} />
          <StatCard label="Veg" value={vegCount} icon={<Utensils size={20} className="text-green-500" />} trend="Kitchen" />
          <StatCard label="Non-Veg" value={nonVegCount} icon={<Utensils size={20} className="text-red-500" />} trend="Kitchen" />
        </div>

        {/* Search Bar */}
        <div className="relative group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search teams, UTR, or leaders..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:border-cyan-400 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table View */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-gray-400">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Team Name</th>
                  <th className="px-6 py-4">Member Roster</th>
                  <th className="px-6 py-4">UTR Number</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr><td colSpan={6} className="py-20 text-center"><Loader2 className="animate-spin text-cyan-400 mx-auto" size={32} /></td></tr>
                ) : filteredTeams.map((team, index) => (
                  <tr 
                    key={`team-${team.id}-${index}`} // FIX 1: Unique Row Key
                    className="hover:bg-white/5 cursor-pointer transition-all group border-l-4 border-transparent hover:border-cyan-400" 
                    onClick={() => setSelectedTeam(team)}
                  >
                    <td className="px-6 py-4 font-mono text-cyan-400 font-bold">#{team.team_number || 'WL'}</td>
                    <td className="px-6 py-4 font-bold text-white group-hover:text-cyan-400">{team.team_name}</td>
                    <td className="px-6 py-4">
                      {/* FIXED: Stacked list view like requested */}
                      <div className="flex flex-col gap-0.5">
                        {team.members.map((member: any, idx: number) => (
                          <span key={`member-${team.id}-${idx}`} className={`text-xs ${idx === 0 ? 'text-white font-bold' : 'text-gray-500'}`}>
                            {member.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-gray-400">{team.transaction_id || '---'}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[9px] px-2 py-1 rounded-md font-bold uppercase ${team.is_waitlist ? 'bg-orange-500/10 text-orange-400' : 'bg-green-500/10 text-green-400'}`}>
                        {team.is_waitlist ? 'Waitlist' : 'Confirmed'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 bg-white/5 rounded-lg hover:bg-cyan-400 hover:text-black transition-all">
                         <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TEAM DETAILS MODAL */}
        {selectedTeam && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-black/80">
            <div className="max-w-4xl w-full bg-[#020617] border border-white/10 rounded-[32px] overflow-hidden animate-in zoom-in duration-300">
              <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
                <div>
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter">{selectedTeam.team_name}</h2>
                  <p className="text-xs font-mono text-cyan-400">ID: #{selectedTeam.team_number || 'WL'}</p>
                </div>
                <button onClick={() => setSelectedTeam(null)} className="p-2 hover:bg-red-500/10 rounded-full transition-all">
                  <X size={24} className="text-gray-500" />
                </button>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto max-h-[75vh]">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Roster</h3>
                  {selectedTeam.members.map((m: any, i: number) => (
                    <div key={`modal-member-${selectedTeam.id}-${i}`} className="p-4 bg-white/5 border border-white/5 rounded-2xl space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-sm">{m.name}</p>
                        <span className="text-[9px] bg-cyan-400/10 text-cyan-400 px-2 py-0.5 rounded uppercase">{i === 0 ? "Leader" : "Member"}</span>
                      </div>
                      <div className="flex flex-col gap-1.5 text-xs text-gray-500">
                         <span className="flex items-center gap-2"><Mail size={12}/> {m.email}</span>
                         <span className="flex items-center gap-2"><Phone size={12}/> {m.phone}</span>
                         <span className="flex items-center gap-2"><Utensils size={12}/> {m.mealPreference}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Payment</h3>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-gray-500 uppercase mb-1">UTR / Transaction ID</p>
                    <p className="font-mono text-sm text-cyan-400 tracking-wider">{selectedTeam.transaction_id || "NOT_FOUND"}</p>
                  </div>

                  {selectedTeam.payment_proof_url ? (
                    <div 
                      className="group relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-black cursor-zoom-in"
                      onClick={() => setFullScreenImage(selectedTeam.payment_proof_url)}
                    >
                      <img src={selectedTeam.payment_proof_url} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-all" alt="Proof" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                          <Maximize2 size={24} />
                      </div>
                    </div>
                  ) : (
                    <div className="h-40 bg-white/5 rounded-2xl flex items-center justify-center text-gray-600 text-xs italic">No screenshot uploaded</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FULL SCREEN LIGHTBOX */}
        {fullScreenImage && (
          <div 
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 md:p-12 animate-in fade-in duration-300"
            onClick={() => setFullScreenImage(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-all"><X size={40} /></button>
            <img src={fullScreenImage} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" alt="Proof" />
          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({ label, value, icon, trend }: { label: string; value: string | number; icon: React.ReactNode; trend: string }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
      <div className="relative flex justify-between items-start mb-4">
        <div className="p-3 bg-white/5 rounded-2xl border border-white/5">{icon}</div>
        <span className="text-[9px] font-mono text-gray-500 uppercase bg-white/5 px-2 py-1 rounded">{trend}</span>
      </div>
      <div className="relative">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">{label}</p>
        <p className="text-3xl font-black italic text-white tracking-tighter">{value}</p>
      </div>
    </div>
  );
}