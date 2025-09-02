"use client";
import { X } from "lucide-react";

export default function Tab({ id, title, isActive, onClick, onClose }) {
  return (
    <div
      className={`relative flex items-center gap-2 px-3 py-1.5 mr-0.5 cursor-pointer transition-all duration-200 min-w-[120px] max-w-[200px] overflow-visible ${
        isActive ? "bg-white z-20" : "bg-gray-100 hover:bg-gray-200"
      }`}
      style={{
        borderRadius: isActive ? "18px 22px 0 0" : "6px 6px 0 0",
        borderBottomLeftRadius: isActive ? "0" : "6px",
        borderBottomRightRadius: isActive ? "0" : "6px",
        position: "relative"
      }}
      onClick={() => onClick(id)}
    >
      {/* Left outward curve for active tab */}
      {isActive && (
        <div 
          className="absolute left-0 bottom-0 w-1.5 h-full bg-gray-100"
          style={{
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "100px",
            borderTopLeftRadius: "100px",
            borderTopRightRadius: "0px"
          }}
        />
      )}
      
      {/* Right outward curve for active tab */}
      {isActive && (
        <div 
          className="absolute right-0 bottom-0 w-1.5 h-full bg-gray-100"
          style={{
            borderBottomLeftRadius: "100px",
            borderBottomRightRadius: "0px",
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "100px"
          }}
        />
      )}

      <span
        className={`text-sm flex-1 truncate ${
          isActive ? "text-gray-800" : "text-gray-600"
        }`}
      >
        {title}
      </span>
      <button
        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onClose(id);
        }}
      >
        <X size={12} className="text-gray-600" />
      </button>
    </div>
  );
}
