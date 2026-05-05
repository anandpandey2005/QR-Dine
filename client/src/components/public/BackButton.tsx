import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="group fixed top-4 mx-5  z-50 flex items-center justify-center 
                 w-10 h-10 rounded-full transition-all duration-300
                 bg-white/70 dark:bg-black/40 backdrop-blur-md 
                 border border-white/20 shadow-sm
                 hover:bg-white/90 dark:hover:bg-black/60 hover:scale-105 active:scale-95"
      aria-label="Go back"
    >
      <ArrowLeft
        size={20}
        className="text-zinc-800 dark:text-zinc-200 group-hover:-translate-x-0.5 transition-transform"
      />
    </button>
  );
};

export default BackButton;
