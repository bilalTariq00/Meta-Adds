"use client"

import React, { useMemo, useState } from "react"
import { X, Info, ChevronRight } from "lucide-react"

const objectives = [
  { id: "sales", label: "Sales", desc: "Drive sales online, in app or in store" },
  { id: "leads", label: "Leads", desc: "Collect leads for your business" },
  { id: "traffic", label: "Traffic", desc: "Send people to a destination" },
]

export default function CreateCampaignModal({ open, onClose }) {
  const [activeTab, setActiveTab] = useState("Guided creation")
  const [objective, setObjective] = useState("sales")
  const [values, setValues] = useState({ campaignName: "", dailyBudget: "", websiteUrl: "" })

  const dynamicFields = useMemo(() => {
    switch (objective) {
      case "sales": return [
        { name: "campaignName", label: "Campaign name", type: "text" },
        { name: "dailyBudget", label: "Daily budget ($)", type: "number" },
      ]
      case "leads": return [
        { name: "campaignName", label: "Campaign name", type: "text" },
        { name: "formName", label: "Lead form name", type: "text" },
      ]
      case "traffic": return [
        { name: "campaignName", label: "Campaign name", type: "text" },
        { name: "websiteUrl", label: "Website URL", type: "url" },
      ]
      default: return []
    }
  }, [objective])

  if (!open) return null

  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-[720px] max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold">Create campaign</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded"><X className="w-5 h-5"/></button>
        </div>

        {/* Tabs */}
        <div className="px-4 pt-3">
          <div className="inline-flex bg-gray-100 rounded-md p-1 text-sm">
            {["Guided creation", "Quick creation"].map((t) => (
              <button key={t} onClick={() => setActiveTab(t)} className={`px-3 py-1 rounded ${activeTab===t?"bg-white shadow-sm":"text-gray-600"}`}>{t}</button>
            ))}
          </div>
        </div>

        {/* Objective selector */}
        <div className="p-4">
          <div className="grid grid-cols-3 gap-3">
            {objectives.map((o) => (
              <label key={o.id} className={`border rounded-lg p-3 cursor-pointer hover:border-blue-500 ${objective===o.id?"border-blue-500 bg-blue-50":"border-gray-200"}`}>
                <input type="radio" name="objective" value={o.id} checked={objective===o.id} onChange={() => setObjective(o.id)} className="hidden" />
                <div className="font-medium">{o.label}</div>
                <div className="text-xs text-gray-600">{o.desc}</div>
                <div className="flex items-center gap-1 text-blue-600 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <ChevronRight className="w-3 h-3"/>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Dynamic form */}
        <div className="p-4 space-y-3">
          {dynamicFields.map((f) => (
            <div key={f.name} className="grid grid-cols-3 items-center gap-3">
              <label className="text-sm text-gray-700">{f.label}</label>
              <input type={f.type} value={values[f.name]||""} onChange={(e)=>setValues({...values,[f.name]:e.target.value})} className="col-span-2 border rounded px-3 py-2 text-sm"/>
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-2 border-t">
            <button onClick={onClose} className="px-3 py-1.5 border rounded text-sm">Cancel</button>
            <button onClick={()=>onClose()} className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm">Create</button>
          </div>
        </div>
      </div>
    </div>
  )
} 