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
                <div 
                  key={contact.name} // FIXED: Using contact.name instead of team.id
                  className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-all group"
                >
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="font-semibold text-lg text-white group-hover:text-cyan-400 transition-colors">
                        {contact.name}
                      </p>
                      <a 
                        href={`tel:${contact.phone}`} 
                        className="text-md text-cyan-400 group-hover:text-white transition-colors font-mono"
                      >
                        {contact.phone}
                      </a>
                    </div>

                    {/* WhatsApp Icon Button */}
                    <a 
                      href={`https://wa.me/${contact.phone.replace(/\D/g, '')}?text=Hi%20${contact.name},%20I'm%20contacting%20you%20regarding%20SINOVA'26%20registration.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3 bg-green-500/10 text-green-500 rounded-2xl hover:bg-green-600 hover:text-white transition-all shadow-lg hover:shadow-green-500/20"
                      title="Chat on WhatsApp"
                    >
                      <svg 
                        className="w-6 h-6" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </a>
                  </div>
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
              {facultyCoordinators.map((contact, index) => (
                <div 
                  key={`${contact.name}-${index}`} 
                  className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-all group"
                >
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="font-semibold text-lg text-white group-hover:text-cyan-400 transition-colors">
                        {contact.name}
                      </p>
                      <a 
                        href={`tel:${contact.phone}`} 
                        className="text-md text-cyan-400 group-hover:text-white transition-colors font-mono"
                      >
                        {contact.phone}
                      </a>
                    </div>

                    {/* WhatsApp Icon Button */}
                    <a 
                      href={`https://wa.me/${contact.phone.replace(/\D/g, '')}?text=Dear%20Professor%20${contact.name},%20I%20am%20contacting%20you%20regarding%20the%20SINOVA'26%20Hackathon.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3 bg-green-500/10 text-green-500 rounded-2xl hover:bg-green-600 hover:text-white transition-all shadow-lg"
                      title="Contact Faculty via WhatsApp"
                    >
                      <svg 
                        className="w-6 h-6" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </a>
                  </div>
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