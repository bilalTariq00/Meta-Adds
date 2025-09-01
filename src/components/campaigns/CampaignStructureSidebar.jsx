"use client";

import { useState } from "react";
import { X, ChevronRight, MoreHorizontal } from "lucide-react";

export default function CampaignStructureSidebar({ isOpen, onClose, activeTab = "chart" }) {
  if (!isOpen) return null;

  const campaignStructure = [
    {
      id: 1,
      type: "Campaign",
      name: "DYT - Home Improvement US Campaign",
      status: "Active",
      icon: "📁",
      children: [
        {
          id: 2,
          type: "Ad Set",
          name: "20-65 USA FB Feeds only - DYT H...",
          status: "Active",
          icon: "📊",
          children: [
            {
              id: 3,
              type: "Ad",
              name: "DYT Home Improvement",
              status: "Active",
              icon: "📄"
            }
          ]
        }
      ]
    }
  ];

  const renderCampaignItem = (item, level = 0) => (
    <div key={item.id} className="mb-2">
      <div className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors ${level === 0 ? 'bg-blue-50' : ''}`}>
        <span className="text-lg">{item.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 truncate">{item.name}</div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="capitalize">{item.type}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {item.status}
            </span>
          </div>
        </div>
        <button className="p-1 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      
      {item.children && (
        <div className="ml-6 border-l border-gray-200 pl-4">
          {item.children.map(child => renderCampaignItem(child, level + 1))}
        </div>
      )}
    </div>
  );

  return (
    <div className="absolute inset-0 bg-black bg-opacity-25 z-40" onClick={onClose}>
      <div
        className="absolute top-0 right-0 bottom-0 bg-white text-gray-900 flex transition-all duration-300 ease-in-out z-50 w-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar Content */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <div className="bg-slate-800 px-4 py-3">
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
          </div>

          {/* Campaign Structure */}
          <div className="flex-1 overflow-auto p-4">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Campaign Hierarchy</h3>
              {campaignStructure.map(item => renderCampaignItem(item))}
            </div>

            {/* Quick Actions */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-2">
                    <span>📊</span>
                    <span>View Performance</span>
                  </div>
                </button>
                <button className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-2">
                    <span>✏️</span>
                    <span>Edit Campaign</span>
                  </div>
                </button>
                <button className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-2">
                    <span>📈</span>
                    <span>View Analytics</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
