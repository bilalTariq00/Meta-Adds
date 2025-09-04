"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

export default function SearchDropdown({ isOpen, onClose, onSelectFilter }) {
  const [currentView, setCurrentView] = useState("main");
  const dropdownRef = useRef(null);

  const searchData = {
    recent: ["Report name contains test", "Ad account is Adkin Digital"],
    popular: [
      "Report name contains test",
      "Ad account is Adkin Digital", 
      "Created date is Last 7 days",
      "Last accessed is Today",
    ],
    categories: {
      Performance: [
        "Report name",
        "Ad account",
        "Created date", 
        "Last accessed",
        "Views",
        "Downloads",
      ],
      Engagement: ["Views", "Shares", "Downloads", "Exports"],
      Conversions: ["Export count", "Share count", "View count"],
    },
    filters: [
      "Report name",
      "Ad account",
      "Created date",
      "Last accessed",
      "Created by",
      "Report type",
    ],
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  // Reset view when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentView("main");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectItem = (item) => {
    onSelectFilter(item);
    onClose();
  };

  // Main dropdown view
  const renderMainView = () => (
    <div className="max-h-96 overflow-y-auto">
      <div className="p-3">
        <div
          onClick={() => handleSelectItem("Report name")}
          className="py-3 px-3 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 rounded flex items-center justify-between border-b border-gray-100"
        >
          <span>Report name</span>
          <ChevronRight className="w-4 h-4" />
        </div>
        <div
          onClick={() => handleSelectItem("Ad account")}
          className="py-3 px-3 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 rounded flex items-center justify-between"
        >
          <span>Ad account</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );

  // Category view (Performance, Engagement, Conversions)
  const renderCategoryView = (categoryKey) => {
    const category = searchData.categories[categoryKey];
    if (!category) return null;

    return (
      <div className="max-h-96 overflow-y-auto">
        {/* Header with back button */}
        <div className="p-3 border-b border-gray-200 flex items-center">
          <button
            onClick={() => setCurrentView("main")}
            className="mr-3 hover:bg-gray-100 rounded p-1"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
          <h3 className="font-semibold text-gray-900 capitalize">{categoryKey}</h3>
        </div>

        {/* Category items */}
        <div className="p-3">
          {category.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectItem(item)}
              className="py-2 px-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 rounded"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div ref={dropdownRef}>
      {currentView === "main" && renderMainView()}
      {currentView === "performance" && renderCategoryView("Performance")}
      {currentView === "engagement" && renderCategoryView("Engagement")}
      {currentView === "conversions" && renderCategoryView("Conversions")}
    </div>
  );
}
