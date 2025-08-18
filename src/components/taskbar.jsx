"use client"
import { Chrome, Search, Wifi, Volume2, Battery } from "lucide-react"
import windows from "@/assets/window.png"


export default function Taskbar({ isChromeOpen, isMinimized, onChromeClick }) {
  const currentTime = new Date()
const timeString = currentTime.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
})

  const dateString = currentTime.toLocaleDateString([], { month: "numeric", day: "numeric", year: "numeric" })

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-300 backdrop-blur-sm border-t border-gray-600/30 ">
      <div className="flex items-center h-full px-2 gap-1">
        <button className="h-8 w-8 hover:bg-white/10 rounded flex items-center justify-center transition-colors group">
          
  <img
    src={windows}
    alt="icon"
    className="w-full h-full object-cover"
  />


        
        </button>

      <div className="h-10 px-4 hover:bg-white/70 rounded flex items-center gap-2 transition-colors min-w-[200px] bg-white/50">
  <Search size={16} className="text-gray-500" />
  <input
    type="text"
    placeholder="Type here to search"
    className="bg-transparent outline-none text-sm flex-1 placeholder:text-gray-500"
  />
</div>


        <div className="flex gap-1 ml-2">
          {isChromeOpen && (
            <button
              onClick={onChromeClick}
              className={`h-10 w-12 rounded flex items-center justify-center transition-colors ${
                isMinimized ? "hover:bg-white/10" : "bg-white/20 hover:bg-white/30 border-b-2 border-blue-400"
              }`}
            >
              <Chrome size={20} className="" />
            </button>
          )}
        </div>

        <div className="ml-auto flex items-center gap-3 px-3">
          <div className="flex items-center gap-2">
            <Wifi size={16} className="" />
            <Volume2 size={16} className="" />
            <Battery size={16} className="" />
          </div>
          <div className=" text-sm text-right leading-tight">
            <div className="font-medium">{timeString}</div>
            <div className="text-xs ">{dateString}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
