import React, { useState } from "react";
import { X, ChevronDown, ChevronUp, Info, Search } from "lucide-react";

export default function DynamicDuplicateModal({
  open,
  onClose,
  onDuplicate,
  activeTab,
  applyRecommendation,
  setApplyRecommendation,
}) {
  const [copies, setCopies] = useState(1);
  const [selectedCampaign, setSelectedCampaign] = useState(
    "Auto Insurance Leads - AFDTFB – Copy 3"
  );
  const [selectedAdSet, setSelectedAdSet] = useState(
    "Auto Insurance Leads - AFDTFB – Copy"
  );
  const [campaignOption, setCampaignOption] = useState("existing"); // existing or new
  const [adSetOption, setAdSetOption] = useState("existing"); // existing or new

  if (!open) return null;

  const getModalTitle = () => {
    if (activeTab === "campaigns") return "Duplicate your campaign";
    if (activeTab === "adsets") return "Duplicate your ad set";
    if (activeTab === "ads") return "Duplicate your ad";
    return "Duplicate";
  };

  const renderCampaignContent = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">
          Number of copies
        </label>
        <div className="relative">
          <input
            type="number"
            value={copies}
            onChange={(e) => setCopies(parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
          />
          <div className="absolute right-3 top-2 flex flex-col">
            <button
              onClick={() => setCopies((c) => c + 1)}
              className="text-gray-400 hover:text-gray-600"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCopies((c) => Math.max(1, c - 1))}
              className="text-gray-400 hover:text-gray-600"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="reactions"
          checked={applyRecommendation}
          onChange={(e) => setApplyRecommendation(e.target.checked)}
          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <div className="flex-1">
          <label
            htmlFor="reactions"
            className="text-sm text-gray-900 cursor-pointer flex items-center gap-2"
          >
            Show existing reactions, comments and shares on new ads
            <Info className="w-4 h-4 text-gray-400" />
          </label>
        </div>
      </div>
    </div>
  );

  const renderAdSetContent = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">
          Select a campaign for your ad set
        </label>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="campaign"
              value="existing"
              checked={campaignOption === "existing"}
              onChange={(e) => setCampaignOption(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-900">
              Existing campaign
            </span>
          </label>

          {campaignOption === "existing" && (
            <div className="ml-7 relative">
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  value={selectedCampaign}
                  onChange={(e) => setSelectedCampaign(e.target.value)}
                  className="flex-1 outline-none text-sm"
                />
                <span className="text-xs text-gray-500 ml-2">
                  Original campaign
                </span>
              </div>
            </div>
          )}

          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="campaign"
              value="new"
              checked={campaignOption === "new"}
              onChange={(e) => setCampaignOption(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-900">
              New campaign
            </span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">
          Number of copies
        </label>
        <div className="relative">
          <input
            type="number"
            value={copies}
            onChange={(e) => setCopies(parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
          />
          <div className="absolute right-3 top-2 flex flex-col">
            <button
              onClick={() => setCopies((c) => c + 1)}
              className="text-gray-400 hover:text-gray-600"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCopies((c) => Math.max(1, c - 1))}
              className="text-gray-400 hover:text-gray-600"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="reactions-adset"
          checked={applyRecommendation}
          onChange={(e) => setApplyRecommendation(e.target.checked)}
          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <div className="flex-1">
          <label
            htmlFor="reactions-adset"
            className="text-sm text-gray-900 cursor-pointer flex items-center gap-2"
          >
            Show existing reactions, comments and shares on new ads
            <Info className="w-4 h-4 text-gray-400" />
          </label>
        </div>
      </div>
    </div>
  );

  const renderAdContent = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">
          Select a campaign for your ad
        </label>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="campaign-ad"
              value="existing"
              checked={campaignOption === "existing"}
              onChange={(e) => setCampaignOption(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-900">
              Existing campaign
            </span>
          </label>

          {campaignOption === "existing" && (
            <div className="ml-7 relative">
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  value={selectedCampaign}
                  onChange={(e) => setSelectedCampaign(e.target.value)}
                  className="flex-1 outline-none text-sm"
                />
                <span className="text-xs text-gray-500 ml-2">
                  Original campaign
                </span>
              </div>
            </div>
          )}

          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="campaign-ad"
              value="new"
              checked={campaignOption === "new"}
              onChange={(e) => setCampaignOption(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-900">
              New campaign
            </span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">
          Select an ad set for your ad
        </label>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="adset"
              value="existing"
              checked={adSetOption === "existing"}
              onChange={(e) => setAdSetOption(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-900">
              Existing ad set
            </span>
          </label>

          {adSetOption === "existing" && (
            <div className="ml-7">
              <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                <div className="text-xs text-gray-600 mb-1">
                  You selected 1 ad set
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    {selectedAdSet}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      Original ad set
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Add to another ad set"
                  className="flex-1 outline-none text-gray-500"
                />
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Add to All
                </button>
              </div>
            </div>
          )}

          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="adset"
              value="new"
              checked={adSetOption === "new"}
              onChange={(e) => setAdSetOption(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-900">
              New ad set
            </span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">
          Number of copies
        </label>
        <div className="relative">
          <input
            type="number"
            value={copies}
            onChange={(e) => setCopies(parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
          />
          <div className="absolute right-3 top-2 flex flex-col">
            <button
              onClick={() => setCopies((c) => c + 1)}
              className="text-gray-400 hover:text-gray-600"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCopies((c) => Math.max(1, c - 1))}
              className="text-gray-400 hover:text-gray-600"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="reactions-ad"
          checked={applyRecommendation}
          onChange={(e) => setApplyRecommendation(e.target.checked)}
          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <div className="flex-1">
          <label
            htmlFor="reactions-ad"
            className="text-sm text-gray-900 cursor-pointer flex items-center gap-2"
          >
            Show existing reactions, comments and shares on new ads
            <Info className="w-4 h-4 text-gray-400" />
          </label>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (activeTab === "campaigns") return renderCampaignContent();
    if (activeTab === "adsets") return renderAdSetContent();
    if (activeTab === "ads") return renderAdContent();
    return renderCampaignContent();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 ">
          <h2 className="text-lg font-semibold text-gray-900">
            {getModalTitle()}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">{renderContent()}</div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onDuplicate({ copies, applyRecommendation });
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Duplicate
          </button>
        </div>
      </div>
    </div>
  );
}
