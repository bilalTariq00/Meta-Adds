"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { createPortal } from "react-dom";
import {
  ChevronDown,
  Edit,
  Copy,
  Trash2,
  MoreHorizontal,
  Pin,
  Clock,
  RotateCcw,
  BarChart3,
  GitCompare,
  Plus,
  Trash,
  Settings,
  ArrowLeft,
  Bookmark,
  Filter,
  ArrowUp,
  ArrowDown,
  MoveRight,
} from "lucide-react";
import CustomiseColumnsModal from "./dialoges/customise-columns-modal";
import AttributionModal from "./dialoges/AttributionModal";

// Sample data for different tabs
export const campaignsSeed = [
  {
    id: "c1",
    name: "DYT - Home Improvement US Campaign",
    delivery: "Off",
    actions: "—",
    bidStrategy: "Highest volume",
    budget: "Using campaign...",
    attribution: "7-day click, 1-...",
    results: "—",
    reach: 2776,
    impressions: 2877,
    costPerResult: "—",
    amountSpent: 19.93,
    ends: "Ongoing",
    lastEdit: "20 Aug 2025, 22:30",
    editTime: "2 days ago",
    resultType: "Website view content",
    on: false,
    hadDelivery: true,
    active: true,
  },
  {
    id: "c2",
    name: "Auto Insurance Leads - AFDTFB",
    delivery: "Off",
    actions: "—",
    bidStrategy: "Highest volume",
    budget: "Using campaign...",
    attribution: "7-day click, 1-...",
    results: "—",
    reach: 321,
    impressions: 330,
    costPerResult: "—",
    amountSpent: 0.75,
    ends: "Ongoing",
    lastEdit: "13 Aug 2025, 20:15",
    editTime: "9 days ago",
    resultType: "Website view content",
    on: false,
    hadDelivery: true,
    active: false,
  },
  {
    id: "c3",
    name: "Cruises Around The World - AFD",
    delivery: "Off",
    actions: "—",
    bidStrategy: "Highest volume",
    budget: "Using campaign...",
    attribution: "7-day click, 1-...",
    results: "—",
    reach: 134,
    impressions: 135,
    costPerResult: "—",
    amountSpent: 2.1,
    ends: "Ongoing",
    lastEdit: "11 Aug 2025, 21:10",
    editTime: "11 days ago",
    resultType: "Website lead",
    on: false,
    hadDelivery: true,
    active: false,
  },
  {
    id: "c4",
    name: "DYT - Solar Panel",
    delivery: "Off",
    actions: "—",
    bidStrategy: "Highest volume",
    budget: "Using campaign...",
    attribution: "7-day click, 1-...",
    results: "—",
    reach: 668,
    impressions: 700,
    costPerResult: "—",
    amountSpent: 8.34,
    ends: "Ongoing",
    lastEdit: "12 Aug 2025, 22:...",
    editTime: "10 days ago",
    resultType: "Website lead",
    on: false,
    hadDelivery: false,
    active: true,
  },
];

export const adsetsSeed = [
  {
    id: "s1",
    name: "Auto Insurance Leads - AFDTFB",
    delivery: "Off",
    actions: "—",
    bidStrategy: "Highest volume",
    budget: "Using campaign...",
    attribution: "7-day click, 1-...",
    results: "—",
    reach: 321,
    impressions: 330,
    costPerResult: "—",
    amountSpent: 0.75,
    ends: "Ongoing",
    lastEdit: "13 Aug 2025, 20:...",
    editTime: "9 days ago",
    schedule: "13 Aug 2025—Ongoing",
    resultType: "Website view content",
    on: false,
  },
  {
    id: "s2",
    name: "Cruises Around The World - AFD",
    delivery: "Off",
    actions: "—",
    bidStrategy: "Highest volume",
    budget: "Using campaign...",
    attribution: "7-day click, 1-...",
    results: "—",
    reach: 134,
    impressions: 135,
    costPerResult: "—",
    amountSpent: 2.1,
    ends: "Ongoing",
    lastEdit: "11 Aug 2025, 21:10",
    editTime: "11 days ago",
    schedule: "11 Aug 2025—Ongoing",
    resultType: "Website lead",
    on: false,
  },
  {
    id: "s3",
    name: "DYT - Solar Panel",
    delivery: "Off",
    actions: "—",
    bidStrategy: "Highest volume",
    budget: "Using campaign...",
    attribution: "7-day click, 1-...",
    results: "—",
    reach: 668,
    impressions: 700,
    costPerResult: "—",
    amountSpent: 8.74,
    ends: "Ongoing",
    lastEdit: "27 Jul 2025—Ongoing",
    editTime: "10 days ago",
    schedule: "27 Jul 2025—Ongoing",
    resultType: "Website lead",
    on: false,
  },
  {
    id: "s4",
    name: "20-65 USA FB Feeds only - DYT Home Impr...",
    delivery: "Off",
    actions: "—",
    bidStrategy: "Highest volume",
    budget: "Using campaign...",
    attribution: "7-day click, 1-...",
    results: "—",
    reach: 2776,
    impressions: 2877,
    costPerResult: "—",
    amountSpent: 20.17,
    ends: "Ongoing",
    lastEdit: "26 Jul 2025—Ongoing",
    editTime: "2 days ago",
    schedule: "26 Jul 2025—Ongoing",
    resultType: "Website view content",
    on: false,
  },
];

