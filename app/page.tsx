"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ShiftSimHome() {
  const router = useRouter();
  
  // States
  const [showGate, setShowGate] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [activeClient, setActiveClient] = useState<any>(null);
  const [showEmailFallback, setShowEmailFallback] = useState(false);

  const clients = [
    { 
      name: "Mi Mexico", 
      path: "/mimexico", 
      emoji: "🌮", 
      code: "MEXICO123", 
      color: "border-red-600" 
    },
  ];

  const emailRecipient = "playshiftsim@gmail.com";

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const emailSubject = "New Business Registration - ShiftSim";
    const emailBody = `Hello ShiftSim Team,%0D%0A%0D%0AI would like to register my business for the POS Training Simulator.%0D%0A%0D%0ACOMPANY NAME: %0D%0AMENU TYPE: %0D%0A%0D%0AThank you!`;
    const mailto = `mailto:${emailRecipient}?subject=${encodeURIComponent(emailSubject)}&body=${emailBody}`;
    
    // 1. Immediately show the fallback for computer users
    setShowEmailFallback(true);
    // 2. Attempt to open email app for mobile users
    window.location.href = mailto;
  };

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.toUpperCase() === activeClient.code.toUpperCase()) {
      router.push(activeClient.path);
    } else {
      alert("INVALID ACCESS CODE");
      setInputCode("");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600">
      
      {/* ACCESS GATE MODAL */}
      {showGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="bg-zinc-950 border-2 border-red-600 p-8 w-full max-w-md shadow-[0_0_50px_rgba(220,38,38,0.3)]">
            <h3 className="text-2xl font-black uppercase italic mb-2 tracking-tighter text-white">Security Check</h3>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-6">Enter {activeClient?.name} Terminal Code</p>
            <form onSubmit={handleAccess} className="space-y-4">
              <input 
                autoFocus
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="w-full bg-black border border-zinc-800 p-4 text-2xl font-black text-center uppercase tracking-widest focus:border-red-600 outline-none transition-colors text-white"
                placeholder="****"
              />
              <div className="flex gap-2">
                <button type="submit" className="flex-grow bg-red-600 py-4 font-black uppercase hover:bg-white hover:text-black transition-all text-white">Unlock</button>
                <button type="button" onClick={() => setShowGate(false)} className="px-6 border border-zinc-800 font-black uppercase text-zinc-500 hover:text-white transition-colors">Exit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EMAIL FALLBACK MODAL */}
      {showEmailFallback && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4">
          <div className="bg-zinc-900 border border-white/10 p-8 w-full max-w-sm text-center shadow-2xl">
            <h3 className="text-xl font-black uppercase mb-4 text-red-600 italic">Contact Systems</h3>
            <p className="text-zinc-400 text-sm mb-6 font-bold uppercase tracking-tight">
              Email us directly to register:
            </p>
            <div className="bg-black border border-zinc-800 p-4 mb-6 select-all font-mono text-red-500 break-all text-sm font-bold">
              {emailRecipient}
            </div>
            <button 
              onClick={() => setShowEmailFallback(false)}
              className="w-full bg-white text-black py-3 font-black uppercase text-xs hover:bg-red-600 hover:text-white transition-all"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav className="max-w-6xl mx-auto p-6 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10 overflow-hidden rounded shadow-[0_0_15px_rgba(220,38,38,0.2)] border border-red-600/50">
            <Image src="/logo.png" alt="Logo" fill className="object-cover" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic">
            SHIFT<span className="text-red-600">SIM</span>
          </span>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="max-w-4xl mx-auto pt-24 pb-20 px-6 text-center">
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-4 leading-none uppercase italic">
          TRAIN <span className="text-red-600 text-stroke-white">FASTER.</span><br /> 
          WORK <span className="text-white">SMARTER.</span>
        </h1>
        <p className="text-zinc-500 text-lg md:text-xl max-w-xl mx-auto mb-10 font-bold uppercase tracking-tight italic">
          The industry-standard POS simulator. <br/>
          Eliminate training errors before the rush begins.
        </p>
        <div className="flex justify-center">
          <button 
            onClick={handleRegisterClick}
            className="bg-white text-black px-12 py-5 font-black hover:bg-red-600 hover:text-white transition-all uppercase tracking-tighter italic text-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            Register Business
          </button>
        </div>
      </header>

      {/* PORTALS SECTION */}
      <section id="portals" className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-3 h-3 bg-red-600 rotate-45" />
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500 text-white">Authorized Access Points</h2>
          <div className="h-[1px] flex-grow bg-zinc-900" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clients.map((client) => (
            <button 
              key={client.path}
              onClick={() => { setActiveClient(client); setShowGate(true); }}
              className="group relative p-8 bg-zinc-950 border border-zinc-900 hover:border-red-600 transition-all flex items-center justify-between text-left text-white"
            >
              <div className="flex items-center gap-6">
                <span className="text-5xl group-hover:scale-110 transition-transform">{client.emoji}</span>
                <div>
                  <h3 className="text-2xl font-black uppercase group-hover:text-red-600 transition-colors tracking-tighter text-white">{client.name}</h3>
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest italic">🔒 Restricted Terminal</p>
                </div>
              </div>
              <span className="text-2xl text-zinc-800 group-hover:text-red-600 transition-transform group-hover:translate-x-2">→</span>
            </button>
          ))}

          <div className="p-8 border border-dashed border-zinc-800 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 transition-opacity">
            <p className="text-[10px] font-black uppercase text-zinc-600 tracking-widest mb-2 italic">Terminal Slot Available</p>
            <button 
              onClick={handleRegisterClick}
              className="text-[10px] font-black bg-zinc-900 border border-zinc-800 px-4 py-2 hover:text-red-600 hover:border-red-600 transition-all uppercase text-white"
            >
              Claim $15 Beta Spot
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto p-12 mt-20 border-t border-zinc-900 flex flex-col items-center">
        <div className="grayscale opacity-30 hover:opacity-100 transition-opacity mb-6 relative w-10 h-10">
             <Image src="/logo.png" alt="footer logo" fill className="object-contain" />
        </div>
        <p className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.8em]">
          ShiftSim Systems // Speed. Accuracy. Profit.
        </p>
      </footer>

      <style jsx global>{`
        .text-stroke-white {
          -webkit-text-stroke: 1px white;
          color: transparent;
        }
      `}</style>
    </div>
  );
}