"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  SlidersHorizontal,
} from "lucide-react";

function Chip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-2 bg-white border border-gray-300 px-3 py-1.5 rounded-full text-sm shadow-sm">
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:bg-gray-100 rounded-full p-0.5"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </span>
  );
}

// Mock data structure based on the images
const searchData = {
  recent: ["Impressions (campaign) > 0"],
  popular: [
    "Campaign delivery is Active",
    "Objective is sales",
    "Campaign delivery is Deleted",
    "Reach (campaign) > 0",
    "Result (campaign) > 0",
    "Lifetime spent (campaign) > $0.00",
  ],
  categories: {
    Performance: {
      items: [
        "Results",
        "Reach",
        "Frequency",
        "Impressions",
        "Views",
        "Amount spent",
      ],
      campaigns: [
        "Cruises Around The World",
        "DYT - Solar Panel",
        "DYT - Home Improvement",
      ],
    },
    Engagement: {
      items: [
        "Facebook likes",
        "Instagram follows",
        "Join group requests",
        "Post comments",
        "Post engagements",
        "Post reactions",
      ],
      campaigns: [
        "Cruises Around The World",
        "DYT - Solar Panel",
        "DYT - Home Improvement",
      ],
    },
    Conversions: {
      items: [
        "Achievements unlocked",
        "Cost per achievement unlocked",
        "Achievements unlocked conversion value",
        "Adds of payment info",
        "Cost per add of payment info",
        "Adds of payment info conversion value",
      ],
      campaigns: [
        "Cruises Around The World",
        "DYT - Solar Panel",
        "DYT - Home Improvement",
      ],
    },
  },
  filters: [
    "Name/ID",
    "Catalogue",
    "Conversion location",
    "Delivery",
    "Objectives",
    "Performance goal",
    "Placement",
    "Audience",
    "Attribution setting",
    "Recently changed",
    "Special ad category",
    "Test name",
    "Campaign setup",
  ],
  nameId: [
    "Campaign name",
    "Ad set name",
    "Ad name",
    "Campaign ID",
    "Ad set ID",
    "Ad ID",
    "Page ID",
    "Product catalogue ID",
  ],
  audience: [
    "Audience age",
    "Audience delivery changes",
    "Audience gender",
    "Audience location",
  ],
};

