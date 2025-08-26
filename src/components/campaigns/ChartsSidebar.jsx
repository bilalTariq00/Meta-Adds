import React, { useState } from "react";
import {
  X,
  Plus,
  ChevronDown,
  Search,
  ArrowLeft,
  Edit2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

export default function ChartsSidebar({ open, onClose }) {
  const [activeTab, setActiveTab] = useState("trends");
  const [timeframeDropdownOpen, setTimeframeDropdownOpen] = useState(false);
  const [metricDropdownOpen, setMetricDropdownOpen] = useState(false);
  const [moreMetricsDropdownOpen, setMoreMetricsDropdownOpen] = useState(false);
  const [performanceDropdownOpen, setPerformanceDropdownOpen] = useState(false);
  const [breakdownDropdownOpen, setBreakdownDropdownOpen] = useState(false);
  const [breakdownMetricDropdownOpen, setBreakdownMetricDropdownOpen] =
    useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [openMetricChartId, setOpenMetricChartId] = useState(null);

  const [selectedTimeframe, setSelectedTimeframe] = useState("Day");
  const [selectedMetric, setSelectedMetric] = useState("Amount spent");
  const [selectedBreakdown, setSelectedBreakdown] = useState("Gender");
  const [selectedBreakdownMetric, setSelectedBreakdownMetric] =
    useState("Results");
  const [openBreakdownChartId, setOpenBreakdownChartId] = useState(null);

  const [sortOrder, setSortOrder] = useState("Highest to lowest");

  const [charts, setCharts] = useState([
    {
      id: 1,
      metric: "Amount spent",
      value: "$14.05",
      data: [
        { date: "27 Jul", value: 0 },
        { date: "4 Aug", value: 0 },
        { date: "12 Aug", value: 0 },
        { date: "20 Aug", value: 5.2 },
      ],
    },
  ]);

  const [breakdownCharts, setBreakdownCharts] = useState([
    {
      id: 1,
      metric: "Results",
      total: "263,594",
      breakdown:
        selectedBreakdown === "Age"
          ? [
              { label: "18-24", value: 87809, percentage: 33.3 },
              { label: "25-34", value: 76033, percentage: 28.8 },
              { label: "35-44", value: 46913, percentage: 17.8 },
              { label: "45-54", value: 29449, percentage: 11.2 },
              { label: "55-64", value: 14720, percentage: 5.6 },
              { label: "65+", value: 8670, percentage: 3.3 },
            ]
          : [
              { label: "male", value: 233788, percentage: 88.7 },
              { label: "female", value: 29184, percentage: 11.1 },
              { label: "unknown", value: 622, percentage: 0.2 },
            ],
    },
  ]);
  const removeChart = (id) => {
    setCharts((prevCharts) => prevCharts.filter((chart) => chart.id !== id));
  };
  if (!open) return null;

  const timeframeOptions = ["Day", "Week", "Month"];

  const performanceMetrics = [
    "Results",
    "Reach",
    "Frequency",
    "Impressions",
    "Views",
    "Amount spent",
    "Clicks (all)",
    "CPC (all)",
  ];

  const engagementMetrics = [
    "Engagement",
    "Likes",
    "Comments",
    "Shares",
    "Video Views",
  ];

  const conversionMetrics = [
    "Conversions",
    "Cost per conversion",
    "Conversion rate",
  ];

  const breakdownOptions = [
    "None",
    "Age",
    "Gender",
    "Age and gender",
    "Placement",
    "Platform",
    "Impression device",
    "Platform and device",
    "Placement and device",
    "Country",
  ];

  const addChart = () => {
    const newChart = {
      id: Date.now(),
      metric: selectedMetric,
      value: selectedMetric === "Amount spent" ? "$14.05" : "263,594",
      data: [
        { date: "27 Jul", value: Math.random() * 10 },
        { date: "4 Aug", value: Math.random() * 10 },
        { date: "12 Aug", value: Math.random() * 10 },
        { date: "20 Aug", value: Math.random() * 10 },
      ],
    };
    setCharts((prev) => [...prev, newChart]);
  };

  const addBreakdownChart = () => {
    const newChart = {
      id: Date.now(),
      metric: selectedBreakdownMetric,
      total: "263,594",
      breakdown:
        selectedBreakdown === "Age"
          ? [
              { label: "18-24", value: 87809, percentage: 33.3 },
              { label: "25-34", value: 76033, percentage: 28.8 },
              { label: "35-44", value: 46913, percentage: 17.8 },
              { label: "45-54", value: 29449, percentage: 11.2 },
              { label: "55-64", value: 14720, percentage: 5.6 },
              { label: "65+", value: 8670, percentage: 3.3 },
            ]
          : selectedBreakdown === "Gender"
          ? [
              { label: "male", value: 233788, percentage: 88.7 },
              { label: "female", value: 29184, percentage: 11.1 },
              { label: "unknown", value: 622, percentage: 0.2 },
            ]
          : [{ label: "No breakdown", value: 263594, percentage: 100 }],
    };
    setBreakdownCharts((prev) => [...prev, newChart]);
  };

  const formatYAxisTick = (value) => {
    if (value >= 1000) {
      return (value / 1000).toFixed(0) + ",000";
    }
    return value.toString();
  };

  const formatBarYAxisTick = (value) => {
    if (selectedMetric === "Amount spent") {
      return "$" + value.toFixed(2);
    }
    return formatYAxisTick(value);
  };

  const renderTrendsTab = () => (
    <div className="space-y-2">
      {/* Timeframe Dropdown */}
      <div className="relative">
        <button
          onClick={() => setTimeframeDropdownOpen(!timeframeDropdownOpen)}
          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg flex items-center justify-between hover:border-blue-500 focus:outline-none focus:border-blue-500"
        >
          <span>{selectedTimeframe}</span>
          <ChevronDown className="w-5 h-5" />
        </button>

        {timeframeDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
            {timeframeOptions.map((option) => (
              <label
                key={option}
                className="flex items-center px-3 py-1 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="timeframe"
                  value={option}
                  checked={selectedTimeframe === option}
                  onChange={() => {
                    setSelectedTimeframe(option);
                    setTimeframeDropdownOpen(false);
                  }}
                  className="mr-3"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Charts */}
      {charts.map((chart) => (
        <div key={chart.id} className="space-y-4 shadow  px-2 py-2 rounded-md">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">{chart.metric}</h3>
            <div className="relative">
              <button
                onClick={() =>
                  setOpenMetricChartId(
                    openMetricChartId === chart.id ? null : chart.id
                  )
                }
                className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:border-blue-500 focus:outline-none focus:border-blue-500"
              >
                <Edit2 className="w-4 h-4" />
                Metric
                <ChevronDown className="w-4 h-4" />
              </button>

              {openMetricChartId === chart.id && (
                <div className="absolute top-full right-0 mt-1 w-60 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                  <div className="p-2 border-b border-gray-200">
                    <h4 className="font-bold text-sm text-gray-900 mb-2">
                      Recently used metrics
                    </h4>
                    <label className="flex items-center p-2 text-sm hover:bg-gray-50 cursor-pointer rounded">
                      <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center mr-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <div>
                        <div className="font-medium text-sm">Amount spent</div>
                        <div className="text-xs text-gray-500">Default</div>
                      </div>
                    </label>
                  </div>

                  <div className="p-4 border-b border-gray-200">
                    <button
                      onClick={() => {
                        setMetricDropdownOpen(false);
                        setMoreMetricsDropdownOpen(true);
                      }}
                      className="flex items-center justify-between w-full p-2 text-left text-sm hover:bg-gray-50 rounded"
                    >
                      <span>Discover more metrics</span>
                      <ChevronDown className="w-4 h-4 rotate-270" />
                    </button>
                  </div>
                  <div className="p-4">
                    <button
                      onClick={() => {
                        removeChart(); // remove chart
                        setMetricDropdownOpen(false); // close dropdown
                      }}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-2 rounded w-full"
                    >
                      <X className="w-4 h-4" />
                      Remove chart
                    </button>
                  </div>
                </div>
              )}

              {moreMetricsDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-gray-200 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setMoreMetricsDropdownOpen(false);
                        setMetricDropdownOpen(true);
                      }}
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <span className="font-medium">More metrics</span>
                  </div>

                  <div className="p-4">
                    <div className="relative mb-4">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      {["Performance", "Engagement", "Conversions"].map(
                        (category) => (
                          <button
                            key={category}
                            onClick={() => {
                              setMoreMetricsDropdownOpen(false);
                              setPerformanceDropdownOpen(true);
                            }}
                            className="flex items-center justify-between w-full p-2 text-left hover:bg-gray-50 rounded"
                          >
                            <span>{category}</span>
                            <ChevronDown className="w-4 h-4 rotate-270" />
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}

              {performanceDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-gray-200 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setPerformanceDropdownOpen(false);
                        setMoreMetricsDropdownOpen(true);
                      }}
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <span className="font-medium">Metric &gt; Performance</span>
                  </div>

                  <div className="p-4">
                    <div className="relative mb-4">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      {performanceMetrics.map((metric) => (
                        <label
                          key={metric}
                          className="flex items-center p-2 hover:bg-gray-50 cursor-pointer rounded"
                        >
                          <input
                            type="radio"
                            name="performanceMetric"
                            value={metric}
                            checked={selectedMetric === metric}
                            onChange={() => {
                              setSelectedMetric(metric);
                              setPerformanceDropdownOpen(false);
                              setMetricDropdownOpen(false);
                            }}
                            className="mr-3"
                          />
                          <span>{metric}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-3xl font-bold">
            {chart.value}{" "}
            <span className="text-lg text-gray-500 font-normal">--</span>
          </div>

          {/* Line Chart for Trends */}
          {activeTab === "trends" && (
            <div className="h-48 rounded-lg py-4 bg-white">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chart.data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={formatBarYAxisTick}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, "dataMax"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#60a5fa"
                    strokeWidth={2}
                    dot={{ fill: "#60a5fa", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: "#60a5fa" }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-2 text-sm">
                <div className="w-3 h-1 bg-blue-400 rounded"></div>
                <span className="text-gray-700">New Awareness campaign</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderBreakdownsTab = () => (
    <div className="space-y-2 ">
      {/* Breakdown Dropdown */}
      <div className="relative">
        <button
          onClick={() => setBreakdownDropdownOpen(!breakdownDropdownOpen)}
          className="w-full px-3 py-1 border border-gray-300 rounded-lg flex items-center justify-between hover:border-blue-500 focus:outline-none focus:border-blue-500"
        >
          <span>{selectedBreakdown}</span>
          <ChevronDown className="w-5 h-5" />
        </button>

        {breakdownDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            {breakdownOptions.map((option) => (
              <label
                key={option}
                className="flex items-center px-3 py-1 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="breakdown"
                  value={option}
                  checked={selectedBreakdown === option}
                  onChange={() => {
                    setSelectedBreakdown(option);
                    setBreakdownDropdownOpen(false);
                    // Update breakdown charts with new data
                    setBreakdownCharts((prev) =>
                      prev.map((chart) => ({
                        ...chart,
                        breakdown:
                          option === "Age"
                            ? [
                                {
                                  label: "18-24",
                                  value: 87809,
                                  percentage: 33.3,
                                },
                                {
                                  label: "25-34",
                                  value: 76033,
                                  percentage: 28.8,
                                },
                                {
                                  label: "35-44",
                                  value: 46913,
                                  percentage: 17.8,
                                },
                                {
                                  label: "45-54",
                                  value: 29449,
                                  percentage: 11.2,
                                },
                                {
                                  label: "55-64",
                                  value: 14720,
                                  percentage: 5.6,
                                },
                                { label: "65+", value: 8670, percentage: 3.3 },
                              ]
                            : option === "Gender"
                            ? [
                                {
                                  label: "male",
                                  value: 233788,
                                  percentage: 88.7,
                                },
                                {
                                  label: "female",
                                  value: 29184,
                                  percentage: 11.1,
                                },
                                {
                                  label: "unknown",
                                  value: 622,
                                  percentage: 0.2,
                                },
                              ]
                            : [
                                {
                                  label: "No breakdown",
                                  value: 263594,
                                  percentage: 100,
                                },
                              ],
                      }))
                    );
                  }}
                  className="mr-3"
                />
                <span
                  className={
                    selectedBreakdown === option
                      ? "text-blue-600  px-2 py-1 rounded"
                      : ""
                  }
                >
                  {option}
                </span>
              </label>
            ))}
          </div>
        )}
        {moreMetricsDropdownOpen && (
          <div className="absolute top-full right-0 mt-1 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
            <div className="p-4 border-b border-gray-200 flex items-center gap-2">
              <button
                onClick={() => {
                  setMoreMetricsDropdownOpen(false);
                  setMetricDropdownOpen(true);
                }}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="font-medium">More metrics</span>
            </div>

            <div className="p-4">
              <div className="relative mb-4">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                {["Performance", "Engagement", "Conversions"].map(
                  (category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setMoreMetricsDropdownOpen(false);
                        setPerformanceDropdownOpen(true);
                      }}
                      className="flex items-center justify-between w-full p-2 text-left hover:bg-gray-50 rounded"
                    >
                      <span>{category}</span>
                      <ChevronDown className="w-4 h-4 rotate-270" />
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {performanceDropdownOpen && (
          <div className="absolute top-full right-0 mt-1 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
            <div className="p-4 border-b border-gray-200 flex items-center gap-2">
              <button
                onClick={() => {
                  setPerformanceDropdownOpen(false);
                  setMoreMetricsDropdownOpen(true);
                }}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="font-medium">Metric &gt; Performance</span>
            </div>

            <div className="p-4">
              <div className="relative mb-4">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                {performanceMetrics.map((metric) => (
                  <label
                    key={metric}
                    className="flex items-center p-2 hover:bg-gray-50 cursor-pointer rounded"
                  >
                    <input
                      type="radio"
                      name="performanceMetric"
                      value={metric}
                      checked={selectedMetric === metric}
                      onChange={() => {
                        setSelectedMetric(metric);
                        setPerformanceDropdownOpen(false);
                        setMetricDropdownOpen(false);
                      }}
                      className="mr-3"
                    />
                    <span>{metric}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Breakdown Charts */}
      {breakdownCharts.map((chart) => (
        <div
          key={chart.id}
          className="space-y-4 p-3 shadow-lg mb-3 rounded-md  "
        >
          <div className="flex items-center justify-between">
            <h3 className=" font-semibold">{chart.metric}</h3>
            <div className="relative">
              <button
                onClick={() =>
                  setOpenBreakdownChartId(
                    openBreakdownChartId === chart.id ? null : chart.id
                  )
                }
                className="flex items-center gap-2 px-3 text-sm py-2 border border-gray-300 rounded-lg hover:border-blue-500 focus:outline-none focus:border-blue-500"
              >
                <Edit2 className="w-4 h-4" />
                Metric
                <ChevronDown className="w-4 h-4" />
              </button>

              {openBreakdownChartId === chart.id && (
                <div className="absolute top-full right-0 mt-1 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-1 text-sm">
                      Recently used metrics
                    </h4>
                    <label className="flex items-center p-1 hover:bg-gray-50 cursor-pointer rounded">
                      <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center mr-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">Results</span>
                    </label>
                  </div>

                  <div className="p-2 border-b border-gray-200">
                    <button
                      onClick={() => {
                        setBreakdownMetricDropdownOpen(false);
                        setMoreMetricsDropdownOpen(true);
                      }}
                      className="flex items-center justify-between w-full p-2 text-sm text-left hover:bg-gray-50 rounded"
                    >
                      <span>Discover more metrics</span>
                      <ChevronDown className="w-4 h-4 rotate-270" />
                    </button>
                  </div>

                  <div className="p-4 border-b border-gray-200">
                    <button
                      onClick={() => setBreakdownMetricDropdownOpen(false)}
                      className="flex items-center gap-2 text-gray-700 hover:bg-gray-50 px-2 text-sm rounded w-full"
                    >
                      <X className="w-4 h-4" />
                      Remove chart
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="text-sm font-medium mb-2 ">Sort</div>
                    <div className="relative">
                      <div className=" text-sm">
                        <button
                          onClick={() => {
                            setSortOrder("Highest to lowest");
                            setSortDropdownOpen(false);
                          }}
                          className="flex items-center gap-2 w-full p-2 text-left hover:bg-gray-50"
                        >
                          <ArrowUp className="w-4 h-4" />
                          Highest to lowest
                        </button>
                        <button
                          onClick={() => {
                            setSortOrder("Lowest to highest");
                            setSortDropdownOpen(false);
                          }}
                          className="flex items-center gap-2 w-full p-2 text-left hover:bg-gray-50"
                        >
                          <ArrowDown className="w-4 h-4" />
                          Lowest to highest
                        </button>
                      </div>

                      {/* {sortDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 min-w-48">
                          <button
                            onClick={() => {
                              setSortOrder("Highest to lowest");
                              setSortDropdownOpen(false);
                            }}
                            className="flex items-center gap-2 w-full p-2 text-left hover:bg-gray-50"
                          >
                            <ArrowUp className="w-4 h-4" />
                            Highest to lowest
                          </button>
                          <button
                            onClick={() => {
                              setSortOrder("Lowest to highest");
                              setSortDropdownOpen(false);
                            }}
                            className="flex items-center gap-2 w-full p-2 text-left hover:bg-gray-50"
                          >
                            <ArrowDown className="w-4 h-4" />
                            Lowest to highest
                          </button>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-3xl font-bold">
            {chart.total}{" "}
            <span className="text-lg text-gray-500 font-normal">--</span>
          </div>

          {/* Horizontal Bar Chart for Breakdowns */}
          <div className="space-y-3">
            {chart.breakdown.map((item, index) => (
              <div key={item.label} className="space-y-1">
                <div className="text-sm font-medium">{item.label}</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-blue-400 h-full rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium min-w-16 text-right">
                    {item.value.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* {selectedBreakdown === "Gender" && (
            <div className="mt-4 space-y-3">
              <div className="text-lg font-semibold">Amount spent</div>
              <div className="text-3xl font-bold">
                $14.05{" "}
                <span className="text-lg text-gray-500 font-normal">--</span>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="text-sm font-medium">male</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-blue-400 h-full rounded-full"
                        style={{ width: "88.7%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium min-w-16 text-right">
                      $12.47
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium">female</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-blue-400 h-full rounded-full"
                        style={{ width: "11.1%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium min-w-16 text-right">
                      $1.56
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium">unknown</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-blue-400 h-full rounded-full"
                        style={{ width: "0.2%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium min-w-16 text-right">
                      $0.02
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )} */}

          <div className="mt-4 flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-blue-400 rounded"></div>
            <span className="text-gray-700">New Awareness campaign</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-[420px] bg-white border-l border-gray-200 h-full flex flex-col shrink-0">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className=" font-semibold">Compare 1 campaign</div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex p-2 ">
        <button
          onClick={() => setActiveTab("trends")}
          className={` py-2 px-3 text-center text-sm rounded-md font-medium ${
            activeTab === "trends"
              ? "text-blue-600 bg-blue-50 "
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          Trends
        </button>
        <button
          onClick={() => setActiveTab("breakdowns")}
          className={`py-2 px-3 text-cente text-sm rounded-md font-medium ${
            activeTab === "breakdowns"
              ? "text-blue-600 bg-blue-50 "
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          Breakdowns
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "trends" ? renderTrendsTab() : renderBreakdownsTab()}
      </div>
      <div className=" w-full flex items-center justify-end py-5 px-2">
        <button
          onClick={activeTab === "trends" ? addChart : addBreakdownChart}
          className="  py-2  border-gray-300  text-gray-600 hover:border-blue-400 hover:text-blue-600 flex items-center justify-end border border-gray -300 p-2 rounded-md gap-2"
        >
          <Plus className="w-4 h-4" />
          Chart
        </button>
      </div>
    </div>
  );
}
