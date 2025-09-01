"use client";

import { useState } from "react";
import { X, ChevronRight, MoreHorizontal, BarChart3, Pencil, LineChart, Folder, Grid3X3, FileText, Search } from "lucide-react";

export default function CampaignStructureSidebar({ isOpen, onClose, activeTab = "chart", onItemSelect }) {
  const [selectedItem, setSelectedItem] = useState(3); // Default to the ad item
  const [searchTerm, setSearchTerm] = useState("");
  
  if (!isOpen) return null;

  const campaignStructure = [
    {
      id: 1,
      type: "Campaign",
      name: "DYT - Home Improvement US Campaign",
      status: "Active",
      icon: Folder,
      children: [
        {
          id: 2,
          type: "Ad Set",
          name: "20-65 USA FB Feeds only - DYT H...",
          status: "Active",
          icon: Grid3X3,
          children: [
            {
              id: 3,
              type: "Ad",
              name: "DYT Home Improvement",
              status: "Active",
              icon: FileText
            }
          ]
        }
      ]
    }
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item.id);
    if (onItemSelect) {
      onItemSelect(item);
    }
  };

  const renderCampaignItem = (item, level = 0) => {
    const IconComponent = item.icon;
    const isSelected = selectedItem === item.id;
    
    return (
      <div key={item.id} className="mb-1">
        <div 
          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors group ${
            isSelected 
              ? 'bg-blue-50' 
              : 'hover:bg-gray-50'
          }`}
          onClick={() => handleItemClick(item)}
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className={`w-5 h-5 flex-shrink-0 ${
              isSelected ? 'text-blue-600' : 'text-gray-600'
            }`}>
              <IconComponent size={20} />
            </div>
            <span className={`text-sm truncate block ${
              isSelected 
                ? 'font-medium text-blue-900' 
                : 'text-gray-900'
            }`}>
              {item.name}
            </span>
          </div>
          <button 
            className="p-1 hover:bg-gray-200 rounded flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              // Handle more options
            }}
          >
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        
        {item.children && (
          <div className="ml-8">
            {item.children.map(child => renderCampaignItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col">
      {/* Header */}
      {/* <div className="bg-slate-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg text-white">
            Campaign Structure
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div> */}

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Campaign Structure */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-1">
          {campaignStructure.map(item => renderCampaignItem(item))}
        </div>

        {/* Quick Actions */}
        {/* <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-2">
                <span><BarChart3 size={16} /></span>
                
                <span>View Performance</span>
              </div>
            </button>
            <button className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-2">
                <span><Pencil size={16} /></span>
                <span>Edit Campaign</span>
              </div>
            </button>
            <button className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-2">
                <span><LineChart size={16} /></span>
                <span>View Analytics</span>
              </div>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}
