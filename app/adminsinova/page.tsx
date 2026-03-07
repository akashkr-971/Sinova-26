"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Download, Eye, Lock, Search, Users, 
  Loader2, X, Activity,
  Phone, Mail, Utensils, Maximize2, CreditCard
} from "lucide-react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'waitlist'>('all');
  const [selectedTeam, setSelectedTeam] = useState<any>(null); 
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [confirmedParticipants, setConfirmedParticipants] = useState(0);
  const [waitlistParticipants, setWaitlistParticipants] = useState(0);
  const [vegCount, setVegCount] = useState(0);
  const [nonVegCount, setNonVegCount] = useState(0);
  const [confirmedVeg, setConfirmedVeg] = useState(0);
  const [confirmedNonVeg, setConfirmedNonVeg] = useState(0);
  const [waitlistVeg, setWaitlistVeg] = useState(0);
  const [waitlistNonVeg, setWaitlistNonVeg] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalTeams, setTotalTeams] = useState(0);
  const [confirmedTeams, setConfirmedTeams] = useState(0);
  const [waitlistTeams, setWaitlistTeams] = useState(0);

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
      
      const confirmed = data.filter(t => !t.is_waitlist);
      const waitlisted = data.filter(t => t.is_waitlist);
      
      const confirmedCount = confirmed.length;
      const waitlistCount = waitlisted.length;
      
      const confirmedParticipantCount = confirmed.reduce((acc, t) => acc + (t.members?.length || 0), 0);
      const waitlistParticipantCount = waitlisted.reduce((acc, t) => acc + (t.members?.length || 0), 0);
      const totalParticipantCount = confirmedParticipantCount + waitlistParticipantCount;
      
      const confirmedVegCount = confirmed.reduce((acc, t) => acc + t.members.filter((m: any) => m.mealPreference === 'Veg').length, 0);
      const confirmedNonVegCount = confirmed.reduce((acc, t) => acc + t.members.filter((m: any) => m.mealPreference === 'Non-Veg').length, 0);
      const waitlistVegCount = waitlisted.reduce((acc, t) => acc + t.members.filter((m: any) => m.mealPreference === 'Veg').length, 0);
      const waitlistNonVegCount = waitlisted.reduce((acc, t) => acc + t.members.filter((m: any) => m.mealPreference === 'Non-Veg').length, 0);
      
      setConfirmedTeams(confirmedCount);
      setWaitlistTeams(waitlistCount);
      setTotalTeams(data.length);
      setConfirmedParticipants(confirmedParticipantCount);
      setWaitlistParticipants(waitlistParticipantCount);
      setTotalParticipants(totalParticipantCount);
      
      setConfirmedVeg(confirmedVegCount);
      setConfirmedNonVeg(confirmedNonVegCount);
      setWaitlistVeg(waitlistVegCount);
      setWaitlistNonVeg(waitlistNonVegCount);
      setVegCount(confirmedVegCount + waitlistVegCount);
      setNonVegCount(confirmedNonVegCount + waitlistNonVegCount);
      setTotalRevenue(confirmedCount * 400);
    }
    setLoading(false);
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) setIsAuthenticated(true);
    else alert("Invalid Access Code");
  };

  const exportToExcel = () => {
    // Sort teams numerically by team_number
    const sortedTeams = [...teams].sort((a, b) => {
      const aNum = a.team_number ? parseInt(String(a.team_number)) : Infinity;
      const bNum = b.team_number ? parseInt(String(b.team_number)) : Infinity;
      return aNum - bNum;
    });

    // Build confirmed teams data with empty rows between teams
    const confirmedTeamsData: any[] = [];
    sortedTeams
      .filter(t => !t.is_waitlist)
      .forEach(t => {
        t.members.forEach((m: any, index: number) => {
          confirmedTeamsData.push({
            "Team #": t.team_number,
            "Team Name": t.team_name,
            "College Name": t.college_name,
            "Name": m.name,
            "Designation": index === 0 ? "Leader" : "Member",
            "Phone": m.phone,
            "Email": m.email,
            "Meal Preference": m.mealPreference,
            "UTR ID": t.transaction_id,
            "Attendance": "",
          });
        });
        // Add empty row after each team
        confirmedTeamsData.push({
          "Team #": "",
          "Team Name": "",
          "College Name": "",
          "Name": "",
          "Designation": "",
          "Phone": "",
          "Email": "",
          "Meal Preference": "",
          "UTR ID": "",
          "Attendance": "",
        });
      });

    // Build waitlist teams data with empty rows between teams
    const waitlistTeamsData: any[] = [];
    sortedTeams
      .filter(t => t.is_waitlist)
      .forEach(t => {
        t.members.forEach((m: any, index: number) => {
          waitlistTeamsData.push({
            "Team #": t.team_number,
            "Team Name": t.team_name,
            "College Name": t.college_name,
            "Name": m.name,
            "Designation": index === 0 ? "Leader" : "Member",
            "Phone": m.phone,
            "Email": m.email,
            "Meal Preference": m.mealPreference,
            "UTR ID": t.transaction_id,
            "Attendance": "",
          });
        });
        // Add empty row after each team
        waitlistTeamsData.push({
          "Team #": "",
          "Team Name": "",
          "College Name": "",
          "Name": "",
          "Designation": "",
          "Phone": "",
          "Email": "",
          "Meal Preference": "",
          "UTR ID": "",
          "Attendance": "",
        });
      });

    const confirmedVeg = sortedTeams
      .filter(t => !t.is_waitlist)
      .reduce((acc, t) => acc + t.members.filter((m: any) => m.mealPreference === 'Veg').length, 0);
    const confirmedNonVeg = sortedTeams
      .filter(t => !t.is_waitlist)
      .reduce((acc, t) => acc + t.members.filter((m: any) => m.mealPreference === 'Non-Veg').length, 0);

    const waitlistVeg = sortedTeams
      .filter(t => t.is_waitlist)
      .reduce((acc, t) => acc + t.members.filter((m: any) => m.mealPreference === 'Veg').length, 0);
    const waitlistNonVeg = sortedTeams
      .filter(t => t.is_waitlist)
      .reduce((acc, t) => acc + t.members.filter((m: any) => m.mealPreference === 'Non-Veg').length, 0);

    const summaryData = [
      { "Metric": "Category", "Value": "", "Notes": "" },
      { "Metric": "CONFIRMED", "Value": "", "Notes": "" },
      { "Metric": "Teams", "Value": confirmedTeams, "Notes": "" },
      { "Metric": "Participants", "Value": confirmedParticipants, "Notes": "" },
      { "Metric": "Veg Meals", "Value": confirmedVeg, "Notes": "" },
      { "Metric": "Non-Veg Meals", "Value": confirmedNonVeg, "Notes": "" },
      { "Metric": "Revenue", "Value": `₹${totalRevenue}`, "Notes": "@₹400/team" },
      { "Metric": "", "Value": "", "Notes": "" },
      { "Metric": "WAITLIST", "Value": "", "Notes": "" },
      { "Metric": "Teams", "Value": waitlistTeams, "Notes": "" },
      { "Metric": "Participants", "Value": waitlistParticipants, "Notes": "" },
      { "Metric": "Veg Meals", "Value": waitlistVeg, "Notes": "" },
      { "Metric": "Non-Veg Meals", "Value": waitlistNonVeg, "Notes": "" },
      { "Metric": "", "Value": "", "Notes": "" },
      { "Metric": "TOTAL", "Value": "", "Notes": "" },
      { "Metric": "Teams", "Value": totalTeams, "Notes": "" },
      { "Metric": "Participants", "Value": totalParticipants, "Notes": "" },
      { "Metric": "Veg Meals", "Value": vegCount, "Notes": "" },
      { "Metric": "Non-Veg Meals", "Value": nonVegCount, "Notes": "" },
    ];

    const wb = XLSX.utils.book_new();
    const wsConfirmed = XLSX.utils.json_to_sheet(confirmedTeamsData);
    const wsWaitlist = XLSX.utils.json_to_sheet(waitlistTeamsData);
    const wsSummary = XLSX.utils.json_to_sheet(summaryData);
    
    XLSX.utils.book_append_sheet(wb, wsConfirmed, "✓ Confirmed Teams");
    XLSX.utils.book_append_sheet(wb, wsWaitlist, "⏳ Waitlist Teams");
    XLSX.utils.book_append_sheet(wb, wsSummary, "Summary Report");
    XLSX.writeFile(wb, `SINOVA_26_Report.xlsx`);
  };


  const handleDownloadReceipt = (team: any) => {
      const doc = new jsPDF();
      const margin = 20;
      
      // Get registration date
      const registrationDate = new Date(team.created_at).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      
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
  
      doc.setTextColor(255, 255, 255);
      doc.text(registrationDate, margin, 92);
      doc.text(team.is_waitlist ? "WAITLIST" : "CONFIRMED", 80, 92);
  
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

  const filteredTeams = teams
    .filter(t => {
      const matchesSearch = t.team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterStatus === 'confirmed') return matchesSearch && !t.is_waitlist;
      if (filterStatus === 'waitlist') return matchesSearch && t.is_waitlist;
      return matchesSearch;
    })
    .sort((a, b) => {
      // Numeric sort by team_number, with waitlist teams at the end
      const aNum = a.team_number ? parseInt(String(a.team_number)) : Infinity;
      const bNum = b.team_number ? parseInt(String(b.team_number)) : Infinity;
      return aNum - bNum;
    });

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Teams" value={totalTeams} icon={<Activity size={20} className="text-blue-400" />} sublabel="All Registrations" />
          <StatCard label="Confirmed Teams" value={confirmedTeams} icon={<Users size={20} className="text-green-400" />} sublabel="Teams" highlight="green" />
          <StatCard label="Waitlist Teams" value={waitlistTeams} icon={<Users size={20} className="text-orange-400" />} sublabel="Teams" highlight="orange" />
          <StatCard label="Revenue" value={`₹${totalRevenue}`} icon={<CreditCard size={20} className="text-yellow-400" />} sublabel="Confirmed Only" />
        </div>

        {/* Confirmed Stats */}
        <div>
          <h3 className="text-xs font-black italic uppercase tracking-widest text-green-400 mb-3">✓ Confirmed Registrations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Students" value={confirmedParticipants} icon={<Users size={20} className="text-green-400" />} sublabel="Participants" highlight="green" />
            <StatCard label="Veg Meals" value={confirmedVeg} icon={<Utensils size={20} className="text-green-500" />} sublabel="Kitchen" highlight="green" />
            <StatCard label="Non-Veg Meals" value={confirmedNonVeg} icon={<Utensils size={20} className="text-red-500" />} sublabel="Kitchen" highlight="green" />
            <StatCard label="Total Meals" value={confirmedVeg + confirmedNonVeg} icon={<Utensils size={20} className="text-cyan-400" />} sublabel="Confirmed" highlight="green" />
          </div>
        </div>

        {/* Waitlist Stats */}
        <div>
          <h3 className="text-xs font-black italic uppercase tracking-widest text-orange-400 mb-3">⏳ Waitlist Registrations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Students" value={waitlistParticipants} icon={<Users size={20} className="text-orange-400" />} sublabel="Participants" highlight="orange" />
            <StatCard label="Veg Meals" value={waitlistVeg} icon={<Utensils size={20} className="text-green-500" />} sublabel="Kitchen" highlight="orange" />
            <StatCard label="Non-Veg Meals" value={waitlistNonVeg} icon={<Utensils size={20} className="text-red-500" />} sublabel="Kitchen" highlight="orange" />
            <StatCard label="Total Meals" value={waitlistVeg + waitlistNonVeg} icon={<Utensils size={20} className="text-cyan-400" />} sublabel="Waitlist" highlight="orange" />
          </div>
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

        {/* Filter Tabs */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
              filterStatus === 'all'
                ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
            }`}
          >
            All Teams ({teams.length})
          </button>
          <button
            onClick={() => setFilterStatus('confirmed')}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
              filterStatus === 'confirmed'
                ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.5)]'
                : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
            }`}
          >
            ✓ Confirmed ({confirmedTeams})
          </button>
          <button
            onClick={() => setFilterStatus('waitlist')}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
              filterStatus === 'waitlist'
                ? 'bg-orange-500 text-black shadow-[0_0_15px_rgba(249,115,22,0.5)]'
                : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
            }`}
          >
            ⏳ Waitlist ({waitlistTeams})
          </button>
        </div>

        {/* Table View */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
          <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex justify-between items-center">
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
              {filterStatus === 'confirmed' && `✓ Confirmed Teams (${filteredTeams.length})`}
              {filterStatus === 'waitlist' && `⏳ Waitlist Teams (${filteredTeams.length})`}
              {filterStatus === 'all' && `All Teams (${filteredTeams.length})`}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-gray-400">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Team Name</th>
                  <th className="px-6 py-4">Member Roster</th>
                  <th className="px-6 py-4">College Name</th>
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
                    <td className="px-6 py-4 font-mono text-xs text-gray-400">{team.college_name || '---'}</td>
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
                  <div className="grid grid-cols-3 gap-3">
                    <button 
                      onClick={() => handleDownloadReceipt(selectedTeam)}
                      className="flex items-center justify-center gap-2 bg-cyan-400/10 border border-cyan-400/30 hover:bg-cyan-400/20 text-cyan-400 px-4 py-3 rounded-2xl font-bold transition-all"
                    >
                      <Download size={16} /> RECEIPT
                    </button>
                    <button 
                      onClick={() => {
                        const leaderPhone = selectedTeam.members[0]?.phone;
                        if (leaderPhone) {
                          const phoneNumber = leaderPhone.replace(/[^\d+]/g, '');
                          const message = `Greeting from SINOVA'26\nHello ${selectedTeam.team_name} 👋\n\nYour registration for SINOVA'26 has been confirmed.\n\nTeam ID: #${selectedTeam.team_number}\nMembers: ${selectedTeam.members.length}\n\nPlease find your receipt attached.\n\nSee you at the hackathon 🚀`;
                          const encodedMessage = encodeURIComponent(message);
                          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                          window.open(whatsappUrl, '_blank');
                        }
                      }}
                      className="flex items-center justify-center gap-2 bg-green-500/10 border border-green-500/30 hover:bg-green-500/20 text-green-400 px-4 py-3 rounded-2xl font-bold transition-all"
                    >
                      <Download size={16} /> WHATSAPP
                    </button>
                    <button 
                      onClick={async () => {
                        const leaderEmail = selectedTeam.members[0]?.email;
                        if (leaderEmail) {
                          // Open mailto in new tab after a short delay
                          setTimeout(() => {
                            const subject = `SINOVA'26 - Registration Confirmed - Team ${selectedTeam.team_name}`;
                            const body = `Greetings from SINOVA'26!\n\nHello ${selectedTeam.team_name},\n\nWe are thrilled to inform you that your registration for SINOVA'26 has been successfully confirmed!\n\nTeam Details:\n- Team ID: #${selectedTeam.team_number}\n- Team Name: ${selectedTeam.team_name}\n- Members: ${selectedTeam.members.length}\n\nPlease find your registration receipt attached to this email.\n\nWe look forward to seeing you at the hackathon!\n\nSee you soon! 🚀\n\nBest Regards,\nSINOVA'26 Team`;
                            const mailtoUrl = `mailto:${leaderEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                            window.open(mailtoUrl, '_blank');
                          }, 500);
                        }
                      }}
                      className="flex items-center justify-center gap-2 bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 text-blue-400 px-4 py-3 rounded-2xl font-bold transition-all"
                    >
                      <Mail size={16} /> EMAIL
                    </button>
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

function StatCard({ label, value, icon, sublabel, highlight }: { label: string; value: string | number; icon: React.ReactNode; sublabel: string; highlight?: string }) {
  const bgColor = highlight === 'green' ? 'group-hover:opacity-100 from-green-500/20' : highlight === 'orange' ? 'from-orange-500/20' : 'from-cyan-500/20';
  return (
    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl relative overflow-hidden group">
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${bgColor} to-transparent opacity-0 group-hover:opacity-100 transition duration-500`}></div>
      <div className="relative flex justify-between items-start mb-3">
        <div className="p-2 bg-white/5 rounded-lg border border-white/5">{icon}</div>
      </div>
      <div className="relative">
        <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mb-0.5">{label}</p>
        <p className="text-2xl font-black italic text-white tracking-tighter">{value}</p>
        <p className="text-[8px] text-gray-600 mt-1">{sublabel}</p>
      </div>
    </div>
  );
}