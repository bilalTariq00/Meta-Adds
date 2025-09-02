"use client";

import { useState } from "react";
import { 
  ArrowUpDown, 
  MoreHorizontal, 
  Table, 
  RotateCcw, 
  Settings, 
  Wrench,
  X,
  Search,
  ChevronDown,
  Plus
} from "lucide-react";
import CustomiseSidebar from "../CustomiseSidebar";

export default function PivotTableSection() {
  const [showCustomiseSidebar, setShowCustomiseSidebar] = useState(false);
  const [filters, setFilters] = useState(["Had delivery"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("This month: 1 Sep 2025 - 3 Sep 2025");

  const tableData = [
    {
      campaign: "DYT - Solar Pa...",
      adSet: "All",
      account: "All",
      ad: "All",
      delivery: "Inactive Campaign",
      reach: 101,
      impressions: 102,
      frequency: 1.01,
      attribution: "7-day click, 1-d...",
      results: "-"
    },
    {
      campaign: "DYT - Solar Pa...",
      adSet: "DYT - Sol...",
      account: "Adkin Digital",
      ad: "All",
      delivery: "Not deliveri... Ad set",
      reach: 69,
      impressions: 70,
      frequency: 1.01,
      attribution: "7-day click, 1-d...",
      results: "-"
    },
    {
      campaign: "Bathroom Rem...",
      adSet: "All",
      account: "All",
      ad: "All",
      delivery: "Inactive Campaign",
      reach: 0,
      impressions: 0,
      frequency: "-",
      attribution: "7-day click, 1-d...",
      results: "-"
    },
    {
      campaign: "Bathroom Rem...",
      adSet: "Bathroom ...",
      account: "Adkin Digital",
      ad: "All",
      delivery: "Not deliveri... Ad set",
      reach: 0,
      impressions: 0,
      frequency: "-",
      attribution: "7-day click, 1-d...",
      results: "-"
    }
  ];

  const removeFilter = (filterToRemove) => {
    setFilters(filters.filter(filter => filter !== filterToRemove));
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Page Filters Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Active Filters */}
            {filters.map((filter, index) => (
              <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                <span>{filter}</span>
                <button
                  onClick={() => removeFilter(filter)}
                  className="ml-2 hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search to filter by name, ID or metrics"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
              Clear
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
              {dateRange}
            </button>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Pivot Table Controls */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg">
            <Table className="w-4 h-4 mr-2" />
            Pivot Table
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
          
          <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900">
            Ungroup Breakdowns
          </button>
          
          <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900">
            <MoreHorizontal className="w-4 h-4" />
          </button>
          
          <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Column Widths
          </button>
          
          <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900">
            <Settings className="w-4 h-4 mr-2" />
            Format
          </button>
          
          <button
            onClick={() => setShowCustomiseSidebar(!showCustomiseSidebar)}
            className={`flex items-center px-3 py-2 rounded-lg ${
              showCustomiseSidebar
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Wrench className="w-4 h-4 mr-2" />
            Customise
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Pivot Table */}
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="bg-gray-50 border-b border-gray-200">
                <div className="grid grid-cols-9 gap-4 px-4 py-3 text-sm font-medium text-gray-700">
                  <div className="flex items-center">
                    <MoreHorizontal className="w-4 h-4 mr-2" />
                    Campaign name
                    <ArrowUpDown className="w-4 h-4 ml-2 text-gray-400" />
                  </div>
                  <div className="flex items-center">
                    Ad set name
                    <ArrowUpDown className="w-4 h-4 ml-2 text-gray-400" />
                  </div>
                  <div className="flex items-center">
                    Account name
                    <ArrowUpDown className="w-4 h-4 ml-2 text-gray-400" />
                  </div>
                  <div className="flex items-center">
                    Ad name
                    <ArrowUpDown className="w-4 h-4 ml-2 text-gray-400" />
                  </div>
                  <div className="flex items-center">
                    Delivery
                    <ArrowUpDown className="w-4 h-4 ml-2 text-gray-400" />
                  </div>
                  <div className="flex items-center">
                    Reach
                    <ArrowUpDown className="w-4 h-4 ml-2 text-gray-400" />
                  </div>
                  <div className="flex items-center">
                    Impressions
                    <ArrowUpDown className="w-4 h-4 ml-2 text-gray-400" />
                  </div>
                  <div className="flex items-center">
                    Frequency
                    <ArrowUpDown className="w-4 h-4 ml-2 text-gray-400" />
                  </div>
                  <div className="flex items-center">
                    Attribution setting
                    <ArrowUpDown className="w-4 h-4 ml-2 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {tableData.map((row, index) => (
                  <div key={index} className="grid grid-cols-9 gap-4 px-4 py-3 text-sm">
                    <div className="text-gray-900">{row.campaign}</div>
                    <div className="text-gray-900">{row.adSet}</div>
                    <div className="text-gray-900">{row.account}</div>
                    <div className="text-gray-900">{row.ad}</div>
                    <div className="text-gray-900">{row.delivery}</div>
                    <div className="text-gray-900">{row.reach}</div>
                    <div className="text-gray-900">{row.impressions}</div>
                    <div className="text-gray-900">{row.frequency}</div>
                    <div className="text-gray-900">{row.attribution}</div>
                  </div>
                ))}
              </div>

              {/* Table Footer */}
              <div className="bg-gray-50 border-t border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div>Total results 4/4 rows displayed</div>
                  <div className="flex items-center space-x-6">
                    <div>170 Accounts Cent...</div>
                    <div>172 Total</div>
                    <div>1.01 Per Accounts Centr...</div>
                    <div>Multiple attrib...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customise Sidebar */}
        {showCustomiseSidebar && (
          <CustomiseSidebar onClose={() => setShowCustomiseSidebar(false)} />
        )}
      </div>
    </div>
  );
}
