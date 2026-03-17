"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ShiftSimHome() {
  const clients = [
    { 
      name: "Mi Mexico", 
      path: "/mimexico", 
      emoji: "🌮", 
      color: "border-red-600" 
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white">
      
      {/* NAV */}
      <nav className="max-w-6xl mx-auto p-6 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-4">
          {/* YOUR LOGO */}
          <div className="relative w-10 h-10 overflow-hidden rounded shadow-[0_0_15px_rgba(220,38,38,0.2)]">
            <Image 
              src="/logo.png" 
              alt="ShiftSim Logo" 
              fill 
              className="object-cover"
            />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase">
            SHIFT<span className="text-red-600">SIM</span>
          </span>
        </div>
        <div>
           <span className="text-[10px] font-black border border-red-600 px-3 py-1 rounded-sm uppercase tracking-[0.2em] text-red-600">
            Beta v1.0
          </span>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="max-w-4xl mx-auto pt-24 pb-20 px-6 text-center">
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-4 leading-none uppercase italic">
          TRAIN <span className="text-red-600 text-stroke-white">FASTER.</span><br /> 
          WORK <span className="text-white">SMARTER.</span>
        </h1>
        <p className="text-zinc-500 text-lg md:text-xl max-w-xl mx-auto mb-10 font-bold uppercase tracking-tight">
          The industry-standard POS simulator. <br/>
          Eliminate training errors before the rush begins.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="#portals" className="bg-red-600 text-white px-10 py-4 font-black hover:bg-white hover:text-black transition-all uppercase tracking-tighter italic text-xl">
            Launch Terminals
          </a>
          <button className="bg-transparent border-2 border-zinc-800 text-zinc-500 px-10 py-4 font-black hover:border-white hover:text-white transition-all uppercase tracking-tighter">
            Register Business
          </button>
        </div>
      </header>

      {/* CLIENT PORTALS SECTION */}
      <section id="portals" className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-3 h-3 bg-red-600 rotate-45" />
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500">Authorized Access Points</h2>
          <div className="h-[1px] flex-grow bg-zinc-900" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clients.map((client) => (
            <Link 
              key={client.path}
              href={client.path}
              className="group relative p-8 bg-zinc-950 border border-zinc-900 hover:border-red-600 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                <span className="text-5xl group-hover:scale-110 transition-transform">{client.emoji}</span>
                <div>
                  <h3 className="text-2xl font-black uppercase group-hover:text-red-600 transition-colors">{client.name}</h3>
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Training Module v1.2</p>
                </div>
              </div>
              <span className="text-2xl text-zinc-800 group-hover:text-red-600 transition-transform group-hover:translate-x-2">→</span>
            </Link>
          ))}

          {/* New Business Slot */}
          <div className="p-8 border border-dashed border-zinc-800 flex flex-col items-center justify-center text-center opacity-60 hover:opacity-100 transition-opacity">
            <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2">Slot Available</p>
            <button className="text-[10px] font-black bg-zinc-900 border border-zinc-800 px-4 py-2 hover:text-red-600 transition-colors uppercase">
              Claim $15 Beta Spot
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto p-12 mt-20 border-t border-zinc-900 flex flex-col items-center">
        <div className="grayscale opacity-30 hover:opacity-100 transition-opacity mb-6">
             <Image src="/logo.png" alt="footer logo" width={40} height={40} className="object-contain" />
        </div>
        <p className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.8em]">
          ShiftSim Systems // Speed. Accuracy. Profit.
        </p>
      </footer>

      {/* GLOBAL STYLES FOR THE "OUTLINE" EFFECT */}
      <style jsx global>{`
        .text-stroke-white {
          -webkit-text-stroke: 1px white;
          color: transparent;
        }
      `}</style>
    </div>
  );
}