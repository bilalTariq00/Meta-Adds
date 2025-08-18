"use client"

import React from "react"
import { useState } from "react"
import Sidebar from "./Sidebar"
import {
  User,
  LogOut,
  Clock,
  ChevronDown,
  MoreHorizontal,
  X,
  ArrowLeft,
  ChevronRight,
  Info,
  FileText,
  CreditCard,
  Calendar,
} from "lucide-react"

export default function MetaAdsManager() {
  const [showActivityHistory, setShowActivityHistory] = useState(false)
  const [showProfileSidebar, setShowProfileSidebar] = useState(false)
  const [showAccountDropdown, setShowAccountDropdown] = useState(false)
  const [showMoreDropdown, setShowMoreDropdown] = useState(false)

  return (
    <div className="h-full flex bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0]">
      {/* Left Sidebar */}

      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">Account overview</h1>
              <div className="flex items-center gap-2">
                <User size={16} className="text-gray-500" />
                <div className="relative">
                  <button
                    onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                    className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm text-gray-700">2422366124066184 (24...</span>
                    <ChevronDown size={16} className="text-gray-500" />
                  </button>

                  {showAccountDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Search for an ad account"
                              className="flex-1 text-sm outline-none w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                          </div>
                        </div>

                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                            Your account <Info size={14} className="text-gray-400" />
                          </h3>
                          <div className="bg-gray-800 text-white p-3 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <User size={20} className="text-white" />
                              <div>
                                <div className="font-medium">Muhammad Bilal</div>
                                <div className="text-sm text-gray-300">1 ad account</div>
                              </div>
                            </div>
                            <ChevronRight size={16} className="text-gray-400" />
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">1 ad account</h3>
                          <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="flex items-center gap-2">
                              <FileText size={16} className="text-gray-500" />
                              <div>
                                <div className="font-medium text-sm">2422366124066184</div>
                                <div className="text-xs text-gray-500">Ad account ID: 2422366124066184</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <button className="w-full py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                            Create a business portfolio
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <MoreHorizontal size={20} className="text-gray-600" />
                </button>

                {showMoreDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-2">
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        Reset Ads Manager...
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        Keyboard shortcuts (Ctrl + Shift + /)
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowProfileSidebar(true)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">M</span>
                </div>
                <span className="text-sm font-medium text-gray-700">6</span>
              </button>

              <button
                onClick={() => setShowActivityHistory(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Clock size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {/* User Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-gray-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Muhammad Bilal</h2>
              <p className="text-sm text-blue-600">0 active campaigns</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-sm text-gray-600">
                Amount spent in last seven days: <span className="font-semibold">₹0.00 ₹</span> | 0% spent in learning
                phase <Info size={14} className="inline text-gray-400" />
              </p>
            </div>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
              Continue
            </button>
          </div>

          {/* Setup Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Get set up to run ads</h3>
            <p className="text-gray-600 mb-6">
              Confirm the details below and you'll be ready to publish your first ad.
            </p>

            {/* Setup Items */}
            <div className="space-y-4">
              {/* Add payment method */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <CreditCard size={20} className="text-gray-600" />
                    <h4 className="font-medium text-gray-900">Add payment method</h4>
                  </div>
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  This is the payment method that we'll keep on file for your ad account. You won't be charged anything
                  until your ads are up and running.{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Learn more
                  </a>
                </p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Add Payment Method
                  </button>
                  <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    Skip for now
                  </button>
                </div>
              </div>

              {/* Create Facebook Page */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-gray-600" />
                    <h4 className="font-medium text-gray-900">Create Facebook Page</h4>
                  </div>
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  A Page is required to run most ads. It will appear in your ad as the brand or business that you're
                  promoting. If you don't have a Page, you can create one now and make changes at any time.{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Learn more
                  </a>
                </p>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Create Page
                </button>
              </div>

              {/* Verify phone number */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                    <h4 className="font-medium text-gray-900">Verify phone number</h4>
                  </div>
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Before you run ads, you need to add a verified phone number to your ad account. We won't share this
                  number publicly.
                </p>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Add phone number
                </button>
              </div>
            </div>
          </div>

          {/* Opportunity Score */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  Opportunity score <Info size={16} className="text-gray-400" />
                </h3>
                <p className="text-sm text-gray-600">
                  You applied all recommendations, which are proven to help improve performance.
                </p>
              </div>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Set up automatic adjustments
              </button>
            </div>

            <div className="flex items-center gap-8">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - 100 / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">100</span>
                  <span className="text-sm text-gray-600">points</span>
                </div>
              </div>
              <div>
                <a href="#" className="text-blue-600 hover:underline text-sm">
                  How you earn points
                </a>
              </div>
            </div>
          </div>

          {/* Campaign Optimization */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 relative">
            <button className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <X size={16} className="text-gray-400" />
            </button>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Optimise your campaigns with automatic adjustments
            </h3>
            <p className="text-gray-600 mb-4">
              Save time and stay optimised by automatically applying the most impactful performance recommendations.
            </p>

            <div className="flex items-center justify-between">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Set up now
              </button>
              <div className="w-48 h-24 bg-gradient-to-r from-orange-200 to-green-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-600 rounded-full mx-auto mb-2"></div>
                  <div className="text-xs text-gray-600">Illustration</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-4">
                <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium">Available</button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">Dismissed</button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by personalised</span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>

            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No recommendations available yet</h4>
              <p className="text-gray-600">Check again later to see ways to keep your score high.</p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">No recommended solutions found</h4>
            <p className="text-sm text-gray-600">
              Email your account manager for personalised recommendations to help improve your strategy.
            </p>
          </div>
        </div>
      </div>

      {/* Activity History Sidebar */}
      {showActivityHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
          <div className="w-2/3 bg-gray-50"></div>
          <div className="w-1/3 bg-white shadow-xl">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setShowActivityHistory(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
                <h2 className="text-lg font-semibold text-gray-900">Activity history for Account: Muhammad Bilal</h2>
                <div></div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ArrowLeft size={16} className="text-gray-600" />
                </button>
                <span className="text-sm text-gray-600">Performance overview</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-700">This month: 1 Aug 2025 - 12 Aug 2025</span>
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1">
                    Activity history: All <ChevronDown size={14} />
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1">
                    Changed by: Anyone <ChevronDown size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-4 text-xs font-medium text-gray-600 mb-4 pb-2 border-b border-gray-200">
                <div>Activity</div>
                <div>Activity details</div>
                <div>Item changed</div>
                <div>Changed by</div>
                <div>Date and Time</div>
              </div>

              <div className="text-center py-12">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">No activity during selected date range</h4>
                <p className="text-sm text-gray-600">
                  Try again with a different date range. Bear in mind that new activity can take up to 15 minutes to be
                  shown in this table.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Sidebar */}
      {showProfileSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-96 bg-white shadow-xl">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Your profiles</h2>
                <button
                  onClick={() => setShowProfileSidebar(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
              <p className="text-sm text-gray-600">
                These are profiles that you log in to business tools, such as Ads Manager. Select a profile to manage
                its assets. Save up to 10 profiles.
              </p>
            </div>

            <div className="p-4">
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">M</span>
                  </div>
                  <span className="font-medium text-gray-900">Muhammad Bilal</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">Other saved profiles</h3>
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">You don't have any saved profiles yet.</p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <button className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <User size={20} className="text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">Log in with another account</span>
                </button>

                <p className="text-xs text-gray-500 mt-2 px-3">
                  Adding a user profile will turn on saved profiles on this device, so you can easily switch between
                  profiles you use on business tools. Don't do this if you're using a shared device. You can remove
                  profiles at any time.
                </p>
              </div>

              <div className="border-t border-gray-200 mt-6 pt-4">
                <button className="flex items-center justify-center gap-2 w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <LogOut size={16} className="text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Log out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
