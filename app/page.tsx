'use client';
import Link from "next/link";
import Image from "next/image";
import { Medal, Crown, Handshake, Award, Sparkles } from "lucide-react";

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
        <InfoCard title="📅 Date" value="Mar 17 - 18, 2026" subValue="Starts 10:00 AM" />
        <InfoCard title="📍 Venue" value="SSTM Campus" subValue="Muttom, Aluva" />
        <InfoCard title="⏱ Format" value="24 Hr Hackathon" subValue="2 - 4 Members per team" />
      </div>

      {/* Prize Pool Section */}
      <section className="max-w-6xl mx-auto px-6 mb-6 pb-12">
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

      <section className="relative py-20 overflow-hidden border-t border-white/5 bg-[#020617]">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.08),transparent_50%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      
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
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                <Award className="text-cyan-400" size={36} />
              </div>
            </div>

            {/* Title with Better Hierarchy */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
                <p className="text-xs font-mono tracking-[0.3em] text-cyan-400/80 uppercase">
                  Proudly Supported By
                </p>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
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
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0" />
                </span>
              </h2>

              <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                SINOVA is made possible by the generous support and collaboration of these 
                industry-leading organizations who share our vision for innovation and excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Premium Sponsor Grid - Prominent Display */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {sponsors.map((sponsor, index) => (
              <div 
                key={index}
                className="group/card relative"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                
                {/* Card */}
                <div className="relative h-48 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 backdrop-blur-sm transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_0_50px_rgba(34,211,238,0.15)] overflow-hidden">
                  
                  {/* Subtle Grid Pattern */}
                  <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:12px_12px]" />
                  
                  {/* Content */}
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-4">
                    {/* Logo */}
                    <div className="relative w-full h-20 opacity-90 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-500 ease-out">
                      <Image 
                        src={sponsor.logo} 
                        alt={`${sponsor.name} logo`}
                        fill 
                        className="object-contain" 
                      />
                    </div>
                    
                    {/* Divider */}
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                    
                    {/* Sponsor Name - Always Visible but Enhanced on Hover */}
                    <div className="text-center space-y-1 transition-all duration-300 group-hover/card:scale-105">
                      <h3 className="text-lg font-bold text-white/70 group-hover/card:text-white transition-colors">
                        {sponsor.name}
                      </h3>
                      <p className="text-[10px] font-mono text-cyan-400/60 group-hover/card:text-cyan-400 tracking-[0.2em] uppercase transition-colors">
                        Technical Partner
                      </p>
                    </div>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-white/10 group-hover/card:border-cyan-400/60 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-white/10 group-hover/card:border-cyan-400/60 transition-all duration-300" />
                  
                  {/* Top-right badge on hover */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                    <Sparkles className="text-cyan-400/60" size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Scrolling Marquee for Extended Recognition */}
        <div className="relative">
          <div className="text-center mb-8">
            <p className="text-xs font-mono tracking-[0.3em] text-gray-500 uppercase">
              Technical Collaboration & Support
            </p>
          </div>

          {/* Marquee Container */}
          <div className="relative flex flex-col group/marquee py-4 overflow-hidden border-t border-b border-white/5">
            {/* Scrolling Track - Smaller, Complementary Display */}
            <div className="animate-marquee flex gap-6 items-center whitespace-nowrap">
              {[...sponsors, ...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-40 h-40 border border-white/5 rounded-xl flex items-center justify-center p-4 backdrop-blur-sm hover:bg-white/[0.03] transition-colors"
                >
                  <div className="relative w-full h-20  opacity-60 hover:opacity-80 transition-opacity">
                    <Image 
                      src={sponsor.logo} 
                      alt={sponsor.name} 
                      fill 
                      className="object-contain" 
                    />
                    <p className="absolute -bottom-8 left-0 right-0 text-center text-xs text-white">{sponsor.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/20 rounded-full">
            <Handshake className="text-cyan-400" size={18} />
            <p className="text-sm text-gray-400">
              Thank you to all our sponsors for making SINOVA possible
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
        .group\/marquee:hover .animate-marquee {
          animation-play-state: paused;
        }
        .delay-75 {
          animation-delay: 75ms;
        }
        .delay-150 {
          animation-delay: 150ms;
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