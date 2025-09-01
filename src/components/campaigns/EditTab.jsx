"use client";

import { useState, useRef, useEffect } from "react";
import {
  Check,
  Info,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Edit3,
  X,
  Plus,
  GripVertical,
  Type,
  Trash2,
  Eye,
  Pencil,
  Building2,
  Briefcase,
  Home,
  Megaphone,
} from "lucide-react";
import CampaignNameModal from "./CampaignNameModal";

export default function EditTab() {
  const [activeTab, setActiveTab] = useState("edit");
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showMoreSettings, setShowMoreSettings] = useState(false);
  const [showBudgetScheduling, setShowBudgetScheduling] = useState(false);
  const [campaignName, setCampaignName] = useState(
    "DYT - Home Improvement US Campaign"
  );
  const [budgetStrategy, setBudgetStrategy] = useState("campaign-budget");
  const [dailyBudget, setDailyBudget] = useState("1.00");
  const [bidStrategy, setBidStrategy] = useState("highest-volume");
  const [abTestEnabled, setAbTestEnabled] = useState(false);
  const [specialAdCategories, setSpecialAdCategories] = useState([]);
  const [advantagePlusCampaign, setAdvantagePlusCampaign] = useState(false);
  const [advantagePlusPlacements, setAdvantagePlusPlacements] = useState(false);
  const [selectedSpecialAdCategory, setSelectedSpecialAdCategory] =
    useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCountriesDropdown, setShowCountriesDropdown] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [showExpandedView, setShowExpandedView] = useState(false);
  const dropdownRef = useRef(null);

  // Refs for scrolling to specific cards
  const campaignNameRef = useRef(null);
  const campaignDetailsRef = useRef(null);
  const budgetRef = useRef(null);
  const bidStrategyRef = useRef(null);
  const specialAdRef = useRef(null);

  // Category options for dropdown
  const categoryOptions = [
    {
      id: "financial",
      label: "Financial products and services",
      icon: Building2,
      description:
        "Ads for credit cards, long-term financing, current and savings accounts, investment services, insurance services or other related financial opportunities.",
    },
    {
      id: "employment",
      label: "Employment",
      icon: Briefcase,
      description:
        "Ads for job offers, internships, professional certification programmes or other related opportunities.",
    },
    {
      id: "housing",
      label: "Housing",
      icon: Home,
      description:
        "Ads for property listings, home insurance, mortgages or other related opportunities.",
    },
    {
      id: "social-issues",
      label: "Social issues, elections or politics",
      icon: Megaphone,
      description:
        "Ads about social issues (such as the economy, or civil and social rights), elections, or political figures or campaigns.",
    },
  ];

  // Country options for dropdown
  const countryOptions = [
    { id: "pakistan", label: "Pakistan" },
    { id: "india", label: "India" },
    { id: "usa", label: "United States" },
    { id: "uk", label: "United Kingdom" },
    { id: "canada", label: "Canada" },
    { id: "australia", label: "Australia" },
  ];

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories((prev) => {
      const newSelection = prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];

      // Show modal if any categories are selected
      if (newSelection.length > 0) {
        setShowConfirmModal(true);
      }

      return newSelection;
    });
  };

  const getDisplayText = () => {
    if (selectedCategories.length === 0) {
      return "Declare category if applicable";
    }
    if (selectedCategories.length === 1) {
      const category = categoryOptions.find(
        (opt) => opt.id === selectedCategories[0]
      );
      return category ? category.label : "Declare category if applicable";
    }
    if (selectedCategories.length === 2) {
      const categories = selectedCategories
        .map((id) => categoryOptions.find((opt) => opt.id === id)?.label)
        .filter(Boolean);
      return categories.join(" and ");
    }
    return `${selectedCategories.length} categories selected`;
  };

  const handleModifyAdSets = () => {
    setShowConfirmModal(false);
    setShowExpandedView(true);
    // Set default country selection
    setSelectedCountries(["pakistan"]);
  };

  const handleCountryToggle = (countryId) => {
    setSelectedCountries((prev) => {
      if (prev.includes(countryId)) {
        return prev.filter((id) => id !== countryId);
      } else {
        return [...prev, countryId];
      }
    });
  };

  const getCountryDisplayText = () => {
    if (selectedCountries.length === 0) {
      return "Select countries";
    }
    if (selectedCountries.length === 1) {
      const country = countryOptions.find(
        (opt) => opt.id === selectedCountries[0]
      );
      return country ? country.label : "Select countries";
    }
    return `${selectedCountries.length} countries selected`;
  };

  // Function to scroll to specific card
  const scrollToCard = (cardRef) => {
    setActiveTab("edit");
    setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  const handleSpecialAdCategoryChange = (category) => {
    if (specialAdCategories.includes(category)) {
      setSpecialAdCategories(specialAdCategories.filter((c) => c !== category));
    } else {
      setSpecialAdCategories([...specialAdCategories, category]);
    }
  };



  return (
    <div className="flex h-full w-full">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {/* Edit/Review Tabs - Centered */}
        <div className="flex justify-center  bg-white">
          <div className="flex py-2 gap-2">
            <button
              onClick={() => setActiveTab("edit")}
              className={`flex items-center  gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
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
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium  transition-colors ${
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
              {/* Left Side - Campaign Recommendations */}

              {/* Right Side - 5 Campaign Cards */}
              <div className="flex-1 space-y-4">
                {/* Campaign Name Card */}
                <div
                  ref={campaignNameRef}
                  className="bg-white rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 border border-green-500  rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4  text-green-500" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Campaign name
                    </h3>
                  </div>

                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => setShowTemplateModal(true)}
                      className="px-3 py-1.5 border border-gray-300 rounded text-xs hover:bg-gray-50 transition-colors"
                    >
                      Create template
                    </button>
                  </div>

                  <div className="bg-blue-50 rounded p-2 border-l-2 border-blue-500">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-gray-700">
                        <p>
                          2 automated rules could make changes to this campaign
                          if their conditions are met.
                        </p>
                        <button className="text-blue-600 hover:underline mt-1">
                          View active automated rules
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
                      Campaign details
                    </h3>
                  </div>

                  <div className="space-y-3">
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
                      <div className="text-xs text-gray-600">Leads</div>
                    </div>

                    <button className="text-blue-600 hover:underline text-xs flex items-center gap-1">
                      Show more options
                      <ChevronDown className="w-4 h-4" />
                    </button>
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
                <div
                  ref={budgetRef}
                  className="bg-white rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border border-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-500 " />
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
                        <button
                          onClick={() => setShowMoreSettings(!showMoreSettings)}
                          className="text-blue-600 hover:underline text-xs flex items-center gap-1"
                        >
                          {showMoreSettings
                            ? "Hide settings"
                            : "Show more settings"}
                          {showMoreSettings ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
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

                  {showMoreSettings && (
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-900">
                          Budget scheduling
                          <Info className="w-4 h-4 text-gray-500" />
                        </div>
                        <button
                          onClick={() =>
                            setShowBudgetScheduling(!showBudgetScheduling)
                          }
                          className="text-blue-600 hover:underline text-xs"
                        >
                          {showBudgetScheduling
                            ? "Hide settings"
                            : "Show more settings"}
                        </button>
                      </div>

                      {showBudgetScheduling && (
                        <div className="text-xs text-gray-600">
                          None selected
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Campaign Bid Strategy Card */}
                <div
                  ref={bidStrategyRef}
                  className="bg-white rounded-lg p-4 border border-gray-200"
                >
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
                    {bidStrategy === "highest-volume"
                      ? "Highest volume"
                      : "Lowest cost"}
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
                <div
                  ref={specialAdRef}
                  className="bg-white rounded-lg p-4 border border-gray-200"
                >
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

                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={() =>
                          setShowCategoryDropdown(!showCategoryDropdown)
                        }
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs bg-white text-left flex items-center justify-between hover:bg-gray-50"
                      >
                        <span className="text-gray-700">
                          {getDisplayText()}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-500 transition-transform ${
                            showCategoryDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {showCategoryDropdown && (
                        <div className="absolute left-0 right-0 bottom-full mb-1 bg-white border border-gray-300 rounded shadow-lg z-50 max-h-60 overflow-y-auto">
                          {categoryOptions.map((option) => {
                            const IconComponent = option.icon;
                            return (
                              <div
                                key={option.id}
                                className="flex items-start gap-2 p-2 hover:bg-gray-50 cursor-pointer"
                                onClick={() => handleCategoryToggle(option.id)}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedCategories.includes(
                                    option.id
                                  )}
                                  onChange={() =>
                                    handleCategoryToggle(option.id)
                                  }
                                  className="mt-0.5 w-4 h-4 border border-gray-300 rounded"
                                />
                                <div className="flex items-start gap-2">
                                  <IconComponent className="w-4 h-4 text-gray-500 mt-0.5" />
                                  <div>
                                    <div className="text-xs font-medium text-gray-900">
                                      {option.label}
                                    </div>
                                    <div className="text-xs text-gray-600">
                                      {option.description}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Expanded View - Countries Section */}
                    {showExpandedView && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="text-xs font-medium text-gray-900 mb-2">
                          Countries
                        </div>
                        <div className="text-xs text-gray-600 mb-3">
                          Select where you want to run this campaign. If there
                          are additional requirements to run your ads in those
                          locations, your advertising options will be adjusted.
                        </div>

                        <div className="relative">
                          <button
                            onClick={() =>
                              setShowCountriesDropdown(!showCountriesDropdown)
                            }
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs bg-white text-left flex items-center justify-between hover:bg-gray-50"
                          >
                            <span className="text-gray-700">
                              {getCountryDisplayText()}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-gray-500 transition-transform ${
                                showCountriesDropdown ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {showCountriesDropdown && (
                            <div className="absolute left-0 right-0 bottom-full mb-1 bg-white border border-gray-300 rounded shadow-lg z-50 max-h-60 overflow-y-auto">
                              {countryOptions.map((option) => (
                                <div
                                  key={option.id}
                                  className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer"
                                  onClick={() => handleCountryToggle(option.id)}
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedCountries.includes(
                                      option.id
                                    )}
                                    onChange={() =>
                                      handleCountryToggle(option.id)
                                    }
                                    className="w-4 h-4 border border-gray-300 rounded"
                                  />
                                  <span className="text-xs text-gray-900">
                                    {option.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Warning Section */}
                        <div className="mt-4 bg-white border border-gray-200 rounded-lg overflow-hidden">
                          <div className="flex">
                            {/* Red warning bar */}
                            <div className="w-1 bg-red-500"></div>

                            <div className="flex-1 p-4">
                              <div className="flex items-start gap-3">
                                {/* Warning icon */}
                                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-white text-xs font-bold">
                                    !
                                  </span>
                                </div>

                                <div className="flex-1">
                                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                                    Updates needed for your selections
                                  </h4>
                                  <p className="text-base text-gray-600 mb-3">
                                    Because your campaign is related to this
                                    Special ad category, you'll need to update
                                    some of your audience selections.
                                  </p>

                                  {/* Separator line */}
                                  <div className="border-t border-gray-200 mb-3"></div>

                                  {/* Action button */}
                                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                                    Review Special ad category updates
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Right Side -  */}
              <div className="w-80  flex-shrink-0 ">
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
                      <div className="bg-white  rounded-lg p-3 mb-3">
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
                  <div className="p-6 ">
                    <div className=" whitespac-nowrap">
                      {/* Left Column */}
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
                          <button
                            onClick={() => scrollToCard(campaignNameRef)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded text-base text-gray-600 flex items-center gap-1"
                          >
                            <Pencil className="w-4 h-4" />
                            Edit
                          </button>
                        </div>

                        <div className="group relative hover:bg-gray-50 p-3 rounded transition-colors">
                          <div className="text-base font-medium text-gray-900 mb-2">
                            Buying type
                          </div>
                          <div className="text-base text-gray-600">Auction</div>
                          <button
                            onClick={() => setActiveTab("edit")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded text-base text-gray-600 flex items-center gap-1"
                          >
                            <Pencil className="w-4 h-4" />
                            Edit
                          </button>
                        </div>

                        <div className="group relative hover:bg-gray-50 p-3 rounded transition-colors">
                          <div className="text-base font-medium text-gray-900 mb-2">
                            Objective
                          </div>
                          <div className="text-base text-gray-600">Leads</div>
                          <button
                            onClick={() => setActiveTab("edit")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded text-base text-gray-600 flex items-center gap-1"
                          >
                            <Pencil className="w-4 h-4" />
                            Edit
                          </button>
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
                          <button
                            onClick={() => scrollToCard(budgetRef)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded text-base text-gray-600 flex items-center gap-1"
                          >
                            <Pencil className="w-4 h-4" />
                            Edit
                          </button>
                        </div>

                        <div className="group relative hover:bg-gray-50 p-3 rounded transition-colors">
                          <div className="text-base font-medium text-gray-900 mb-2">
                            Budget scheduling
                          </div>
                          <div className="text-base text-gray-600">
                            Enabled: No
                          </div>
                          <button
                            onClick={() => setActiveTab("edit")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded text-sm text-gray-600 flex items-center gap-1"
                          >
                            <Pencil className="w-4 h-4" />
                            Edit
                          </button>
                        </div>

                        <div className="group relative hover:bg-gray-50 p-3 rounded transition-colors">
                          <div className="text-base font-medium text-gray-900 mb-2">
                            Campaign bid strategy
                          </div>
                          <div className="text-base text-gray-600">
                            Highest volume
                          </div>
                          <button
                            onClick={() => scrollToCard(bidStrategyRef)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded text-sm text-gray-600 flex items-center gap-1"
                          >
                            <Pencil className="w-4 h-4" />
                            Edit
                          </button>
                        </div>

                        <div className="group relative hover:bg-gray-50 p-3 rounded transition-colors">
                          <div className="text-base font-medium text-gray-900 mb-2">
                            Delivery type
                          </div>
                          <div className="text-base text-gray-600">
                            Standard
                          </div>
                          <button
                            onClick={() => setActiveTab("edit")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded text-sm text-gray-600 flex items-center gap-1"
                          >
                            <Pencil className="w-4 h-4" />
                            Edit
                          </button>
                        </div>

                        <div className="group relative hover:bg-gray-50 p-3 rounded transition-colors">
                          <div className="text-base font-medium text-gray-900 mb-2">
                            Special Ad Categories
                          </div>
                          <div className="text-base text-gray-600">
                            No categories declared
                          </div>
                          <button
                            onClick={() => scrollToCard(specialAdRef)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded text-sm text-gray-600 flex items-center gap-1"
                          >
                            <Pencil className="w-4 h-4" />
                            Edit
                          </button>
                        </div>

                        <div className="group relative hover:bg-gray-50 p-3 rounded transition-colors">
                          <div className="text-base font-medium text-gray-900 mb-2">
                            Ad sets
                          </div>
                          <div className="text-base text-gray-600">
                            1 total ad sets
                          </div>
                          <button
                            onClick={() => setActiveTab("edit")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded text-sm text-gray-600 flex items-center gap-1"
                          >
                            <Pencil className="w-4 h-4" />
                            Edit
                          </button>
                        </div>
                      </div>

                      {/* Right Column - Activity History */}
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg border border-gray-200">
                          <div className="p-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                              Activity History
                            </h3>
                    </div>

                          {/* Filters */}
                          <div className="p-4 border-b border-gray-200">
            <div className="flex gap-3">
                              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                                <span>
                                  Last 30 days: 3 Aug 2025 - 1 Sep 2025
                                </span>
                                <ChevronDown className="w-4 h-4" />
              </button>
                              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                                <span>Activity history: All</span>
                                <ChevronDown className="w-4 h-4" />
              </button>
                              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                                <span>Changed by: Anyone</span>
                                <ChevronDown className="w-4 h-4" />
              </button>
        </div>
      </div>

                          {/* Table */}
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-200">
                                    Activity
                                  </th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-200">
                                    Activity details
                                  </th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-200">
                                    Item changed
                                  </th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-200">
                                    Changed by
                                  </th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                                    Date and Time
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                <tr className="bg-white hover:bg-gray-50">
                                  <td className="px-4 py-3 text-sm text-gray-900">
                                    Campaign status updated
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-600">
                                    From Active to Pending process
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                                      {campaignName}
          </div>
                                    <div className="text-xs text-gray-500">
                                      Campaign ID: 120232146845310228
                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-900">
                                    Muhammad Bilal
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-600">
                                    22 Aug at 20:21
                                  </td>
                                </tr>
                                <tr className="bg-gray-50 hover:bg-gray-100">
                                  <td className="px-4 py-3 text-sm text-gray-900">
                                    Ad set status updated
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-600">
                                    From Active to Inactive
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                                      20-65 USA FB Feeds only - DYT Home
                                      Improvement
                              </div>
                              <div className="text-xs text-gray-500">
                                      Ad set ID: 120232146845300228
                              </div>
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-900">
                                    Hassan Abbas
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-600">
                                    22 Aug at 01:34
                                  </td>
                                </tr>
                                <tr className="bg-white hover:bg-gray-50">
                                  <td className="px-4 py-3 text-sm text-gray-900">
                                    Ad status updated
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-600">
                                    From Pending process to Active
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                                      DYT Home Improvement
                            </div>
                                    <div className="text-xs text-gray-500">
                                      Ad ID: 120232146845320228
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-900">
                                    Muhammad Bilal
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-600">
                                    21 Aug at 15:42
                                  </td>
                                </tr>
                                <tr className="bg-gray-50 hover:bg-gray-100">
                                  <td className="px-4 py-3 text-sm text-gray-900">
                                    Updated status of ad after it finishes ad
                                    review
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-600">
                                    From Pending process to Inactive
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                                      DYT Home Improvement - Video
                              </div>
                              <div className="text-xs text-gray-500">
                                      Ad ID: 120232146845320229
                              </div>
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-900">
                                    System
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-600">
                                    21 Aug at 14:15
                                  </td>
                                </tr>
                                <tr className="bg-white hover:bg-gray-50">
                                  <td className="px-4 py-3 text-sm text-gray-900">
                                    Campaign budget updated
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-600">
                                    Daily budget changed from $0.50 to $1.00
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                                      {campaignName}
                            </div>
                                    <div className="text-xs text-gray-500">
                                      Campaign ID: 120232146845310228
                          </div>
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-900">
                                    Muhammad Bilal
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-600">
                                    20 Aug at 09:30
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>
          )}

          {/* Footer */}
        </div>
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
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
                Close
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
                Discard Draft
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                Publish
            </button>
          </div>
        </div>
        </div>
      </div>

      {/* Campaign Name Modal */}
      <CampaignNameModal
        isOpen={showTemplateModal && !showSecondModal}
        onClose={() => setShowTemplateModal(false)}
      />

      {/* Second Modal - Campaign Fields */}
      {showSecondModal && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Campaign fields
            </h2>
            <button
              onClick={() => setShowSecondModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-8">
            <div className="max-w-2xl mx-auto">
              <div className="space-y-4">
                <div
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    addTemplateComponent("advantage-plus-budget");
                    setShowSecondModal(false);
                  }}
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Advantage+ campaign budget
                    </div>
                    <div className="text-xs text-gray-500">
                      Campaign budget type
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>

                <div
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    addTemplateComponent("objective");
                    setShowSecondModal(false);
                  }}
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Objective
                    </div>
                    <div className="text-xs text-gray-500">
                      Campaign objective
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>

                <div
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    addTemplateComponent("campaign-id");
                    setShowSecondModal(false);
                  }}
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Campaign ID
                    </div>
                    <div className="text-xs text-gray-500">
                      Unique campaign identifier
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
            <button
              onClick={() => setShowSecondModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Confirm Changes Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Confirm changes
              </h2>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Some settings may change
              </h3>
              <p className="text-base text-gray-600">
                To help you comply with our Advertising Policies, some audience
                selection options are limited or unavailable when running ads in
                certain special categories. Any ad set and ad settings that
                aren't compliant with this special ad category may be changed or
                removed. You'll be able to review all changes before publishing.{" "}
                <button className="text-blue-600 hover:underline">
                  Learn more
                </button>
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Limited options
                </h4>
                <div className="space-y-1">
                  <div className="text-base text-gray-600">• Location</div>
                  <div className="text-base text-gray-600">
                    • Detailed targeting
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Unavailable options
                </h4>
                <div className="space-y-1">
                  <div className="text-base text-gray-600">
                    • Age and gender
                  </div>
                  <div className="text-base text-gray-600">• Postcode</div>
                  <div className="text-base text-gray-600">
                    • Lookalike Audiences
                  </div>
                  <div className="text-base text-gray-600">
                    • Saved audiences
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleModifyAdSets}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Modify Ad Sets
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
