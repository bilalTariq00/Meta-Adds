"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, ChevronDown, Calendar, ArrowLeft } from "lucide-react";
import DateRangePicker from "../ui/DateRangePicker";

export default function FilterBanner({ 
  onFilterChange, 
  onDateRangeChange,
  selectedFilters = [],
  onRemoveFilter 
}) {
  const [showSearch, setShowSearch] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("This month: 1 Sep 2025 - 5 Sep 2025");
  const [currentDropdown, setCurrentDropdown] = useState(null);
  
  const searchRef = useRef(null);
  const datePickerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
        setCurrentDropdown(null);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onFilterChange(searchTerm.trim());
      setSearchTerm("");
    }
  };


  const handleFilterSelect = (filter) => {
    onFilterChange(filter);
    setCurrentDropdown(null);
    // Keep search dropdown open for more selections
  };


  const filterCategories = {
    "Had delivery": [], // Simple filter - no sub-options
    "Name/ID": [
      "Campaign name",
      "Ad Set Name", 
      "Ad Name",
      "Campaign ID",
      "Ad set ID",
      "Ad ID",
      "Page ID"
    ],
    "Delivery": [
      "Delivery",
      "Campaign delivery",
      "Ad set delivery", 
      "Ad delivery"
    ],
    "Objective": [], // Simple filter - no sub-options
    "Performance goal": [], // Simple filter - no sub-options
    "Buying type": [], // Simple filter - no sub-options
    "Metrics": [
      "Reach",
      "Impressions",
      "Frequency",
      "Amount spent",
      "Results",
      "Cost per result",
      "Description"
    ],
    "Creative": [
      "Description",
      "Headline (ad settings)",
      "Website URL",
      "Image name",
      "Video name",
      "URL parameters",
      "Call to action"
    ],
    "Audience": [
      "Included custom audiences"
    ],
    "Attribution setting": [] // Simple filter - no sub-options
  };

  const renderDropdown = () => {
    if (!currentDropdown) return null;

    const items = filterCategories[currentDropdown] || [];
    
    return (
      <>
        <div className="p-3  flex items-center">
          <button
            onClick={() => setCurrentDropdown(null)}
            className="mr-3 hover:bg-gray-100 rounded p-1"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h3 className="font-semibold text-gray-900">{currentDropdown}</h3>
        </div>
        <div className="p-3">
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => handleFilterSelect(item)}
              className="py-2 px-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 rounded"
            >
              {item}
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="px-2 py-1 mb-6 bg-gray-50 rounded-md">
      <div className="flex items-center gap-4">
        {/* Applied Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {selectedFilters.map((filter, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 bg-gray-200 border border-gray-300 px-3 py-1.5 rounded-lg text-sm"
            >
              {filter}
              <button
                onClick={() => onRemoveFilter(filter)}
                className="hover:bg-gray-300 rounded-full p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md" ref={searchRef}>
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search to filter by name, ID or metrics"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowSearch(true)}
                className="w-full pl-10 pr-4 py-1  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent "
              />
            </div>
          </form>

          {/* Search Dropdown */}
          {showSearch && !currentDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-3">
                <div className="font-semibold text-gray-900 mb-2">Filters</div>
                {Object.keys(filterCategories).map((category) => {
                  const hasSubOptions = filterCategories[category].length > 0;
                  return (
                    <div
                      key={category}
                      onClick={() => {
                        if (hasSubOptions) {
                          setCurrentDropdown(category);
                        } else {
                          // Direct filter selection for simple filters
                          handleFilterSelect(category);
                        }
                      }}
                      className="py-2 px-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 rounded flex items-center justify-between border-b border-gray-100 last:border-b-0"
                    >
                      <span>{category}</span>
                      {hasSubOptions && <ChevronDown className="w-4 h-4 rotate-[-90deg]" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Nested Dropdown - Shows in place of main dropdown */}
          {currentDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {renderDropdown()}
            </div>
          )}
        </div>

        {/* Spacer to push clear button and date picker to the end */}
        <div className="flex-1"></div>

        {/* Clear Button - Before date picker */}
        {selectedFilters.length > 0 && (
          <button
            onClick={() => selectedFilters.forEach(filter => onRemoveFilter(filter))}
            className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1 rounded hover:bg-gray-100"
          >
            Clear
          </button>
        )}

        {/* Date Range Picker - At the end */}
        <div className="relative" ref={datePickerRef}>
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white"
          >
            <Calendar size={16} className="text-gray-600" />
            <span className="text-sm text-gray-700">{dateRange}</span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          <DateRangePicker
            isOpen={showDatePicker}
            onClose={() => setShowDatePicker(false)}
            onDateRangeChange={(dateData) => {
              const { range, startDate, endDate } = dateData;
              const newDateRange = `${range}: ${startDate} - ${endDate}`;
              setDateRange(newDateRange);
              if (onDateRangeChange) {
                onDateRangeChange(newDateRange);
              }
            }}
            initialDateRange="last30days"
            initialStartDate="2 Aug 2025"
            initialEndDate="31 Aug 2025"
            position="bottom-right"
          />
        </div>
      </div>
    </div>
  );
}
