"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, FileImage, ChevronDown } from "lucide-react";

const bugCategories = {
  "User Interface": [
    "Layout issues",
    "Button not working",
    "Missing elements",
    "Styling problems",
    "Responsive design",
    "Dark mode issues",
  ],
  Functionality: [
    "Feature not working",
    "Unexpected behavior",
    "Performance issues",
    "Data not loading",
    "Forms not submitting",
    "Search not working",
  ],
  Authentication: [
    "Login issues",
    "Logout problems",
    "Session timeout",
    "Password reset",
    "Account access",
  ],
  "Data & Sync": [
    "Data not saving",
    "Sync issues",
    "Data corruption",
    "Missing data",
    "Export problems",
  ],
};

const ReportBugDialog = ({ isOpen = false, onClose = () => {} }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [stepsToReproduce, setStepsToReproduce] = useState("");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [subcategoryDropdownOpen, setSubcategoryDropdownOpen] = useState(false);

  const categoryRef = useRef(null);
  const subcategoryRef = useRef(null);
  const reportDialogRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setCategoryDropdownOpen(false);
      }
      if (
        subcategoryRef.current &&
        !subcategoryRef.current.contains(e.target)
      ) {
        setSubcategoryDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleCategoryChange = (value) => {
    console.log("Category selected:", value);
    setSelectedCategory(value);
    setSelectedSubcategory(""); // Reset subcategory when category changes
    setCategoryDropdownOpen(false);
  };

  const handleSubcategoryChange = (value) => {
    console.log("Subcategory selected:", value);
    setSelectedSubcategory(value);
    setSubcategoryDropdownOpen(false);
  };

  const getSubcategoryOptions = () => {
    if (!selectedCategory || !bugCategories[selectedCategory]) {
      return [];
    }
    return bugCategories[selectedCategory];
  };

  const handleSubmit = () => {
    // Handle bug report submission here
    console.log("Bug Report Submitted:", {
      category: selectedCategory,
      subcategory: selectedSubcategory,
      description,
      stepsToReproduce,
    });
    // Reset form and close dialog
    setSelectedCategory("");
    setSelectedSubcategory("");
    setDescription("");
    setStepsToReproduce("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div
        ref={reportDialogRef}
        className="report-bug-dialog bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4"
      >
        {/* Header with illustration */}
        <div className="relative ">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 hover:bg-[#1461CC] rounded-full transition-colors z-10"
          >
            <X size={20} className="text-gray-600" />
          </button>
          <div className="flex items-center justify-center w-full">
            <img
              src="/images/bug.png"
              alt="Bug report illustration"
              className="w-full    object-contain"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Report a Bug
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Help us improve by reporting bugs you encounter. Please provide as
              much detail as possible to help us reproduce and fix the issue
              quickly.
            </p>
          </div>

          <div className="space-y-5">
            {/* Bug Category Dropdown */}
            <div ref={categoryRef} className="relative dropdown-container">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bug Category *
              </label>
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className={`w-full h-10 px-4 text-base border-2 rounded-lg focus:ring-2 focus:ring-[#1461CC] focus:border-[#1461CC] flex items-center justify-between ${
                  categoryDropdownOpen ? "border-[#1461CC]" : "border-gray-300"
                } ${selectedCategory ? "text-gray-900" : "text-gray-500"}`}
              >
                <span>{selectedCategory || "Select bug category"}</span>
                <ChevronDown
                  size={20}
                  className={`transition-transform ${
                    categoryDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                  {Object.keys(bugCategories).map((category) => (
                    <div
                      key={category}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategoryChange(category);
                      }}
                      className="flex items-center px-4 py-3 hover:bg-[#1461CC] cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors select-none"
                    >
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white mr-3 flex-shrink-0"></div>
                      <span className="text-base text-gray-900">
                        {category}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bug Subcategory Dropdown */}
            <div ref={subcategoryRef} className="relative dropdown-container">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specific Issue *
              </label>
              <button
                onClick={() =>
                  selectedCategory &&
                  setSubcategoryDropdownOpen(!subcategoryDropdownOpen)
                }
                disabled={!selectedCategory}
                className={`w-full h-10  px-4 text-base border-2 rounded-lg flex items-center justify-between transition-all ${
                  !selectedCategory
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                    : subcategoryDropdownOpen
                    ? "border-[#1461CC] focus:ring-2 focus:ring-[#1461CC]"
                    : selectedSubcategory
                    ? "text-gray-900 border-gray-300 hover:border-gray-400"
                    : "text-gray-500 border-gray-300 hover:border-gray-400"
                }`}
              >
                <span>{selectedSubcategory || "Select specific issue"}</span>
                <ChevronDown
                  size={20}
                  className={`transition-transform ${
                    !selectedCategory
                      ? "text-gray-400"
                      : subcategoryDropdownOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {subcategoryDropdownOpen && selectedCategory && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                  {getSubcategoryOptions().map((subcategory) => (
                    <div
                      key={subcategory}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubcategoryChange(subcategory);
                      }}
                      className="flex items-center px-4 py-3 hover:bg-[#1461CC] cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors select-none"
                    >
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white mr-3 flex-shrink-0"></div>
                      <span className="text-base text-gray-900">
                        {subcategory}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bug Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bug Description *
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the bug you encountered..."
                disabled={!selectedCategory || !selectedSubcategory}
                className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all resize-none text-base ${
                  !selectedCategory || !selectedSubcategory
                    ? "bg-gray-100 text-gray-400 placeholder-gray-300 cursor-not-allowed border-gray-200"
                    : description.trim()
                    ? "border-[#1461CC] text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#1461CC]"
                    : "border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#1461CC] focus:border-[#1461CC]"
                }`}
              />
            </div>

            {/* Steps to Reproduce */}

            {/* Add Screenshot Button */}
            <div>
              <button className="flex items-center gap-2 text-gray-200 hover:text-gray-600 text-sm font-medium transition-colors">
                <FileImage size={16} />
                Add screenshot or screen recording (recommended)
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-[#1461CC] text-white rounded-lg hover:bg-[#1461CC] transition-colors font-medium text-base disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={
              !selectedCategory || !selectedSubcategory || !description.trim()
            }
          >
            Report Bug
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportBugDialog;
