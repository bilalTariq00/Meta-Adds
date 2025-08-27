"use client";

import React from "react";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ExportPopup({
  isOpen,
  onClose,
  onExportAll,
  onExportSelected,
  onCustomiseExport,
  position = "right",
  triggerRef,
}) {
  const popupRef = useRef(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && triggerRef?.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();

      if (position === "right") {
        // Position to the right of the More dropdown, not inside it
        setPopupPosition({
          top: triggerRect.top + 200,
          left: triggerRect.right + 170, // 8px gap from the More dropdown
        });
      } else {
        // Position below the button
        setPopupPosition({
          top: triggerRect.bottom + 4,
          left: triggerRect.right - 192, // Align right edge (192px = min-w-48)
        });
      }
    }
  }, [isOpen, position, triggerRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      console.log("[v0] Export popup is open");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const popupContent = (
    <div
      ref={popupRef}
      className="fixed bg-white border border-gray-200 rounded-lg shadow-lg max-w-45 py-2 z-[9999]"
      style={{
        top: popupPosition.top,
        left: popupPosition.left,
      }}
    >
      <button
        onClick={onExportAll}
        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Export All
      </button>
      <button
        onClick={onExportSelected}
        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Export Selected
      </button>
      <button
        onClick={onCustomiseExport}
        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Customise export
      </button>
    </div>
  );

  return createPortal(popupContent, document.body);
}
