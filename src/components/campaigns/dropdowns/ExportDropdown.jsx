"use client"

import React, { useState } from "react"

export default function ExportDropdown({ children, onSelect }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <div onClick={() => setOpen((v) => !v)}>{children}</div>
      {open && (
        <div className="absolute right-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow p-2 z-20">
          {["Export table (.csv)", "Export summary (.csv)", "Export for Excel"].map((label) => (
            <button key={label} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded" onClick={() => { onSelect?.(label); setOpen(false) }}>{label}</button>
          ))}
        </div>
      )}
    </div>
  )
} 