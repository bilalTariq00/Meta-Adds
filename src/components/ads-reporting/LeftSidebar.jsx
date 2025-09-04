"use client";

import { useState } from "react";
import { FileText, Download, Server, Sidebar } from "lucide-react";

export default function LeftSidebar({ activeView, onViewChange }) {
  const [collapsed, setCollapsed] = useState(true);
  
  const sidebarItems = [
    {
      id: "reports",
      label: "Reports",
      icon: FileText,
      active: activeView === "reports"
    },
    {
      id: "exports",
      label: "Exports",
      icon: Download,
      active: activeView === "exports"
    }
  ];

  return (
    <div className={` flex flex-col items-center  transition-all duration-300 ${
      collapsed ? "w-20" : "w-48"
    }`}>
      {/* White Card Container */}
      <div className={`bg-white rounded-md shadow-lg transition-all duration-300 ${
        collapsed ? "p-2 w-16" : "p-4 w-44"
      } flex flex-col  space-y-3`}>

        {/* Navigation Items */}
        {sidebarItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center rounded-lg transition-all duration-200 ${
                item.active
                  ? "bg-blue-100"
                  : "hover:bg-gray-50"
              } ${collapsed ? "justify-center p-2" : "p-3"}`}
            >
              <IconComponent className={`flex-shrink-0 ${
                item.active
                  ? "text-blue-600"
                  : "text-gray-600"
              } ${collapsed ? "w-5 h-5" : "w-5 h-5"}`} />
              {!collapsed && (
                <span className={`ml-3 font-medium ${
                  item.active
                    ? "text-blue-600"
                    : "text-gray-700"
                }`}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}

        {/* Server Icon - Toggle Button */}
        <div className="">
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className={`rounded-lg flex   transition-colors ${
              collapsed ? "w-8 h-8 justify-center  items-center p-2  " : "w-full  justify-end items-end p-2 "
            } hover:bg-gray-50`}
          >
            <Sidebar className={`text-gray-600 ${collapsed ? "w-4 h-4 flex justify-center items-center relative left-2" : "w-5 h-5 "}`} />
           
          </button>
          
          {/* Tooltip */}
          {collapsed && (
            <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
              <div className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                Toggle Sidebar
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
