"use client"

import { useEffect, useRef } from "react"


export default function VerticalMenu({ onClose }) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target )) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  return (
    <div
      ref={menuRef}
      className="absolute top-8 right-0 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[180px] z-50 py-2"
    >
      <ul className="list-none m-0 p-0">
        <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors">New tab</li>
        <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors">
          New window
        </li>
        <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors">
          New incognito window
        </li>
        <hr className="border-none border-t border-gray-200 my-2" />
        <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors">History</li>
        <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors">
          Downloads
        </li>
        <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors">
          Bookmarks
        </li>
        <hr className="border-none border-t border-gray-200 my-2" />
        <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors">Settings</li>
        <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors">Help</li>
      </ul>
    </div>
  )
}
