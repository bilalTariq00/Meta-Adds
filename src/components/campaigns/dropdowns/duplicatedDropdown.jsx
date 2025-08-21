"use client";

import React, { useEffect, useRef } from "react";
import { Copy } from "lucide-react";

const DuplicateDropdown = ({
  show,
  onClose,
  onDuplicate,
  onCopy,
  triggerRef,
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        onClose?.();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show, onClose, triggerRef]);

  if (!show) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute z-20 mt-10 bg-white border border-gray-200 rounded-md shadow-lg w-48 p-1"
    >
      <button
        onClick={() => {
          onDuplicate?.();
          onClose?.();
        }}
        className="w-full px-3 py-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50  border-b border-gray-200 "
      >
        Duplicate
        <span className="ml-auto text-xs text-gray-500">Ctrl + D</span>
      </button>
      <button
        onClick={() => {
          onCopy?.();
          onClose?.();
        }}
        className="w-full px-3 py-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        Copy
        <span className="ml-auto text-xs text-gray-500">Ctrl + C</span>
      </button>
      <button
        onClick={() => {
          onCopy?.();
          onClose?.();
        }}
        className="w-full px-3 py-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        Paste
        <span className="ml-auto text-xs text-gray-500">Ctrl + C</span>
      </button>
      <button
        onClick={() => {
          onCopy?.();
          onClose?.();
        }}
        className="w-full px-3 py-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        Show copied items
      </button>
    </div>
  );
};

export default DuplicateDropdown;
