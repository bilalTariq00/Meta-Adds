"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  FolderClosed,
  Grid3X3,
  LayoutPanelLeft,
} from "lucide-react";

export default function TabsAndDatePicker({
  activeTab,
  setActiveTab,
  selectedCount = 0,
  selectedTab = null,
}) {
  const [dateOpen, setDateOpen] = useState(false);
  const [range, setRange] = useState({
    from: "22 Jul 2025",
    to: "20 Aug 2025",
  });

  const getTabLabel = (tabId) => {
    // Show selection count in all tab labels if there are selections
    const hasAnySelection = selectedCount > 0;

    switch (tabId) {
      case "campaigns":
        return hasAnySelection ? `Campaigns ` : "Campaigns";
      case "adsets":
        return hasAnySelection
          ? `Ad sets for ${selectedCount} Campaign`
          : "Ad sets";
      case "ads":
        return hasAnySelection ? `Ads for ${selectedCount} Ad set` : "Ads";
      default:
        return "";
    }
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
      <div className="flex items-center gap-3 px-1 mb-[-8px] relative ml-3">
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
                className="w-5 h-5"
              />
              <span className="font-semibold tracking-tight">{t.label}</span>

              {selectedTab === t.id && selectedCount > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs bg-blue-600 text-white">
                  {selectedCount} selected
                  <button
                    className="ml-1 w-3 h-3 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"
                    title="Clear selection"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="px-1 pb-2">
        <div className="relative inline-block">
          <button
            onClick={() => setDateOpen((v) => !v)}
            className="px-3 py-1.5 rounded-md border bg-white border-gray-300 text-sm inline-flex items-center gap-2"
          >
            <CalendarIcon className="w-4 h-4" />
            Last 30 days: {range.from} - {range.to}
          </button>
          {dateOpen && (
            <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-3 w-[720px] z-[5]">
              <div className="grid grid-cols-[220px_1fr] gap-3">
                {/* Presets */}
                <div className="space-y-1">
                  {[
                    "Today",
                    "Yesterday",
                    "Today and yesterday",
                    "Last 7 days",
                    "Last 14 days",
                    "Last 28 days",
                    "Last 30 days",
                    "This week",
                    "Last week",
                    "This month",
                    "Last month",
                    "Maximum",
                    "Custom",
                  ].map((p) => (
                    <label
                      key={p}
                      className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 text-sm"
                    >
                      <input
                        name="preset"
                        type="radio"
                        defaultChecked={p === "Last 30 days"}
                      />{" "}
                      {p}
                    </label>
                  ))}
                </div>
                {/* Calendars (static mock) */}
                <div className="grid grid-cols-2 gap-6">
                  {["Jul", "Aug"].map((month, i) => (
                    <div key={month}>
                      <div className="flex items-center justify-between mb-2 text-sm">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="font-medium">{month} 2025</div>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 mb-1">
                        {"Sun Mon Tue Wed Thu Fri Sat".split(" ").map((d) => (
                          <div key={d} className="text-center p-1">
                            {d}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 31 }, (_, d) => d + 1).map(
                          (d) => (
                            <button
                              key={d}
                              className={`text-center p-1.5 text-xs rounded hover:bg-blue-50 ${
                                (i === 0 && d >= 22) || (i === 1 && d <= 20)
                                  ? "bg-blue-100 text-blue-700"
                                  : ""
                              } ${
                                (i === 0 && d === 22) || (i === 1 && d === 20)
                                  ? "!bg-blue-600 !text-white"
                                  : ""
                              }`}
                            >
                              {d}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => setDateOpen(false)}
                  className="px-3 py-1.5 border rounded text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setRange({ from: "22 Jul 2025", to: "20 Aug 2025" });
                    setDateOpen(false);
                  }}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm"
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
