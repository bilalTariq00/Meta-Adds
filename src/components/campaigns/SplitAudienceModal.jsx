"use client"

import React, { useState } from "react"
import { X } from "lucide-react"

export default function SplitAudienceModal({ open, onClose, onDuplicate }) {
  const [splitBy, setSplitBy] = useState("country")
  const [parts, setParts] = useState(2)
  if (!open) return null
  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-[520px]" onClick={(e)=>e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Split audience</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded"><X className="w-5 h-5"/></button>
        </div>
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-3 items-center gap-2">
            <label className="text-sm">Split by</label>
            <select value={splitBy} onChange={(e)=>setSplitBy(e.target.value)} className="col-span-2 border rounded px-3 py-2 text-sm">
              <option value="country">Country</option>
              <option value="age">Age</option>
              <option value="gender">Gender</option>
            </select>
          </div>
          <div className="grid grid-cols-3 items-center gap-2">
            <label className="text-sm">Number of splits</label>
            <input type="number" min={2} max={10} value={parts} onChange={(e)=>setParts(parseInt(e.target.value||2))} className="col-span-2 border rounded px-3 py-2 text-sm"/>
          </div>
        </div>
        <div className="p-4 flex justify-end gap-2 border-t">
          <button onClick={onClose} className="px-3 py-1.5 border rounded text-sm">Cancel</button>
          <button onClick={()=>{onDuplicate?.({ splitBy, parts }); onClose()}} className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm">Duplicate</button>
        </div>
      </div>
    </div>
  )
} 