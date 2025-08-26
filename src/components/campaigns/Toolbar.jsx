"use client";

import { useEffect, useRef, useState } from "react";
import {
  Plus,
  Copy,
  Pencil,
  FileBarChart2,
  Download,
  BarChart3,
  ChevronDown,
  Play,
} from "lucide-react";
import { ExternalLink, FileDown, Upload, Eye, Settings } from "lucide-react";
import AdsReportingDropdown from "./dropdowns/AdsReportingDropdown";
import ExportDropdown from "./dropdowns/ExportDropdown";
import DuplicateDropdown from "./dropdowns/duplicatedDropdown";
import EditDropdown from "./dropdowns/EditDropDown";
import ColumnPreferencesDropdown from "./column-preferences-dropdown";
import BreakdownDropdown from "./dropdowns/BreakDownDropdown";
import TagsDropdown from "./dropdowns/TagsDropdown";
import DeleteModal from "./DeleteModal";
import CreateRuleModal from "./dialoges/CreateRuleModal";
import ApplyRuleModal from "./dialoges/ApplyRuleModal";
import ActiveRulesModal from "./dialoges/ActiveRulesModal";
import EditRuleModal from "./dialoges/EditRuleModal";
import { Flag as Flask } from "lucide-react"; // Import Flask for onABTest

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
  onRules,
  onToggleCharts,
  ChartOpen = false,
}) {
  const [showCategories, setShowCategories] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditDropdown, setShowEditDropdown] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showApplyRuleModal, setShowApplyRuleModal] = useState(false);
  const [showActiveRulesModal, setShowActiveRulesModal] = useState(false);
  const [showEditRuleModal, setShowEditRuleModal] = useState(false);
  const [selectedRuleForEdit, setSelectedRuleForEdit] = useState(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMore(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = () => {
    console.log("Delete clicked");
    setShowMore(false);
  };

  const handleRevert = () => {
    console.log("Revert clicked");
    setShowMore(false);
  };

  const handleRules = () => {
    console.log("Rules clicked");
    setShowMore(false);
  };
  const dropdownRef = useRef(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const toggleCategory = (cat) => {
    const exists = filters.categories.includes(cat);
    setFilters({
      ...filters,
      categories: exists
        ? filters.categories.filter((c) => c !== cat)
        : [...filters.categories, cat],
    });
  };

  // Handle breakdown selection change
  const handleBreakdownChange = (selectedBreakdowns) => {
    setFilters({
      ...filters,
      breakdowns: selectedBreakdowns,
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

  const handleApplyRule = () => {
    setShowApplyRuleModal(true);
    setShowMore(false);
  };

  const handleViewActiveRules = () => {
    setShowActiveRulesModal(true);
    setShowMore(false);
  };

  const handleManageRules = () => {
    console.log("Navigate to manage rules");
    setShowActiveRulesModal(false);
  };

  const handleApplySelectedRule = (ruleName) => {
    console.log("Applying rule:", ruleName);
    setShowApplyRuleModal(false);
  };

  const handleEditRule = (ruleName) => {
    setSelectedRuleForEdit({ name: ruleName });
    setShowApplyRuleModal(false);
    setShowEditRuleModal(true);
  };

  const handleSaveEditedRule = (ruleData) => {
    console.log("Saving edited rule:", ruleData);
    setShowEditRuleModal(false);
    setSelectedRuleForEdit(null);
  };

  const onABTest = () => {
    console.log("A/B Test clicked");
  };

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
            disabled={selectedCount === 0}
            className={`px-3 py-1.75 flex items-center gap-1.5 text-sm font-medium transition-colors
    ${
      selectedCount === 0
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "bg-white hover:bg-gray-50 text-gray-700"
    }`}
          >
            <Copy className="w-4 h-4" />
            {!compactActions && !ChartOpen && "Duplicate"}
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
          {/* Edit Button */}
          <button
            onClick={onEdit}
            className="px-3 py-1.75 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium flex items-center gap-1.5 transition-colors"
          >
            <Pencil className="w-4 h-4" />
            {!compactActions && !ChartOpen && "Edit"}
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
        {/* <button
          onClick={() => setIsDeleteOpen(true)}
          className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <button className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors">
          <UndoIcon className="w-4 h-4" />
        </button> */}
        <button
          onClick={onABTest}
          className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors"
        >
          <Flask className="w-4 h-4" />
          {!compactActions && !ChartOpen && " A/B test"}
        </button>
        <TagsDropdown />

        {/* More dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowMore(!showMore)}
            className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700  border-gray-300 rounded text-sm font-medium flex items-center gap-2 transition-colors"
          >
            More
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${
                showMore ? "rotate-180" : ""
              }`}
            />
          </button>

          {showMore && (
            <div className="absolute z-50 mt-1 bg-white border border-gray-200 rounded shadow-lg min-w-64 max-h-56 overflow-y-auto py-2">
              {/* Automated rules section */}
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-gray-900 mb-2">
                  Automated rules
                </div>

                <CreateRuleModal />

                <button
                  onClick={handleApplyRule}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center gap-3"
                >
                  <Play className="w-4 h-4" />
                  Apply an existing rule
                </button>

                <button
                  onClick={handleViewActiveRules}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center gap-3"
                >
                  <Eye className="w-4 h-4" />
                  View active rules
                </button>

                <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center gap-3">
                  <Settings className="w-4 h-4" />
                  Manage rules
                  <ExternalLink className="w-3 h-3 ml-auto" />
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-2"></div>

              {/* Import and export section */}
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-gray-900 mb-2">
                  Import and export ad configuration
                </div>

                <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center gap-3">
                  <Upload className="w-4 h-4" />
                  Import Ads in Bulk
                </button>

                <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center gap-3">
                  <FileDown className="w-4 h-4" />
                  Export
                  <ChevronDown className="w-3 h-3 ml-auto rotate-270" />
                </button>

                <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center gap-3">
                  <FileDown className="w-4 h-4" />
                  Download Excel template
                </button>
              </div>

              {/* Divider */}

              {/* Original options */}
            </div>
          )}
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-2 ml-auto">
        <ColumnPreferencesDropdown
          value={filters.columns || "performance"}
          onChange={(newVal) => setFilters({ ...filters, columns: newVal })}
          compactActions={compactActions}
          chartOpen={ChartOpen}
        />

        {/* Updated BreakdownDropdown integration */}
        <BreakdownDropdown
          compactActions={compactActions}
          onSelectionChange={handleBreakdownChange}
          chartOpen={ChartOpen}
        />

        <AdsReportingDropdown>
          <button className="" title="Reports">
            <FileBarChart2 className="w-4 h-4 text-gray-600" />
          </button>
        </AdsReportingDropdown>
        <div className="flex items-center gap-1  p-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors">
          <button className="" title="Export">
            <Download className="w-4 h-4 text-gray-600" />
          </button>
          <ExportDropdown>
            <ChevronDown className="w-4 h-4" />
          </ExportDropdown>
        </div>
        <button
          onClick={onToggleCharts}
          className="p-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors"
          title="Charts"
        >
          <BarChart3 className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
      />
      <div className="">
        <ApplyRuleModal
          isOpen={showApplyRuleModal}
          onClose={() => setShowApplyRuleModal(false)}
          onApply={handleApplySelectedRule}
          onEditRule={handleEditRule}
        />

        <ActiveRulesModal
          isOpen={showActiveRulesModal}
          onClose={() => setShowActiveRulesModal(false)}
          onManageRules={handleManageRules}
        />

        <EditRuleModal
          isOpen={showEditRuleModal}
          onClose={() => setShowEditRuleModal(false)}
          onSave={handleSaveEditedRule}
          ruleData={selectedRuleForEdit}
        />
      </div>
    </div>
  );
}
