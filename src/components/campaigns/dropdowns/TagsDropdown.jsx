import React, { useState, useRef, useEffect } from "react";
import { Tags, Trash2, X } from "lucide-react";

const TagsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    tagToDelete: null,
  });
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleCreateTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCreateTag();
    }
  };

  const handleDeleteClick = (tag) => {
    setDeleteConfirm({ show: true, tagToDelete: tag });
  };

  const confirmDelete = () => {
    if (deleteConfirm.tagToDelete) {
      setTags(tags.filter((tag) => tag !== deleteConfirm.tagToDelete));
    }
    setDeleteConfirm({ show: false, tagToDelete: null });
  };

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, tagToDelete: null });
  };

  const handleDone = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Tags Button */}
      <button
        className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Tags className="w-4 h-4" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4">
            {/* Header */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Edit tags for 1 campaign
            </h3>

            {/* Input Section */}
            <div className="flex gap-2 mb-4">
              <input
                ref={inputRef}
                type="text"
                placeholder="Enter tag to view or create"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={handleCreateTag}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 rounded-md text-sm font-medium transition-colors"
                disabled={!inputValue.trim()}
              >
                Create
              </button>
            </div>

            {/* Tags List or Empty State */}
            <div className="mb-4">
              {tags.length === 0 ? (
                <p className="text-gray-600 text-sm py-4">
                  No tags have been created yet. To get started, enter a new
                  tag. You can add and remove tags from your campaigns at any
                  time.
                </p>
              ) : (
                <div className="space-y-2">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-blue-50 rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-900 text-sm font-medium">
                          {tag}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteClick(tag)}
                        className="ml-auto p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Done Button */}
            <div className="flex justify-end">
              <button
                onClick={handleDone}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete tag?
                </h3>
                <button
                  onClick={cancelDelete}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <p className="text-gray-600 mb-6">
                Are you sure that you want to permanently delete this tag?
              </p>

              {/* Modal Actions */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagsDropdown;
