"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  Download,
  ChevronDown,
  X,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Copy,
  Share,
  MoreHorizontal,
} from "lucide-react";
import ReportsPage from "./pages/ReportsPage";
import ExportPage from "./pages/ExportPage";
import ExportModal from "./modals/ExportModal";
import DeleteModal from "./modals/DeleteModal";
import DuplicateModal from "./modals/DuplicateModal";
import ShareModal from "./modals/ShareModal";

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
const filterModalData = {
  "Report name": {
    type: "text",
    options: ["contains", "does not contain"],
  },
  "Ad account": {
    type: "select",
    options: ["is", "is not"],
  },
};

// Mock data structure based on the images
const searchData = {
  recent: ["Report name contains test", "Ad account is Adkin Digital"],
  popular: [
    "Report name contains test",
    "Ad account is Adkin Digital",
    "Created date is Last 7 days",
    "Last accessed is Today",
  ],
  categories: {
    Performance: [
      "Report name",
      "Ad account",
      "Created date",
      "Last accessed",
      "Views",
      "Downloads",
    ],
    Engagement: ["Views", "Shares", "Downloads", "Exports"],
    Conversions: ["Export count", "Share count", "View count"],
  },
  filters: [
    "Report name",
    "Ad account",
    "Created date",
    "Last accessed",
    "Created by",
    "Report type",
  ],
};

