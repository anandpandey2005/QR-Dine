import { Plus } from "lucide-react";

interface AddButtonProps {
  onClick?: () => void;
  text?: string;
}

const AddButton = ({ onClick, text = "ADD" }: AddButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 bg-blue-400 hover:bg-blue-500 text-amber-950 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-md shadow-amber-200/50"
    >
      <Plus size={18} strokeWidth={3} />
      {text}
    </button>
  );
};

export default AddButton;
