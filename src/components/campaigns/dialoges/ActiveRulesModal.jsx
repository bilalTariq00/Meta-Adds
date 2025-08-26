"use client";
import { X, ExternalLink } from "lucide-react";

export default function ActiveRulesModal({ isOpen, onClose, onManageRules }) {
  if (!isOpen) return null;

  const activeRules = [
    {
      name: "newww2",
      action: "Turn off campaign",
      condition: "If No condition",
    },
    {
      name: "new",
      action: "Turn off ad set",
      condition: "If No condition",
    },
  ];

  return (
    <div className="text-xs fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
          <h2 className="text-sm  font-semibold text-gray-900">
            Active automated rules
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-6">
            These automated rules apply to the campaign that you selected.
          </p>

          {/* Rules Table */}
          <div className="border-b border-gray-200 rounded-lg overflow-hidden ">
            {/* Header */}
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm font-medium text-gray-900">
                  Automated rule name
                </div>
                <div className="text-sm font-medium text-gray-900">
                  Action and conditions
                </div>
              </div>
            </div>

            {/* Rules */}
            {activeRules.map((rule, index) => (
              <div
                key={rule.name}
                className={`px-6 py-4 ${
                  index < activeRules.length - 1
                    ? "border-b border-gray-200"
                    : ""
                } hover:bg-gray-50`}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-blue-600 font-medium">
                      {rule.name}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-light text-gray-900">
                      {rule.action}
                    </div>
                    <div className="text-xs font-light text-gray-600">
                      {rule.condition}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Close
          </button>
          <button
            onClick={onManageRules}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            Manage automated rules
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
