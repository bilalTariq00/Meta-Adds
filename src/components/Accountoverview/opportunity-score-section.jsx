"use client";

import { Info, Lightbulb, ChevronDown } from "lucide-react";

import PointsProgress from "../PointhProgress";
import { useState } from "react";
import Tooltip from "../Tooltip";

export function OpportunityScoreSection({
  onManageAdjustments,
  availableData = [],
  dismissedData = [],
}) {
  const [activeTab, setActiveTab] = useState("available");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedSort, setSelectedSort] = useState("personalised");
  const [sortOption, setSortOption] = useState("personalised");

  const currentData = activeTab === "available" ? availableData : dismissedData;
  if (currentData.length > 0) {
    currentData.sort((a, b) => {
      switch (sortOption) {
        case "personalised":
          return b.relevanceScore - a.relevanceScore; // Example property
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "highestPoints":
          return b.points - a.points;
        default:
          return 0;
      }
    });
  }
  const handleSort = (option) => {
    setSortOption(option);
    setShowSortDropdown(false);
  };
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-1 mb-6">
      <div className="relative p-4">
        <button
          onClick={onManageAdjustments}
          className="absolute top-4 right-4 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
        >
          <Tooltip
            content="Click to manage automatic adjustments"
            id="manage-adjustments"
          >
            Manage automatic adjustments
          </Tooltip>
        </button>

        <div className="flex items-center gap-8">
          <PointsProgress />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              Opportunity score{" "}
              <Tooltip content="Your opportunity score" id="opportunity-score">
                <Info size={16} className="text-gray-400 cursor-help" />
              </Tooltip>
            </h3>
            <p className="text-sm text-gray-600 max-w-md">
              You applied all recommendations, which are proven to help improve
              performance.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-3">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("available")}
              className={`px-4 py-2 text-sm font-bold rounded transition-colors ${
                activeTab === "available"
                  ? "bg-blue-100 text-[#0A78BE]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Available
            </button>
            <button
              onClick={() => setActiveTab("dismissed")}
              className={`px-4 py-2 text-sm font-bold rounded transition-colors ${
                activeTab === "dismissed"
                  ? "bg-blue-100 text-[#0A78BE]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Dismissed
            </button>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
            >
              Sort by {sortOption}
              <ChevronDown size={16} />
            </button>

            {/* Description below the button */}

            {showSortDropdown && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-3 space-y-2">
                  {[
                    { value: "personalised", label: "Sort by personalised" },
                    { value: "newest", label: "Sort by newest" },
                    { value: "highestPoints", label: "Sort by highest points" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className="flex flex-col gap-1 p-2 hover:bg-gray-50 rounded cursor-pointer"
                      onClick={() => handleSort(option.value)}
                    >
                      <div className="font-medium text-sm text-gray-700">
                        {option.label}
                      </div>
                      {option.value === "personalised" && (
                        <div className="text-xs text-gray-600">
                          Prioritise recommendations based on your recent ad
                          account activity
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {currentData.length > 0 ? (
          <div className="space-y-4">
            {currentData.map((item, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg bg-white"
              >
                {item.title}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-100 rounded-lg">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Lightbulb size={32} className="text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab === "available"
                ? "No available recommendations"
                : "No dismissed recommendations to review"}
            </h4>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              {activeTab === "available"
                ? "Once new recommendations are available, they will show up here."
                : "If you dismiss a recommendation but change your mind later, you can review it here as long as it's still available."}
            </p>
          </div>
        )}

        {showSortDropdown && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowSortDropdown(false)}
          />
        )}
      </div>
    </div>
  );
}
