"use client";
import React, { useState, useEffect } from 'react';

const MENU_DATA: any = {
  MAIN: [
    { id: 'faj', name: 'FAJITAS', price: 15, color: 'bg-yellow-500' },
    { id: 'pol', name: 'POLLO', price: 13, color: 'bg-yellow-500' },
    { id: 'seafood', name: 'SEAFOOD', price: 18, color: 'bg-yellow-600' },
    { id: 'bur', name: 'BURRITO', price: 12, color: 'bg-yellow-200' },
    { id: 'tac', name: 'TACOS', price: 10, color: 'bg-yellow-500' },
    { id: 'encl', name: 'LG ENCH', price: 13, color: 'bg-orange-400' },
    { id: 'encs', name: 'SM ENCH', price: 9, color: 'bg-orange-300' },
    { id: 'tost', name: 'TOSTADA', price: 8, color: 'bg-yellow-200' },
    { id: 'soup', name: 'SOUPS', price: 6, color: 'bg-yellow-400' },
    { id: 'chim', name: 'CHIMICHANGA', price: 14, color: 'bg-yellow-500' },
    { id: 'kids_cat', name: 'KIDS', price: 0, color: 'bg-orange-100', isCategory: true, target: 'KIDS' },
    { id: 'usa_cat', name: 'USA', price: 0, color: 'bg-orange-100', isCategory: true, target: 'USA' },
  ],
  LUNCHES: [
    { id: 'l_faj', name: 'L-FAJITA', price: 9, color: 'bg-green-800 text-white' },
    { id: 'l_tac', name: 'L-TACO', price: 7, color: 'bg-green-800 text-white' },
    { id: 'back_l', name: '<< BACK', price: 0, color: 'bg-zinc-500', isCategory: true, target: 'MAIN' },
  ],
  SIDES: [
    { id: 'rice', name: 'RICE', price: 3, color: 'bg-yellow-600' },
    { id: 'beans', name: 'BEANS', price: 3, color: 'bg-yellow-600' },
    { id: 'back_s', name: '<< BACK', price: 0, color: 'bg-zinc-500', isCategory: true, target: 'MAIN' },
  ],
  CARNES: [
    { id: 'asada', name: 'ASADA', price: 16, color: 'bg-orange-700 text-white' },
    { id: 'back_c', name: '<< BACK', price: 0, color: 'bg-zinc-500', isCategory: true, target: 'MAIN' },
  ],
  KIDS: [
    { id: 'k_nug', name: 'KIDS NUGGET', price: 6, color: 'bg-orange-200' },
    { id: 'back_k', name: '<< BACK', price: 0, color: 'bg-zinc-500', isCategory: true, target: 'MAIN' },
  ],
  USA: [
    { id: 'burger', name: 'HAMBURGER', price: 11, color: 'bg-blue-200' },
    { id: 'back_u', name: '<< BACK', price: 0, color: 'bg-zinc-500', isCategory: true, target: 'MAIN' },
  ]
};

