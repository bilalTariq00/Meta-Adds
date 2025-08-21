"use client"

import React, { useState } from "react"
import { X, Trash2, Settings } from "lucide-react"

export default function SaveEditsPanel({ open, onClose }) {
  const [name, setName] = useState("Active ads")
  const [description, setDescription] = useState("")

  if (!open) return null

  return (
    <div className="w-[380px] bg-white border-l border-gray-200 h-full flex flex-col shrink-0">
      <div className="p-3 border-b flex items-center justify-between">
        <div className="font-semibold">Save edits</div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded"><X className="w-5 h-5"/></button>
      </div>

      <div className="p-4 space-y-4 overflow-auto">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <div className="flex items-center gap-2">
            <input value={name} onChange={(e)=>setName(e.target.value)} className="flex-1 border rounded px-3 py-2 text-sm" />
            <span className="text-xs text-gray-500">{name.length}/100</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows={2} className="w-full border rounded px-3 py-2 text-sm" placeholder="Describe what this view is about."/>
        </div>

        {/* Access */}
        <div>
          <label className="block text-sm font-medium mb-1">Access</label>
          <select className="w-full border rounded px-3 py-2 text-sm">
            <option>Only you</option>
          </select>
        </div>

        {/* Filters */}
        <div>
          <div className="text-sm font-semibold mb-1">Filters</div>
          <button className="text-sm text-blue-600 hover:underline">+ Add</button>
        </div>

        {/* Columns */}
        <div>
          <div className="text-sm font-semibold mb-1">Columns</div>
          <div className="flex items-center gap-2 mb-2">
            <select className="flex-1 border rounded px-3 py-2 text-sm">
              <option>Columns: Performance</option>
            </select>
            <button className="p-2 border rounded"><Settings className="w-4 h-4"/></button>
          </div>
          <div className="flex items-center gap-2">
            <select className="flex-1 border rounded px-3 py-2 text-sm">
              <option>Sorting: Delivery</option>
            </select>
            <button className="p-2 border rounded">↑</button>
          </div>
        </div>

        {/* Breakdowns */}
        <div>
          <div className="text-sm font-semibold mb-1">Breakdowns</div>
          <select className="w-full border rounded px-3 py-2 text-sm">
            <option>Breakdowns: None selected</option>
          </select>
        </div>

        {/* Attribution settings */}
        <div>
          <div className="text-sm font-semibold mb-1">Attribution settings</div>
          <button className="text-sm text-blue-600 hover:underline">+ Add comparison</button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 border-t flex items-center gap-2">
        <button className="p-2 border rounded text-gray-700"><Trash2 className="w-4 h-4"/></button>
        <button className="ml-auto px-3 py-1.5 border rounded text-sm">Save copy</button>
        <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm">Save edits</button>
      </div>
    </div>
  )
} 