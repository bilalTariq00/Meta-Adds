"use client"

import { X, Plus } from "lucide-react"


export default function TabSection({ tabs, activeTabId, onTabClick, onAddTab, onRemoveTab }) {
  return (
    <div className="flex items-center">
      {/* Tabs */}
      <div className="flex">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`group flex items-center gap-2 px-4 py-2 min-w-0 max-w-48 cursor-pointer border-r border-yellow-200 transition-colors ${
              activeTabId === tab.id ? "bg-white text-gray-900" : "bg-yellow-50 text-gray-700 hover:bg-yellow-200"
            }`}
            onClick={() => onTabClick(tab.id)}
          >
            {/* Tab Icon */}
            <div className="flex-shrink-0 w-4 h-4">
              {tab.type === "google" ? (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
              ) : tab.type === "meta-ads" ? (
                <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">∞</span>
                </div>
              ) : (
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
              )}
            </div>

            {/* Tab Title */}
            <span className="flex-1 truncate text-sm font-medium">{tab.title}</span>

            {/* Close Button */}
            {tabs.length > 1 && (
              <button
                className="flex-shrink-0 w-4 h-4 rounded-full hover:bg-gray-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  onRemoveTab(tab.id)
                }}
              >
                <X size={12} className="text-gray-600" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Tab Button */}
      <button
        className="flex-shrink-0 w-8 h-8 ml-2 hover:bg-yellow-200 rounded-full flex items-center justify-center transition-colors"
        onClick={onAddTab}
      >
        <Plus size={16} className="text-gray-600" />
      </button>
    </div>
  )
}
