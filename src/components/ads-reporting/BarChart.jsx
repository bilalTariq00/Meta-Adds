"use client";

import { useState } from "react";
import { 
  ChevronDown, 
  Table, 
  Settings,
  BarChart3,
  TrendingUp
} from "lucide-react";

export default function BarChart({ 
  data = [],
  onLayoutChange,
  onUngroupBreakdown,
  onResetColumnWidth,
  onFormatClick,
  onCustomiseClick,
  activeTab = null,
  onTabChange
}) {
  const [showLayoutDropdown, setShowLayoutDropdown] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState([
    { id: "reach", name: "Reach", color: "bg-blue-400", checked: true },
    { id: "frequency", name: "Frequency", color: "bg-purple-500", checked: true }
  ]);

  const handleMetricToggle = (metricId) => {
    setSelectedMetrics(prev => 
      prev.map(metric => 
        metric.id === metricId 
          ? { ...metric, checked: !metric.checked }
          : metric
      )
    );
  };

  // Sample bar chart data
  const barData = [
    {
      category: "DYT - Solar Panel, DYT - Solar Panel",
      reach: 101,
      frequency: 1.01
    },
    {
      category: "Bathroom Remodeling - AFDTNC, Bathroom Remodeling - AFDTNC",
      reach: 69,
      frequency: 1.01
    }
  ];

  const maxReach = Math.max(...barData.map(d => d.reach));
  const maxFrequency = Math.max(...barData.map(d => d.frequency));

  const BarChartComponent = () => {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-medium text-gray-900">Chart</h3>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded border border-blue-200">
              <Table className="w-3 h-3 inline mr-1" />
              Data Table
            </button>
            <button className="px-3 py-1 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
              <Settings className="w-3 h-3 inline mr-1" />
              Customise
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {barData.map((item, index) => (
            <div key={index} className="space-y-4">
              {/* Category name */}
              <div className="text-sm text-gray-700 font-medium">
                {item.category}
              </div>

              {/* Bars */}
              <div className="flex items-end gap-4 h-32">
                {/* Reach bar */}
                {selectedMetrics.find(m => m.id === 'reach')?.checked && (
                  <div className="flex flex-col items-center">
                    <div className="text-xs text-gray-500 mb-2">Reach</div>
                    <div className="relative">
                      <div 
                        className="w-16 bg-blue-400 rounded-t"
                        style={{ 
                          height: `${(item.reach / maxReach) * 100}px`,
                          minHeight: '20px'
                        }}
                      ></div>
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700">
                        {item.reach}
                      </div>
                    </div>
                  </div>
                )}

                {/* Frequency bar */}
                {selectedMetrics.find(m => m.id === 'frequency')?.checked && (
                  <div className="flex flex-col items-center">
                    <div className="text-xs text-gray-500 mb-2">Frequency</div>
                    <div className="relative">
                      <div 
                        className="w-16 bg-purple-500 rounded-t"
                        style={{ 
                          height: `${(item.frequency / maxFrequency) * 100}px`,
                          minHeight: '20px'
                        }}
                      ></div>
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700">
                        {item.frequency}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full bg-white rounded-md">
      {/* Header */}
      <div className="px-6 py-3 border-b border-gray-200 bg-white rounded-t-md">
        <div className="flex items-center justify-between">
          {/* Left side - Layout and controls */}
          <div className="flex items-center gap-3">
            {/* Bar Chart Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setShowLayoutDropdown(!showLayoutDropdown)}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm font-medium">Bar</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showLayoutDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <button
                      onClick={() => {
                        onLayoutChange("pivot-table");
                        setShowLayoutDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2">
                        <Table className="w-4 h-4" />
                        <div>
                          <div className="font-medium">Pivot table</div>
                          <div className="text-xs text-gray-500">View your data in a table format</div>
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        onLayoutChange("trend");
                        setShowLayoutDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        <div>
                          <div className="font-medium">Trend</div>
                          <div className="text-xs text-gray-500">View your data as a trend over time</div>
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        onLayoutChange("bar-chart");
                        setShowLayoutDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-blue-700 bg-blue-50 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        <div>
                          <div className="font-medium">Bar chart</div>
                          <div className="text-xs text-blue-600">View your data as a bar chart</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Breakdown segments info */}
            <div className="text-sm text-gray-600">
              Showing all 2 breakdown segments
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <Table className="w-4 h-4 inline mr-2" />
              Data Table
            </button>
            <button className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <Settings className="w-4 h-4 inline mr-2" />
              Customise
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date range */}
        <div className="mb-4">
          <span className="text-sm text-gray-600">This month: 1 Sep 2025-6 Sep 2025</span>
        </div>

        {/* Metric selection */}
        <div className="mb-6">
          <div className="flex gap-4">
            {selectedMetrics.map((metric) => (
              <label key={metric.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={metric.checked}
                  onChange={() => handleMetricToggle(metric.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className={`w-3 h-3 rounded-full ${metric.color}`}></div>
                <span className="text-sm text-gray-700">{metric.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <BarChartComponent />
      </div>
    </div>
  );
}
