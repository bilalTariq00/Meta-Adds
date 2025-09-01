"use client";

import { useState } from "react";
import { X, BarChart3, Clock, Edit3 } from "lucide-react";
import PerformanceOverview from "./PerformanceOverview";
import DemographicsPlatform from "./DemographicsPlatform";
import ActionsTab from "./ActionsTab";

export default function CampaignChartComponent({ isOpen, onClose, activeTab = "chart" }) {
  const [currentTab, setCurrentTab] = useState("performance");
  const [sidebarTab, setSidebarTab] = useState(activeTab);

  if (!isOpen) return null;

  const renderContent = () => {
    switch (currentTab) {
      case "performance":
        return (
          <div className="space-y-6">
            <PerformanceOverview />
            <DemographicsPlatform />
          </div>
        );
      case "actions":
        return <ActionsTab />;
      default:
        return <PerformanceOverview />;
    }
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-25 z-40" onClick={onClose}>
      <div
        className="absolute top-0 right-0 bottom-0 bg-white text-gray-900 flex transition-all duration-300 ease-in-out z-50 w-[1200px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Sidebar Navigation */}
        <div className="w-11 bg-slate-800 flex flex-col items-center py-2 px-1">
          <button
            onClick={onClose}
            className="px-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors mb-4 bg-slate-600 p-2"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Tab Navigation */}
          <div className="space-y-2">
            <button
              onClick={() => setSidebarTab("chart")}
              className={`p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors ${
                sidebarTab === "chart" ? "bg-slate-600 text-white" : ""
              }`}
            >
              <BarChart3 className="w-5 h-5" />
            </button>

            <button
              onClick={() => setSidebarTab("edit")}
              className={`p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors ${
                sidebarTab === "edit" ? "bg-slate-600 text-white" : ""
              }`}
            >
              <Edit3 className="w-5 h-5" />
            </button>

            <button
              onClick={() => setSidebarTab("activity")}
              className={`p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors ${
                sidebarTab === "activity" ? "bg-slate-600 text-white" : ""
              }`}
            >
              <Clock className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <div className="bg-slate-800 px-4 py-3">
            <h2 className="font-semibold text-lg text-white">
              {sidebarTab === "chart" && "Performance Charts for Account: Adkin Digital"}
              {sidebarTab === "edit" && "Edit Items for Account: Adkin Digital"}
              {sidebarTab === "activity" && "Activity History for Account: Adkin Digital"}
            </h2>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            {sidebarTab === "chart" && (
              <div className="p-6">
                {/* Performance Tabs */}
                <div className="border-b border-gray-200 mb-6">
                  <div className="flex">
                    <button
                      onClick={() => setCurrentTab("performance")}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                        currentTab === "performance"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <BarChart3 className="w-4 h-4" />
                      Performance
                    </button>
                    <button
                      onClick={() => setCurrentTab("actions")}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                        currentTab === "actions"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      Actions
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                {renderContent()}
              </div>
            )}

            {sidebarTab === "edit" && (
              <div className="p-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Edit Campaign Items</h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">Campaign</span>
                        <h4 className="text-lg font-medium text-gray-900 mt-2">DYT - Home Improvement US Campaign</h4>
                      </div>
                      <button className="px-3 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors">
                        Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue="$50.00" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                          <option>Active</option>
                          <option>Paused</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {sidebarTab === "activity" && (
              <div className="p-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Activity History</h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm">📊</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">Campaign status updated</div>
                          <div className="text-xs text-gray-600">From Pending to Active</div>
                        </div>
                        <div className="text-xs text-gray-500">2 hours ago</div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-sm">✏️</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">Budget modified</div>
                          <div className="text-xs text-gray-600">Changed from $40.00 to $50.00</div>
                        </div>
                        <div className="text-xs text-gray-500">1 day ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
