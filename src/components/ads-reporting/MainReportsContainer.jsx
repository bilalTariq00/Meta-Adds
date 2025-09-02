"use client";

import { useState } from "react";
import { Search, Plus, Download, ArrowUpDown, MoreHorizontal } from "lucide-react";
import ReportsPage from "./pages/ReportsPage";
import ExportPage from "./pages/ExportPage";

export default function MainReportsContainer({ activeView, currentLayout, onChooseLayout }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReports, setSelectedReports] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSelectReport = (reportId) => {
    setSelectedReports(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleSelectAll = () => {
    // This would select all visible reports
    setSelectedReports(prev => prev.length > 0 ? [] : ["1", "2", "3", "4", "5"]);
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Top Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search to filter by name, ID or metrics"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {activeView === "reports" && (
              <>
                <button
                  onClick={onChooseLayout}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Report
                </button>
                <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Export History
                </button>
              </>
            )}
            
            {activeView === "exports" && (
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeView === "reports" ? (
          <ReportsPage
            searchQuery={searchQuery}
            selectedReports={selectedReports}
            onSelectReport={handleSelectReport}
            onSelectAll={handleSelectAll}
            currentLayout={currentLayout}
          />
        ) : (
          <ExportPage />
        )}
      </div>
    </div>
  );
}
