"use client";

import { useState, useEffect } from "react";
import {
  Info,
  ChevronDown,
  BarChart3,
  Pencil,
  X,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import Tooltip from "../Tooltip";

export function LatestResultsSection() {
  const [showResultDropdown, setShowResultDropdown] = useState(false);
  const [selectedResult, setSelectedResult] = useState("All");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = ["All", "Website views content", "Website leads"];

  const getMetricsData = (filter) => {
    switch (filter) {
      case "Website leads":
        return {
          metrics: ["Website lead", "Per lead", "Amount spent"],
          values: ["--", "--", "$5.19"],
          tooltips: [
            "Number of website leads generated",
            "Cost per website lead",
            "Total amount spent on website lead campaigns",
          ],
        };
      case "Website views content":
        return {
          metrics: ["Website view content", "Per view content", "Amount spent"],
          values: ["--", "--", "$5.26"],
          tooltips: [
            "Number of website content views",
            "Cost per website content view",
            "Total amount spent on content view campaigns",
          ],
        };
      case "All":
      default:
        return {
          metrics: ["Reach", "Cost per 1,000 Impressions", "Amount spent"],
          values: ["1.5K", "$6.88", "$10.45"],
          tooltips: [
            "Total number of people reached",
            "Cost per 1,000 ad impressions",
            "Total amount spent across all campaigns",
          ],
        };
    }
  };

  const currentData = getMetricsData(selectedResult);

  // Dummy ad set data
  const adSets = [
    {
      id: 1,
      highest: 1200,
      lowest: 400,
      selected: "highest",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      adSetName: "20-65 USA FB Feeds only - DYT Home Improvement",
      status: "Active",
      chartData: [40, 50, 60, 70, 80],
      reach: 760,
      amountSpent: "$4.51",
      costPer1000: "$5.70",
    },
    {
      id: 2,
      highest: 950,
      lowest: 300,
      selected: "lowest",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
      adSetName: "Cruises Around The World - AFD",
      status: "Off",
      chartData: [20, 30, 25, 35, 45],
      reach: 134,
      amountSpent: "$2.10",
      costPer1000: "$15.56",
    },
  ];

  // Show loader for 1.2s whenever dialog opens
  useEffect(() => {
    if (openDialog) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [openDialog]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            Latest results{" "}
            <span className="text-sm font-normal text-gray-600">
              Last 7 days
            </span>
            <Tooltip
              content="Does not includes todays data"
              id="latest-results"
            >
              <Info size={16} className="text-gray-400 " />
            </Tooltip>
          </h3>
          <p className="text-sm text-gray-600">
            Filter by result to see how your ads are doing.
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowResultDropdown(!showResultDropdown)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
          >
            {selectedResult}
            <ChevronDown size={16} />
          </button>

          {showResultDropdown && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-2 space-y-1">
                {options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="results"
                      value={option}
                      checked={selectedResult === option}
                      onChange={() => setSelectedResult(option)}
                      className="text-blue-600 w-4 h-4"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-8">
        {currentData.metrics.map((metric, i) => (
          <div key={i}>
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-sm font-medium text-gray-900">{metric}</h4>
              <Tooltip content={currentData.tooltips[i]} id={metric}>
                <Info size={14} className="text-gray-400  " />
              </Tooltip>
            </div>
            <div className="text-3xl  text-gray-900">
              {currentData.values[i]}
            </div>

            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={() => {
                setDialogType(metric);
                setOpenDialog(true);
              }}
            >
              View more
            </button>
          </div>
        ))}
      </div>

      {/* Dialog */}
      {openDialog && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setOpenDialog(false)}
          />

          {/* Dialog Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[85vh] relative">
              {/* Dialog Header */}
              <div className="flex items-center justify-between p-3 ">
                <div>
                  <h2 className=" font-bold text-gray-900 flex items-center gap-2">
                    Latest results{" "}
                    <span className="text-sm font-normal text-gray-600">
                      Last 7 days
                    </span>
                    <Tooltip
                      content="Latest results information"
                      id="dialog-latest-results"
                    >
                      <Info size={18} className="text-gray-400 " />
                    </Tooltip>
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Showing the highest and lowest results across ad sets
                  </p>
                </div>
                <button
                  onClick={() => setOpenDialog(false)}
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>

              {/* Dialog Body */}
              <div className="p-1 overflow-hidden">
                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="space-y-6 max-h-[500px] overflow-y-auto p-2 ">
                    {adSets.map((adSet) => (
                      <div
                        key={adSet.id}
                        className="space-y-4 rounded-md p-4 bg-white border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                      >
                        {/* Section Header */}
                        <div className="flex items-center gap-2">
                          {adSet.selected === "highest" ? (
                            <ArrowUp
                              size={16}
                              className="text-white font-bold bg-gray-900 rounded-full p-1 "
                            />
                          ) : (
                            <ArrowDown
                              size={16}
                              className="text-white font-bold bg-gray-900 rounded-full p-1 "
                            />
                          )}
                          <h4 className="text-xs font-bold text-gray-900 capitalize">
                            {adSet.selected}
                          </h4>
                        </div>

                        {/* Ad Set Card */}
                        <div className="border-none p-0 bg-transparent">
                          <div className="flex items-start gap-4">
                            {/* Ad Image */}
                            <img
                              src={adSet.image || "/placeholder.svg"}
                              alt={adSet.adSetName}
                              className="w-16 h-16 rounded object-cover flex-shrink-0 flex items-center justify-center mt-3"
                            />

                            {/* Ad Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between ">
                                <div className="flex-1">
                                  <p className="text-xs text-gray-500 mb-1">
                                    Ad set name
                                  </p>
                                  <h5 className="text-sm font-bold text-gray-900 leading-tight mb-3 max-w-[70%] ">
                                    {adSet.adSetName}
                                  </h5>
                                  <div>
                                    <span
                                      className={`inline-flex items-center px-2  rounded text-xs font-medium ${
                                        adSet.status === "Active"
                                          ? "bg-green-600/15 text-green-600 rounded-full"
                                          : "bg-gray-600/15 text-gray-600  rounded-full"
                                      }`}
                                    >
                                      {adSet.status}
                                    </span>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 ml-4">
                                  <Tooltip
                                    content="View charts"
                                    id={`chart-${adSet.id}`}
                                  >
                                    <button className="p-2 rounded hover:bg-gray-100 transition-colors">
                                      <BarChart3
                                        size={20}
                                        className="text-gray-600"
                                      />
                                    </button>
                                  </Tooltip>
                                  <Tooltip
                                    content="Edit ad set"
                                    id={`edit-${adSet.id}`}
                                  >
                                    <button className="p-2 rounded hover:bg-gray-100 transition-colors">
                                      <Pencil
                                        size={20}
                                        className="text-gray-600"
                                      />
                                    </button>
                                  </Tooltip>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Divider */}
                          <hr className="my-4 border-gray-300" />

                          {/* Metrics */}
                          <div className="space-y-2">
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-bold text-gray-900">
                                {adSet.reach}
                              </span>
                              <span className="text-sm text-black/70">
                                Reach
                              </span>
                            </div>
                            <div className="text-sm text-black/70">
                              {adSet.amountSpent} Amount spent,{" "}
                              {adSet.costPer1000} Cost per 1,000 Impressions
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Dialog Footer */}
              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={() => setOpenDialog(false)}
                  className="w-full py-3 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  See all relevant ad sets
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Dropdown Overlay */}
      {showResultDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowResultDropdown(false)}
        />
      )}
    </div>
  );
}
