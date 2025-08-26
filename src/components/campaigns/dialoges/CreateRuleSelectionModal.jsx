"use client";
import { X } from "lucide-react";

export default function CreateRuleSelectionModal({
  isOpen,
  onClose,
  onSelectCustomRule,
  onSelectAutomaticAdjustments,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-20 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-2">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3">
          <h2 className="font-bold text-gray-900">Create rule</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-3 space-y-2">
          {/* Automatic Adjustments Option */}
          <div className="flex items-start gap-4 p-4 rounded-lg">
            <img
              src="/images/campaigns/createrule.png"
              alt="rules"
              className="w-12 h-12"
            />

            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">
                Rules for recommendations are now automatic adjustments
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Manage automatic adjustments that you've already set up or
                create new ones.
              </p>
              <button
                onClick={onSelectAutomaticAdjustments}
                className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                See automatic adjustments
              </button>
            </div>
          </div>

          {/* Custom Rule Option */}
          <div className="border-2 border-blue-200 flex  justify-between rounded-lg p-4">
            <div className="flex items-start gap-2">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <img
                  src="/images/campaigns/createrule2.png"
                  alt="rules"
                  className="w-12 h-12"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-gray-900">Custom rule</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Create your own rule by choosing its conditions.
                </p>
              </div>
            </div>
            <div className="w-4 h-4 border-2 border-blue-600 rounded-full bg-blue-600 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Close
          </button>
          <button
            onClick={onSelectCustomRule}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
