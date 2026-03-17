"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ShiftSimHome() {
  const router = useRouter();
  const [showGate, setShowGate] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [activeClient, setActiveClient] = useState<any>(null);

  const clients = [
    { 
      name: "Mi Mexico", 
      path: "/mimexico", 
      emoji: "🌮", 
      code: "MEXICO123", // Set the code here
      color: "border-red-600" 
    },
  ];

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
            <h3 className="text-2xl font-black uppercase italic mb-2">Security Check</h3>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-6">Enter {activeClient?.name} Terminal Code</p>
            <form onSubmit={handleAccess} className="space-y-4">
              <input 
                autoFocus
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="w-full bg-black border border-zinc-800 p-4 text-2xl font-black text-center uppercase tracking-widest focus:border-red-600 outline-none"
                placeholder="****"
              />
              <div className="flex gap-2">
                <button type="submit" className="flex-grow bg-red-600 py-4 font-black uppercase hover:bg-white hover:text-black transition-all">Unlock</button>
                <button type="button" onClick={() => setShowGate(false)} className="px-6 border border-zinc-800 font-black uppercase text-zinc-500">Exit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav className="max-w-6xl mx-auto p-6 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10 overflow-hidden rounded shadow-[0_0_15px_rgba(220,38,38,0.2)]">
            <Image src="/logo.png" alt="Logo" fill className="object-cover" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase">
            SHIFT<span className="text-red-600">SIM</span>
          </span>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="max-w-4xl mx-auto pt-24 pb-20 px-6 text-center">
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-4 leading-none uppercase italic">
          TRAIN <span className="text-red-600">FASTER.</span><br /> 
          WORK <span className="text-white">SMARTER.</span>
        </h1>
        <p className="text-zinc-500 text-lg md:text-xl max-w-xl mx-auto mb-10 font-bold uppercase">
          Elite POS training simulators for high-volume restaurants.
        </p>
      </header>

      {/* CLIENT PORTALS */}
      <section id="portals" className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clients.map((client) => (
            <button 
              key={client.path}
              onClick={() => { setActiveClient(client); setShowGate(true); }}
              className="group relative p-8 bg-zinc-950 border border-zinc-900 hover:border-red-600 transition-all flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-6">
                <span className="text-5xl group-hover:scale-110 transition-transform">{client.emoji}</span>
                <div>
                  <h3 className="text-2xl font-black uppercase group-hover:text-red-600 transition-colors">{client.name}</h3>
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest italic">🔒 Restricted Terminal</p>
                </div>
              </div>
              <span className="text-2xl text-zinc-800 group-hover:text-red-600 transition-transform group-hover:translate-x-2">→</span>
            </button>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto p-12 mt-20 border-t border-zinc-900 flex flex-col items-center">
        <div className="grayscale opacity-30 mb-6">
             <Image src="/logo.png" alt="footer logo" width={40} height={40} className="object-contain" />
        </div>
        <p className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.8em]">
          ShiftSim Systems // Speed. Accuracy. Profit.
        </p>
      </footer>
    </div>
  );
}