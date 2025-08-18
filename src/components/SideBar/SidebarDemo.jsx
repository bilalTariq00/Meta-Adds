"use client"

import React from "react"
import Sidebar from "../Accountoverview/Sidebar"

export default function SidebarDemo() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 p-8 min-w-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Account Overview Demo</h1>
        <p className="text-gray-600 mb-6">
          This is a demo page to test the sidebar component. The sidebar is collapsed by default and expands on hover.
          Notice that "Account overview" is the active item in the sidebar.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Demo Card {item}</h3>
              <p className="text-gray-600">
                This is a demo card to show how the sidebar interacts with the main content area.
                The sidebar should be collapsed by default and expand on hover as an overlay.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 