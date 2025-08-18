"use client"

import React from "react"

const FooterIcon = ({ icon, label, onClick, tooltip, sidebarExpanded, badge }) => (
  <div className="relative group">
    <button
      onClick={onClick}
      className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
      title={sidebarExpanded ? label : tooltip}
    >
      {icon}
      {badge && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">{badge}</span>
        </div>
      )}
    </button>
    {!sidebarExpanded && tooltip && (
      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[9999]">
        {tooltip}
      </div>
    )}
  </div>
)

export default FooterIcon 