export const adsSeed = [
  {
    id: "a1",
    name: "DYT Home Improvement",
    delivery: "Off",
    actions: "—",
    adSetName: "20-65 USA FB Feeds only - ...",
    bidStrategy: "Highest volume",
    budget: "Using campaign...",
    lastEdit: "20 Aug 2025, 22:...",
    editTime: "2 days ago",
    attribution: "7-day click, 1-...",
    results: "—",
    reach: 2776,
    impressions: 2913,
    costPerResult: 13,
    amountSpent: 20.17,
    ends: "Ongoing",
    resultType: "Website view content",
    thumbnail:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=60&h=60&fit=crop&crop=center",
    on: false,
  },
  {
    id: "a2",
    name: "DYT - Solar Panel",
    delivery: "Off",
    actions: "—",
    adSetName: "DYT - Solar Panel",
    bidStrategy: "Highest volume",
    budget: "Using campaign...",
    lastEdit: "12 Aug 2025, 22:...",
    editTime: "10 days ago",
    attribution: "7-day click, 1-...",
    results: "—",
    reach: 668,
    impressions: 726,
    costPerResult: 26,
    amountSpent: 8.74,
    ends: "Ongoing",
    resultType: "Website lead",
    thumbnail:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=60&h=60&fit=crop&crop=center",
    on: false,
  },
  {
    id: "a3",
    name: "Auto Insurance Leads - AFDTFB",
    delivery: "Off",
    actions: "—",
    adSetName: "Auto Insurance Leads - AFD...",
    bidStrategy: "Highest volume",
    budget: "Using campaign...",
    lastEdit: "13 Aug 2025, 20:...",
    editTime: "9 days ago",
    attribution: "7-day click, 1-...",
    results: "—",
    reach: 321,
    impressions: 330,
    costPerResult: 30,
    amountSpent: 0.75,
    ends: "Ongoing",
    resultType: "Website view content",
    thumbnail:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=60&h=60&fit=crop&crop=center",
    on: false,
  },
  {
    id: "a4",
    name: "Cruises Around The World - AFD",
    delivery: "Off",
    actions: "—",
    adSetName: "Cruises Around The World - ...",
    bidStrategy: "Highest volume",
    budget: "Using campaign...",
    lastEdit: "11 Aug 2025, 21:10",
    editTime: "11 days ago",
    attribution: "7-day click, 1-...",
    results: "—",
    reach: 134,
    impressions: 135,
    costPerResult: 35,
    amountSpent: 2.1,
    ends: "Ongoing",
    resultType: "Website lead",
    thumbnail:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=60&h=60&fit=crop&crop=center",
    on: false,
  },
];

