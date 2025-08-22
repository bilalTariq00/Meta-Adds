"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  Edit,
  Copy,
  Trash2,
  MoreHorizontal,
  Pin,
  Clock,
  RotateCcw,
} from "lucide-react";

// Sample data for different tabs
const campaignsSeed = [
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
    lastEdit: "20 Aug 2025, 22:...",
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
    lastEdit: "13 Aug 2025, 20:...",
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

const adsetsSeed = [
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

const adsSeed = [
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

export default function CampaignTable({
  query,
  selectedIds,
  onSelectionChange,
}) {
  const [campaigns, setCampaigns] = useState(campaignsSeed);
  const [adsets, setAdsets] = useState(adsetsSeed);
  const [ads, setAds] = useState(adsSeed);
  const [loading, setLoading] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(t);
  }, [query.search, query.filters, query.activeTab]);

  const data = useMemo(() => {
    const q = (query.search || "").toLowerCase();
    const f = query.filters || {};

    if (query.activeTab === "adsets") {
      return adsets.filter((r) => r.name.toLowerCase().includes(q));
    }
    if (query.activeTab === "ads") {
      return ads.filter((r) => r.name.toLowerCase().includes(q));
    }

    let filtered = campaigns.filter((r) => r.name.toLowerCase().includes(q));
    if (f.hadDelivery) filtered = filtered.filter((r) => r.hadDelivery);
    if (f.active) filtered = filtered.filter((r) => r.active);
    return filtered;
  }, [campaigns, adsets, ads, query]);

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
  const getColumns = () => {
    if (isCampaigns) {
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
        // { key: "thumbnail", label: "", sortable: false, width: "60px" },
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
              <ChevronDown className="w-3 h-3 ml-1 text-fb-gray-400" />
            </div>
            <div
              className={`px-3 py-2 text-sm font-medium text-fb-gray-700 flex items-center  ${
                isAds ? "w-72" : "w-80"
              }`}
            >
              {isCampaigns ? "Campaign" : isAdsets ? "Ad set" : "Ad"}
              <ChevronDown className="w-3 h-3 ml-1 text-fb-gray-400" />
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
                    <div className="text-fb-blue hover:underline cursor-pointer text-sm font-medium truncate">
                      {item.name}
                    </div>
                    <div className="text-xs text-fb-gray-500 flex">
                      {item.resultType}
                      {hoveredRow === item.id && (
                        <div className="flex items-center gap-1 ml-2">
                          <button
                            className="p-1 hover:bg-blue-100 rounded text-gray-600"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1 hover:bg-blue-100 rounded text-gray-600"
                            title="Duplicate"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1 hover:bg-blue-100 rounded text-gray-600"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
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
                                <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                  <Pin className="w-4 h-4" />
                                  Pin
                                </button>
                                <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                  <Clock className="w-4 h-4" />
                                  View history
                                </button>
                                <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                  <RotateCcw className="w-4 h-4" />
                                  Rules
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
              {columns.map((column) => (
                <div
                  key={column.key}
                  className="px-3 py-2 text-sm font-semibold text-fb-gray-700 border-r  border-table-border border-gray-200 flex items-center flex-shrink-0"
                  style={{ width: column.width }}
                >
                  {column.label}
                  {column.sortable && (
                    <ChevronDown className="w-3 h-3 ml-1 text-fb-gray-400" />
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
    </div>
  );
}
