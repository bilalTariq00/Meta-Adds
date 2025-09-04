"use client";

import { useState } from "react";
import { 
  X, 
  Search, 
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Plus,
  Check,
  Info
} from "lucide-react";

export default function FormatCustomiseSidebar({ activeTab, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    popularMetrics: true,
    customMetrics: true,
    popularBreakdowns: true,
    customBreakdowns: true
  });

  // Sample data for Metrics tab
  const popularMetrics = [
    { id: "amountSpent", name: "Amount spent", checked: true },
    { id: "impressions", name: "Impressions", checked: true },
    { id: "reach", name: "Reach", checked: true },
    { id: "results", name: "Results", checked: true },
    { id: "costPerResult", name: "Cost per result", checked: true },
    { id: "delivery", name: "Delivery", checked: true },
    { id: "frequency", name: "Frequency", checked: true },
    { id: "linkClicks", name: "Link clicks", checked: false },
    { id: "cpc", name: "CPC (cost per link click)", checked: false },
    { id: "cpm", name: "CPM (cost per 1,000 impressions)", checked: false },
    { id: "ctr", name: "CTR (all)", checked: false }
  ];

  const customMetrics = [
    { id: "new", name: "new", checked: false }
  ];

  // Sample data for Breakdowns tab
  const breakdownSections = [
    { id: "popularMetrics", name: "Popular metrics" },
    { id: "customMetrics", name: "Custom metrics" },
    { id: "performance", name: "Performance" },
    { id: "engagement", name: "Engagement" },
    { id: "conversions", name: "Conversions" },
    { id: "customConversions", name: "Custom conversions" },
    { id: "settings", name: "Settings" }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const renderMetricsTab = () => (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => setShowMoreDropdown(!showMoreDropdown)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex space-x-1">
          <button className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md">
            Breakdo...
          </button>
          <button className="px-3 py-2 text-sm text-blue-700 bg-blue-50 border border-blue-300 rounded-md">
            Metrics
          </button>
        </div>
      </div>

      {/* Sort Icon */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-end">
          <button className="p-2 hover:bg-gray-100 rounded">
            <div className="flex flex-col">
              <div className="w-4 h-0.5 bg-gray-400 mb-0.5"></div>
              <div className="w-4 h-0.5 bg-gray-400 mb-0.5"></div>
              <div className="w-4 h-0.5 bg-gray-400"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Popular Metrics */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection('popularMetrics')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
          >
            <span className="font-medium text-gray-900">Popular metrics</span>
            {expandedSections.popularMetrics ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
          
          {expandedSections.popularMetrics && (
            <div className="px-4 pb-4 space-y-2">
              {popularMetrics.map((metric) => (
                <label key={metric.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={metric.checked}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{metric.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Custom Metrics */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection('customMetrics')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
          >
            <span className="font-medium text-gray-900">Custom metrics</span>
            {expandedSections.customMetrics ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
          
          {expandedSections.customMetrics && (
            <div className="px-4 pb-4 space-y-2">
              <button className="w-full flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                <Plus className="w-4 h-4 mr-2" />
                Create
              </button>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Only you</span>
                <Info className="w-4 h-4" />
              </div>
              
              {customMetrics.map((metric) => (
                <label key={metric.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={metric.checked}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{metric.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderBreakdownsTab = () => (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => setShowMoreDropdown(!showMoreDropdown)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex space-x-1">
          <button className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md">
            Breakdo...
          </button>
          <button className="px-3 py-2 text-sm text-blue-700 bg-blue-50 border border-blue-300 rounded-md">
            Metrics
          </button>
        </div>
      </div>

      {/* Sort Icon */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-end">
          <button className="p-2 hover:bg-gray-100 rounded">
            <div className="flex flex-col">
              <div className="w-4 h-0.5 bg-gray-400 mb-0.5"></div>
              <div className="w-4 h-0.5 bg-gray-400 mb-0.5"></div>
              <div className="w-4 h-0.5 bg-gray-400"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {breakdownSections.map((section) => (
          <div key={section.id} className="border-b border-gray-200">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
            >
              <span className="font-medium text-gray-900">{section.name}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFormatTab = () => (
    <div className="h-full flex flex-col items-center justify-center p-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">There are no rules yet</h3>
        <p className="text-sm text-gray-600 mb-6">Create rules to customise your report</p>
        <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
          <Plus className="w-4 h-4 mr-2" />
          Create Rule
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {activeTab === 'format' ? 'Conditional formatting' : 'Customise pivot table'}
        </h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Content */}
      {activeTab === 'format' && renderFormatTab()}
      {activeTab === 'customise' && renderCustomiseTab()}
    </div>
  );

  function renderCustomiseTab() {
    return (
      <div className="h-full flex flex-col">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => setShowMoreDropdown(!showMoreDropdown)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-1">
            <button className="px-3 py-2 text-sm text-blue-700 bg-blue-50 border border-blue-300 rounded-md">
              Breakdo...
            </button>
            <button className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md">
              Metrics
            </button>
          </div>
        </div>

        {/* Sort Icon */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-end">
            <button className="p-2 hover:bg-gray-100 rounded">
              <div className="flex flex-col">
                <div className="w-4 h-0.5 bg-gray-400 mb-0.5"></div>
                <div className="w-4 h-0.5 bg-gray-400 mb-0.5"></div>
                <div className="w-4 h-0.5 bg-gray-400"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {breakdownSections.map((section) => (
            <div key={section.id} className="border-b border-gray-200">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">{section.name}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
