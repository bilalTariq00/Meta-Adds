"use client";

import { useState } from "react";
import { Search, Download, Puzzle } from "lucide-react";

export default function ExportPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search exports"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Empty State */}
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          {/* Puzzle Pieces Illustration */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              {/* Large puzzle piece */}
              <div className="w-24 h-24 bg-gray-300 rounded-lg relative">
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-gray-400 rounded-full"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-500 rounded-full"></div>
              </div>
              
              {/* Small puzzle piece */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-purple-500 rounded-lg transform rotate-12">
                <div className="absolute top-2 left-2 w-6 h-6 bg-white rounded opacity-80">
                  <div className="w-full h-full bg-purple-600 rounded" style={{
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 70%, 70% 100%, 0% 100%)"
                  }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            No exported files
          </h2>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            You haven't exported reports or marketing mix modelling (MMM) data yet. 
            You can get started by setting up an export, which will appear on this page 
            for you to download in CSV or XLS formats.
          </p>

          {/* Export Button */}
          <button className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors mx-auto">
            <Download className="w-5 h-5 mr-2" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
