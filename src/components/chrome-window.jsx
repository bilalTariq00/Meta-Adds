"use client"

import { useState, useCallback } from "react"
import TabSection from "./tab-section"
import SearchBar from "./search-bar"
import VerticalMenu from "./vertical-menu"
import ChromeContent from "./chrome-content"
import {
  Minus,
  Square,
  X,
  Copy,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  MoreVertical,
  Puzzle,
  UserCircle,
  FlaskConical,
  Pencil,
} from "lucide-react"


export default function ChromeWindow({ onClose, onMinimize }) {
  const [isMaximized, setIsMaximized] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

 const [tabs, setTabs] = useState([
    { id: "tab-home", title: "New Tab", type: "google", content: "Welcome to your new tab!" },
    { id: "tab-meta", title: "Meta Ads Manager", type: "meta-ads", content: "Meta advertising platform" },
    
  ])
  const [activeTabId, setActiveTabId] = useState(tabs[0].id)

  // Window controls
  const handleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  // Tab controls
  const addTab = useCallback(() => {
    const newTabId = `tab-${Date.now()}`
    const newTab = {
      id: newTabId,
      title: `New Tab ${tabs.length + 1}`,
      type: "text",
      content: `Content for New Tab ${tabs.length + 1}`,
    }
    setTabs((prevTabs) => [...prevTabs, newTab])
    setActiveTabId(newTabId)
  }, [tabs.length])

  const removeTab = useCallback(
    (idToRemove) => {
      if (tabs.length === 1) {
        alert("Cannot close the last tab!")
        return
      }
      const tabIndexToRemove = tabs.findIndex((tab) => tab.id === idToRemove)
      const newTabs = tabs.filter((tab) => tab.id !== idToRemove)
      setTabs(newTabs)

      if (activeTabId === idToRemove) {
        const newActiveIndex = Math.max(0, tabIndexToRemove - 1)
        setActiveTabId(newTabs[newActiveIndex].id)
      }
    },
    [tabs, activeTabId],
  )

  const handleTabClick = useCallback((id) => {
    setActiveTabId(id)
  }, [])

  const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0]

  return (
    <div
      className={`fixed bg-yellow shadow-2xl flex flex-col border border-gray-300 transition-all duration-200 ease-in-out z-2 ${
        isMaximized
          ? "top-0 left-0 right-0 bottom-12 rounded-none" // Changed from inset-0 to leave space for taskbar
          : "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-xl"
      }`}
      style={{ minWidth: "600px", minHeight: "400px" }}
    >
      {/* Row 1: Tabs + Window Controls */}
      <div className={`flex justify-between bg-yellow-100 ${!isMaximized ? "rounded-t-xl" : ""}`}>
        <TabSection
          tabs={tabs}
          activeTabId={activeTabId}
          onTabClick={handleTabClick}
          onAddTab={addTab}
          onRemoveTab={removeTab}
        />
        <div className="flex gap-2 pr-3 py-1">
          <button
            className="w-6 h-6 rounded-sm  hover:bg-yellow-500 flex items-center justify-center transition-colors"
            onClick={onMinimize}
          >
            <Minus size={12} className="text-black/60" />
          </button>
          <button
            className="w-6 h-6 rounded-sm  hover:bg-green-500 flex items-center justify-center transition-colors"
            onClick={handleMaximize}
          >
            {isMaximized ? (
              <Copy size={12} className="text-black/60" />
            ) : (
              <Square size={12} className="text-black/60" />
            )}
          </button>
          <button
            className="w-6 h-6 rounded-sm  hover:bg-red-500 flex items-center justify-center transition-colors"
            onClick={onClose}
          >
            <X size={12} className="text-black/60" />
          </button>
        </div>
      </div>

      {/* Row 2: Navigation Bar */}
      <div className="flex items-center bg-yellow-50 px-3 py-2 gap-2">
        <div className="flex gap-1">
          <button className="p-1.5 hover:bg-black/5 rounded-lg transition-colors">
            <ArrowLeft size={16} className="text-gray-600" />
          </button>
          <button className="p-1.5 hover:bg-black/5 rounded-lg transition-colors">
            <ArrowRight size={16} className="text-gray-600" />
          </button>
          <button className="p-1.5 hover:bg-black/5 rounded-lg transition-colors">
            <RotateCw size={16} className="text-gray-600" />
          </button>
        </div>

        <SearchBar />

        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-black/5 rounded-lg transition-colors">
            <Puzzle size={16} className="text-gray-600" />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          <button className="p-1.5 hover:bg-black/5 rounded-lg transition-colors">
            <UserCircle size={16} className="text-gray-600" />
          </button>
          <button
            className="p-1.5 hover:bg-black/5 rounded-lg transition-colors relative"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreVertical size={16} className="text-gray-600" />
            {showMenu && <VerticalMenu onClose={() => setShowMenu(false)} />}
          </button>
        </div>
      </div>

      {/* Row 3: Top Bar */}
      {/* <div className="flex justify-end items-center px-4 py-2 text-sm text-gray-600">
        <div className="flex gap-4 mr-4">
          <a href="#" className="hover:underline rounded-md px-2 py-1 hover:bg-gray-50 transition-colors">
            Gmail
          </a>
          <a href="#" className="hover:underline rounded-md px-2 py-1 hover:bg-gray-50 transition-colors">
            Images
          </a>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <FlaskConical size={18} className="text-gray-600" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="5" cy="5" r="2" />
              <circle cx="12" cy="5" r="2" />
              <circle cx="19" cy="5" r="2" />
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
              <circle cx="5" cy="19" r="2" />
              <circle cx="12" cy="19" r="2" />
              <circle cx="19" cy="19" r="2" />
            </svg>
          </button>
        </div>
      </div> */}

      {/* Row 4: Page Content */}
      <div className={`flex-1 overflow-auto relative ${!isMaximized ? "rounded-b-xl" : ""}`}>
        <ChromeContent activeTab={activeTab} />
      </div>
    </div>
  )
}
