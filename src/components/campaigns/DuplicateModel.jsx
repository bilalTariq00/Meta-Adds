"use client";

import React from "react";
import { X, Info } from "lucide-react";

const DuplicateModal = ({
  open,
  onClose,
  onDuplicate,
  applyRecommendation,
  setApplyRecommendation,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose} // ✅ clicking backdrop closes
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()} // ✅ prevent closing when clicking inside
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <img src="/images/campaigns/Duplicate.png" alt="" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Duplicate your campaign
          </h2>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">
          Select whether you'd like to apply our recommendation to your
          duplicate campaign. It may improve your performance. You can review
          and edit before publishing.
        </p>

        {/* Apply Recommendation */}
        <div className="mb-6">
          <h3 className="text-sm font-bold  mb-2">Apply recommendation</h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={applyRecommendation}
              onChange={(e) => setApplyRecommendation(e.target.checked)}
              className="
    w-6 h-6
    appearance-none 
    rounded 
    border border-gray-300 
    bg-white 
    flex items-center justify-center
    checked:before:content-['✓'] 
    checked:before:text-[#0A78BE]
    checked:before:font-bold
    p-2
  "
            />

            <span className="text-sm text-gray-700">
              Advantage+ on for placements
            </span>
            <Info className="w-4 h-4 text-gray-400" />
          </label>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onDuplicate}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Duplicate
          </button>
        </div>
      </div>
    </div>
  );
};

export default DuplicateModal;
