"use client";

import { useState } from "react";
import { ChevronDown, Info, Settings, Clock, X, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PerformanceOverview() {
  const [selectedMetric, setSelectedMetric] = useState("amount-spent");
  const [timeRange, setTimeRange] = useState("day");
  const [activityHistory, setActivityHistory] = useState("all");
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showActivityDropdown, setShowActivityDropdown] = useState(false);
  const [showCustomiseSidebar, setShowCustomiseSidebar] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState([
    "website-views",
    "per-view",
    "amount-spent",
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("last30days");
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [startDate, setStartDate] = useState("2 Aug 2025");
  const [endDate, setEndDate] = useState("31 Aug 2025");
  const [currentMonth1, setCurrentMonth1] = useState("Aug");
  const [currentYear1, setCurrentYear1] = useState("2025");
  const [currentMonth2, setCurrentMonth2] = useState("Sep");
  const [currentYear2, setCurrentYear2] = useState("2025");

  // Available metrics for customisation
  const availableMetrics = [
    { id: "website-views", label: "Website views content", selected: true },
    { id: "per-view", label: "Per view content", selected: true },
    { id: "amount-spent", label: "Amount spent", selected: true },
    { id: "results", label: "Results", selected: false },
    { id: "cost-per-result", label: "Cost per result", selected: false },
    { id: "reach", label: "Reach", selected: false },
    { id: "impressions", label: "Impressions", selected: false },
    { id: "frequency", label: "Frequency", selected: false },
    { id: "clicks", label: "Clicks", selected: false },
    { id: "conversions", label: "Conversions", selected: false },
  ];

  // Time range options
  const timeRangeOptions = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ];

  // Activity history options
  const activityHistoryOptions = [
    { value: "all", label: "All" },
    { value: "account", label: "Account" },
    { value: "ads", label: "Ads" },
    { value: "ad-sets", label: "Ad Sets" },
    { value: "audience", label: "Audience" },
    { value: "bid", label: "Bid" },
    { value: "budget", label: "Budget" },
    { value: "campaigns", label: "Campaigns" },
    { value: "schedule", label: "Schedule" },
    { value: "run-status", label: "Run Status" },
    { value: "targeting", label: "Targeting" },
  ];

  // Date range options
  const dateRangeOptions = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "todayAndYesterday", label: "Today and yesterday" },
    { value: "last7days", label: "Last 7 days" },
    { value: "last14days", label: "Last 14 days" },
    { value: "last28days", label: "Last 28 days" },
    { value: "last30days", label: "Last 30 days" },
    { value: "thisweek", label: "This week" },
    { value: "lastweek", label: "Last week" },
    { value: "thismonth", label: "This month" },
    { value: "lastmonth", label: "Last month" },
    { value: "maximum", label: "Maximum" },
    { value: "custom", label: "Custom" },
  ];

  // Mock data for different metrics
  const chartData = {
    "website-views": [
      { date: "2 Aug", value: 1250, historicalEdit: false },
      { date: "9 Aug", value: 1890, historicalEdit: true },
      { date: "17 Aug", value: 1420, historicalEdit: true },
      { date: "24 Aug", value: 2100, historicalEdit: false },
      { date: "31 Aug", value: 1680, historicalEdit: true },
    ],
    "per-view": [
      { date: "2 Aug", value: 0.85, historicalEdit: false },
      { date: "9 Aug", value: 0.92, historicalEdit: false },
      { date: "17 Aug", value: 0.78, historicalEdit: true },
      { date: "24 Aug", value: 0.95, historicalEdit: false },
      { date: "31 Aug", value: 0.88, historicalEdit: true },
    ],
    "amount-spent": [
      { date: "2 Aug", value: 1.1, historicalEdit: false },
      { date: "9 Aug", value: 1.4, historicalEdit: true },
      { date: "17 Aug", value: 0.7, historicalEdit: true },
      { date: "24 Aug", value: 1.0, historicalEdit: false },
      { date: "31 Aug", value: 0.2, historicalEdit: true },
    ],
  };

  const metrics = [
    {
      id: "website-views",
      title: "Website views content",
      value: "--",
      color: "blue",
    },
    {
      id: "per-view",
      title: "Per view content",
      value: "--",
      color: "green",
    },
    {
      id: "amount-spent",
      title: "Amount spent",
      value: "$15.64",
      color: "purple",
    },
  ];

  const handleMetricToggle = (metricId) => {
    if (selectedMetrics.includes(metricId)) {
      // If already selected, remove it
      const newSelectedMetrics = selectedMetrics.filter(
        (id) => id !== metricId
      );
      setSelectedMetrics(newSelectedMetrics);

      // If the currently selected metric is being removed, select the first available one
      if (selectedMetric === metricId && newSelectedMetrics.length > 0) {
        setSelectedMetric(newSelectedMetrics[0]);
      }
    } else {
      // If not selected, add it (but limit to 3)
      if (selectedMetrics.length < 3) {
        setSelectedMetrics((prev) => [...prev, metricId]);
      }
    }
  };

  // Calendar generation functions
  const generateCalendarDays = (year, month) => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= lastDay || days.length < 42) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const isDateInRange = (date) => {
    const start = new Date(2025, 7, 2); // Aug 2, 2025
    const end = new Date(2025, 7, 31); // Aug 31, 2025
    return date >= start && date <= end;
  };

  const isStartDate = (date) => {
    return date.getDate() === 2 && date.getMonth() === 7 && date.getFullYear() === 2025;
  };

  const isEndDate = (date) => {
    return date.getDate() === 31 && date.getMonth() === 7 && date.getFullYear() === 2025;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const metric = metrics.find((m) => m.id === selectedMetric);
      let valueText = "";

      if (selectedMetric === "amount-spent") {
        valueText = `$${payload[0].value.toFixed(2)}`;
      } else if (selectedMetric === "per-view") {
        valueText = payload[0].value.toFixed(2);
      } else {
        valueText = payload[0].value.toLocaleString();
      }

      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900">{`Date: ${label}`}</p>
          <p className="text-sm text-blue-600">{`${metric?.title}: ${valueText}`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;

    return (
      <g>
        {/* Main dot */}
        <circle cx={cx} cy={cy} r="4" fill="#0ea5e9" />

        {/* Historical edit indicator */}
        {payload.historicalEdit && (
          <>
            <circle
              cx={cx}
              cy={cy}
              r="8"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
            <text
              x={cx}
              y={cy + 3}
              className="text-xs fill-gray-600"
              textAnchor="middle"
            >
              ↻
            </text>
          </>
        )}
      </g>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Performance overview
        </h3>
        <div className="flex items-center gap-3">
          {/* Time Range Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowTimeDropdown(!showTimeDropdown)}
              className="flex items-center gap-2 px-3 py-2 border border-blue-500 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <span>
                {timeRangeOptions.find((opt) => opt.value === timeRange)?.label}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showTimeDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-32">
                {timeRangeOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 cursor-pointer hover:bg-blue-50 p-3 first:rounded-t-lg last:rounded-b-lg"
                  >
                    <input
                      type="radio"
                      name="timeRange"
                      value={option.value}
                      checked={timeRange === option.value}
                      onChange={(e) => {
                        setTimeRange(e.target.value);
                        setShowTimeDropdown(false);
                      }}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Activity History Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowActivityDropdown(!showActivityDropdown)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <span>
                Activity history:{" "}
                {
                  activityHistoryOptions.find(
                    (opt) => opt.value === activityHistory
                  )?.label
                }
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showActivityDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-40">
                {activityHistoryOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setActivityHistory(option.value);
                      setShowActivityDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setShowCustomiseSidebar(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            Customise
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className={`grid gap-4 mb-6 ${
        selectedMetrics.length === 1 ? 'grid-cols-1' :
        selectedMetrics.length === 2 ? 'grid-cols-2' :
        'grid-cols-3'
      }`}>
        {selectedMetrics.map((metricId, index) => {
          const metric = metrics.find((m) => m.id === metricId);
          if (!metric) return null;

          return (
            <div
              key={metric.id}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedMetric === metric.id
                  ? metric.color === "blue"
                    ? "bg-blue-50 border-2 border-blue-200"
                    : metric.color === "green"
                    ? "bg-green-50 border-2 border-green-200"
                    : "bg-purple-50 border-2 border-purple-200"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
              onClick={() => setSelectedMetric(metric.id)}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-gray-600 ${
                  selectedMetrics.length === 1 ? 'text-base' :
                  selectedMetrics.length === 2 ? 'text-sm' :
                  'text-sm'
                }`}>{metric.title}</span>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
              <div className={`font-bold text-gray-900 ${
                selectedMetrics.length === 1 ? 'text-4xl' :
                selectedMetrics.length === 2 ? 'text-3xl' :
                'text-2xl'
              }`}>
                {metric.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Section */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">
          {metrics.find((m) => m.id === selectedMetric)?.title}
        </h4>

        {/* Line Chart using Recharts */}
        <div className="h-64 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData[selectedMetric]}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => {
                  if (selectedMetric === "amount-spent")
                    return `$${value.toFixed(2)}`;
                  if (selectedMetric === "per-view") return value.toFixed(2);
                  return value.toLocaleString();
                }}
                domain={selectedMetric === "amount-spent" ? [0, 2] : undefined}
                ticks={
                  selectedMetric === "amount-spent"
                    ? [0, 0.5, 1, 1.5, 2]
                    : undefined
                }
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#0ea5e9"
                strokeWidth={2}
                dot={<CustomDot />}
                activeDot={{ r: 6, fill: "#0ea5e9" }}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Vertical dotted line for current date (around 22 Aug) */}
          <div className="absolute top-0 bottom-0 left-3/4 w-px border-l-2 border-dashed border-gray-400 opacity-60"></div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>{metrics.find((m) => m.id === selectedMetric)?.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Historical edits</span>
          </div>
        </div>
      </div>

      {/* Customise Sidebar */}
      {showCustomiseSidebar && (
        <div className="absolute inset-0 bg-black bg-opacity-25 z-50">
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white border-l border-gray-200 shadow-lg overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Customise chart
                </h3>
                <button
                  onClick={() => setShowCustomiseSidebar(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Instructions */}
              <p className="text-sm text-gray-600 mb-2">
                Select up to 3 metrics at a time
              </p>
              <p className="text-sm text-gray-500 mb-6">
                {selectedMetrics.length} of 3 selected
              </p>

              {/* Metrics List */}
              <div className="space-y-3">
                {availableMetrics.map((metric) => (
                  <label
                    key={metric.id}
                    className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded-lg"
                  >
                    <input
                      type="checkbox"
                      checked={selectedMetrics.includes(metric.id)}
                      onChange={() => handleMetricToggle(metric.id)}
                      disabled={
                        !selectedMetrics.includes(metric.id) &&
                        selectedMetrics.length >= 3
                      }
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-900">
                      {metric.label}
                    </span>
                  </label>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowCustomiseSidebar(false)}
                  className="flex-1 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCustomiseSidebar(false)}
                  className="flex-1 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
