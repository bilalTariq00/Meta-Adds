"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Search as SearchIcon,
  Plus,
  Copy,
  Pencil,
  Trash2,
  RotateCcw,
  FlaskConical,
  SlidersHorizontal,
  Columns,
  Grid2X2,
  FileBarChart2,
  Download,
  BarChart3,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";
import ColumnPresetsDropdown from "./dropdowns/ColumnPresetsDropdown";
import BreakdownsDropdown from "./dropdowns/BreakdownsDropdown";
import AdsReportingDropdown from "./dropdowns/AdsReportingDropdown";
import ExportDropdown from "./dropdowns/ExportDropdown";
import DuplicateDropdown from "./dropdowns/duplicatedDropdown";
import EditDropdown from "./dropdowns/EditDropDown";

const categoriesList = [
  "Performance",
  "Engagement",
  "Conversions",
  "Awareness",
  "Traffic",
];

export default function Toolbar({
  search,
  setSearch,
  filters,
  setFilters,
  activeTab,
  setActiveTab,
  selectedCount = 0,
  compactActions = false,
  onCreate,
  onDuplicate,
  onEdit,
  onDelete,
  onRevert,
  onABTest,
  onRules,
  onToggleCharts,
}) {
  const [showCategories, setShowCategories] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditDropdown, setShowEditDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const toggleCategory = (cat) => {
    const exists = filters.categories.includes(cat);
    setFilters({
      ...filters,
      categories: exists
        ? filters.categories.filter((c) => c !== cat)
        : [...filters.categories, cat],
    });
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white border-b border-gray-200">
      {/* Primary Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onCreate}
          className="flex items-center gap-1 px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700 transition-colors text-sm"
        >
          <Plus size={16} />
          Create
        </button>

        <div className="inline-flex border border-gray-300 rounded-sm overflow-hidden">
          {/* Duplicate Button */}
          <button
            onClick={onDuplicate}
            className="px-3 py-1.75 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium flex items-center gap-1.5 transition-colors"
          >
            <Copy className="w-4 h-4" />
            Duplicate
          </button>

          {/* Chevron Button */}
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="px-2 py-1.5 bg-white hover:bg-gray-50 text-gray-500 border-l border-gray-300 transition-colors"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          {showDropdown && (
            <DuplicateDropdown
              show={showDropdown}
              onClose={() => setShowDropdown(false)}
            />
          )}
        </div>

        <div className="inline-flex border border-gray-300 rounded-sm overflow-hidden">
          {/* Duplicate Button */}
          <button
            onClick={onEdit}
            className="px-3 py-1.75 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium flex items-center gap-1.5 transition-colors"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>

          {/* Chevron Button */}
          <button
            onClick={() => setShowEditDropdown((prev) => !prev)}
            className="px-2 py-1.5 bg-white hover:bg-gray-50 text-gray-500 border-l border-gray-300 transition-colors"
          >
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Dropdown */}
          {showEditDropdown && (
            <EditDropdown
              show={showEditDropdown}
              onClose={() => setShowEditDropdown(false)}
            />
          )}
        </div>
        <button
          onClick={onABTest}
          className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors"
        >
          <FlaskConical className="w-4 h-4" />
          A/B test
        </button>

        {/* More dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowMore(!showMore)}
            className="px-3 py-1.75 bg-white hover:bg-gray-50 text-gray-700 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors"
          >
            More
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {showMore && (
            <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg w-48 py-1">
              <button
                onClick={() => {
                  onDelete();
                  setShowMore(false);
                }}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
              <button
                onClick={() => {
                  onRevert();
                  setShowMore(false);
                }}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Revert
              </button>
              <button
                onClick={() => {
                  onRules();
                  setShowMore(false);
                }}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Rules
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-2 ml-auto">
        <ColumnPresetsDropdown>
          <button className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors">
            <Columns className="w-4 h-4" />
            Columns: Performance
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </ColumnPresetsDropdown>

        <BreakdownsDropdown>
          <button className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors">
            <Grid2X2 className="w-4 h-4" />
            Breakdown
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </BreakdownsDropdown>

        <AdsReportingDropdown>
          <button
            className="p-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors"
            title="Reports"
          >
            <FileBarChart2 className="w-4 h-4 text-gray-600" />
          </button>
        </AdsReportingDropdown>

        <ExportDropdown>
          <button
            className="p-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors"
            title="Export"
          >
            <Download className="w-4 h-4 text-gray-600" />
          </button>
        </ExportDropdown>

        <button
          onClick={onToggleCharts}
          className="p-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors"
          title="Charts"
        >
          <BarChart3 className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
