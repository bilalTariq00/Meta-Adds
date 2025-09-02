"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, Plus } from "lucide-react";

export default function SharedViewsDropdown({ isOpen, onClose, onBack }) {
  const dropdownRef = useRef(null);

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

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[250px]"
    >
      {/* Header */}
      <div className="p-3 border-b border-gray-200 flex items-center">
        <button
          onClick={() => {
            onBack();
            onClose();
          }}
          className="mr-3 hover:bg-gray-100 rounded p-1"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h3 className="font-semibold text-gray-900">Shared views</h3>
      </div>

      {/* Empty State */}
      <div className="p-6 text-center">
        <p className="text-sm text-gray-600 mb-4">There are no shared views available.</p>
        
        {/* Create View Button */}
        <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-50 mx-auto">
          <Plus className="w-4 h-4" />
          <span>Create view</span>
        </button>
      </div>
    </div>
  );
}
