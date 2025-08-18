"use client";

import { useState } from "react";
import { Info, ChevronDown, BarChart3, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import campaignThumbnail from "@/assets/campaign-thumbnail.jpg";

const campaignData = [
  {
    id: 1,
    name: "DYT - Home Improvement US Campaign",
    status: "Active",
    thumbnail: campaignThumbnail,
    results: 0,
    costPerResult: "--",
    hasResults: false,
  },
  // {
  //   id: 2,
  //   name: "Summer Sale - Electronics Campaign",
  //   status: "Active",
  //   thumbnail: campaignThumbnail,
  //   results: 1247,
  //   costPerResult: "$2.45",
  //   hasResults: true,
  // },
  // {
  //   id: 3,
  //   name: "Back to School - Fashion Campaign",
  //   status: "Paused",
  //   thumbnail: campaignThumbnail,
  //   results: 892,
  //   costPerResult: "$3.12",
  //   hasResults: true,
  // },
  // {
  //   id: 4,
  //   name: "Holiday Special - Travel Campaign",
  //   status: "Active",
  //   thumbnail: campaignThumbnail,
  //   results: 2156,
  //   costPerResult: "$1.89",
  //   hasResults: true,
  // },
];

export function CampaignTrendsSection({ onCreateCampaign }) {
  const [selectedMetric, setSelectedMetric] = useState("Results");
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <TooltipProvider>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Campaign trends
            </h3>
            <span className="text-sm font-normal text-gray-600">
              Last 7 days
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info size={16} className="text-gray-400 " />
              </TooltipTrigger>
              <TooltipContent className="bg-white shadow-lg p-4 mb-1 rounded-lg">
                <p>Campaign trends information</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 rounded text-sm hover:border-gray-400 transition-colors"
              >
                {selectedMetric}
                <ChevronDown size={16} />
              </button>
              {showDropdown && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <label
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer"
                      onClick={() => {
                        setSelectedMetric("Cost per result");
                        setShowDropdown(false);
                      }}
                    >
                      <input
                        type="radio"
                        name="results"
                        checked={selectedMetric === "Cost per result"}
                        onChange={() => {}}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm">Cost per result</span>
                    </label>
                    <label
                      className={`flex items-center gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer ${
                        selectedMetric === "Results" ? "bg-blue-50" : ""
                      }`}
                      onClick={() => {
                        setSelectedMetric("Results");
                        setShowDropdown(false);
                      }}
                    >
                      <input
                        type="radio"
                        name="results"
                        checked={selectedMetric === "Results"}
                        onChange={() => {}}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span
                        className={`text-sm ${
                          selectedMetric === "Results" ? "font-medium" : ""
                        }`}
                      >
                        Results
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={onCreateCampaign}
              className="flex items-center gap-1 px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700 transition-colors text-sm"
            >
              <Plus size={16} />
              Create
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {campaignData.map((campaign) => (
            <div
              key={campaign.id}
              className="flex items-center justify-between p-4 rounded-lg gap-8 min-w-0"
            >
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden">
                  <img
                    src={campaign.thumbnail || "/placeholder.svg"}
                    alt="Campaign thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-medium text-gray-900 break-words min-w-0 max-w-[250px]">
                    {campaign.name}
                  </h4>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full font-medium mt-1 ${
                      campaign.status === "Active"
                        ? "bg-green-800/5 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {campaign.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-12 flex-shrink-0 min-w-0">
                <div className="flex-shrink-0">
                  <div className="flex items-start gap-10 justify-center">
                    <span className="text-sm text-gray-600 break-words max-w-[100px]">
                      {selectedMetric === "Results"
                        ? "Website views content"
                        : "Per view content"}
                    </span>
                    <Tooltip className="flex items-center justify-center mt-6">
                      <TooltipTrigger asChild>
                        <Info size={16} className="text-gray-400 " />
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="max-w-[300px] bg-white shadow-lg p-4 mb-1 rounded-lg"
                      >
                        <p>
                          The number of view content events tracked by the pixel
                          or Conversions API on your website and attributed to
                          your ads.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="text-3xl text-gray-900">
                    {selectedMetric === "Results"
                      ? campaign.results.toLocaleString()
                      : campaign.costPerResult}
                  </div>
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm text-gray-600 break-words max-w-[200px]">
                    {campaign.hasResults
                      ? `Campaign generated ${campaign.results.toLocaleString()} results in the last 7 days.`
                      : "This campaign has no results for the last 7 days."}
                  </span>
                </div>
                <BarChart3 size={20} className="text-gray-400 flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {/* Backdrop for dropdown */}
        {showDropdown && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />
        )}
      </div>
    </TooltipProvider>
  );
}
