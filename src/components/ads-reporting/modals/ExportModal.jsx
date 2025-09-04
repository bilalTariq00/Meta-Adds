"use client";

import { useState } from "react";
import { X, Download } from "lucide-react";

export default function ExportModal({ isOpen, onClose, onExport, selectedReports }) {
  const [exportName, setExportName] = useState("Untitled report");
  const [exportFormat, setExportFormat] = useState("raw"); // raw, formatted, csv
  const [includeSummary, setIncludeSummary] = useState(true);

  const handleExport = () => {
    const exportData = {
      name: exportName,
      format: exportFormat,
      includeSummary,
      reportIds: selectedReports
    };
    
    onExport(exportData);
    onClose();
  };

  const handleClose = () => {
    setExportName("Untitled report");
    setExportFormat("raw");
    setIncludeSummary(true);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Export report</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export name
            </label>
            <div className="relative">
              <input
                type="text"
                value={exportName}
                onChange={(e) => setExportName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter export name"
              />
              {exportName && (
                <button
                  onClick={() => setExportName("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Export Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Export as:
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="exportFormat"
                  value="formatted"
                  checked={exportFormat === "formatted"}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">
                  Formatted data table (.xlsx)
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="exportFormat"
                  value="raw"
                  checked={exportFormat === "raw"}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">
                  Raw data table (.xlsx)
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="exportFormat"
                  value="csv"
                  checked={exportFormat === "csv"}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">
                  CSV (.csv)
                </span>
              </label>
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Options:
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeSummary}
                onChange={(e) => setIncludeSummary(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">
                Include summary row
              </span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
