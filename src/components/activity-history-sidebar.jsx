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

export function ActivityHistorySidebar({ isOpen, onClose }) {
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

  const filteredData = mockActivityData.filter((item) => {
    if (activityFilter !== "all") {
      // Simple filtering logic - you can expand this
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

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0  bg-opacity-25 z-40" onClick={onClose}>
      <div
        className={cn(
          "absolute top-0 right-0 bottom-0 bg-white text-gray-900 flex transition-all duration-300 ease-in-out z-50",
          isOpen ? "w-[1200px]" : "w-11"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-11 bg-slate-800 flex flex-col items-center py-2 px-1">
          <button
            onClick={onClose}
            className="px-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors mb-4 bg-slate-600 p-2"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="p-2 text-slate-300 bg-slate-600 rounded-lg">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <div className="bg-slate-800">
            <h2 className="font-semibold  text-lg text-white flex items-end text-end py-2 px-1 ">
              Activity history for Account: Adkin Digital
            </h2>
          </div>
          <div className="px-6 py-4  border-b border-gray-200">
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

          {showDatePicker && (
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
                            <option value="Jul">Jul</option>
                            <option value="Aug">Aug</option>
                          </select>
                          <select
                            value={currentYear}
                            onChange={(e) => setCurrentYear(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                          >
                            <option value="2025">2025</option>
                          </select>
                        </div>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-xs mb-2">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                          (day) => (
                            <div
                              key={day}
                              className="text-center text-gray-500 p-2 font-medium"
                            >
                              {day}
                            </div>
                          )
                        )}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 31 }, (_, i) => (
                          <button
                            key={i}
                            className={cn(
                              "text-center p-2 text-sm rounded hover:bg-blue-50 transition-colors",
                              i + 1 >= 20 && i + 1 <= 31
                                ? "bg-blue-100 text-blue-700"
                                : "",
                              i + 1 === 20 ? "bg-blue-600 text-white" : ""
                            )}
                          >
                            {i + 1}
                          </button>
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
                            <option value="Aug">Aug</option>
                            <option value="Sep">Sep</option>
                          </select>
                          <select
                            value={currentYear2}
                            onChange={(e) => setCurrentYear2(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                          >
                            <option value="2025">2025</option>
                          </select>
                        </div>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-xs mb-2">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                          (day) => (
                            <div
                              key={day}
                              className="text-center text-gray-500 p-2 font-medium"
                            >
                              {day}
                            </div>
                          )
                        )}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 31 }, (_, i) => (
                          <button
                            key={i}
                            className={cn(
                              "text-center p-2 text-sm rounded hover:bg-blue-50 transition-colors",
                              i + 1 <= 18 ? "bg-blue-100 text-blue-700" : "",
                              i + 1 === 18 ? "bg-blue-600 text-white" : ""
                            )}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Compare and date inputs */}
                  <div className="mt-6 space-y-4">
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={showCompare}
                        onCheckedChange={setShowCompare}
                      />
                      <span className="text-sm">Compare</span>
                    </label>

                    <div className="flex items-center gap-2">
                      <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                        <option>Last 30 days</option>
                      </select>
                      <Input placeholder="20 July 2025" className="flex-1" />
                      <span>-</span>
                      <Input placeholder="18 August 2025" className="flex-1" />
                    </div>

                    <div className="text-xs text-gray-500">
                      Dates are shown in Karachi Time
                    </div>

                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setShowDatePicker(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleDateRangeUpdate}>Update</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                  onClick={() =>
                    setShowChangedByDropdown(!showChangedByDropdown)
                  }
                  className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors bg-white"
                >
                  <span className="text-sm">
                    Changed by:{" "}
                    {
                      changedByOptions.find(
                        (opt) => opt.value === changedByFilter
                      )?.label
                    }
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showChangedByDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48">
                    {changedByOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          handleChangedByFilterSelect(option.value)
                        }
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
              {/* Table Headers */}
              <div className="grid grid-cols-5 gap-6 text-sm font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                <div>Activity</div>
                <div>Activity details</div>
                <div>Item changed</div>
                <div>Changed by</div>
                <div>Date and Time</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-0">
                {filteredData.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 opacity-50">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Telescope base */}
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

                        {/* Telescope legs */}
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

                        {/* Telescope tube */}
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

                        {/* Eyepiece */}
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
                        • If you have multiple ad accounts, switch to a
                        different ad account
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
                        <div className="text-sm text-gray-900">
                          {item.activity}
                        </div>
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
                        <div className="text-sm text-gray-900">
                          {item.dateTime}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
