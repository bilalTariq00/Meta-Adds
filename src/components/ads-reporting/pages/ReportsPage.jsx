"use client";

import { useState } from "react";
import { ArrowUpDown, MoreHorizontal, User, Download, Share } from "lucide-react";
import PivotTableSection from "../sections/PivotTableSection";
import TrendSection from "../sections/TrendSection";
import BarChartSection from "../sections/BarChartSection";

export default function ReportsPage({ searchQuery, selectedReports, onSelectReport, onSelectAll, currentLayout }) {
  const [sortColumn, setSortColumn] = useState("lastAccessed");
  const [sortDirection, setSortDirection] = useState("desc");

  const reports = [
    {
      id: "1",
      name: "Untitled report",
      account: "1 ad account",
      lastAccessed: "02/09/2025",
      edited: "02/09/2025",
      created: "02/09/2025",
      creator: "Muhammad Bilal"
    },
    {
      id: "2",
      name: "Untitled report",
      account: "1 ad account",
      lastAccessed: "02/09/2025",
      edited: "02/09/2025",
      created: "02/09/2025",
      creator: "Muhammad Bilal"
    },
    {
      id: "3",
      name: "Untitled report",
      account: "1 ad account",
      lastAccessed: "19/08/2025",
      edited: "19/08/2025",
      created: "19/08/2025",
      creator: "Muhammad Bilal"
    },
    {
      id: "4",
      name: "Untitled report",
      account: "1 ad account",
      lastAccessed: "19/08/2025",
      edited: "19/08/2025",
      created: "19/08/2025",
      creator: "Muhammad Bilal"
    },
    {
      id: "5",
      name: "Untitled report",
      account: "1 ad account",
      lastAccessed: "19/08/2025",
      edited: "19/08/2025",
      created: "19/08/2025",
      creator: "Muhammad Bilal"
    }
  ];

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (column) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortDirection === "asc" ? 
      <ArrowUpDown className="w-4 h-4 text-gray-600 rotate-180" /> : 
      <ArrowUpDown className="w-4 h-4 text-gray-600" />;
  };

  const renderContent = () => {
    switch (currentLayout) {
      case "pivot-table":
        return <PivotTableSection />;
      case "trend":
        return <TrendSection />;
      case "bar-chart":
        return <BarChartSection />;
      default:
        return (
          <div className="p-6">
            {/* Reports Table */}
            <div className="bg-white rounded-lg border border-gray-200">
              {/* Table Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                  <div className="col-span-1">
                    <input
                      type="checkbox"
                      checked={selectedReports.length === reports.length}
                      onChange={onSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-4">
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center space-x-1 hover:text-gray-900"
                    >
                      <span>Report name</span>
                      {getSortIcon("name")}
                    </button>
                  </div>
                  <div className="col-span-2">
                    <button
                      onClick={() => handleSort("lastAccessed")}
                      className="flex items-center space-x-1 hover:text-gray-900"
                    >
                      <span>Last accessed</span>
                      {getSortIcon("lastAccessed")}
                    </button>
                  </div>
                  <div className="col-span-2">
                    <button
                      onClick={() => handleSort("edited")}
                      className="flex items-center space-x-1 hover:text-gray-900"
                    >
                      <span>Edited</span>
                      {getSortIcon("edited")}
                    </button>
                  </div>
                  <div className="col-span-2">
                    <button
                      onClick={() => handleSort("created")}
                      className="flex items-center space-x-1 hover:text-gray-900"
                    >
                      <span>Created</span>
                      {getSortIcon("created")}
                    </button>
                  </div>
                  <div className="col-span-1"></div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {reports.map((report) => (
                  <div key={report.id} className="px-6 py-4 hover:bg-gray-50 group">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1">
                        <input
                          type="checkbox"
                          checked={selectedReports.includes(report.id)}
                          onChange={() => onSelectReport(report.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </div>
                      <div className="col-span-4">
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {report.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {report.account}
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1 hover:bg-gray-200 rounded">
                              <User className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded">
                              <Download className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded">
                              <Share className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded">
                              <MoreHorizontal className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-sm text-gray-900">{report.lastAccessed}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-sm text-gray-900">{report.edited}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-sm text-gray-900">{report.created}</div>
                        <div className="text-sm text-gray-500">by {report.creator}</div>
                      </div>
                      <div className="col-span-1">
                        <button className="p-1 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      {renderContent()}
    </div>
  );
}
