"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Settings,
  X,
  Search,
  ChevronUp,
} from "lucide-react";
import ColumnPreferencesModal from "./dialoges/column-preferences-modal";

export default function ColumnPreferencesDropdown({
  value = "performance",
  onChange,
  className = "",
  placeholder = "Columns: Performance",
}) {
  const [colopen, setcolOpen] = useState(false);
  const [panel, setPanel] = useState("main"); // main | discover | presets
  const [selected, setSelected] = useState(value);
  const [showAttributionModal, setShowAttributionModal] = useState(false);
  const [showCustomiseModal, setShowCustomiseModal] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const [isExpanded, setIsExpanded] = useState(false);

  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  const [skAdNetworkSettings, setSkAdNetworkSettings] = useState({
    viewFromSKAdNetwork: false,
    clickFromSKAdNetwork: false,
  });

  const [attributionSettings, setAttributionSettings] = useState({
    "1-day-click": false,
    "7-day-click": false,
    "28-day-click": false,
    "1-day-view": false,
    "1-day-engaged": false,
    incremental: false,
  });

  // Column customization state
  const [selectedColumns, setSelectedColumns] = useState({
    actions: true,
    "amount-spent": true,
    impressions: true,
    "attribution-setting": true,
    delivery: true,
    reach: true,
    results: true,
  });

  const mainOptions = {
    "Recently used": [{ id: "performance", label: "Performance" }],
    Popular: [
      { id: "performance_clicks", label: "Performance and clicks" },
      { id: "engagement", label: "Engagement" },
      { id: "delivery", label: "Delivery" },
    ],
  };

  const discoverOptions = {
    Performance: [
      {
        id: "performance",
        label: "Performance",
        desc: "View common performance metrics.",
      },
      {
        id: "delivery",
        label: "Delivery",
        desc: "Metrics related to how often your ads are delivered.",
      },
      {
        id: "performance_clicks",
        label: "Performance and clicks",
        desc: "See reach and cost per result.",
      },
      {
        id: "digital",
        label: "Digital circular",
        desc: "Instant Experience ads metrics.",
      },
    ],
    Engagement: [
      {
        id: "app_promotion",
        label: "App promotion",
        desc: "View engagement metrics related to app installs during an app promotion campaign.",
      },
      {
        id: "traffic",
        label: "Traffic",
        desc: "View engagement metrics for destinations specified in your ads, such as a website or app.",
      },
      {
        id: "engagement_general",
        label: "Engagement",
        desc: "View metrics related to how people engage with your campaigns.",
      },
      {
        id: "video",
        label: "Video engagement",
        desc: "View engagement metrics for ads using video formats.",
      },
      {
        id: "app_engagement",
        label: "App engagement",
        desc: "View metrics related to engagement with your Facebook group.",
      },
    ],
    Sales: [
      {
        id: "messaging",
        label: "Messaging conversions",
        desc: "View conversion metrics for ads that click to messaging experiences.",
      },
      {
        id: "sales",
        label: "Sales",
        desc: "View metrics related to sales that occurred as a result of your campaigns.",
      },
      {
        id: "setup",
        label: "Setup",
        desc: "View settings for your campaigns.",
      },
      {
        id: "offline",
        label: "Offline conversions",
        desc: "View metrics for ads that led to offline conversions, such as in store or on a website.",
      },
      {
        id: "conversion",
        label: "Conversion process",
        desc: "View metrics for the path people take from seeing an ad on Meta to completing an action or purchase.",
      },
    ],
  };

  const columnOptions = {
    Performance: [
      { id: "actions", label: "Actions", selected: true },
      { id: "amount-spent", label: "Amount spent", selected: true },
      {
        id: "auto-refresh",
        label: "Auto-refresh impressions",
        selected: false,
      },
      { id: "clicks-all", label: "Clicks (all)", selected: false },
      { id: "ctr-all", label: "CTR (all)", selected: false },
      { id: "frequency", label: "Frequency", selected: false },
      { id: "impressions", label: "Impressions", selected: true },
      { id: "result-rate", label: "Result rate", selected: false },
      { id: "ad-set-delivery", label: "Ad set delivery", selected: false },
      {
        id: "attribution-setting",
        label: "Attribution setting",
        selected: true,
      },
      {
        id: "avg-purchase",
        label: "Average purchases conversion value",
        selected: false,
      },
      { id: "cpc-all", label: "CPC (all)", selected: false },
      { id: "delivery", label: "Delivery", selected: true },
      {
        id: "gross-impressions",
        label: "Gross impressions (includes invalid impre...)",
        selected: false,
      },
      { id: "reach", label: "Reach", selected: true },
      { id: "results", label: "Results", selected: true },
    ],
  };

  useEffect(() => {
    if (colopen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - triggerRect.bottom;
      const dropdownHeight = 400;

      if (spaceBelow < dropdownHeight) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
    }
  }, [colopen]);

  const getSelectedLabel = () => {
    // Check in main options first
    for (const [group, items] of Object.entries(mainOptions)) {
      const found = items.find((item) => item.id === selected);
      if (found) return found.label;
    }

    // Check in discover options
    for (const [group, items] of Object.entries(discoverOptions)) {
      const found = items.find((item) => item.id === selected);
      if (found) return found.label;
    }

    return "Performance";
  };

  const handleSKAdNetworkChange = (key) => {
    setSkAdNetworkSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAttributionChange = (key) => {
    setAttributionSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleColumnToggle = (columnId) => {
    setSelectedColumns((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  const handleSelectionChange = (newValue) => {
    setSelected(newValue);
    onChange?.(newValue);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const selectedColumnCount =
    Object.values(selectedColumns).filter(Boolean).length;

  return (
    <div className={`relative ${className}`}>
      {/* Trigger */}
      <button
        ref={triggerRef}
        onClick={() => setcolOpen(!colopen)}
        className="w-full flex justify-between items-center border border-gray-300 rounded px-3 py-2 text-sm bg-white hover:bg-gray-50"
      >
        {placeholder.replace("Performance", getSelectedLabel())}
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {/* Dropdown */}
      {colopen && (
        <div
          ref={dropdownRef}
          className={`absolute ${
            dropdownPosition === "top" ? "bottom-full mb-1" : "top-full mt-1"
          } left-0 w-full border border-gray-300 rounded-md shadow-lg bg-white z-50 max-h-85 overflow-y-auto`}
        >
          {/* MAIN PANEL */}
          {panel === "main" && (
            <div className="p-2 text-sm">
              {Object.entries(mainOptions).map(([group, items]) => (
                <div key={group}>
                  <p className="px-2 py-1 text-md font-bold">{group}</p>
                  {items.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectionChange(opt.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${
                        selected === opt.id ? "bg-blue-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={selected === opt.id}
                        readOnly
                      />
                      <span>{opt.label}</span>
                    </div>
                  ))}
                  <hr className="my-2 border-gray-300" />
                </div>
              ))}

              {/* Navigation links */}
              <div
                onClick={() => setPanel("discover")}
                className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-50 rounded"
              >
                Discover more column presets
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </div>
              <div
                onClick={() => setPanel("presets")}
                className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-50 rounded"
              >
                View your column presets
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </div>
              <div
                onClick={() => setShowAttributionModal(true)}
                className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 rounded gap-2"
              >
                <span>📊</span>
                Compare attribution settings
              </div>
              <button
                onClick={() => setShowCustomiseModal(true)}
                className="w-full mt-2 border border-gray-300 rounded px-3 py-2 text-sm hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Customise columns
              </button>
            </div>
          )}

          {/* DISCOVER PANEL */}
          {panel === "discover" && (
            <div className="p-2 text-sm">
              {/* Back */}
              <div
                onClick={() => setPanel("main")}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 rounded"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Discover more presets</span>
              </div>
              <hr className="my-2 border-gray-300" />

              {Object.entries(discoverOptions).map(([group, items]) => (
                <div key={group} className="mb-2">
                  <p className="px-2 py-1 text-xs font-semibold text-gray-600">
                    {group}
                  </p>
                  {items.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => {
                        handleSelectionChange(opt.id);
                        setcolOpen(false);
                      }}
                      className={`flex items-start gap-2 px-3 py-2 rounded cursor-pointer ${
                        selected === opt.id ? "bg-blue-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={selected === opt.id}
                        readOnly
                        className="mt-1"
                      />
                      <div>
                        <p>{opt.label}</p>
                        {opt.desc && (
                          <p className="text-xs text-gray-500">{opt.desc}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* PRESETS PANEL */}
          {panel === "presets" && (
            <div className="p-2 text-sm">
              {/* Back */}
              <div
                onClick={() => setPanel("main")}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 rounded"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Your column presets</span>
              </div>
              <hr className="my-2 border-gray-300" />

              <div className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 rounded">
                <input type="radio" />
                <span>Custom</span>
                <div className="ml-auto">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Attribution Settings Modal */}
      {showAttributionModal && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6">
              <div>
                <h2 className="text-xl font-semibold">
                  Compare attribution settings
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Compare when and how people take action after engaging with
                  your ads. Selections in this tool are for reporting only and
                  do not change ad optimisation.
                </p>
              </div>
              <button
                onClick={() => setShowAttributionModal(false)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Standard attribution</h3>
                <div className="space-y-3">
                  {[
                    { key: "1-day-click", label: "1-day click" },
                    { key: "7-day-click", label: "7-day click" },
                    { key: "28-day-click", label: "28-day click" },
                    { key: "1-day-view", label: "1-day view" },
                    {
                      key: "1-day-engaged",
                      label: "1-day engaged-view",
                      note: "Video ads only",
                    },
                  ].map((item) => (
                    <div key={item.key} className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={attributionSettings[item.key]}
                        onChange={() => handleAttributionChange(item.key)}
                        className="mt-1"
                      />
                      <div>
                        <div>{item.label}</div>
                        {item.note && (
                          <div className="text-xs text-gray-500">
                            {item.note}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-gray-300" />

              <div>
                <div
                  className={`${
                    isExpanded ? "bg-blue-100" : "bg-white"
                  } rounded-lg py-1 px-2 cursor-pointer transition-all duration-200 hover:bg-opacity-80`}
                  onClick={toggleExpanded}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-md text-gray-900">
                        Apple SKAdNetwork
                      </h3>
                      <p className="text-sm text-gray-600">App ads only</p>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </div>

                  {isExpanded && (
                    <div className="mt-4 space-y-4 bg-white p-2 rounded-md">
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={skAdNetworkSettings.viewFromSKAdNetwork}
                          onChange={() =>
                            handleSKAdNetworkChange("viewFromSKAdNetwork")
                          }
                          onClick={(e) => e.stopPropagation()}
                          className="w-5 h-5 border border-gray-400 rounded mt-1"
                        />
                        <div>
                          <h4 className="font-medium text-base mb-1 text-gray-900">
                            View from SKAdNetwork
                          </h4>
                          <p className="text-sm text-gray-700">
                            Attribution occurs when someone views an ad and
                            installs the advertised app within 24 hours.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={skAdNetworkSettings.clickFromSKAdNetwork}
                          onChange={() =>
                            handleSKAdNetworkChange("clickFromSKAdNetwork")
                          }
                          onClick={(e) => e.stopPropagation()}
                          className="w-6 h-6 border border-gray-400 rounded mt-1"
                        />
                        <div>
                          <h4 className="font-medium text-base mb-1 text-gray-900">
                            Click from SKAdNetwork
                          </h4>
                          <p className="text-sm text-gray-700">
                            Attribution occurs when someone clicks an ad that
                            goes to an app's product page and installs the app
                            within 30 days.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Advanced option</h3>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={attributionSettings.incremental}
                    onChange={() => handleAttributionChange("incremental")}
                  />
                  <span>Incremental attribution</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-300">
              <button
                onClick={() => setShowAttributionModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAttributionModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customise Columns Modal */}
      <ColumnPreferencesModal
        open={showCustomiseModal}
        onClose={() => setShowCustomiseModal(false)}
        selectedColumns={selectedColumns}
        onColumnsChange={setSelectedColumns}
      />
    </div>
  );
}
