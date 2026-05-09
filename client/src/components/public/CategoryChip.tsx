interface CategoryProps {
  name: string;
}

const CategoryChip = ({ name }: CategoryProps) => {
  return (
    <button
      className="
      inline-flex items-center justify-center
      px-5 py-2 
      text-[15px] font-medium tracking-tight text-black
      rounded-full 
      bg-white/80 backdrop-blur-md
      border border-gray-200/50
      shadow-[0_2px_8px_rgba(0,0,0,0.06)]
      active:scale-95 transition-all duration-200
      hover:bg-gray-50
    "
    >
      {name}
    </button>
  );
};

export default CategoryChip;
