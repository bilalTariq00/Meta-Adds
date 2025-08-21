"use client";

import React, { useEffect, useRef } from "react";

export default function EditDropdown({ show, onClose }) {
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose?.();
      }
    }

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute z-20 mt-10 w-55 bg-white border border-gray-200 rounded-md shadow-lg p-2 max-h-80 overflow-y-auto"
    >
      {/* General */}
      <div className="px-3 py-1  text-sm font-bold  uppercase mb-2">
        General
      </div>
      <button className="block w-full text-left px-3 py-2 text-gray-600 text-sm hover:bg-gray-50">
        Turn on
      </button>
      <button
        disabled
        className="block w-full text-left px-3 py-2 text-sm text-gray-400 cursor-not-allowed"
      >
        Turn off
      </button>
      <button className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
        Name
      </button>
      <button className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
        Find and replace
      </button>

      <div className="my-2 border-t border-gray-300"></div>

      {/* Identity */}
      <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">
        Identity
      </div>
      <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
        Page
      </button>

      <div className="my-2 border-t border-gray-300"></div>

      {/* Creative */}
      <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">
        Creative
      </div>
      <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
        Primary text
      </button>
      <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
        Multi-advertiser ads
      </button>
      <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
        Advantage+ creative
      </button>
      <button
        disabled
        className="block w-full text-left px-3 py-2 text-sm text-gray-400 cursor-not-allowed"
      >
        Info labels
      </button>
      <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
        Website URL
      </button>
    </div>
  );
}
