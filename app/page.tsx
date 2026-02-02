import Link from "next/link";
import Image from "next/image";

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

      {/* Prize Pool Section (Replacing Theme) */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20 rounded-3xl p-10 text-center">
          <h3 className="text-3xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
            Total Prize Pool: ₹50,000+
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            <div className="order-2 md:order-1 p-6 bg-white/5 rounded-xl border border-white/10">
              <p className="text-blue-400 font-bold mb-2">2nd PRIZE</p>
              <p className="text-3xl font-black">₹15,000</p>
            </div>
            <div className="order-1 md:order-2 p-10 bg-blue-600/20 rounded-xl border-2 border-blue-400 scale-110 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              <p className="text-cyan-400 font-bold mb-2">WINNER</p>
              <p className="text-5xl font-black">₹30,000</p>
            </div>
            <div className="order-3 md:order-3 p-6 bg-white/5 rounded-xl border border-white/10">
              <p className="text-blue-400 font-bold mb-2">3rd PRIZE</p>
              <p className="text-3xl font-black">₹5,000</p>
            </div>
          </div>
        </div>
      </div>
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