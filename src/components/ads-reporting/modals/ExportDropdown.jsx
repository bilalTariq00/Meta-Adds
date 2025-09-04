"use client";

import { useState, useRef, useEffect } from "react";
import { Download, ChevronDown } from "lucide-react";

export default function ExportDropdown({ onSelectOption }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option) => {
    onSelectOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <Download className="w-4 h-4 mr-2" />
        Export
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]">
          <button
            onClick={() => handleOptionClick('report')}
            className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center"
          >
            <Download className="w-4 h-4 mr-3 text-gray-600" />
            Export report
          </button>
          <button
            onClick={() => handleOptionClick('mmm')}
            className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center border-t border-gray-100"
          >
            <Download className="w-4 h-4 mr-3 text-gray-600" />
            Export MMM data
          </button>
          <button
            onClick={() => handleOptionClick('audience')}
            className="w-full px-4 py-3 text-left text-sm whitespace-nowrap hover:bg-gray-50 flex items-center border-t border-gray-100"
          >
            <Download className="w-4 h-4 mr-3 text-gray-600" />
            Export Audience Network pricing report
          </button>
        </div>
      )}
    </div>
  );
}
