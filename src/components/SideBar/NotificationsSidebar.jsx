"use client"

import React, { useState } from "react"
import { X, Settings, Bell, ColumnsSettingsIcon } from "lucide-react"
import { Avatar } from "../ui/avatar"

const NotificationsSidebar = ({ isOpen, onClose, sidebarCollapsedWidth = 64 }) => {
  const [activeTab, setActiveTab] = useState("All")

  const tabs = ["All", "Business", "Ads", "Apps"]

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-[9998]"
        style={{ background: "transparent" }}
        onClick={onClose}
      />
    <div className="absolute inset-y-0 left-0 w-96 bg-white border-r border-gray-200 shadow-xl z-[9999] max-h-screen overflow-y-auto"
    style={{ left: sidebarCollapsedWidth, width: "24rem" }}
     onClick={e => e.stopPropagation()}  >
      <div className="px-4 pt-2 pb-4 ">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          <div className="flex items-center ">
            <button className="py-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ColumnsSettingsIcon size={16} className="text-gray-600" />
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
          <Avatar size={16} className="text-gray-600 flex items-center justify-center">
  <span className="text-xs font-bold">N</span>
</Avatar>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex gap-1 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors   ${
                activeTab === tab
                  ? "bg-[#0A78BE] text-white"
                  : "text-gray-600 hover:bg-gray-100 border border-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell size={32} className="text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h4>
          <p className="text-gray-600 mb-4">
            When you receive notifications, you'll see them here. You can edit your settings to see the notifications that you care about most.
          </p>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Update ad account settings
          </button>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Mark all as read
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default NotificationsSidebar 