"use client";
import Tab from "./tab";
import { Plus } from "lucide-react";

export default function TabSection({
  tabs,
  activeTabId,
  onTabClick,
  onAddTab,
  onRemoveTab,
}) {
  return (
    <div className="flex items-end pl-0.5 pt-0.5 h-fit relative z-10 overflow-y-hidden bg-gray-100">
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
      <button
        className="p-1.5 hover:bg-gray-200 rounded-full transition-colors ml-1"
        onClick={onAddTab}
      >
        <Plus size={16} className="text-gray-600" />
      </button>
    </div>
  );
}
