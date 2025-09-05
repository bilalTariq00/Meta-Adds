"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUpDown, MoreHorizontal, Download, Share, ChevronUp, ChevronDown, Trash2, Copy } from "lucide-react";
import PivotTableSection from "../sections/PivotTableSection";
import TrendSection from "../sections/TrendSection";
import BarChartSection from "../sections/BarChartSection";


export default function ReportsPage({ searchQuery, selectedReports, onSelectReport, onSelectAll, currentLayout, onExport, onDelete, onShare, onDuplicate, reportData, sharedReports }) {
  const [sortColumn, setSortColumn] = useState("lastAccessed");
  const [sortDirection, setSortDirection] = useState("desc");
  const [showSortDropdown, setShowSortDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Use the reportData prop from parent instead of static data
  const reportsData = reportData || [];

  // Action handlers - just call parent handlers since we're using static data
  const handleDelete = () => {
    // Call parent handler
    if (onDelete) onDelete();
  };

  const handleDuplicate = () => {
    // Call parent handler
    if (onDuplicate) onDuplicate();
  };

  const handleExport = () => {
    const selectedData = reportsData.filter(report => selectedReports.includes(report.id));
    console.log('Exporting reports:', selectedData);
    // Call parent handler
    if (onExport) onExport();
  };

  const handleShare = () => {
    const selectedData = reportsData.filter(report => selectedReports.includes(report.id));
    console.log('Sharing reports:', selectedData);
    // Call parent handler
    if (onShare) onShare();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSortDropdown(null);
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
          <ChevronDown className="w-3 h-3 text-gray-400 -mt-1" />
        </div>
      );
    }
    return sortDirection === "asc" ? 
      <ChevronUp className="w-4 h-4 text-gray-600" /> : 
      <ChevronDown className="w-4 h-4 text-gray-600" />;
  };

  // Sort the reports based on current sort settings
  const sortedReports = [...reportsData].sort((a, b) => {
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

  const renderContent = () => {
    switch (currentLayout) {
      case "pivot-table":
        return <PivotTableSection 
          selectedReports={selectedReports}
          onSelectReport={onSelectReport}
          onSelectAll={onSelectAll}
          reportData={reportsData}
          onExport={onExport}
          onDelete={onDelete}
          onShare={onShare}
          onDuplicate={onDuplicate}
          sharedReports={sharedReports}
        />;
      case "trend":
        return <TrendSection />;
      case "bar-chart":
        return <BarChartSection />;
      default:
        return (
          <div className="p-6">


            {/* Simple Reports Table */}
            <div className="bg-white border border-gray-200 overflow-x-auto">
              {/* Table Header */}
              <div className="px-6 py-3 border-b border-gray-200 bg-gray-50 relative">
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <div className="w-8">
                    <input
                      type="checkbox"
                      checked={selectedReports.length === reportsData.length && reportsData.length > 0}
                      onChange={onSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex-1 flex items-center justify-between relative">
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
                          <ChevronDown className="w-4 h-4" />
                          <span>Descending</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="w-32 flex items-center justify-between relative">
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
                          <ChevronDown className="w-4 h-4" />
                          <span>Descending</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="w-32 flex items-center justify-between relative">
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
                          <ChevronDown className="w-4 h-4" />
                          <span>Descending</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="w-32 flex items-center justify-between relative">
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
                          <ChevronDown className="w-4 h-4" />
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
                  <div key={report.id} className={`px-6 py-3 hover:bg-gray-50 group ${selectedReports.includes(report.id) ? 'bg-blue-50' : ''}`}>
                    <div className="flex items-center text-sm">
                      <div className="w-8">
                        <input
                          type="checkbox"
                          checked={selectedReports.includes(report.id)}
                          onChange={() => {
                            console.log('Checkbox clicked for report:', report.id);
                            onSelectReport(report.id);
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex-1 flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">
                            {report.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {report.account}
                          </div>
                        </div>
                        
                        {/* Hover Actions - Show after Report name */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExport([report.id]);
                            }}
                            className="p-1 hover:bg-gray-200 rounded" 
                            title="Export"
                          >
                            <Download className="w-4 h-4 text-gray-600" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare([report.id]);
                            }}
                            className="p-1 hover:bg-gray-200 rounded" 
                            title="Share"
                          >
                            <Share className="w-4 h-4 text-gray-600" />
                          </button>
                          <div className="relative">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                // Toggle dropdown logic would go here
                              }}
                              className="p-1 hover:bg-gray-200 rounded" 
                              title="More actions"
                            >
                              <MoreHorizontal className="w-4 h-4 text-gray-600" />
                            </button>
                            {/* More Actions Dropdown */}
                            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDuplicate([report.id]);
                                }}
                                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                              >
                                <Copy className="w-4 h-4" />
                                <span>Duplicate</span>
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete([report.id]);
                                }}
                                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-32">
                        <div className="text-gray-900">{report.lastAccessed}</div>
                      </div>
                      <div className="w-32">
                        <div className="text-gray-900">{report.edited}</div>
                      </div>
                      <div className="w-32">
                        <div className="text-gray-900">{report.created}</div>
                        <div className="text-sm text-gray-500">by {report.creator}</div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 overflow-x-auto overflow-y-auto">
      {renderContent()}
    </div>
  );
}
