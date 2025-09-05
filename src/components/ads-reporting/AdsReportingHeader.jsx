"use client";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  RefreshCw,
  Share,
  Download,
  MoreHorizontal,
  ChevronDown,
  X,
  FileText,
  Info,
  ChevronRight,
  Search,
} from "lucide-react";
import userInfo from "@/assets/icons/userOverview.png";

export default function AdsReportingHeader({
  reportName = "Untitled report",
  onReportNameChange,
  onSave,
  onRefresh,
  onShare,
  onExport,
  hasUnsavedChanges = false,
  accountName = "1 Ad Account",
}) {
  const navigate = useNavigate();
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showCreatePortfolioModal, setShowCreatePortfolioModal] =
    useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(reportName);

  const accountDropdownRef = useRef(null);
  const moreDropdownRef = useRef(null);

  useEffect(() => {
    setTempName(reportName);
  }, [reportName]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(event.target)
      ) {
        setShowAccountDropdown(false);
      }
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target)
      ) {
        setShowMoreDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBack = () => {
    if (hasUnsavedChanges) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        )
      ) {
        navigate("/ads-reporting");
      }
    } else {
      navigate("/ads-reporting");
    }
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleNameSave = () => {
    if (onReportNameChange) {
      onReportNameChange(tempName);
    }
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setTempName(reportName);
    setIsEditingName(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleNameSave();
    } else if (e.key === "Escape") {
      handleNameCancel();
    }
  };

  return (
    <div className=" sticky top-0 z-40">
      <div className="flex items-center justify-between py-3">
        {/* Left Section */}
        <div className="flex items-center gap-4 whitespace-nowrap">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-3 py-2  rounded-md border border-gray-400 text-sm hover:bg-gray-50/70 transition-colors"
          >
            <ArrowLeft size={16} className="text-gray-600" />
            <span className="text-sm text-gray-700 whitespace-nowrap">
              Al...
            </span>
          </button>

          {/* Report Name */}
          <div className="flex items-center min-w-0 flex-1">
            {isEditingName ? (
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onBlur={handleNameSave}
                onKeyDown={handleKeyPress}
                className="text-sm font-bold text-gray-900 bg-transparent border-b-2 border-blue-500 outline-none w-full"
                autoFocus
              />
            ) : (
              <h1
                onClick={handleNameEdit}
                className="text-sm font-bold text-gray-900 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded whitespace-nowrap overflow-hidden text-ellipsis max-w-24"
                title={reportName}
              >
                {reportName}
              </h1>
            )}
          </div>

          {/* Account Dropdown - Full version from main header */}
          <div className="relative" ref={accountDropdownRef}>
            <button
              onClick={() => setShowAccountDropdown(!showAccountDropdown)}
              className={`flex items-center gap-3 px-1 py-1 rounded-lg transition-colors whitespace-nowrap
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
              <div className="flex items-center gap-1 min-w-0">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <img src={userInfo} alt="" className="w-3 h-2" />
                </div>
                <span className="text-xs text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis max-w-32">
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
                          <ChevronRight size={20} className="text-gray-400" />
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
                        className="w-full py-3 text-base text-gray-700 border border-gray-400 text-sm hover:bg-gray-50 rounded-lg transition-colors bg-white"
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
                              <FileText size={16} className="text-gray-500" />
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

        {/* Middle Section - Status Information */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          {/* Ad Account Status */}
          <div className="flex items-center gap-2 px-3 py-2 ml-2 bg-white border border-gray-300 rounded-lg">
            <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
              <FileText size={14} className="text-gray-600" />
            </div>
            <span className="text-sm text-gray-700 whitespace-nowrap">
              1 Ad A...
            </span>
          </div>

          {/* Status Messages */}
          <div className="text-sm min-w-0 flex-1">
            {hasUnsavedChanges && (
              <div className="text-gray-900 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                You have unsaved changes
              </div>
            )}
            <div className="text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
              Data refreshed 1 hour ago
            </div>
          </div>
        </div>

        {/* Right Section - Action Buttons and User Profile */}
        <div className="flex items-center gap-3 whitespace-nowrap">
          {/* Save Button with Dropdown */}
          <div className="relative">
            <button
              onClick={onSave}
              className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              <Save size={16} />
              Save
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 px-3 py-1.5  border border-gray-400 text-sm  rounded-sm transition-colors whitespace-nowrap"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

          {/* Share Button */}
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-3 py-1.5 border border-gray-400 text-sm  rounded-sm transition-colors whitespace-nowrap"
          >
            <Share size={16} />
            Share
          </button>

          {/* Export Button */}
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-3 py-1.5 border border-gray-400 text-sm  rounded-sm transition-colors whitespace-nowrap"
          >
            <Download size={16} />
            Export
          </button>

          {/* More Options */}
          <div className="relative" ref={moreDropdownRef}>
            <button
              onClick={() => setShowMoreDropdown(!showMoreDropdown)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-400 text-sm  rounded-sm transition-colors whitespace-nowrap"
            >
              <MoreHorizontal size={16} />
            </button>

            {showMoreDropdown && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 text-sm  hover:bg-gray-50 rounded">
                    Duplicate report
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm  hover:bg-gray-50 rounded">
                    Delete report
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm  hover:bg-gray-50 rounded">
                    Report settings
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              {/* Facebook badge */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-white text-xs font-bold">f</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Create Portfolio Modal */}
      {showCreatePortfolioModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
    </div>
  );
}
