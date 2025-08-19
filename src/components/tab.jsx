"use client";
import { X } from "lucide-react";

export default function Tab({ id, title, isActive, onClick, onClose }) {
  return (
    <div
      className={`relative flex items-center gap-2 px-3 py-2 mr-0.5 cursor-pointer transition-all duration-200 min-w-[120px] max-w-[180px] overflow-hidden ${
        isActive ? "bg-white  z-20" : "bg-yellow-100 hover:bg-yellow-200  "
      } rounded-t-2xl `} // 🔥 this adds the top curve
      onClick={() => onClick(id)}
    >
      {/* Left curve filler */}
      {isActive && (
        <div className="absolute left-[-16px] bottom-0 w-5 h-7 bg-yellow-100  rounded-br-xl "></div>
      )}
      {/* Right curve filler */}
      {isActive && (
        <div className="absolute right-[-16px] bottom-0 w-5 h-7 bg-yellow-100  rounded-bl-xl"></div>
      )}

      <span
        className={`text-sm flex-1 truncate ${
          isActive ? "text-gray-800 font-medium" : "text-gray-600"
        }`}
      >
        {title}
      </span>
      <button
        className="p-0.5 hover:bg-black/10 rounded-full transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onClose(id);
        }}
      >
        <X size={12} className="text-gray-500" />
      </button>
    </div>
  );
}
