import { User, ClipboardList, Coffee, Search, ScanLine } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NavbarComponent = () => {
  const location = useLocation();

  const isActive = (path: any) => location.pathname === path;

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md">
      <div className="absolute left-1/2 -top-6 -translate-x-1/2 z-60">
        <button className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/40 transition-all duration-300 hover:scale-110 active:scale-90 hover:bg-blue-500 ring-[6px] ring-white dark:ring-zinc-900">
          <ScanLine
            size={28}
            className="group-hover:rotate-12 transition-transform"
          />
        </button>
      </div>

      <div className="flex items-center justify-between bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-4xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
        <div className="flex w-2/5 justify-around items-center">
          <Link
            to="/menu"
            className={`group flex flex-col items-center gap-1 transition-all ${isActive("/menu") ? "text-blue-600" : "text-zinc-400 hover:text-zinc-600"}`}
          >
            <Coffee
              size={22}
              className="group-hover:-translate-y-0.5 transition-transform"
            />
            <span className="text-[10px] font-medium">Menu</span>
          </Link>

          <Link
            to="/search"
            className={`group flex flex-col items-center gap-1 transition-all ${isActive("/search") ? "text-blue-600" : "text-zinc-400 hover:text-zinc-600"}`}
          >
            <Search
              size={22}
              className="group-hover:-translate-y-0.5 transition-transform"
            />
            <span className="text-[10px] font-medium">Search</span>
          </Link>
        </div>

        <div className="w-12" />

        <div className="flex w-2/5 justify-around items-center">
          <Link
            to="/orders"
            className={`group flex flex-col items-center gap-1 transition-all ${isActive("/orders") ? "text-blue-600" : "text-zinc-400 hover:text-zinc-600"}`}
          >
            <ClipboardList
              size={22}
              className="group-hover:-translate-y-0.5 transition-transform"
            />
            <span className="text-[10px] font-medium">Orders</span>
          </Link>

          <Link
            to="/me"
            className={`group flex flex-col items-center gap-1 transition-all ${isActive("/me") ? "text-blue-600" : "text-zinc-400 hover:text-zinc-600"}`}
          >
            <User
              size={22}
              className="group-hover:-translate-y-0.5 transition-transform"
            />
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;
