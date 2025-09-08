"use client";

import { useState, useRef, useEffect, useMemo } from "react";
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
  columns: customColumns = null,
  isGrouped = true,
  onSort,
  onExport,
  onShare,
  onDelete,
  onDuplicate,
  selectedRows = [],
  onRowSelect,
  onSelectAll,
  onResetColumnWidth,
  onColumnWidthChange,
  resetTrigger = 0
}) {
  const [showMoreDropdown, setShowMoreDropdown] = useState(null);
  const [sortColumn, setSortColumn] = useState("campaign");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});
  const [isResizing, setIsResizing] = useState(false);
  const [resizingColumn, setResizingColumn] = useState(null);
  const [initialWidths, setInitialWidths] = useState({});
  
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

  // Mouse event handlers for column resizing
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing && resizingColumn) {
        const columnElement = document.querySelector(`[data-column="${resizingColumn}"]`);
        if (columnElement) {
          const rect = columnElement.getBoundingClientRect();
          const newWidth = Math.max(50, e.clientX - rect.left);
          setColumnWidths(prev => ({
            ...prev,
            [resizingColumn]: newWidth
          }));
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizingColumn(null);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizingColumn]);

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

  const handleMouseDown = (e, columnKey) => {
    e.preventDefault();
    setIsResizing(true);
    setResizingColumn(columnKey);
  };

  const getColumnWidth = (columnKey) => {
    return columnWidths[columnKey] || parseInt(columns.find(c => c.key === columnKey)?.width || '180');
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

  // Select data based on grouping state
  const getDisplayData = () => {
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      // Template data structure - data is the entire template object
      if (isGrouped && data.groupedData) {
        // Grouped view: show hierarchical data
        return data.groupedData;
      } else if (!isGrouped && data.data) {
        // Ungrouped view: show flat data
        return data.data;
      }
      return data.data || [];
    } else if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return getTableData();
  };

  // Use custom columns if provided, otherwise use default columns
  const columns = customColumns || [
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

  const tableData = useMemo(() => {
    const result = getDisplayData();
    return result;
  }, [data, isGrouped]);

  // Initialize column widths from column definitions
  useEffect(() => {
    if (columns && columns.length > 0) {
      const newWidths = {};
      const newInitialWidths = {};
      columns.forEach(column => {
        const width = parseInt(column.width);
        newWidths[column.key] = width;
        newInitialWidths[column.key] = width;
      });
      setColumnWidths(newWidths);
      setInitialWidths(newInitialWidths);
    }
  }, [columns]);

  // Check if any column width has been changed
  const hasColumnWidthsChanged = useMemo(() => {
    return Object.keys(columnWidths).some(key => 
      columnWidths[key] !== initialWidths[key]
    );
  }, [columnWidths, initialWidths]);

  // Notify parent component when column widths change
  useEffect(() => {
    if (onColumnWidthChange) {
      onColumnWidthChange(hasColumnWidthsChanged);
    }
  }, [hasColumnWidthsChanged, onColumnWidthChange]);

  // Handle reset trigger from parent
  useEffect(() => {
    if (resetTrigger > 0) {
      handleResetColumnWidths();
    }
  }, [resetTrigger]);


  // Reset column widths to initial values
  const handleResetColumnWidths = () => {
    setColumnWidths({...initialWidths});
    if (onResetColumnWidth) {
      onResetColumnWidth();
    }
  };

  // Calculate totals dynamically based on available columns
  const calculateTotals = () => {
    const totals = {};
    
    // Calculate link clicks total
    if (tableData.some(row => row.linkClicks && row.linkClicks !== "—")) {
      totals.linkClicks = tableData.reduce((sum, row) => {
        const clicks = row.linkClicks === "—" ? 0 : parseInt(row.linkClicks || 0);
        return sum + clicks;
      }, 0);
    }
    
    // Calculate post reactions total
    if (tableData.some(row => row.postReactions && row.postReactions !== "—")) {
      totals.postReactions = tableData.reduce((sum, row) => {
        const reactions = row.postReactions === "—" ? 0 : parseInt(row.postReactions || 0);
        return sum + reactions;
      }, 0);
    }
    
    // Calculate post comments total
    if (tableData.some(row => row.postComments && row.postComments !== "—")) {
      totals.postComments = tableData.reduce((sum, row) => {
        const comments = row.postComments === "—" ? 0 : parseInt(row.postComments || 0);
        return sum + comments;
      }, 0);
    }
    
    // Calculate post shares total
    if (tableData.some(row => row.postShares && row.postShares !== "—")) {
      totals.postShares = tableData.reduce((sum, row) => {
        const shares = row.postShares === "—" ? 0 : parseInt(row.postShares || 0);
        return sum + shares;
      }, 0);
    }
    
    return totals;
  };
  
  const totals = calculateTotals();

  // Split columns into fixed and scrollable
  const fixedColumns = columns.slice(0, 3); // Campaign name, Account name, Ad set name
  const scrollableColumns = columns.slice(3); // All other columns
  
  // Calculate total width for scrollable columns
  const scrollableWidth = scrollableColumns.reduce((total, column) => {
    return total + getColumnWidth(column.key);
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
                  data-column={column.key}
                  className={`flex items-center justify-between p-3 border-r border-gray-200 cursor-pointer hover:bg-gray-100 relative group ${
                    selectedHeader === column ? 'bg-blue-50 border-blue-200' : ''
                  } ${isLoading && selectedHeader === column ? 'opacity-75' : ''}`}
                  style={{ width: getColumnWidth(column.key), minWidth: getColumnWidth(column.key) }}
                  onClick={() => handleSort(column.key)}
                >
                  <span className={`text-sm font-medium ${selectedHeader === column ? 'text-blue-700' : 'text-gray-700'} ${column.align === "right" ? "text-right" : ""}`}>
                    {column.label}
                  </span>
                  <div className="flex items-center">
                    {getSortIcon(column.key)}
                    {/* Resize handle */}
                    <div
                      className="absolute right-0 top-0 bottom-0 w-1 bg-transparent hover:bg-blue-400 cursor-col-resize opacity-0 group-hover:opacity-100 transition-opacity"
                      onMouseDown={(e) => handleMouseDown(e, column.key)}
                    />
                  </div>
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
                } ${row.isGroup ? "bg-gray-50 font-medium" : ""}`}
              >
                {fixedColumns.map((column) => (
                  <div
                    key={column.key}
                    className="p-3 border-r border-gray-200 text-sm text-gray-900"
                    style={{ width: getColumnWidth(column.key), minWidth: getColumnWidth(column.key) }}
                  >
                    <div 
                      className={`${column.align === "right" ? "text-right" : ""}`}
                      style={{ 
                        paddingLeft: row.level ? `${row.level * 20}px` : '0px',
                        fontWeight: row.isGroup ? '500' : 'normal'
                      }}
                    >
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
                  style={{ width: getColumnWidth(column.key), minWidth: getColumnWidth(column.key) }}
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
                    data-column={column.key}
                    className={`flex items-center justify-between p-3 border-r border-gray-200 cursor-pointer hover:bg-gray-100 relative group ${
                      selectedHeader === column ? 'bg-blue-50 border-blue-200' : ''
                    } ${isLoading && selectedHeader === column ? 'opacity-75' : ''}`}
                    style={{ width: getColumnWidth(column.key), minWidth: getColumnWidth(column.key) }}
                    onClick={() => handleSort(column.key)}
                  >
                    <span className={`text-sm font-medium ${selectedHeader === column ? 'text-blue-700' : 'text-gray-700'} ${column.align === "right" ? "text-right" : ""}`}>
                      {column.label}
                    </span>
                    <div className="flex items-center">
                      {getSortIcon(column.key)}
                      {/* Resize handle */}
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 bg-transparent hover:bg-blue-400 cursor-col-resize opacity-0 group-hover:opacity-100 transition-opacity"
                        onMouseDown={(e) => handleMouseDown(e, column.key)}
                      />
                    </div>
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
                  } ${row.isGroup ? "bg-gray-50 font-medium" : ""}`}
                >
                  {scrollableColumns.map((column) => (
                    <div
                      key={column.key}
                      className="p-3 border-r border-gray-200 text-sm text-gray-900"
                      style={{ width: getColumnWidth(column.key), minWidth: getColumnWidth(column.key) }}
                    >
                      <div 
                        className={`${column.align === "right" ? "text-right" : ""}`}
                        style={{ 
                          paddingLeft: row.level ? `${row.level * 20}px` : '0px',
                          fontWeight: row.isGroup ? '500' : 'normal'
                        }}
                      >
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
                    style={{ width: getColumnWidth(column.key), minWidth: getColumnWidth(column.key) }}
                  >
                    {column.key === 'linkClicks' && totals.linkClicks !== undefined ? (
                      <div className={`${column.align === "right" ? "text-right" : ""}`}>
                        <div className="font-medium text-gray-700">{totals.linkClicks}</div>
                        <div className="text-xs text-gray-500">Total</div>
                      </div>
                    ) : column.key === 'postReactions' && totals.postReactions !== undefined ? (
                      <div className={`${column.align === "right" ? "text-right" : ""}`}>
                        <div className="font-medium text-gray-700">{totals.postReactions}</div>
                        <div className="text-xs text-gray-500">Total</div>
                      </div>
                    ) : column.key === 'postComments' && totals.postComments !== undefined ? (
                      <div className={`${column.align === "right" ? "text-right" : ""}`}>
                        <div className="font-medium text-gray-700">{totals.postComments}</div>
                        <div className="text-xs text-gray-500">Total</div>
                      </div>
                    ) : column.key === 'postShares' && totals.postShares !== undefined ? (
                      <div className={`${column.align === "right" ? "text-right" : ""}`}>
                        <div className="font-medium text-gray-700">{totals.postShares}</div>
                        <div className="text-xs text-gray-500">Total</div>
                      </div>
                    ) : (
                      <div className={`${column.align === "right" ? "text-right" : ""}`}>
                        <div className="font-medium text-gray-700">—</div>
                        <div className="text-xs text-gray-500">Total</div>
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
