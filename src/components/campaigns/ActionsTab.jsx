"use client";

import { AlertTriangle, FileText, Zap } from "lucide-react";

export default function ActionsTab() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Actions to take</h3>
          <p className="text-sm text-gray-600">
            See errors, warnings or recommendations that you can take action on.
          </p>
        </div>
        <button className="px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          All actions (0)
        </button>
      </div>

      {/* Empty State */}
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 opacity-50">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Document/Speech bubble shapes */}
            <rect
              x="35"
              y="75"
              width="30"
              height="8"
              fill="#9ca3af"
              rx="2"
            />
            <rect
              x="40"
              y="70"
              width="20"
              height="8"
              fill="#6b7280"
              rx="1"
            />
            <line
              x1="45"
              y1="70"
              x2="35"
              y2="85"
              stroke="#6b7280"
              strokeWidth="2"
            />
            <line
              x1="50"
              y1="70"
              x2="50"
              y2="85"
              stroke="#6b7280"
              strokeWidth="2"
            />
            <line
              x1="55"
              y1="70"
              x2="65"
              y2="85"
              stroke="#6b7280"
              strokeWidth="2"
            />
            
            {/* Larger document shape */}
            <rect
              x="25"
              y="35"
              width="50"
              height="8"
              fill="#d1d5db"
              rx="4"
              transform="rotate(-15 50 39)"
            />
            <rect
              x="20"
              y="32"
              width="25"
              height="6"
              fill="#e5e7eb"
              rx="3"
              transform="rotate(-15 32.5 35)"
            />
            
            {/* Lightning bolt icon */}
            <circle cx="70" cy="25" r="4" fill="#374151" />
            <circle cx="70" cy="25" r="2" fill="#1f2937" />
          </svg>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No actions to take
        </h3>
        <p className="text-gray-600 mb-4">
          There are currently no errors, warnings or recommendations for you to take action on.
        </p>
      </div>
    </div>
  );
}
