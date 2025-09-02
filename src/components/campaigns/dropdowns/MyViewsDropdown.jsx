"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, Plus, Mail, TrendingUp, Send, Edit } from "lucide-react";

export default function MyViewsDropdown({ isOpen, onClose, onBack }) {
  const dropdownRef = useRef(null);

  // Sample views data
  const views = [
    { id: 1, name: "Had delivery", icon: Mail },
    { id: 2, name: "Actions", icon: TrendingUp },
    { id: 3, name: "Active ads", icon: Send },
  ];

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
        <h3 className="font-semibold text-gray-900">My views</h3>
      </div>

      {/* Views List */}
      <div className="py-1">
        {views.map((view) => {
          const IconComponent = view.icon;
          return (
            <div
              key={view.id}
              className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <IconComponent className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">{view.name}</span>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Edit className="w-3 h-3 text-gray-500" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Create View Button */}
      <div className="p-3 border-t border-gray-200">
        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-50">
          <Plus className="w-4 h-4" />
          <span>Create view</span>
        </button>
      </div>
    </div>
  );
}
