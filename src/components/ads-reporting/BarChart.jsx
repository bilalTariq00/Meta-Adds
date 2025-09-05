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
  const [showDataTable, setShowDataTable] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState([
    { id: "reach", name: "Reach", color: "rgb(140, 217, 255)", checked: true },
    { id: "frequency", name: "Frequency", color: "rgb(92, 59, 191)", checked: true }
  ]);
  
  
  // Tooltip state
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    data: null,
    category: null,
    metric: null
  });

  const handleMetricToggle = (metricId) => {
    setSelectedMetrics(prev => 
      prev.map(metric => 
        metric.id === metricId 
          ? { ...metric, checked: !metric.checked }
          : metric
      )
    );
  };

  // Tooltip handlers
  const handleMouseEnter = (event, data, category, metric) => {
    setTooltip({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      data: data,
      category: category,
      metric: metric
    });
  };

  const handleMouseLeave = () => {
    setTooltip({
      visible: false,
      x: 0,
      y: 0,
      data: null,
      category: null,
      metric: null
    });
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

  // Data table data
  const tableData = [
    { campaign: "DYT - Solar Panel", adset: "DYT - Solar Panel", reach: 101, frequency: 1.01 },
    { campaign: "Bathroom Remodeling - ...", adset: "Bathroom Remodeling - ...", reach: 69, frequency: 1.01 }
  ];

  const maxReach = Math.max(...barData.map(d => d.reach));
  const maxFrequency = Math.max(...barData.map(d => d.frequency));


  return (
    <div className="h-full bg-white rounded-md overflow-y-auto pb-40">
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
            <button 
              onClick={() => setShowDataTable(!showDataTable)}
              className={`px-3 py-2 text-sm border border-gray-300 rounded-md transition-colors ${
                showDataTable 
                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                  : 'text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              <Table className="w-4 h-4 inline mr-2" />
              Data Table
            </button>
            <button 
              onClick={() => {
                if (onCustomiseClick) {
                  onCustomiseClick();
                }
                if (onTabChange) {
                  onTabChange(activeTab === 'customise' ? null : 'customise');
                }
              }}
              className={`px-3 py-2 text-sm border border-gray-300 rounded-md transition-colors ${
                activeTab === 'customise'
                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                  : 'text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Customise
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Chart Title and Date Range */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">This month: 1 Sep 2025-6 Sep 2025</h3>
          </div>

          {/* Legend */}
          <div className="mb-8">
            <div className="flex gap-6">
              {selectedMetrics.map((metric) => (
                <label key={metric.id} className="flex items-center gap-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={metric.checked}
                      onChange={() => handleMetricToggle(metric.id)}
                      className="w-4 h-4 rounded border-2 focus:ring-2 appearance-none cursor-pointer"
                      style={{
                        borderColor: metric.id === 'reach' ? 'rgb(140, 217, 255)' : 'rgb(92, 59, 191)',
                        backgroundColor: metric.checked ? (metric.id === 'reach' ? 'rgb(140, 217, 255)' : 'rgb(92, 59, 191)') : 'white',
                        '--tw-ring-color': metric.id === 'reach' ? 'rgb(140, 217, 255)' : 'rgb(92, 59, 191)'
                      }}
                    />
                    {metric.checked && (
                      <div 
                        className="absolute top-0 left-0 w-4 h-4 flex items-center justify-center pointer-events-none"
                        style={{ color: 'white' }}
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: metric.color }}
                  ></div>
                  <span className="text-sm text-gray-700 font-medium">{metric.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Bar Chart */}
          <div className={`bg-white border border-gray-200 rounded-lg p-8 transition-all duration-300 ${
            showDataTable ? 'pb-4' : 'pb-8'
          }`}>
            {/* Chart with grid lines */}
            <div className={`relative transition-all duration-300 ${
              showDataTable ? 'h-72' : 'h-96'
            }`}>
              {/* Grid lines */}
              <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full border-t border-gray-100"
                    style={{ top: `${(i * 20)}%` }}
                  />
                ))}
              </div>

              {/* Chart content */}
              <div className="relative h-full flex items-end justify-center gap-12 px-12">
                {barData.map((item, index) => (
                  <div key={index} className="flex items-end gap-6">
                    {/* Reach bar */}
                    {selectedMetrics.find(m => m.id === 'reach')?.checked && (
                      <div className="flex flex-col items-center">
                        <div className="relative group">
                          <div 
                            className="w-20 rounded-t cursor-pointer transition-colors shadow-sm"
                            style={{ 
                              height: `${(item.reach / maxReach) * (showDataTable ? 200 : 250)}px`,
                              minHeight: '20px',
                              backgroundColor: selectedMetrics.find(m => m.id === 'reach')?.color
                            }}
                            onMouseEnter={(e) => handleMouseEnter(e, item.reach, item.category, 'Reach')}
                            onMouseLeave={handleMouseLeave}
                          ></div>
                          <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-900">
                            {item.reach}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Frequency bar */}
                    {selectedMetrics.find(m => m.id === 'frequency')?.checked && (
                      <div className="flex flex-col items-center">
                        <div className="relative group">
                          <div 
                            className="w-20 rounded-t cursor-pointer transition-colors shadow-sm"
                            style={{ 
                              height: `${(item.frequency / maxFrequency) * (showDataTable ? 200 : 250)}px`,
                              minHeight: '20px',
                              backgroundColor: selectedMetrics.find(m => m.id === 'frequency')?.color
                            }}
                            onMouseEnter={(e) => handleMouseEnter(e, item.frequency, item.category, 'Frequency')}
                            onMouseLeave={handleMouseLeave}
                          ></div>
                          <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-900">
                            {item.frequency}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Category labels below chart */}
            <div className="mt-8 flex justify-center gap-12 px-12">
              {barData.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm text-gray-700 font-medium w-40 leading-tight">
                    {item.category}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Table */}
          {showDataTable && (
            <div className="mt-8 bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Data Table</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ad set name</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Reach</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tableData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{row.campaign}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{row.adset}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{row.reach}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{row.frequency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.visible && tooltip.data && (
        <div
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 pointer-events-none min-w-[200px]"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y - 10,
            transform: 'translateY(-50%)'
          }}
        >
          <div className="text-sm font-medium text-gray-900 mb-3">
            {tooltip.category}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ 
                    backgroundColor: tooltip.metric === 'Reach' 
                      ? selectedMetrics.find(m => m.id === 'reach')?.color 
                      : selectedMetrics.find(m => m.id === 'frequency')?.color
                  }}
                ></div>
                <span className="text-sm text-gray-600">
                  {tooltip.metric}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {tooltip.data}
              </span>
            </div>
            
            {/* Show both metrics for context */}
            {tooltip.metric === 'Reach' && (
              <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: selectedMetrics.find(m => m.id === 'frequency')?.color }}
                  ></div>
                  <span className="text-sm text-gray-600">Frequency</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {barData.find(d => d.category === tooltip.category)?.frequency}
                </span>
              </div>
            )}
            
            {tooltip.metric === 'Frequency' && (
              <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: selectedMetrics.find(m => m.id === 'reach')?.color }}
                  ></div>
                  <span className="text-sm text-gray-600">Reach</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {barData.find(d => d.category === tooltip.category)?.reach}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