// Add Column Modal Component
function AddColumnModal({ isOpen, onClose, onAddColumn, afterColumn }) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const popularColumns = [
    { id: 'purchases', label: 'Purchases' },
    { id: 'purchase-roas', label: 'Purchase ROAS (return on ad spend)' },
    { id: 'link-clicks', label: 'Link clicks' },
    { id: 'ctr', label: 'CTR (all)' },
    { id: 'frequency', label: 'Frequency' },
  ];

  const handleColumnSelect = (columnId) => {
    onAddColumn(columnId, afterColumn);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000]">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-80 max-h-[400px] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h2 className="text-sm font-semibold text-gray-900">
            Add column after
          </h2>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="text-sm font-semibold text-gray-900 mb-3">Popular</div>
          <div className="space-y-2">
            {popularColumns.map((column) => (
              <button
                key={column.id}
                className="flex items-center gap-3 w-full text-left p-2 hover:bg-gray-100 rounded"
                onClick={() => handleColumnSelect(column.id)}
              >
                <input
                  type="radio"
                  name="column"
                  className="w-4 h-4"
                  readOnly
                />
                <span className="text-sm text-gray-700">{column.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => {
              // Open customise columns modal
              onClose();
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
          >
            <Settings className="w-4 h-4" />
            Customise columns
          </button>
        </div>
      </div>
    </div>
  );
}

// Remove Column Confirmation Modal
function RemoveColumnModal({ isOpen, onClose, onConfirm, columnName }) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000]">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-80"
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-900">
            Remove column
          </h2>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-sm text-gray-700">
            Are you sure you want to remove the "{columnName}" column?
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

// Campaign Header Dropdown Component (First Image)
function CampaignHeaderDropdown({ isOpen, onClose, onFilterChange, onSortChange, onMoreFilters, position }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickFilters = [
    { id: 'ad-changed', label: 'Ad changed is betwe...', icon: Clock },
    { id: 'had-delivery-1', label: 'Had delivery', icon: Bookmark },
    { id: 'had-delivery-2', label: 'Had delivery', icon: Bookmark },
    { id: 'campaign', label: 'Campaign', icon: Filter },
  ];

  const sortOptions = [
    { id: 'sort-a-z', label: 'Sort A to Z', icon: ArrowUp },
    { id: 'sort-z-a', label: 'Sort Z to A', icon: ArrowDown },
    { id: 'errors', label: 'Errors' },
    { id: 'changed', label: 'Changed' },
  ];

  return createPortal(
    <div
      ref={dropdownRef}
      className="fixed bg-white border border-gray-200 max-h-[250px] overflow-y-auto rounded-md shadow-lg py-2 min-w-[200px] z-[9999]"
      style={{
        top: position?.top || 0,
        left: position?.left || 0,
      }}
    >
      {/* Quick filters section */}
      <div className="px-3 py-2">
        <div className="text-sm font-bold text-gray-900 mb-2">Quick filters</div>
        {quickFilters.map((filter) => (
          <button
            key={filter.id}
            className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded whitespace-nowrap"
            onClick={() => onFilterChange(filter.id)}
          >
            <filter.icon className="w-4 h-4" />
            {filter.label}
          </button>
        ))}
        <button
          className="text-blue-600 text-sm hover:underline px-2 py-1 whitespace-nowrap"
          onClick={onMoreFilters}
        >
          More Filters
        </button>
      </div>

      {/* Separator */}
      <div className="border-t border-gray-200 my-1"></div>

      {/* Sort options section */}
      <div className="px-3 py-2">
        <div className="text-sm font-bold text-gray-900 mb-2">Sort by</div>
        {sortOptions.map((option) => (
          <button
            key={option.id}
            className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded whitespace-nowrap"
            onClick={() => onSortChange(option.id)}
          >
            {option.icon && <option.icon className="w-4 h-4" />}
            {option.label}
          </button>
        ))}
      </div>
    </div>,
    document.body
  );
}

// Column Header Dropdown Component (Second Image)
function ColumnHeaderDropdown({ isOpen, onClose, columnKey, position, onColumnAction, onOpenCustomiseModal, onOpenAttributionModal, hasPriority, columnIndex, totalColumns }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const columnActions = [
    ...(columnIndex > 0 ? [{ id: 'move-left', label: 'Move left', icon: ArrowLeft }] : []),
    { id: 'move-right', label: 'Move right', icon: MoveRight },
    { id: 'add-column-after', label: 'Add column after', icon: Plus },
    { id: 'remove-column', label: 'Remove column', icon: Trash },
    { id: 'customise-columns', label: 'Customise columns', icon: Settings },
  ];

  const handleAction = (actionId) => {
    if (actionId === 'customise-columns') {
      onOpenCustomiseModal();
    } else if (actionId === 'compare-attribution') {
      onOpenAttributionModal();
    } else {
      onColumnAction(columnKey, actionId);
    }
    onClose();
  };

  return createPortal(
    <div
      ref={dropdownRef}
      className="fixed bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-[160px] z-[9999]"
      style={{
        top: position?.top || 0,
        left: position?.left || 0,
      }}
    >
      {columnActions.map((action) => (
        <button
          key={action.id}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
          onClick={() => handleAction(action.id)}
        >
          <action.icon className="w-4 h-4" />
          {action.label}
        </button>
      ))}
      
      {/* Priority sorting options */}
      {hasPriority && (
        <>
          <div className="border-t border-gray-200 my-1"></div>
          <button
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
            onClick={() => handleAction('sort-high-priority')}
          >
            <ArrowUp className="w-4 h-4" />
            High priority
          </button>
          <button
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
            onClick={() => handleAction('sort-low-priority')}
          >
            <ArrowDown className="w-4 h-4" />
            Low priority
          </button>
          <div className="border-t border-gray-200 my-1"></div>
        </>
      )}
      
      {/* Filters option */}
      <button
        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
        onClick={() => handleAction('filters')}
      >
        <Filter className="w-4 h-4" />
        Filters
      </button>
      
      {/* Compare attribution setting */}
      {columnKey === 'attribution' && (
        <>
          <div className="border-t border-gray-200 my-1"></div>
          <button
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
            onClick={() => handleAction('compare-attribution')}
          >
            <Settings className="w-4 h-4" />
            Compare attribution setting
          </button>
        </>
      )}
    </div>,
    document.body
  );
}

export default function CampaignTable({
  query,
  selectedIds,
  onSelectionChange,
  duplicatedItems = [],
  onViewCharts,
  onEdit,
  onDuplicate,
  onCompare,
  onViewHistory,
  dateRange = null,
}) {
  const [campaigns, setCampaigns] = useState(campaignsSeed);
  const [adsets, setAdsets] = useState(adsetsSeed);
  const [ads, setAds] = useState(adsSeed);
  const [loading, setLoading] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [pinnedItems, setPinnedItems] = useState(new Set());
  const [headerDropdownOpen, setHeaderDropdownOpen] = useState(null);
  const [headerDropdownPosition, setHeaderDropdownPosition] = useState(null);
  const [tableFilters, setTableFilters] = useState({
    quickFilters: [],
    sortBy: null,
    sortDirection: 'asc'
  });
  const [showCustomiseModal, setShowCustomiseModal] = useState(false);
  const [showAttributionModal, setShowAttributionModal] = useState(false);
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);
  const [showRemoveColumnModal, setShowRemoveColumnModal] = useState(false);
  const [columnToRemove, setColumnToRemove] = useState(null);
  const [columnToAddAfter, setColumnToAddAfter] = useState(null);
  const [columnOrder, setColumnOrder] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(new Set());
  const [customColumns, setCustomColumns] = useState([]);
  const [attributionSettings, setAttributionSettings] = useState({
    window: "7_day_click_1_day_view",
    model: "last_click",
  });
  const [skAdNetworkSettings, setSkAdNetworkSettings] = useState({
    window: "7_day_click_1_day_view",
    model: "last_click",
  });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(t);
  }, [query.search, query.filters, query.activeTab]);

  const data = useMemo(() => {
    const q = (query.search || "").toLowerCase();
    const f = query.filters || {};

    // Get base data and add duplicated items
    let baseData = [];
    if (query.activeTab === "adsets") {
      baseData = [...adsets];
    } else if (query.activeTab === "ads") {
      baseData = [...ads];
    } else {
      baseData = [...campaigns];
    }

    // Add duplicated items to the base data
    const allData = [...baseData, ...duplicatedItems];

    // Apply search filter
    let filtered = allData.filter((r) => r.name.toLowerCase().includes(q));
    
    // Apply other filters for campaigns
    if (query.activeTab === "campaigns") {
      if (f.hadDelivery) filtered = filtered.filter((r) => r.hadDelivery);
      if (f.active) filtered = filtered.filter((r) => r.active);
    }
    
    // Apply table filters from CampaignHeaderDropdown
    if (tableFilters.quickFilters.length > 0) {
      filtered = filtered.filter((item) => {
        return tableFilters.quickFilters.some(filterId => {
          switch (filterId) {
            case 'ad-changed':
              // Filter for items that have been changed recently
              return item.lastEdit && new Date(item.lastEdit) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            case 'had-delivery-1':
            case 'had-delivery-2':
              // Filter for items that had delivery
              return item.hadDelivery || item.delivery === 'On';
            case 'campaign':
              // Filter for campaign type items
              return query.activeTab === 'campaigns';
            default:
              return true;
          }
        });
      });
    }
    
    // Apply sorting from CampaignHeaderDropdown
    if (tableFilters.sortBy) {
      filtered = filtered.sort((a, b) => {
        let comparison = 0;
        
        switch (tableFilters.sortBy) {
          case 'sort-a-z':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'sort-z-a':
            comparison = b.name.localeCompare(a.name);
            break;
          case 'errors':
            // Sort by items with errors first
            comparison = (b.errors || 0) - (a.errors || 0);
            break;
          case 'changed':
            // Sort by recently changed items first
            const aDate = new Date(a.lastEdit || 0);
            const bDate = new Date(b.lastEdit || 0);
            comparison = bDate - aDate;
            break;
          default:
            comparison = 0;
        }
        
        return tableFilters.sortDirection === 'desc' ? -comparison : comparison;
      });
    }
    
    // Apply date range filter if provided
    if (dateRange && dateRange.range !== "maximum") {
      filtered = filtered.filter((item) => {
        // For demo purposes, we'll filter based on lastEdit date
        // In a real app, you'd filter based on actual date fields
        const itemDate = new Date(item.lastEdit);
        const startDate = new Date(dateRange.startDate);
        const endDate = new Date(dateRange.endDate);
        
        return itemDate >= startDate && itemDate <= endDate;
      });
    }
    
    // Sort to put pinned items at the top
    const sorted = filtered.sort((a, b) => {
      const aPinned = pinnedItems.has(a.id);
      const bPinned = pinnedItems.has(b.id);
      
      if (aPinned && !bPinned) return -1; // a comes first
      if (!aPinned && bPinned) return 1;  // b comes first
      return 0; // maintain original order for non-pinned items
    });
    
    return sorted;
  }, [campaigns, adsets, ads, duplicatedItems, query, pinnedItems, dateRange, tableFilters]);

  const toggleSelect = (id) => {
    const exists = selectedIds.includes(id);
    const newIds = exists
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];

    // Find the actual rows that are selected
    const selectedRows = data.filter((row) => newIds.includes(row.id));

    // Check if ANY selected row has toggle on
    const anyToggleOn = selectedRows.some((row) => row.on);

    onSelectionChange(newIds, anyToggleOn);
  };

  const handlePin = (item) => {
    setPinnedItems(prev => {
      const newPinned = new Set(prev);
      if (newPinned.has(item.id)) {
        newPinned.delete(item.id); // Unpin if already pinned
      } else {
        newPinned.add(item.id); // Pin if not pinned
      }
      return newPinned;
    });
  };

  // Header dropdown handlers
  const handleHeaderDropdownClick = (headerKey, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    
    // Calculate position for dropdown
    const position = {
      top: rect.bottom + window.scrollY + 5,
      left: rect.left + window.scrollX
    };
    
    setHeaderDropdownOpen(headerKey);
    setHeaderDropdownPosition(position);
  };

  const handleFilterChange = (filterId) => {
    setTableFilters(prev => ({
      ...prev,
      quickFilters: prev.quickFilters.includes(filterId) 
        ? prev.quickFilters.filter(id => id !== filterId)
        : [...prev.quickFilters, filterId]
    }));
    
    // Close dropdown after selection
    setHeaderDropdownOpen(null);
  };

  const handleSortChange = (sortId) => {
    setTableFilters(prev => ({
      ...prev,
      sortBy: sortId,
      sortDirection: sortId === prev.sortBy && prev.sortDirection === 'asc' ? 'desc' : 'asc'
    }));
    
    // Close dropdown after selection
    setHeaderDropdownOpen(null);
  };

  const handleMoreFilters = () => {
    // This would open the top search bar - for now just close dropdown
    setHeaderDropdownOpen(null);
    // In a real implementation, you'd trigger the search bar to open
  };

  const handleColumnAction = (columnKey, actionId) => {
    switch (actionId) {
      case 'move-left':
        // Move column to the left
        moveColumn(columnKey, 'left');
        break;
      case 'move-right':
        // Move column to the right
        moveColumn(columnKey, 'right');
        break;
      case 'remove-column':
        // Show confirmation modal for removing column
        setColumnToRemove(columnKey);
        setShowRemoveColumnModal(true);
        break;
      case 'add-column-after':
        // Show add column modal
        setColumnToAddAfter(columnKey);
        setShowAddColumnModal(true);
        break;
      case 'sort-high-priority':
        // Sort by high priority
        setTableFilters(prev => ({
          ...prev,
          sortBy: `${columnKey}-high-priority`,
          sortDirection: 'asc'
        }));
        break;
      case 'sort-low-priority':
        // Sort by low priority
        setTableFilters(prev => ({
          ...prev,
          sortBy: `${columnKey}-low-priority`,
          sortDirection: 'desc'
        }));
        break;
      case 'filters':
        // Open filter modal for this column
        console.log(`Open filters for ${columnKey}`);
        break;
      default:
        break;
    }
  };

  const moveColumn = (columnKey, direction) => {
    setColumnOrder(prev => {
      // If no order is set, initialize with base column order
      if (prev.length === 0) {
        const baseColumns = getBaseColumns();
        prev = [...baseColumns.map(col => col.key), ...customColumns.map(col => col.key)];
      }
      
      const currentIndex = prev.indexOf(columnKey);
      if (currentIndex === -1) return prev;
      
      const newOrder = [...prev];
      if (direction === 'right' && currentIndex < newOrder.length - 1) {
        // Swap with next column
        [newOrder[currentIndex], newOrder[currentIndex + 1]] = [newOrder[currentIndex + 1], newOrder[currentIndex]];
      } else if (direction === 'left' && currentIndex > 0) {
        // Swap with previous column
        [newOrder[currentIndex], newOrder[currentIndex - 1]] = [newOrder[currentIndex - 1], newOrder[currentIndex]];
      }
      return newOrder;
    });
  };

  const handleAddColumn = (columnId, afterColumn) => {
    const newColumn = {
      key: columnId,
      label: getColumnLabel(columnId),
      sortable: true,
      width: "120px"
    };
    
    // Add to custom columns
    setCustomColumns(prev => [...prev, newColumn]);
    
    // Update column order to insert after the specified column
    setColumnOrder(prev => {
      if (prev.length === 0) {
        // Initialize with base column order
        const baseColumns = getBaseColumns();
        prev = [...baseColumns.map(col => col.key), ...customColumns.map(col => col.key)];
      }
      
      const afterIndex = prev.indexOf(afterColumn);
      if (afterIndex === -1) {
        // If afterColumn not found, add to end
        return [...prev, columnId];
      }
      
      // Insert after the specified column
      const newOrder = [...prev];
      newOrder.splice(afterIndex + 1, 0, columnId);
      return newOrder;
    });
    
    console.log(`Added column ${columnId} after ${afterColumn}`);
  };

  const handleRemoveColumn = () => {
    if (columnToRemove) {
      setCustomColumns(prev => prev.filter(col => col.key !== columnToRemove));
      setVisibleColumns(prev => {
        const newSet = new Set(prev);
        newSet.delete(columnToRemove);
        return newSet;
      });
      
      // Remove from column order
      setColumnOrder(prev => prev.filter(key => key !== columnToRemove));
      
      console.log(`Removed column ${columnToRemove}`);
    }
  };

  const getColumnLabel = (columnId) => {
    const labels = {
      'purchases': 'Purchases',
      'purchase-roas': 'Purchase ROAS',
      'link-clicks': 'Link clicks',
      'ctr': 'CTR (all)',
      'frequency': 'Frequency'
    };
    return labels[columnId] || columnId;
  };

  const handleAttributionChange = (key, value) => {
    setAttributionSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSKAdNetworkChange = (key, value) => {
    setSkAdNetworkSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleOn = (id) => {
    const updateAndNotify = (updateFn) => {
      updateFn((prev) => {
        const updated = prev.map((r) =>
          r.id === id ? { ...r, on: !r.on } : r
        );

        // After updating, check if any selected rows have toggle on
        if (selectedIds.length > 0) {
          const selectedRows = updated.filter((row) =>
            selectedIds.includes(row.id)
          );
          const anyToggleOn = selectedRows.some((row) => row.on);

          // Trigger selection change to update modal state
          onSelectionChange(selectedIds, anyToggleOn);
        }

        return updated;
      });
    };

    if (query.activeTab === "campaigns") {
      updateAndNotify(setCampaigns);
    } else if (query.activeTab === "adsets") {
      updateAndNotify(setAdsets);
    } else if (query.activeTab === "ads") {
      updateAndNotify(setAds);
    }
  };

  const isCampaigns = query.activeTab === "campaigns";
  const isAdsets = query.activeTab === "adsets";
  const isAds = query.activeTab === "ads";

  // Define columns for each tab
  // Define base columns for each tab
  const getBaseColumns = () => {
    if (isCampaigns) {
      return [
        { key: "delivery", label: "Delivery", sortable: true, width: "110px", hasPriority: true },
        { key: "actions", label: "Actions", sortable: false, width: "90px" },
        {
          key: "bidStrategy",
          label: "Bid strategy",
          sortable: true,
          width: "140px",
        },
        { key: "budget", label: "Budget", sortable: true, width: "150px", hasPriority: true },
        {
          key: "attribution",
          label: "Attribution setting",
          sortable: true,
          width: "160px",
        },
        { key: "results", label: "Results", sortable: true, width: "90px" },
        { key: "reach", label: "Reach", sortable: true, width: "90px" },
        {
          key: "impressions",
          label: "Impressions",
          sortable: true,
          width: "110px",
        },
        {
          key: "costPerResult",
          label: "Cost per result",
          sortable: true,
          width: "130px",
        },
        {
          key: "amountSpent",
          label: "Amount spent",
          sortable: true,
          width: "120px",
        },
        { key: "ends", label: "Ends", sortable: true, width: "90px" },
      ];
    } else if (isAdsets) {
      return [
        { key: "delivery", label: "Delivery", sortable: true, width: "110px" },
        { key: "actions", label: "Actions", sortable: false, width: "90px" },
        {
          key: "bidStrategy",
          label: "Bid strategy",
          sortable: true,
          width: "140px",
        },
        { key: "budget", label: "Budget", sortable: true, width: "150px" },
        {
          key: "lastEdit",
          label: "Last significant edit",
          sortable: true,
          width: "180px",
        },
        {
          key: "attribution",
          label: "Attribution setting",
          sortable: true,
          width: "160px",
        },
        { key: "results", label: "Results", sortable: true, width: "90px" },
        { key: "reach", label: "Reach", sortable: true, width: "90px" },
        {
          key: "impressions",
          label: "Impressions",
          sortable: true,
          width: "110px",
        },
        {
          key: "costPerResult",
          label: "Cost per result",
          sortable: true,
          width: "130px",
        },
        {
          key: "amountSpent",
          label: "Amount spent",
          sortable: true,
          width: "120px",
        },
        { key: "ends", label: "Ends", sortable: true, width: "90px" },
        { key: "schedule", label: "Schedule", sortable: true, width: "150px" },
      ];
    } else if (isAds) {
      return [
        { key: "delivery", label: "Delivery", sortable: true, width: "110px" },
        { key: "actions", label: "Actions", sortable: false, width: "90px" },
        {
          key: "adSetName",
          label: "Ad set name",
          sortable: true,
          width: "180px",
        },
        {
          key: "bidStrategy",
          label: "Bid strategy",
          sortable: true,
          width: "140px",
        },
        { key: "budget", label: "Budget", sortable: true, width: "150px" },
        {
          key: "lastEdit",
          label: "Last significant edit",
          sortable: true,
          width: "180px",
        },
        {
          key: "attribution",
          label: "Attribution setting",
          sortable: true,
          width: "160px",
        },
        { key: "results", label: "Results", sortable: true, width: "90px" },
        { key: "reach", label: "Reach", sortable: true, width: "90px" },
        {
          key: "impressions",
          label: "Impressions",
          sortable: true,
          width: "110px",
        },
        {
          key: "costPerResult",
          label: "Cost per result",
          sortable: true,
          width: "130px",
        },
        {
          key: "amountSpent",
          label: "Amount spent",
          sortable: true,
          width: "120px",
        },
        { key: "ends", label: "Ends", sortable: true, width: "90px" },
      ];
    }
    return [];
  };

  // Define columns for each tab with ordering
  const getColumns = () => {
    const baseColumns = getBaseColumns();
    const allColumns = [...baseColumns, ...customColumns];
    
    // Apply column ordering if specified
    if (columnOrder.length > 0) {
      const orderedColumns = [];
      const remainingColumns = [...allColumns];
      
      // Add columns in the specified order
      columnOrder.forEach(key => {
        const columnIndex = remainingColumns.findIndex(col => col.key === key);
        if (columnIndex !== -1) {
          orderedColumns.push(remainingColumns.splice(columnIndex, 1)[0]);
        }
      });
      
      // Add remaining columns
      orderedColumns.push(...remainingColumns);
      return orderedColumns;
    }
    
    return allColumns;
  };

  const columns = getColumns();

  const renderCellContent = (item, column) => {
    const value = item[column.key];

    switch (column.key) {
      // case "thumbnail":
      //   return isAds && value ? (
      //     <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
      //       <img
      //         src={value}
      //         alt="Ad thumbnail"
      //         className="w-full h-full object-cover"
      //       />
      //     </div>
      //   ) : null;
      case "delivery":
        return (
          <div className="flex items-center gap-1">
            <span className="text-fb-gray-700">{value}</span>
            <ChevronDown className="w-3 h-3 text-fb-gray-400" />
          </div>
        );
      case "actions":
        return <span className="text-fb-gray-700">{value}</span>;
      case "bidStrategy":
        return <span className="text-fb-gray-700">{value}</span>;
      case "budget":
        return <span className="text-fb-gray-700">{value}</span>;
      case "lastEdit":
        return (
          <div>
            <div className="text-fb-gray-700">{value}</div>
            <div className="text-xs text-fb-gray-500">{item.editTime}</div>
          </div>
        );
      case "attribution":
        return <span className="text-fb-gray-700">{value}</span>;
      case "results":
        return <span className="text-fb-gray-700">{value}</span>;
      case "reach":
        return (
          <span className="text-fb-gray-700">
            {value?.toLocaleString() || "—"}
          </span>
        );
      case "impressions":
        return (
          <span className="text-fb-gray-700">
            {value?.toLocaleString() || "—"}
          </span>
        );
      case "costPerResult":
        return (
          <div>
            <span className="text-fb-gray-700">
              {typeof value === "number" ? value : "—"}
            </span>
            {typeof value === "number" && (
              <div className="text-xs text-fb-gray-500">
                Per {item.resultType?.split(" ")[1] || "result"}
              </div>
            )}
          </div>
        );
      case "amountSpent":
        return <span className="text-fb-gray-700">${value}</span>;
      case "ends":
        return <span className="text-fb-gray-700">{value}</span>;
      case "schedule":
        return <span className="text-fb-gray-700">{value}</span>;
      case "adSetName":
        return (
          <span className="text-fb-blue hover:underline cursor-pointer">
            {value}
          </span>
        );
      default:
        return <span className="text-fb-gray-700">{value}</span>;
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-sm text-fb-gray-500">
        Loading data…
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden  rounded bg-background">
      {/* Fixed container for sticky columns and scrollable content */}
      <div className="flex h-full">
        {/* Fixed columns: checkbox, toggle, and name */}
        <div className="flex-shrink-0 bg-background border-r border-table-border border-gray-200 ">
          {/* Fixed header */}
          <div className="bg-table-header border-b border-table-border  border-gray-200 h-10 flex">
            <div className="w-12 px-3 py-2 flex items-center justify-center border-r  border-table-border  border-gray-200 ">
              <input
                type="checkbox"
                className="rounded border-fb-gray-300"
                checked={selectedIds.length === data.length && data.length > 0}
                onChange={(e) => {
                  if (e.target.checked) {
                    onSelectionChange(data.map((item) => item.id));
                  } else {
                    onSelectionChange([]);
                  }
                }}
              />
            </div>
            <div className="w-16 px-3 py-2 text-sm font-medium text-fb-gray-700 flex items-center border-r  border-table-border border-gray-200">
              Off/On
              <ChevronDown className="w-3 h-3 ml-2 text-fb-gray-400" />
            </div>
            <div
              className={`px-3 py-2 text-sm font-medium text-fb-gray-700 flex items-center relative ${
                isAds ? "w-72" : "w-80"
              }`}
              style={{ zIndex: 10 }}
            >
              <button
                className="flex items-center w-full text-left"
                onClick={(e) => handleHeaderDropdownClick('campaign', e)}
              >
                {isCampaigns ? "Campaign" : isAdsets ? "Ad set" : "Ad"}
                <ChevronDown className="w-3 h-3 ml-2 text-fb-gray-400" />
              </button>
              
              {/* Campaign Header Dropdown */}
              {isCampaigns && headerDropdownOpen === 'campaign' && (
                <CampaignHeaderDropdown
                  isOpen={true}
                  onClose={() => setHeaderDropdownOpen(null)}
                  onFilterChange={handleFilterChange}
                  onSortChange={handleSortChange}
                  onMoreFilters={handleMoreFilters}
                  position={headerDropdownPosition}
                />
              )}
            </div>
            {isAds && (
              <div className="w-10 px-3 py-2 text-sm font-medium text-fb-gray-700"></div>
            )}
          </div>

          {/* Fixed rows */}
          <div className="overflow-y-auto ">
            {data.map((item, index) => (
              <div
                key={item.id}
                className={`h-16 flex border-b border-table-border border-gray-200 relative ${
                  index % 2 === 0 ? "bg-background" : "bg-table-row-even"
                } ${
                  hoveredRow === item.id
                    ? "bg-blue-50"
                    : "hover:bg-table-row-hover"
                }`}
                onMouseEnter={() => setHoveredRow(item.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <div className="w-12 px-3 py-2 flex items-center justify-center  border-r  border-table-border border-gray-200">
                  <input
                    type="checkbox"
                    className="rounded border-fb-gray-300"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => {
                      const exists = selectedIds.includes(item.id);
                      const newIds = exists
                        ? selectedIds.filter((x) => x !== item.id)
                        : [...selectedIds, item.id];

                      // Find the actual rows that are selected
                      const selectedRows = data.filter((row) =>
                        newIds.includes(row.id)
                      );

                      // Check if ANY selected row has toggle on
                      const anyToggleOn = selectedRows.some((row) => row.on);

                      // console.log("Selection Debug:", {
                      //   newIds,
                      //   selectedRows: selectedRows.map((r) => ({
                      //     id: r.id,
                      //     name: r.name,
                      //     on: r.on,
                      //   })),
                      //   anyToggleOn,
                      // });

                      onSelectionChange(newIds, anyToggleOn);
                    }}
                  />
                </div>
                <div className="w-16 px-3 py-2 flex items-center  border-r  border-table-border border-gray-200 ">
                  <button
                    onClick={() => toggleOn(item.id)}
                    className={`w-9 h-5.5 rounded-full border border-gray-200 relative transition-colors ${
                      item.on ? "bg-toggle-on" : "bg-toggle-off"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 p-1 ${
                        item.on
                          ? "right-0.5  bg-blue-500"
                          : "left-0.5 bg-gray-700"
                      }  w-4 h-4 bg-background rounded-full transition-all shadow-sm`}
                    />
                  </button>
                </div>
                <div
                  className={`px-3 py-2 flex items-center ${
                    isAds ? "w-72" : "w-80"
                  }`}
                >
                  {isAds && (
                    <div className="w-13  flex items-center justify-center">
                      {item.thumbnail && (
                        <div className="w-10 h-10 overflow-hidden bg-gray-100 flex items-center justify-center">
                          <img
                            src={item.thumbnail}
                            alt="Ad thumbnail"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex flex-col justify-center flex-1">
                    <div className="text-fb-blue hover:underline cursor-pointer text-sm font-medium truncate flex items-center gap-1">
                      {pinnedItems.has(item.id) && (
                        <Pin className="w-3 h-3 text-blue-600 flex-shrink-0" />
                      )}
                      {item.name}
                    </div>
                    <div className="text-xs text-fb-gray-500 flex">
                      {item.resultType}
                      {hoveredRow === item.id && (
                        <div className="flex items-center gap-1 ml-2">
                          <button
                            className="p-1 hover:bg-blue-100 rounded text-gray-600"
                            title="View charts"
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewCharts?.(item);
                            }}
                          >
                            <BarChart3 className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1 hover:bg-blue-100 rounded text-gray-600"
                            title="Edit"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit?.(item);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1 hover:bg-blue-100 rounded text-gray-600"
                            title="Duplicate"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDuplicate?.(item);
                            }}
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1 hover:bg-blue-100 rounded text-gray-600"
                            title="Compare"
                            onClick={(e) => {
                              e.stopPropagation();
                              onCompare?.(item);
                            }}
                          >
                            <GitCompare className="w-4 h-4" />
                          </button>
                          <div className="relative">
                            <button
                              className="p-1 hover:bg-blue-100 rounded text-gray-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDropdownOpen(
                                  dropdownOpen === item.id ? null : item.id
                                );
                              }}
                              title="More options"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                            {dropdownOpen === item.id && (
                              <div
                                className={`absolute right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-[140px] z-50 ${
                                  index >= data.length - 2
                                    ? "bottom-full mb-1"
                                    : "top-full"
                                }`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button 
                                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePin(item);
                                    setDropdownOpen(null);
                                  }}
                                >
                                  <Pin className="w-4 h-4" />
                                  {pinnedItems.has(item.id) ? "Unpin" : "Pin"}
                                </button>
                                <button 
                                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onViewHistory?.(item);
                                    setDropdownOpen(null);
                                  }}
                                >
                                  <Clock className="w-4 h-4" />
                                  View history
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover Actions - positioned within the name cell */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable columns */}
        <div className="flex-1 overflow-x-auto overflow-y-auto">
          <div className="min-w-fit">
            {/* Scrollable header */}
            <div className="bg-table-header border-b border-table-border border-gray-200 h-10 flex sticky top-0 z-10">
              {columns.map((column, index) => (
                <div
                  key={column.key}
                  className="px-3 py-2 text-sm font-semibold text-fb-gray-700 border-r  border-table-border border-gray-200 flex items-center flex-shrink-0 relative"
                  style={{ width: column.width, zIndex: 10 }}
                >
                  <button
                    className="flex items-center w-full text-left"
                    onClick={(e) => handleHeaderDropdownClick(column.key, e)}
                  >
                    {column.label}
                    {column.sortable && (
                      <ChevronDown className="w-3 h-3 ml-2 text-fb-gray-400" />
                    )}
                  </button>
                  
                  {/* Column Header Dropdown */}
                  {headerDropdownOpen === column.key && (
                    <ColumnHeaderDropdown
                      isOpen={true}
                      onClose={() => setHeaderDropdownOpen(null)}
                      columnKey={column.key}
                      position={headerDropdownPosition}
                      onColumnAction={handleColumnAction}
                      onOpenCustomiseModal={() => setShowCustomiseModal(true)}
                      onOpenAttributionModal={() => setShowAttributionModal(true)}
                      hasPriority={column.hasPriority}
                      columnIndex={index}
                      totalColumns={columns.length}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Scrollable rows */}
            <div>
              {data.map((item, index) => (
                <div
                  key={item.id}
                  className={`h-16 flex border-b border-table-border border-gray-200 ${
                    index % 2 === 0 ? "bg-background" : "bg-table-row-even"
                  } hover:bg-table-row-hover`}
                >
                  {columns.map((column) => (
                    <div
                      key={column.key}
                      className="px-3 py-2 flex items-center text-sm flex-shrink-0 border-r  border-table-border border-gray-200"
                      style={{ width: column.width }}
                    >
                      {renderCellContent(item, column)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results footer */}
      <div className="bg-table-header border-t border-table-border border-gray-200 px-4 py-2 text-xs text-fb-gray-500">
        Results from {data.length}{" "}
        {isCampaigns ? "campaigns" : isAdsets ? "ad sets" : "ads"}
        <span className="ml-2 text-fb-gray-400">Excludes deleted items</span>
      </div>

      {/* Modals */}
      <CustomiseColumnsModal
        isOpen={showCustomiseModal}
        onClose={() => setShowCustomiseModal(false)}
        onApply={(selectedColumns) => {
          console.log('Selected columns:', selectedColumns);
          setShowCustomiseModal(false);
        }}
      />

      <AttributionModal
        show={showAttributionModal}
        onClose={() => setShowAttributionModal(false)}
        attributionSettings={attributionSettings}
        handleAttributionChange={handleAttributionChange}
        skAdNetworkSettings={skAdNetworkSettings}
        handleSKAdNetworkChange={handleSKAdNetworkChange}
        isExpanded={isExpanded}
        toggleExpanded={() => setIsExpanded((prev) => !prev)}
      />

      <AddColumnModal
        isOpen={showAddColumnModal}
        onClose={() => setShowAddColumnModal(false)}
        onAddColumn={handleAddColumn}
        afterColumn={columnToAddAfter}
      />

      <RemoveColumnModal
        isOpen={showRemoveColumnModal}
        onClose={() => setShowRemoveColumnModal(false)}
        onConfirm={handleRemoveColumn}
        columnName={columnToRemove}
      />
    </div>
  );
}
