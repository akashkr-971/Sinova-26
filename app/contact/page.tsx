'use client';
import React, { useState } from "react";
import { Send, Mail, User, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const studentCoordinators = [
    { name: "Akash KR", phone: "+91 9562699360" },
    { name: "Dinil Raj", phone: "+91 9037127623" },
    { name: "Hifz Ul Rahman", phone: "+91 9895655955" },
  ];

  const facultyCoordinators = [
    { name: "Mr. Mariadas Ronnie", phone: "+91 9633940659" },
    { name: "Mr. Harikrishnan R", phone: "+91 9633381690" },
    { name: "Ms. Remya Anand", phone: "+91 9741185664" },
  ];

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) setStatus("success");
      else setStatus("error");
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <section className="min-h-screen bg-[#020617] text-white py-24">
      <div className="max-w-5xl mx-auto px-6 mt-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black mb-4 tracking-tight italic text-cyan-400">GET IN TOUCH</h1>
          <p className="text-gray-400">Have questions? Reach out to our organizing team anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Student Side */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-blue-500" /> Student Coordinators
            </h3>
            <div className="space-y-4">
              {studentCoordinators.map((contact) => (
                <div key={contact.name} className="p-5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-colors">
                  <p className="font-semibold text-lg">{contact.name}</p>
                  <a href={`tel:${contact.phone}`} className="text-cyan-400 hover:text-white transition-colors">
                    {contact.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Faculty Side */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-blue-500" /> Faculty Coordinators
            </h3>
            <div className="space-y-4">
              {facultyCoordinators.map((contact) => (
                <div key={contact.name} className="p-5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-colors">
                  <p className="font-semibold text-lg">{contact.name}</p>
                  <a href={`tel:${contact.phone}`} className="text-cyan-400 hover:text-white transition-colors">
                    {contact.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
            <section className="bg-[#020617] text-white py-32 px-6">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-12">
                    <h1 className="text-4xl font-black italic tracking-tight text-cyan-400 mb-2">
                        ANY QUESTIONS?
                    </h1>
                    <p className="text-gray-400">Send us a message and we'll get back to you shortly.</p>
                    </div>

                    <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 transition duration-1000"></div>
                    
                    <form 
                        onSubmit={handleSubmit}
                        className="relative bg-black/40 border border-white/10 rounded-2xl p-8 space-y-6 backdrop-blur-md"
                    >
                        {/* Name Field */}
                        <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-blue-400 mb-2 flex items-center gap-2">
                            <User size={14} /> Full Name
                        </label>
                        <input
                            required
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-cyan-400 transition-colors"
                        />
                        </div>

                        {/* Email Field */}
                        <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-blue-400 mb-2 flex items-center gap-2">
                            <Mail size={14} /> Email Address
                        </label>
                        <input
                            required
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-cyan-400 transition-colors"
                        />
                        </div>

                        {/* Message Field */}
                        <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-blue-400 mb-2 flex items-center gap-2">
                            <MessageSquare size={14} /> Your Query
                        </label>
                        <textarea
                            required
                            name="query"
                            rows={4}
                            placeholder="How can we help you?"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-cyan-400 transition-colors resize-none"
                        />
                        </div>

                        {/* Submit Button */}
                        <button
                        type="submit"
                        disabled={status === "sending"}
                        className="w-full bg-cyan-400 hover:bg-white text-black font-black py-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                        >
                        {status === "sending" ? "SENDING..." : (
                            <>
                            SEND MESSAGE <Send size={18} />
                            </>
                        )}
                        </button>

                        {/* Status Feedback */}
                        {status === "success" && (
                        <p className="text-green-400 text-center font-bold animate-pulse">Message sent successfully!</p>
                        )}
                        {status === "error" && (
                        <p className="text-red-400 text-center font-bold">Failed to send. Please try calling us.</p>
                        )}
                    </form>
                    </div>
                </div>
            </section>
        </div>
      </div>
    </section>
  );
}