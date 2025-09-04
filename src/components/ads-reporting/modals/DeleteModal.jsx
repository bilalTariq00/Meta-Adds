"use client";

import { X } from "lucide-react";

export default function DeleteModal({ isOpen, onClose, onConfirm, selectedReports, reportData }) {
  const handleConfirm = () => {
    onConfirm(selectedReports);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  // Get report names for display
  const reportNames = selectedReports.map(id => {
    const report = reportData.find(r => r.id === id);
    return report ? report.name : `Report ${id}`;
  });

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6">
          <h2 className="text-lg font-semibold text-gray-900">Delete reports</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pt-3">
          <p className="text-sm text-gray-700 mb-4">
            Are you sure that you want to delete the following {selectedReports.length} report{selectedReports.length > 1 ? 's' : ''}? This cannot be undone.
          </p>
          
          {/* List of reports to be deleted */}
          <div className="space-y-2 bg-gray-100 rounded-md p-3">
            {reportNames.map((name, index) => (
              <div key={index} className="flex items-center text-sm font-bold">
                <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                <span>{name}</span>
              </div>
            ))}
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
            onClick={handleConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
