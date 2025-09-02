"use client";

import { useState } from "react";
import { X, Search, MoreHorizontal, ChevronUp, ChevronDown, Plus } from "lucide-react";

export default function CustomiseSidebar({ onClose }) {
  const [activeTab, setActiveTab] = useState("breakdowns");
  const [searchQuery, setSearchQuery] = useState("");
  const [popularBreakdownsExpanded, setPopularBreakdownsExpanded] = useState(true);
  const [customBreakdownsExpanded, setCustomBreakdownsExpanded] = useState(true);

  const popularBreakdowns = [
    { id: "account-name", label: "Account name", checked: true },
    { id: "campaign-name", label: "Campaign name", checked: true },
    { id: "ad-set-name", label: "Ad set name", checked: false },
    { id: "ad-name", label: "Ad name", checked: false },
    { id: "ad-creative", label: "Ad creative", checked: false },
    { id: "age", label: "Age", checked: false },
    { id: "gender", label: "Gender", checked: false },
    { id: "country", label: "Country", checked: false },
    { id: "region", label: "Region", checked: false },
    { id: "platform", label: "Platform", checked: false },
    { id: "placement", label: "Placement", checked: false },
    { id: "objective", label: "Objective", checked: false },
    { id: "day", label: "Day", checked: false },
    { id: "month", label: "Month", checked: false }
  ];

  const [breakdowns, setBreakdowns] = useState(popularBreakdowns);

  const handleBreakdownToggle = (id) => {
    setBreakdowns(breakdowns.map(bd => 
      bd.id === id ? { ...bd, checked: !bd.checked } : bd
    ));
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Customise pivot table</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded">
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("breakdowns")}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === "breakdowns"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Breakdowns
        </button>
        <button
          onClick={() => setActiveTab("metrics")}
          className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center ${
            activeTab === "metrics"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Metrics
          <MoreHorizontal className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "breakdowns" && (
          <div className="space-y-4">
            {/* Popular breakdowns */}
            <div>
              <button
                onClick={() => setPopularBreakdownsExpanded(!popularBreakdownsExpanded)}
                className="flex items-center justify-between w-full text-left"
              >
                <h4 className="text-sm font-medium text-gray-900">Popular breakdowns</h4>
                {popularBreakdownsExpanded ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>
              
              {popularBreakdownsExpanded && (
                <div className="mt-3 space-y-2">
                  {breakdowns.map((breakdown) => (
                    <label key={breakdown.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={breakdown.checked}
                        onChange={() => handleBreakdownToggle(breakdown.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">{breakdown.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Custom breakdowns */}
            <div>
              <button
                onClick={() => setCustomBreakdownsExpanded(!customBreakdownsExpanded)}
                className="flex items-center justify-between w-full text-left"
              >
                <h4 className="text-sm font-medium text-gray-900">Custom breakdowns</h4>
                {customBreakdownsExpanded ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>
              
              {customBreakdownsExpanded && (
                <div className="mt-3">
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Plus className="w-4 h-4 mr-2 text-gray-600" />
                    <span className="text-sm text-gray-700">Create</span>
                  </button>
                </div>
              )}
            </div>

            {/* Level */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Level</h4>
              <div className="space-y-2">
                {breakdowns.filter(bd => bd.checked).map((breakdown) => (
                  <div key={breakdown.id} className="flex items-center p-2 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={breakdown.checked}
                      onChange={() => handleBreakdownToggle(breakdown.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">{breakdown.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "metrics" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Metrics configuration will be available here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
