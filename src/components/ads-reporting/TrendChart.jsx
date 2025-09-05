"use client";

import { useState } from "react";
import { 
  ChevronDown, 
  Table, 
  Settings,
  BarChart3,
  TrendingUp
} from "lucide-react";

export default function TrendChart({ 
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
  const [selectedSegments, setSelectedSegments] = useState([
    { id: "bathroom", name: "Bathroom Remodeling - AFD...", color: "bg-blue-400", checked: true },
    { id: "solar", name: "DYT - Solar Panel, DYT - Sol...", color: "bg-purple-500", checked: true }
  ]);

  const handleSegmentToggle = (segmentId) => {
    setSelectedSegments(prev => 
      prev.map(segment => 
        segment.id === segmentId 
          ? { ...segment, checked: !segment.checked }
          : segment
      )
    );
  };

  // Sample trend data for the charts
  const trendData = {
    reach: [
      { date: "Sep 1", bathroom: 69, solar: 49 },
      { date: "Sep 2", bathroom: 69, solar: 52 },
      { date: "Sep 3", bathroom: 68, solar: 51 },
      { date: "Sep 4", bathroom: 70, solar: 53 },
      { date: "Sep 5", bathroom: 71, solar: 50 },
      { date: "Sep 6", bathroom: 69, solar: 54 }
    ],
    frequency: [
      { date: "Sep 1", bathroom: 1.00, solar: 1.00 },
      { date: "Sep 2", bathroom: 1.01, solar: 1.02 },
      { date: "Sep 3", bathroom: 1.00, solar: 1.01 },
      { date: "Sep 4", bathroom: 1.01, solar: 1.02 },
      { date: "Sep 5", bathroom: 1.00, solar: 1.01 },
      { date: "Sep 6", bathroom: 1.01, solar: 1.03 }
    ]
  };

  const getYAxisValues = (metric) => {
    if (metric === 'reach') {
      return [40, 50, 60, 70];
    } else {
      return [1.00, 1.01, 1.02];
    }
  };

  const getDataPoint = (value, metric) => {
    if (metric === 'reach') {
      return ((value - 40) / 30) * 100; // Scale to 0-100% for 40-70 range
    } else {
      return ((value - 1.00) / 0.02) * 100; // Scale to 0-100% for 1.00-1.02 range
    }
  };

  const LineChart = ({ data, metric, title, color1, color2 }) => {
    const yAxisValues = getYAxisValues(metric);
    const maxValue = Math.max(...yAxisValues);
    const minValue = Math.min(...yAxisValues);

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded border border-blue-200">
              Data Table
            </button>
            <button className="px-3 py-1 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
              <Settings className="w-3 h-3 inline mr-1" />
              Customise
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Y-axis */}
          <div className="w-8 flex flex-col justify-between h-48">
            {yAxisValues.map((value, index) => (
              <div key={value} className="text-xs text-gray-500 text-right">
                {value}
              </div>
            ))}
          </div>

          {/* Chart area */}
          <div className="flex-1 relative h-48">
            {/* Grid lines */}
            {yAxisValues.map((value, index) => (
              <div
                key={value}
                className="absolute w-full border-t border-gray-100"
                style={{ top: `${(index / (yAxisValues.length - 1)) * 100}%` }}
              />
            ))}

            {/* Data lines */}
            <svg className="absolute inset-0 w-full h-full">
              {/* Bathroom line */}
              {data.map((point, index) => {
                if (index === 0) return null;
                const x1 = ((index - 1) / (data.length - 1)) * 100;
                const y1 = 100 - getDataPoint(data[index - 1].bathroom, metric);
                const x2 = (index / (data.length - 1)) * 100;
                const y2 = 100 - getDataPoint(point.bathroom, metric);
                
                return (
                  <line
                    key={`bathroom-${index}`}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke={color1}
                    strokeWidth="2"
                  />
                );
              })}

              {/* Solar line */}
              {data.map((point, index) => {
                if (index === 0) return null;
                const x1 = ((index - 1) / (data.length - 1)) * 100;
                const y1 = 100 - getDataPoint(data[index - 1].solar, metric);
                const x2 = (index / (data.length - 1)) * 100;
                const y2 = 100 - getDataPoint(point.solar, metric);
                
                return (
                  <line
                    key={`solar-${index}`}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke={color2}
                    strokeWidth="2"
                  />
                );
              })}

              {/* Data points */}
              {data.map((point, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y1 = 100 - getDataPoint(point.bathroom, metric);
                const y2 = 100 - getDataPoint(point.solar, metric);
                
                return (
                  <g key={`points-${index}`}>
                    <circle
                      cx={`${x}%`}
                      cy={`${y1}%`}
                      r="3"
                      fill={color1}
                    />
                    <circle
                      cx={`${x}%`}
                      cy={`${y2}%`}
                      r="3"
                      fill={color2}
                    />
                  </g>
                );
              })}
            </svg>

            {/* X-axis labels */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-between">
              {data.map((point, index) => (
                <div key={index} className="text-xs text-gray-500">
                  {point.date}
                </div>
              ))}
            </div>
          </div>
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
            {/* Trend Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setShowLayoutDropdown(!showLayoutDropdown)}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Trend</span>
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
                      className="w-full text-left px-3 py-2 text-sm text-blue-700 bg-blue-50 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        <div>
                          <div className="font-medium">Trend</div>
                          <div className="text-xs text-blue-600">View your data as a trend over time</div>
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        onLayoutChange("bar-chart");
                        setShowLayoutDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        <div>
                          <div className="font-medium">Bar chart</div>
                          <div className="text-xs text-gray-500">View your data as a bar chart</div>
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

        {/* Segment selection */}
        <div className="mb-6">
          <div className="flex gap-4">
            {selectedSegments.map((segment) => (
              <label key={segment.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={segment.checked}
                  onChange={() => handleSegmentToggle(segment.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className={`w-3 h-3 rounded-full ${segment.color}`}></div>
                <span className="text-sm text-gray-700">{segment.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-8">
          <LineChart
            data={trendData.reach}
            metric="reach"
            title="Reach"
            color1="#60A5FA"
            color2="#A855F7"
          />
          <LineChart
            data={trendData.frequency}
            metric="frequency"
            title="Frequency"
            color1="#60A5FA"
            color2="#A855F7"
          />
        </div>
      </div>
    </div>
  );
}
