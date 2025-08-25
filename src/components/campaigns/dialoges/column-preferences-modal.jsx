"use client";

import { useState } from "react";
import { X, Search, ChevronDown, Info, Plus } from "lucide-react";
import CreateCustomMetricModal from "./create-custom-metric-modal";

export default function ColumnPreferencesModal({
  open,
  onClose,
  selectedColumns = {}, // Added default empty object to prevent iteration errors
  onColumnsChange,
}) {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState({});
  const [showCreateCustomModal, setShowCreateCustomModal] = useState(false);
  const [customMetrics, setCustomMetrics] = useState([
    { id: "new", label: "new", description: "Custom metric created by you" },
  ]);

  const safeSelectedColumns = selectedColumns || {};

  const allTabSections = [
    {
      id: "awareness",
      title: "Awareness",
      items: [
        {
          id: "brand-awareness",
          label: "Brand awareness",
          tooltip: "Estimated number of people who recall seeing your ads",
        },
        {
          id: "reach",
          label: "Reach",
          tooltip: "Number of people who saw your ads at least once",
        },
        {
          id: "impressions",
          label: "Impressions",
          tooltip: "Number of times your ads were on screen",
        },
      ],
    },
    {
      id: "conversions",
      title: "Conversions",
      items: [
        {
          id: "conversions",
          label: "Conversions",
          tooltip: "Number of conversion events tracked",
        },
        {
          id: "conversion-value",
          label: "Conversion value",
          tooltip: "Total value of conversions",
        },
        {
          id: "cost-per-conversion",
          label: "Cost per conversion",
          tooltip: "Average cost for each conversion",
        },
      ],
    },
    {
      id: "standard-events",
      title: "Standard events",
      items: [
        {
          id: "purchase",
          label: "Purchase",
          tooltip: "Number of purchase events",
        },
        {
          id: "add-to-cart",
          label: "Add to cart",
          tooltip: "Number of add to cart events",
        },
        {
          id: "view-content",
          label: "View content",
          tooltip: "Number of content view events",
        },
      ],
    },
    {
      id: "custom-events",
      title: "Custom events",
      items: [
        {
          id: "custom-event-1",
          label: "Custom Event 1",
          tooltip: "Your custom conversion event",
        },
      ],
    },
    {
      id: "settings",
      title: "Settings",
      items: [],
    },
    {
      id: "object-names-ids",
      title: "Object names and IDs",
      selectedCount: 1,
      items: [
        {
          id: "campaign-name",
          label: "Campaign name",
          tooltip: "Name of your campaign",
        },
        {
          id: "ad-set-name",
          label: "Ad set name",
          tooltip: "Name of your ad set",
        },
        { id: "ad-name", label: "Ad name", tooltip: "Name of your ad" },
      ],
    },
    {
      id: "status-dates",
      title: "Status and dates",
      selectedCount: 1,
      items: [
        {
          id: "delivery-status",
          label: "Delivery status",
          tooltip: "Current delivery status",
        },
        {
          id: "start-date",
          label: "Start date",
          tooltip: "Campaign start date",
        },
        { id: "end-date", label: "End date", tooltip: "Campaign end date" },
      ],
    },
    {
      id: "goal-budget-schedule",
      title: "Goal, budget & schedule",
      selectedCount: 3,
      items: [
        { id: "objective", label: "Objective", tooltip: "Campaign objective" },
        { id: "budget", label: "Budget", tooltip: "Campaign budget" },
        { id: "schedule", label: "Schedule", tooltip: "Campaign schedule" },
      ],
    },
    {
      id: "targeting",
      title: "Targeting",
      items: [
        {
          id: "audience",
          label: "Audience",
          tooltip: "Target audience settings",
        },
        {
          id: "locations",
          label: "Locations",
          tooltip: "Geographic targeting",
        },
        {
          id: "demographics",
          label: "Demographics",
          tooltip: "Age and gender targeting",
        },
      ],
    },
    {
      id: "ad-creative",
      title: "Ad creative",
      items: [
        {
          id: "ad-creative-name",
          label: "Ad creative name",
          tooltip: "Name of the creative",
        },
        {
          id: "creative-type",
          label: "Creative type",
          tooltip: "Type of creative used",
        },
      ],
    },
    {
      id: "performance",
      title: "Performance",
      selectedCount: 7,
      items: [
        {
          id: "actions",
          label: "Actions",
          tooltip: "Total number of actions taken",
        },
        {
          id: "amount-spent",
          label: "Amount spent",
          tooltip: "Total amount spent",
        },
        {
          id: "attribution-setting",
          label: "Attribution setting",
          tooltip: "Attribution window settings",
        },
        {
          id: "delivery",
          label: "Delivery",
          tooltip: "Delivery performance metrics",
        },
        {
          id: "reach",
          label: "Reach",
          tooltip: "Number of unique people reached",
        },
        { id: "results", label: "Results", tooltip: "Total results achieved" },
        {
          id: "impressions",
          label: "Impressions",
          tooltip: "Number of times ads were shown",
        },
      ],
    },
    {
      id: "cost",
      title: "Cost",
      selectedCount: 1,
      items: [
        {
          id: "cost-per-result",
          label: "Cost per result",
          tooltip: "Average cost per result",
        },
        {
          id: "cpm",
          label: "CPM (cost per 1,000 impressions)",
          tooltip: "Cost per thousand impressions",
        },
      ],
    },
    {
      id: "performance-funnel",
      title: "Performance funnel",
      items: [
        {
          id: "landing-page-views",
          label: "Landing page views rate per link clicks",
          tooltip: "Rate of landing page views",
        },
        {
          id: "purchases-rate",
          label: "Purchases rate per landing page views",
          tooltip: "Purchase conversion rate",
        },
        {
          id: "purchases-rate-clicks",
          label: "Purchases rate per link clicks",
          tooltip: "Purchase rate from clicks",
        },
      ],
    },
    {
      id: "engagement",
      title: "Engagement",
      items: [],
    },
    {
      id: "page-post",
      title: "Page post",
      items: [
        { id: "check-ins", label: "Check-ins", tooltip: "Number of check-ins" },
        {
          id: "cost-per-join",
          label: "Cost per join group request",
          tooltip: "Cost per group join request",
        },
        {
          id: "cost-per-post-engagement",
          label: "Cost per post engagement",
          tooltip: "Cost per engagement",
        },
        {
          id: "facebook-likes",
          label: "Facebook likes",
          tooltip: "Number of Facebook likes",
        },
        {
          id: "join-group-requests",
          label: "Join group requests",
          tooltip: "Number of group join requests",
        },
        {
          id: "photo-views",
          label: "Photo views",
          tooltip: "Number of photo views",
        },
        {
          id: "post-engagements",
          label: "Post engagements",
          tooltip: "Total post engagements",
        },
        {
          id: "post-saves",
          label: "Post saves",
          tooltip: "Number of post saves",
        },
        {
          id: "cost-per-event-response",
          label: "Cost per event response",
          tooltip: "Cost per event response",
        },
        {
          id: "cost-per-like",
          label: "Cost per like",
          tooltip: "Cost per like",
        },
        {
          id: "cost-per-post-engagement-2",
          label: "Cost per post engagement",
          tooltip: "Cost per post engagement",
        },
        {
          id: "event-responses",
          label: "Event responses",
          tooltip: "Number of event responses",
        },
        {
          id: "instagram-follows",
          label: "Instagram follows",
          tooltip: "Number of Instagram follows",
        },
        {
          id: "page-engagement",
          label: "Page engagement",
          tooltip: "Total page engagement",
        },
        {
          id: "post-comments",
          label: "Post comments",
          tooltip: "Number of post comments",
        },
        {
          id: "post-reactions",
          label: "Post reactions",
          tooltip: "Number of post reactions",
        },
        {
          id: "post-shares",
          label: "Post shares",
          tooltip: "Number of post shares",
        },
      ],
    },
    {
      id: "messaging",
      title: "Messaging",
      items: [
        {
          id: "messenger-calls-20",
          label: "20-second Messenger calls",
          tooltip: "Calls lasting 20+ seconds",
        },
        {
          id: "messenger-calls-60",
          label: "60-second Messenger calls",
          tooltip: "Calls lasting 60+ seconds",
        },
        { id: "blocks", label: "Blocks", tooltip: "Number of blocks" },
      ],
    },
    {
      id: "calling",
      title: "Calling",
      items: [
        {
          id: "call-duration",
          label: "Call duration",
          tooltip: "Average call duration",
        },
        {
          id: "calls-initiated",
          label: "Calls initiated",
          tooltip: "Number of calls initiated",
        },
      ],
    },
    {
      id: "media",
      title: "Media",
      items: [
        {
          id: "video-views",
          label: "Video views",
          tooltip: "Number of video views",
        },
        {
          id: "video-completion",
          label: "Video completion rate",
          tooltip: "Video completion percentage",
        },
      ],
    },
    {
      id: "clicks",
      title: "Clicks",
      items: [
        {
          id: "link-clicks",
          label: "Link clicks",
          tooltip: "Number of link clicks",
        },
        {
          id: "ctr",
          label: "CTR (click-through rate)",
          tooltip: "Click-through rate percentage",
        },
      ],
    },
    {
      id: "optimisation",
      title: "Optimisation",
      selectedCount: 1,
      items: [
        {
          id: "optimization-goal",
          label: "Optimization goal",
          tooltip: "Campaign optimization objective",
        },
        {
          id: "bid-strategy",
          label: "Bid strategy",
          tooltip: "Bidding strategy used",
        },
      ],
    },
  ];

  const trackingSections = [
    {
      id: "ad-relevance",
      title: "Ad relevance",
      selectedCount: 3,
      items: [
        {
          id: "conversion-rate-ranking",
          label: "Conversion rate ranking",
          tooltip: "How your conversion rate compares to competitors",
        },
        {
          id: "engagement-rate-ranking",
          label: "Engagement rate ranking",
          tooltip: "How your engagement rate compares to competitors",
        },
        {
          id: "quality-ranking",
          label: "Quality ranking",
          tooltip:
            "Ad relevance diagnostics - A ranking of your ad's perceived quality",
        },
      ],
    },
    {
      id: "messaging-calling",
      title: "Messaging and calling",
      items: [
        {
          id: "messenger-calls-20",
          label: "20-second Messenger calls",
          tooltip: "Calls lasting 20+ seconds",
        },
        {
          id: "messenger-calls-60",
          label: "60-second Messenger calls",
          tooltip: "Calls lasting 60+ seconds",
        },
        { id: "blocks", label: "Blocks", tooltip: "Number of blocks" },
      ],
    },
    {
      id: "media",
      title: "Media",
      items: [
        {
          id: "video-views",
          label: "Video views",
          tooltip: "Number of video views",
        },
        {
          id: "video-completion",
          label: "Video completion rate",
          tooltip: "Video completion percentage",
        },
      ],
    },
  ];

  const recentlyUsedItems = [
    {
      id: "messenger-calls-20",
      label: "20-second Messenger calls",
      tooltip: "Calls lasting 20+ seconds",
    },
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const toggleColumn = (columnId) => {
    onColumnsChange({
      ...safeSelectedColumns, // Use safe version to prevent errors
      [columnId]: !safeSelectedColumns[columnId],
    });
  };

  const handleCreateCustomMetric = (metric) => {
    const newMetric = {
      id: `custom-${Date.now()}`,
      label: metric.name,
      description: metric.description,
      tooltip: metric.description,
    };
    setCustomMetrics((prev) => [...prev, newMetric]);
    setShowCreateCustomModal(false);
  };

  const selectedCount =
    Object.values(safeSelectedColumns).filter(Boolean).length; // Use safe version

  const renderMetricItem = (item, showTooltip = true) => (
    <div
      key={item.id}
      className="flex items-center gap-3 py-2 px-3 hover:bg-gray-50 rounded group"
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={safeSelectedColumns[item.id] || false} // Use safe version
          onChange={() => toggleColumn(item.id)}
          className="w-4 h-4 border-2 border-gray-300 rounded bg-white checked:bg-blue-600 checked:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
        />
        {safeSelectedColumns[item.id] && ( // Use safe version
          <svg
            className="w-3 h-3 text-white absolute top-0.5 left-0.5 pointer-events-none"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-900">{item.label}</span>
          {showTooltip && item.tooltip && (
            <div className="group/tooltip relative">
              <Info className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute left-0 top-6 w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity z-10 pointer-events-none">
                {item.tooltip}
              </div>
            </div>
          )}
        </div>
        {item.description && (
          <p className="text-xs text-gray-500 mt-1">{item.description}</p>
        )}
      </div>
    </div>
  );

  const renderSection = (section) => {
    const isExpanded = expandedSections[section.id] ?? false;
    const hasItems = section.items.length > 0;

    return (
      <div key={section.id} className="mb-4">
        <div
          className={`flex items-center justify-between p-3 rounded cursor-pointer transition-colors ${
            hasItems ? "hover:bg-gray-50 bg-gray-50" : "bg-white"
          }`}
          onClick={() => hasItems && toggleSection(section.id)}
        >
          <div>
            <h3 className="font-medium text-gray-900">{section.title}</h3>
            {section.selectedCount !== undefined && (
              <p className="text-sm text-gray-500">
                {section.selectedCount} selected
              </p>
            )}
          </div>
          {hasItems && (
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          )}
        </div>

        {hasItems && isExpanded && (
          <div className="bg-blue-50 rounded-lg p-4 mt-2">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {section.items.map((item) => renderMetricItem(item))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-2 border-b border-gray-300">
            <h2 className="text-md font-semibold">Customise columns</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left Panel */}
            <div className="flex-1 px-6 py-2 overflow-y-auto">
              {/* Search */}
              <div className="relative mb-4">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for metrics or column settings"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Tabs */}
              <div className="flex gap-4 mb-6 ">
                {["All", "Tracking", "Recently used", "Custom"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-2 rounded-md text-sm font-medium ${
                      activeTab === tab
                        ? " bg-blue-200/70 text-blue-700"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
                <button className="ml-auto text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2 border border-gray-300 px-3 py-1 rounded">
                  <span>☰</span> Expand all
                </button>
              </div>

              {/* Tab Content */}
              <div className="space-y-4">
                {activeTab === "All" && allTabSections.map(renderSection)}

                {activeTab === "Tracking" &&
                  trackingSections.map(renderSection)}

                {activeTab === "Recently used" && (
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900 mb-4">
                      Recently used
                    </h3>
                    {recentlyUsedItems.map((item) => renderMetricItem(item))}
                  </div>
                )}

                {activeTab === "Custom" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">
                        Custom metrics
                      </h3>
                      <button
                        onClick={() => setShowCreateCustomModal(true)}
                        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        Create custom metric
                      </button>
                    </div>

                    {customMetrics.length > 0 && (
                      <div className="space-y-2">
                        <div
                          className="flex items-center justify-between p-3 bg-gray-50 rounded cursor-pointer"
                          onClick={() => toggleSection("only-you")}
                        >
                          <div>
                            <h4 className="font-medium text-gray-900">
                              Only you
                            </h4>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 text-gray-500 transition-transform ${
                              expandedSections["only-you"] ? "rotate-180" : ""
                            }`}
                          />
                        </div>

                        {expandedSections["only-you"] && (
                          <div className="space-y-1">
                            {customMetrics.map((item) =>
                              renderMetricItem(item, false)
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {customMetrics.length === 0 && (
                      <div className="text-center py-12">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                          <svg
                            className="w-12 h-12 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Create custom metric
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Create custom metrics to get more detailed information
                          about campaign performance.{" "}
                          <a href="#" className="text-blue-600 hover:underline">
                            Learn more about creating custom metrics
                          </a>
                        </p>
                        <button
                          onClick={() => setShowCreateCustomModal(true)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                        >
                          Get started
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel */}
            <div className="w-80 border-l border-gray-300 p-6 bg-gray-50">
              <div className="mb-4">
                <h3 className="font-semibold text-lg">
                  {selectedCount} columns selected
                </h3>
                <p className="text-sm text-gray-600">
                  Drag and drop to arrange columns as they'll appear in the
                  table.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700 mb-3 pb-2 border-b border-gray-300">
                  Campaign
                </div>
                {Object.entries(safeSelectedColumns) // Use safe version to prevent iteration errors
                  .filter(([_, selected]) => selected)
                  .map(([key, _]) => {
                    // Find the label from all sections
                    let label = key;
                    for (const section of [
                      ...allTabSections,
                      ...trackingSections,
                    ]) {
                      const item = section.items.find(
                        (item) => item.id === key
                      );
                      if (item) {
                        label = item.label;
                        break;
                      }
                    }

                    return (
                      <div
                        key={key}
                        className="flex items-center justify-between p-3 bg-white rounded border border-gray-300"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 cursor-move">☰</span>
                          <span className="text-sm">{label}</span>
                        </div>
                        <button
                          onClick={() => toggleColumn(key)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
              </div>

              <button className="w-full mt-6 px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 bg-white">
                Compare attribution settings
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-300 bg-gray-50">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 bg-white">
              <span>🔖</span>
              Save as column preset
            </button>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 bg-white"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Custom Metric Modal */}
      <CreateCustomMetricModal
        open={showCreateCustomModal}
        onClose={() => setShowCreateCustomModal(false)}
        onSave={handleCreateCustomMetric}
      />
    </>
  );
}
