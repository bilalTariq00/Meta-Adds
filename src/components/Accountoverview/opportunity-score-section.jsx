"use client";

import { Info, Lightbulb, ChevronDown } from "lucide-react";

import PointsProgress from "../PointhProgress";
import { useState } from "react";
import Tooltip from "../Tooltip";

export function OpportunityScoreSection({ onManageAdjustments }) {
  const [activeTab, setActiveTab] = useState("available");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedSort, setSelectedSort] = useState("personalised");

  const handleSort = (sortType) => {
    setSelectedSort(sortType);
    setShowSortDropdown(false);
    console.log("Selected sort:", sortType);
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
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                activeTab === "available"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Available
            </button>
            <button
              onClick={() => setActiveTab("dismissed")}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                activeTab === "dismissed"
                  ? "bg-blue-100 text-blue-700"
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
              Sort by personalised
              <ChevronDown size={16} />
            </button>
            {showSortDropdown && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-3 space-y-2">
                  <div
                    className="flex flex-col gap-1 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => handleSort("personalised")}
                  >
                    <div className="font-medium text-sm">
                      Sort by personalised
                    </div>
                    <div className="text-xs text-gray-600">
                      Prioritise recommendations based on your recent ad account
                      activity
                    </div>
                  </div>
                  <div
                    className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => handleSort("newest")}
                  >
                    <div className="font-medium text-sm">Sort by newest</div>
                  </div>
                  <div
                    className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => handleSort("highestPoints")}
                  >
                    <div className="font-medium text-sm">
                      Sort by highest points
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center py-6 bg-gray-100 rounded-lg">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Lightbulb size={32} className="text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            No dismissed recommendations to review
          </h4>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            If you dismiss a recommendation, but change your mind later, you can
            review it again here as long as it's still available.
          </p>
        </div>

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
