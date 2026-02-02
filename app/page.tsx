'use client';
import Link from "next/link";
import Image from "next/image";
import { Trophy, Medal, Crown, Handshake } from "lucide-react";

// Mock Data for Sponsors (Replace logos with your actual files later)
const sponsors = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "GitHub", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg" },
  { name: "Vercel", logo: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" },
  { name: "Notion", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
  { name: "DigitalOcean", logo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/DigitalOcean_logo.svg" },
];

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
        <InfoCard title="📅 Date" value="Mar 16 - 17, 2026" subValue="Starts 10:00 AM" />
        <InfoCard title="📍 Venue" value="SSTM Campus" subValue="Muttom, Aluva" />
        <InfoCard title="⏱ Format" value="24 Hr Hackathon" subValue="2 - 4 Members per team" />
      </div>

      {/* Prize Pool Section */}
      <section className="max-w-6xl mx-auto px-6 mb-6 pb-24">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000" />
          
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
                <div className="absolute -inset-0.5 bg-gradient-to-b from-blue-500/20 to-transparent rounded-2xl blur-sm opacity-0 group-hover/card:opacity-100 transition" />
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
                
                <div className="relative p-10 bg-gradient-to-b from-blue-600/20 to-black/40 border-2 border-cyan-400/50 rounded-3xl flex flex-col items-center gap-6 shadow-[0_0_50px_rgba(34,211,238,0.2)] backdrop-blur-sm transform hover:scale-105 transition-all duration-500">
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
                <div className="absolute -inset-0.5 bg-gradient-to-b from-blue-500/20 to-transparent rounded-2xl blur-sm opacity-0 group-hover/card:opacity-100 transition" />
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

      <section className="relative py-24 overflow-hidden border-t border-white/5 bg-[#020617]">
  {/* Cyber Ambient Light */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -z-10" />

  <div className="max-w-8xl mx-auto px-6 mb-16 text-center">
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
        <Handshake className="text-cyan-400" size={28} />
      </div>
      <div className="space-y-1">
        <h3 className="text-3xl md:text-5xl font-black  tracking-tighter text-white uppercase ">
          SINOVA{' '}
          <span className="relative inline-block ">
            <span 
              className="px-2" // Add padding here to prevent the italic slant from clipping
              style={{
                background: "linear-gradient(to right, #60A5FA, #67E8F9)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                display: "inline-block" // Ensure it's a block to respect the padding
              }}>
              SPONSORS
            </span>
          </span>
        </h3>
        <p className="text-[10px] font-mono tracking-[0.5em] text-gray-500 uppercase mt-2">
          Technical Collaboration & Support
        </p>
      </div>
    </div>
  </div>

  {/* Marquee Wrapper */}
  <div className="relative flex flex-col group py-12">
    {/* High-Intensity Edge Fades */}
    <div className="absolute top-0 bottom-0 left-0 w-32 md:w-72 z-20 bg-gradient-to-r from-[#020617] via-[#020617]/90 to-transparent pointer-events-none" />
    <div className="absolute top-0 bottom-0 right-0 w-32 md:w-72 z-20 bg-gradient-to-l from-[#020617] via-[#020617]/90 to-transparent pointer-events-none" />

    {/* The Scrolling Track */}
    <div className="animate-marquee flex gap-4 items-center whitespace-nowrap min-w-full">
      {[...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
        <div 
          key={index} 
          className="relative flex-shrink-0 w-64 h-32 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center p-8 backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.07] hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.1)] group/card cursor-pointer overflow-hidden"
        >
          {/* Subtle Grid Pattern inside card */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
          
          {/* Logo container with fixed aspect ratio */}
          <div className="relative w-full h-full flex flex-col items-center justify-center gap-2">
            <div className="relative w-full h-12 opacity-30 grayscale group-hover/card:grayscale-0 group-hover/card:opacity-100 group-hover/card:scale-110 transition-all duration-500 ease-out">
              <Image 
                src={sponsor.logo} 
                alt={sponsor.name} 
                fill 
                className="object-contain " 
              />
            </div>
            {/* Sponsor Name - Hidden by default, slides up on hover */}
            <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-[0.2em] uppercase translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300">
              {sponsor.name}
            </span>
          </div>

          {/* Cyber Edge Accents */}
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-white/10 group-hover/card:border-cyan-400/50 transition-colors" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-white/10 group-hover/card:border-cyan-400/50 transition-colors" />
        </div>
      ))}
    </div>
  </div>

  <style jsx>{`
    .animate-marquee {
      animation: marquee 50s linear infinite;
    }
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .group:hover .animate-marquee {
      animation-play-state: paused;
    }
  `}</style>
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