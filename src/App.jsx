"use client"

import { useState } from "react"
import Desktop from "./components/desktop"
import ChromeWindow from "./components/chrome-window"
import Taskbar from "./components/taskbar"

function App() {
  const [isChromeOpen, setIsChromeOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const handleChromeOpen = () => {
    setIsChromeOpen(true)
    setIsMinimized(false)
  }

  const handleChromeClose = () => {
    setIsChromeOpen(false)
    setIsMinimized(false)
  }

  const handleChromeMinimize = () => {
    setIsMinimized(true)
  }

  const handleTaskbarChromeClick = () => {
    if (isMinimized) {
      setIsMinimized(false)
    } else if (isChromeOpen) {
      setIsMinimized(true)
    }
  }

  return (
    <main className="h-screen w-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(/placeholder.svg?height=1080&width=1920&query=desktop wallpaper background)`,
        }}
      />

      <Desktop onChromeOpen={handleChromeOpen} />

      {isChromeOpen && (
        <div className={`${isMinimized ? "hidden" : "block"}`}>
          <ChromeWindow onClose={handleChromeClose} onMinimize={handleChromeMinimize} />
        </div>
      )}

      <Taskbar isChromeOpen={isChromeOpen} isMinimized={isMinimized} onChromeClick={handleTaskbarChromeClick} />
    </main>
  )
}

export default App