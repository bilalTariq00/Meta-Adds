"use client"

import React, { useState } from "react"

const groups = {
  Popular: ["Day", "Age", "Placement", "Country", "Platform"],
  Time: ["Week", "Month"],
  Demographics: ["Gender", "Age & Gender"],
}

export default function BreakdownsDropdown({ children, onSelect }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <div onClick={() => setOpen((v) => !v)}>{children}</div>
      {open && (
        <div className="absolute right-0 mt-1 w-72 bg-white border border-gray-200 rounded-md shadow p-2 z-20">
          {Object.entries(groups).map(([group, items]) => (
            <div key={group} className="mb-2 last:mb-0">
              <div className="text-xs text-gray-500 px-2 py-1">{group}</div>
              {items.map((label) => (
                <button key={label} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded" onClick={() => { onSelect?.(label); setOpen(false) }}>{label}</button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 