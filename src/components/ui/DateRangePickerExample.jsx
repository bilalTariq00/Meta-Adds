"use client";

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import DateRangePicker from "./DateRangePicker";

// Example usage of the reusable DateRangePicker component
export default function DateRangePickerExample() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState({
    range: "last30days",
    startDate: "2 Aug 2025",
    endDate: "31 Aug 2025",
    compare: false
  });

  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
    console.log('Date range changed:', dateRange);
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Date Range Picker Examples</h2>
      
      {/* Example 1: Bottom Right Position (Default) */}
      <div className="mb-8">
        <h3 className="text-md font-medium mb-2">Example 1: Bottom Right (Default)</h3>
        <div className="relative inline-block">
          <button 
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium">
              {selectedDateRange.range === "last30days" ? "Last 30 days" : selectedDateRange.range}: {selectedDateRange.startDate} - {selectedDateRange.endDate}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          <DateRangePicker
            isOpen={showDatePicker}
            onClose={() => setShowDatePicker(false)}
            onDateRangeChange={handleDateRangeChange}
            position="bottom-right"
          />
        </div>
      </div>

      {/* Example 2: Bottom Left Position */}
      <div className="mb-8">
        <h3 className="text-md font-medium mb-2">Example 2: Bottom Left</h3>
        <div className="relative inline-block">
          <button 
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium">Custom Date Range</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          <DateRangePicker
            isOpen={showDatePicker}
            onClose={() => setShowDatePicker(false)}
            onDateRangeChange={handleDateRangeChange}
            position="bottom-left"
            initialDateRange="custom"
            initialStartDate="1 Jan 2025"
            initialEndDate="31 Dec 2025"
          />
        </div>
      </div>

      {/* Example 3: Top Right Position */}
      <div className="mb-8">
        <h3 className="text-md font-medium mb-2">Example 3: Top Right</h3>
        <div className="relative inline-block">
          <button 
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium">Last 7 Days</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          <DateRangePicker
            isOpen={showDatePicker}
            onClose={() => setShowDatePicker(false)}
            onDateRangeChange={handleDateRangeChange}
            position="top-right"
            initialDateRange="last7days"
          />
        </div>
      </div>

      {/* Current Selection Display */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-md font-medium mb-2">Current Selection:</h3>
        <pre className="text-sm text-gray-700">
          {JSON.stringify(selectedDateRange, null, 2)}
        </pre>
      </div>
    </div>
  );
}
