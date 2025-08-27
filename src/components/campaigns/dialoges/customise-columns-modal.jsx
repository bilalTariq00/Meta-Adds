"use client";

import { useState } from "react";
import { X, Search } from "lucide-react";

const columnData = {
  Ad: [
    "AD",
    "Ad ID",
    "Ad Name",
    "Ad Start Time",
    "Ad Status",
    "Ad Stop Time",
    "Add End Card",
    "Additional Body 1",
    "Additional Body 1 Placement",
    "Additional Body 2",
    "Additional Body 2 Placement",
    "Additional Body 3",
    "Additional Body 3 Placement",
    "Additional Body 4",
    "Additional Body 4 Placement",
    "Additional Body 5",
    "Additional Body 5 Placement",
    "Additional Body 6",
    "Additional Body 6 Placement",
  ],
  "Ad set": [
    "Ad Set ID",
    "Ad Set Name",
    "Ad Set Status",
    "Ad Set Start Time",
    "Ad Set Stop Time",
    "Audience",
    "Budget",
    "Bid Strategy",
    "Optimization Goal",
    "Targeting",
    "Placement",
    "Schedule",
    "Attribution Setting",
  ],
  Campaign: [
    "Campaign ID",
    "Campaign Name",
    "Campaign Status",
    "Campaign Start Time",
    "Campaign Stop Time",
    "Campaign Objective",
    "Campaign Budget",
    "Buying Type",
    "Campaign Category",
    "Special Ad Category",
  ],
};

export default function CustomiseColumnsModal({ isOpen, onClose, onApply }) {
  const [activeTab, setActiveTab] = useState("Ad");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [saveAsPreset, setSaveAsPreset] = useState(false);

  if (!isOpen) return null;

  const filteredColumns = columnData[activeTab].filter((column) =>
    column.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleColumn = (column) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((c) => c !== column)
        : [...prev, column]
    );
  };

  const removeColumn = (column) => {
    setSelectedColumns((prev) => prev.filter((c) => c !== column));
  };

  const handleApply = () => {
    onApply(selectedColumns);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-3 sticky top-0 bg-white z-50 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-900">
            Customise columns
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-[540px]">
          {/* Left sidebar with tabs */}
          <div className="w-48 border-r border-gray-200 bg-gray-50">
            <div className="px-4 py-2 px-1space-y-2">
              {Object.keys(columnData).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                    activeTab === tab
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 flex">
            {/* Column selection area */}
            <div className="flex-1 px-6 py-2">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2 max-h-[450px] overflow-y-auto">
                {filteredColumns.map((column) => (
                  <div key={column} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={column}
                      checked={selectedColumns.includes(column)}
                      onChange={() => toggleColumn(column)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <label
                      htmlFor={column}
                      className="text-sm text-gray-900 cursor-pointer"
                    >
                      {column}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected columns area */}
            <div className="w-80 border-l border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-900">
                  {selectedColumns.length} columns selected
                </h3>
              </div>

              <div className="space-y-2 max-h-[450px] overflow-y-auto">
                {selectedColumns.map((column) => (
                  <div
                    key={column}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <span className="text-sm text-gray-900">{column}</span>
                    <button
                      onClick={() => removeColumn(column)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-2 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="save-preset"
              checked={saveAsPreset}
              onChange={(e) => setSaveAsPreset(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label htmlFor="save-preset" className="text-sm text-gray-900">
              Save as a column preset
            </label>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
