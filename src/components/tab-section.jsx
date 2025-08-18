"use client"
import Tab from "./tab"
import { Plus } from "lucide-react"



export default function TabSection({ tabs, activeTabId, onTabClick, onAddTab, onRemoveTab }
) {
  return (
    <div className="flex items-end pl-1 h-10 relative z-10">
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          id={tab.id}
          title={tab.title}
          isActive={tab.id === activeTabId}
          onClick={onTabClick}
          onClose={onRemoveTab}
        />
      ))}
      <button className="p-1.5 hover:bg-black/5 rounded-full transition-colors ml-1" onClick={onAddTab}>
        <Plus size={16} className="text-gray-600" />
      </button>
    </div>
  )
}
