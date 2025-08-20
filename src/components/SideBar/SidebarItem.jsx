"use client";

import React from "react";

const SidebarItem = ({
  icon,
  label,
  active,
  onClick,
  badge,
  className = "",
  sidebarExpanded,
}) => (
  <div
    onClick={onClick}
    className={`group flex items-center gap-3 px-3 py-2 mx-2 rounded-lg cursor-pointer transition-all duration-200 ${
      active
        ? "bg-blue-50 text-[#0A78BE]"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    } ${className}`}
  >
    <div className="relative w-5 h-5 flex items-center justify-center flex-shrink-0">
      {icon}
      {badge && !sidebarExpanded && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">{badge}</span>
        </div>
      )}
    </div>
    {sidebarExpanded && (
      <div className="flex items-center justify-between w-full gap-2">
        <span className="text-sm font-medium whitespace-nowrap">{label}</span>
        {badge && (
          <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center ml-2">
            <span className="text-white text-xs font-bold">{badge}</span>
          </div>
        )}
      </div>
    )}
  </div>
);

export default SidebarItem;
