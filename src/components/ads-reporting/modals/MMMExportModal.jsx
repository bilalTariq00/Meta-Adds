"use client";

import { useState, useRef, useEffect } from "react";
import { X, Check, Calendar, Search } from "lucide-react";

export default function MMMExportModal({ isOpen, onClose, onExport }) {
  const [activeTab, setActiveTab] = useState("setup");
  const [fileName, setFileName] = useState("MMM_Business1");
  const [dateRange, setDateRange] = useState("1 Jan 2025 - 4 Sep 2025");
  const [countries, setCountries] = useState("");
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const modalRef = useRef(null);

  const accounts = [
    { id: "1263790274765251", name: "Adkin Digital" }
  ];

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.id.includes(searchQuery)
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  const handleAccountToggle = (accountId) => {
    setSelectedAccounts(prev =>
      prev.includes(accountId)
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  };

  const handleExport = () => {
    const exportData = {
      type: "mmm",
      fileName,
      dateRange,
      countries,
      selectedAccounts,
      timestamp: new Date().toISOString()
    };
    onExport(exportData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[600px] flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-gray-50 p-6 border-r border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-6">Export MMM data</h3>
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab("setup")}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-lg ${
                activeTab === "setup"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                activeTab === "setup" ? "bg-blue-500" : "border-2 border-gray-300"
              }`}>
                {activeTab === "setup" && <Check className="w-4 h-4 text-white" />}
              </div>
              Setup
            </button>
            <button
              onClick={() => setActiveTab("accounts")}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-lg ${
                activeTab === "accounts"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                activeTab === "accounts" ? "bg-blue-500" : "border-2 border-gray-300"
              }`}>
                {activeTab === "accounts" && <Check className="w-4 h-4 text-white" />}
              </div>
              Accounts
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 p-6 flex flex-col">
          {activeTab === "setup" ? (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Marketing mix modelling (MMM) data export
                </h2>
                <p className="text-gray-600">
                  You can include your exported data in a marketing mix modelling analysis.{" "}
                  <a href="#" className="text-blue-600 hover:underline">Online course</a>
                </p>
              </div>

              <div className="space-y-6 flex-1">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    File name
                  </label>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date range included in first export
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Countries • Optional
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Add country filters"
                      value={countries}
                      onChange={(e) => setCountries(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Select accounts
                </h2>
                <p className="text-gray-600">
                  Ad accounts ({selectedAccounts.length} of {accounts.length} selected)
                </p>
              </div>

              <div className="space-y-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by account name, ID or multiple IDs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  {filteredAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                      onClick={() => handleAccountToggle(account.id)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedAccounts.includes(account.id)}
                        onChange={() => handleAccountToggle(account.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">{account.name}</div>
                        <div className="text-sm text-gray-500">ID: {account.id}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Footer */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            {activeTab === "setup" ? (
              <button
                onClick={() => setActiveTab("accounts")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleExport}
                disabled={selectedAccounts.length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Export data
              </button>
            )}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
