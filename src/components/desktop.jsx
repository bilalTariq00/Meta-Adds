"use client"
import { Chrome } from "lucide-react"
import Chromes from '@/assets/chrome.png'


export default function Desktop({ onChromeOpen }) {
  return (
    <div className="h-full w-full p-8">
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
