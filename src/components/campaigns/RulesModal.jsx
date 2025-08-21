"use client"

import React, { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export default function RulesModal({ open, onClose, onSave }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: "New Rule", condition: "CTR < 1%", action: "Increase budget 10%" })
  if (!open) return null
  const next = () => setStep((s)=>Math.min(2,s+1))
  const prev = () => setStep((s)=>Math.max(1,s-1))

  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-[620px]" onClick={(e)=>e.stopPropagation()}>
        <div className="flex items-center justify-between p-3 border-b">
          <div className="font-semibold">Create/Manage rules</div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded"><X className="w-5 h-5"/></button>
        </div>
        {step===1 && (
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-3 items-center gap-3">
              <label className="text-sm">Rule name</label>
              <input value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} className="col-span-2 border rounded px-3 py-2 text-sm"/>
            </div>
            <div className="grid grid-cols-3 items-center gap-3">
              <label className="text-sm">Condition</label>
              <input value={form.condition} onChange={(e)=>setForm({...form, condition:e.target.value})} className="col-span-2 border rounded px-3 py-2 text-sm"/>
            </div>
          </div>
        )}
        {step===2 && (
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-3 items-center gap-3">
              <label className="text-sm">Action</label>
              <input value={form.action} onChange={(e)=>setForm({...form, action:e.target.value})} className="col-span-2 border rounded px-3 py-2 text-sm"/>
            </div>
          </div>
        )}
        <div className="flex justify-between p-4 border-t">
          <button onClick={prev} className="px-3 py-1.5 border rounded text-sm disabled:opacity-50" disabled={step===1}><ChevronLeft className="w-4 h-4 inline"/> Back</button>
          {step<2 ? (
            <button onClick={next} className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm">Next <ChevronRight className="w-4 h-4 inline"/></button>
          ) : (
            <button onClick={()=>onSave?.(form)} className="px-3 py-1.5 bg-green-600 text-white rounded text-sm">Save rule</button>
          )}
        </div>
      </div>
    </div>
  )
} 