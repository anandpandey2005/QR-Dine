import { User, ClipboardList, Coffee, Search, ScanLine } from "lucide-react";

const NavbarComponent = () => {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-lg">
      <div className="absolute left-1/2 -top-10 -translate-x-1/2 z-50">
        <button className="group relative flex h-25 w-25 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-blue-700 ring-4 ring-white">
          <ScanLine
            size={32}
            className="group-hover:rotate-12 transition-transform"
          />
        </button>
      </div>

      <div className="flex items-center justify-between bg-white/90 backdrop-blur-lg border border-gray-100 px-4 py-3  shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        <div className="flex w-1/3 justify-around">
          <button className="group flex flex-col items-center gap-1 text-blue-600 transition-all hover:-translate-y-1">
            <Coffee
              size={24}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="text-[10px] font-semibold">Menu</span>
          </button>

          <button className="group flex flex-col items-center gap-1 text-gray-400 hover:text-blue-500 transition-all hover:-translate-y-1">
            <Search
              size={24}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="text-[10px] font-semibold">Search</span>
          </button>
        </div>

        {/* Spacer for the QR Button */}
        <div className="w-16" />

        {/* Right Side: Orders & Profile */}
        <div className="flex w-1/3 justify-around">
          <button className="group flex flex-col items-center gap-1 text-gray-400 hover:text-blue-500 transition-all hover:-translate-y-1">
            <ClipboardList
              size={24}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="text-[10px] font-semibold">Orders</span>
          </button>

          <button className="group flex flex-col items-center gap-1 text-gray-400 hover:text-blue-500 transition-all hover:-translate-y-1">
            <User
              size={24}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="text-[10px] font-semibold">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;
