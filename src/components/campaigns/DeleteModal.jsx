"use client";

import React from "react";
import { X } from "lucide-react";

export default function DeleteModal({ open, onClose, onConfirm }) {
  if (!open) return null;
  return (
    <div 
      className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-[500px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 ">
          <h3 className="text-lg font-semibold">
            Do you want to delete the campaign?
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-4 text-sm text-gray-700">
          If you delete the campaign, you won't able to recover it later.
        </div>
        <div className="p-4 flex justify-end gap-2 ">
          <button
            onClick={onClose}
            className="px-3 py-1.5 border rounded text-sm border-gray-700 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1.5 bg-[#0A78BE] text-white rounded text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
