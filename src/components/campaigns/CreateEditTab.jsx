"use client";

import React, { useState } from "react";
import { 
  Check,
  Info,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Edit3,
  Pencil,
  Eye,
  Send
} from "lucide-react";

export default function CreateEditTab({ 
  selectedFieldData, 
  onPublish, 
  onNext, 
  onBack,
  totalSteps = 3 
}) {
  const [activeTab, setActiveTab] = useState("edit");
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignName, setCampaignName] = useState(
    selectedFieldData?.name || "New Traffic Campaign with recommended settings"
  );
  const [budgetStrategy, setBudgetStrategy] = useState("campaign-budget");
  const [dailyBudget, setDailyBudget] = useState("1.00");
  const [abTestEnabled, setAbTestEnabled] = useState(false);
  const [advantagePlusCampaign, setAdvantagePlusCampaign] = useState(false);

  const handlePublish = () => {
    const campaignData = {
      id: `new_campaign_${Date.now()}`,
      name: campaignName,
      objective: selectedFieldData?.objective || "Traffic",
      buyingType: selectedFieldData?.buyingType || "Auction",
      budgetStrategy,
      dailyBudget,
      abTestEnabled,
      advantagePlusCampaign,
      status: "Active",
      delivery: "Active",
      actions: "—",
      bidStrategy: "Highest volume",
      budget: "Using campaign budget",
      attribution: "7-day click, 1-day view",
      results: "—",
      reach: 0,
      impressions: 0,
      costPerResult: "—",
      amountSpent: 0,
      ends: "Ongoing",
      lastEdit: new Date().toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }) + ', ' + new Date().toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      editTime: "Just now",
      resultType: "Website view content",
      on: true,
      hadDelivery: false,
      active: true,
    };

    if (onPublish) {
      onPublish(campaignData);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
    if (onNext) {
      onNext();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="flex h-full w-full">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {/* Edit/Review Tabs - Centered */}
        <div className="flex justify-center bg-white">
          <div className="flex py-2 gap-2">
            <button
              onClick={() => setActiveTab("edit")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "edit"
                  ? " text-blue-600 bg-blue-50"
                  : "border-transparent hover:bg-gray-100 text-gray-500 hover:text-gray-700"
              }`}
            >
              <Pencil className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => setActiveTab("review")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "review"
                  ? " text-blue-600 bg-blue-50"
                  : "border-transparent hover:bg-gray-100 text-gray-500 hover:text-gray-700"
              }`}
            >
              <Eye className="w-4 h-4" />
              Review
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="py-6 flex flex-col items-center">
          {activeTab === "edit" && (
            <div className="flex gap-6 max-w-5xl">
              {/* Left Side - Campaign Cards */}
              <div className="flex-1 space-y-4">
                {/* Step Indicator */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{currentStep}</span>
                      </div>
                      <span className="text-sm font-medium text-blue-900">
                        Step {currentStep} of {totalSteps}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalSteps }, (_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i + 1 <= currentStep ? 'bg-blue-600' : 'bg-blue-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Campaign Name Card */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 border border-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-500" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {currentStep === 1 ? "Campaign name" : currentStep === 2 ? "Ad set name" : "Ad name"}
                    </h3>
                  </div>

                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={currentStep === 1 ? campaignName : currentStep === 2 ? "New Traffic Ad set with recommended settings" : "New Traffic Ad with recommended"}
                      onChange={(e) => currentStep === 1 && setCampaignName(e.target.value)}
                      className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button className="px-3 py-1.5 border border-gray-300 rounded text-xs hover:bg-gray-50 transition-colors">
                      Create template
                    </button>
                  </div>

                  <div className="bg-blue-50 rounded p-2 border-l-2 border-blue-500">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-gray-700">
                        <p>
                          {currentStep === 1 
                            ? "We're improving your campaign's potential with the best setup for your goal."
                            : currentStep === 2 
                            ? "2 automated rules could make changes to this ad set if their conditions are met."
                            : "We're improving your ad's potential with the best setup for your goal."
                          }
                        </p>
                        <button className="text-blue-600 hover:underline mt-1">
                          {currentStep === 1 ? "See all preset settings" : currentStep === 2 ? "View active automated rules" : "See all preset settings"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Campaign Details Card */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 border border-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-500" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {currentStep === 1 ? "Campaign details" : currentStep === 2 ? "Conversion location" : "Destination"}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {currentStep === 1 ? (
                      <>
                        <div className="bg-gray-50 rounded p-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-xs font-medium text-gray-900">
                                Buying type
                              </div>
                              <div className="text-xs text-gray-600">Auction</div>
                            </div>
                            <Edit3 className="w-4 h-4 text-blue-500" />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-xs font-medium text-gray-900">
                            Campaign objective
                            <Info className="w-4 h-4 text-gray-500" />
                          </div>
                          <div className="text-xs text-gray-600">Traffic</div>
                        </div>

                        <button className="text-blue-600 hover:underline text-xs flex items-center gap-1">
                          Show more options
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </>
                    ) : currentStep === 2 ? (
                      <>
                        <div className="text-xs text-gray-600 mb-3">
                          Choose where you want to drive traffic.
                        </div>

                        <div className="space-y-2">
                          <label className="flex items-start gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="conversion-location"
                              value="website"
                              defaultChecked
                              className="mt-0.5"
                            />
                            <div>
                              <div className="text-xs font-medium text-gray-900">
                                Website
                              </div>
                              <div className="text-xs text-gray-600">
                                Send traffic to your website.
                              </div>
                            </div>
                          </label>

                          <label className="flex items-start gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="conversion-location"
                              value="app"
                              className="mt-0.5"
                            />
                            <div>
                              <div className="text-xs font-medium text-gray-900">
                                App
                              </div>
                              <div className="text-xs text-gray-600">
                                Send traffic to your app.
                              </div>
                            </div>
                          </label>
                        </div>

                        <button className="text-blue-600 hover:underline text-xs">
                          About conversion locations
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="text-xs text-gray-600 mb-3">
                          Tell us where to send people immediately after they tap or click your ad.
                        </div>

                        <div className="space-y-2">
                          <label className="flex items-start gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="destination"
                              value="website"
                              defaultChecked
                              className="mt-0.5"
                            />
                            <div>
                              <div className="text-xs font-medium text-gray-900">
                                Website
                              </div>
                            </div>
                          </label>

                          <label className="flex items-start gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="destination"
                              value="instant-experience"
                              className="mt-0.5"
                            />
                            <div>
                              <div className="text-xs font-medium text-gray-900">
                                Instant Experience
                              </div>
                            </div>
                          </label>
                        </div>

                        <div className="mt-3">
                          <label className="block text-xs font-medium text-gray-900 mb-1">
                            * Website URL
                          </label>
                          <input
                            type="url"
                            placeholder="http://www.example.com/page"
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            Enter the website URL field for your ad.
                          </div>
                        </div>

                        <button className="text-blue-600 hover:underline text-xs">
                          Learn more
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Campaign Spending Limit Card */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-900">
                      Campaign spending limit
                      <Info className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">None added</div>
                </div>

                {/* Budget Card */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border border-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-500" />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        Budget
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        Advantage+ on
                      </div>
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-900">
                          Budget strategy
                          <Info className="w-4 h-4 text-gray-500" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-start gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="budget-strategy"
                            value="campaign-budget"
                            checked={budgetStrategy === "campaign-budget"}
                            onChange={(e) => setBudgetStrategy(e.target.value)}
                            className="mt-0.5"
                          />
                          <div>
                            <div className="text-xs font-medium text-gray-900">
                              Campaign budget
                            </div>
                            <div className="text-xs text-gray-600">
                              Automatically distribute your budget to the best
                              opportunities across your campaign. Also known as
                              Advantage+ campaign budget.
                            </div>
                            <button className="text-blue-600 hover:underline text-xs mt-1">
                              About campaign budget
                            </button>
                          </div>
                        </label>

                        <label className="flex items-start gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="budget-strategy"
                            value="ad-set-budget"
                            checked={budgetStrategy === "ad-set-budget"}
                            onChange={(e) => setBudgetStrategy(e.target.value)}
                            className="mt-0.5"
                          />
                          <div>
                            <div className="text-xs font-medium text-gray-900">
                              Ad set budget
                            </div>
                            <div className="text-xs text-gray-600">
                              Set different bid strategies or budget schedules
                              for each ad set.
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {budgetStrategy === "campaign-budget" && (
                      <div className="flex gap-2 items-center">
                        <select className="px-2 py-1 border border-gray-300 rounded text-xs">
                          <option>Daily budget</option>
                        </select>
                        <input
                          type="text"
                          value={dailyBudget}
                          onChange={(e) => setDailyBudget(e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-xs w-20"
                        />
                        <span className="text-xs text-gray-600">USD</span>
                      </div>
                    )}

                    <div className="text-xs text-gray-600">
                      You'll spend an average of ${dailyBudget} per day. Your
                      maximum daily spend is $1.75 and your maximum weekly spend
                      is $7.00.
                    </div>

                    <button className="text-blue-600 hover:underline text-xs">
                      About daily budget
                    </button>
                  </div>
                </div>

                {/* Campaign Bid Strategy Card */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-900">
                      Campaign bid strategy
                      <Info className="w-4 h-4 text-gray-500" />
                    </div>
                    <button className="text-blue-600 hover:underline text-xs flex items-center gap-1">
                      Show more settings ▾
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs text-gray-900">
                    Highest volume
                  </div>
                </div>

                {/* A/B Test Card */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">
                      A/B test
                    </h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={abTestEnabled}
                        onChange={(e) => setAbTestEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      <span className="ml-2 text-xs font-medium text-gray-900">
                        {abTestEnabled ? "On" : "Off"}
                      </span>
                    </label>
                  </div>

                  <div className="text-xs text-gray-600 mb-2">
                    Help improve ad performance by comparing versions to see
                    what works best. For accuracy, each one will be shown to
                    separate groups of your audience.
                  </div>

                  <button className="text-blue-600 hover:underline text-xs">
                    About A/B tests
                  </button>
                </div>

                {/* Special Ad Categories Card */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 border border-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-500" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Special Ad Categories
                    </h3>
                  </div>

                  <div className="text-xs text-gray-600 mb-3">
                    Declare if your ads are related to financial products and
                    services, employment, housing, social issues, elections or
                    politics to help prevent ad rejections. Requirements differ
                    by country.
                  </div>

                  <button className="text-blue-600 hover:underline text-xs mb-3">
                    About Special Ad Categories
                  </button>

                  <div>
                    <div className="text-xs font-medium text-gray-900 mb-2">
                      Categories
                    </div>
                    <div className="text-xs text-gray-600 mb-3">
                      Select the categories that best describe what this
                      campaign will advertise.
                    </div>

                    <div className="relative">
                      <button className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs bg-white text-left flex items-center justify-between hover:bg-gray-50">
                        <span className="text-gray-700">
                          Declare category if applicable
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Campaign Score */}
              <div className="w-80 flex-shrink-0">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 sticky top-0">
                  <div className="space-y-4">
                    {/* Campaign Recommendations Header */}
                    <div className="">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-green-500" />
                        <h3 className="text-sm font-semibold text-gray-900">
                          Campaign recommendations
                        </h3>
                      </div>

                      {/* Advantage+ Leads Campaign */}
                      <div className="bg-white rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-green-500" />
                            <span className="text-xs font-medium text-gray-900">
                              Advantage+ leads campaign
                            </span>
                            <Info className="w-4 h-4 text-gray-500" />
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={advantagePlusCampaign}
                                onChange={(e) =>
                                  setAdvantagePlusCampaign(e.target.checked)
                                }
                                className="sr-only peer"
                              />
                              <div className="w-7 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">
                          You have Advantage+ off for Placements.
                        </div>
                      </div>

                      {/* Including All Available Placements */}
                      <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-green-500" />
                            <span className="text-xs font-medium text-gray-900">
                              Including all available placements could improve
                              performance for 2 ad sets
                            </span>
                          </div>
                          <ChevronUp className="w-4 h-4 text-gray-500" />
                        </div>

                        <div className="text-xs text-gray-600 mb-3 space-y-1">
                          <p>
                            The more places your ad is displayed, the more
                            chances your target audience has to see it.
                          </p>
                          <p>
                            Including all available placements will turn
                            Advantage+ on for Placements for 2 ad sets.
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <button className="flex-1 bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-blue-700 transition-colors">
                            Apply now
                          </button>
                          <button className="flex-1 border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-xs font-medium hover:bg-gray-50 transition-colors">
                            View in ad set
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Review Tab Content */}
          {activeTab === "review" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Side - Full Review Card */}
              <div className="col-span-1">
                <div className="bg-white rounded-lg border border-gray-200 md:w-[500px] w-full">
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="group relative hover:bg-gray-50 p-3 rounded transition-colors">
                        <div className="text-base font-medium text-gray-900 mb-2">
                          Campaign name
                        </div>
                        <div className="text-base text-gray-600">
                          {campaignName}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: 120232146845310228
                        </div>
                      </div>

                      <div className="group relative hover:bg-gray-50 p-3 rounded transition-colors">
                        <div className="text-base font-medium text-gray-900 mb-2">
                          Buying type
                        </div>
                        <div className="text-base text-gray-600">Auction</div>
                      </div>

                      <div className="group relative hover:bg-gray-50 p-3 rounded transition-colors">
                        <div className="text-base font-medium text-gray-900 mb-2">
                          Objective
                        </div>
                        <div className="text-base text-gray-600">Traffic</div>
                      </div>

                      <div className="group relative hover:bg-gray-50 p-3 rounded transition-colors">
                        <div className="text-base font-medium text-gray-900 mb-2">
                          Budget strategy
                        </div>
                        <div className="text-base text-gray-600">
                          Campaign budget
                        </div>
                        <div className="text-base text-gray-600">
                          Daily Budget ${dailyBudget}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto p-6 border-t sticky bottom-0 border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <p className="text-base text-gray-600">
              By clicking Publish, you acknowledge that your use of Meta's ad
              tools is subject to our{" "}
              <button className="text-blue-600 hover:underline">
                Terms and Conditions
              </button>
              .
            </p>
            <div className="flex gap-3">
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
                >
                  Back
                </button>
              )}
              
              {currentStep < totalSteps ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handlePublish}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Publish
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}