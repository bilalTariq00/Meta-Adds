"use client";

import { useState, useRef } from "react";
import {
  X,
  Search,
  ChevronDown,
  ChevronUp,
  Plus,
  MoreHorizontal,
  ArrowUpDown,
  ArrowLeftRight,
  GripVertical,
  Info,
} from "lucide-react";
import RadioDropdown from "./RadioDropdown";

export default function FormatCustomiseSidebar({ activeTab, onClose, viewType = "pivot-table", onBreakdownChange, onMetricChange, onCreateCustomBreakdown, onCreateCustomMetric, onCreateCustomConversion }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubTab, setActiveSubTab] = useState("breakdowns");
  const [expandedSections, setExpandedSections] = useState({
    popularBreakdowns: true,
    customBreakdowns: true,
    level: true,
    time: true,
    delivery: true,
    action: true,
    settings: true,
    dynamicCreativeAsset: true,
    // Metrics sections
    popularMetrics: true,
    customMetrics: true,
    performance: true,
    engagement: true,
    conversions: true,
    customConversions: true,
    settingsMetrics: true,
  });
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showConditionalFormatting, setShowConditionalFormatting] =
    useState(false);
  const [activeFormatTab, setActiveFormatTab] = useState("single");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [onlyBreakdownRows, setOnlyBreakdownRows] = useState(true);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [conditionValue, setConditionValue] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [showConditionDropdown, setShowConditionDropdown] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [showPreviewDropdown, setShowPreviewDropdown] = useState(false);
  const [showMinDropdown, setShowMinDropdown] = useState(false);
  const [showMidpointDropdown, setShowMidpointDropdown] = useState(false);
  const [showMaxDropdown, setShowMaxDropdown] = useState(false);
  const [minType, setMinType] = useState("min");
  const [midpointType, setMidpointType] = useState("percentage");
  const [maxType, setMaxType] = useState("max");
  const [minValue, setMinValue] = useState("0");
  const [midpointValue, setMidpointValue] = useState("50");
  const [maxValue, setMaxValue] = useState("0");
  const [previewScale, setPreviewScale] = useState("white-green");
  const [isReversed, setIsReversed] = useState(false);
  const [dropdownPositions, setDropdownPositions] = useState({});

  // Selected breakdowns and metrics state
  const [selectedBreakdowns, setSelectedBreakdowns] = useState({
    "Campaign name": true,
    "Ad set name": true,
    "Ad name": false,
    "Page name": false,
    "Ad creative": false,
    "Age": false,
    "Gender": false,
    "Country": false,
    "Region": false,
    "Platform": false,
    "Placement": false,
    "Objective": false,
    "Day": false,
    "Month": false
  });

  const [selectedMetrics, setSelectedMetrics] = useState({
    "Amount spent": true,
    "Impressions": true,
    "Reach": true,
    "Results": true,
    "Cost per result": true,
    "Delivery": true,
    "Frequency": true,
    "Link clicks": true,
    "Post reactions": true,
    "Post comments": true,
    "Post shares": true,
    "CPC (cost per link click)": true,
    "CPM (cost per 1,000 impressions)": true,
    "CTR (all)": true
  });

  // Trend chart specific state (for trend and bar chart views)
  const [trendBreakdowns, setTrendBreakdowns] = useState([
    { id: "campaign", name: "Campaign name", checked: true },
    { id: "adset", name: "Ad set name", checked: true }
  ]);
  const [trendMetrics, setTrendMetrics] = useState([
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

  // Dropdown states for breakdowns and metrics
  const [showBreakdownsDropdown, setShowBreakdownsDropdown] = useState(false);
  const [showMetricsDropdown, setShowMetricsDropdown] = useState(false);
  
  // Drag and drop states
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);
  
  // Dropdown options
  const metricOptions = [
    { value: "reach", label: "Reach" },
    { value: "frequency", label: "Frequency" },
    { value: "campaign", label: "Campaign name" },
    { value: "adset", label: "Ad set name" }
  ];

  // Refs for dropdown buttons
  const columnButtonRef = useRef(null);
  const conditionButtonRef = useRef(null);
  const colorButtonRef = useRef(null);
  const previewButtonRef = useRef(null);
  const minButtonRef = useRef(null);
  const midpointButtonRef = useRef(null);
  const maxButtonRef = useRef(null);

  const checkDropdownPosition = (dropdownName, buttonRef) => {
    if (!buttonRef.current) return "bottom";

    const rect = buttonRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    // If there's less than 200px below and more space above, open above
    if (spaceBelow < 200 && spaceAbove > spaceBelow) {
      return "top";
    }
    return "bottom";
  };

  const toggleDropdown = (dropdownName, buttonRef) => {
    const position = checkDropdownPosition(dropdownName, buttonRef);
    setDropdownPositions((prev) => ({ ...prev, [dropdownName]: position }));

    switch (dropdownName) {
      case "column":
        setShowColumnDropdown(!showColumnDropdown);
        break;
      case "condition":
        setShowConditionDropdown(!showConditionDropdown);
        break;
      case "color":
        setShowColorDropdown(!showColorDropdown);
        break;
      case "preview":
        setShowPreviewDropdown(!showPreviewDropdown);
        break;
      case "min":
        setShowMinDropdown(!showMinDropdown);
        break;
      case "midpoint":
        setShowMidpointDropdown(!showMidpointDropdown);
        break;
      case "max":
        setShowMaxDropdown(!showMaxDropdown);
        break;
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const collapseAll = () => {
    setExpandedSections({
      popularBreakdowns: false,
      customBreakdowns: false,
      level: false,
      time: false,
      delivery: false,
      action: false,
      settings: false,
      dynamicCreativeAsset: false,
      popularMetrics: false,
      customMetrics: false,
      performance: false,
      engagement: false,
      conversions: false,
      customConversions: false,
      settingsMetrics: false,
    });
  };

  const expandAll = () => {
    setExpandedSections({
      popularBreakdowns: true,
      customBreakdowns: true,
      level: true,
      time: true,
      delivery: true,
      action: true,
      settings: true,
      dynamicCreativeAsset: true,
      popularMetrics: true,
      customMetrics: true,
      performance: true,
      engagement: true,
      conversions: true,
      customConversions: true,
      settingsMetrics: true,
    });
  };

  // Handler functions for breakdown and metric changes
  const handleBreakdownChange = (breakdownName, isChecked) => {
    setSelectedBreakdowns(prev => ({
      ...prev,
      [breakdownName]: isChecked
    }));
    
    if (onBreakdownChange) {
      onBreakdownChange(breakdownName, isChecked);
    }
  };

  const handleMetricChange = (metricName, isChecked) => {
    setSelectedMetrics(prev => ({
      ...prev,
      [metricName]: isChecked
    }));
    
    if (onMetricChange) {
      onMetricChange(metricName, isChecked);
    }
  };

  // Create button handlers
  const handleCreateCustomBreakdown = () => {
    if (onCreateCustomBreakdown) {
      onCreateCustomBreakdown();
    } else {
      // Default behavior - show alert
      alert("Create Custom Breakdown functionality would be implemented here");
    }
  };

  const handleCreateCustomMetric = () => {
    if (onCreateCustomMetric) {
      onCreateCustomMetric();
    } else {
      // Default behavior - show alert
      alert("Create Custom Metric functionality would be implemented here");
    }
  };

  const handleCreateCustomConversion = () => {
    if (onCreateCustomConversion) {
      onCreateCustomConversion();
    } else {
      // Default behavior - show alert
      alert("Create Custom Conversion functionality would be implemented here");
    }
  };

  // Trend chart handlers
  const handleBreakdownToggle = (breakdownId) => {
    setTrendBreakdowns(prev => 
      prev.map(breakdown => 
        breakdown.id === breakdownId 
          ? { ...breakdown, checked: !breakdown.checked }
          : breakdown
      )
    );
  };

  const handleMetricToggle = (metricId) => {
    setTrendMetrics(prev => 
      prev.map(metric => 
        metric.id === metricId 
          ? { ...metric, checked: !metric.checked }
          : metric
      )
    );
  };

  // Reorder functions
  const moveBreakdown = (fromIndex, toIndex) => {
    setTrendBreakdowns(prev => {
      const newBreakdowns = [...prev];
      const [movedItem] = newBreakdowns.splice(fromIndex, 1);
      newBreakdowns.splice(toIndex, 0, movedItem);
      return newBreakdowns;
    });
  };

  const moveMetric = (fromIndex, toIndex) => {
    setTrendMetrics(prev => {
      const newMetrics = [...prev];
      const [movedItem] = newMetrics.splice(fromIndex, 1);
      newMetrics.splice(toIndex, 0, movedItem);
      return newMetrics;
    });
  };

  // Remove functions
  const removeBreakdown = (breakdownId) => {
    setTrendBreakdowns(prev => prev.filter(breakdown => breakdown.id !== breakdownId));
  };

  const removeMetric = (metricId) => {
    setTrendMetrics(prev => prev.filter(metric => metric.id !== metricId));
  };

  // Drag and drop handlers
  const handleDragStart = (e, itemId, type) => {
    setDraggedItem({ id: itemId, type });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, itemId, type) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDraggedOverItem({ id: itemId, type });
  };

  const handleDragLeave = () => {
    setDraggedOverItem(null);
  };

  const handleDrop = (e, targetItemId, type) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.type !== type) return;
    
    const sourceIndex = type === 'breakdown' 
      ? trendBreakdowns.findIndex(item => item.id === draggedItem.id)
      : trendMetrics.findIndex(item => item.id === draggedItem.id);
    
    const targetIndex = type === 'breakdown'
      ? trendBreakdowns.findIndex(item => item.id === targetItemId)
      : trendMetrics.findIndex(item => item.id === targetItemId);
    
    if (sourceIndex === -1 || targetIndex === -1 || sourceIndex === targetIndex) return;
    
    if (type === 'breakdown') {
      moveBreakdown(sourceIndex, targetIndex);
    } else {
      moveMetric(sourceIndex, targetIndex);
    }
    
    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  if (activeTab === "format") {
    return (
      <div className="w-70 text-sm h-full overflow-y-auto bg-white pb-20 border-l border-gray-200 flex flex-col rounded-md">
        {/* Header */}
        <div className="p-4 ">
          <div className="flex items-center justify-between">
            <h3 className=" font-semibold text-gray-900">
              Conditional formatting
            </h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          {!showConditionalFormatting ? (
            <div className="text-center py-8">
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                There are no rules yet
              </h4>
              <p className="text-sm text-gray-500 mb-4">
                Create rules to customise your report
              </p>
              <button
                onClick={() => setShowConditionalFormatting(true)}
                className="px-4 py-2 border border-gray-300  rounded-md w-full hover:bg-gray-100 "
              >
                Create Rule
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Tabs */}
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveFormatTab("single")}
                  className={`px-3 py-2 text-sm font-medium rounded ${
                    activeFormatTab === "single"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Single colour
                </button>
                <button
                  onClick={() => setActiveFormatTab("scale")}
                  className={`px-3 py-2 text-sm font-medium rounded ${
                    activeFormatTab === "scale"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Colour scale
                </button>
              </div>

              {activeFormatTab === "single" ? (
                <>
                  {/* Apply to column */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Apply to column
                    </label>
                    <div className="relative">
                      <button
                        ref={columnButtonRef}
                        onClick={() =>
                          toggleDropdown("column", columnButtonRef)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex items-center justify-between"
                      >
                        <span>{selectedColumn || "Choose column"}</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </button>
                      {showColumnDropdown && (
                        <div
                          className={`absolute left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 ${
                            dropdownPositions.column === "top"
                              ? "bottom-full mb-1"
                              : "top-full mt-1"
                          }`}
                        >
                          <div className="p-2 space-y-1">
                            {[
                              "Reach",
                              "Frequency",
                              "Amount spent",
                              "Cost per result",
                              "Results",
                            ].map((column) => (
                              <label
                                key={column}
                                className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name="column"
                                  value={column}
                                  checked={selectedColumn === column}
                                  onChange={(e) => {
                                    setSelectedColumn(e.target.value);
                                    setShowColumnDropdown(false);
                                  }}
                                  className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-sm">{column}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Apply to rows */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Apply to rows
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="breakdown-rows"
                        checked={onlyBreakdownRows}
                        onChange={(e) => setOnlyBreakdownRows(e.target.checked)}
                        className="custom-checkbox"
                      />
                      <label
                        htmlFor="breakdown-rows"
                        className="text-sm text-gray-700"
                      >
                        Only break down rows
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      This rule will not apply to the grey rows
                    </p>
                  </div>

                  {/* Condition */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Condition
                    </label>
                    <div className="relative">
                      <button
                        ref={conditionButtonRef}
                        onClick={() =>
                          toggleDropdown("condition", conditionButtonRef)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex items-center justify-between"
                      >
                        <span>{selectedCondition || "Choose condition"}</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </button>
                      {showConditionDropdown && (
                        <div
                          className={`absolute left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 ${
                            dropdownPositions.condition === "top"
                              ? "bottom-full mb-1"
                              : "top-full mt-1"
                          }`}
                        >
                          <div className="p-2 space-y-1">
                            {[
                              "Greater than",
                              "Greater than or equal to",
                              "In range",
                              "Less than",
                              "Less than or equal to",
                              "Not in range",
                            ].map((condition) => (
                              <label
                                key={condition}
                                className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name="condition"
                                  value={condition}
                                  checked={selectedCondition === condition}
                                  onChange={(e) => {
                                    setSelectedCondition(e.target.value);
                                    setShowConditionDropdown(false);
                                  }}
                                  className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-sm">{condition}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Value */}
                  <div>
                    <input
                      type="text"
                      value={conditionValue}
                      onChange={(e) => setConditionValue(e.target.value)}
                      placeholder="Value"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Colour */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Colour
                    </label>
                    <div className="relative">
                      <button
                        ref={colorButtonRef}
                        onClick={() => toggleDropdown("color", colorButtonRef)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          {selectedColor && (
                            <div
                              className={`w-8 h-6 rounded ${
                                selectedColor === "red"
                                  ? "bg-red-400"
                                  : selectedColor === "yellow"
                                  ? "bg-yellow-400"
                                  : selectedColor === "green"
                                  ? "bg-green-400"
                                  : selectedColor === "blue"
                                  ? "bg-blue-400"
                                  : "bg-gray-400"
                              }`}
                            >
                              <span className="text-white text-xs font-bold flex items-center justify-center h-full">
                                123
                              </span>
                            </div>
                          )}
                          <span>{selectedColor || "Choose colour"}</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </button>
                      {showColorDropdown && (
                        <div
                          className={`absolute left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 ${
                            dropdownPositions.color === "top"
                              ? "bottom-full mb-1"
                              : "top-full mt-1"
                          }`}
                        >
                          <div className="p-2 space-y-1">
                            {[
                              { name: "Red", color: "bg-red-400/70" },
                              { name: "Yellow", color: "bg-yellow-400/70" },
                              { name: "Green", color: "bg-green-400/70" },
                              { name: "Blue", color: "bg-blue-400/70" },
                            ].map((color) => (
                              <label
                                key={color.name}
                                className={`flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer ${
                                  selectedColor === color.name.toLowerCase()
                                    ? "bg-gray-100"
                                    : ""
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="color"
                                  value={color.name.toLowerCase()}
                                  checked={
                                    selectedColor === color.name.toLowerCase()
                                  }
                                  onChange={(e) => {
                                    setSelectedColor(e.target.value);
                                    setShowColorDropdown(false);
                                  }}
                                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                />
                                <div
                                  className={`w-8 h-6  rounded ${color.color}`}
                                >
                                  <span className="text-black  text-xs font-bold flex items-center justify-center h-full">
                                    123
                                  </span>
                                </div>
                                <span className="text-sm p">{color.name}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Apply to column */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Apply to column
                    </label>
                    <div className="relative">
                      <button
                        ref={columnButtonRef}
                        onClick={() =>
                          toggleDropdown("column", columnButtonRef)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex items-center justify-between"
                      >
                        <span>{selectedColumn || "Choose column"}</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </button>
                      {showColumnDropdown && (
                        <div
                          className={`absolute left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 ${
                            dropdownPositions.column === "top"
                              ? "bottom-full mb-1"
                              : "top-full mt-1"
                          }`}
                        >
                          <div className="p-2 space-y-1">
                            {[
                              "Reach",
                              "Frequency",
                              "Amount spent",
                              "Cost per result",
                              "Results",
                            ].map((column) => (
                              <label
                                key={column}
                                className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name="column"
                                  value={column}
                                  checked={selectedColumn === column}
                                  onChange={(e) => {
                                    setSelectedColumn(e.target.value);
                                    setShowColumnDropdown(false);
                                  }}
                                  className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-sm">{column}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Apply to rows */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Apply to rows
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="breakdown-rows-scale"
                        checked={onlyBreakdownRows}
                        onChange={(e) => setOnlyBreakdownRows(e.target.checked)}
                        className="custom-checkbox"
                      />
                      <label
                        htmlFor="breakdown-rows-scale"
                        className="text-sm text-gray-700"
                      >
                        Only break down rows
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      This rule will not apply to the grey rows
                    </p>
                  </div>

                  {/* Preview */}
                  <div className=" w-full">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Preview
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 flex items-center space-x-2">
                        <div className="relative flex-1">
                          <button
                            ref={previewButtonRef}
                            onClick={() =>
                              toggleDropdown("preview", previewButtonRef)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2">
                              <div
                                className={`w-8 h-4 bg-gradient-to-r ${
                                  previewScale === "green-white"
                                    ? "from-green-400 to-white"
                                    : previewScale === "white-green"
                                    ? "from-white to-green-400"
                                    : previewScale === "red-white"
                                    ? "from-red-400 to-white"
                                    : previewScale === "yellow-white"
                                    ? "from-yellow-400 to-white"
                                    : previewScale === "green-white-red"
                                    ? "from-green-400 via-white to-red-400"
                                    : "from-green-400 to-white"
                                } rounded border`}
                              ></div>
                              <span>
                                {previewScale === "green-white"
                                  ? "Green, white"
                                  : previewScale === "white-green"
                                  ? "White, green"
                                  : previewScale === "red-white"
                                  ? "Red, white"
                                  : previewScale === "yellow-white"
                                  ? "Yellow, white"
                                  : previewScale === "green-white-red"
                                  ? "Green, white, red"
                                  : "Green, white"}
                              </span>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          </button>
                          {showPreviewDropdown && (
                            <div
                              className={`absolute left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 ${
                                dropdownPositions.preview === "top"
                                  ? "bottom-full mb-1"
                                  : "top-full mt-1"
                              }`}
                            >
                              <div className="p-2 space-y-1">
                                {[
                                  {
                                    name: "Green, white",
                                    gradient: "from-green-400 to-white",
                                    value: "green-white",
                                  },
                                  {
                                    name: "White, green",
                                    gradient: "from-white to-green-400",
                                    value: "white-green",
                                  },
                                  {
                                    name: "Red, white",
                                    gradient: "from-red-400 to-white",
                                    value: "red-white",
                                  },
                                  {
                                    name: "Yellow, white",
                                    gradient: "from-yellow-400 to-white",
                                    value: "yellow-white",
                                  },
                                  {
                                    name: "Green, white, red",
                                    gradient:
                                      "from-green-400 via-white to-red-400",
                                    value: "green-white-red",
                                  },
                                ].map((scale) => (
                                  <label
                                    key={scale.name}
                                    className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                  >
                                    <input
                                      type="radio"
                                      name="preview"
                                      value={scale.value}
                                      checked={previewScale === scale.value}
                                      onChange={(e) => {
                                        setPreviewScale(e.target.value);
                                        setShowPreviewDropdown(false);
                                      }}
                                      className="w-4 h-4 text-blue-600"
                                    />
                                    <div
                                      className={`w-8 h-4 bg-gradient-to-r ${scale.gradient} rounded border`}
                                    ></div>
                                    <span className="text-sm">
                                      {scale.name}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            setIsReversed(!isReversed);
                            // Toggle the gradient direction
                            if (previewScale === "green-white") {
                              setPreviewScale("white-green");
                            } else if (previewScale === "white-green") {
                              setPreviewScale("green-white");
                            }
                          }}
                          className="p-2 border border-gray-300 rounded hover:bg-gray-50"
                        >
                          <ArrowLeftRight className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Minimum */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Minimum
                    </label>
                    <div className="space-y-2">
                      <div className="relative">
                        <button
                          ref={minButtonRef}
                          onClick={() => toggleDropdown("min", minButtonRef)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-5 h-5 rounded-full ${
                                minType === "min"
                                  ? "bg-green-600"
                                  : "bg-gray-400"
                              }`}
                            ></div>
                            <span>
                              {minType === "min"
                                ? "Min. value"
                                : minType === "numeric"
                                ? "Numeric"
                                : "Percentage"}
                            </span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                        {showMinDropdown && (
                          <div
                            className={`absolute left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 ${
                              dropdownPositions.min === "top"
                                ? "bottom-full mb-1"
                                : "top-full mt-1"
                            }`}
                          >
                            <div className="p-2 space-y-1">
                              {["Min. value", "Numeric", "Percentage"].map(
                                (type) => (
                                  <label
                                    key={type}
                                    className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                  >
                                    <input
                                      type="radio"
                                      name="minType"
                                      value={type
                                        .toLowerCase()
                                        .replace(". ", "")}
                                      checked={
                                        minType ===
                                        type.toLowerCase().replace(". ", "")
                                      }
                                      onChange={(e) => {
                                        setMinType(e.target.value);
                                        setShowMinDropdown(false);
                                      }}
                                      className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-sm">{type}</span>
                                  </label>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <input
                        type="text"
                        value={minValue}
                        onChange={(e) => setMinValue(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Midpoint */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Midpoint
                    </label>
                    <div className="space-y-2">
                      <div className="relative">
                        <button
                          ref={midpointButtonRef}
                          onClick={() =>
                            toggleDropdown("midpoint", midpointButtonRef)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-5 h-5 rounded-full ${
                                midpointType === "percentage"
                                  ? "bg-green-500"
                                  : "bg-gray-400"
                              }`}
                            ></div>
                            <span>
                              {midpointType === "min"
                                ? "Min. value"
                                : midpointType === "numeric"
                                ? "Numeric"
                                : "Percentage"}
                            </span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                        {showMidpointDropdown && (
                          <div
                            className={`absolute left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 ${
                              dropdownPositions.midpoint === "top"
                                ? "bottom-full mb-1"
                                : "top-full mt-1"
                            }`}
                          >
                            <div className="p-2 space-y-1">
                              {["Min. value", "Numeric", "Percentage"].map(
                                (type) => (
                                  <label
                                    key={type}
                                    className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                  >
                                    <input
                                      type="radio"
                                      name="midpointType"
                                      value={type
                                        .toLowerCase()
                                        .replace(". ", "")}
                                      checked={
                                        midpointType ===
                                        type.toLowerCase().replace(". ", "")
                                      }
                                      onChange={(e) => {
                                        setMidpointType(e.target.value);
                                        setShowMidpointDropdown(false);
                                      }}
                                      className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-sm">{type}</span>
                                  </label>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <input
                        type="text"
                        value={midpointValue}
                        onChange={(e) => setMidpointValue(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Maximum */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Maximum
                    </label>
                    <div className="space-y-2">
                      <div className="relative">
                        <button
                          ref={maxButtonRef}
                          onClick={() => toggleDropdown("max", maxButtonRef)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-5 h-5 rounded-full ${
                                maxType === "max"
                                  ? "bg-gray-300"
                                  : "bg-gray-300"
                              }`}
                            ></div>
                            <span>
                              {maxType === "min"
                                ? "Min. value"
                                : maxType === "numeric"
                                ? "Numeric"
                                : "Max. value"}
                            </span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                        {showMaxDropdown && (
                          <div
                            className={`absolute left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 ${
                              dropdownPositions.max === "top"
                                ? "bottom-full mb-1"
                                : "top-full mt-1"
                            }`}
                          >
                            <div className="p-2 space-y-1">
                              {["Min. value", "Numeric", "Max. value"].map(
                                (type) => (
                                  <label
                                    key={type}
                                    className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                  >
                                    <input
                                      type="radio"
                                      name="maxType"
                                      value={type
                                        .toLowerCase()
                                        .replace(". ", "")}
                                      checked={
                                        maxType ===
                                        type.toLowerCase().replace(". ", "")
                                      }
                                      onChange={(e) => {
                                        setMaxType(e.target.value);
                                        setShowMaxDropdown(false);
                                      }}
                                      className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-sm">{type}</span>
                                  </label>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <input
                        type="text"
                        value={maxValue}
                        onChange={(e) => setMaxValue(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Sticky Footer Buttons */}
              <div className="sticky bottom-14 mt-20 bg-white  p-4 -mx-4 -mb-4">
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowConditionalFormatting(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Handle save logic here
                      setShowConditionalFormatting(false);
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Trend chart customise content
  if (viewType === "trend" && activeTab === "customise") {
    return (
      <div className="w-70 h-full bg-white border-l border-gray-200 flex flex-col rounded-md">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Customise trend chart</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 h-screen overflow-y-auto p-4 pb-40 space-y-6">
          {/* Data Section */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Data</h4>
            
            {/* Breakdowns */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h5 className="text-sm font-medium text-gray-700">Breakdowns (lines)</h5>
                  <div className="w-3 h-3 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-xs text-gray-600">i</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowBreakdownsDropdown(!showBreakdownsDropdown)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Breakdowns Dropdown */}
              {showBreakdownsDropdown && (
                <div className="mb-3 bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                  <div className="space-y-2">
                    {trendBreakdowns.map((breakdown, index) => (
                      <div 
                        key={breakdown.id} 
                        draggable
                        onDragStart={(e) => handleDragStart(e, breakdown.id, 'breakdown')}
                        onDragOver={(e) => handleDragOver(e, breakdown.id, 'breakdown')}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, breakdown.id, 'breakdown')}
                        onDragEnd={handleDragEnd}
                        className={`flex items-center gap-2 p-2 hover:bg-gray-50 rounded transition-colors ${
                          draggedItem?.id === breakdown.id ? 'opacity-50' : ''
                        } ${
                          draggedOverItem?.id === breakdown.id && draggedItem?.id !== breakdown.id 
                            ? 'bg-blue-50 border border-blue-200' 
                            : ''
                        }`}
                      >
                        <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                        <span className="flex-1 text-sm text-gray-700">{breakdown.name}</span>
                        <button
                          onClick={() => removeBreakdown(breakdown.id)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <X className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="text-xs text-gray-500 text-center">
                      Drag to reorder • Click X to remove
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {trendBreakdowns.map((breakdown) => (
                  <label key={breakdown.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={breakdown.checked}
                      onChange={() => handleBreakdownToggle(breakdown.id)}
                      className="custom-checkbox"
                    />
                    <span className="ml-2 text-sm text-gray-700">{breakdown.name}</span>
                  </label>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search breakdowns"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h5 className="text-sm font-medium text-gray-700">Metrics (y-axis)</h5>
                  <div className="w-3 h-3 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-xs text-gray-600">i</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowMetricsDropdown(!showMetricsDropdown)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Metrics Dropdown */}
              {showMetricsDropdown && (
                <div className="mb-3 bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {trendMetrics.map((metric, index) => (
                      <div 
                        key={metric.id} 
                        draggable
                        onDragStart={(e) => handleDragStart(e, metric.id, 'metric')}
                        onDragOver={(e) => handleDragOver(e, metric.id, 'metric')}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, metric.id, 'metric')}
                        onDragEnd={handleDragEnd}
                        className={`flex items-center gap-2 p-2 hover:bg-gray-50 rounded transition-colors ${
                          draggedItem?.id === metric.id ? 'opacity-50' : ''
                        } ${
                          draggedOverItem?.id === metric.id && draggedItem?.id !== metric.id 
                            ? 'bg-blue-50 border border-blue-200' 
                            : ''
                        }`}
                      >
                        <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                        <span className="flex-1 text-sm text-gray-700">{metric.name}</span>
                        <button
                          onClick={() => removeMetric(metric.id)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <X className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="text-xs text-gray-500 text-center">
                      Drag to reorder • Click X to remove
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {trendMetrics.map((metric) => (
                  <label key={metric.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={metric.checked}
                      onChange={() => handleMetricToggle(metric.id)}
                      className="custom-checkbox"
                    />
                    <span className={`ml-2 text-sm ${metric.checked ? 'text-gray-700' : 'text-gray-400'}`}>
                      {metric.name}
                    </span>
                  </label>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search metrics"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>
          </div>

          {/* Format Section */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Format</h4>
            
            {/* Line sorting */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <h5 className="text-sm font-medium text-gray-700">Line sorting</h5>
                <div className="w-3 h-3 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-xs text-gray-600">i</span>
                </div>
              </div>
              <RadioDropdown
                options={[
                  { value: "reach", label: "Reach" },
                  { value: "frequency", label: "Frequency" },
                  { value: "delivery", label: "Delivery" }
                ]}
                selectedValue={lineSorting}
                onSelect={setLineSorting}
                placeholder="Select sorting"
                className="w-full"
              />
              <div className="flex mt-2">
                <button
                  onClick={() => setSortDirection("ascending")}
                  className={`flex-1 px-3 py-2 text-xs rounded-l-md border ${
                    sortDirection === "ascending"
                      ? "bg-gray-200 text-gray-800 border-gray-300"
                      : "bg-white text-gray-600 border-gray-300"
                  }`}
                >
                  Ascending
                </button>
                <button
                  onClick={() => setSortDirection("descending")}
                  className={`flex-1 px-3 py-2 text-xs rounded-r-md border-t border-b border-r ${
                    sortDirection === "descending"
                      ? "bg-gray-200 text-gray-800 border-gray-300"
                      : "bg-white text-gray-600 border-gray-300"
                  }`}
                >
                  Descending
                </button>
              </div>
            </div>

            {/* Line count */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <h5 className="text-sm font-medium text-gray-700">Line count</h5>
                <div className="w-3 h-3 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-xs text-gray-600">i</span>
                </div>
              </div>
              <input
                type="number"
                value={lineCount}
                onChange={(e) => setLineCount(parseInt(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Time interval */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h5 className="text-sm font-medium text-gray-700">Time interval (x-axis)</h5>
              </div>
              <div className="flex">
                <button
                  onClick={() => setTimeInterval("day")}
                  className={`flex-1 px-3 py-2 text-xs rounded-l-md border ${
                    timeInterval === "day"
                      ? "bg-gray-200 text-gray-800 border-gray-300"
                      : "bg-white text-gray-600 border-gray-300"
                  }`}
                >
                  Day
                </button>
                <button
                  onClick={() => setTimeInterval("week")}
                  className={`flex-1 px-3 py-2 text-xs border-t border-b ${
                    timeInterval === "week"
                      ? "bg-gray-200 text-gray-800 border-gray-300"
                      : "bg-white text-gray-600 border-gray-300"
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setTimeInterval("month")}
                  className={`flex-1 px-3 py-2 text-xs rounded-r-md border-t border-b border-r ${
                    timeInterval === "month"
                      ? "bg-gray-200 text-gray-800 border-gray-300"
                      : "bg-white text-gray-600 border-gray-300"
                  }`}
                >
                  Month
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Bar chart customise content
  if (viewType === "bar-chart" && activeTab === "customise") {
    return (
      <div className="w-70 h-full bg-white border-l border-gray-200 flex flex-col rounded-md">
        {/* Sidebar Header */}
        <div className="p-4 ">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Customise bar chart</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 h-screen overflow-y-auto p-4 pb-40 space-y-6">
          {/* Data Section */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Data</h4>
            
            {/* Breakdowns */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h5 className="text-sm font-medium text-gray-700">Breakdowns (bar groups)</h5>
                  <div className="w-3 h-3 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-xs text-gray-600">i</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowBreakdownsDropdown(!showBreakdownsDropdown)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Breakdowns Dropdown */}
              {showBreakdownsDropdown && (
                <div className="mb-3 bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                  <div className="space-y-2">
                    {trendBreakdowns.map((breakdown, index) => (
                      <div 
                        key={breakdown.id} 
                        draggable
                        onDragStart={(e) => handleDragStart(e, breakdown.id, 'breakdown')}
                        onDragOver={(e) => handleDragOver(e, breakdown.id, 'breakdown')}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, breakdown.id, 'breakdown')}
                        onDragEnd={handleDragEnd}
                        className={`flex items-center gap-2 p-2 hover:bg-gray-50 rounded transition-colors ${
                          draggedItem?.id === breakdown.id ? 'opacity-50' : ''
                        } ${
                          draggedOverItem?.id === breakdown.id && draggedItem?.id !== breakdown.id 
                            ? 'bg-blue-50 border border-blue-200' 
                            : ''
                        }`}
                      >
                        <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                        <span className="flex-1 text-sm text-gray-700">{breakdown.name}</span>
                        <button
                          onClick={() => removeBreakdown(breakdown.id)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <X className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="text-xs text-gray-500 text-center">
                      Drag to reorder • Click X to remove
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {trendBreakdowns.map((breakdown) => (
                  <label key={breakdown.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={breakdown.checked}
                      onChange={() => handleBreakdownToggle(breakdown.id)}
                      className="custom-checkbox"
                    />
                    <span className="ml-2 text-sm text-gray-700">{breakdown.name}</span>
                  </label>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search breakdowns"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h5 className="text-sm font-medium text-gray-700">Metrics (bars)</h5>
                  <div className="w-3 h-3 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-xs text-gray-600">i</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowMetricsDropdown(!showMetricsDropdown)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Metrics Dropdown */}
              {showMetricsDropdown && (
                <div className="mb-3 bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {trendMetrics.map((metric, index) => (
                      <div 
                        key={metric.id} 
                        draggable
                        onDragStart={(e) => handleDragStart(e, metric.id, 'metric')}
                        onDragOver={(e) => handleDragOver(e, metric.id, 'metric')}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, metric.id, 'metric')}
                        onDragEnd={handleDragEnd}
                        className={`flex items-center gap-2 p-2 hover:bg-gray-50 rounded transition-colors ${
                          draggedItem?.id === metric.id ? 'opacity-50' : ''
                        } ${
                          draggedOverItem?.id === metric.id && draggedItem?.id !== metric.id 
                            ? 'bg-blue-50 border border-blue-200' 
                            : ''
                        }`}
                      >
                        <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                        <span className="flex-1 text-sm text-gray-700">{metric.name}</span>
                        <button
                          onClick={() => removeMetric(metric.id)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <X className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="text-xs text-gray-500 text-center">
                      Drag to reorder • Click X to remove
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {trendMetrics.map((metric) => (
                  <label key={metric.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={metric.checked}
                      onChange={() => handleMetricToggle(metric.id)}
                      className="custom-checkbox"
                    />
                    <span className={`ml-2 text-sm ${metric.checked ? 'text-gray-700' : 'text-gray-400'}`}>
                      {metric.name}
                    </span>
                  </label>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search metrics"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>
          </div>

          {/* Format Section */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Format</h4>
            
            {/* Bar group sorting */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <h5 className="text-sm font-medium text-gray-700">Bar group sorting</h5>
                <div className="w-3 h-3 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-xs text-gray-600">i</span>
                </div>
              </div>
              <RadioDropdown
                options={[
                  { value: "reach", label: "Reach" },
                  { value: "frequency", label: "Frequency" },
                  { value: "delivery", label: "Delivery" }
                ]}
                selectedValue={lineSorting}
                onSelect={setLineSorting}
                placeholder="Select sorting"
                className="w-full"
              />
              <div className="flex mt-2">
                <button
                  onClick={() => setSortDirection("ascending")}
                  className={`flex-1 px-3 py-2 text-xs rounded-l-md border ${
                    sortDirection === "ascending"
                      ? "bg-gray-200 text-gray-800 border-gray-300"
                      : "bg-white text-gray-600 border-gray-300"
                  }`}
                >
                  Ascending
                </button>
                <button
                  onClick={() => setSortDirection("descending")}
                  className={`flex-1 px-3 py-2 text-xs rounded-r-md border-t border-b border-r ${
                    sortDirection === "descending"
                      ? "bg-gray-200 text-gray-800 border-gray-300"
                      : "bg-white text-gray-600 border-gray-300"
                  }`}
                >
                  Descending
                </button>
              </div>
            </div>

            {/* Bar group count */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <h5 className="text-sm font-medium text-gray-700">Bar group count</h5>
                <div className="w-3 h-3 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-xs text-gray-600">i</span>
                </div>
              </div>
              <input
                type="number"
                value={lineCount}
                onChange={(e) => setLineCount(parseInt(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Chart type */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h5 className="text-sm font-medium text-gray-700">Chart type</h5>
              </div>
              <div className="flex">
                <button
                  onClick={() => setTimeInterval("vertical")}
                  className={`flex-1 px-3 py-2 text-xs rounded-l-md border ${
                    timeInterval === "vertical"
                      ? "bg-gray-200 text-gray-800 border-gray-300"
                      : "bg-white text-gray-600 border-gray-300"
                  }`}
                >
                  Vertical
                </button>
                <button
                  onClick={() => setTimeInterval("horizontal")}
                  className={`flex-1 px-3 py-2 text-xs border-t border-b ${
                    timeInterval === "horizontal"
                      ? "bg-gray-200 text-gray-800 border-gray-300"
                      : "bg-white text-gray-600 border-gray-300"
                  }`}
                >
                  Horizontal
                </button>
                <button
                  onClick={() => setTimeInterval("stacked")}
                  className={`flex-1 px-3 py-2 text-xs rounded-r-md border-t border-b border-r ${
                    timeInterval === "stacked"
                      ? "bg-gray-200 text-gray-800 border-gray-300"
                      : "bg-white text-gray-600 border-gray-300"
                  }`}
                >
                  Stacked
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "customise") {
    return (
      <>
        <div className="w-70 h-full pb-36 bg-white border-l border-gray-200 flex flex-col rounded-md ">
          {/* Header */}
          <div className="p-4 ">
            <div className="flex items-center justify-between">
              <h3 className=" font-semibold text-gray-900">
                Customise pivot table
              </h3>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Search Bar and More Options */}
          <div className="px-4 py-1 text-sm">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                  className="p-2 hover:bg-gray-100 rounded-lg border border-gray-300"
                >
                  <MoreHorizontal className="w-4 h-4 text-gray-600" />
                </button>
                {showMoreDropdown && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]">
                    <div className="py-1">
                      <div className="px-3 py-2 text-sm font-medium text-gray-900">
                        Manage
                      </div>
                      <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between">
                        <span>Reorder columns</span>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                            11 selected
                          </span>
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </button>
                      <div className="border-t border-gray-200 my-1"></div>
                      <div className="px-3 py-2 text-sm font-medium text-gray-900">
                        Create
                      </div>
                      <button 
                        onClick={handleCreateCustomBreakdown}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                      >
                        Custom breakdown
                      </button>
                      <button 
                        onClick={handleCreateCustomMetric}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                      >
                        Custom metric
                      </button>
                      <div className="border-t border-gray-200 my-1"></div>
                      <div className="px-3 py-2 text-sm font-medium text-gray-900">
                        Compare attribution settings
                      </div>
                      <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50">
                        Select attribution settings
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-4 py-2 ">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveSubTab("breakdowns")}
                className={`px-3 py-2 text-sm font-medium rounded ${
                  activeSubTab === "breakdowns"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Breakdowns
              </button>
              <button
                onClick={() => setActiveSubTab("metrics")}
                className={`px-3 py-2 text-sm font-medium rounded ${
                  activeSubTab === "metrics"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Metrics
              </button>
              {/* <div className="flex-1"></div> */}
              <button
                onClick={
                  Object.values(expandedSections).every((expanded) => expanded)
                    ? collapseAll
                    : expandAll
                }
                className="p-2 hover:bg-gray-100 rounded"
                title={
                  Object.values(expandedSections).every((expanded) => expanded)
                    ? "Collapse all"
                    : "Expand all"
                }
              >
                <ArrowUpDown className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 text-sm">
            {activeSubTab === "breakdowns" ? (
              <div className="space-y-4">
                {/* Popular breakdowns */}
                <div>
                  <button
                    onClick={() => toggleSection("popularBreakdowns")}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                  >
                    <span>Popular breakdowns</span>
                    {expandedSections.popularBreakdowns ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.popularBreakdowns && (
                    <div className="space-y-2 ml-4 max-h-60 overflow-y-auto">
                      {Object.entries(selectedBreakdowns).map(([name, isChecked]) => (
                        <label key={name} className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                            checked={isChecked}
                            onChange={(e) => handleBreakdownChange(name, e.target.checked)}
                        />
                          <span className="ml-2 text-sm">{name}</span>
                      </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Custom breakdowns */}
                <div>
                  <button
                    onClick={() => toggleSection("customBreakdowns")}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                  >
                    <span>Custom breakdowns</span>
                    {expandedSections.customBreakdowns ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.customBreakdowns && (
                    <div className="ml-4">
                      <button 
                        onClick={handleCreateCustomBreakdown}
                        className="flex items-center text-blue-600 hover:text-blue-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        <span className="text-sm">Create</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Level */}
                <div>
                  <button
                    onClick={() => toggleSection("level")}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                  >
                    <span>Level</span>
                    {expandedSections.level ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.level && (
                    <div className="space-y-2 ml-4">
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Campaign</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Ad set</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Ad</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Time */}
                <div>
                  <button
                    onClick={() => toggleSection("time")}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                  >
                    <span>Time</span>
                    {expandedSections.time ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.time && (
                    <div className="space-y-2 ml-4">
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Day</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Week</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Month</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Quarter</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Delivery */}
                <div>
                  <button
                    onClick={() => toggleSection("delivery")}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                  >
                    <span>Delivery</span>
                    {expandedSections.delivery ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.delivery && (
                    <div className="space-y-2 ml-4">
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Delivery status</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Bid strategy</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Optimization goal</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Action */}
                <div>
                  <button
                    onClick={() => toggleSection("action")}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                  >
                    <span>Action</span>
                    {expandedSections.action ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.action && (
                    <div className="space-y-2 ml-4">
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Action type</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Action destination</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Action source</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Settings */}
                <div>
                  <button
                    onClick={() => toggleSection("settings")}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                  >
                    <span>Settings</span>
                    {expandedSections.settings ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.settings && (
                    <div className="space-y-2 ml-4">
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Attribution setting
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Schedule</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Budget</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Dynamic creative asset */}
                <div>
                  <button
                    onClick={() => toggleSection("dynamicCreativeAsset")}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                  >
                    <span>Dynamic creative asset</span>
                    {expandedSections.dynamicCreativeAsset ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.dynamicCreativeAsset && (
                    <div className="space-y-2 ml-4">
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Creative</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Text</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Image</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Video</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Popular metrics */}
                <div>
                  <button
                    onClick={() => toggleSection("popularMetrics")}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                  >
                    <span>Popular metrics</span>
                    {expandedSections.popularMetrics ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.popularMetrics && (
                    <div className="space-y-2 ml-4 max-h-60 overflow-y-auto">
                      {Object.entries(selectedMetrics).map(([name, isChecked]) => (
                        <label key={name} className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                            checked={isChecked}
                            onChange={(e) => handleMetricChange(name, e.target.checked)}
                        />
                          <span className="ml-2 text-sm">{name}</span>
                      </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Custom metrics */}
                <div>
                  <button
                    onClick={() => toggleSection("customMetrics")}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                  >
                    <span>Custom metrics</span>
                    {expandedSections.customMetrics ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.customMetrics && (
                    <div className="ml-4">
                      <div className="text-xs text-gray-500 mb-2">Only you</div>
                      <button 
                        onClick={handleCreateCustomMetric}
                        className="flex items-center text-blue-600 hover:text-blue-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        <span className="text-sm">Create</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Performance */}
                <div>
                  <button
                    onClick={() => toggleSection("performance")}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                  >
                    <span>Performance</span>
                    {expandedSections.performance ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.performance && (
                    <div className="space-y-2 ml-4 max-h-60 overflow-y-auto">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Results</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Result rate</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Reach</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Frequency</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Impressions</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Views</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Delivery</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Amount spent</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Clicks (all)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">CPC (all)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">CTR (all)</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Gross impressions (includes invalid impressions from
                          non-human traffic)
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Auto-refresh impressions
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Attribution setting
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Average purchases conversion value
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Purchases rate per landing page views
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Purchases rate per link clicks
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Landing page views rate per link clicks
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Cost per result</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Cost per 1,000 Accounts Centre accounts reached
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          CPM (cost per 1,000 impressions)
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Ad delivery</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Ad set delivery</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Campaign delivery</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Quality ranking</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Engagement rate ranking
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Conversion rate ranking
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          20-second phone calls
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          60-second phone calls
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          20-second Messenger calls
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          60-second Messenger calls
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Blocks</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Video average play time
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Video plays at 25%</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Video plays at 50%</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Video plays at 75%</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Video plays at 95%</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Video plays at 100%
                        </span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Engagement */}
                <div>
                  <button
                    onClick={() => toggleSection("engagement")}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                  >
                    <span>Engagement</span>
                    {expandedSections.engagement ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.engagement && (
                    <div className="space-y-2 ml-4 max-h-60 overflow-y-auto">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Page engagement</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Facebook likes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Instagram follows</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">
                          Join group requests
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Post comments</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Post engagements</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Post reactions</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Post saves</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Post shares</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Photo views</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Event responses</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Check-ins</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Effect share</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">
                          Cost per Page engagement
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Cost per like</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">
                          Cost per join group request
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">
                          Cost per post engagement
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">
                          Cost per event response
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          New messaging contacts
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Messaging conversations started
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Messaging subscriptions
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Welcome message views
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Messaging conversations replied
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Two message exchanges
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Three message exchanges
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Five message exchanges
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Cost per new messaging contact
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Cost per messaging conversation started
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Cost per messaging subscription
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Phone calls placed</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Estimated call confirmation clicks
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Callback requests submitted
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Messenger calls placed
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Unique 2-second continuous video plays
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          2-second continuous video plays
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          3-second video plays
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">ThruPlays</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Video average play time
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Video plays</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Instant Experience view time
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Instant Experience view percentage
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Instant Experience impressions
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Instant Experience reach
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Cost per 2-second continuous video play
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Cost per 3-second video play
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Cost per ThruPlay</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Link clicks</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Shop clicks</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Unique link clicks</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Outbound clicks</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Unique outbound clicks
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          CTR (link click-through rate)
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Unique CTR (link click-through rate)
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Outbound CTR (click-through rate)
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Unique outbound CTR (click-through rate)
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Unique clicks (all)
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Unique CTR (all)</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Instant Experience clicks to open
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Instant Experience clicks to start
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Instant Experience outbound clicks
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Net reminders on</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Instagram profile visits
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          CPC (cost per link click)
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Cost per unique link click
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Cost per outbound click
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Cost per unique outbound click
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Cost per unique click (all)
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Estimated ad recall lift (people)
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Estimated ad recall lift rate
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Cost per estimated ad recall lift (people)
                        </span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Conversions */}
                <div>
                  <button
                    onClick={() => toggleSection("conversions")}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                  >
                    <span>Conversions</span>
                    {expandedSections.conversions ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.conversions && (
                    <div className="space-y-2 ml-4 max-h-60 overflow-y-auto">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Conversions</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">
                          Cost per conversion
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">Conversion rate</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Unique conversions</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Unique cost per conversion
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Unique conversion rate
                        </span>
                      </label>
                      {/* Add more conversion metrics here - truncated for brevity */}
                    </div>
                  )}
                </div>

                {/* Custom conversions */}
                <div>
                  <button
                    onClick={() => toggleSection("customConversions")}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                  >
                    <span>Custom conversions</span>
                    {expandedSections.customConversions ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.customConversions && (
                    <div className="ml-4">
                      <button 
                        onClick={handleCreateCustomConversion}
                        className="flex items-center text-blue-600 hover:text-blue-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        <span className="text-sm">Create</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Settings */}
                <div>
                  <button
                    onClick={() => toggleSection("settingsMetrics")}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                  >
                    <span>Settings</span>
                    {expandedSections.settingsMetrics ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.settingsMetrics && (
                    <div className="space-y-2 ml-4 max-h-60 overflow-y-auto">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm">
                          Attribution setting
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Account ID</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Account name</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Reporting starts</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Reporting ends</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Objective</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Performance goal</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Buying type</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Bid</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Schedule</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Ad ID</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Ad name</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Ad set budget</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Ad set ID</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Ad set name</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Campaign budget</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Campaign ID</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Campaign name</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Body (ad settings)</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Preview link</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Link (ad settings)</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Currency</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Time zone</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Page ID</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Description</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Headline (ad settings)
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Website URL</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Call to action</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Image hash</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Video ID</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Image name</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">Video name</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">URL parameters</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Included custom audiences
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="custom-checkbox" />
                        <span className="ml-2 text-sm">
                          Excluded custom audiences
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return null;
}
