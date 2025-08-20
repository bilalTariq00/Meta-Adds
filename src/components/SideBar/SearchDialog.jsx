"use client";

import React from "react";
import {
  Search,
  Calendar,
  Home,
  Users,
  BarChart3,
  FileText,
  MessageSquare,
} from "lucide-react";

const SearchDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const recentItems = [
    {
      icon: <Calendar size={20} />,
      label: "Events Manager",
      type: "Events Manager",
    },
    { icon: <Home size={20} />, label: "Ads Manager", type: "Ads Manager" },
    { icon: <Users size={20} />, label: "Audiences", type: "Audiences" },
    {
      icon: <BarChart3 size={20} />,
      label: "Ads Reporting",
      type: "Ads Reporting",
    },
    { icon: <FileText size={20} />, label: "Content", type: "Content" },
    { icon: <MessageSquare size={20} />, label: "Inbox", type: "Inbox" },
  ];

  return (
    <div className="absolute inset-0 z-[9999] flex items-center justify-center max-h-screen overflow-y-auto">
      <div className="search-dialog bg-white rounded-lg shadow-xl w-full max-w-xl max-h-96 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Find ad accounts, Pages, people, tools and help articles"
              className="w-full pl-10 pr-4 py-2 border border-white rounded-lg selection:ring-0 focus:ring-0 focus:border-transparent"
              autoFocus
            />
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Recently viewed
          </h4>
          <div className="space-y-2">
            {recentItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <div className="text-gray-400">{item.icon}</div>
                <span className="text-sm text-gray-700">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchDialog;
