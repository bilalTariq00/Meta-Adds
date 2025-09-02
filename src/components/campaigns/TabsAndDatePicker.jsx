"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  FolderClosed,
  Grid3X3,
  LayoutPanelLeft,
} from "lucide-react";
import DateRangePicker from "@/components/ui/DateRangePicker";

export default function TabsAndDatePicker({
  activeTab,
  setActiveTab,
  selectedCount = 0,
  selectedTab = null,
  onDateRangeChange,
  selectedCountsByTab = {}, // New prop to get counts per tab
  onClearSelection, // New prop to handle clearing selections
}) {
  const [dateOpen, setDateOpen] = useState(false);
  const [range, setRange] = useState({
    from: "22 Jul 2025",
    to: "20 Aug 2025",
  });

  const getTabLabel = (tabId) => {
    // Get counts for contextual text
    const campaignsCount = selectedCountsByTab.campaigns || 0;
    const adsetsCount = selectedCountsByTab.adsets || 0;
    const currentTabCount = selectedCountsByTab[tabId] || 0;

    // If this tab has selections, show only the base name (no contextual text)
    if (currentTabCount > 0) {
      switch (tabId) {
        case "campaigns":
          return "Campaigns";
        case "adsets":
          return "Ad sets";
        case "ads":
          return "Ads";
        default:
          return "";
      }
    }

    // If no selections in this tab, show contextual text based on other tabs
    switch (tabId) {
      case "campaigns":
        return "Campaigns";
      case "adsets":
        if (campaignsCount > 0) {
          return `Ad sets for ${campaignsCount} Campaign${campaignsCount > 1 ? 's' : ''}`;
        } else {
          return "Ad sets";
        }
      case "ads":
        if (adsetsCount > 0) {
          return `Ads for ${adsetsCount} Ad set${adsetsCount > 1 ? 's' : ''}`;
        } else if (campaignsCount > 0) {
          return `Ads for ${campaignsCount} Campaign${campaignsCount > 1 ? 's' : ''}`;
        } else {
          return "Ads";
        }
      default:
        return "";
    }
  };

  const getTabBadge = (tabId) => {
    const tabCount = selectedCountsByTab[tabId] || 0;
    const shouldShowBadge = tabCount > 0; // Show badge whenever there are selections, not just on active tab
    
    if (!shouldShowBadge) return null;
    
    return (
      <span className="inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-xs bg-blue-600 text-white flex-shrink-0">
        {tabCount} selected
        <button
          className="w-3 h-3 rounded-sm bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors flex-shrink-0"
          title="Clear selection"
          onClick={(e) => {
            e.stopPropagation();
            // Clear selection for this tab
            if (onClearSelection) {
              onClearSelection(tabId);
            }
          }}
        >
          ×
        </button>
      </span>
    );
  };

  const tabs = [
    {
      id: "campaigns",
      label: getTabLabel("campaigns"),
      lightIcon: "/images/campaigns/CampaignsLight.png",
      activeIcon: "/images/campaigns/Campaigns.png",
    },
    {
      id: "adsets",
      label: getTabLabel("adsets"),
      lightIcon: "/images/campaigns/AdSetLight.png",
      activeIcon: "/images/campaigns/AdSet.png",
    },
    {
      id: "ads",
      label: getTabLabel("ads"),
      lightIcon: "/images/campaigns/AdsLight.png",
      activeIcon: "/images/campaigns/Ads.png",
    },
  ];

  return (
    <div className="flex flex-row justify-between">
      {/* Raised tabs row */}
      <div className="flex items-center gap-4 px-1 mb-[-8px] relative ml-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className="flex-shrink-0 relative inline-flex items-center rounded-t-lg px-0 py-2 transition-all duration-200"
          >
            <div
              className={`flex items-center gap-2 rounded-t-lg px-4 sm:pr-6 md:pr-8 py-2 flex-shrink-0 transition-transform duration-200 ${
                activeTab === t.id
                  ? "bg-white text-[#0A78BE] scale-110"
                  : "bg-white text-gray-900 scale-100"
              }`}
              style={{ transformOrigin: "center" }}
            >
              <img
                src={activeTab === t.id ? t.activeIcon : t.lightIcon}
                alt={t.label}
                className="w-5 h-5 flex-shrink-0"
              />
              <span className="font-semibold tracking-tight whitespace-nowrap">{t.label}</span>
              <div className="flex-shrink-0">
                {getTabBadge(t.id)}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="px-1 pb-2">
        <div className="relative inline-block">
          <button
            onClick={() => setDateOpen((v) => !v)}
            className="px-3 py-1.5 rounded-md border bg-white border-gray-300 text-sm inline-flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <CalendarIcon className="w-4 h-4" />
            <span className="text-sm font-medium">
            Last 30 days: {range.from} - {range.to}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {/* Reusable DateRangePicker */}
          <DateRangePicker
            isOpen={dateOpen}
            onClose={() => setDateOpen(false)}
            onDateRangeChange={(dateRange) => {
              console.log("Date range changed:", dateRange);
              // Update local state
              setRange({
                from: dateRange.startDate,
                to: dateRange.endDate,
              });
              // Call parent callback to update table data
              if (onDateRangeChange) {
                onDateRangeChange(dateRange);
              }
            }}
            position="bottom-right"
            initialDateRange="last30days"
            initialStartDate="22 Jul 2025"
            initialEndDate="20 Aug 2025"
          />
        </div>
      </div>
    </div>
  );
}