export default function SearchDropdown({
  isOpen,
  onClose,
  onSelectFilter,
  selectedFilters,
}) {
  const [currentView, setCurrentView] = useState("main");
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectItem = (item) => {
    onSelectFilter(item);
    // Don't close dropdown immediately to allow multiple selections
  };

  const renderMainView = () => (
    <div className="max-h-96 relative overflow-y-auto">
      {/* Search Input */}

      {/* Recent Section */}
      {searchData.recent.length > 0 && (
        <div className="p-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Recent</h3>
          {searchData.recent.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectItem(item)}
              className="py-2 px-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 rounded"
            >
              {item}
            </div>
          ))}
        </div>
      )}

      {/* Popular Section */}
      <div className="p-3 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2">Popular</h3>
        {searchData.popular.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSelectItem(item)}
            className="py-2 px-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 rounded flex items-center justify-between"
          >
            <span>{item}</span>
            {item.includes("Active") && (
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            )}
            {item.includes("Deleted") && (
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            )}
          </div>
        ))}
        <button className="text-blue-500 text-sm hover:underline mt-2">
          See more ▼
        </button>
      </div>

      {/* Find by category */}
      <div className="p-3 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2">Find by category</h3>
        {Object.keys(searchData.categories).map((category) => (
          <div
            key={category}
            onClick={() => setCurrentView(category.toLowerCase())}
            className="py-2 px-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 rounded flex items-center justify-between"
          >
            <span>{category}</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        ))}
      </div>

      {/* Filter selected rows only */}
      <div className="p-3 border-b border-gray-200">
        <label className="flex items-center text-sm text-gray-600">
          <input type="checkbox" className="mr-2" />
          Filter selected rows only
        </label>
      </div>

      {/* Filters */}
      <div className="p-3">
        {searchData.filters.map((filter, index) => (
          <div
            key={index}
            onClick={() => {
              if (filter === "Name/ID") {
                setCurrentView("nameid");
              } else if (filter === "Audience") {
                setCurrentView("audience");
              } else {
                handleSelectItem(filter);
              }
            }}
            className="py-2 px-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 rounded flex items-center justify-between"
          >
            <span>{filter}</span>
            {(filter === "Name/ID" || filter === "Audience") && (
              <ChevronRight className="w-4 h-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderCategoryView = (categoryKey) => {
    const category =
      searchData.categories[
        categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)
      ];
    if (!category) return null;

    return (
      <div className="max-h-96 overflow-y-auto">
        {/* Header with back button */}
        <div className="p-3 border-b border-gray-200 flex items-center">
          <button
            onClick={() => setCurrentView("main")}
            className="mr-3 hover:bg-gray-100 rounded p-1"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 className="font-semibold text-gray-900 capitalize">
            {categoryKey}
          </h3>
        </div>

        {/* Category items */}
        <div className="p-3">
          {category.items.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectItem(item)}
              className="py-2 px-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 rounded"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Campaign toggles */}
        <div className="p-3 border-t border-gray-200">
          {category.campaigns.map((campaign, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <span className="text-sm text-blue-600 hover:underline cursor-pointer ml-3 flex-1">
                {campaign}
              </span>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-gray-200 text-sm text-gray-600">
          Results from {category.campaigns.length} campaigns
          <br />
          <span className="text-xs">Excludes deleted items</span>
        </div>
      </div>
    );
  };

  const renderNameIdView = () => (
    <div className="max-h-96 overflow-y-auto">
      <div className="p-3 border-b border-gray-200 flex items-center">
        <button
          onClick={() => setCurrentView("main")}
          className="mr-3 hover:bg-gray-100 rounded p-1"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h3 className="font-semibold text-gray-900">Name/ID</h3>
      </div>

      <div className="p-3">
        {searchData.nameId.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSelectItem(item)}
            className={`py-2 px-2 hover:bg-gray-100 cursor-pointer text-sm rounded ${
              item === "Campaign ID" ? "bg-gray-100" : "text-gray-700"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );

  const renderAudienceView = () => (
    <div className="max-h-96 overflow-y-auto">
      <div className="p-3 border-b border-gray-200 flex items-center">
        <button
          onClick={() => setCurrentView("main")}
          className="mr-3 hover:bg-gray-100 rounded p-1"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h3 className="font-semibold text-gray-900">Audience</h3>
      </div>

      <div className="p-3">
        {searchData.audience.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSelectItem(item)}
            className={`py-2 px-2 hover:bg-gray-100 cursor-pointer text-sm rounded ${
              item === "Audience delivery changes"
                ? "bg-gray-100"
                : "text-gray-700"
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Show campaigns at bottom */}
      <div className="p-3 border-t border-gray-200">
        {[
          "Auto Insurance Leads - All",
          "Cruises Around The World",
          "DYT - Solar Panel",
          "DYT - Home Improvement",
        ].map((campaign, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <span className="text-sm text-blue-600 hover:underline cursor-pointer ml-3 flex-1">
              {campaign}
            </span>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-gray-200 text-sm text-gray-600">
        Results from 6 campaigns
        <br />
        <span className="text-xs">Excludes deleted items</span>
      </div>
    </div>
  );

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
    >
      {currentView === "main" && renderMainView()}
      {currentView === "performance" && renderCategoryView("performance")}
      {currentView === "engagement" && renderCategoryView("engagement")}
      {currentView === "conversions" && renderCategoryView("conversions")}
      {currentView === "nameid" && renderNameIdView()}
      {currentView === "audience" && renderAudienceView()}
    </div>
  );
}

// export default function PageFiltersBar({
//   chips,
//   setChips,
//   search,
//   setSearch,
//   filters,
//   setFilters,
//   onOpenSave,
// }) {
//   const [showSearch, setShowSearch] = useState(false);
//   const [selectedFilters, setSelectedFilters] = useState([]);

//   const addChipFromSearch = (e) => {
//     e.preventDefault();
//     if (!search.trim()) return;
//     setSelectedFilters(prev => [...prev, search.trim()]);
//     setSearch("");
//   };

//   const handleSelectFilter = (filter) => {
//     if (!selectedFilters.includes(filter)) {
//       setSelectedFilters(prev => [...prev, filter]);
//     }
//   };

//   const removeFilter = (filterToRemove) => {
//     setSelectedFilters(prev => prev.filter(filter => filter !== filterToRemove));
//   };

//   const selectQuick = (key) => {
//     setFilters((f) => ({
//       ...f,
//       allAds: key === "allAds",
//       hadDelivery: key === "hadDelivery",
//       actions: key === "actions",
//       active: key === "active",
//     }));
//   };

//   return (
//     <div className="bg-transparent px-2">
//       {/* Top row: search icon, quick buttons, Save edits */}
//       <div className="flex items-center gap-2 px-1 py-2">
//         <button
//           onClick={() => setShowSearch((v) => !v)}
//           className={`hover:bg-[#C3DCF5] p-3 rounded-sm border ${
//             showSearch
//               ? " border-[#0A78BE] font-bold text-[#0A78BE]"
//               : "bg-white border-gray-300"
//           }`}
//         >
//           <Search className="w-4 h-4" />
//         </button>
//         <div className="border-l border-gray-300 h-8 mx-2"></div>

//         <button
//           onClick={() => selectQuick("allAds")}
//           className={`hover:bg-[#C3DCF5] flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm border text-sm ${
//             filters?.allAds
//               ? " border-[#0A78BE] font-bold text-[#0A78BE]"
//               : "bg-white border-gray-300 text-gray-700"
//           }`}
//         >
//           All ads
//         </button>

//         <button
//           onClick={() => selectQuick("hadDelivery")}
//           className={`hover:bg-[#C3DCF5] flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm border text-sm ${
//             filters?.hadDelivery
//               ? " border-[#0A78BE] font-bold text-[#0A78BE]"
//               : "bg-white border-gray-300 text-gray-700"
//           }`}
//         >
//           Had delivery
//         </button>

//         <button
//           onClick={() => selectQuick("actions")}
//           className={`hover:bg-[#C3DCF5] flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm border text-sm ${
//             filters?.actions
//               ? " border-[#0A78BE] font-bold text-[#0A78BE]"
//               : "bg-white border-gray-300 text-gray-700"
//           }`}
//         >
//           Actions
//         </button>

//         <button
//           onClick={() => selectQuick("active")}
//           className={`hover:bg-[#C3DCF5] flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm border text-sm ${
//             filters?.active
//               ? " border-[#0A78BE] font-bold text-[#0A78BE]"
//               : "bg-white border-gray-300 text-gray-700"
//           }`}
//         >
//           Active ads
//         </button>

//         <button
//           onClick={() => setFilters((f) => ({ ...f, more: !f.more }))}
//           className={`flex items-center justify-center gap-2  px-3 py-2.5 rounded-sm text-sm hover:bg-gray-200 ${
//             filters?.more ? "bg-gray-200  font-bold " : "  text-gray-700"
//           }`}
//         >
//           <Plus size={20} />
//           See more
//         </button>

//         <button
//           onClick={onOpenSave}
//           className="ml-auto px-3 py-2 text-gray-700  border border-gray-300 rounded-sm text-sm"
//         >
//           Save edits
//         </button>
//         <button
//           className="p-2 rounded-sm border  text-gray-700 border-gray-300"
//           title="settings"
//         >
//           <SlidersHorizontal size={20} />
//         </button>
//       </div>

//       {/* Selected filters as chips */}

//       {/* Toggleable search bar with dropdown */}

//     </div>
//   );
// }
