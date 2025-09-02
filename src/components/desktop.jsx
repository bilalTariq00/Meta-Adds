"use client"
import { Chrome } from "lucide-react"
import Chromes from '@/assets/chrome.png'


export default function Desktop({ onChromeOpen }) {
  return (
    <div 
      className="h-full w-full p-8"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Desktop Icons */}
      <div className="grid grid-cols-1 gap-6 w-fit z-10">
        <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={onChromeOpen}>
          <div className="w-16 h-fit flex items-center justify-center group-hover:scale-110 transition-transform duration-200 z-1 ">
            <img
              src={Chromes}
              alt="My Icon"
              className="w-8 h-8"
            />
          </div>
          <span className="text-white text-sm font-medium drop-shadow-lg">Chrome</span>
        </div>
      </div>
    </div>
  )
}
