'use client';
import Link from "next/link";
import Image from "next/image";
import { Medal, Crown, Handshake, Award, Sparkles } from "lucide-react";

// Sponsors organized hierarchically
const sponsorTiers = {
  title: [
    { name: "Turkish", logo: "/sponsers/Turkish.png", tier: "Title Sponsor" }
  ],
  gold: [
    { name: "Ergo", logo: "/sponsers/ergo.png", tier: "Gold Sponsor" }
  ],
  silver: [
    { name: "IREL", logo: "/sponsers/IREL.png", tier: "Silver Sponsor" }
  ],
  bronze: [
    { name: "Figmark", logo: "/sponsers/Figmark.jpg", tier: "Third Prize Sponsor" }
  ],
  sprint: [
    { name: "BMK", logo: "/sponsers/BMK.jpg", tier: "Sprint Sponsor" },
    { name: "Unique Occassio Tech", logo: "/sponsers/UOT.png", tier: "Sprint Sponsor" }
  ],
  partners: [
    { name: "IEDC", logo: "/sponsers/IEDC.png", tier: "Technical Partner" },
    { name: "IIC", logo: "/sponsers/IIC.png", tier: "Technical Partner" }
  ]
};

export default function HomePage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] bg-blue-600/10 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] bg-cyan-500/10 blur-[150px]" />
        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100" />
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
        <div className="flex justify-center mb-8">
           {/* Replace with your local path to Sinova_Logo-removebg-preview.png */}
          <Image 
            src="/sinova-logo.png" 
            alt="SINOVA 26 Logo" 
            width={300} 
            height={300} 
            className="drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]"
          />
        </div>
        
        <h2 className="text-blue-400 font-mono tracking-[0.3em] uppercase text-sm mb-4">
          SCMS School of Technology and Management Presents
        </h2>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic">
          SINOVA'<span className="text-blue-500 underline decoration-cyan-400 decoration-4">26</span>
        </h1>

        <p className="mt-6 text-xl text-cyan-300 font-bold tracking-[0.2em]">
          HACK4IMPACT
        </p>

        <p className="mt-8 max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed">
          A <span className="text-white font-semibold">National Level Inter-Collegiate Hackathon</span>. 
          Join us at the SSTM Campus for 24 hours of pure innovation, coding, and impact.
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <Link
            href="/register"
            className="group relative px-10 py-4 font-bold text-black transition-all duration-300"
          >
            <div className="absolute inset-0 bg-cyan-400 skew-x-[-12deg] group-hover:bg-white transition-colors" />
            <span className="relative">REGISTER NOW (₹400/Team)</span>
          </Link>

          <Link
            href="/rules"
            className="group relative px-10 py-4 font-bold text-cyan-400 border border-cyan-400/50 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-cyan-400/10 translate-y-full group-hover:translate-y-0 transition-transform" />
            <span className="relative">VIEW EVENT RULES</span>
          </Link>
        </div>
      </div>

      {/* Key Info Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard title="📅 Date" value="Mar 17 - 18, 2026" subValue="Starts 10:00 AM" />
        <InfoCard title="📍 Venue" value="SSTM Campus" subValue="Muttom, Aluva" />
        <InfoCard title="⏱ Format" value="24 Hr Hackathon" subValue="2 - 4 Members per team" />
      </div>

      <div className="max-w-6xl mx-auto px-6 mb-20 rounded-2xl">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4828.636637847497!2d76.32476437587174!3d10.067723790041203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080e83612ebbbd%3A0x2b450cde81425a00!2sSCMS%20School%20of%20Technology%20and%20Management%20(SSTM)!5e1!3m2!1sen!2sin!4v1771525210065!5m2!1sen!2sin" 
          width="100%" 
          height="300" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">  
        </iframe>
      </div>



      {/* Prize Pool Section */}
      <section className="max-w-6xl mx-auto px-6 mb-6 pb-12">
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-blue-600 via-cyan-400 to-blue-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000" />
          
          <div className="relative bg-[#020617] border border-white/10 rounded-[2.5rem] p-8 md:p-16 text-center overflow-hidden">
            
            {/* Background Noise/Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 mb-16 space-y-2">
              <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white drop-shadow-lg">
                TOTAL PRIZE POOL
              </h3>
              <p 
                className="text-2xl md:text-3xl font-bold"
                style={{
                  background: "linear-gradient(to right, #60A5FA, #67E8F9)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent"
                }}
              >
                ₹50,000+
              </p>
            </div>

            {/* Podium Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-end max-w-4xl mx-auto">
              
              {/* 2nd Place */}
              <div className="order-2 md:order-1 relative group/card">
                <div className="absolute -inset-0.5 bg-linear-to-b from-blue-500/20 to-transparent rounded-2xl blur-sm opacity-0 group-hover/card:opacity-100 transition" />
                <div className="relative p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-300">
                  <Medal size={40} className="text-gray-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                  <div>
                    <p className="text-blue-200 font-bold text-sm tracking-widest mb-1 uppercase">2nd Runner Up</p>
                    <p className="text-4xl font-black text-white">₹15,000</p>
                  </div>
                  <div className="h-1 w-12 bg-gray-500 rounded-full opacity-50" />
                </div>
              </div>

              {/* 1st Place (Winner) */}
              <div className="order-1 md:order-2 relative -mt-12 md:-mt-0 md:-translate-y-12 z-20">
                {/* Winner Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-400/20 rounded-full blur-[80px]" />
                
                <div className="relative p-10 bg-linear-to-b from-blue-600/20 to-black/40 border-2 border-cyan-400/50 rounded-3xl flex flex-col items-center gap-6 shadow-[0_0_50px_rgba(34,211,238,0.2)] backdrop-blur-sm transform hover:scale-105 transition-all duration-500">
                  <div className="relative">
                    <Crown size={64} className="text-yellow-400 fill-yellow-400/20 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] animate-bounce" />
                  </div>
                  
                  <div className="text-center space-y-2">
                    <p className="text-cyan-300 font-black text-lg tracking-[0.2em] uppercase">Champion</p>
                    <p className="text-5xl font-black text-white italic p-2 tracking-tighter drop-shadow-2xl">
                      ₹30,000
                    </p>
                  </div>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="order-3 md:order-3 relative group/card">
                <div className="absolute -inset-0.5 bg-linear-to-b from-blue-500/20 to-transparent rounded-2xl blur-sm opacity-0 group-hover/card:opacity-100 transition" />
                <div className="relative p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-300">
                  <Medal size={40} className="text-amber-700 drop-shadow-[0_0_10px_rgba(180,83,9,0.5)]" />
                  <div>
                    <p className="text-blue-200 font-bold text-sm tracking-widest mb-1 uppercase">3rd Runner Up</p>
                    <p className="text-4xl font-black text-white">₹5,000</p>
                  </div>
                  <div className="h-1 w-12 bg-amber-800 rounded-full opacity-50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden border-t border-white/5 bg-[#020617]">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.08),transparent_50%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/20 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-blue-400/20 rounded-full animate-pulse delay-75" />
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-cyan-300/20 rounded-full animate-pulse delay-150" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section - More Prominent */}
        <div className="mb-20 text-center">
          <div className="flex flex-col items-center justify-center gap-6">
            {/* Enhanced Icon Badge */}
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-linear-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                <Award className="text-cyan-400" size={36} />
              </div>
            </div>

            {/* Title with Better Hierarchy */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-linear-to-r from-transparent to-cyan-500/50" />
                <p className="text-xs font-mono tracking-[0.3em] text-cyan-400/80 uppercase">
                  Proudly Supported By
                </p>
                <div className="h-px w-12 bg-linear-to-l from-transparent to-cyan-500/50" />
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
                Our{' '}
                <span className="relative inline-block">
                  <span 
                    className="px-3"
                    style={{
                      background: "linear-gradient(135deg, #60A5FA 0%, #06B6D4 50%, #67E8F9 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      display: "inline-block"
                    }}>
                    Sponsors
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0" />
                </span>
              </h2>

              <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                SINOVA is made possible by the generous support and collaboration of these 
                industry-leading organizations who share our vision for innovation and excellence.
              </p>
            </div>
          </div>
        </div>

        {/* ===== TITLE SPONSOR - LARGEST ===== */}
        <div className="mb-24">
          <div className="text-center mb-8">
            <div className="inline-block">
              <p className="text-xs font-mono tracking-[0.3em] text-yellow-400 uppercase font-black mb-3">★ Title Sponsor ★</p>
              <div className="h-1 w-24 bg-linear-to-r from-transparent via-yellow-400 to-transparent mx-auto" />
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {sponsorTiers.title.map((sponsor, index) => (
              <div 
                key={index}
                className="group/title relative"
              >
                {/* Enhanced Glow for Title Sponsor */}
                <div className="absolute -inset-1 bg-linear-to-r from-yellow-500/40 via-amber-500/30 to-yellow-500/40 rounded-3xl blur-lg opacity-50 group-hover/title:opacity-75 transition-opacity duration-500" />
                
                {/* Card */}
                <div className="relative bg-linear-to-br from-yellow-500/[0.08] to-amber-500/[0.04] border-2 border-yellow-500/40 rounded-3xl flex flex-col items-center justify-center p-12 backdrop-blur-sm transition-all duration-500 hover:border-yellow-400/80 hover:shadow-[0_0_80px_rgba(250,204,21,0.3)] overflow-hidden">
                  
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffd700_1px,transparent_1px)] bg-[size:16px_16px]" />
                  
                  {/* Content */}
                  <div className="relative z-10 w-full flex flex-col items-center justify-center gap-6">
                    {/* Logo - Extra Large */}
                    <div className="relative w-80 h-48 opacity-95 group-hover/title:opacity-100 group-hover/title:scale-110 transition-all duration-500 ease-out">
                      <Image 
                        src={sponsor.logo} 
                        alt={`${sponsor.name} logo`}
                        fill 
                        className="object-contain drop-shadow-[0_0_20px_rgba(250,204,21,0.4)]" 
                      />
                    </div>
                    
                    {/* Divider */}
                    <div className="w-32 h-1 bg-linear-to-r from-transparent via-yellow-400/60 to-transparent" />
                    
                    {/* Sponsor Info */}
                    <div className="text-center space-y-3 transition-all duration-300">
                      <h3 className="text-5xl font-black text-white tracking-tight">
                        {sponsor.name}
                      </h3>
                      <p className="text-sm font-mono text-yellow-300 tracking-[0.3em] uppercase font-bold drop-shadow-lg">
                        {sponsor.tier}
                      </p>
                    </div>
                  </div>

                  {/* Corner Crown Accents */}
                  <div className="absolute top-4 right-4 text-3xl opacity-30 group-hover/title:opacity-60 transition-opacity">👑</div>
                  <div className="absolute bottom-4 left-4 text-3xl opacity-30 group-hover/title:opacity-60 transition-opacity">👑</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== GOLD SPONSOR ===== */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <div className="inline-block">
              <p className="text-xs font-mono tracking-[0.3em] text-amber-300 uppercase font-bold mb-2">Gold Sponsor</p>
              <div className="h-0.5 w-20 bg-linear-to-r from-transparent via-amber-300 to-transparent mx-auto" />
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            {sponsorTiers.gold.map((sponsor, index) => (
              <div 
                key={index}
                className="group/gold relative"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-linear-to-r from-amber-500/30 via-yellow-400/20 to-amber-500/30 rounded-2xl blur opacity-40 group-hover/gold:opacity-60 transition-opacity duration-500" />
                
                {/* Card */}
                <div className="relative bg-linear-to-br from-amber-500/[0.07] to-yellow-600/[0.03] border border-amber-400/50 rounded-2xl flex flex-col items-center justify-center p-10 backdrop-blur-sm transition-all duration-500 hover:border-amber-300/70 hover:shadow-[0_0_60px_rgba(217,119,6,0.25)] overflow-hidden">
                  
                  <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:14px_14px]" />
                  
                  <div className="relative z-10 w-full flex flex-col items-center justify-center gap-4">
                    {/* Logo - Large */}
                    <div className="relative w-64 h-32 opacity-90 group-hover/gold:opacity-100 group-hover/gold:scale-105 transition-all duration-500">
                      <Image 
                        src={sponsor.logo} 
                        alt={`${sponsor.name} logo`}
                        fill 
                        className="object-contain drop-shadow-[0_0_15px_rgba(217,119,6,0.3)]" 
                      />
                    </div>
                    
                    <div className="w-20 h-0.5 bg-linear-to-r from-transparent via-amber-400/40 to-transparent" />
                    
                    <div className="text-center space-y-2">
                      <h3 className="text-3xl font-bold text-white tracking-tight">
                        {sponsor.name}
                      </h3>
                      <p className="text-xs font-mono text-amber-200 tracking-[0.2em] uppercase">
                        {sponsor.tier}
                      </p>
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 text-2xl opacity-20 group-hover/gold:opacity-40 transition-opacity">🥇</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== SILVER & BRONZE SPONSORS ===== */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            
            {/* Silver Sponsor */}
            <div>
              <div className="text-center mb-6">
                <p className="text-xs font-mono tracking-[0.2em] text-gray-300 uppercase font-semibold">Silver Sponsor</p>
                <div className="h-0.5 w-16 bg-linear-to-r from-transparent via-gray-300 to-transparent mx-auto mt-2" />
              </div>
              
              {sponsorTiers.silver.map((sponsor, index) => (
                <div 
                  key={index}
                  className="group/silver relative"
                >
                  <div className="absolute -inset-0.5 bg-linear-to-r from-gray-400/20 to-blue-300/20 rounded-xl blur opacity-30 group-hover/silver:opacity-50 transition-opacity" />
                  
                  <div className="relative bg-linear-to-br from-gray-400/[0.05] to-gray-600/[0.02] border border-gray-400/40 rounded-xl flex flex-col items-center justify-center p-8 backdrop-blur-sm transition-all hover:border-gray-300/60 hover:shadow-[0_0_40px_rgba(200,200,200,0.15)]">
                    
                    <div className="relative z-10 w-full flex flex-col items-center justify-center gap-3">
                      <div className="relative w-56 h-28 opacity-85 group-hover/silver:opacity-100 group-hover/silver:scale-105 transition-all">
                        <Image 
                          src={sponsor.logo} 
                          alt={`${sponsor.name} logo`}
                          fill 
                          className="object-contain drop-shadow-[0_0_10px_rgba(200,200,200,0.2)]" 
                        />
                      </div>
                      
                      <div className="w-16 h-px bg-gray-400/30" />
                      
                      <div className="text-center space-y-1">
                        <h3 className="text-2xl font-bold text-white">
                          {sponsor.name}
                        </h3>
                        <p className="text-xs font-mono text-gray-300 tracking-[0.15em] uppercase">
                          {sponsor.tier}
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 text-lg opacity-15 group-hover/silver:opacity-30">🥈</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bronze Sponsor */}
            <div>
              <div className="text-center mb-6">
                <p className="text-xs font-mono tracking-[0.2em] text-orange-300 uppercase font-semibold">Third Prize Sponsor</p>
                <div className="h-0.5 w-16 bg-linear-to-r from-transparent via-orange-300 to-transparent mx-auto mt-2" />
              </div>
              
              {sponsorTiers.bronze.map((sponsor, index) => (
                <div 
                  key={index}
                  className="group/bronze relative"
                >
                  <div className="absolute -inset-0.5 bg-linear-to-r from-orange-500/20 to-amber-600/15 rounded-xl blur opacity-30 group-hover/bronze:opacity-50 transition-opacity" />
                  
                  <div className="relative bg-linear-to-br from-orange-500/[0.05] to-amber-700/[0.02] border border-orange-400/35 rounded-xl flex flex-col items-center justify-center p-8 backdrop-blur-sm transition-all hover:border-orange-300/55 hover:shadow-[0_0_40px_rgba(217,119,6,0.15)]">
                    
                    <div className="relative z-10 w-full flex flex-col items-center justify-center gap-3">
                      <div className="relative w-56 h-28 opacity-85 group-hover/bronze:opacity-100 group-hover/bronze:scale-105 transition-all">
                        <Image 
                          src={sponsor.logo} 
                          alt={`${sponsor.name} logo`}
                          fill 
                          className="object-contain drop-shadow-[0_0_10px_rgba(217,119,6,0.15)]" 
                        />
                      </div>
                      
                      <div className="w-16 h-px bg-orange-400/30" />
                      
                      <div className="text-center space-y-1">
                        <h3 className="text-2xl font-bold text-white">
                          {sponsor.name}
                        </h3>
                        <p className="text-xs font-mono text-orange-200 tracking-[0.15em] uppercase">
                          {sponsor.tier}
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 text-lg opacity-15 group-hover/bronze:opacity-30">🥉</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== SPRINT SPONSORS ===== */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <p className="text-xs font-mono tracking-[0.2em] text-cyan-300 uppercase font-semibold">Sprint Sponsors</p>
            <div className="h-0.5 w-20 bg-linear-to-r from-transparent via-cyan-300 to-transparent mx-auto mt-2" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {sponsorTiers.sprint.map((sponsor, index) => (
              <div 
                key={index}
                className="group/sprint relative"
              >
                <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500/15 to-blue-500/15 rounded-lg blur opacity-25 group-hover/sprint:opacity-45 transition-opacity" />
                
                <div className="relative h-40 bg-linear-to-br from-white/[0.02] to-white/[0.01] border border-white/15 rounded-lg flex flex-col items-center justify-center p-6 backdrop-blur-sm transition-all hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(34,211,238,0.1)]">
                  
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-2">
                    <div className="relative w-32 h-16 opacity-80 group-hover/sprint:opacity-95 group-hover/sprint:scale-110 transition-all">
                      <Image 
                        src={sponsor.logo} 
                        alt={`${sponsor.name} logo`}
                        fill 
                        className="object-contain" 
                      />
                    </div>
                    
                    <div className="w-12 h-px bg-cyan-400/20 mt-1" />
                    
                    <div className="text-center mt-2">
                      <h3 className="text-sm font-semibold text-white/80 group-hover/sprint:text-white transition-colors">
                        {sponsor.name}
                      </h3>
                      <p className="text-[9px] font-mono text-cyan-400/60 tracking-[0.15em] uppercase mt-0.5">
                        {sponsor.tier}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== TECHNICAL PARTNERS ===== */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-mono tracking-[0.2em] text-blue-300/70 uppercase font-semibold">Technical Partners</p>
            <div className="h-px w-16 bg-linear-to-r from-transparent via-blue-300/50 to-transparent mx-auto mt-2" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 max-w-xl mx-auto">
            {sponsorTiers.partners.map((sponsor, index) => (
              <div 
                key={index}
                className="group/partner relative"
              >
                <div className="absolute -inset-0.5 bg-linear-to-r from-blue-400/10 to-cyan-300/10 rounded-lg blur opacity-20 group-hover/partner:opacity-35 transition-opacity" />
                
                <div className="relative h-32 bg-white/[0.01] border border-white/10 rounded-lg flex flex-col items-center justify-center p-4 backdrop-blur-sm transition-all hover:border-blue-400/30">
                  
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-2">
                    <div className="relative w-24 h-12 opacity-70 group-hover/partner:opacity-85 group-hover/partner:scale-105 transition-all">
                      <Image 
                        src={sponsor.logo} 
                        alt={`${sponsor.name} logo`}
                        fill 
                        className="object-contain" 
                      />
                    </div>
                    
                    <div className="text-center mt-1">
                      <h3 className="text-xs font-semibold text-white/70 group-hover/partner:text-white/90 transition-colors">
                        {sponsor.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Thank You Message */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/20 rounded-full">
            <Handshake className="text-cyan-400" size={18} />
            <p className="text-sm text-gray-400">
              Thank you to all our sponsors for making SINOVA possible
            </p>
          </div>
        </div>
      </div>
    </section>
    </section>
  );
}

function InfoCard({ title, value, subValue }: { title: string; value: string; subValue: string }) {
  return (
    <div className="group p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-blue-500/50 transition-all">
      <h4 className="text-xs uppercase tracking-[0.2em] text-blue-400 mb-3">{title}</h4>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-gray-500 font-medium">{subValue}</p>
    </div>
  );
}