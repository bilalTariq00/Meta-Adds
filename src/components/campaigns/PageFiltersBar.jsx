"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  SlidersHorizontal,
} from "lucide-react";
import QuickViewsDropdown from "./dropdowns/QuickViewsDropdown";
import MyViewsDropdown from "./dropdowns/MyViewsDropdown";
import SharedViewsDropdown from "./dropdowns/SharedViewsDropdown";

// Chip component for selected filters
function Chip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-2 bg-white border border-gray-300 px-3 py-1.5 rounded-full text-sm shadow-sm">
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:bg-gray-100 rounded-full p-0.5"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </span>
  );
}
// Filter modal data for different filter types
// Filter modal data with different types of UI structures
const filterModalData = {
  "Conversion location": {
    type: "multiSelect",
    options: [
      "Website",
      "App",
      "Website and app",
      "Website and shop",
      "Website and in-store",
      "Instant forms",
      "On your ad",
      "Messenger",
      "WhatsApp",
      "Instagram",
      "Calls",
      "Other",
    ],
  },
  Delivery: {
    type: "radio",
    options: [
      "Active",
      "Completed",
      "Not delivering",
      "Scheduled",
      "In review",
      "Disapproved",
      "Pending",
    ],
  },
  "Recently changed": {
    type: "dateRange",
    options: [
      "Today",
      "Yesterday",
      "Last 7 days",
      "Last 14 days",
      "Last 28 days",
      "This month",
      "This quarter",
      "Custom",
    ],
  },
  Objectives: {
    type: "multiSelect",
    options: [
      "Awareness",
      "Traffic",
      "Engagement",
      "Leads",
      "App promotion",
      "Sales",
    ],
  },
  "Performance goal": {
    type: "radio",
    options: [
      "Maximize number of conversions",
      "Maximize conversion value",
      "Maximize number of link clicks",
      "Maximize landing page views",
      "Maximize impressions",
      "Maximize reach",
    ],
  },
  Placement: {
    type: "multiSelect",
    options: [
      "Automatic placements",
      "Manual placements",
      "Facebook feeds",
      "Instagram feeds",
      "Facebook stories",
      "Instagram stories",
      "Facebook reels",
      "Instagram reels",
    ],
  },
  "Attribution setting": {
    type: "radio",
    options: [
      "7-day click or 1-day view",
      "1-day click",
      "7-day click",
      "1-day click or 1-day view",
      "28-day click or 1-day view",
    ],
  },
  "Special ad category": {
    type: "radio",
    options: [
      "None",
      "Credit",
      "Employment",
      "Housing",
      "Social issues, elections or politics",
    ],
  },
  "Test name": {
    type: "multiSelect",
    options: ["A/B test", "Conversion lift test", "Brand lift test"],
  },
  "Campaign setup": {
    type: "radio",
    options: ["Manual setup", "Automated setup", "Duplicated campaign"],
  },
};
// Mock data structure based on the images
const searchData = {
  recent: ["Impressions (campaign) > 0"],
  popular: [
    { label: "Campaign delivery", status: "active" },
    { label: "Objective ", status: "sales" },
    { label: "Campaign delivery", status: "deleted" },
    { label: "Reach (campaign) > 0", status: "default" },
    { label: "Result (campaign) > 0", status: "default" },
    { label: "Lifetime spent (campaign) > $0.00", status: "default" },
  ],
  categories: {
    Performance: [
      "Results",
      "Reach",
      "Frequency",
      "Impressions",
      "Views",
      "Amount spent",
    ],
    Engagement: [
      "Facebook likes",
      "Instagram follows",
      "Join group requests",
      "Post comments",
      "Post engagements",
      "Post reactions",
    ],
    Conversions: [
      "Achievements unlocked",
      "Cost per achievement unlocked",
      "Achievements unlocked conversion value",
      "Adds of payment info",
      "Cost per add of payment info",
      "Adds of payment info conversion value",
    ],
  },
  filters: [
    "Name/ID",
    "Catalogue",
    "Conversion location",
    "Delivery",
    "Objectives",
    "Performance goal",
    "Placement",
    "Audience",
    "Attribution setting",
    "Recently changed",
    "Special ad category",
    "Test name",
    "Campaign setup",
  ],
  nameId: [
    "Campaign name",
    "Ad set name",
    "Ad name",
    "Campaign ID",
    "Ad set ID",
    "Ad ID",
    "Page ID",
    "Product catalogue ID",
  ],
  audience: [
    "Audience age",
    "Audience delivery changes",
    "Audience gender",
    "Audience location",
  ],
};
// Filter Modal Component
// Enhanced Filter Modal Component
// Enhanced Filter Modal Component
function FilterModal({
  isOpen,
  type,
  selectedValues,
  position,
  condition,
  onClose,
  onApply,
  onCancel,
}) {
  const modalRef = useRef(null);
  const conditionDropdownRef = useRef(null);
  const optionsDropdownRef = useRef(null);

  const [tempSelected, setTempSelected] = useState(selectedValues);
  const [tempCondition, setTempCondition] = useState(condition || "is");
  const [selectAll, setSelectAll] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [selectedDateOption, setSelectedDateOption] = useState("");

  // New states for dropdown controls
  const [showConditionDropdown, setShowConditionDropdown] = useState(false);
  const [showOptionsDropdown, setShowOptionsDropdown] = useState(false);

  const filterConfig = filterModalData[type] || {
    type: "multiSelect",
    options: [],
  };
  const { type: modalType, options } = filterConfig;

  useEffect(() => {
    setTempSelected(selectedValues);
    setTempCondition(condition || "is");
    if (modalType === "multiSelect") {
      setSelectAll(
        selectedValues.length === options.length && options.length > 0
      );
    }
  }, [selectedValues, condition, options.length, modalType]);

  useEffect(() => {
    function handleClickOutside(event) {
      // Close condition dropdown
      if (
        conditionDropdownRef.current &&
        !conditionDropdownRef.current.contains(event.target)
      ) {
        setShowConditionDropdown(false);
      }
      // Close options dropdown
      if (
        optionsDropdownRef.current &&
        !optionsDropdownRef.current.contains(event.target)
      ) {
        setShowOptionsDropdown(false);
      }
      // Close entire modal
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  const handleSelectAll = () => {
    if (selectAll) {
      setTempSelected([]);
      setSelectAll(false);
    } else {
      setTempSelected([...options]);
      setSelectAll(true);
    }
  };

  const handleOptionToggle = (option) => {
    if (modalType === "radio") {
      setTempSelected([option]);
    } else if (modalType === "multiSelect") {
      setTempSelected((prev) => {
        const newSelected = prev.includes(option)
          ? prev.filter((item) => item !== option)
          : [...prev, option];

        setSelectAll(newSelected.length === options.length);
        return newSelected;
      });
    } else if (modalType === "dateRange") {
      if (option === "Custom") {
        setShowDatePicker(true);
        setSelectedDateOption(option);
      } else {
        setTempSelected([option]);
        setSelectedDateOption(option);
        setShowDatePicker(false);
      }
    }
  };

  const handleApply = () => {
    let finalSelected = tempSelected;
    if (
      modalType === "dateRange" &&
      selectedDateOption === "Custom" &&
      dateRange.start &&
      dateRange.end
    ) {
      finalSelected = [`Custom: ${dateRange.start} - ${dateRange.end}`];
    }
    onApply(finalSelected, tempCondition);
  };

  const getConditionOptions = () => {
    if (modalType === "dateRange") {
      return ["is between", "is not between"];
    }
    return ["is", "is not"];
  };

  const getDisplayText = () => {
    if (modalType === "radio") {
      return tempSelected.length > 0 ? tempSelected[0] : "Select option";
    } else if (modalType === "multiSelect") {
      return tempSelected.length > 0
        ? `${tempSelected.length} options selected`
        : "Select options";
    } else if (modalType === "dateRange") {
      if (selectedDateOption === "Custom" && dateRange.start && dateRange.end) {
        return `${dateRange.start} - ${dateRange.end}`;
      }
      return tempSelected.length > 0 ? tempSelected[0] : "Select date range";
    }
    return "Select options";
  };

  if (!isOpen || !type) return null;

  return (
    <div
      ref={modalRef}
      className=" absolute bg-white border border-gray-300 rounded-lg shadow-lg z-50"
      style={{
        width: modalType === "dateRange" ? "700px" : "500px",
        maxHeight: "500px",
      }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">{type}</h3>
      </div>

      {/* Filter Controls */}
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          {/* Filter Type Dropdown (disabled) */}
          <select
            className="border border-gray-300 rounded px-3 py-1.5 text-sm bg-white min-w-0 flex-1"
            value={type}
            disabled
          >
            <option>{type}</option>
          </select>

          {/* Condition Dropdown */}
          <div className="relative" ref={conditionDropdownRef}>
            <button
              onClick={() => setShowConditionDropdown(!showConditionDropdown)}
              className="border border-blue-500 bg-blue-50 rounded px-3 py-1.5 text-sm bg-white flex items-center gap-2 min-w-[80px] justify-between"
            >
              <span>{tempCondition}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Condition Dropdown Menu */}
            {showConditionDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-60">
                {getConditionOptions().map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer ${
                      tempCondition === option ? "bg-blue-50" : ""
                    }`}
                    onClick={() => {
                      setTempCondition(option);
                      setShowConditionDropdown(false);
                    }}
                  >
                    <input
                      type="radio"
                      name="condition"
                      checked={tempCondition === option}
                      onChange={() => {}}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Options Dropdown */}
          <div className="relative flex-1" ref={optionsDropdownRef}>
            <button
              onClick={() => setShowOptionsDropdown(!showOptionsDropdown)}
              className="w-full border border-blue-500 rounded px-3 py-1.5 text-sm bg-white text-left flex items-center justify-between"
            >
              <span>{getDisplayText()}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Options Dropdown Menu */}
            {showOptionsDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-60 max-h-80 overflow-y-auto">
                {/* Date Range Special Layout */}
                {modalType === "dateRange" && showDatePicker ? (
                  <div className="flex gap-4 p-4">
                    {/* Left side - Quick options */}
                    <div className="w-1/3">
                      {options.map((option, index) => (
                        <label
                          key={index}
                          className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="dateOption"
                            checked={selectedDateOption === option}
                            onChange={() => handleOptionToggle(option)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                    </div>

                    {/* Right side - Calendar */}
                    <div className="flex-1">
                      <div className="text-center mb-4">
                        <div className="flex justify-between items-center mb-4">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            ←
                          </button>
                          <span className="font-semibold">August 2025</span>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            →
                          </button>
                        </div>

                        {/* Simple calendar placeholder */}
                        <div className="grid grid-cols-7 gap-1 text-xs mb-2">
                          {[
                            "Sun",
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                          ].map((day) => (
                            <div key={day} className="p-1 text-gray-500">
                              {day}
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-sm">
                          {Array.from({ length: 31 }, (_, i) => (
                            <button
                              key={i + 1}
                              className={`p-2 hover:bg-blue-100 rounded ${
                                i + 22 === 23 ? "bg-blue-500 text-white" : ""
                              }`}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>

                        <div className="mt-4 text-sm text-gray-500">
                          23 Aug 2025
                          <br />
                          Dates are shown in Karachi Time
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Regular Options List */
                  <div>
                    {/* Select All for multiSelect */}
                    {modalType === "multiSelect" && (
                      <label className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer bg-blue-50 border-b border-gray-200">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          className="w-4 h-4"
                        />
                        <span className="text-sm font-medium">Select all</span>
                      </label>
                    )}

                    {/* Individual Options */}
                    {options.map((option, index) => {
                      const isSelected = tempSelected.includes(option);
                      const inputType =
                        modalType === "radio" ? "radio" : "checkbox";

                      return (
                        <label
                          key={index}
                          className={`flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                            isSelected ? "bg-blue-50" : ""
                          }`}
                        >
                          <input
                            type={inputType}
                            name={
                              modalType === "radio" ? "radioGroup" : undefined
                            }
                            checked={isSelected}
                            onChange={() => handleOptionToggle(option)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {modalType === "dateRange" ? "Update" : "Apply"}
        </button>
      </div>
    </div>
  );
}
// Search dropdown component
function SearchDropdown({ isOpen, onClose, onSelectFilter, inputRef }) {
  const [currentView, setCurrentView] = useState("main");
  const dropdownRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  const visibleItems = expanded
    ? searchData.popular
    : searchData.popular.slice(0, 3);
  const getDotColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "deleted":
        return "bg-gray-400";
      // for "default" or anything else
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose, inputRef]);

  // Reset view when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentView("main");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectItem = (item) => {
    const itemText = typeof item === "string" ? item : item.label;

    // Check if this is a filter that should open a modal
    const filtersWithModals = [
      "Conversion location",
      "Delivery",
      "Objectives",
      "Performance goal",
      "Placement",
      "Attribution setting",
      "Recently changed",
      "Special ad category",
      "Test name",
      "Campaign setup",
    ];

    if (filtersWithModals.includes(itemText)) {
      // Get the position of the dropdown to position the modal
      const rect = dropdownRef.current?.getBoundingClientRect();
      if (rect) {
        onSelectFilter(itemText, {
          top: rect.top,
          left: rect.right + 10, // Position to the right of dropdown
        });
      }
    } else {
      onSelectFilter(itemText);
    }
  };

  // Main dropdown view
  const renderMainView = () => (
    <div className="max-h-96  overflow-y-auto">
      {/* Recent Section */}
      {searchData.recent.length > 0 && (
        <div className="p-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Recent</h3>
          {searchData.recent.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectItem(item)}
              className="py-2 px-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 rounded"
            >
              {item}
            </div>
          ))}
        </div>
      )}

      {/* Popular Section */}
      <div className="p-3 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2">Popular</h3>

        {visibleItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSelectItem(item)}
            className="py-2 px-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 rounded"
          >
            <span className="flex items-center gap-2">
              <span>{item.label}</span>
              {(item.status == "active" ||
                item.status == "deleted" ||
                item.status == "sales") && (
                <span className="text-gray-600">is</span>
              )}
              {item.status !== "sales" && (
                <span
                  className={`w-2 h-2 rounded-full ${getDotColor(item.status)}`}
                />
              )}
              {item.status !== "default" && (
                <span className="capitalize">{item.status}</span>
              )}
            </span>
          </div>
        ))}

        {searchData.popular.length > 3 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-500 text-sm hover:underline mt-2"
          >
            {expanded ? "See less ▲" : "See more ▼"}
          </button>
        )}
      </div>
      {/* Find by category */}
      <div className="p-3 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2">Find by category</h3>
        {Object.keys(searchData.categories).map((category) => (
          <div
            key={category}
            onClick={() => setCurrentView(category.toLowerCase())}
            className="py-2 px-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 rounded flex items-center justify-between"
          >
            <span>{category}</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        ))}
      </div>

      {/* Filter selected rows only */}
      <div className="px-5 py-3  ">
        <label className="flex items-center text-sm text-gray-600 cursor-pointer">
          Filter selected rows only
        </label>
      </div>

      {/* Other Filters */}
      <div className="px-3">
        {searchData.filters.map((filter, index) => (
          <div
            key={index}
            onClick={() => {
              if (filter === "Name/ID") {
                setCurrentView("nameid");
              } else if (filter === "Audience") {
                setCurrentView("audience");
              } else {
                handleSelectItem(filter);
              }
            }}
            className="py-2 px-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 rounded flex items-center justify-between"
          >
            <span>{filter}</span>
            {(filter === "Name/ID" || filter === "Audience") && (
              <ChevronRight className="w-4 h-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Category view (Performance, Engagement, Conversions)
  const renderCategoryView = (categoryKey) => {
    const category =
      searchData.categories[
        categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)
      ];
    if (!category) return null;

    return (
      <div className="max-h-96 overflow-y-auto">
        {/* Header with back button */}
        <div className="p-3 border-b border-gray-200 flex items-center">
          <button
            onClick={() => setCurrentView("main")}
            className="mr-3 hover:bg-gray-100 rounded p-1"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 className="font-semibold text-gray-900 capitalize">
            {categoryKey}
          </h3>
        </div>

        {/* Category items */}
        <div className="p-3">
          {category.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectItem(item)}
              className="py-2 px-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 rounded"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Name/ID view
  const renderNameIdView = () => (
    <div className="max-h-96 overflow-y-auto">
      <div className="p-3 border-b border-gray-200 flex items-center">
        <button
          onClick={() => setCurrentView("main")}
          className="mr-3 hover:bg-gray-100 rounded p-1"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h3 className="font-semibold text-gray-900">Name/ID</h3>
      </div>

      <div className="p-3">
        {searchData.nameId.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSelectItem(item)}
            className="py-2 px-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 rounded"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );

  // Audience view
  const renderAudienceView = () => (
    <div className="max-h-96 overflow-y-auto">
      <div className="p-3 border-b border-gray-200 flex items-center">
        <button
          onClick={() => setCurrentView("main")}
          className="mr-3 hover:bg-gray-100 rounded p-1"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h3 className="font-semibold text-gray-900">Audience</h3>
      </div>

      <div className="p-3">
        {searchData.audience.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSelectItem(item)}
            className="py-2 px-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 rounded"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
    >
      {currentView === "main" && renderMainView()}
      {currentView === "performance" && renderCategoryView("performance")}
      {currentView === "engagement" && renderCategoryView("engagement")}
      {currentView === "conversions" && renderCategoryView("conversions")}
      {currentView === "nameid" && renderNameIdView()}
      {currentView === "audience" && renderAudienceView()}
    </div>
  );
}

// Main component
export default function PageFiltersBar({
  chips,
  setChips,
  search,
  setSearch,
  filters,
  setFilters,
  onOpenSave,
  onViewCreated,
  onCreateView,
  customViews = [],
}) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterModal, setFilterModal] = useState({
    isOpen: false,
    type: null,
    selectedValues: [],
    position: { top: 0, left: 0 },
    condition: "is",
  });

  // New states for dropdown system
  const [showQuickViews, setShowQuickViews] = useState(false);
  const [showMyViews, setShowMyViews] = useState(false);
  const [showSharedViews, setShowSharedViews] = useState(false);
  // const [filters, setFilters] = useState({
  //   allAds: false,
  //   hadDelivery: false,
  //   actions: false,
  //   active: false,
  //   more: false,
  // });

  const inputRef = useRef(null);

  const selectQuick = (key) => {
    setFilters((f) => {
      const newFilters = {
        ...f,
        allAds: key === "allAds",
        hadDelivery: key === "hadDelivery",
        actions: key === "actions",
        active: key === "active",
      };
      
      // Clear all custom view selections
      customViews.forEach(view => {
        newFilters[`custom-${view.id}`] = false;
      });
      
      // Set the selected custom view if it's a custom view
      if (key.startsWith("custom-")) {
        newFilters[key] = true;
      }
      
      return newFilters;
    });
  };

  const handleSelectFilter = (filter, position = null) => {
    // Check if this filter should open a modal
    const filtersWithModals = [
      "Conversion location",
      "Delivery",
      "Objectives",
      "Performance goal",
      "Placement",
      "Attribution setting",
      "Recently changed",
      "Special ad category",
      "Test name",
      "Campaign setup",
    ];

    if (filtersWithModals.includes(filter) && position) {
      setFilterModal({
        isOpen: true,
        type: filter,
        selectedValues: [],
        position: position,
        condition: "is",
      });
      setShowDropdown(false);
    } else {
      // Regular filter handling
      if (!selectedFilters.includes(filter)) {
        setSelectedFilters((prev) => [...prev, filter]);
      }
    }
  };
  const removeFilter = (filterToRemove) => {
    setSelectedFilters((prev) =>
      prev.filter((filter) => filter !== filterToRemove)
    );
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    setSearchTerm("");
  };

  const addChipFromSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    if (!selectedFilters.includes(searchTerm.trim())) {
      setSelectedFilters((prev) => [...prev, searchTerm.trim()]);
    }
    setSearchTerm("");
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      // Focus input when opening search
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    } else {
      setShowDropdown(false);
    }
  };
  const handleFilterModalApply = (selectedValues, condition = "is") => {
    if (selectedValues.length > 0) {
      const filterConfig = filterModalData[filterModal.type];
      let filterLabel = "";

      if (filterConfig?.type === "radio") {
        filterLabel = `${filterModal.type} ${condition} ${selectedValues[0]}`;
      } else if (filterConfig?.type === "multiSelect") {
        if (selectedValues.length === 1) {
          filterLabel = `${filterModal.type} ${condition} ${selectedValues[0]}`;
        } else {
          filterLabel = `${filterModal.type} ${condition} ${selectedValues.length} options`;
        }
      } else if (filterConfig?.type === "dateRange") {
        filterLabel = `${filterModal.type} ${condition} ${selectedValues[0]}`;
      }

      if (!selectedFilters.includes(filterLabel)) {
        setSelectedFilters((prev) => [...prev, filterLabel]);
      }
    }

    setFilterModal({
      isOpen: false,
      type: null,
      selectedValues: [],
      position: { top: 0, left: 0 },
      condition: "is",
    });
  };

  const handleFilterModalCancel = () => {
    setFilterModal({
      isOpen: false,
      type: null,
      selectedValues: [],
      position: { top: 0, left: 0 },
      condition: "is",
    });
  };

  const handleFilterModalClose = () => {
    setFilterModal({
      isOpen: false,
      type: null,
      selectedValues: [],
      position: { top: 0, left: 0 },
      condition: "is",
    });
  };

  // Dropdown handlers
  const handleQuickViewsClick = () => {
    setShowQuickViews(!showQuickViews);
    setShowMyViews(false);
    setShowSharedViews(false);
  };

  const handleMyViewsClick = () => {
    setShowMyViews(true);
    setShowQuickViews(false);
    setShowSharedViews(false);
  };

  const handleSharedViewsClick = () => {
    setShowSharedViews(true);
    setShowQuickViews(false);
    setShowMyViews(false);
  };

  const handleCreateViewClick = () => {
    setShowQuickViews(false);
    setShowMyViews(false);
    setShowSharedViews(false);
    // Close the dropdown
    handleCloseAllDropdowns();
    // Call the parent handler to show create view panel
    if (onCreateView) {
      onCreateView();
    }
  };

  const handleBackToQuickViews = () => {
    setShowMyViews(false);
    setShowSharedViews(false);
    setShowQuickViews(true);
  };



  const handleCloseAllDropdowns = () => {
    setShowQuickViews(false);
    setShowMyViews(false);
    setShowSharedViews(false);
  };
  return (
    <div className=" px-4 py-2">
      {/* Top row: search icon, quick buttons, Save edits */}
      <div className="flex items-center gap-2 px-1 py-2">
        <button
          onClick={handleSearchClick}
          className={`hover:bg-blue-100 p-3 rounded-sm border relative ${
            showSearch
              ? "border-blue-600 font-bold text-blue-600"
              : "bg-white border-gray-300"
          }`}
        >
          <img
            src="/images/campaigns/search.png"
            alt="All Ads"
            className="w-4 h-4"
          />
          {selectedFilters.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {selectedFilters.length}
            </span>
          )}
        </button>
        <div className="border-l border-gray-300 h-8 mx-2"></div>

        <button
          onClick={() => selectQuick("allAds")}
          className={`hover:bg-[#C3DCF5] flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm border text-sm ${
            filters?.allAds
              ? " border-[#0A78BE] font-bold text-[#0A78BE]"
              : "bg-white border-gray-300 text-gray-700"
          }`}
        >
          <img
            src={
              filters?.allAds
                ? "/images/campaigns/AllAdsDark.png"
                : "/images/campaigns/AllAds.png"
            }
            alt="All Ads"
            className="w-5 h-4"
          />
          All ads
        </button>

        <button
          onClick={() => selectQuick("hadDelivery")}
          className={`hover:bg-[#C3DCF5] flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm border text-sm ${
            filters?.hadDelivery
              ? " border-[#0A78BE] font-bold text-[#0A78BE]"
              : "bg-white border-gray-300 text-gray-700"
          }`}
        >
          <img
            src={
              filters?.hadDelivery
                ? "/images/campaigns/DeliveryDark.png"
                : "/images/campaigns/Delivery.png"
            }
            alt="Had Delivery"
            className="w-5 h-4"
          />
          Had delivery
        </button>

        {/* Custom View Tabs */}
        {customViews.map((view) => (
          <button
            key={view.id}
            onClick={() => selectQuick(`custom-${view.id}`)}
            className={`hover:bg-[#C3DCF5] flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm border text-sm ${
              filters?.[`custom-${view.id}`]
                ? " border-[#0A78BE] font-bold text-[#0A78BE]"
                : "bg-white border-gray-300 text-gray-700"
            }`}
          >
            <img
              src="/images/campaigns/CampaignsLight.png"
              alt={view.name}
              className="w-5 h-4"
            />
            {view.name}
          </button>
        ))}

        <button
          onClick={() => selectQuick("actions")}
          className={`hover:bg-[#C3DCF5] flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm border text-sm ${
            filters?.actions
              ? " border-[#0A78BE] font-bold text-[#0A78BE]"
              : "bg-white border-gray-300 text-gray-700"
          }`}
        >
          <img
            src={
              filters?.actions
                ? "/images/campaigns/ActionDark.png"
                : "/images/campaigns/Actions.png"
            }
            alt="Actions"
            className="w-5 h-4"
          />
          Actions
        </button>

        <button
          onClick={() => selectQuick("active")}
          className={`hover:bg-[#C3DCF5] flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm border text-sm ${
            filters?.active
              ? " border-[#0A78BE] font-bold text-[#0A78BE]"
              : "bg-white border-gray-300 text-gray-700"
          }`}
        >
          <img
            src={
              filters?.active
                ? "/images/campaigns/ActiveDark.png"
                : "/images/campaigns/ActiveAds.png"
            }
            alt="Active Ads"
            className="w-5 h-4"
          />
          Active ads
        </button>

        <div className="relative">
          <button
            onClick={handleQuickViewsClick}
            className={`flex items-center justify-center gap-2  px-3 py-2.5 rounded-sm text-sm hover:bg-gray-200 ${
              showQuickViews || showMyViews || showSharedViews ? "bg-gray-200  font-bold " : "  text-gray-700"
            }`}
          >
            <Plus size={20} />
            {customViews.length > 0 ? `+${customViews.length} more` : "See more"}
          </button>

          {/* Quick Views Dropdown */}
          <QuickViewsDropdown
            isOpen={showQuickViews}
            onClose={handleCloseAllDropdowns}
            onMyViews={handleMyViewsClick}
            onSharedViews={handleSharedViewsClick}
            onCreateView={handleCreateViewClick}
          />

          {/* My Views Dropdown */}
          <MyViewsDropdown
            isOpen={showMyViews}
            onClose={handleCloseAllDropdowns}
            onBack={handleBackToQuickViews}
          />

          {/* Shared Views Dropdown */}
          <SharedViewsDropdown
            isOpen={showSharedViews}
            onClose={handleCloseAllDropdowns}
            onBack={handleBackToQuickViews}
          />
        </div>

        <button
          onClick={onOpenSave}
          className="ml-auto px-3 py-2 text-gray-700  border border-gray-300 rounded-sm text-sm"
        >
          Save edits
        </button>
        <button
          className="p-2 rounded-sm border  text-gray-700 border-gray-300"
          title="settings"
        >
          <SlidersHorizontal size={20} />
        </button>
      </div>

      {/* Search bar with chips and clear button */}
      {showSearch && (
        <div className="px-1 pb-2">
          <div className="flex items-center gap-2 bg-white border-2 border-blue-500 rounded-lg px-3 py-2">
            {/* Selected filter chips */}
            {selectedFilters.map((filter, i) => (
              <Chip
                key={i}
                label={filter}
                onRemove={() => removeFilter(filter)}
              />
            ))}

            {/* Search input */}
            <div className="flex-1 relative" ref={inputRef}>
              <div className="max-w-[300px] relative">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={handleInputFocus}
                  placeholder={
                    selectedFilters.length === 0
                      ? "Search to filter by name, ID or metrics"
                      : ""
                  }
                  className="w-full bg-transparent py-2 px-4 rounded-full focus:outline-none focus:border focus:bg-blue-50 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-100 text-sm max-w-md transition-all duration-200 placeholder-gray-500"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addChipFromSearch(e);
                    }
                  }}
                />

                {/* Search dropdown */}
                <SearchDropdown
                  isOpen={showDropdown}
                  onClose={() => setShowDropdown(false)}
                  onSelectFilter={handleSelectFilter}
                  inputRef={inputRef}
                />
                {/* Filter Modal */}
              </div>
            </div>

            {/* Clear button */}
            {(selectedFilters.length > 0 || searchTerm) && (
              <button
                onClick={clearAllFilters}
                className="text-blue-600 text-sm hover:underline whitespace-nowrap"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
      <FilterModal
        isOpen={filterModal.isOpen}
        type={filterModal.type}
        selectedValues={filterModal.selectedValues}
        position={filterModal.position}
        onApply={handleFilterModalApply}
        onCancel={handleFilterModalCancel}
        onClose={handleFilterModalClose}
      />
    </div>
  );
}
