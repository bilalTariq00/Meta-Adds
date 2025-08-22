"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  ArrowLeft,
  ChevronDown,
  Clock,
  BarChart3,
  Edit3,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for activity history
const mockActivityData = [
  {
    id: 1,
    activity: "Account billed",
    activityDetails: "$0.09",
    itemChanged: "Adkin Digital",
    itemChangedSub: "Account ID: 1263790274765251",
    changedBy: "Meta",
    dateTime: "17 Aug at 06:05",
  },
  {
    id: 2,
    activity: "Account billed",
    activityDetails: "$3.94",
    itemChanged: "Adkin Digital",
    itemChangedSub: "Account ID: 1263790274765251",
    changedBy: "Meta",
    dateTime: "16 Aug at 23:13",
  },
  {
    id: 3,
    activity: "Money added to balance",
    activityDetails: "Paid: $20.00",
    activityDetailsSub: "Added: $20.00",
    itemChanged: "Available balance",
    itemChangedSub: "Account ID: 1263790274765251",
    changedBy: "Meta",
    dateTime: "16 Aug at 23:13",
  },
  {
    id: 4,
    activity: "Account billed",
    activityDetails: "$0.56",
    itemChanged: "Adkin Digital",
    itemChangedSub: "Account ID: 1263790274765251",
    changedBy: "Meta",
    dateTime: "15 Aug at 06:13",
  },
  {
    id: 5,
    activity: "Ad status updated",
    activityDetails: "From Pending Review to Active",
    itemChanged: "DYT Home Improvement",
    itemChangedSub: "Ad ID: 120232146845320228",
    changedBy: "Meta",
    dateTime: "14 Aug at 19:11",
  },
  {
    id: 6,
    activity: "Ad status updated",
    activityDetails: "From Pending process to Pending Review",
    itemChanged: "DYT Home Improvement",
    itemChangedSub: "Ad ID: 120232146845320228",
    changedBy: "Hassan Abbas",
    dateTime: "14 Aug at 18:59",
  },
  {
    id: 7,
    activity: "Updated status of ad after it finishes ad review",
    activityDetails: "From Inactive to Active",
    itemChanged: "DYT Home Improvement",
    itemChangedSub: "Ad ID: 120232146845320228",
    changedBy: "Hassan Abbas",
    dateTime: "14 Aug at 18:59",
  },
];

// Mock chart data
const mockChartData = [
  { date: "14 Aug", amount: 0.56, clicks: 23, impressions: 450 },
  { date: "15 Aug", amount: 0.94, clicks: 45, impressions: 678 },
  { date: "16 Aug", amount: 3.94, clicks: 89, impressions: 1234 },
  { date: "17 Aug", amount: 0.09, clicks: 12, impressions: 234 },
];

// Mock editable items
const mockEditableItems = [
  {
    id: 1,
    type: "Campaign",
    name: "DYT Home Improvement Campaign",
    status: "Active",
    budget: "$50.00",
    bidStrategy: "Lowest cost",
  },
  {
    id: 2,
    type: "Ad Set",
    name: "Home Improvement Targeting",
    status: "Active",
    budget: "$25.00",
    audience: "Homeowners 25-55",
  },
  {
    id: 3,
    type: "Ad",
    name: "DYT Home Improvement",
    status: "Active",
    format: "Single image",
    placement: "Facebook Feed",
  },
];

const activityHistoryOptions = [
  { value: "all", label: "All" },
  { value: "account", label: "Account" },
  { value: "ads", label: "Ads" },
  { value: "adsets", label: "Ad Sets" },
  { value: "audience", label: "Audience" },
  { value: "bid", label: "Bid" },
  { value: "budget", label: "Budget" },
  { value: "campaigns", label: "Campaigns" },
  { value: "schedule", label: "Schedule" },
  { value: "runstatus", label: "Run Status" },
  { value: "targeting", label: "Targeting" },
];

