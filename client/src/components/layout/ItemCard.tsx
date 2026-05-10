import { Star } from "lucide-react";
import AddButton from "../common/button/AddButton";

const ItemCard = ({
  name = "Classic Margherita",
  ingredients = "Fresh mozzarella, tomato sauce, basil, olive oil",
  price = "12.99",
  originalPrice = "15.99",
  rating = 4.5,
  reviews = 120,
  image = import.meta.env.VITE_DEFAULT_IMAGE,
}) => {
  return (
    <div className="group w-full bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Discount Badge */}
        {originalPrice && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider shadow-lg">
            {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
          </div>
        )}

        {/* Rating Overlay */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span className="text-[11px] font-bold text-slate-700">{rating}</span>
          <span className="text-[10px] text-slate-400">({reviews})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-base font-bold text-slate-800 leading-tight line-clamp-1">
            {name}
          </h3>
        </div>
        <div className="flex flex-col gap-1 text-xs tracking-normal">
          <p className="font-bold">ingredients:</p>
          <p className="text-xs  text-slate-500 line-clamp-3 leading-relaxed flex-grow overflow-auto tracking-normal">
            {ingredients}
          </p>
        </div>
        {/* Action Area */}
        <div className="pt-3 flex items-center justify-between border-t border-slate-50 mt-auto">
          <div className="flex flex-col">
            <span className="text-sm text-slate-400 line-through decoration-slate-300">
              ₹{originalPrice}
            </span>
            <span className="text-xl font-black text-slate-900 leading-none">
              ₹{price}
            </span>
          </div>

          <AddButton />
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
