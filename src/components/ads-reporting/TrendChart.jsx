"use client";

import { useState } from "react";
import { 
  ChevronDown, 
  Table, 
  Settings,
  BarChart3,
  TrendingUp,
  X,
  ChevronUp,
  ChevronDown as ChevronDownIcon,
  Info,
  ArrowUpDown
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
  const [showDataTable, setShowDataTable] = useState(false);
  const [selectedSegments, setSelectedSegments] = useState([
    { id: "bathroom", name: "Bathroom Remodeling - AFD...", color: "bg-blue-400", checked: true },
    { id: "solar", name: "DYT - Solar Panel, DYT - Sol...", color: "bg-purple-500", checked: true }
  ]);
  
  
  // Tooltip state
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    data: null,
    date: null
  });

  // Customise sidebar state
  const [selectedBreakdowns, setSelectedBreakdowns] = useState([
    { id: "campaign", name: "Campaign name", checked: true },
    { id: "adset", name: "Ad set name", checked: true }
  ]);
  const [selectedMetrics, setSelectedMetrics] = useState([
    { id: "delivery", name: "Delivery", checked: false },
    { id: "reach", name: "Reach", checked: true },
    { id: "frequency", name: "Frequency", checked: true },
    { id: "attribution", name: "Attribution setting", checked: false },
    { id: "amount", name: "Amount spent", checked: false },
    { id: "cost", name: "Cost per result", checked: false },
    { id: "schedule", name: "Schedule", checked: false },
    { id: "results", name: "Results", checked: false },
    { id: "donations", name: "Meta donations", checked: false }
  ]);
  const [lineSorting, setLineSorting] = useState("reach");
  const [sortDirection, setSortDirection] = useState("descending");
  const [lineCount, setLineCount] = useState(6);
  const [timeInterval, setTimeInterval] = useState("day");

  const handleSegmentToggle = (segmentId) => {
    setSelectedSegments(prev => 
      prev.map(segment => 
        segment.id === segmentId 
          ? { ...segment, checked: !segment.checked }
          : segment
      )
    );
  };

  const handleBreakdownToggle = (breakdownId) => {
    setSelectedBreakdowns(prev => 
      prev.map(breakdown => 
        breakdown.id === breakdownId 
          ? { ...breakdown, checked: !breakdown.checked }
          : breakdown
      )
    );
  };

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
  const handleMouseEnter = (event, dataPoint, date) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      data: dataPoint,
      date: date
    });
  };

  const handleMouseLeave = () => {
    setTooltip({
      visible: false,
      x: 0,
      y: 0,
      data: null,
      date: null
    });
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

  // Data table data
  const tableData = [
    { day: "2025-09-...", campaign: "Bathroom Remodeling - ...", adset: "Bathroom Remodeling - ...", reach: 69, frequency: 1.01 },
    { day: "2025-09-...", campaign: "DYT - Solar Panel", adset: "DYT - Solar Panel", reach: 52, frequency: 1.02 },
    { day: "2025-09-...", campaign: "DYT - Solar Panel", adset: "DYT - Solar Panel", reach: 49, frequency: 1.00 }
  ];

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
      <div className={`bg-white border border-gray-200 rounded-lg p-4 overflow-y-auto transition-all duration-300 ${
        showDataTable ? 'pb-4' : 'pb-20'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          
        </div>

        <div className="flex">
          {/* Y-axis */}
          <div className={`w-8 flex flex-col justify-between transition-all duration-300 ${
            showDataTable ? 'h-32' : 'h-48'
          }`}>
            {yAxisValues.map((value, index) => (
              <div key={value} className="text-xs text-gray-500 text-right">
                {value}
              </div>
            ))}
          </div>

          {/* Chart area */}
          <div 
            className={`flex-1 relative transition-all duration-300 ${
              showDataTable ? 'h-32' : 'h-48'
            }`}
            onMouseLeave={handleMouseLeave}
          >
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

            {/* Invisible hover areas for each data point */}
            {data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100;
              const segmentWidth = 100 / data.length;
              
              return (
                <div
                  key={`hover-${index}`}
                  className="absolute top-0 bottom-0 cursor-pointer"
                  style={{
                    left: `${x - segmentWidth/2}%`,
                    width: `${segmentWidth}%`
                  }}
                  onMouseEnter={(e) => handleMouseEnter(e, { bathroom: point.bathroom, solar: point.solar }, point.date)}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full bg-white rounded-md overflow-y-auto pb-40">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
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
                      className="custom-checkbox"
                    />
                    <div className={`w-3 h-3 rounded-full ${segment.color}`}></div>
                    <span className="text-sm text-gray-700">{segment.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Charts */}
            <div className={`space-y-8 transition-all duration-300 ${
              showDataTable ? 'space-y-4' : 'space-y-8'
            }`}>
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

            {/* Data Table */}
            {showDataTable && (
              <div className="mt-8 bg-white border border-gray-200 rounded-lg overflow-hidden ">
                <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-sm font-medium text-gray-900">Data Table</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ad set name</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center justify-end">
                          Reach
                          <ChevronDownIcon className="w-3 h-3 ml-1" />
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tableData.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{row.day}</td>
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
      </div>

      {/* Tooltip */}
      {tooltip.visible && tooltip.data && (
        <div
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 pointer-events-none"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y - 10,
            transform: 'translateY(-50%)'
          }}
        >
          <div className="text-sm font-medium text-gray-900 mb-3">
            {tooltip.date}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">
                {tooltip.data.bathroom}
              </span>
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span className="text-sm text-gray-600">
                Bathroom Remodeling - AFD...
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">
                {tooltip.data.solar}
              </span>
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-sm text-gray-600">
                DYT - Solar Panel, DYT - Sol...
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
