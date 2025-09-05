"use client";

import { useState, useRef, useEffect } from "react";
import { 
  ChevronUp, 
  ChevronDown, 
  MoreHorizontal,
  Download,
  Share,
  Trash2,
  Copy
} from "lucide-react";

export default function PivotTable({ 
  data = [],
  onSort,
  onExport,
  onShare,
  onDelete,
  onDuplicate,
  selectedRows = [],
  onRowSelect,
  onSelectAll
}) {
  const [showMoreDropdown, setShowMoreDropdown] = useState(null);
  const [sortColumn, setSortColumn] = useState("campaign");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState(null);
  
  const moreDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
        setShowMoreDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSort = async (column) => {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    
    // Set loading state and selected header
    setIsLoading(true);
    setSelectedHeader(column);
    setSortColumn(column);
    setSortDirection(newDirection);
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Call parent sort handler
    if (onSort) {
      onSort(column, newDirection);
    }
    
    // Clear loading state
    setIsLoading(false);
    setSelectedHeader(null);
  };

  const handleMoreClick = (rowId, event) => {
    event.stopPropagation();
    setShowMoreDropdown(showMoreDropdown === rowId ? null : rowId);
  };

  const handleRowClick = (rowId) => {
    if (onRowSelect) {
      onRowSelect(rowId);
    }
  };

  const handleSelectAll = () => {
    if (onSelectAll) {
      onSelectAll();
    }
  };

  const getSortIcon = (column) => {
    if (isLoading && selectedHeader === column) {
      return (
        <div className="animate-spin">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full"></div>
        </div>
      );
    }
    
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

  // Sample data matching the image with dynamic sorting
  const getTableData = () => {
    const baseData = [
      {
        id: "1",
        campaign: "DYT - Solar Pa...",
        adSet: "All",
        delivery: "• Inactive Campaign",
        reach: "101",
        impressions: "102",
        frequency: "1.01",
        attributionSetting: "7-day click, 1-d...",
        results: "—",
        amountSpent: "$1.66",
        costPerResult: "—",
        schedule: "—"
      },
      {
        id: "2",
        campaign: "",
        adSet: "DYT - Sol...",
        delivery: "• Not deliveri... Ad set",
        reach: "101",
        impressions: "102",
        frequency: "1.01",
        attributionSetting: "7-day click, 1-d...",
        results: "—",
        amountSpent: "$1.66",
        costPerResult: "—",
        schedule: "27 Ju"
      },
      {
        id: "3",
        campaign: "Bathroom Rem...",
        adSet: "All",
        delivery: "• Inactive Campaign",
        reach: "69",
        impressions: "70",
        frequency: "1.01",
        attributionSetting: "7-day click, 1-d...",
        results: "—",
        amountSpent: "$0.95",
        costPerResult: "—",
        schedule: "—"
      },
      {
        id: "4",
        campaign: "",
        adSet: "Bathroom ...",
        delivery: "• Not deliveri... Ad set",
        reach: "69",
        impressions: "70",
        frequency: "1.01",
        attributionSetting: "7-day click, 1-d...",
        results: "—",
        amountSpent: "$0.95",
        costPerResult: "—",
        schedule: "25 Au"
      }
    ];

    // Apply sorting based on current sort column and direction
    if (sortColumn && sortDirection) {
      return [...baseData].sort((a, b) => {
        let aValue = a[sortColumn];
        let bValue = b[sortColumn];
        
        // Handle numeric values
        if (sortColumn === 'reach' || sortColumn === 'impressions') {
          aValue = parseInt(aValue);
          bValue = parseInt(bValue);
        } else if (sortColumn === 'frequency') {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        } else if (sortColumn === 'amountSpent') {
          aValue = parseFloat(aValue.replace('$', ''));
          bValue = parseFloat(bValue.replace('$', ''));
        }
        
        if (sortDirection === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }
    
    return baseData;
  };

  const tableData = data.length > 0 ? data : getTableData();

  const columns = [
    { key: "campaign", label: "Campaign name", width: "180px" },
    { key: "adSet", label: "Ad set name", width: "180px" },
    { key: "delivery", label: "Delivery", width: "180px" },
    { key: "reach", label: "Reach", width: "120px", align: "right" },
    { key: "impressions", label: "Impressions", width: "140px", align: "right" },
    { key: "frequency", label: "Frequency", width: "120px", align: "right" },
    { key: "attributionSetting", label: "Attribution setting", width: "180px" },
    { key: "results", label: "Results", width: "120px", align: "right" },
    { key: "amountSpent", label: "Amount spent", width: "140px", align: "right" },
    { key: "costPerResult", label: "Cost per result", width: "140px", align: "right" },
    { key: "schedule", label: "Schedule", width: "140px" }
  ];

  // Calculate totals
  const totals = {
    reach: tableData.reduce((sum, row) => sum + parseInt(row.reach), 0),
    impressions: tableData.reduce((sum, row) => sum + parseInt(row.impressions), 0),
    frequency: (tableData.reduce((sum, row) => sum + parseFloat(row.frequency), 0) / tableData.length).toFixed(2),
    amountSpent: tableData.reduce((sum, row) => sum + parseFloat(row.amountSpent.replace('$', '')), 0).toFixed(2)
  };

  // Split columns into fixed and scrollable
  const fixedColumns = columns.slice(0, 2); // Campaign name, Ad set name
  const scrollableColumns = columns.slice(2); // All other columns
  
  // Calculate total width for scrollable columns
  const scrollableWidth = scrollableColumns.reduce((total, column) => {
    return total + parseInt(column.width);
  }, 0);

  return (
    <div className="h-fit bg-white rounded-md">
      <div className="flex h-full">
        {/* Fixed Columns (Campaign name, Ad set name) */}
        <div className="flex-shrink-0 flex flex-col h-full bg-gray-50">
          {/* Fixed Header */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="flex">
              {fixedColumns.map((column) => (
                <div
                  key={column.key}
                  className={`flex items-center justify-between p-3 border-r border-gray-200 cursor-pointer hover:bg-gray-100 ${
                    selectedHeader === column ? 'bg-blue-50 border-blue-200' : ''
                  } ${isLoading && selectedHeader === column ? 'opacity-75' : ''}`}
                  style={{ width: column.width, minWidth: column.width }}
                  onClick={() => handleSort(column.key)}
                >
                  <span className={`text-sm font-medium ${selectedHeader === column ? 'text-blue-700' : 'text-gray-700'} ${column.align === "right" ? "text-right" : ""}`}>
                    {column.label}
                  </span>
                  {getSortIcon(column.key)}
                </div>
              ))}
            </div>
          </div>

          {/* Fixed Body */}
          <div className="bg-white flex-1">
            {tableData.map((row, index) => (
              <div
                key={row.id}
                className={`flex border-b border-gray-200 hover:bg-gray-50 ${
                  selectedRows.includes(row.id) ? "bg-blue-50" : ""
                }`}
              >
                {fixedColumns.map((column) => (
                  <div
                    key={column.key}
                    className="p-3 border-r border-gray-200 text-sm text-gray-900"
                    style={{ width: column.width, minWidth: column.width }}
                  >
                    <div className={`${column.align === "right" ? "text-right" : ""}`}>
                      {row[column.key]}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Fixed Total Row */}
          <div className="bg-gray-50 border-t border-gray-200">
            <div className="flex">
              {fixedColumns.map((column, index) => (
                <div
                  key={column.key}
                  className="py-2 px-3 border-r border-gray-200 text-sm"
                  style={{ width: column.width, minWidth: column.width }}
                >
                  {index === 0 ? (
                    <div>
                      <div className="font-medium text-gray-700">Total results</div>
                      <div className="text-xs text-gray-500">4/4 rows displayed</div>
                    </div>
                  ) : (
                    <div className={`${column.align === "right" ? "text-right" : ""}`}>
                      <div className="font-medium text-gray-700">—</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Columns with Shadow */}
        <div className="flex-1 overflow-auto relative">
          {/* Shadow overlay for visual separation */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-gray-200 to-transparent z-10 pointer-events-none"></div>
          
          <div className="w-full" style={{ minWidth: `${scrollableWidth}px` }}>
            {/* Scrollable Header */}
            <div className="bg-gray-50 border-b border-gray-200">
              <div className="flex">
                {scrollableColumns.map((column) => (
                  <div
                    key={column.key}
                    className={`flex items-center justify-between p-3 border-r border-gray-200 cursor-pointer hover:bg-gray-100 ${
                      selectedHeader === column ? 'bg-blue-50 border-blue-200' : ''
                    } ${isLoading && selectedHeader === column ? 'opacity-75' : ''}`}
                    style={{ width: column.width, minWidth: column.width }}
                    onClick={() => handleSort(column.key)}
                  >
                    <span className={`text-sm font-medium ${selectedHeader === column ? 'text-blue-700' : 'text-gray-700'} ${column.align === "right" ? "text-right" : ""}`}>
                      {column.label}
                    </span>
                    {getSortIcon(column.key)}
                  </div>
                ))}
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="bg-white">
              {tableData.map((row, index) => (
                <div
                  key={row.id}
                  className={`flex border-b border-gray-200 hover:bg-gray-50 ${
                    selectedRows.includes(row.id) ? "bg-blue-50" : ""
                  }`}
                >
                  {scrollableColumns.map((column) => (
                    <div
                      key={column.key}
                      className="p-3 border-r border-gray-200 text-sm text-gray-900"
                      style={{ width: column.width, minWidth: column.width }}
                    >
                      <div className={`${column.align === "right" ? "text-right" : ""}`}>
                        {row[column.key]}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Scrollable Total Row */}
            <div className="bg-gray-50 border-t border-gray-200">
              <div className="flex">
                {scrollableColumns.map((column) => (
                  <div
                    key={column.key}
                    className="py-2 px-3 border-r border-gray-200 text-sm"
                    style={{ width: column.width, minWidth: column.width }}
                  >
                    {column.key === 'reach' ? (
                      <div className={`${column.align === "right" ? "text-right" : ""}`}>
                        <div className="font-medium text-gray-700">{totals.reach}</div>
                        <div className="text-xs text-gray-500">Accounts Cent...</div>
                      </div>
                    ) : column.key === 'impressions' ? (
                      <div className={`${column.align === "right" ? "text-right" : ""}`}>
                        <div className="font-medium text-gray-700">{totals.impressions}</div>
                        <div className="text-xs text-gray-500">Total</div>
                      </div>
                    ) : column.key === 'frequency' ? (
                      <div className={`${column.align === "right" ? "text-right" : ""}`}>
                        <div className="font-medium text-gray-700">{totals.frequency}</div>
                        <div className="text-xs text-gray-500">Per Accounts Centr...</div>
                      </div>
                    ) : column.key === 'attributionSetting' ? (
                      <div>
                        <div className="font-medium text-gray-700">Multiple attrib...</div>
                      </div>
                    ) : column.key === 'results' ? (
                      <div className={`${column.align === "right" ? "text-right" : ""}`}>
                        <div className="font-medium text-gray-700">—</div>
                        <div className="text-xs text-gray-500">Multiple conversi...</div>
                      </div>
                    ) : column.key === 'amountSpent' ? (
                      <div className={`${column.align === "right" ? "text-right" : ""}`}>
                        <div className="font-medium text-gray-700">${totals.amountSpent}</div>
                        <div className="text-xs text-gray-500">Total Spent</div>
                      </div>
                    ) : column.key === 'costPerResult' ? (
                      <div className="text-right">
                        <div className="font-medium text-gray-700">—</div>
                        <div className="text-xs text-gray-500">Multiple con...</div>
                      </div>
                    ) : column.key === 'schedule' ? (
                      <div>
                        <div className="font-medium text-gray-700">—</div>
                        <div className="text-xs text-gray-500">Multiple sched...</div>
                      </div>
                    ) : (
                      <div className={`${column.align === "right" ? "text-right" : ""}`}>
                        <div className="font-medium text-gray-700">—</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
