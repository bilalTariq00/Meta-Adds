import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// Reusable SortingDropdown Component
const SortingDropdown = ({
  options = [],
  value,
  onChange,
  placeholder = "Sort by...",
  className = "",
  showSortDirection = true,
  sortDirection = "asc",
  onSortDirectionChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Calculate dropdown position based on available space
  const calculateDropdownPosition = () => {
    if (!buttonRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const dropdownHeight = Math.min(240, options.length * 40); // Estimate dropdown height

    // Find the closest scrollable parent or use viewport
    let scrollableParent = buttonRef.current.parentElement;
    while (scrollableParent && scrollableParent !== document.body) {
      const style = window.getComputedStyle(scrollableParent);
      if (
        style.overflow === "auto" ||
        style.overflow === "scroll" ||
        style.overflowY === "auto" ||
        style.overflowY === "scroll"
      ) {
        break;
      }
      scrollableParent = scrollableParent.parentElement;
    }

    let containerRect, spaceBelow, spaceAbove;

    if (scrollableParent && scrollableParent !== document.body) {
      // If inside a scrollable container
      containerRect = scrollableParent.getBoundingClientRect();
      spaceBelow = containerRect.bottom - buttonRect.bottom;
      spaceAbove = buttonRect.top - containerRect.top;
    } else {
      // Use viewport
      spaceBelow = window.innerHeight - buttonRect.bottom;
      spaceAbove = buttonRect.top;
    }

    // Show on top if there's more space above or not enough space below
    if (spaceAbove > spaceBelow && spaceBelow < dropdownHeight + 20) {
      setDropdownPosition("top");
    } else {
      setDropdownPosition("bottom");
    }
  };

  useEffect(() => {
    if (isOpen) {
      calculateDropdownPosition();
    }
  }, [isOpen, options.length]);

  const handleOptionSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const toggleSortDirection = () => {
    if (onSortDirectionChange) {
      onSortDirectionChange(sortDirection === "asc" ? "desc" : "asc");
    }
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex-1">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="">
            {selectedOption ? `Sorting: ${selectedOption.label}` : placeholder}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div
            ref={dropdownRef}
            className={`absolute left-0 right-0 bg-white border border-gray-300 rounded shadow-lg z-50 max-h-60 overflow-y-auto ${
              dropdownPosition === "top" ? "bottom-full mb-1" : "top-full mt-1"
            }`}
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option)}
                className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {showSortDirection && (
        <button
          onClick={toggleSortDirection}
          className="p-2 border border-gray-400 rounded  hover:bg-gray-50 focus:outline-none "
          title={`Sort ${sortDirection === "asc" ? "ascending" : "descending"}`}
        >
          {sortDirection === "asc" ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};
export default SortingDropdown;
