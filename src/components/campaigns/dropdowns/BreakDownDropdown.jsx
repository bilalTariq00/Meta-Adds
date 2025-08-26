import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  ChevronRight,
  Check,
  Search,
  Grid2X2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";

const BreakdownDropdown = ({
  compactActions = false,
  onSelectionChange,
  placeholder = "Breakdowns: None selected",
  children, // Add children prop to support wrapper pattern
  chartOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBreakdowns, setSelectedBreakdowns] = useState(["platform"]); // Pre-select platform
  const [hoveredItem, setHoveredItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [dropdownPosition, setDropdownPosition] = useState("below");
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const sidePopupRef = useRef(null);

  const { refs, floatingStyles } = useFloating({
    placement: "left-start", // try left first
    strategy: "fixed", // avoid clipping with scrolling ancestors
    middleware: [
      offset(8), // 8px gap
      flip(), // flip if no space
      shift({ padding: 8 }), // keep in viewport
    ],
    whileElementsMounted: autoUpdate, // auto re-position on scroll/resize
  });

  // Calculate dropdown position based on available space
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;
      const dropdownHeight = 400; // Approximate dropdown height

      setDropdownPosition(spaceBelow >= dropdownHeight ? "below" : "above");
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickOnDropdown =
        dropdownRef.current && dropdownRef.current.contains(event.target);
      const isClickOnSidePopup =
        sidePopupRef.current && sidePopupRef.current.contains(event.target);

      if (!isClickOnDropdown && !isClickOnSidePopup) {
        setIsOpen(false);
        setHoveredItem(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Popular options
  const popularOptions = [
    { key: "day", label: "Day" },
    { key: "age", label: "Age" },
    { key: "placement", label: "Placement" },
    { key: "country", label: "Country" },
    { key: "platform", label: "Platform" },
  ];

  // Main dropdown sections with badge logic
  const mainSections = [
    {
      key: "time",
      label: "Time",
      hasArrow: true,
      badge:
        selectedOptions.time && selectedOptions.time !== "none" ? "1" : null,
    },
    {
      key: "demographics",
      label: "Demographics",
      hasArrow: true,
      badge:
        selectedOptions.demographics && selectedOptions.demographics !== "none"
          ? "1"
          : null,
    },
    {
      key: "geography",
      label: "Geography",
      hasArrow: true,
      badge:
        selectedOptions.geography && selectedOptions.geography !== "none"
          ? "1"
          : null,
    },
    {
      key: "delivery",
      label: "Delivery",
      hasArrow: true,
      badge:
        selectedOptions.delivery && selectedOptions.delivery !== "none"
          ? "1"
          : null,
    },
    {
      key: "action",
      label: "Action",
      hasArrow: true,
      badge:
        selectedOptions.action && selectedOptions.action !== "none"
          ? "1"
          : null,
    },
    {
      key: "creative",
      label: "Creative",
      hasArrow: true,
      badge:
        selectedOptions.creative && selectedOptions.creative !== "none"
          ? "1"
          : null,
    },
  ];

  const handlePopularOptionChange = (optionKey) => {
    if (selectedBreakdowns.includes(optionKey)) {
      setSelectedBreakdowns((prev) =>
        prev.filter((item) => item !== optionKey)
      );
    } else {
      setSelectedBreakdowns((prev) => [...prev, optionKey]);
    }
  };

  const handleSideOptionSelect = (sectionKey, optionKey) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [sectionKey]: optionKey,
    }));

    // Add to selected breakdowns if not "none" and not already selected
    if (optionKey !== "none" && !selectedBreakdowns.includes(optionKey)) {
      setSelectedBreakdowns((prev) => [...prev, optionKey]);
    }
  };

  const getSelectedCount = () => {
    return selectedBreakdowns.length;
  };

  const getDisplayText = () => {
    const count = getSelectedCount();
    if (compactActions || chartOpen) {
      // For compact mode, just show the count badge if there are selections
      return null; // We'll handle the display in the JSX
    }
    if (count === 0) return placeholder;
    if (count === 1) return `Breakdown: ${count} selected`;
    return `Breakdowns: ${count} selected`;
  };

  const getPopupConfig = () => {
    if (!hoveredItem) return null;
    switch (hoveredItem) {
      case "time":
        return {
          title: "Bid strategy",
          options: [
            { key: "none", label: "None" },
            { key: "day", label: "Day" },
            { key: "week", label: "Week" },
            { key: "2weeks", label: "2 weeks" },
            { key: "month", label: "Month" },
          ],
        };
      case "demographics":
        return {
          title: "Bid strategy",
          options: [
            { key: "none", label: "None" },
            { key: "age", label: "Age" },
            { key: "gender", label: "Gender" },
            { key: "age_gender", label: "Age and gender" },
            { key: "audience_segments", label: "Audience segments" },
          ],
        };
      case "geography":
        return {
          title: "Bid strategy",
          options: [
            { key: "none", label: "None" },
            { key: "country", label: "Country" },
            { key: "country_audience", label: "Country and audience segments" },
            { key: "region", label: "Region" },
            { key: "business_locations", label: "Business locations" },
            { key: "dma_region", label: "DMA region" },
          ],
        };
      case "delivery":
        return {
          title: "Bid strategy",
          options: [
            { key: "none", label: "None" },
            { key: "placement", label: "Placement" },
            { key: "platform", label: "Platform" },
            {
              key: "time_ad_account",
              label: "Time of day (ad account time zone)",
            },
            { key: "time_viewer", label: "Time of day (viewer's time zone)" },
            { key: "impression_device", label: "Impression device" },
            { key: "platform_device", label: "Platform and device" },
          ],
        };
      case "action":
        return {
          title: "Bid strategy",
          options: [
            { key: "none", label: "None" },
            { key: "messaging_source", label: "Messaging purchase source" },
            {
              key: "messaging_destination",
              label: "Messaging outcome destination",
            },
            { key: "conversion_device", label: "Conversion device" },
            { key: "carousel_card", label: "Carousel card" },
            { key: "destination", label: "Destination" },
          ],
        };
      case "creative":
        return {
          title: "Bid strategy",
          options: [{ key: "none", label: "None" }],
        };
      default:
        return null;
    }
  };

  const dropdownClasses =
    dropdownPosition === "below"
      ? "absolute top-full left-0 w-full mt-1"
      : "absolute bottom-full left-0 w-full mb-1";
  const popupConfig = getPopupConfig();

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Only show label if not compact */}
      {/* {!compactActions && (
        <div className="text-sm font-semibold mb-1">Breakdowns</div>
      )} */}

      {/* Selected badges - only show if not compact or if there are selections */}
      {/* {selectedBreakdowns.length > 0 && !compactActions && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedBreakdowns.map((breakdown) => (
            <span
              key={breakdown}
              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
            >
              <Check className="w-3 h-3" />
              {breakdown.charAt(0).toUpperCase() + breakdown.slice(1)}
            </span>
          ))}
        </div>
      )} */}

      {/* Main dropdown trigger - use children if provided, otherwise render default */}
      {children ? (
        <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
          {children}
        </div>
      ) : (
        <button
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full text-sm text-left transition-colors flex items-center justify-between ${
            compactActions || chartOpen
              ? "px-2 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md font-medium gap-1.5"
              : "border border-gray-300 rounded px-3 py-1.5 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          }`}
        >
          <div className="flex items-center ">
            <>
              <Grid2X2 className="w-4 h-4" />
            </>

            <span className="text-gray-700">{getDisplayText()}</span>
            {/* {getSelectedCount() > 0 && (compactActions || chartOpen) && (
              <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full text-xs font-medium min-w-[18px] text-center">
                {getSelectedCount()}
              </span>
            )} */}
          </div>
          {compactActions || chartOpen ? (
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          ) : (
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </button>
      )}

      {/* Main dropdown menu */}
      {isOpen && (
        <div
          className={`${dropdownClasses} bg-white border border-gray-300 rounded-md shadow-lg z-40 max-h-96 overflow-y-auto min-w-80`}
        >
          {/* Search bar */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-blue-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Popular section */}
          <div className="p-3 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-semibold text-sm text-gray-900">
                Popular
              </span>
              <div className="w-4 h-4 rounded-full bg-gray-400 flex items-center justify-center">
                <span className="text-white text-xs">i</span>
              </div>
            </div>

            {popularOptions.map((option) => (
              <label
                key={option.key}
                className="flex items-center py-1 cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedBreakdowns.includes(option.key)}
                  onChange={() => handlePopularOptionChange(option.key)}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>

          {/* Main sections */}
          <div className="relative">
            {mainSections.map((section) => (
              <div
                key={section.key}
                className="relative"
                data-section={section.key}
                onMouseEnter={(e) => {
                  setHoveredItem(section.key);
                  refs.setReference(e.currentTarget);
                }}
              >
                <button className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between text-sm text-gray-900 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <span>{section.label}</span>
                    {section.badge && (
                      <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        {section.badge}
                      </span>
                    )}
                  </div>
                  {section.hasArrow && (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Value rules section */}
          <div className="p-4 border-t border-gray-200">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
              />
              <div>
                <div className="text-sm text-gray-700 font-medium">
                  Value rules
                </div>
                <div className="text-xs text-gray-500">
                  Ads and ad sets only
                </div>
              </div>
            </label>
          </div>

          {/* Save button */}
          <div className="p-3 border-t border-gray-200 flex justify-end">
            <button
              onClick={() => {
                setIsOpen(false);
                if (onSelectionChange) {
                  onSelectionChange(selectedBreakdowns);
                }
              }}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Side popup rendered using portal */}
      {hoveredItem &&
        popupConfig &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            ref={(node) => {
              refs.setFloating(node);
              sidePopupRef.current = node;
            }}
            style={floatingStyles}
            className="w-80 bg-white border border-gray-300 rounded-md shadow-lg z-[9999]"
            onMouseEnter={() => {
              // keep it open when moving cursor into the popup
              setHoveredItem(hoveredItem);
            }}
          >
            <div className="p-3 border-b border-gray-200">
              <div className="font-semibold text-sm text-gray-900 mb-2">
                {popupConfig.title}
              </div>
              <div className="text-xs text-gray-600 mb-1">Highest volume</div>
              <div className="text-xs text-gray-600">Highest volume</div>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {popupConfig.options.map((option) => (
                <label
                  key={option.key}
                  className="flex items-center px-4 py-2 hover:bg-blue-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`${hoveredItem}_strategy`}
                    value={option.key}
                    checked={
                      selectedOptions[hoveredItem] === option.key ||
                      (option.key === "none" && !selectedOptions[hoveredItem])
                    }
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSideOptionSelect(hoveredItem, option.key);
                    }}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default BreakdownDropdown;
