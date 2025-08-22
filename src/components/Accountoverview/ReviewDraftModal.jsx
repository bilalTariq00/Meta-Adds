"use client";

import { useState } from "react";
import { X, Info, AlertTriangle, TestTube, FlaskConical } from "lucide-react";

const ReviewDraftModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [showInfoBox, setShowInfoBox] = useState(true);

  // Mock data for campaigns with selection state
  const [campaignsData, setCampaignsData] = useState([
    {
      id: 1,
      name: "Auto Insurance Leads - AFDTFB - Copy",
      change: "NEW",
      errors: null,
      selected: true,
    },
    {
      id: 2,
      name: "Auto Insurance Leads - AFDTFB - Copy 2",
      change: "NEW",
      errors: null,
      selected: true,
    },
  ]);

  // Mock data for ad sets with selection state
  const [adSetsData, setAdSetsData] = useState([
    {
      id: 1,
      name: "Auto Insurance Leads - AFDTFB",
      change: "NEW",
      errors: null,
      selected: true,
    },
    {
      id: 2,
      name: "Test - DYT - Solar Panel",
      change: "NEW",
      errors: null,
      selected: true,
    },
    {
      id: 3,
      name: "Auto Insurance Leads - AFDTFB",
      change: "NEW",
      errors: null,
      selected: true,
    },
  ]);

  // Mock data for ads with selection state
  const [adsData, setAdsData] = useState([
    {
      id: 1,
      name: "Auto Insurance Leads - AFDTFB",
      change: "NEW",
      errors: "Fix error",
      selected: false,
    },
    {
      id: 2,
      name: "DYT - Solar Panel",
      change: "NEW",
      errors: null,
      selected: true,
    },
    {
      id: 3,
      name: "Auto Insurance Leads - AFDTFB",
      change: "NEW",
      errors: "Fix error",
      selected: true,
    },
  ]);

  const getTabData = () => {
    switch (activeTab) {
      case "campaigns":
        return {
          data: campaignsData,
          label: "Campaign name",
          setter: setCampaignsData,
        };
      case "adsets":
        return {
          data: adSetsData,
          label: "Ad set name",
          setter: setAdSetsData,
        };
      case "ads":
        return { data: adsData, label: "Ad name", setter: setAdsData };
      default:
        return {
          data: campaignsData,
          label: "Campaign name",
          setter: setCampaignsData,
        };
    }
  };

  const getSelectedCount = (data) => {
    return data.filter((item) => item.selected).length;
  };

  const getBadgeText = (data) => {
    const selectedCount = getSelectedCount(data);
    const totalCount = data.length;

    if (selectedCount === totalCount) {
      return totalCount.toString();
    } else {
      return `${selectedCount} of ${totalCount}`;
    }
  };

  const handleSelectAll = () => {
    const { data, setter } = getTabData();
    const allSelected = data.every((item) => item.selected);

    setter(
      data.map((item) => ({
        ...item,
        selected: !allSelected,
      }))
    );
  };

  const handleIndividualSelect = (id) => {
    const { data, setter } = getTabData();

    setter(
      data.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const getTabIcon = (tab) => {
    const isActive = activeTab === tab; // check if this tab is active

    switch (tab) {
      case "campaigns":
        return (
          <img
            src={
              isActive
                ? "/images/campaigns/AllAdsDark.png"
                : "/images/campaigns/AllAds.png"
            }
            alt=""
            className="w-4 h-4"
          />
        );
      case "adsets":
        return (
          <img
            src={
              isActive
                ? "/images/campaigns/AdSet.png"
                : "/images/campaigns/AdSetLight.png"
            }
            alt=""
            className="w-4 h-4"
          />
        );
      case "ads":
        return (
          <img
            src={
              isActive
                ? "/images/campaigns/Ads.png"
                : "/images/campaigns/AdsLight.png"
            }
            alt=""
            className="w-4 h-4"
          />
        );
      default:
        return null;
    }
  };

  const { data, label } = getTabData();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 ">
          <h2 className="text-xl font-semibold text-gray-900">
            Review draft items
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex  px-6">
          <button
            onClick={() => setActiveTab("campaigns")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "campaigns"
                ? " text-blue-600 bg-blue-50"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {getTabIcon("campaigns")}
            Campaigns
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
              {getBadgeText(campaignsData)}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("adsets")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium  transition-colors ${
              activeTab === "adsets"
                ? "border-blue-500 text-blue-600 bg-blue-50"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {getTabIcon("adsets")}
            Ad sets
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
              {getBadgeText(adSetsData)}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("ads")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium  transition-colors ${
              activeTab === "ads"
                ? "border-blue-500 text-blue-600 bg-blue-50"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {getTabIcon("ads")}
            Ads
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
              {getBadgeText(adsData)}
            </span>
          </button>
        </div>

        {/* Content */}

        <div className="p-6">
          {/* A/B Test Notice */}
          {showInfoBox && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
              <div className="flex items-start">
                <Info
                  size={20}
                  className="text-blue-400 mr-3 mt-0.5 flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        All A/B test campaigns, ad sets and ads are selected
                      </h3>
                      <p className="text-sm text-gray-700">
                        You selected a campaign, ad set or ad that is part of an
                        A/B test. To ensure that your test results are accurate
                        and valid, we've selected all campaigns, ad sets and ads
                        that are part of your test. Your test will begin once
                        you've published.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowInfoBox(false)}
                      className="ml-4 p-1 hover:bg-blue-100 rounded"
                    >
                      <X size={16} className="text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto  ">
            <table className="min-w-full border-collapse border border-gray-100">
              {/* Table Header */}
              <thead className="bg-gray-50 border border-black">
                <tr className="border-b-2 border-gray-500">
                  <th className="border border-gray-300 px-4 py-2 w-12 text-center">
                    <div className="relative flex justify-center">
                      <input
                        type="checkbox"
                        checked={data.every((item) => item.selected)}
                        onChange={handleSelectAll}
                        className="w-4 h-4 appearance-none bg-white border border-gray-300 rounded focus:ring-0 checked:bg-white"
                      />
                      {data.every((item) => item.selected) && (
                        <svg
                          className="w-4 h-4 absolute text-[#0A78BE] pointer-events-none"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 
             01-1.414 0l-4-4a1 1 0 011.414-1.414L8 
             12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </th>

                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-900">
                    {label}
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-900 w-32">
                    Change
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-900 w-48">
                    Errors
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={item.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={item.selected}
                          onChange={() => handleIndividualSelect(item.id)}
                          className="peer appearance-none w-5 h-5 border border-gray-300 rounded bg-white checked:bg-white checked:border-gray-300 focus:ring-0 cursor-pointer"
                        />
                        {/* Tick appears only when checked */}
                        <svg
                          className="absolute w-4 h-4 text-[#0A78BE] pointer-events-none hidden peer-checked:block"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex items-center gap-2">
                        {activeTab === "adsets" &&
                          item.name.includes("Test") && (
                            <div className="text-blue-500">
                              <FlaskConical size={14} />
                            </div>
                          )}
                        <span className="text-sm text-gray-900">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium text-gray-800">
                        {item.change}
                      </span>
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      {item.errors ? (
                        <button className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm font-medium hover:bg-yellow-200 transition-colors">
                          <AlertTriangle size={14} />
                          {item.errors}
                        </button>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className=" px-6 py-4 ">
          <p className="text-sm text-gray-600 mb-3">
            By clicking <span className="font-medium">Publish</span>, you
            acknowledge that your use of Meta's ad tools is subject to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms and Conditions
            </a>
            .
          </p>
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-green-800/90 rounded-sm hover:bg-green-700 transition-colors">
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDraftModal;
