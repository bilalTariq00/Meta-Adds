"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";

export default function DateRangePicker({ 
  isOpen, 
  onClose, 
  onDateRangeChange,
  initialDateRange = "last30days",
  initialStartDate = "2 Aug 2025",
  initialEndDate = "31 Aug 2025",
  position = "bottom-right" // bottom-right, bottom-left, top-right, top-left
}) {
  const [selectedDateRange, setSelectedDateRange] = useState(initialDateRange);
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [currentMonth1, setCurrentMonth1] = useState("Aug");
  const [currentYear1, setCurrentYear1] = useState("2025");
  const [currentMonth2, setCurrentMonth2] = useState("Sep");
  const [currentYear2, setCurrentYear2] = useState("2025");
  
  const pickerRef = useRef(null);

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

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleDateRangeSelect = (value) => {
    setSelectedDateRange(value);
  };

  const handleUpdate = () => {
    onDateRangeChange({
      range: selectedDateRange,
      startDate,
      endDate,
      compare: compareEnabled
    });
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  // Position classes
  const getPositionClasses = () => {
    switch (position) {
      case "bottom-left":
        return "top-full left-0 mt-1";
      case "top-right":
        return "bottom-full right-0 mb-1";
      case "top-left":
        return "bottom-full left-0 mb-1";
      default: // bottom-right
        return "top-full right-0 mt-1";
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={pickerRef}
      className={`absolute ${getPositionClasses()} bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-[600px]`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium">Last 30 days: 2 Aug 2025 - 31 Aug 2025</span>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </div>
        <button
          onClick={handleCancel}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      <div className="flex gap-4 p-4">
        {/* Left side - preset options */}
        <div className="w-40 space-y-1">
          {dateRangeOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded text-sm"
            >
              <input
                type="radio"
                name="dateRange"
                value={option.value}
                checked={selectedDateRange === option.value}
                onChange={() => handleDateRangeSelect(option.value)}
                className="w-3 h-3 text-blue-600"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>

        {/* Right side - calendar */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4">
            {/* August Calendar */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <div className="flex items-center gap-1">
                  <select className="border border-gray-300 rounded px-1 py-1 text-xs">
                    <option value="Aug">Aug</option>
                  </select>
                  <select className="border border-gray-300 rounded px-1 py-1 text-xs">
                    <option value="2025">2025</option>
                  </select>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Calendar grid for August */}
              <div className="grid grid-cols-7 gap-0.5 text-xs">
                <div className="text-center p-1 text-gray-500 font-medium">S</div>
                <div className="text-center p-1 text-gray-500 font-medium">M</div>
                <div className="text-center p-1 text-gray-500 font-medium">T</div>
                <div className="text-center p-1 text-gray-500 font-medium">W</div>
                <div className="text-center p-1 text-gray-500 font-medium">T</div>
                <div className="text-center p-1 text-gray-500 font-medium">F</div>
                <div className="text-center p-1 text-gray-500 font-medium">S</div>

                {/* Calendar days - August 2025 */}
                {[...Array(5)].map((_, i) => (
                  <div key={`empty-aug-${i}`} className="text-center p-1"></div>
                ))}
                <div className="text-center p-1 hover:bg-blue-100 cursor-pointer rounded">1</div>

                {/* Aug 2-31 with highlighting */}
                {[...Array(30)].map((_, i) => {
                  const day = i + 2;
                  const isInRange = day >= 2 && day <= 31;
                  const isStart = day === 2;
                  const isEnd = day === 31;
                  
                  return (
                    <div
                      key={day}
                      className={`text-center p-1 hover:bg-blue-100 cursor-pointer rounded ${
                        isStart || isEnd ? 'bg-blue-600 text-white' :
                        isInRange ? 'bg-blue-100' : ''
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* September Calendar */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <div className="flex items-center gap-1">
                  <select className="border border-gray-300 rounded px-1 py-1 text-xs">
                    <option value="Sep">Sep</option>
                  </select>
                  <select className="border border-gray-300 rounded px-1 py-1 text-xs">
                    <option value="2025">2025</option>
                  </select>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Calendar grid for September */}
              <div className="grid grid-cols-7 gap-0.5 text-xs">
                <div className="text-center p-1 text-gray-500 font-medium">S</div>
                <div className="text-center p-1 text-gray-500 font-medium">M</div>
                <div className="text-center p-1 text-gray-500 font-medium">T</div>
                <div className="text-center p-1 text-gray-500 font-medium">W</div>
                <div className="text-center p-1 text-gray-500 font-medium">T</div>
                <div className="text-center p-1 text-gray-500 font-medium">F</div>
                <div className="text-center p-1 text-gray-500 font-medium">S</div>

                {/* Calendar days - September 2025 */}
                {[...Array(5)].map((_, i) => (
                  <div key={`empty-sep-${i}`} className="text-center p-1"></div>
                ))}
                <div className="text-center p-1 hover:bg-blue-100 cursor-pointer rounded">1</div>

                {[...Array(29)].map((_, i) => {
                  const day = i + 2;
                  return (
                    <div
                      key={day}
                      className="text-center p-1 hover:bg-blue-100 cursor-pointer rounded"
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                id="compare"
                checked={compareEnabled}
                onChange={(e) => setCompareEnabled(e.target.checked)}
                className="w-3 h-3 text-blue-600"
              />
              <label htmlFor="compare" className="text-xs">Compare</label>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                <option value="last30days">Last 30 days</option>
              </select>
              <input
                type="text"
                value="2 August 20..."
                className="border border-gray-300 rounded px-2 py-1 text-xs w-24"
                readOnly
              />
              <input
                type="text"
                value="31 August 2..."
                className="border border-gray-300 rounded px-2 py-1 text-xs w-24"
                readOnly
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="px-3 py-1 text-xs text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Update
              </button>
            </div>

            <div className="mt-2 text-xs text-gray-500">
              Dates are shown in Karachi Time
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