const changedByOptions = [
  { value: "anyone", label: "Anyone" },
  { value: "meta", label: "Meta" },
  { value: "rules", label: "Rules and settings" },
  { value: "hassan", label: "Hassan Abbas" },
  { value: "mohsin", label: "Mohsin Rza" },
  { value: "muhammad", label: "Muhammad Bilal" },
];

const dateRangeOptions = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "todayAndYesterday", label: "Today and yesterday" },
  { value: "last7days", label: "Last 7 days" },
  { value: "last14days", label: "Last 14 days" },
  { value: "last28days", label: "Last 28 days" },
  { value: "last30days", label: "Last 30 days" },
  { value: "thisweek", label: "This week" },
  { value: "thismonth", label: "This month" },
  { value: "lastmonth", label: "Last month" },
  { value: "maximum", label: "Maximum" },
  { value: "custom", label: "Custom" },
];

export function ActivityHistorySidebar({
  isOpen,
  onClose,
  initialTab = "activity",
  showAllTabs = false,
}) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'activity', 'chart', 'edit'
  const [dateRange, setDateRange] = useState("last30days");
  const [activityFilter, setActivityFilter] = useState("all");
  const [changedByFilter, setChangedByFilter] = useState("anyone");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showActivityDropdown, setShowActivityDropdown] = useState(false);
  const [showChangedByDropdown, setShowChangedByDropdown] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("Jul");
  const [currentYear, setCurrentYear] = useState("2025");
  const [currentMonth2, setCurrentMonth2] = useState("Aug");
  const [currentYear2, setCurrentYear2] = useState("2025");
  // Update active tab when initialTab prop changes
  useState(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const filteredData = mockActivityData.filter((item) => {
    if (activityFilter !== "all") {
      if (
        activityFilter === "account" &&
        !item.activity.toLowerCase().includes("account")
      )
        return false;
      if (
        activityFilter === "ads" &&
        !item.activity.toLowerCase().includes("ad")
      )
        return false;
    }
    if (changedByFilter !== "anyone") {
      if (changedByFilter === "meta" && item.changedBy !== "Meta") return false;
      if (changedByFilter === "hassan" && item.changedBy !== "Hassan Abbas")
        return false;
    }
    return true;
  });

  const handleDateRangeUpdate = () => {
    setShowDatePicker(false);
  };

  const handleActivityFilterSelect = (value) => {
    setActivityFilter(value);
    setShowActivityDropdown(false);
  };

  const handleChangedByFilterSelect = (value) => {
    setChangedByFilter(value);
    setShowChangedByDropdown(false);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case "activity":
        return "Activity history for Account: Adkin Digital";
      case "chart":
        return "Performance Charts for Account: Adkin Digital";
      case "edit":
        return "Edit Items for Account: Adkin Digital";
      default:
        return "Activity history for Account: Adkin Digital";
    }
  };

  const renderActivityTab = () => (
    <>
      {/* Date picker and filters section */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ArrowLeft className="w-4 h-4" />
            <span>Performance overview</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium">
                Last 30 days: 20 Jul 2025 - 18 Aug 2025
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex gap-4">
          {/* Activity History Filter */}
          <div className="relative">
            <button
              onClick={() => setShowActivityDropdown(!showActivityDropdown)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors bg-white"
            >
              <span className="text-sm">
                Activity history:{" "}
                {
                  activityHistoryOptions.find(
                    (opt) => opt.value === activityFilter
                  )?.label
                }
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showActivityDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48">
                {activityHistoryOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleActivityFilterSelect(option.value)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Changed By Filter */}
          <div className="relative">
            <button
              onClick={() => setShowChangedByDropdown(!showChangedByDropdown)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors bg-white"
            >
              <span className="text-sm">
                Changed by:{" "}
                {
                  changedByOptions.find((opt) => opt.value === changedByFilter)
                    ?.label
                }
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showChangedByDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48">
                {changedByOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleChangedByFilterSelect(option.value)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Activity Table */}
      <div className="flex-1 overflow-auto bg-white">
        <div className="px-6 py-4">
          <div className="grid grid-cols-5 gap-6 text-sm font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
            <div>Activity</div>
            <div>Activity details</div>
            <div>Item changed</div>
            <div>Changed by</div>
            <div>Date and Time</div>
          </div>

          <div className="space-y-0">
            {filteredData.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 opacity-50">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect
                      x="35"
                      y="75"
                      width="30"
                      height="8"
                      fill="#9ca3af"
                      rx="2"
                    />
                    <rect
                      x="40"
                      y="70"
                      width="20"
                      height="8"
                      fill="#6b7280"
                      rx="1"
                    />
                    <line
                      x1="45"
                      y1="70"
                      x2="35"
                      y2="85"
                      stroke="#6b7280"
                      strokeWidth="2"
                    />
                    <line
                      x1="50"
                      y1="70"
                      x2="50"
                      y2="85"
                      stroke="#6b7280"
                      strokeWidth="2"
                    />
                    <line
                      x1="55"
                      y1="70"
                      x2="65"
                      y2="85"
                      stroke="#6b7280"
                      strokeWidth="2"
                    />
                    <rect
                      x="25"
                      y="35"
                      width="50"
                      height="8"
                      fill="#d1d5db"
                      rx="4"
                      transform="rotate(-15 50 39)"
                    />
                    <rect
                      x="20"
                      y="32"
                      width="25"
                      height="6"
                      fill="#e5e7eb"
                      rx="3"
                      transform="rotate(-15 32.5 35)"
                    />
                    <circle cx="70" cy="25" r="4" fill="#374151" />
                    <circle cx="70" cy="25" r="2" fill="#1f2937" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try one of these suggestions:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    • If you have multiple ad accounts, switch to a different ad
                    account
                  </li>
                  <li>• Search with fewer filters</li>
                  <li>
                    •{" "}
                    <button className="text-blue-600 hover:underline">
                      Clear filters
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              filteredData.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-5 gap-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                >
                  <div>
                    <div className="text-sm text-gray-900">{item.activity}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-900">
                      {item.activityDetails}
                    </div>
                    {item.activityDetailsSub && (
                      <div className="text-sm text-gray-600">
                        {item.activityDetailsSub}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                      {item.itemChanged}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.itemChangedSub}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-900">
                      {item.changedBy}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-900">{item.dateTime}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );

  const renderChartTab = () => (
    <div className="flex-1 overflow-auto bg-white">
      <div className="px-6 py-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance Overview
          </h3>

          {/* Chart metrics cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Total Spend</div>
              <div className="text-2xl font-bold text-blue-600">$5.53</div>
              <div className="text-sm text-green-600">
                +12.3% vs last period
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Total Clicks</div>
              <div className="text-2xl font-bold text-green-600">169</div>
              <div className="text-sm text-green-600">+8.7% vs last period</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">
                Total Impressions
              </div>
              <div className="text-2xl font-bold text-purple-600">2,596</div>
              <div className="text-sm text-red-600">-2.1% vs last period</div>
            </div>
          </div>

          {/* Simple bar chart visualization */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-md font-medium text-gray-900 mb-4">
              Daily Spend
            </h4>
            <div className="flex items-end gap-4 h-48">
              {mockChartData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="bg-blue-500 w-full rounded-t"
                    style={{
                      height: `${
                        (data.amount /
                          Math.max(...mockChartData.map((d) => d.amount))) *
                        100
                      }%`,
                      minHeight: "8px",
                    }}
                  ></div>
                  <div className="text-xs text-gray-600 mt-2">{data.date}</div>
                  <div className="text-xs font-medium text-gray-900">
                    ${data.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart data table */}
          <div className="mt-6">
            <h4 className="text-md font-medium text-gray-900 mb-4">
              Performance Data
            </h4>
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                      Clicks
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                      Impressions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockChartData.map((row, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {row.date}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        ${row.amount}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {row.clicks}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {row.impressions}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEditTab = () => (
    <div className="flex-1 overflow-auto bg-white">
      <div className="px-6 py-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Edit Campaign Items
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Modify your campaigns, ad sets, and ads from this central location.
          </p>

          {/* Edit items */}
          <div className="space-y-6">
            {mockEditableItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                        {item.type}
                      </span>
                      <span
                        className={cn(
                          "px-2 py-1 text-xs font-medium rounded",
                          item.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        )}
                      >
                        {item.status}
                      </span>
                    </div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {item.name}
                    </h4>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {item.budget && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Budget
                      </label>
                      <Input defaultValue={item.budget} className="w-full" />
                    </div>
                  )}

                  {item.bidStrategy && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bid Strategy
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="lowest-cost">Lowest cost</option>
                        <option value="cost-cap">Cost cap</option>
                        <option value="bid-cap">Bid cap</option>
                      </select>
                    </div>
                  )}

                  {item.audience && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Audience
                      </label>
                      <Input defaultValue={item.audience} className="w-full" />
                    </div>
                  )}

                  {item.format && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ad Format
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="single-image">Single image</option>
                        <option value="carousel">Carousel</option>
                        <option value="video">Video</option>
                      </select>
                    </div>
                  )}

                  {item.placement && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Placement
                      </label>
                      <Input defaultValue={item.placement} className="w-full" />
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Save Changes
                  </Button>
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button className="bg-green-600 hover:bg-green-700">
              <span className="mr-2">+</span>
              Create New Item
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-opacity-25 z-40" onClick={onClose}>
      <div
        className={cn(
          "absolute top-0 right-0 bottom-0 bg-white text-gray-900 flex transition-all duration-300 ease-in-out z-50",
          isOpen ? "w-[1200px]" : "w-11"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar Navigation */}
        <div className="w-11 bg-slate-800 flex flex-col items-center py-2 px-1">
          <button
            onClick={onClose}
            className="px-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors mb-4 bg-slate-600 p-2"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Tab Navigation */}
          <div className="space-y-2">
            {showAllTabs && (
              <>
                <button
                  onClick={() => setActiveTab("chart")}
                  className={cn(
                    "p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors",
                    activeTab === "chart" ? "bg-slate-600 text-white" : ""
                  )}
                >
                  <BarChart3 className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setActiveTab("edit")}
                  className={cn(
                    "p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors",
                    activeTab === "edit" ? "bg-slate-600 text-white" : ""
                  )}
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              </>
            )}
            <button
              onClick={() => setActiveTab("activity")}
              className={cn(
                "p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors",
                activeTab === "activity" ? "bg-slate-600 text-white" : ""
              )}
            >
              <Clock className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <div className="bg-slate-800">
            <h2 className="font-semibold text-lg text-white flex items-end text-end py-2 px-1">
              {getTabTitle()}
            </h2>
          </div>

          {/* Tab Content */}
          {activeTab === "chart" && renderChartTab()}
          {activeTab === "edit" && renderEditTab()}
          {activeTab === "activity" && renderActivityTab()}
        </div>
      </div>

      {/* Date Picker Modal - Only show for activity tab */}
      {showDatePicker && activeTab === "activity" && (
        <div className="absolute top-24 right-6 bg-white border border-gray-200 rounded-lg shadow-lg z-60 p-6 w-[800px]">
          <div className="flex gap-6">
            {/* Left side - preset options */}
            <div className="w-48 space-y-2">
              {dateRangeOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="radio"
                    name="dateRange"
                    value={option.value}
                    checked={dateRange === option.value}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>

            {/* Right side - calendar */}
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-6">
                {/* July Calendar */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2">
                      <select
                        value={currentMonth}
                        onChange={(e) => setCurrentMonth(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                      >
                        <option value="Jan">Jan</option>
                        <option value="Feb">Feb</option>
                        <option value="Mar">Mar</option>
                        <option value="Apr">Apr</option>
                        <option value="May">May</option>
                        <option value="Jun">Jun</option>
                        <option value="Jul">Jul</option>
                        <option value="Aug">Aug</option>
                        <option value="Sep">Sep</option>
                        <option value="Oct">Oct</option>
                        <option value="Nov">Nov</option>
                        <option value="Dec">Dec</option>
                      </select>
                      <select
                        value={currentYear}
                        onChange={(e) => setCurrentYear(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                      >
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                      </select>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Calendar grid for July */}
                  <div className="grid grid-cols-7 gap-1 text-sm">
                    <div className="text-center p-2 text-gray-500 font-medium">
                      S
                    </div>
                    <div className="text-center p-2 text-gray-500 font-medium">
                      M
                    </div>
                    <div className="text-center p-2 text-gray-500 font-medium">
                      T
                    </div>
                    <div className="text-center p-2 text-gray-500 font-medium">
                      W
                    </div>
                    <div className="text-center p-2 text-gray-500 font-medium">
                      T
                    </div>
                    <div className="text-center p-2 text-gray-500 font-medium">
                      F
                    </div>
                    <div className="text-center p-2 text-gray-500 font-medium">
                      S
                    </div>

                    {/* Calendar days - simplified for July 2025 */}
                    {[...Array(6)].map((_, i) => (
                      <div key={`empty-${i}`} className="text-center p-2"></div>
                    ))}
                    <div className="text-center p-2 hover:bg-blue-100 cursor-pointer rounded">
                      1
                    </div>

                    {[...Array(30)].map((_, i) => (
                      <div
                        key={i + 2}
                        className={cn(
                          "text-center p-2 hover:bg-blue-100 cursor-pointer rounded",
                          i + 2 === 20 ? "bg-blue-600 text-white" : ""
                        )}
                      >
                        {i + 2}
                      </div>
                    ))}
                  </div>
                </div>

                {/* August Calendar */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2">
                      <select
                        value={currentMonth2}
                        onChange={(e) => setCurrentMonth2(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                      >
                        <option value="Jan">Jan</option>
                        <option value="Feb">Feb</option>
                        <option value="Mar">Mar</option>
                        <option value="Apr">Apr</option>
                        <option value="May">May</option>
                        <option value="Jun">Jun</option>
                        <option value="Jul">Jul</option>
                        <option value="Aug">Aug</option>
                        <option value="Sep">Sep</option>
                        <option value="Oct">Oct</option>
                        <option value="Nov">Nov</option>
                        <option value="Dec">Dec</option>
                      </select>
                      <select
                        value={currentYear2}
                        onChange={(e) => setCurrentYear2(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                      >
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                      </select>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Calendar grid for August */}
                  <div className="grid grid-cols-7 gap-1 text-sm">
                    <div className="text-center p-2 text-gray-500 font-medium">
                      S
                    </div>
                    <div className="text-center p-2 text-gray-500 font-medium">
                      M
                    </div>
                    <div className="text-center p-2 text-gray-500 font-medium">
                      T
                    </div>
                    <div className="text-center p-2 text-gray-500 font-medium">
                      W
                    </div>
                    <div className="text-center p-2 text-gray-500 font-medium">
                      T
                    </div>
                    <div className="text-center p-2 text-gray-500 font-medium">
                      F
                    </div>
                    <div className="text-center p-2 text-gray-500 font-medium">
                      S
                    </div>

                    {/* Calendar days - simplified for August 2025 */}
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={`empty-aug-${i}`}
                        className="text-center p-2"
                      ></div>
                    ))}
                    <div className="text-center p-2 hover:bg-blue-100 cursor-pointer rounded">
                      1
                    </div>
                    <div className="text-center p-2 hover:bg-blue-100 cursor-pointer rounded">
                      2
                    </div>

                    {[...Array(16)].map((_, i) => (
                      <div
                        key={i + 3}
                        className="text-center p-2 hover:bg-blue-100 cursor-pointer rounded"
                      >
                        {i + 3}
                      </div>
                    ))}

                    <div className="text-center p-2 bg-blue-600 text-white rounded">
                      18
                    </div>

                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i + 19}
                        className="text-center p-2 hover:bg-blue-100 cursor-pointer rounded"
                      >
                        {i + 19}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Compare checkbox and buttons */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Checkbox
                    id="compare"
                    checked={showCompare}
                    onCheckedChange={setShowCompare}
                  />
                  <label htmlFor="compare" className="text-sm">
                    Compare
                  </label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowDatePicker(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDateRangeUpdate}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
