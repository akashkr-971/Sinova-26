import Link from "next/link";
import Image from "next/image";

export default function RulesPage() {
  const rules = [
    "Each team must consist of 2 to 4 members.",
    "Participants will be provided with problem statements at the start of the hackathon.",
    "Teams must select one problem statement and build a working prototype (software / hardware).",
    "Abstract submission must be completed within the first 2 hours.",
    "Evaluation checkpoints will be conducted at regular intervals during the hackathon.",
    "There will be no shortlisting, as participation is limited to 20 teams.",
    "Participants must bring their own laptops, hardware, and required resources.",
    "All submissions must be original work developed during the hackathon."
  ];

  return (
    <section className="min-h-screen bg-[#020617] text-white py-20 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/10 blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-500/10 blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto">
        {/* Header with Logo */}
        <div className="flex flex-col items-center mb-12 mt-12">
          <Link href="/">
            <Image 
              src="/sinova-logo.png" 
              alt="SINOVA 26 Logo" 
              width={180} 
              height={180} 
              className="mb-6 hover:scale-105 transition-transform"
            />
          </Link>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
            RULES & REGULATIONS
          </h1>
          <div className="h-1 w-24 bg-blue-500 mt-4 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
        </div>

        {/* Main Rules Container */}
        <div className="relative group">
          {/* Decorative Border Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative bg-[#020617] border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 gap-8">
              
              {/* Duration & Rounds Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-xl bg-blue-500/5 border border-blue-500/20">
                  <h3 className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-2">⏱ Time Duration</h3>
                  <p className="text-2xl font-black">24 HOURS</p>
                </div>
                <div className="p-6 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                  <h3 className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-2">🔄 Rounds</h3>
                  <p className="text-lg font-semibold">Round 1: Abstract Submission</p>
                  <p className="text-lg font-semibold">Round 2: Final Presentation</p>
                </div>
              </div>

              {/* General Rules List */}
              <ul className="space-y-4">
                {rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-4 text-gray-300">
                    <span className="flex-shrink-0 h-2 w-2 rounded-full bg-cyan-400 mt-2.5 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>

              {/* Special Note for Muslim Participants */}
              <div className="mt-8 p-6 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
                <h4 className="text-yellow-500 font-bold text-sm uppercase tracking-widest mb-4">Note for Muslim Participants</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Prayer arrangements will be provided during the event.</li>
                  <li>• Food and refreshments will be arranged considering fasting participants.</li>
                  <li>• Fruits and light refreshments provided at the time of breaking fast.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6 font-medium">Registration Fee: <span className="text-white">₹400 / Per Team</span></p>
          <Link
            href="/register"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-12 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
            I AGREE & WANT TO REGISTER
          </Link>
        </div>
      </div>
    </section>
  );
}