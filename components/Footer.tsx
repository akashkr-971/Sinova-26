import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-[#020617] border-t border-white/10 pt-16 pb-8 overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 shadow-[0_0_20px_rgba(59,130,246,0.8)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Institution Section */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <Image 
                src="/sinova-logo.png" 
                alt="SINOVA 26 Logo" 
                width={50} 
                height={50}
                className="drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]"
              />
              <span className="text-2xl font-black italic tracking-tighter text-white">
                SINOVA'<span className="text-blue-500">26</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Organized by the Department of Computer Applications, 
              <span className="text-white"> SCMS School of Technology and Management (SSTM).</span><br />
              <span>A national-level platform for innovators to Hack4Impact.</span>
            </p>
            <div className="flex gap-4 opacity-70">
              {/* Optional: Add Social Icons here */}
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link href="/rules" className="text-gray-400 hover:text-cyan-400 transition-colors">Rules</Link></li>
              <li><Link href="/register" className="text-gray-400 hover:text-cyan-400 transition-colors">Register Now</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact & Location Section */}
          <div>
            <h4 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-6">Location</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Prathap Nagar, Muttom, Aluva<br />
              Ernakulam - 683 106<br />
              Kerala, India
            </p>
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-xs text-gray-500">Email Query:</p>
              <a href="mailto:sinova@scmsgroup.org" className="text-sm text-cyan-400 hover:underline">
                sinova@scmsgroup.org
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © 2026 SINOVA'26. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
             <Image 
                src="/sstm_logo.png" // Using brochure as a visual reference/asset if needed
                alt="SSTM Logo" 
                width={40} 
                height={40}
                className="drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]"
              />
              <span className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
                Built for Innovation
              </span>
          </div>
        </div>
      </div>
    </footer>
  );
}