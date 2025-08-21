"use client"

import React, { useState } from "react"

export default function AdsReportingDropdown({ children, onSelect }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <div onClick={() => setOpen((v) => !v)}>{children}</div>
      {open && (
        <div className="absolute right-0 mt-1 w-80 bg-white border border-gray-200 rounded-md shadow p-2 z-20">
          <div className="px-3 py-2 text-xs text-gray-500">Templates</div>
          {["Performance summary", "Delivery overview", "Engagement overview"].map((t) => (
            <button key={t} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded" onClick={() => { onSelect?.({ type: "template", value: t }); setOpen(false) }}>{t}</button>
          ))}
          <div className="border-t my-2"/>
          <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded" onClick={() => { onSelect?.({ type: "create" }); setOpen(false) }}>Create new report…</button>
        </div>
      )}
    </div>
  )
} 