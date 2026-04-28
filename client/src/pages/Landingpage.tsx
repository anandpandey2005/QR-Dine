import { useEffect } from "react";
import { Utensils, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landingpage() {
  const storeName: string = import.meta.env.VITE_STORE_NAME || "STORE";

  const MENU_LINK = "/menu";
  const TAKEAWAY_LINK = "/takeaway";

  useEffect(() => {
    document.title = `${storeName} | Welcome`;
  }, [storeName]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-orange-100 overflow-x-hidden">
      <header className="relative h-[65vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        <img
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80"
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-110 motion-safe:animate-[pulse_8s_infinite]"
          alt="Hero Food"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#F8FAFC]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
          <p className="text-orange-500 font-black tracking-[0.3em] text-sm md:text-xl mb-2 uppercase drop-shadow-md">
            Welcome to
          </p>
          <h1 className="text-[15vw] md:text-[12rem] font-[1000] leading-[0.8] tracking-tighter text-white uppercase break-words">
            {storeName.split(" ")[0]}
            <br />
            <span className="text-orange-500 inline-block drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
              {storeName.split(" ")[1] || ""}
            </span>
          </h1>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-6 -mt-20 md:-mt-32 relative z-30 space-y-6 pb-20">
        <Link
          to={MENU_LINK}
          className="group flex items-center justify-between p-8 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white transition-all hover:scale-[1.02] active:scale-[0.95]"
        >
          <div className="flex items-center">
            <div className="bg-orange-500 p-5 rounded-3xl mr-6 shadow-lg shadow-orange-200">
              <Utensils className="text-white w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-[900] tracking-tight text-slate-800 uppercase">
                Dine-In
              </h2>
              <p className="text-slate-400 font-bold italic tracking-wide">
                Eat Here
              </p>
            </div>
          </div>
          <div className="bg-slate-100 p-3 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-all">
            <ArrowRight className="w-6 h-6" />
          </div>
        </Link>

        <Link
          to={TAKEAWAY_LINK}
          className="group flex items-center justify-between p-8 bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-900/40 transition-all hover:scale-[1.02] active:scale-[0.95]"
        >
          <div className="flex items-center">
            <div className="bg-white/10 p-5 rounded-3xl mr-6 border border-white/10">
              <ShoppingBag className="text-white w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-[900] tracking-tight text-white uppercase">
                Takeaway
              </h2>
              <p className="text-slate-500 font-bold italic tracking-wide">
                Grab & Go
              </p>
            </div>
          </div>
          <div className="bg-white/10 p-3 rounded-full group-hover:bg-white group-hover:text-slate-900 transition-all text-white">
            <ArrowRight className="w-6 h-6" />
          </div>
        </Link>
      </main>
    </div>
  );
}
