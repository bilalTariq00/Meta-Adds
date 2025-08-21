"use client"

import React, { useState } from "react"
import { X, Plus, BarChart3 } from "lucide-react"

export default function ChartsSidebar({ open, onClose }) {
  const [metrics, setMetrics] = useState(["Impressions", "Reach"]) 
  const [charts, setCharts] = useState([{ id: 1, metric: "Impressions" }])
  if (!open) return null

  const addMetric = () => setMetrics((m)=>[...m, `Metric ${m.length+1}`])
  const addChart = () => setCharts((c)=>[...c, { id: Date.now(), metric: metrics[0] }])

  return (
    <div className="absolute inset-y-0 right-0 w-[360px] bg-white border-l border-gray-200 shadow-xl z-[50] flex flex-col">
      <div className="p-3 border-b flex items-center justify-between">
        <div className="font-semibold">Charts comparison</div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded"><X className="w-5 h-5"/></button>
      </div>

      <div className="p-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="font-medium">Metrics</div>
          <button onClick={addMetric} className="text-sm px-2 py-1 border rounded flex items-center gap-1"><Plus className="w-4 h-4"/>Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {metrics.map((m, idx)=>(<span key={idx} className="px-2 py-1 bg-gray-100 rounded text-xs">{m}</span>))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="font-medium">Charts</div>
          <button onClick={addChart} className="text-sm px-2 py-1 border rounded flex items-center gap-1"><Plus className="w-4 h-4"/>Add chart</button>
        </div>
        <div className="space-y-3">
          {charts.map((c)=> (
            <div key={c.id} className="border rounded p-3">
              <div className="text-sm text-gray-700 flex items-center gap-2">
                <BarChart3 className="w-4 h-4"/> {c.metric}
              </div>
              <div className="h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 