"use client"

import { useEffect, useRef } from "react"
import {
  Download,
  Bookmark,
  History,
  Settings,
  HelpCircle,
  User,
  FileText,
  Printer,
  Share,
  Edit,
  Zap,
} from "lucide-react"



export default function VerticalMenu({ onClose }) {
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target )) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  const menuItems = [
    { icon: <FileText size={16} />, label: "New tab", shortcut: "Ctrl+T" },
    { icon: <Download size={16} />, label: "New window", shortcut: "Ctrl+N" },
    { icon: <User size={16} />, label: "New incognito window", shortcut: "Ctrl+Shift+N" },
    { divider: true },
    { icon: <History size={16} />, label: "History", shortcut: "Ctrl+H" },
    { icon: <Download size={16} />, label: "Downloads", shortcut: "Ctrl+J" },
    { icon: <Bookmark size={16} />, label: "Bookmarks", shortcut: "Ctrl+Shift+O" },
    { divider: true },
    { icon: <Zap size={16} />, label: "Extensions" },
    { divider: true },
    { icon: <Edit size={16} />, label: "Cast..." },
    { icon: <Printer size={16} />, label: "Print...", shortcut: "Ctrl+P" },
    { icon: <Share size={16} />, label: "Share..." },
    { divider: true },
    { icon: <Settings size={16} />, label: "Settings" },
    { icon: <HelpCircle size={16} />, label: "Help" },
  ]

  return (
    <div
      ref={menuRef}
      className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2"
    >
      {menuItems.map((item, index) => {
        if (item.divider) {
          return <div key={index} className="h-px bg-gray-200 my-1" />
        }

        return (
          <button
            key={index}
            className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.label}</span>
            </div>
            {item.shortcut && <span className="text-xs text-gray-400">{item.shortcut}</span>}
          </button>
        )
      })}
    </div>
  )
}
