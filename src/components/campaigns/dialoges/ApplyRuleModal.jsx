"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function ApplyRuleModal({
  isOpen,
  onClose,
  onApply,
  onEditRule,
}) {
  const [selectedRule, setSelectedRule] = useState("newww2");

  if (!isOpen) return null;

  const rules = [
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

  const handleApply = () => {
    onApply(selectedRule);
    onEditRule(selectedRule);
  };

  return (
    <div className="fixed text-xs inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3">
          <h2 className="text-lg font-semibold text-gray-900">Apply rule</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6">
          <p className="text-sm text-gray-600 mb-6">
            Here you can choose one of the following rules and apply it to your
            selected 1 campaign. To create your own rule, you can visit{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Automated rules
            </a>
            .
          </p>

          {/* Rules Table */}
          <div className=" ">
            {/* Header */}
            <div className=" px-6 py-3 border-b border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm font-medium text-gray-900">
                  Rule name
                </div>
                <div className="text-sm font-medium text-gray-900">
                  Action & condition
                </div>
              </div>
            </div>

            {/* Rules */}
            {rules.map((rule) => (
              <div
                key={rule.name}
                className={`px-6 py-4 border-b border-gray-200 last:border-b-0 ${
                  selectedRule === rule.name ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="grid grid-cols-2 gap-4 items-center">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="selectedRule"
                      value={rule.name}
                      checked={selectedRule === rule.name}
                      onChange={(e) => setSelectedRule(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
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
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
