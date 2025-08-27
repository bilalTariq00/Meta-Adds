"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";

export default function ExportAdModal({ isOpen, onClose }) {
  const [selectedFormat, setSelectedFormat] = useState("csv");
  const [removeEmptyColumns, setRemoveEmptyColumns] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExport = async () => {
    setIsExporting(true);

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create and download CSV file
    const csvContent =
      "data:text/csv;charset=utf-8,Campaign Name,Ad Set Name,Ad Name,Status\nSelected Campaign,Selected Ad Set,Selected Ad,Active";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `selected_ads_export.${selectedFormat}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsExporting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
          <h2 className=" font-semibold text-gray-900 ">Export ad</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 py-2 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Format</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="xlsx-selected"
                  name="format-selected"
                  value="xlsx"
                  checked={selectedFormat === "xlsx"}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <label
                  htmlFor="xlsx-selected"
                  className="text-sm text-gray-900"
                >
                  Export as .xlsx
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="csv-selected"
                  name="format-selected"
                  value="csv"
                  checked={selectedFormat === "csv"}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <label htmlFor="csv-selected" className="text-sm text-gray-900">
                  Export as .csv
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="text-selected"
                  name="format-selected"
                  value="txt"
                  checked={selectedFormat === "txt"}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <label
                  htmlFor="text-selected"
                  className="text-sm text-gray-900"
                >
                  Export as text (Ctrl + Shift + C)
                </label>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Options</h3>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="remove-empty-selected"
                checked={removeEmptyColumns}
                onChange={(e) => setRemoveEmptyColumns(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label
                htmlFor="remove-empty-selected"
                className="text-sm text-gray-900"
              >
                Remove empty columns
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-2 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={isExporting}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isExporting && <Loader2 className="w-4 h-4 animate-spin" />}
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
