"use client";

import { useState, useEffect } from "react";
import { X, Copy } from "lucide-react";

export default function DuplicateModal({ isOpen, onClose, onDuplicate, selectedReports, reportData }) {
  const [duplicateName, setDuplicateName] = useState("");

  // Set default name when modal opens
  useEffect(() => {
    if (isOpen && selectedReports.length > 0) {
      const firstReport = reportData.find(r => r.id === selectedReports[0]);
      if (firstReport) {
        setDuplicateName(`${firstReport.name} copy`);
      }
    }
  }, [isOpen, selectedReports, reportData]);

  const handleDuplicate = () => {
    if (duplicateName.trim()) {
      onDuplicate(selectedReports, duplicateName.trim());
      onClose();
    }
  };

  const handleClose = () => {
    setDuplicateName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6">
          <h2 className="text-lg font-semibold text-gray-900">Duplicate report</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pt-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report name
            </label>
            <input
              type="text"
              value={duplicateName}
              onChange={(e) => setDuplicateName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter duplicate report name"
              autoFocus
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 ">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleDuplicate}
            disabled={!duplicateName.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Duplicate
          </button>
        </div>
      </div>
    </div>
  );
}
