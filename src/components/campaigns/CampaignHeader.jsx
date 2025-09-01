"use client";

import { useState } from "react";
import { 
  ChevronRight, 
  Folder, 
  Grid3X3, 
  FileText,
  MoreHorizontal,
  Settings,
  Clock,
  BarChart3
} from "lucide-react";

export default function CampaignHeader({ onOpenSidebar }) {
  const [showUnpublishedEdits, setShowUnpublishedEdits] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      {/* Campaign Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
        <button className="p-1 hover:bg-gray-100 rounded">
          <Settings className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-blue-600" />
          <span className="text-blue-600 font-medium">DYT - Home Improvement US Campaign</span>
          <ChevronRight className="w-4 h-4" />
          <Grid3X3 className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600">1 Ad set</span>
          <ChevronRight className="w-4 h-4" />
          <FileText className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600">1 Ad</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-colors">
            <BarChart3 className="w-4 h-4" />
            Performance
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-colors">
            <Clock className="w-4 h-4" />
            Actions
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Campaign Structure Sidebar Trigger */}
          <button
            onClick={onOpenSidebar}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            Campaign Structure
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Unpublished edits</span>
            <button
              onClick={() => setShowUnpublishedEdits(!showUnpublishedEdits)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                showUnpublishedEdits ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showUnpublishedEdits ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span>{showUnpublishedEdits ? 'On' : 'Off'}</span>
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