// Filter Modal Component
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
  const [tempCondition, setTempCondition] = useState(condition || "contains");
  const [tempValue, setTempValue] = useState("");
  const [showConditionDropdown, setShowConditionDropdown] = useState(false);

  const filterConfig = filterModalData[type] || {
    type: "text",
    options: [],
  };
  const { type: modalType, options } = filterConfig;

  useEffect(() => {
    setTempSelected(selectedValues);
    setTempCondition(condition || "contains");
  }, [selectedValues, condition]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        conditionDropdownRef.current &&
        !conditionDropdownRef.current.contains(event.target)
      ) {
        setShowConditionDropdown(false);
      }
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

  const handleApply = () => {
    if (tempValue.trim()) {
      onApply([tempValue], tempCondition);
    }
  };

  if (!isOpen || !type) return null;

  return (
    <div
      ref={modalRef}
      className="absolute bg-white border border-gray-300 rounded-lg shadow-lg z-50"
      style={{
        width: "500px",
        maxHeight: "500px",
        top: position?.top || 0,
        left: position?.left || 0,
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
              className="border border-blue-500 bg-blue-50 rounded px-3 py-1.5 text-sm bg-white flex items-center gap-2 min-w-[120px] justify-between"
            >
              <span>{tempCondition}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Condition Dropdown Menu */}
            {showConditionDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-60">
                {options.map((option, index) => (
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

          {/* Value Input */}
          <input
            type="text"
            placeholder={
              type === "Report name" ? "Enter report name" : "Select accounts"
            }
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="flex-1 px-3 py-1.5 border border-blue-200 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
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
          Apply
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
    const filtersWithModals = ["Report name", "Ad account"];

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

  // Main dropdown view - Only show 2 filter options
  const renderMainView = () => (
    <div className="max-h-96 overflow-y-auto">
      <div className="p-3">
        <div
          onClick={() => handleSelectItem("Report name")}
          className="py-3 px-3 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 rounded flex items-center justify-between border-b border-gray-100"
        >
          <span>Report name</span>
          <ChevronRight className="w-4 h-4" />
        </div>
        <div
          onClick={() => handleSelectItem("Ad account")}
          className="py-3 px-3 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 rounded flex items-center justify-between"
        >
          <span>Ad account</span>
          <ChevronRight className="w-4 h-4" />
        </div>
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

  return (
    <div ref={dropdownRef}>
      {currentView === "main" && renderMainView()}
      {currentView === "performance" && renderCategoryView("performance")}
      {currentView === "engagement" && renderCategoryView("engagement")}
      {currentView === "conversions" && renderCategoryView("conversions")}
    </div>
  );
}

export default function MainReportsContainer({
  activeView,
  currentLayout,
  onChooseLayout,
  onNavigateToExports,
  onNavigateToReports,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReports, setSelectedReports] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterModal, setFilterModal] = useState({
    isOpen: false,
    type: null,
    selectedValues: [],
    position: { top: 0, left: 0 },
    condition: "contains",
  });

  // Modal states
  const [exportModal, setExportModal] = useState({ isOpen: false });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false });
  const [duplicateModal, setDuplicateModal] = useState({ isOpen: false });
  const [shareModal, setShareModal] = useState({ isOpen: false });

  // Share state management
  const [sharedReports, setSharedReports] = useState([]);
  const [shareHistory, setShareHistory] = useState([]);

  // Export state management
  const [exportHistory, setExportHistory] = useState([]);

  const inputRef = useRef(null);

  // Report data state - this will be the source of truth
  const [reportData, setReportData] = useState([
    { 
      id: "1", 
      name: "Untitled report", 
      account: "1 ad account", 
      lastAccessed: "19/08/2025",
      edited: "19/08/2025",
      created: "19/08/2025",
      creator: "Muhammad Bilal" 
    },
    { 
      id: "2", 
      name: "Untitled report", 
      account: "1 ad account", 
      lastAccessed: "19/08/2025",
      edited: "19/08/2025",
      created: "19/08/2025",
      creator: "Muhammad Bilal" 
    },
    { 
      id: "3", 
      name: "Untitled report", 
      account: "1 ad account", 
      lastAccessed: "19/08/2025",
      edited: "19/08/2025",
      created: "19/08/2025",
      creator: "Muhammad Bilal" 
    },
    { 
      id: "4", 
      name: "Untitled report", 
      account: "1 ad account", 
      lastAccessed: "02/09/2025",
      edited: "02/09/2025",
      created: "02/09/2025",
      creator: "Muhammad Bilal" 
    },
    { 
      id: "5", 
      name: "Untitled report", 
      account: "1 ad account", 
      lastAccessed: "02/09/2025",
      edited: "02/09/2025",
      created: "02/09/2025",
      creator: "Muhammad Bilal" 
    },
    { 
      id: "6", 
      name: "Untitled report", 
      account: "1 ad account", 
      lastAccessed: "02/09/2025",
      edited: "02/09/2025",
      created: "02/09/2025",
      creator: "Muhammad Bilal" 
    },
    { 
      id: "7", 
      name: "Untitled report", 
      account: "1 ad account", 
      lastAccessed: "02/09/2025",
      edited: "02/09/2025",
      created: "02/09/2025",
      creator: "Muhammad Bilal" 
    },
    { 
      id: "8", 
      name: "Untitled report", 
      account: "1 ad account", 
      lastAccessed: "02/09/2025",
      edited: "02/09/2025",
      created: "02/09/2025",
      creator: "Muhammad Bilal" 
    },
    { 
      id: "9", 
      name: "Untitled report", 
      account: "1 ad account", 
      lastAccessed: "03/09/2025",
      edited: "03/09/2025",
      created: "03/09/2025",
      creator: "Muhammad Bilal" 
    },
  ]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSelectReport = (reportId) => {
    console.log("Selecting report:", reportId);
    setSelectedReports((prev) => {
      const newSelection = prev.includes(reportId)
        ? prev.filter((id) => id !== reportId)
        : [...prev, reportId];
      console.log("New selection:", newSelection);
      return newSelection;
    });
  };

  const handleSelectAll = () => {
    console.log("Select all clicked");
    setSelectedReports((prev) => {
      const newSelection =
        prev.length === reportData.length ? [] : reportData.map(report => report.id);
      console.log("New selection (all):", newSelection);
      return newSelection;
    });
  };

  const handleSelectFilter = (filter, position = null) => {
    // Check if this filter should open a modal
    const filtersWithModals = ["Report name", "Ad account"];

    if (filtersWithModals.includes(filter)) {
      // Use the position from the dropdown if provided, otherwise calculate it
      let modalPosition = position;
      if (!modalPosition) {
        // Calculate position below the search bar
        const searchBar = document.querySelector(".relative");
        if (searchBar) {
          const rect = searchBar.getBoundingClientRect();
          modalPosition = {
            top: rect.bottom + window.scrollY + 10,
            left: rect.left + window.scrollX,
          };
        }
      }

      setFilterModal({
        isOpen: true,
        type: filter,
        selectedValues: [],
        position: modalPosition || { top: 100, left: 100 },
        condition: filter === "Report name" ? "contains" : "is",
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

  const handleFilterModalApply = (selectedValues, condition = "contains") => {
    if (selectedValues.length > 0) {
      const filterLabel = `${filterModal.type} ${condition} ${selectedValues[0]}`;
      if (!selectedFilters.includes(filterLabel)) {
        setSelectedFilters((prev) => [...prev, filterLabel]);
      }
    }

    setFilterModal({
      isOpen: false,
      type: null,
      selectedValues: [],
      position: { top: 0, left: 0 },
      condition: "contains",
    });
  };

  const handleFilterModalCancel = () => {
    setFilterModal({
      isOpen: false,
      type: null,
      selectedValues: [],
      position: { top: 0, left: 0 },
      condition: "contains",
    });
  };

  const handleFilterModalClose = () => {
    setFilterModal({
      isOpen: false,
      type: null,
      selectedValues: [],
      position: { top: 0, left: 0 },
      condition: "contains",
    });
  };

  // Action handlers for selected reports
  const handleExport = (reportIds = null) => {
    const reportsToUse = reportIds || selectedReports;
    if (reportsToUse.length === 0) return;
    
    // If it's a single report from hover action, temporarily set it as selected
    if (reportIds && reportIds.length === 1) {
      setSelectedReports(reportIds);
    }
    
    setExportModal({ isOpen: true });
  };

  const handleDelete = (reportIds = null) => {
    const reportsToUse = reportIds || selectedReports;
    if (reportsToUse.length === 0) return;
    
    // If it's a single report from hover action, temporarily set it as selected
    if (reportIds && reportIds.length === 1) {
      setSelectedReports(reportIds);
    }
    
    setDeleteModal({ isOpen: true });
  };

  const handleShare = (reportIds = null) => {
    const reportsToUse = reportIds || selectedReports;
    if (reportsToUse.length === 0) return;
    
    // If it's a single report from hover action, temporarily set it as selected
    if (reportIds && reportIds.length === 1) {
      setSelectedReports(reportIds);
    }
    
    setShareModal({ isOpen: true });
  };

  const handleDuplicate = (reportIds = null) => {
    const reportsToUse = reportIds || selectedReports;
    if (reportsToUse.length === 0) return;
    
    // If it's a single report from hover action, temporarily set it as selected
    if (reportIds && reportIds.length === 1) {
      setSelectedReports(reportIds);
    }
    
    setDuplicateModal({ isOpen: true });
  };

  // Modal action handlers
  const handleExportConfirm = (exportData) => {
    const reportsToExport = reportData.filter(report => 
      exportData.reportIds.includes(report.id)
    );

    // Create export data based on format
    let exportContent = '';
    let mimeType = '';
    let fileExtension = '';

    switch (exportData.format) {
      case 'csv':
        exportContent = generateCSV(reportsToExport, exportData.includeSummary);
        mimeType = 'text/csv';
        fileExtension = 'csv';
        break;
      case 'formatted':
      case 'raw':
      default:
        exportContent = generateExcel(reportsToExport, exportData.includeSummary, exportData.format === 'formatted');
        mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        fileExtension = 'xlsx';
        break;
    }

    // Create and download file
    const blob = new Blob([exportContent], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${exportData.name}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    // Add to export history
    const newExport = {
      id: Date.now().toString(),
      name: `${exportData.name}.${fileExtension}`,
      type: "Report",
      date: new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: "ready",
      progress: false,
      expiresIn: "30 days"
    };
    setExportHistory(prev => [newExport, ...prev]);
  };

  // Helper function to generate CSV content
  const generateCSV = (reports, includeSummary) => {
    const headers = ['Report Name', 'Account', 'Last Accessed', 'Edited', 'Created', 'Creator'];
    let csvContent = headers.join(',') + '\n';
    
    reports.forEach(report => {
      const row = [
        `"${report.name}"`,
        `"${report.account}"`,
        `"${report.lastAccessed}"`,
        `"${report.edited}"`,
        `"${report.created}"`,
        `"${report.creator}"`
      ];
      csvContent += row.join(',') + '\n';
    });

    if (includeSummary) {
      csvContent += '\n';
      csvContent += `"Total Reports","${reports.length}","","","",""`;
    }

    return csvContent;
  };

  // Helper function to generate Excel content (simplified - in real app you'd use a library like xlsx)
  const generateExcel = (reports, includeSummary, formatted) => {
    // This is a simplified implementation
    // In a real application, you would use a library like 'xlsx' to create proper Excel files
    const headers = ['Report Name', 'Account', 'Last Accessed', 'Edited', 'Created', 'Creator'];
    let content = headers.join('\t') + '\n';
    
    reports.forEach(report => {
      const row = [
        report.name,
        report.account,
        report.lastAccessed,
        report.edited,
        report.created,
        report.creator
      ];
      content += row.join('\t') + '\n';
    });

    if (includeSummary) {
      content += '\n';
      content += `Total Reports\t${reports.length}\t\t\t\t`;
    }

    return content;
  };

  const handleDeleteConfirm = (reportIds) => {
    // Remove reports from the data state
    setReportData(prevData => 
      prevData.filter(report => !reportIds.includes(report.id))
    );
    
    // Clear selection after deletion
    setSelectedReports([]);
  };

  const handleDuplicateConfirm = (reportIds, newName) => {
    // Get the reports to duplicate
    const reportsToDuplicate = reportData.filter(report => 
      reportIds.includes(report.id)
    );

    // Create new reports with updated names and IDs
    const duplicatedReports = reportsToDuplicate.map((report, index) => {
      const newId = Math.max(...reportData.map(r => parseInt(r.id))) + index + 1;
      const currentDate = new Date().toLocaleDateString('en-GB');
      
      return {
        ...report,
        id: newId.toString(),
        name: reportIds.length === 1 ? newName : `${newName} ${index + 1}`,
        created: currentDate,
        edited: currentDate,
        lastAccessed: currentDate
      };
    });

    // Add duplicated reports to the data state
    setReportData(prevData => [...prevData, ...duplicatedReports]);
    
    // Clear selection after duplication
    setSelectedReports([]);
  };

  const handleExportHistory = () => {
    if (onNavigateToExports) {
      onNavigateToExports();
    }
  };

  const handleShareConfirm = (shareData) => {
    // Add to shared reports
    const newSharedReports = shareData.reportIds.map(reportId => ({
      reportId,
      shareLink: shareData.shareLink,
      outsideSharing: shareData.outsideSharing,
      sharedAt: shareData.timestamp
    }));
    
    setSharedReports(prev => [...prev, ...newSharedReports]);
    
    // Add to share history
    setShareHistory(prev => [...prev, {
      id: Date.now().toString(),
      reportIds: shareData.reportIds,
      shareLink: shareData.shareLink,
      outsideSharing: shareData.outsideSharing,
      sharedAt: shareData.timestamp,
      reportNames: shareData.reportIds.map(id => {
        const report = reportData.find(r => r.id === id);
        return report ? report.name : `Report ${id}`;
      })
    }]);

    console.log('Reports shared:', {
      reportIds: shareData.reportIds,
      shareLink: shareData.shareLink,
      outsideSharing: shareData.outsideSharing
    });
  };

  return (
    <>
      {/* Only show search bar and action buttons for Reports view */}
      {activeView === "reports" && (
    <>
      <div className="pb-4">
        <div className="relative">
          {/* Main Search Bar */}
          <div className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1">
                {/* Applied filter chips */}
                {selectedFilters.map((filter, i) => (
                  <Chip
                    key={i}
                    label={filter}
                    onRemove={() => removeFilter(filter)}
                  />
                ))}

                {/* Search input (30% width - always visible and clickable) */}
                <div
                  className={`w-[30%] cursor-pointer rounded-lg transition-all duration-200 ${
                    showDropdown
                      ? "border-2 border-blue-500 bg-blue-50"
                      : "border border-transparent hover:border-gray-300"
                  }`}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <input
                    type="text"
                    placeholder="Search to filter by name, ID or metrics"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={handleInputFocus}
                    className="w-full bg-transparent border-none outline-none text-sm cursor-pointer px-3 "
                    ref={inputRef}
                    readOnly={!showDropdown}
                  />
                </div>
              </div>

              {/* Clear button */}
              {selectedFilters.length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearAllFilters();
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 ml-2"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Search Dropdown - positioned below the 30% search input */}
          {showDropdown && (
            <div
              className="absolute top-full w-[30%] mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              style={{
                left: "16px", // Account for container padding
                transform: `translateX(${selectedFilters.length * 120}px)`, // Adjust based on badges
              }}
            >
              <SearchDropdown
                isOpen={showDropdown}
                onClose={() => setShowDropdown(false)}
                onSelectFilter={handleSelectFilter}
                inputRef={inputRef}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col rounded-md bg-white overflow-auto ">
        {/* Action Buttons */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between whitespace-nowrap ">
            {/* Left side - Create Report + Action buttons when selected */}
            <div className="flex items-center gap-3 ">
                <button
                  onClick={onChooseLayout}
                  className="flex items-center px-4 py-2 bg-green-800 text-white rounded-sm hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Report
                </button>

              {/* Action buttons when reports are selected */}
                  {selectedReports.length > 0 && (
                <>
                  <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-3 py-1.5 border border-gray-300   rounded-md hover:text-gray-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-3  py-1.5 border border-gray-300 rounded-md hover:text-gray-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                  <button
                    onClick={handleDuplicate}
                    className="flex items-center gap-2 px-3 py-1.5 border border-gray-300  rounded-md hover:text-gray-700 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    Duplicate
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-3 py-1.5 border border-gray-300  rounded-md hover:text-gray-700 transition-colors"
                  >
                    <Share className="w-4 h-4" />
                    Share
                  </button>
                </>
              )}
            </div>

            {/* Right side - Export History */}
            <div>
                  <button 
                    onClick={handleExportHistory}
                    className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                  <Download className="w-4 h-4 mr-2" />
                  Export History
                </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-x-auto overflow-y-auto">
            <ReportsPage
              searchQuery={searchQuery}
              selectedReports={selectedReports}
              onSelectReport={handleSelectReport}
              onSelectAll={handleSelectAll}
              currentLayout={currentLayout}
              onExport={handleExport}
              onDelete={handleDelete}
              onShare={handleShare}
              onDuplicate={handleDuplicate}
                reportData={reportData}
                sharedReports={sharedReports}
            />
        </div>
          </div>
        </>
      )}

      {/* For Exports view, render ExportPage directly without any wrapper */}
      {activeView === "exports" && <ExportPage exportHistory={exportHistory} onNavigateToReports={onNavigateToReports} />}

        {/* Filter Modal */}
        <FilterModal
          isOpen={filterModal.isOpen}
          type={filterModal.type}
          selectedValues={filterModal.selectedValues}
          position={filterModal.position}
          onApply={handleFilterModalApply}
          onCancel={handleFilterModalCancel}
          onClose={handleFilterModalClose}
        />

      {/* Export Modal */}
      <ExportModal
        isOpen={exportModal.isOpen}
        onClose={() => setExportModal({ isOpen: false })}
        onExport={handleExportConfirm}
        selectedReports={selectedReports}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false })}
        onConfirm={handleDeleteConfirm}
        selectedReports={selectedReports}
        reportData={reportData}
      />

      {/* Duplicate Modal */}
      <DuplicateModal
        isOpen={duplicateModal.isOpen}
        onClose={() => setDuplicateModal({ isOpen: false })}
        onDuplicate={handleDuplicateConfirm}
        selectedReports={selectedReports}
        reportData={reportData}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModal.isOpen}
        onClose={() => setShareModal({ isOpen: false })}
        selectedReports={selectedReports}
        reportData={reportData}
        onShareConfirm={handleShareConfirm}
      />
    </>
  );
}
