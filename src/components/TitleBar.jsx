// TitleBar.tsx
"use client";
import { Minus, Square, Copy, X } from "lucide-react";
import TabSection from "./tab-section";

export default function TitleBar({
  isMaximized,
  onMinimize,
  handleMaximize,
  onClose,
  tabs,
  activeTabId,
  handleTabClick,
  addTab,
  removeTab,
}) {
  return (
    <div
      className={`flex justify-between items-center h-9 pt-1 bg-yellow-100 text-white select-none
      ${!isMaximized ? "rounded-t-lg" : ""}`}
    >
      {/* Tabs Section */}
      <div className="flex-1">
        <div className="flex items-center h-full">
          {/* Import your TabSection separately */}
          <TabSection
            tabs={tabs}
            activeTabId={activeTabId}
            onTabClick={handleTabClick}
            onAddTab={addTab}
            onRemoveTab={removeTab}
          />
        </div>
      </div>

      {/* Window Controls */}
      <div className="flex gap-1 pr-2">
        <button
          className="w-8 h-8 rounded hover:bg-neutral-700 flex items-center justify-center transition-colors text-black"
          onClick={onMinimize}
        >
          <Minus size={14} />
        </button>
        <button
          className="w-8 h-8 rounded hover:bg-neutral-700 flex items-center justify-center transition-colors text-black"
          onClick={handleMaximize}
        >
          {isMaximized ? <Copy size={14} /> : <Square size={14} />}
        </button>
        <button
          className="w-8 h-8 rounded hover:bg-red-500 flex items-center justify-center transition-colors text-black"
          onClick={onClose}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
