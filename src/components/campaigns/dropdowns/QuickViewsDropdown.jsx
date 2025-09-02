"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, Plus } from "lucide-react";

export default function QuickViewsDropdown({ isOpen, onClose, onMyViews, onSharedViews, onCreateView }) {
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
      className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]"
    >
      {/* Header */}
      <div className="p-3 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Quick views</h3>
      </div>

      {/* Menu Items */}
      <div className="py-1">
        <button
          onClick={() => {
            onMyViews();
            onClose();
          }}
          className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <span>My views</span>
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </button>
        
        <button
          onClick={() => {
            onSharedViews();
            onClose();
          }}
          className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <span>Shared views</span>
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Create View Button */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={() => {
            onCreateView();
            onClose();
          }}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
        >
          <Plus className="w-4 h-4" />
          <span>Create view</span>
        </button>
      </div>
    </div>
  );
}
