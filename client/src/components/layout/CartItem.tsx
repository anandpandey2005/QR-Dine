import React, { useState } from "react";
import {
  Plus,
  Minus,
  Trash2,
  MessageSquareText,
  IndianRupee,
} from "lucide-react";

const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onDelete,
  onUpdateQuantity,
  onUpdateNote,
}) => {
  const [showNote, setShowNote] = useState(!!item?.note);
  const defaultImage = import.meta.env.VITE_DEFAULT_IMAGE;

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      onUpdateQuantity(item.id, value);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white border-b border-primary-light p-4 transition-all overflow-auto rounded-2xl ">
      <div className="flex gap-4 items-start">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
          <img
            src={item?.image || defaultImage}
            alt={item?.name}
            className="w-full h-full object-cover rounded-[18px] bg-[#f9fafb] border border-[#f3f4f6]"
          />
        </div>

        <div className="flex flex-col flex-grow min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-[16px] font-semibold text-gray-900 truncate leading-tight tracking-normal">
              {item?.name || "Product Name"}
            </h3>
            <button
              onClick={() => onDelete(item.id)}
              className="text-gray-300 hover:text-[#ef4444] transition-colors ml-2"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <p className="text-[14px] text-gray-500 font-medium">
              ₹{item?.price?.toFixed(2)}
            </p>
            <button
              onClick={() => setShowNote(!showNote)}
              className={`text-[12px] flex items-center gap-1 font-medium tracking-normal transition-colors ${showNote ? "text-primary" : "text-gray-400 hover:text-gray-600"}`}
            >
              <MessageSquareText size={14} />
              {showNote ? "Remove Customizations" : "Add Customizations"}
            </button>
          </div>

          {showNote && (
            <div className="mb-4 animate-in fade-in slide-in-from-top-1 duration-200">
              <input
                type="text"
                placeholder="Extra spicy, no onions..."
                value={item?.note || ""}
                onChange={(e) => onUpdateNote(item.id, e.target.value)}
                className="w-full bg-[#f9fafb] border border-[#e5e7eb] rounded-lg px-3 py-2 text-[13px] tracking-normal focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white transition-all"
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center bg-[#f3f4f6] rounded-full p-1 h-9 shadow-inner">
              <button
                onClick={() => onDecrease(item.id)}
                className="w-7 h-7 flex items-center justify-center bg-white rounded-full shadow-sm active:scale-90 transition-transform disabled:opacity-50"
                disabled={item?.quantity <= 1}
              >
                <Minus size={12} strokeWidth={3} className="text-[#374151]" />
              </button>

              <input
                type="number"
                value={item?.quantity || 0}
                onChange={handleInputChange}
                className="w-10 bg-transparent text-center text-[15px] font-bold focus:outline-none"
              />

              <button
                onClick={() => onIncrease(item.id)}
                className="w-7 h-7 flex items-center justify-center bg-white rounded-full shadow-sm active:scale-90 transition-transform"
              >
                <Plus size={12} strokeWidth={3} className="text-[#374151]" />
              </button>
            </div>

            <div className="text-[16px] font-bold text-[#111827]">
              ₹{(item?.price * item?.quantity).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
