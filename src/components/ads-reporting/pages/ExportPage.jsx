"use client";

import { useState, useEffect } from "react";
import { Search, Download, ChevronDown } from "lucide-react";
import ExportDropdown from "../modals/ExportDropdown";
import MMMExportModal from "../modals/MMMExportModal";
import AudienceNetworkModal from "../modals/AudienceNetworkModal";

export default function ExportPage({ exportHistory = [], onNavigateToReports }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [exports, setExports] = useState(exportHistory);
  const [showMMMModal, setShowMMMModal] = useState(false);
  const [showAudienceModal, setShowAudienceModal] = useState(false);

  // Update exports when exportHistory changes
  useEffect(() => {
    setExports(exportHistory);
  }, [exportHistory]);

  // Filter exports based on search query
  const filteredExports = exports.filter(exportItem =>
    exportItem.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportOption = (option) => {
    switch (option) {
      case 'report':
        // Navigate to Reports tab for report export
        if (onNavigateToReports) {
          onNavigateToReports();
        }
        break;
      case 'mmm':
        setShowMMMModal(true);
        break;
      case 'audience':
        setShowAudienceModal(true);
        break;
    }
  };

  const handleMMMExport = (exportData) => {
    const newExport = {
      id: Date.now().toString(),
      name: `${exportData.fileName}.csv`,
      type: "MMM data",
      date: new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: "processing",
      progress: true
    };
    setExports(prev => [newExport, ...prev]);

    // Simulate processing completion after 3 seconds and auto-download
    setTimeout(() => {
      setExports(prev => prev.map(exp => 
        exp.id === newExport.id 
          ? { ...exp, status: "ready", progress: false, expiresIn: "30 days" }
          : exp
      ));

      // Auto-download the file when processing completes
      const blob = new Blob([`MMM data for ${exportData.fileName}`], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${exportData.fileName}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 3000);
  };

  const handleAudienceExport = (exportData) => {
    const newExport = {
      id: Date.now().toString(),
      name: `${exportData.fileName}.csv`,
      type: "Audience Network pricing report",
      date: new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: "ready",
      progress: false,
      expiresIn: "30 days"
    };
    setExports(prev => [newExport, ...prev]);

    // Trigger download
    const blob = new Blob(['Audience Network pricing data'], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${exportData.fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleDownload = (exportItem) => {
    const blob = new Blob([`Export data for ${exportItem.name}`], { 
      type: exportItem.name.endsWith('.csv') ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = exportItem.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-full h-full flex flex-col">
          {/* Card Header */}
          <div className="p-6 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center gap-2">
              {/* Export Dropdown */}
              <ExportDropdown onSelectOption={handleExportOption} />

              {/* Search Bar */}
              <div className="relative flex flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search exports"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="flex-1 flex flex-col">
            {filteredExports.length === 0 ? (
              // Empty State
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
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
                        <div
                          className="w-full h-full bg-purple-600 rounded"
                          style={{
                            clipPath:
                              "polygon(0% 0%, 100% 0%, 100% 70%, 70% 100%, 0% 100%)",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  No exported files
                </h2>
     
                <p className="text-gray-600 mb-8 leading-relaxed max-w-md mx-auto">
                  You haven't exported reports or marketing mix modelling (MMM) data
                  yet. You can get started by setting up an export, which will
                  appear on this page for you to download in CSV or XLS formats.
                </p>

                {/* Export Button */}
                <ExportDropdown onSelectOption={handleExportOption} />
              </div>
            ) : (
              // Exports Table
              <div className="flex-1 overflow-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Export name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Export type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Export date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredExports.map((exportItem) => (
                      <tr key={exportItem.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="checkbox" className="rounded border-gray-300" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {exportItem.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {exportItem.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {exportItem.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              exportItem.status === 'ready' ? 'bg-green-500' : 'bg-yellow-500'
                            }`}></div>
                            <span className="text-sm text-gray-900">{exportItem.status}</span>
                            {exportItem.progress && (
                              <div className="ml-2 flex space-x-1">
                                <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
                                <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            )}
                          </div>
                          {exportItem.expiresIn && (
                            <div className="text-xs text-gray-500 mt-1">
                              Expires in {exportItem.expiresIn}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {exportItem.status === 'ready' && (
                            <button
                              onClick={() => handleDownload(exportItem)}
                              className="text-blue-600 hover:text-blue-900 font-medium"
                            >
                              Download
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <MMMExportModal
        isOpen={showMMMModal}
        onClose={() => setShowMMMModal(false)}
        onExport={handleMMMExport}
      />

      <AudienceNetworkModal
        isOpen={showAudienceModal}
        onClose={() => setShowAudienceModal(false)}
        onExport={handleAudienceExport}
      />
    </div>
  );
}
