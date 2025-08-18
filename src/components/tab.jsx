"use client"
import { X } from "lucide-react"



export default function Tab({ id, title, isActive, onClick, onClose }) {
  return (
    <div
      className={`relative flex items-center gap-2 px-3 py-2 mr-0.5 cursor-pointer transition-all duration-200 min-w-[120px] max-w-[180px] overflow-hidden ${
        isActive
          ? "bg-yellow-50 border border-gray-300 border-b-transparent rounded-t-lg z-20 top-0"
          : "bg-transparent hover:bg-black/5 rounded-t-lg top-0.5 z-0"
      }`}
      onClick={() => onClick(id)}
    >
      {/* Curved bottom effect for active tab */}
      {isActive && (
        <>
          <div
            className="absolute bottom-0 -left-5 w-5 h-5 bg-gray-100"
            style={{
              borderBottomRightRadius: "20px",
              boxShadow: "1px -1px 0 0 rgb(255, 255, 233)",
            }}
          ></div>
          <div
            className="absolute bottom-0 -right-5 w-5 h-5 bg-gray-100"
            style={{
              borderBottomLeftRadius: "20px",
              boxShadow: "-1px -1px 0 0 rgb(255, 255, 233)",
            }}
          ></div>
        </>
      )}

      <span className={`text-sm flex-1 truncate ${isActive ? "text-gray-800 font-medium" : "text-gray-600"}`}>
        {title}
      </span>

      <button
        className="p-0.5 hover:bg-black/10 rounded-full transition-colors"
        onClick={(e) => {
          e.stopPropagation()
          onClose(id)
        }}
      >
        <X size={12} className="text-gray-500" />
      </button>
    </div>
  )
}
