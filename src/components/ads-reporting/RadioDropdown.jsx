"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function RadioDropdown({ 
  options = [], 
  selectedValue, 
  onSelect, 
  placeholder = "Select option",
  className = "",
  position = "bottom-right" // bottom-right, bottom-left, top-right, top-left
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  // Calculate dropdown position based on available space
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;
      
      // If there's less space below (200px) and more space above, show on top
      if (spaceBelow < 200 && spaceAbove > spaceBelow) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          triggerRef.current && !triggerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  const getPositionClasses = () => {
    if (dropdownPosition === "top") {
      return "bottom-full mb-2";
    } else {
      return "top-full mt-2";
    }
  };

  const selectedOption = options.find(option => option.value === selectedValue);

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <span className="text-gray-700">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute z-50 w-full bg-white border border-gray-200 rounded-md shadow-lg ${getPositionClasses()}`}
        >
          <div className="py-1 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <label
                key={option.value}
                className={`flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 ${
                  selectedValue === option.value ? 'bg-blue-50' : ''
                }`}
              >
                <input
                  type="radio"
                  name="dropdown-option"
                  value={option.value}
                  checked={selectedValue === option.value}
                  onChange={() => handleSelect(option.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