export default function MiMexicoGame() {
  // --- LOGIN STATES ---
  const [accessCode, setAccessCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const SECRET_CODE = "MEXICO123"; // 🛠️ CHANGE YOUR CODE HERE

  // --- POS GAME STATES ---
  const [cart, setCart] = useState<any[]>([]);
  const [money, setMoney] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("MAIN");
  const [seconds, setSeconds] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [targetOrder, setTargetOrder] = useState<any[]>([]);
  const [customerSpeech, setCustomerSpeech] = useState("SYSTEM READY");

  useEffect(() => {
    let interval: any;
    if (gameActive && isAuthenticated) interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [gameActive, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.toUpperCase() === SECRET_CODE.toUpperCase()) {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid Access Code");
    }
  };

  const generateOrder = () => {
    const pool = ['MAIN', 'LUNCHES', 'SIDES', 'CARNES'];
    const randomItems = [];
    for(let i=0; i < (Math.floor(Math.random() * 2) + 1); i++) {
      const cat = pool[Math.floor(Math.random() * pool.length)];
      const items = MENU_DATA[cat].filter((i:any) => !i.isCategory);
      randomItems.push(items[Math.floor(Math.random() * items.length)]);
    }
    setTargetOrder(randomItems);
    setCustomerSpeech(`"Order: ${randomItems.map(i => i.name).join(' and ')}."`);
    setCart([]);
    setGameActive(true);
  };

  const checkOrder = () => {
    const cartIds = cart.map(i => i.id).sort().join(',');
    const targetIds = targetOrder.map(i => i.id).sort().join(',');
    if (cartIds === targetIds && cartIds !== "") {
      setMoney(m => m + cart.reduce((a, b) => a + b.price, 0));
      setCustomerSpeech("Correct! Loading next...");
      setTimeout(generateOrder, 1000);
    } else {
      setCustomerSpeech("Error: Item Mismatch");
      setCart([]);
    }
  };

  // --- SCREEN 1: LOGIN GATE ---
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white p-4">
        <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-700 w-full max-w-md shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-5xl mb-4">🌮</h1>
            <h2 className="text-3xl font-bold text-yellow-500 uppercase tracking-tight">Mi Mexico</h2>
            <p className="text-zinc-500 mt-2 italic">Shift Simulator Login</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="text" 
              placeholder="ENTER ACCESS CODE"
              className="w-full bg-black border-2 border-zinc-800 p-4 rounded-lg text-center text-2xl font-black tracking-widest focus:border-yellow-500 outline-none transition-all uppercase"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
            />
            {loginError && <p className="text-red-500 text-center font-bold animate-pulse">{loginError}</p>}
            <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded-lg text-xl transition-transform active:scale-95">
              OPEN TERMINAL
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- SCREEN 2: THE ACTUAL GAME ---
  return (
    <div className="h-screen bg-black text-white font-sans flex flex-col overflow-hidden select-none items-center justify-center">
      <div className="w-[1024px] h-[768px] flex flex-col scale-[0.35] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 origin-center transition-transform">
        
        {/* HEADER */}
        <div className="bg-zinc-300 text-black flex justify-between items-center px-4 py-1 border-b border-zinc-500">
          <div className="flex gap-4 items-center">
             <span className="bg-red-600 text-white px-4 py-0.5 font-black italic">TIME: {seconds}s</span>
             <button 
                onClick={() => setIsAuthenticated(false)} 
                className="bg-zinc-800 text-white px-2 py-0.5 text-[10px] rounded hover:bg-black uppercase font-bold"
             >
                Log Out
             </button>
          </div>
          <span className="font-bold text-xs uppercase italic text-zinc-600">Training Portal: Mi Mexico</span>
        </div>

        <div className="flex-grow flex p-1 gap-1 bg-zinc-900 overflow-hidden">
          {/* LEFT: ORDER AREA */}
          <div className="w-[40%] flex flex-col gap-1">
            <div className="bg-white text-black p-2 border-b-4 border-blue-900">
              <p className="text-[10px] font-black text-blue-900 uppercase">Customer Prompt:</p>
              <p className="text-md font-bold italic h-10 overflow-hidden">{customerSpeech}</p>
            </div>

            <div className="flex-grow bg-blue-700 border-2 border-zinc-400 p-2 font-mono text-[14px] relative">
              <div className="flex justify-between border-b border-blue-400 mb-1 font-black uppercase text-[10px]">
                <span>Server: ShiftSim</span><span>TRAN# 001</span>
              </div>
              <div className="overflow-y-auto h-[300px]">
                {cart.map((item, i) => (
                  <div key={i} className="flex justify-between border-b border-blue-600/30 py-1 uppercase font-bold">
                    <span>1 {item.name}</span><span>{item.price}.00</span>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black p-2 flex justify-between font-black text-blue-400 text-xl border-t-2 border-blue-900">
                <span className="text-xs">TOTAL DUE</span><span>${cart.reduce((a,b)=>a+b.price, 0)}.00</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-1 h-40">
               <button className="bg-red-900 font-bold text-xs">CLEAR</button>
               <button onClick={() => setCart([])} className="bg-blue-950 col-span-2 font-bold text-xs uppercase">Cancel</button>
               <button onClick={checkOrder} className="bg-blue-600 font-black text-xs uppercase">Enter</button>
               {[7,8,9,4,5,6,1,2,3,0].map(n => <button key={n} className="bg-zinc-200 text-black font-black text-xl border-b-2 border-zinc-400">{n}</button>)}
            </div>
          </div>

          {/* RIGHT: TABS & MENU GRID */}
          <div className="w-[53%] flex flex-col gap-1">
            <div className="grid grid-cols-3 gap-1 h-14">
              <button onClick={() => setCurrentCategory("MAIN")} className="bg-yellow-700 text-white font-black text-[11px] uppercase border-b-4 border-yellow-900">Apps</button>
              <button onClick={() => setCurrentCategory("MAIN")} className="bg-yellow-700 text-white font-black text-[11px] uppercase border-b-4 border-yellow-900">Combos</button>
              <button onClick={() => setCurrentCategory("MAIN")} className="bg-yellow-700 text-white font-black text-[11px] uppercase border-b-4 border-yellow-900">Seafood</button>
            </div>
            <div className="grid grid-cols-3 gap-1 h-14">
              <button onClick={() => setCurrentCategory("LUNCHES")} className="bg-green-900 text-white font-black text-[11px] uppercase border-b-4 border-green-950">Lunches</button>
              <button onClick={() => setCurrentCategory("SIDES")} className="bg-yellow-700 text-white font-black text-[11px] uppercase border-b-4 border-yellow-900">Sides</button>
              <button onClick={() => setCurrentCategory("CARNES")} className="bg-yellow-700 text-white font-black text-[11px] uppercase border-b-4 border-yellow-900">Carnes</button>
            </div>

            <div className="h-2 bg-transparent"></div>

            <div className="grid grid-cols-4 gap-1 flex-grow content-start overflow-y-auto">
              {MENU_DATA[currentCategory]?.map((item: any) => (
                <button key={item.id} onClick={() => item.isCategory ? setCurrentCategory(item.target) : setCart([...cart, item])}
                  className={`${item.color} text-black font-black text-[10px] h-24 border border-black/20 shadow-md flex items-center justify-center text-center p-1 leading-tight uppercase`}>
                  {item.name}
                </button>
              ))}
              {Array(4).fill(0).map((_, i) => <div key={i} className="bg-zinc-800/40 border border-zinc-700 h-24 opacity-20"></div>)}
            </div>

            <div className="grid grid-cols-5 gap-1 h-36">
              {["Prep", "Ext", "Add", "No", "Srv"].map(b => <button key={b} className="bg-red-700 font-black text-[10px] uppercase border-b-4 border-red-900">{b}</button>)}
              {["Split", "Void", "+", "-", "Disc"].map(b => <button key={b} className={`${b==='+'||b==='-'?'bg-blue-800':'bg-green-700'} text-white font-black text-[10px] uppercase border-b-4 border-zinc-900`}>{b}</button>)}
              <button onClick={generateOrder} className="bg-green-500 text-black col-span-2 font-black text-sm uppercase border-b-4 border-green-700">Start Shift</button>
              <button onClick={checkOrder} className="bg-blue-600 text-white col-span-3 font-black text-xl uppercase border-b-4 border-blue-900">Cash / Tender</button>
            </div>
          </div>

          {/* BRAND PILLAR */}
          <div className="w-[7%] bg-zinc-800 border-l border-zinc-700 flex flex-col justify-center items-center">
            <p className="rotate-90 whitespace-nowrap text-zinc-600 font-black text-2xl tracking-[1.5rem] uppercase opacity-40">MI MEXICO</p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="bg-black border-t border-zinc-800 px-6 py-1 flex justify-between items-center">
          <span className="text-zinc-600 font-bold text-[9px] uppercase tracking-tighter italic">ShiftSim v1.0</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-zinc-500 uppercase">Bank:</span>
            <span className="text-xl font-black text-green-400">${money}.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}