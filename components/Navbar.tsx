"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // Import icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Rules", href: "/rules" },
    { name: "Check Status", href: "/check-status" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="relative group">
          {/* Animated Glow Border */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 rounded-2xl blur-sm opacity-30 group-hover:opacity-60 transition duration-500"></div>
          
          {/* Main Bar */}
          <div className="relative flex items-center justify-between h-16 px-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl">
            
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group/logo">
              <div className="relative">
                <Image 
                  src="/sinova-logo.png" 
                  alt="SINOVA 26 Logo" 
                  width={35} 
                  height={35}
                  className="drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] group-hover/logo:scale-110 transition-transform"
                />
              </div>
              <span className="text-xl font-black tracking-tighter italic text-white">
                SINOVA'<span className="text-blue-500">26</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors relative group/link"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover/link:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Desktop Register Button & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link 
                href="/register" 
                className="hidden sm:inline-flex items-center justify-center px-6 py-2 text-sm font-bold text-black transition-all duration-200 bg-cyan-400 rounded-lg hover:bg-white focus:outline-none"
              >
                Register
              </Link>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {isOpen && (
            <div className="absolute top-20 left-0 right-0 md:hidden animate-in slide-in-from-top-5 duration-300">
              <div className="bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 space-y-4 shadow-2xl">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="block text-lg font-bold text-gray-300 hover:text-cyan-400 transition-colors border-b border-white/5 pb-2"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link 
                  href="/register" 
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-4 bg-cyan-400 text-black font-black italic rounded-xl"
                >
                  REGISTER NOW
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}