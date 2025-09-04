"use client";

import { useState, useRef, useEffect } from "react";
import { 
  ArrowUpDown, 
  MoreHorizontal, 
  Table, 
  RotateCcw, 
  Settings, 
  Wrench,
  X,
  Search,
  ChevronDown,
  Plus,
  ChevronUp,
  ChevronDown as ChevronDownIcon,
  Download,
  Share,
  Trash2,
  Copy
} from "lucide-react";
import CustomiseSidebar from "../CustomiseSidebar";

export default function PivotTableSection({ 
  selectedReports = [], 
  onSelectReport, 
  onSelectAll, 
  reportData = [],
  onExport,
  onDelete,
  onShare,
  onDuplicate,
  sharedReports = []
}) {
  const [showCustomiseSidebar, setShowCustomiseSidebar] = useState(false);
  const [filters, setFilters] = useState(["Had delivery"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("This month: 1 Sep 2025 - 3 Sep 2025");
  const [sortColumn, setSortColumn] = useState("lastAccessed");
  const [sortDirection, setSortDirection] = useState("desc");
  const [showSortDropdown, setShowSortDropdown] = useState(null);
  const [showMoreDropdown, setShowMoreDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const moreDropdownRef = useRef(null);

  // Use the reportData prop from parent instead of static data
  const tableData = reportData;

  // Helper function to check if a report is shared
  const isReportShared = (reportId) => {
    return sharedReports.some(shared => shared.reportId === reportId);
  };

  const removeFilter = (filterToRemove) => {
    setFilters(filters.filter(filter => filter !== filterToRemove));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSortDropdown(null);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
        setShowMoreDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSort = (column, direction = null) => {
    if (direction) {
      // Direct sort from dropdown
      setSortColumn(column);
      setSortDirection(direction);
    } else {
      // Toggle sort on header click
      if (sortColumn === column) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortColumn(column);
        setSortDirection("asc");
      }
    }
    setShowSortDropdown(null);
  };

  const handleSortDropdown = (column, event) => {
    event.stopPropagation();
    setShowSortDropdown(showSortDropdown === column ? null : column);
  };

  const getSortIcon = (column) => {
    if (sortColumn !== column) {
      return (
        <div className="flex flex-col">
          <ChevronUp className="w-3 h-3 text-gray-400" />
          <ChevronDownIcon className="w-3 h-3 text-gray-400 -mt-1" />
        </div>
      );
    }
    return sortDirection === "asc" ? 
      <ChevronUp className="w-4 h-4 text-gray-600" /> : 
      <ChevronDownIcon className="w-4 h-4 text-gray-600" />;
  };

  // Sort the reports based on current sort settings
  const sortedReports = [...tableData].sort((a, b) => {
    let aValue = a[sortColumn];
    let bValue = b[sortColumn];
    
    // Handle date sorting
    if (sortColumn === "lastAccessed" || sortColumn === "edited" || sortColumn === "created") {
      aValue = new Date(aValue.split('/').reverse().join('-'));
      bValue = new Date(bValue.split('/').reverse().join('-'));
    }
    
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Use parent's selection handlers
  const handleSelectReport = (reportId) => {
    console.log('PivotTableSection: Selecting report:', reportId);
    if (onSelectReport) {
      onSelectReport(reportId);
    }
  };

  const handleSelectAll = () => {
    console.log('PivotTableSection: Select all clicked');
    if (onSelectAll) {
      onSelectAll();
    }
  };

  // Individual row action handlers - these work directly without selecting checkbox first
  const handleRowExport = (reportId, event) => {
    event.stopPropagation();
    // Work directly with the specific report without selecting it
    if (onExport) {
      onExport([reportId]); // Pass single report ID as array
    }
  };

  const handleRowShare = (reportId, event) => {
    event.stopPropagation();
    // Work directly with the specific report without selecting it
    if (onShare) {
      onShare([reportId]); // Pass single report ID as array
    }
  };

  const handleRowDelete = (reportId, event) => {
    event.stopPropagation();
    // Work directly with the specific report without selecting it
    if (onDelete) {
      onDelete([reportId]); // Pass single report ID as array
    }
    setShowMoreDropdown(null);
  };

  const handleRowDuplicate = (reportId, event) => {
    event.stopPropagation();
    // Work directly with the specific report without selecting it
    if (onDuplicate) {
      onDuplicate([reportId]); // Pass single report ID as array
    }
    setShowMoreDropdown(null);
  };

  const handleMoreDropdown = (reportId, event) => {
    event.stopPropagation();
    setShowMoreDropdown(showMoreDropdown === reportId ? null : reportId);
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Page Filters Bar */}
      {/* <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
           
            {filters.map((filter, index) => (
              <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                <span>{filter}</span>
                <button
                  onClick={() => removeFilter(filter)}
                  className="ml-2 hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search to filter by name, ID or metrics"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
              Clear
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
              {dateRange}
            </button>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div> */}

      {/* Pivot Table Controls */}
      {/* <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg">
            <Table className="w-4 h-4 mr-2" />
            Pivot Table
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
          
          <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900">
            Ungroup Breakdowns
          </button>
          
          <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900">
            <MoreHorizontal className="w-4 h-4" />
          </button>
          
          <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Column Widths
          </button>
          
          <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900">
            <Settings className="w-4 h-4 mr-2" />
            Format
          </button>
          
          <button
            onClick={() => setShowCustomiseSidebar(!showCustomiseSidebar)}
            className={`flex items-center px-3 py-2 rounded-lg ${
              showCustomiseSidebar
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Wrench className="w-4 h-4 mr-2" />
            Customise
          </button>
        </div>
      </div> */}

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Pivot Table */}
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="bg-gray-50 border-b border-gray-200">
                <div className="grid grid-cols-[auto_2fr_1fr_1fr_1fr] gap-4 px-4 py-3 text-sm font-medium text-gray-700">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedReports.length === tableData.length && tableData.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between relative">
                    <span>Report name</span>
                    <button
                      onClick={(e) => handleSortDropdown("name", e)}
                      className="flex items-center ml-2"
                    >
                      {getSortIcon("name")}
                    </button>
                    {showSortDropdown === "name" && (
                      <div ref={dropdownRef} className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px]">
                        <button
                          onClick={() => handleSort("name", "asc")}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <ChevronUp className="w-4 h-4" />
                          <span>Ascending</span>
                        </button>
                        <button
                          onClick={() => handleSort("name", "desc")}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <ChevronDownIcon className="w-4 h-4" />
                          <span>Descending</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between relative">
                    <span>Last accessed</span>
                    <button
                      onClick={(e) => handleSortDropdown("lastAccessed", e)}
                      className="flex items-center ml-2"
                    >
                      {getSortIcon("lastAccessed")}
                    </button>
                    {showSortDropdown === "lastAccessed" && (
                      <div ref={dropdownRef} className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px]">
                        <button
                          onClick={() => handleSort("lastAccessed", "asc")}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <ChevronUp className="w-4 h-4" />
                          <span>Ascending</span>
                        </button>
                        <button
                          onClick={() => handleSort("lastAccessed", "desc")}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <ChevronDownIcon className="w-4 h-4" />
                          <span>Descending</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between relative">
                    <span>Edited</span>
                    <button
                      onClick={(e) => handleSortDropdown("edited", e)}
                      className="flex items-center ml-2"
                    >
                      {getSortIcon("edited")}
                    </button>
                    {showSortDropdown === "edited" && (
                      <div ref={dropdownRef} className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px]">
                        <button
                          onClick={() => handleSort("edited", "asc")}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <ChevronUp className="w-4 h-4" />
                          <span>Ascending</span>
                        </button>
                        <button
                          onClick={() => handleSort("edited", "desc")}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <ChevronDownIcon className="w-4 h-4" />
                          <span>Descending</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between relative">
                    <span>Created</span>
                    <button
                      onClick={(e) => handleSortDropdown("created", e)}
                      className="flex items-center ml-2"
                    >
                      {getSortIcon("created")}
                    </button>
                    {showSortDropdown === "created" && (
                      <div ref={dropdownRef} className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px]">
                        <button
                          onClick={() => handleSort("created", "asc")}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <ChevronUp className="w-4 h-4" />
                          <span>Ascending</span>
                        </button>
                        <button
                          onClick={() => handleSort("created", "desc")}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <ChevronDownIcon className="w-4 h-4" />
                          <span>Descending</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {sortedReports.map((report, index) => (
                  <div key={report.id} className={`grid grid-cols-[auto_2fr_1fr_1fr_1fr] gap-4 px-4 py-3 text-sm hover:bg-gray-50 group ${selectedReports.includes(report.id) ? 'bg-blue-50' : ''}`}>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedReports.includes(report.id)}
                        onChange={() => {
                          console.log('PivotTableSection: Checkbox clicked for report:', report.id);
                          handleSelectReport(report.id);
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          {report.name}
                          {isReportShared(report.id) && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Share className="w-3 h-3 mr-1" />
                              Shared
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {report.account}
                        </div>
                      </div>
                      
                      {/* Hover Actions - Show after Report name */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={(e) => handleRowExport(report.id, e)}
                          className="p-1 hover:bg-gray-200 rounded"
                          title="Export"
                        >
                          <Download className="w-4 h-4 text-gray-600" />
                        </button>
                        
                        <button
                          onClick={(e) => handleRowShare(report.id, e)}
                          className="p-1 hover:bg-gray-200 rounded"
                          title="Share"
                        >
                          <Share className="w-4 h-4 text-gray-600" />
                        </button>
                        
                        <div className="relative" ref={moreDropdownRef}>
                          <button
                            onClick={(e) => handleMoreDropdown(report.id, e)}
                            className="p-1 hover:bg-gray-200 rounded"
                            title="More options"
                          >
                            <MoreHorizontal className="w-4 h-4 text-gray-600" />
                          </button>
                          
                          {/* More Actions Dropdown */}
                          {showMoreDropdown === report.id && (
                            <div 
                              className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px]" 
                              style={{ display: 'block' }}
                              onMouseDown={(e) => e.stopPropagation()}
                            >
                              <button
                                onMouseDown={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  handleRowDuplicate(report.id, e);
                                }}
                                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 cursor-pointer"
                                style={{ pointerEvents: 'auto' }}
                              >
                                <Copy className="w-4 h-4" />
                                <span>Duplicate</span>
                              </button>
                              <button
                                onMouseDown={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  handleRowDelete(report.id, e);
                                }}
                                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-red-600 cursor-pointer"
                                style={{ pointerEvents: 'auto' }}
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-900">{report.lastAccessed}</div>
                    </div>
                    <div>
                      <div className="text-gray-900">{report.edited}</div>
                    </div>
                    <div>
                      <div className="text-gray-900">{report.created}</div>
                      <div className="text-sm text-gray-500">by {report.creator}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Table Footer */}
              <div className="bg-gray-50 border-t border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div>Total results {tableData.length}/{tableData.length} rows displayed</div>
                  <div className="flex items-center space-x-6">
                    <div>Reports</div>
                    <div>{tableData.length} Total</div>
                    <div>All reports</div>
                    <div>Multiple dates</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customise Sidebar */}
        {showCustomiseSidebar && (
          <CustomiseSidebar onClose={() => setShowCustomiseSidebar(false)} />
        )}
      </div>
    </div>
  );
}
