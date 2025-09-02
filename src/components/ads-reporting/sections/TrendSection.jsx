"use client";

import { useState } from "react";
import { TrendingUp, BarChart3, Settings, Wrench } from "lucide-react";

export default function TrendSection() {
  const [showCustomiseSidebar, setShowCustomiseSidebar] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Section Controls */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trend line chart
          </button>
          
          <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </button>
          
          <button
            onClick={() => setShowCustomiseSidebar(!showCustomiseSidebar)}
            className={`flex items-center px-3 py-2 rounded-lg ${
              showCustomiseSidebar
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Wrench className="w-4 h-4 mr-2" />
            Customise
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Chart Area */}
        <div className="flex-1 p-6">
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Trend Line Chart</h3>
            <p className="text-gray-600 mb-4">
              Compare data over time to discover trends. This section will display interactive line graphs based on breakdowns and dates.
            </p>
            <div className="text-sm text-gray-500">
              Features: Custom line graphs, data tables, customizability, line sorting, line counts, time intervals, custom axis, tooltip tracking
            </div>
          </div>
        </div>

        {/* Customise Sidebar */}
        {showCustomiseSidebar && (
          <div className="w-80 bg-white border-l border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customise Trend Chart</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Interval
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Line Count
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  defaultValue="3"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Axis
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="ml-2 text-sm text-gray-700">Show grid lines</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="ml-2 text-sm text-gray-700">Show data points</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
