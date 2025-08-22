"use client";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom"; // Add this import for React Router
import {
  ChevronDown,
  MoreHorizontal,
  Info,
  FileText,
  ChevronRight,
  RefreshCw,
  Share,
  Download,
  ArrowLeft,
  Save,
  Search,
  X,
  Lightbulb,
  Delete,
  DeleteIcon,
  LucideDelete,
  Trash,
  Trash2,
} from "lucide-react";
import DetailedTooltip from "../DetailedTooltip";
import userInfo from "@/assets/icons/userOverview.png";
import ReviewDraftModal from "./ReviewDraftModal";
import DiscardDraftsModal from "../campaigns/dialoges/DiscardDraftsModal";

export default function Header() {
  const location = useLocation(); // Get current location from React Router
  const currentPath = location.pathname; // This will update automatically on route changes

  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showProfileSidebar, setShowProfileSidebar] = useState(false);
  const [showActivityHistory, setShowActivityHistory] = useState(false);
  const [showOpportunityDropdown, setShowOpportunityDropdown] = useState(false);
  const [showCreatePortfolioModal, setShowCreatePortfolioModal] =
    useState(false);
  const [showOpportunityModal, setShowOpportunityModal] = useState(false);
  const [hoverTimer, setHoverTimer] = useState(null);
  const [showOpportunityInfoModal, setShowOpportunityInfoModal] =
    useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showReportSettingsModal, setShowReportSettingsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(true);
  const [reportName, setReportName] = useState("Untitled");
  const [showReviewDraftModal, setShowReviewDraftModal] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  // Remove the hardcoded currentPath state:
  // const [currentPath, setCurrentPath] = useState("/campaigns"); // DELETE THIS LINE

  const radius = 45;
  const arcLength = 2 * Math.PI * radius * 0.75; // 75% of full circle (270 degrees)
  const strokeDasharray = arcLength;
  const strokeDashoffset = arcLength - 1 * arcLength;

  const dropdownRef = useRef(null);
  const accountDropdownRef = useRef(null);
  const opportunityModalRef = useRef(null);
  const opportunityDropdownRef = useRef(null);
  const opportunityInfoModalRef = useRef(null);
  const keyboardShortcutsRef = useRef(null);
  const reportSettingsModalRef = useRef(null);
  const shareModalRef = useRef(null);
  const exportModalRef = useRef(null);
  const unsavedChangesModalRef = useRef(null);

  const shortcuts = [
    { keys: "Alt + 1", desc: "Navigate to campaigns." },
    { keys: "Alt + 2", desc: "Navigate to ad sets." },
    { keys: "Alt + 3", desc: "Navigate to ads." },
    {
      keys: "Ctrl + Y",
      desc: "View insights charts for your selected campaigns, ad sets...",
    },
    {
      keys: "Ctrl + U",
      desc: "Open the editor for your selected campaigns, ad sets...",
    },
    {
      keys: "Ctrl + I",
      desc: "View activity history for your selected campaigns, ad sets...",
    },
    { keys: "Ctrl + R", desc: "Review all changes." },
  ];

  // Add useEffect for debugging - you can remove this later
  useEffect(() => {
    console.log("Current path:", currentPath);
    console.log("Page name:", getPageName());
    console.log("Header type:", getHeaderType());
  }, [currentPath]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMoreDropdown(false);
      }
      if (
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(event.target)
      ) {
        setShowAccountDropdown(false);
      }
      if (
        opportunityModalRef.current &&
        !opportunityModalRef.current.contains(event.target)
      ) {
        setShowOpportunityModal(false);
      }
      if (
        opportunityDropdownRef.current &&
        !opportunityDropdownRef.current.contains(event.target)
      ) {
        setShowOpportunityDropdown(false);
      }
      if (
        opportunityInfoModalRef.current &&
        !opportunityInfoModalRef.current.contains(event.target)
      ) {
        setShowOpportunityInfoModal(false);
      }
      if (
        keyboardShortcutsRef.current &&
        !keyboardShortcutsRef.current.contains(event.target)
      ) {
        setShowKeyboardShortcuts(false);
      }
      if (
        reportSettingsModalRef.current &&
        !reportSettingsModalRef.current.contains(event.target)
      ) {
        setShowReportSettingsModal(false);
      }
      if (
        shareModalRef.current &&
        !shareModalRef.current.contains(event.target)
      ) {
        setShowShareModal(false);
      }
      if (
        exportModalRef.current &&
        !exportModalRef.current.contains(event.target)
      ) {
        setShowExportModal(false);
      }
      if (
        unsavedChangesModalRef.current &&
        !unsavedChangesModalRef.current.contains(event.target)
      ) {
        setShowUnsavedChangesModal(false);
      }
      if (
        showReviewDraftModal &&
        event.target.closest(".review-draft-modal") === null
      ) {
        setShowReviewDraftModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleBackClick = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedChangesModal(true);
    } else {
      // Navigate back to ads reporting page
      window.location.href = "/ads-reporting";
    }
  };

  const handleSave = () => {
    setHasUnsavedChanges(false);
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log(
        "key:",
        event.key,
        "code:",
        event.code,
        "ctrl:",
        event.ctrlKey,
        "shift:",
        event.shiftKey
      );

      if (
        event.ctrlKey &&
        event.shiftKey &&
        event.code === "Slash" // use code instead of key
      ) {
        event.preventDefault();
        setShowKeyboardShortcuts(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Added hover handlers for opportunity score
  const handleOpportunityHover = () => {
    const timer = setTimeout(() => {
      setShowOpportunityModal(true);
    }, 2000); // 2 second delay
    setHoverTimer(timer);
  };

  const handleOpportunityLeave = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
  };

  const handleOpportunityClick = () => {
    setShowOpportunityModal(true);
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
  };

  const getPageName = () => {
    const pageMap = {
      "/": "Account overview",
      "/account-overview": "Account overview",
      "/campaigns": "Campaigns",
      "/ads-reporting": "Ads Reporting",
      "/audiences": "Audiences",
      "/advertising-settings": "Advertising settings",
      "/billing-payments": "Billing & payments",
      "/events-manager": "Events Manager",
    };
    return pageMap[currentPath] || "Account overview";
  };

  const getHeaderType = () => {
    if (currentPath === "/campaigns") return "campaigns";
    if (currentPath === "/ads-reporting") return "ads-reporting";
    if (currentPath === "/audiences") return "audiences";
    if (currentPath === "/advertising-settings") return "advertising";
    if (currentPath === "/billing-payments") return "billing";
    if (currentPath === "/events-manager") return "event";
    return "home";
  };

  const headerType = getHeaderType();
  const pageName = getPageName();

  return (
    <div className="px-6 sticky top-0 z-40 ">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-4">
          {/* {headerType === "ads-reporting" && (
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
          )} */}
          <h1 className="text-xl font-semibold text-gray-900">{pageName}</h1>
          {(headerType === "home" ||
            headerType === "campaigns" ||
            headerType === "ads-reporting" ||
            headerType === "audiences" ||
            headerType === "billing") && (
            <div className="flex items-center gap-2">
              <div className="relative" ref={accountDropdownRef}>
                <button
                  onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                  className={`flex items-center gap-3 px-1 py-1 rounded-lg transition-colors 
    ${
      showAccountDropdown
        ? "border border-blue-500 bg-blue-50"
        : "border border-gray-300 bg-white hover:bg-gray-50"
    }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white">
                        ADKI DIGI
                      </span>
                    </div>
                  </div>

                  {/* Separator line */}
                  <div className="h-6 w-px bg-gray-300"></div>

                  {/* Icon + Text section */}
                  <div className="flex items-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                      <img src={userInfo} alt="" className="w-3 h-2" />
                    </div>
                    <span className="text-xs text-gray-900 ">
                      Adkin Digital (1263790274...
                    </span>
                  </div>

                  <ChevronDown size={16} className="text-gray-600" />
                </button>
                {showAccountDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-[680px] bg-white border border-gray-200 rounded-xl shadow-lg z-30">
                    <div className="mb-1 p-3">
                      <div className="relative">
                        <Search
                          size={14}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="text"
                          placeholder="Search for an ad account"
                          className="w-full pl-12 pr-4 py-1 text-base border border-gray-300 rounded-lg outline-none focus:border-blue-500 bg-white"
                        />
                      </div>
                    </div>
                    <div className="h-[55vh]">
                      {/* Two column layout */}
                      <div className="grid grid-cols-5 gap-0 h-full">
                        {/* Left Column - Light gray background */}
                        <div className="bg-blue-100 p-2 col-span-2">
                          {/* Business portfolios section */}
                          <div className="">
                            <h3 className="text-sm font-semibold text-gray-900 mb-1 flex items-center gap-2">
                              Business portfolios{" "}
                              <Info size={16} className="text-gray-500" />
                            </h3>
                            <div className="bg-gray-800 text-white p-2 rounded-lg flex items-center justify-between hover:bg-gray-700 cursor-pointer mb-6">
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center flex-shrink-0">
                                  <span className="text-[6px] font-bold text-white">
                                    ADK
                                    <br />
                                    DIGI
                                  </span>
                                </div>
                                <div>
                                  <div className="font-semibold text-xs text-white">
                                    Adkin Digital LTD
                                  </div>
                                  <div className="text-xs text-gray-300">
                                    1 ad account • 1 selected
                                  </div>
                                </div>
                              </div>
                              <ChevronRight
                                size={20}
                                className="text-gray-400"
                              />
                            </div>
                          </div>

                          {/* Other assets section */}
                          <div className="mb-1 h-[40vh]">
                            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                              Other assets{" "}
                              <Info size={16} className="text-gray-500" />
                            </h3>
                            <div className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-200 rounded-lg cursor-pointer">
                              <div className="w-8 h-8 bg-white border border-gray-300 rounded flex items-center justify-center">
                                <FileText size={16} className="text-gray-600" />
                              </div>
                              <div>
                                <div className="font-semibold text-sm text-gray-900">
                                  1 ad account
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="h-px bg-gray-300 mb-2"></div>

                          {/* Create portfolio button */}
                          <button
                            onClick={() => {
                              setShowCreatePortfolioModal(true);
                              setShowAccountDropdown(false);
                            }}
                            className="w-full py-3 text-base text-gray-700 border border-gray-400 hover:bg-gray-50 rounded-lg transition-colors bg-white"
                          >
                            Create a business portfolio
                          </button>
                        </div>

                        {/* Right Column - White background */}
                        <div className="bg-white shadow-2xl rounded-r-lg p-2 border-l border-gray-200 col-span-3">
                          {/* Header with settings */}
                          <div className="mb-2 flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                Adkin Digital LTD
                              </h3>
                              <div className="text-xs text-gray-600 mt-1">
                                Business portfolio
                              </div>
                            </div>
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                              <svg
                                className="w-5 h-5 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372-.836 2.942.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>

                          {/* Ad account section */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-4">
                              1 ad account
                            </h4>
                            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer">
                              <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0"></div>
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                                  <FileText
                                    size={16}
                                    className="text-gray-500"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-semibold text-sm text-gray-900">
                                    Adkin Digital
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Ad account ID: 1263790274765251
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {headerType === "campaigns" && (
            <div
              className="relative flex items-center hover:bg-gray-100 p-1 pl-3 rounded-lg transition-colors cursor-pointer"
              onMouseEnter={handleOpportunityHover}
              onMouseLeave={handleOpportunityLeave}
              onClick={handleOpportunityClick}
            >
              <div className="relative w-10 h-10 ">
                <svg
                  className="w-10 h-10 transform rotate-135"
                  viewBox="0 0 100 100"
                >
                  {/* Background arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#E5E8F0"
                    strokeWidth="8"
                    strokeDasharray={arcLength}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                  {/* Progress arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#1771ED"
                    strokeWidth="8"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-in-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-bold text-black">100</span>
                </div>
              </div>

              <div className="relative" ref={opportunityDropdownRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowOpportunityDropdown(!showOpportunityDropdown);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
                >
                  <span className="text-sm text-gray-700">
                    Opportunity Score
                  </span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
              </div>

              {(showOpportunityDropdown || showOpportunityModal) && (
                <div
                  ref={opportunityModalRef}
                  className="absolute top-full left-0 mt-2 w-96 bg-white border border-gray-200 rounded-xl shadow-lg z-50"
                >
                  <div className="py-3 px-3">
                    {/* Header with close button */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {/* Circular progress indicator */}
                        <div className="relative w-16 h-16 mb-1">
                          <svg
                            className="w-16 h-16 transform rotate-135"
                            viewBox="0 0 100 100"
                          >
                            {/* Background arc */}
                            <circle
                              cx="50"
                              cy="50"
                              r={radius}
                              fill="none"
                              stroke="#E5E8F0"
                              strokeWidth="8"
                              strokeDasharray={arcLength}
                              strokeDashoffset="0"
                              strokeLinecap="round"
                            />
                            {/* Progress arc */}
                            <circle
                              cx="50"
                              cy="50"
                              r={radius}
                              fill="none"
                              stroke="#1771ED"
                              strokeWidth="8"
                              strokeDasharray={strokeDasharray}
                              strokeDashoffset={strokeDashoffset}
                              strokeLinecap="round"
                              className="transition-all duration-500 ease-in-out"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-lg font-bold text-black">
                              100
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              Opportunity score
                            </h3>
                            <DetailedTooltip
                              content={
                                <div className="space-y-4">
                                  <div>
                                    <h3 className="text-base font-semibold text-gray-900 mb-3">
                                      About opportunity score
                                    </h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                      On a 0-100-point scale, this represents
                                      how optimised your ad account's campaigns,
                                      ad sets and ads are based on
                                      recommendations that you applied. Your
                                      score is calculated based on the point
                                      values of each recommendation that you
                                      take.
                                    </p>
                                  </div>

                                  <div>
                                    <h3 className="text-base font-semibold text-gray-900 mb-3">
                                      Points and potential outcomes
                                    </h3>
                                    <p className="text-sm text-gray-700 leading-relaxed mb-3">
                                      Points are personalised based on how
                                      valuable a recommendation may be for your
                                      ad account. Points are based on factors
                                      such as your campaign objective, business
                                      profile, campaign characteristics and
                                      budget allocation.
                                    </p>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                      Potential outcomes are based on our
                                      experimentation and may vary across
                                      advertisers.
                                    </p>
                                  </div>

                                  <div className="pt-3 border-t border-gray-200">
                                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                      About opportunity score
                                    </button>
                                  </div>
                                </div>
                              }
                              id="opportunity-score-tooltip"
                            >
                              <Info size={16} className="text-gray-500" />
                            </DetailedTooltip>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            You applied all recommendations, which
                            <br />
                            are proven to help improve performance.
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setShowOpportunityModal(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X size={20} className="text-gray-500" />
                      </button>
                    </div>

                    {/* Separator line */}
                    <div className="h-px bg-gray-200 mt-6 mb-4"></div>

                    {/* Content section with lightbulb */}
                    <div className="text-center bg-gray-100 rounded-lg px-4 py-2">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <img
                            src="/images/footer/Bulb.png"
                            alt="lightbulb"
                            className="w-16 h-16 object-contain text-gray-400"
                          />
                        </div>
                      </div>

                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        No recommendations available yet
                      </h4>

                      <p className="text-sm text-gray-600 leading-relaxed">
                        Your score changes as new
                        <br />
                        recommendations become available, so
                        <br />
                        check back for more ways to keep it high.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* {headerType === "ads-reporting" && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Report Name:</span>
              <input
                type="text"
                defaultValue="Custom Report"
                className="px-2 py-1 text-sm border border-gray-300 rounded"
              />
            </div>
          )} */}
        </div>
        <div className="flex items-center gap-3">
          {headerType === "campaigns" && (
            <>
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors cursor-not-allowed">
                <RefreshCw size={18} />
              </button>
              <button
                onClick={() => setShowDiscardModal(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors"
              >
                {" "}
                <Trash2 size={18} /> Discard Drafts
              </button>
              <button
                onClick={() => setShowReviewDraftModal(true)}
                className="px-4 py-2 text-sm text-white bg-[#0A78BE] border border-[#0A78BE] rounded-sm hover:bg-[#4f8ab4] transition-colors"
              >
                Review and Publish
              </button>
            </>
          )}
          {/* {headerType === "ads-reporting" && (
            <>
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                1 Ad Account
              </button>
              <span className="text-sm text-orange-600">Unsaved changes</span>
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                <Save size={16} />
                Save
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <RefreshCw size={16} />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Share size={16} />
                <Download size={16} />
                Share & Export
              </button>
            </>
          )} */}
          {(headerType === "home" || headerType === "campaigns") && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                className="p-2 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
              >
                <MoreHorizontal size={20} className="text-gray-600" />
              </button>
              {showMoreDropdown && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      Reset Ads Manager...
                    </button>
                    <button
                      onClick={() => {
                        setShowKeyboardShortcuts(true);
                        setShowMoreDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors whitespace-nowrap"
                    >
                      Keyboard shortcuts (Ctrl + Shift + /)
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          {(headerType === "advertising" || headerType === "event") && (
            <div className="flex items-center gap-2">
              <div className="relative" ref={accountDropdownRef}>
                <button
                  onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                  className={`flex items-center gap-3 px-1 py-1 rounded-lg transition-colors 
    ${
      showAccountDropdown
        ? "border border-blue-500 bg-blue-50"
        : "border border-gray-300 bg-white hover:bg-gray-50"
    }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white">
                        ADKI DIGI
                      </span>
                    </div>
                  </div>

                  {/* Separator line */}
                  <div className="h-6 w-px bg-gray-300"></div>

                  {/* Icon + Text section */}
                  <div className="flex items-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                      <img src={userInfo} alt="" className="w-3 h-2" />
                    </div>
                    <span className="text-xs text-gray-900 ">
                      Adkin Digital (1263790274...
                    </span>
                  </div>

                  <ChevronDown size={16} className="text-gray-600" />
                </button>
                {showAccountDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-[680px] bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                    <div className="mb-1 p-3">
                      <div className="relative ">
                        <Search
                          size={14}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="text"
                          placeholder="Search for an ad account"
                          className="w-full pl-12 pr-4 py-1 text-base border border-gray-300 rounded-lg outline-none focus:border-blue-500 bg-white"
                        />
                      </div>
                    </div>
                    <div className="h-[55vh]">
                      {/* Two column layout */}
                      <div className="grid grid-cols-5 gap-0 h-full">
                        {/* Left Column - Light gray background */}
                        <div className="bg-blue-100 p-2 col-span-2">
                          {/* Business portfolios section */}
                          <div className="">
                            <h3 className="text-sm font-semibold text-gray-900 mb-1 flex items-center gap-2">
                              Business portfolios{" "}
                              <Info size={16} className="text-gray-500" />
                            </h3>
                            <div className="bg-gray-800 text-white p-2 rounded-lg flex items-center justify-between hover:bg-gray-700 cursor-pointer mb-6">
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center flex-shrink-0">
                                  <span className="text-[6px] font-bold text-white">
                                    ADK
                                    <br />
                                    DIGI
                                  </span>
                                </div>
                                <div>
                                  <div className="font-semibold text-xs text-white">
                                    Adkin Digital LTD
                                  </div>
                                  <div className="text-xs text-gray-300">
                                    1 ad account • 1 selected
                                  </div>
                                </div>
                              </div>
                              <ChevronRight
                                size={20}
                                className="text-gray-400"
                              />
                            </div>
                          </div>

                          {/* Other assets section */}
                          <div className="mb-1 h-[40vh]">
                            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                              Other assets{" "}
                              <Info size={16} className="text-gray-500" />
                            </h3>
                            <div className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-200 rounded-lg cursor-pointer">
                              <div className="w-8 h-8 bg-white border border-gray-300 rounded flex items-center justify-center">
                                <FileText size={16} className="text-gray-600" />
                              </div>
                              <div>
                                <div className="font-semibold text-sm text-gray-900">
                                  1 ad account
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="h-px bg-gray-300 mb-2"></div>

                          {/* Create portfolio button */}
                          <button
                            onClick={() => {
                              setShowCreatePortfolioModal(true);
                              setShowAccountDropdown(false);
                            }}
                            className="w-full py-3 text-base text-gray-700 border border-gray-400 hover:bg-gray-50 rounded-lg transition-colors bg-white"
                          >
                            Create a business portfolio
                          </button>
                        </div>

                        {/* Right Column - White background */}
                        <div className="bg-white shadow-2xl rounded-r-lg p-2 border-l border-gray-200 col-span-3">
                          {/* Header with settings */}
                          <div className="mb-2 flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                Adkin Digital LTD
                              </h3>
                              <div className="text-xs text-gray-600 mt-1">
                                Business portfolio
                              </div>
                            </div>
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                              <svg
                                className="w-5 h-5 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372-.836 2.942.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>

                          {/* Ad account section */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-4">
                              1 ad account
                            </h4>
                            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer">
                              <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0"></div>
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                                  <FileText
                                    size={16}
                                    className="text-gray-500"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-semibold text-sm text-gray-900">
                                    Adkin Digital
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Ad account ID: 1263790274765251
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <button
            onClick={() => setShowProfileSidebar(true)}
            className="relative flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {/* Main avatar container */}
            <div className="relative w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              {/* Person silhouette icon */}
              <svg
                className="w-5 h-5 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              {/* Facebook badge overlay */}

              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-white text-xs font-bold">f</span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Create Portfolio Modal */}
      {showCreatePortfolioModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Create a business portfolio
              </h2>
              <button
                onClick={() => setShowCreatePortfolioModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Business portfolios bring your Facebook Pages, Instagram accounts
              and the people who work on them together, so you can manage them
              all in one place.
            </p>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                Business portfolio name
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                This should match the public name of the business as it will be
                visible across Meta. You can change the name later in Settings.
              </p>
              <input
                type="text"
                defaultValue="Jasper's Market"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                Enter your contact info
              </h3>
              <p className="text-xs text-gray-600 mb-3">
                Enter your full name and business email address to become a
                business admin. Your contact info will be visible to other
                people who are added to this business portfolio.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    First name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Surname
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Business email address
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  We'll use this email address to contact you about your
                  business. It won't be visible to your customers.
                </p>
                <input
                  type="email"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-4">
              Your contact info will be saved within this business portfolio.
              You can edit this contact info at any time in your business
              settings. By creating a business portfolio, you're agreeing to
              Meta's{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCreatePortfolioModal(false)}
                className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Modal */}
      {showKeyboardShortcuts && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={keyboardShortcutsRef}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[60vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 ">
              <h2 className="text-xl font-semibold text-gray-900">
                Keyboard shortcuts
              </h2>
              <button
                onClick={() => setShowKeyboardShortcuts(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6">
              {/* Two-column layout */}
              <div className="grid grid-cols-2 gap-8 ">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Shortcut keys
                  </h3>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Description
                  </h3>
                </div>
              </div>

              {/* Shortcuts list */}
              <div className="space-y-4">
                {shortcuts.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-3 py-1 border-b border-gray-200"
                  >
                    <div className="text-sm col-span-1 font-mono text-gray-700 ">
                      {item.keys}
                    </div>
                    <div className="text-sm col-span-2 text-gray-700">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={() => setShowKeyboardShortcuts(false)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      <ReviewDraftModal
        isOpen={showReviewDraftModal}
        onClose={() => setShowReviewDraftModal(false)}
      />

      <DiscardDraftsModal
        isOpen={showDiscardModal}
        onClose={() => setShowDiscardModal(false)}
        accountName="Adkin Digital"
        accountId="1263790274765251"
      />
      {showOpportunityInfoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={opportunityInfoModalRef}
            className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16">
                  <svg
                    className="w-16 h-16 transform rotate-135"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="none"
                      stroke="#E5E8F0"
                      strokeWidth="8"
                      strokeDasharray={arcLength}
                      strokeDashoffset="0"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="none"
                      stroke="#1771ED"
                      strokeWidth="8"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-500 ease-in-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-black">100</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    Opportunity score
                    <Info size={16} className="text-gray-500" />
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    You applied all recommendations, which
                    <br />
                    are proven to help improve performance.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowOpportunityInfoModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* About opportunity score section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  About opportunity score
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  On a 0-100-point scale, this represents how optimised your ad
                  account's campaigns, ad sets and ads are based on
                  recommendations that you applied. Your score is calculated
                  based on the point values of each recommendation that you
                  take.
                </p>
              </div>

              {/* Points and potential outcomes section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Points and potential outcomes
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  Points are personalised based on how valuable a recommendation
                  may be for your ad account. Points are based on factors such
                  as your campaign objective, business profile, campaign
                  characteristics and budget allocation.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Potential outcomes are based on our experimentation and may
                  vary across advertisers.
                </p>
              </div>

              {/* Link section */}
              <div className="pt-4 border-t border-gray-200">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  About opportunity score
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
