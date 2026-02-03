import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Rocket, School } from "lucide-react";

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-[#020617] text-white py-32 px-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] -z-10" />
      
      <div className="max-w-6xl mx-auto">
        {/* Section 1: The Event */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h4 className="text-blue-400 font-mono tracking-[0.3em] uppercase text-sm mb-4">The Vision</h4>
            <h1 className="text-5xl font-black italic mb-6 tracking-tighter">
              SINOVA'<span className="text-blue-500">26</span>: HACK4IMPACT
            </h1>
            <p className="text-gray-400 leading-relaxed text-lg mb-6">
              SINOVA'26 is a premier 24-hour National Level Inter-Collegiate Hackathon designed to ignite the spirit of innovation among students. 
              This year's theme, <span className="text-white font-semibold">"HACK4IMPACT"</span> challenges participants to build technology-driven 
              solutions that address real-world problems and create a tangible positive difference in society.
            </p>
            <div className="flex gap-4 items-center mb-6 justify-center">
              <div className="flex flex-wrap gap-8 pt-4">
              <StatBlock label="Duration" value="24 Hours" color="text-blue-500" />
              <StatBlock label="Prize Pool" value="₹50,000+" color="text-cyan-400" />
              <StatBlock label="Teams" value="20 Slots" color="text-blue-500" />
            </div>
            </div>
          </div>
          <div className="relative">
             {/* Decorative Frame for an Image */}
            <div className="absolute -inset-4 bg-blue-500/20 rounded-2xl blur-xl" />
            <div className="relative rounded-2xl border border-white/10 bg-white/5 aspect-video flex items-center justify-center mb-4">
              <Image 
                src="/Sinova26.png" 
                alt="Sinova Event Poster" 
                width={500} 
                height={500}
                className="object-cover mt-4 mb-4" 
              />
            </div>
          </div>
        </div>

        {/* Section 2: The Organizers */}
        <div className="border-t border-white/10 pt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Behind the Innovation</h2>
            <p className="text-gray-400">Hosted by the Department of Computer Applications</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AboutCard 
              icon={<School className="text-blue-400" />}
              title="SSTM" 
              desc="Accredited with NAAC A+ Grade (3.44), SSTM is a premier institution known for academic excellence." 
            />
            <AboutCard 
              icon={<GraduationCap className="text-cyan-400" />}
              title="Excellence" 
              desc="Approved by AICTE and affiliated to M.G. University, fostering high-impact technical education." 
            />
            <AboutCard 
              icon={<Rocket className="text-blue-400" />}
              title="Community" 
              desc="Supported by the Institution's Innovation Council (IIC) and IEDC to fuel student startups." 
            />
          </div>
        </div>

        {/* Section 3: Call to Action */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-500/30 text-center">
          <h2 className="text-3xl font-black mb-6 italic italic">READY TO MAKE AN IMPACT?</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/register" className="bg-white text-black px-10 py-3 rounded-full font-bold hover:bg-cyan-400 transition-colors">
              Register Now
            </Link>
            <Link href="/rules" className="border border-white/20 px-10 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
              View Guidelines
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutCard({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-white/[0.07] transition-all duration-500 group flex flex-col items-start text-left">
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-6 group-hover:scale-110 group-hover:bg-blue-500/10 transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

function StatBlock({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <p className={`text-2xl font-black ${color}`}>{value}</p>
      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">{label}</p>
    </div>
  );
}