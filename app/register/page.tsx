"use client";

import { useState, useMemo } from "react";
import { User, Users, ShieldCheck, Utensils, CreditCard, ClipboardList, AlertTriangle, ChevronDown, Upload, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function RegisterPage() {
  const [teamSize, setTeamSize] = useState(2);
  const [registeredTeams, setRegisteredTeams] = useState(0); // Toggle this to test Waitlist
  const maxTeams = 20;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isWaitlist = registeredTeams >= maxTeams;
  const registrationProgress = useMemo(() => (registeredTeams / maxTeams) * 100, [registeredTeams]);

  // Validation Logic
  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/; // Accepts +91, 91, or just 10 digits
    const teamName = formData.get("teamName") as string;
    if (!teamName || teamName.length < 3) {
      newErrors["teamName"] = "Team name must be at least 3 characters.";
      isValid = false;
    }

    // Validate Members
    for (let i = 0; i < teamSize; i++) {
      const name = formData.get(`member${i}_name`) as string;
      const email = formData.get(`member${i}_email`) as string;
      const phone = formData.get(`member${i}_phone`) as string;

      if (!name) newErrors[`member${i}_name`] = "Name is required.";
      
      if (!email || !emailRegex.test(email)) {
        newErrors[`member${i}_email`] = "Enter a valid email address.";
        isValid = false;
      }

      // Phone Validation: Remove spaces/dashes before checking
      const cleanPhone = phone?.replace(/[\s-]/g, "");
      if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
        newErrors[`member${i}_phone`] = "Enter a valid 10-digit mobile number.";
        isValid = false;
      }
    }
    if (!isWaitlist) {
      const file = formData.get("paymentProof") as File;
      if (!file || file.size === 0 || file.name === "undefined") {
        newErrors["paymentProof"] = "You must upload the payment screenshot.";
        isValid = false;
      } else {
        // Optional: Check file type
        const validTypes = ["image/jpeg", "image/png", "application/pdf"];
        if (!validTypes.includes(file.type)) {
           newErrors["paymentProof"] = "Only JPG, PNG, or PDF files are allowed.";
           isValid = false;
        }
        // Optional: Check file size (e.g., max 5MB)
        if (file.size > 5 * 1024 * 1024) {
           newErrors["paymentProof"] = "File size must be less than 5MB.";
           isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);

    if (validateForm(formData)) {
      // simulate API call
      setTimeout(() => {
        alert(isWaitlist ? "Added to Waitlist!" : "Registration Successful!");
        setIsSubmitting(false);
      }, 1000);
    } else {
      setIsSubmitting(false);
      // Scroll to top error
      const firstError = document.querySelector(".text-red-500");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#020617] text-white py-24 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute top-[-5%] left-[-5%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[130px]" />
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Registration Progress Bar */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-cyan-400">
                SINOVA<span className="text-white">'26</span>
              </h1>
              <p className="text-gray-400 text-sm font-mono tracking-widest uppercase mt-2">Registration Status</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-white">{registeredTeams}/{maxTeams}</span>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Teams Joined</p>
            </div>
          </div>
          <div className="h-3 w-full bg-white/5 rounded-full border border-white/10 overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(34,211,238,0.5)] ${isWaitlist ? 'bg-orange-500' : 'bg-gradient-to-r from-blue-600 to-cyan-400'}`}
              style={{ width: `${Math.min(registrationProgress, 100)}%` }}
            />
          </div>
          {isWaitlist && (
            <div className="flex items-center justify-center gap-2 text-orange-500 bg-orange-500/10 py-2 rounded-lg border border-orange-500/20 animate-pulse">
              <AlertTriangle size={16} />
              <p className="text-[10px] font-bold uppercase tracking-widest">Waitlist Active: No Payment Required Now</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-10 mt-4">
          
          {/* SECTION 1: TEAM DATA GATHERING */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-md space-y-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4 text-cyan-400">
              <ClipboardList size={24} />
              <h2 className="text-xl font-bold uppercase tracking-wider mb-1">Step 1: Enter Team Details</h2>
            </div>
            
            <div className="grid grid-cols-1 mt-2 md:grid-cols-2 gap-6">
              <InputField 
                label="Team Name" 
                icon={<ShieldCheck size={18} />} 
                placeholder="e.g. Neural Ninjas" 
                name="teamName" 
                error={errors.teamName}
              />
              
              <div className="relative group w-full">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1 flex items-center gap-2 mb-3">
                    <Users size={16} className="text-blue-500" /> Team Size (2-4 Members)
                </label>
                <div className="relative">
                    <select 
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 outline-none 
                               focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 
                               transition-all appearance-none cursor-pointer text-sm font-medium text-white
                               hover:bg-black/80 hover:border-white/20"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    >
                    <option value={2} className="bg-[#020617] text-white">2 Members</option>
                    <option value={3} className="bg-[#020617] text-white">3 Members</option>
                    <option value={4} className="bg-[#020617] text-white">4 Members</option>
                    </select>
                </div>
              </div>
            </div>

            {/* Dynamic Member Fields */}
            <div className="space-y-10 pt-4">
              {Array.from({ length: teamSize }).map((_, index) => (
                <div key={index} className="p-6 rounded-2xl bg-black/20 border border-white/5 space-y-6 mt-2">
                  <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                    <User size={16} /> {index === 0 ? "Team Leader" : `Member ${index + 1}`}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputField 
                      label="Name" 
                      placeholder="Full Name" 
                      name={`member${index}_name`} 
                      error={errors[`member${index}_name`]}
                    />
                    <InputField 
                      label="Email" 
                      type="email" 
                      placeholder="email@gmail.com" 
                      name={`member${index}_email`} 
                      error={errors[`member${index}_email`]}
                    />
                    <InputField 
                      label="Phone" 
                      placeholder="+91 ..." 
                      name={`member${index}_phone`} 
                      error={errors[`member${index}_phone`]}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2 mb-1">
                      <Utensils size={14} /> Meal Preference
                    </label>
                    <div className="flex gap-6">
                      {["Veg", "Non-Veg"].map((pref) => (
                        <label key={pref} className="flex items-center gap-2 cursor-pointer group">
                          <input 
                            type="radio" 
                            name={`member${index}_meal`} 
                            value={pref} 
                            defaultChecked={pref === "Non-Veg"}
                            className="w-4 h-4 accent-cyan-400 bg-black/40 border-white/10" 
                          />
                          <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{pref}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Waitlist Button */}
            {isWaitlist && (
              <div className="pt-6 mt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white p-4 text-black font-black italic py-5 rounded-2xl transition-all shadow-[0_0_30px_rgba(234,88,12,0.4)] active:scale-95 disabled:opacity-70"
                >
                  {isSubmitting ? "VALIDATING..." : "JOIN WAITLIST (NO PAYMENT)"}
                </button>
              </div>
            )}
          </section>

          {/* PAYMENT & UPLOAD: Only if NOT on waitlist */}
          {!isWaitlist && (
            <>
              {/* SECTION 2: PAYMENT */}
              <section className="bg-white/5 border border-white/10 rounded-3xl p-8 mt-4 md:p-10 backdrop-blur-md space-y-8">
                <div className="flex items-center gap-3 border-b border-white/10 mb-4 text-cyan-400">
                  <CreditCard size={24} />
                  <h2 className="text-xl font-bold uppercase tracking-wider ">Step 2: Payment</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <p className="text-gray-400 text-sm uppercase tracking-widest">Entry Fee</p>
                      <p className="text-5xl font-black text-white italic">₹400</p>
                      <p className="text-xs text-blue-400 font-mono tracking-tighter">PER TEAM (NOT PER HEAD)</p>
                    </div>
                    <ul className="space-y-3 text-xs text-gray-400">
                      <li className="flex items-center gap-2">• Scan the QR code shown here</li>
                      <li className="flex items-center gap-2">• Pay via any UPI App (GPay or PhonePe)</li>
                      <li className="flex items-center gap-2"><span>•</span><p className="text-white underline">Must take a screenshot after payment</p></li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-3xl flex flex-col items-center gap-3 w-fit mx-auto shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    <Image 
                      src="/sinova-logo.png" 
                      alt="Payment QR Code" 
                      width={220} 
                      height={220}
                      className="rounded-xl object-cover object-bottom h-48"
                    />
                    <div className="bg-blue-600 px-4 py-1 rounded-full">
                      <p className="text-white font-black text-[10px] uppercase tracking-tighter">Official SINOVA'26 UPI</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 3: PROOF UPLOAD */}
                <section className="bg-white/5 border border-white/10 rounded-3xl mt-4 p-8 md:p-10 backdrop-blur-md space-y-8">
                <div className="flex items-center mb-2 gap-3 border-b border-white/10 pb-4 text-cyan-400">
                    <Upload size={24} />
                    <h2 className="text-xl font-bold uppercase tracking-wider">Step 3: Payment Proof</h2>
                </div>
                
                <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Upload Transaction Screenshot</label>
                    
                    {/* Added conditional border color based on error state */}
                    <div className={`group relative border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer bg-black/20 
                    ${errors.paymentProof 
                        ? "border-red-500/50 bg-red-500/5 hover:border-red-500" 
                        : "border-white/10 hover:border-cyan-400/50"
                    }`}
                    >
                    <input 
                        type="file" 
                        name="paymentProof" // <--- CRITICAL: Must match the key used in formData.get()
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        // We remove 'required' here to handle it with our custom validation instead
                    />
                    
                    <div className={`p-4 rounded-full mb-4 transition-transform group-hover:scale-110 
                        ${errors.paymentProof ? "bg-red-500/10 text-red-500" : "bg-cyan-400/10 text-cyan-400"}`}>
                        {errors.paymentProof ? <AlertCircle size={32} /> : <Upload size={32} />}
                    </div>
                    
                    <p className={`text-sm font-bold ${errors.paymentProof ? "text-red-400" : "text-gray-300"}`}>
                        {errors.paymentProof ? "Missing File" : "Drop screenshot here or click to browse"}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-2 uppercase">Supports: JPG, PNG, PDF (Max 5MB)</p>
                    </div>

                    {/* Display Error Message Text */}
                    {errors.paymentProof && (
                    <p className="text-[10px] text-red-400 font-medium ml-1 animate-in slide-in-from-top-1">
                        {errors.paymentProof}
                    </p>
                    )}
                </div>

                <div className="pt-6 mt-4">
                    <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 p-4 hover:bg-white text-black font-black italic py-5 rounded-2xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] active:scale-95 disabled:opacity-70 disabled:grayscale"
                    >
                    {isSubmitting ? "VALIDATING..." : "COMPLETE REGISTRATION"}
                    </button>
                </div>
            </section>
            </>
          )}
        </form>
      </div>
    </main>
  );
}

// Updated InputField with Error Support
function InputField({ label, icon, placeholder, name, type = "text", error }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 flex items-center gap-2">
          {icon} {label}
        </label>
      </div>
      
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={`w-full bg-black/40 border rounded-xl px-5 py-4 outline-none transition-all text-sm placeholder:text-gray-700
            ${error ? 'border-red-500/50 focus:border-red-500 bg-red-500/5' : 'border-white/10 focus:border-blue-500'}`}
        />
        {error && (
            <div className="absolute right-8  text-red-500 animate-pulse align-middle flex items-center justify-center gap-2">
                <AlertCircle size={18} /><p className="text-[10px] text-red-400 font-medium ml-1 animate-in slide-in-from-top-1">{error}</p>
            </div>
        )}
      </div>
    </div>
  );
}