"use client";

import React from "react";
import { X, Undo2 } from "lucide-react";

export default function RevertModal({ open, onClose, onConfirm }) {
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
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
           
            <h3 className="text-lg font-semibold text-gray-900">
              Discard draft changes?
            </h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-4 pb-4">
          <div className="text-sm text-gray-700 mb-4">
            You have unsaved changes. If you discard them, you won't be able to recover them later.
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 border rounded text-sm border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-orange-700"
            >
              Discard draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
