import React, { useState, useRef, useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";

const DiscardDraftsModal = ({
  isOpen,
  onClose,
  accountName = "Adkin Digital",
  accountId = "1263790274765251",
}) => {
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDiscard = () => {
    // Add your discard logic here
    console.log("Discarding drafts...");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50   bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-xl w-full mx-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="discard-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-2 ">
          <div className="flex items-center gap-3">
            <h2
              id="discard-modal-title"
              className="text-lg font-semibold text-gray-900"
            >
              Discard drafts?
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-gray-700 leading-relaxed">
            Any changes in this ad account "{accountName} [{accountId}]" that
            haven't yet been published will be discarded.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6   rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            onClick={handleDiscard}
            className="px-4 py-2 text-sm font-medium text-white bg-[#0A78BE]  rounded-sm hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscardDraftsModal;
