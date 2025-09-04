"use client";

import { useState, useRef, useEffect } from "react";
import { 
  ChevronDown, 
  Settings, 
  Wrench, 
  RotateCcw, 
  MoreHorizontal,
  Table,
  ArrowLeftRight
} from "lucide-react";

export default function PivotTableHeader({ 
  onLayoutChange,
  onUngroupBreakdown,
  onResetColumnWidth,
  onFormatClick,
  onCustomiseClick,
  activeTab = null,
  onTabChange
}) {
  const [showLayoutDropdown, setShowLayoutDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  
  const layoutDropdownRef = useRef(null);
  const moreDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (layoutDropdownRef.current && !layoutDropdownRef.current.contains(event.target)) {
        setShowLayoutDropdown(false);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
        setShowMoreDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const layoutOptions = [
    { id: "pivot-table", label: "Pivot table", description: "View your data in a table format" },
    { id: "trend", label: "Trend", description: "View your data as a trend over time" },
    { id: "bar-chart", label: "Bar chart", description: "View your data as a bar chart" },
  ];

  return (
    <div className="px-6 py-3 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between">
        {/* Left side - Layout and controls */}
        <div className="flex items-center gap-3">
          {/* Pivot Table Dropdown Button */}
          <div className="relative" ref={layoutDropdownRef}>
            <button
              onClick={() => setShowLayoutDropdown(!showLayoutDropdown)}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Table className="w-4 h-4" />
              <span className="text-sm font-medium">Pivot Table</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showLayoutDropdown && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-2">
                  {layoutOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        onLayoutChange(option.id);
                        setShowLayoutDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-50"
                    >
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Ungroup Breakdowns Button */}
          <button
            onClick={onUngroupBreakdown}
            className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Ungroup Breakdowns
          </button>
        </div>

        {/* Right side - Format and Customise buttons */}
        <div className="flex items-center gap-3">
          {/* Reset Column Widths Button */}
          <button
            onClick={onResetColumnWidth}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <ArrowLeftRight className="w-4 h-4" />
            Reset Column Widths
          </button>

          {/* Format and Customise Tab Container */}
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            {/* Format Tab */}
            <button
              onClick={() => {
                if (onTabChange) {
                  onTabChange(activeTab === 'format' ? null : 'format');
                }
                if (onFormatClick) {
                  onFormatClick();
                }
              }}
              className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                activeTab === 'format'
                  ? 'bg-blue-50 text-blue-700 border-r border-gray-300'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Table className="w-4 h-4" />
              Format
            </button>
            
            {/* Divider */}
            <div className="w-px bg-gray-300"></div>
            
            {/* Customise Tab */}
            <button
              onClick={() => {
                if (onTabChange) {
                  onTabChange(activeTab === 'customise' ? null : 'customise');
                }
                if (onCustomiseClick) {
                  onCustomiseClick();
                }
              }}
              className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                activeTab === 'customise'
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Wrench className="w-4 h-4" />
              Customise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
