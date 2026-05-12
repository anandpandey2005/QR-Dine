import { User, ClipboardList, Coffee, Utensils, ScanLine, UtensilsCrossed } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NavbarComponent = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 px-4">
      <div className="relative w-full max-w-md">
        {/* Floating Action Button (Center) */}
        <div className="absolute left-1/2 -top-6 -translate-x-1/2 z-20">
          <button className="group flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/40 transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-primary-light ring-[5px] ring-slate-50 dark:ring-zinc-900">
            <ScanLine
              size={24}
              className="group-hover:rotate-12 transition-transform"
            />
          </button>
        </div>

        {/* Main Navbar Body */}
        <div className="flex items-center justify-between bg-white/90 backdrop-blur-xl border border-white/40 px-4 py-3 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
          
          {/* Left Side Links */}
          <div className="flex w-[42%] justify-around items-center">
            <Link
              to="/menu"
              className={`group flex flex-col items-center gap-1 transition-all ${isActive("/menu") ? "text-primary" : "text-zinc-400 hover:text-zinc-600"}`}
            >
              <Coffee
                size={20}
                className={`${isActive("/menu") ? "scale-110" : "group-hover:-translate-y-0.5"} transition-all`}
              />
              <span className="text-[10px] font-bold tracking-tight">Menu</span>
            </Link>

            <Link
              to="/tray"
              className={`group flex flex-col items-center gap-1 transition-all ${isActive("/tray") ? "text-primary" : "text-zinc-400 hover:text-zinc-600"}`}
            >
              <UtensilsCrossed
                size={20}
                className={`${isActive("/tray") ? "scale-110" : "group-hover:-translate-y-0.5"} transition-all`}
              />
              <span className="text-[10px] font-bold tracking-tight">Tray</span>
            </Link>
          </div>

          {/* Center Spacer for FAB */}
          <div className="w-14" />

          {/* Right Side Links */}
          <div className="flex w-[42%] justify-around items-center">
            <Link
              to="/orders"
              className={`group flex flex-col items-center gap-1 transition-all ${isActive("/orders") ? "text-primary" : "text-zinc-400 hover:text-zinc-600"}`}
            >
              <ClipboardList
                size={20}
                className={`${isActive("/orders") ? "scale-110" : "group-hover:-translate-y-0.5"} transition-all`}
              />
              <span className="text-[10px] font-bold tracking-tight">Orders</span>
            </Link>

            <Link
              to="/me"
              className={`group flex flex-col items-center gap-1 transition-all ${isActive("/me") ? "text-primary" : "text-zinc-400 hover:text-zinc-600"}`}
            >
              <User
                size={20}
                className={`${isActive("/me") ? "scale-110" : "group-hover:-translate-y-0.5"} transition-all`}
              />
              <span className="text-[10px] font-bold tracking-tight">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;