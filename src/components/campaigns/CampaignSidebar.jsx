"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  BarChart3,
  Edit3,
  Clock,
  ChevronRight,
  ChevronLeft,
  ArrowUp,
  Users,
  Monitor,
  Info,
  Settings,
  Calendar,
  Filter,
  Hamburger,
  HamburgerIcon,
  MenuIcon,
  FolderIcon,
  BlocksIcon,
  File,
  FileIcon,
  ChevronDown,
} from "lucide-react";
import PerformanceOverview from "./PerformanceOverview";
import DemographicsPlatform from "./DemographicsPlatform";
import ActionsTab from "./ActionsTab";
import EditTab from "./EditTab";
import DateRangePicker from "@/components/ui/DateRangePicker";

export default function CampaignSidebar({
  isOpen,
  onClose,
  activeTab = "chart",
}) {
  const [sidebarTab, setSidebarTab] = useState(activeTab);
  const [currentTab, setCurrentTab] = useState("performance");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInternalSidebarOpen, setIsInternalSidebarOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showActivityDropdown, setShowActivityDropdown] = useState(false);
  const [showChangedByDropdown, setShowChangedByDropdown] = useState(false);
  const [selectedActivityFilter, setSelectedActivityFilter] = useState("All");
  const [selectedChangedByFilter, setSelectedChangedByFilter] = useState("Anyone");
  const dropdownRef = useRef(null);

  // Sample activity data
  const activityData = [
    {
      id: 1,
      activity: "Ad status updated",
      details: "From Pending process to Inactive",
      item: "DYT Home Improvement",
      itemId: "Ad ID: 120232146845320228",
      changedBy: "Muhammad Bilal",
      date: "22 Aug at 20:21",
      category: "Ads",
      changedByType: "Muhammad Bilal"
    },
    {
      id: 2,
      activity: "Updated status of ad after it finishes ad review",
      details: "From Active to Inactive",
      item: "DYT Home Improvement",
      itemId: "Ad ID: 120232146845320228",
      changedBy: "Muhammad Bilal",
      date: "22 Aug at 20:21",
      category: "Ads",
      changedByType: "Muhammad Bilal"
    },
    {
      id: 3,
      activity: "Ad status updated",
      details: "From Active to Pending process",
      item: "DYT Home Improvement",
      itemId: "Ad ID: 120232146845320228",
      changedBy: "Muhammad Bilal",
      date: "22 Aug at 20:21",
      category: "Ads",
      changedByType: "Muhammad Bilal"
    },
    {
      id: 4,
      activity: "Campaign status updated",
      details: "From Pending process to Inactive",
      item: "DYT - Home Improvement US Campaign",
      itemId: "Campaign ID: 120232146845310228",
      changedBy: "Muhammad Bilal",
      date: "22 Aug at 20:21",
      category: "Campaigns",
      changedByType: "Muhammad Bilal"
    },
    {
      id: 5,
      activity: "Campaign status updated",
      details: "From Active to Pending process",
      item: "DYT - Home Improvement US Campaign",
      itemId: "Campaign ID: 120232146845310228",
      changedBy: "Muhammad Bilal",
      date: "22 Aug at 20:21",
      category: "Campaigns",
      changedByType: "Muhammad Bilal"
    },
    {
      id: 6,
      activity: "Ad set status updated",
      details: "From Active to Inactive",
      item: "20-65 USA FB Feeds only - DYT Home Improvement",
      itemId: "Ad set ID: 120232146845300228",
      changedBy: "Muhammad Bilal",
      date: "22 Aug at 20:21",
      category: "Ad Sets",
      changedByType: "Muhammad Bilal"
    },
    {
      id: 7,
      activity: "Ad status updated",
      details: "From Pending process to Active",
      item: "DYT Home Improvement",
      itemId: "Ad ID: 120232146845320228",
      changedBy: "Hassan Abbas",
      date: "22 Aug at 01:34",
      category: "Ads",
      changedByType: "Hassan Abbas"
    },
    {
      id: 8,
      activity: "Campaign status updated",
      details: "From Pending process to Active",
      item: "DYT - Home Improvement US Campaign",
      itemId: "Campaign ID: 120232146845310228",
      changedBy: "Hassan Abbas",
      date: "22 Aug at 01:34",
      category: "Campaigns",
      changedByType: "Hassan Abbas"
    }
  ];

  // Filter the data based on selected filters
  const filteredData = activityData.filter(item => {
    const activityMatch = selectedActivityFilter === "All" || item.category === selectedActivityFilter;
    const changedByMatch = selectedChangedByFilter === "Anyone" || item.changedByType === selectedChangedByFilter;
    return activityMatch && changedByMatch;
  });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowActivityDropdown(false);
        setShowChangedByDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Auto-expand main sidebar when internal sidebar is opened
  const handleInternalSidebarToggle = () => {
    const newInternalSidebarState = !isInternalSidebarOpen;
    setIsInternalSidebarOpen(newInternalSidebarState);

    // If opening internal sidebar and main sidebar is collapsed, expand it
    if (newInternalSidebarState && !isExpanded) {
      setIsExpanded(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 bg-black/70 bg-opacity-25 z-40"
      onClick={onClose}
    >
      <div
        className={`absolute top-0 right-0 bottom-0 bg-white text-gray-900 flex transition-all duration-300 ease-in-out z-50 ${
          isExpanded ? "w-[1370px]" : "w-[1100px]"
        }`}
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

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-auto p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          >
            {isExpanded ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Main Content Area with Internal Sidebar */}
        <div className="flex-1 flex bg-gray-50">
          {/* Internal Collapsible Sidebar */}
          {isInternalSidebarOpen && (
            <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
              <div className="p-4">
                {/* Search Bar */}
                <div className="relative mb-4">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Campaign Structure List */}
                <div className="space-y-1">
                  {/* Campaign Item (Selected) */}
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-5 h-5 text-blue-600 flex-shrink-0">
                        📁
                      </div>
                      <span className="text-sm font-medium text-blue-900 truncate block">
                        DYT - Home Improvement US Campaign
                      </span>
                    </div>
                    <button className="p-1 hover:bg-blue-100 rounded flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>

                  {/* Ad Set Item */}
                  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-5 h-5 text-gray-600 flex-shrink-0">
                        🔲
                      </div>
                      <span className="text-sm text-gray-900 truncate block">
                        20-65 USA FB Feeds only - DYT Home Improvement
                      </span>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>

                  {/* Ad Item (Indented) */}
                  <div className="flex items-center justify-between p-3 pl-8 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-5 h-5 text-gray-600 flex-shrink-0">
                        📄
                      </div>
                      <span className="text-sm text-gray-900 truncate block">
                        DYT Home Improvement Ad Creative
                      </span>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Header - Always Visible */}
            <div className=" pr-4 py-4">
              {/* Header with Campaign Structure and Controls */}
              <div className="flex items-center justify-between">
                {/* Left side: Trigger button + Campaign breadcrumb */}
                <div
                  className={`flex items-center ${
                    isExpanded ? "gap-3" : "gap-2"
                  }`}
                >
                  <button
                    onClick={handleInternalSidebarToggle}
                    className={`hover:bg-gray-100 rounded-lg transition-colors ${
                      isExpanded ? "p-2" : "p-1.5"
                    }`}
                    title="Toggle Campaign Structure Sidebar"
                  >
                    <MenuIcon size={isExpanded ? 20 : 16} />
                  </button>

                  {/* Campaign breadcrumb structure */}
                  <div
                    className={`flex items-center ${
                      isExpanded ? "gap-2 text-sm" : "gap-1.5 text-xs"
                    }`}
                  >
                    <div
                      className={`flex items-center ${
                        isExpanded ? "gap-2" : "gap-1.5"
                      }`}
                    >
                      <div
                        className={`bg-blue-50 rounded-full flex items-center ${
                          isExpanded ? "px-3 py-1 gap-2" : "px-2 py-0.5 gap-1.5"
                        }`}
                      >
                        <div
                          className={`text-blue-600 ${
                            isExpanded ? "w-4 h-4" : "w-3 h-3"
                          }`}
                        >
                          <FolderIcon size={isExpanded ? 20 : 16} />
                        </div>
                        <span
                          className={`text-blue-600 font-medium bg-blue-50 rounded-full ${
                            isExpanded
                              ? "px-3 py-1 text-sm"
                              : "px-2 py-0.5 text-xs"
                          }`}
                        >
                          DYT - Home Improvement US Campaign
                        </span>
                      </div>
                      <ChevronRight
                        className={`text-gray-400 ${
                          isExpanded ? "w-3 h-3" : "w-2.5 h-2.5"
                        }`}
                      />
                      <div
                        className={`text-gray-500 ${
                          isExpanded ? "w-4 h-4" : "w-3 h-3"
                        }`}
                      >
                        <BlocksIcon size={isExpanded ? 20 : 16} />
                      </div>
                      <span className="text-gray-600">1 Ad set</span>
                      <ChevronRight
                        className={`text-gray-400 ${
                          isExpanded ? "w-3 h-3" : "w-2.5 h-2.5"
                        }`}
                      />
                      <div
                        className={`text-gray-500 ${
                          isExpanded ? "w-4 h-4" : "w-3 h-3"
                        }`}
                      >
                        <FileIcon size={isExpanded ? 20 : 16} />
                      </div>
                      <span className="text-gray-600">1 Ad</span>
                    </div>
                  </div>
                </div>

                {/* Right side: Controls */}
                <div
                  className={`flex items-center ${
                    isExpanded ? "gap-4" : "gap-2"
                  }`}
                >
                  <button
                    className={`text-gray-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-full transition-colors ${
                      isExpanded ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"
                    }`}
                  >
                    Unpublished edits
                  </button>
                  <div
                    className={`flex items-center text-gray-600 ${
                      isExpanded ? "gap-2 text-sm" : "gap-1.5 text-xs"
                    }`}
                  >
                    <span>Off</span>
                    <button
                      className={`relative inline-flex items-center rounded-full bg-gray-200 ${
                        isExpanded ? "h-6 w-11" : "h-5 w-9"
                      }`}
                    >
                      <span
                        className={`inline-block transform rounded-full bg-white ${
                          isExpanded
                            ? "h-4 w-4 translate-x-1"
                            : "h-3 w-3 translate-x-0.5"
                        }`}
                      ></span>
                    </button>
                  </div>
                  <button
                    className={`hover:bg-gray-100 rounded-lg transition-colors ${
                      isExpanded ? "p-2" : "p-1.5"
                    }`}
                  >
                    <div
                      className={`bg-gray-800 rounded-sm text-white flex items-center justify-center ${
                        isExpanded ? "w-4 h-4 text-sm" : "w-3 h-3 text-xs"
                      }`}
                    >
                      ⋮
                    </div>
                  </button>
                </div>
              </div>

              {/* Chart Tab Specific Header - Performance/Actions Tabs and Date Dropdown */}
              {sidebarTab === "chart" && (
                <div className="mt-4 space-y-4">
                  {/* Performance and Actions Tabs - Full Width */}
                  <div className="flex border-b border-gray-200 w-full">
                    <button
                      onClick={() => setCurrentTab("performance")}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors flex-1 justify-center ${
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
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors flex-1 justify-center ${
                        currentTab === "actions"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      Actions
                    </button>
                  </div>

                  {/* Date Dropdown - Right Side */}
                  <div className="flex items-center justify-end relative">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <button
                        onClick={() => setShowDatePicker(!showDatePicker)}
                        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-sm font-medium">
                          Last 30 days: 2 Aug 2025 - 31 Aug 2025
                        </span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Date Range Picker */}
                    <DateRangePicker
                      isOpen={showDatePicker}
                      onClose={() => setShowDatePicker(false)}
                      onDateRangeChange={(dateRange) => {
                        console.log("Date range changed:", dateRange);
                        // Handle date range change here
                      }}
                      position="bottom-right"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto  pb-3">
              {isExpanded ? (
                <>
                  {sidebarTab === "chart" && (
                    <div className="space-y-6">
                      {/* Chart Content - Tabs are now in header */}
                      <div className="border-gray-200 rounded-lg p-6">
                        {currentTab === "performance" && (
                          <div className="space-y-6">
                            <PerformanceOverview />
                            <DemographicsPlatform />
                          </div>
                        )}
                        {currentTab === "actions" && <ActionsTab />}
                      </div>
                    </div>
                  )}

                  {sidebarTab === "edit" && <EditTab />}

                  {sidebarTab === "activity" && (
                        <div className="space-y-4">
                      {/* Header with Back Button */}
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setSidebarTab("chart")}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <h3 className="text-lg font-semibold text-gray-900">Performance overview</h3>
                            </div>

                      {/* Filters */}
                      <div ref={dropdownRef} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
                        {/* Activity History Dropdown */}
                        <div className="relative">
                          <button 
                            onClick={() => {
                              setShowActivityDropdown(!showActivityDropdown);
                              setShowChangedByDropdown(false);
                            }}
                            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
                          >
                            <span>Activity history: {selectedActivityFilter}</span>
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          
                          {showActivityDropdown && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                              <div className="py-1">
                                {["All", "Account", "Ads", "Ad Sets", "Audience", "Bid", "Budget", "Campaigns", "Schedule", "Run Status", "Targeting"].map((option) => (
                                  <button
                                    key={option}
                                    onClick={() => {
                                      setSelectedActivityFilter(option);
                                      setShowActivityDropdown(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                                      selectedActivityFilter === option ? "bg-blue-50 text-blue-600" : "text-gray-700"
                                    }`}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          </div>

                        {/* Changed By Dropdown */}
                        <div className="relative">
                          <button 
                            onClick={() => {
                              setShowChangedByDropdown(!showChangedByDropdown);
                              setShowActivityDropdown(false);
                            }}
                            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
                          >
                            <span>Changed by: {selectedChangedByFilter}</span>
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          
                          {showChangedByDropdown && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                              <div className="py-1">
                                {["Anyone", "Meta", "Rules and settings", "Hassan Abbas", "Mohsin Rza", "Muhammad Bilal"].map((option) => (
                                  <button
                                    key={option}
                                    onClick={() => {
                                      setSelectedChangedByFilter(option);
                                      setShowChangedByDropdown(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                                      selectedChangedByFilter === option ? "bg-blue-50 text-blue-600" : "text-gray-700"
                                    }`}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                            </div>
                          </div>

                      {/* Activity History Table */}
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[800px]">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Activity</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Activity details</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Item changed</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Changed by</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Date and Time</th>
                            </tr>
                          </thead>
                                                    <tbody className="divide-y divide-gray-200">
                            {filteredData.map((item, index) => (
                              <tr key={item.id} className={`${index % 2 === 0 ? 'bg-gray-50 hover:bg-gray-100' : 'bg-white hover:bg-gray-50'}`}>
                                <td className="px-4 py-3 text-sm text-gray-900">{item.activity}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{item.details}</td>
                                <td className="px-4 py-3">
                                  <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                                    {item.item}
                            </div>
                                  <div className="text-xs text-gray-500">{item.itemId}</div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-900">{item.changedBy}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{item.date}</td>
                              </tr>
                            ))}
                          </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-4">
                    {sidebarTab === "chart" && (
                    <div className="space-y-6">
                      {/* Chart Content - Tabs are now in header */}
                      <div className="border-gray-200 rounded-lg p-6">
                        {currentTab === "performance" && (
                          <div className="space-y-6">
                            <PerformanceOverview />
                            <DemographicsPlatform />
                          </div>
                        )}
                        {currentTab === "actions" && <ActionsTab />}
                      </div>
                    </div>
                  )}
                  
                                      {sidebarTab === "edit" && <EditTab />}
                  
                    {sidebarTab === "activity" && (
                    <div className="space-y-4">
                     
                      <div className="space-y-4">
                        {/* Activity History Header */}
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setSidebarTab("chart")}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                          </button>
                          <h3 className="text-lg font-semibold text-gray-900">Performance overview</h3>
                        </div>

                        {/* Filters */}
                        <div ref={dropdownRef} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
                          {/* Activity History Dropdown */}
                          <div className="relative">
                            <button 
                              onClick={() => {
                                setShowActivityDropdown(!showActivityDropdown);
                                setShowChangedByDropdown(false);
                              }}
                              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
                            >
                              <span>Activity history: {selectedActivityFilter}</span>
                              <ChevronDown className="w-4 h-4" />
                            </button>
                            
                            {showActivityDropdown && (
                              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                <div className="py-1">
                                  {["All", "Account", "Ads", "Ad Sets", "Audience", "Bid", "Budget", "Campaigns", "Schedule", "Run Status", "Targeting"].map((option) => (
                                    <button
                                      key={option}
                                      onClick={() => {
                                        setSelectedActivityFilter(option);
                                        setShowActivityDropdown(false);
                                      }}
                                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                                        selectedActivityFilter === option ? "bg-blue-50 text-blue-600" : "text-gray-700"
                                      }`}
                                    >
                                      {option}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Changed By Dropdown */}
                          <div className="relative">
                            <button 
                              onClick={() => {
                                setShowChangedByDropdown(!showChangedByDropdown);
                                setShowActivityDropdown(false);
                              }}
                              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
                            >
                              <span>Changed by: {selectedChangedByFilter}</span>
                              <ChevronDown className="w-4 h-4" />
                            </button>
                            
                            {showChangedByDropdown && (
                              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                <div className="py-1">
                                  {["Anyone", "Meta", "Rules and settings", "Hassan Abbas", "Mohsin Rza", "Muhammad Bilal"].map((option) => (
                                    <button
                                      key={option}
                                      onClick={() => {
                                        setSelectedChangedByFilter(option);
                                        setShowChangedByDropdown(false);
                                      }}
                                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                                        selectedChangedByFilter === option ? "bg-blue-50 text-blue-600" : "text-gray-700"
                                      }`}
                                    >
                                      {option}
                                    </button>
                                  ))}
                                </div>
                              </div>
                    )}
                  </div>
                        </div>

                        {/* Activity History Table */}
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px]">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Activity</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Activity details</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Item changed</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Changed by</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Date and Time</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {filteredData.map((item, index) => (
                                <tr key={item.id} className={`${index % 2 === 0 ? 'bg-gray-50 hover:bg-gray-100' : 'bg-white hover:bg-gray-50'}`}>
                                  <td className="px-4 py-3 text-sm text-gray-900">{item.activity}</td>
                                  <td className="px-4 py-3 text-sm text-gray-600">{item.details}</td>
                                  <td className="px-4 py-3">
                                    <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                                      {item.item}
                                    </div>
                                    <div className="text-xs text-gray-500">{item.itemId}</div>
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-900">{item.changedBy}</td>
                                  <td className="px-4 py-3 text-sm text-gray-600">{item.date}</td>
                                </tr>
                              ))}
                            </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
