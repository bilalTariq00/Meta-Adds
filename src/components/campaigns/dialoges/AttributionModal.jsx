"use client";

import { X, ChevronDown, ChevronUp } from "lucide-react";

export default function AttributionModal({
  show,
  onClose,
  attributionSettings,
  handleAttributionChange,
  skAdNetworkSettings,
  handleSKAdNetworkChange,
  isExpanded,
  toggleExpanded,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-xl font-semibold">
              Compare attribution settings
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Compare when and how people take action after engaging with your
              ads. Selections in this tool are for reporting only and do not
              change ad optimisation.
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-semibold mb-4">Standard attribution</h3>
            <div className="space-y-3">
              {[
                { key: "1-day-click", label: "1-day click" },
                { key: "7-day-click", label: "7-day click" },
                { key: "28-day-click", label: "28-day click" },
                { key: "1-day-view", label: "1-day view" },
                {
                  key: "1-day-engaged",
                  label: "1-day engaged-view",
                  note: "Video ads only",
                },
              ].map((item) => (
                <div key={item.key} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={attributionSettings[item.key]}
                    onChange={() => handleAttributionChange(item.key)}
                    className="mt-1"
                  />
                  <div>
                    <div>{item.label}</div>
                    {item.note && (
                      <div className="text-xs text-gray-500">{item.note}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-300" />

          <div>
            <div
              className={`${
                isExpanded ? "bg-blue-100" : "bg-white"
              } rounded-lg py-1 px-2 cursor-pointer transition-all duration-200 hover:bg-opacity-80`}
              onClick={toggleExpanded}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-md text-gray-900">
                    Apple SKAdNetwork
                  </h3>
                  <p className="text-sm text-gray-600">App ads only</p>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </div>

              {isExpanded && (
                <div className="mt-4 space-y-4 bg-white p-2 rounded-md">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={skAdNetworkSettings.viewFromSKAdNetwork}
                      onChange={() =>
                        handleSKAdNetworkChange("viewFromSKAdNetwork")
                      }
                      onClick={(e) => e.stopPropagation()}
                      className="w-5 h-5 border border-gray-400 rounded mt-1"
                    />
                    <div>
                      <h4 className="font-medium text-base mb-1 text-gray-900">
                        View from SKAdNetwork
                      </h4>
                      <p className="text-sm text-gray-700">
                        Attribution occurs when someone views an ad and installs
                        the advertised app within 24 hours.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={skAdNetworkSettings.clickFromSKAdNetwork}
                      onChange={() =>
                        handleSKAdNetworkChange("clickFromSKAdNetwork")
                      }
                      onClick={(e) => e.stopPropagation()}
                      className="w-6 h-6 border border-gray-400 rounded mt-1"
                    />
                    <div>
                      <h4 className="font-medium text-base mb-1 text-gray-900">
                        Click from SKAdNetwork
                      </h4>
                      <p className="text-sm text-gray-700">
                        Attribution occurs when someone clicks an ad that goes
                        to an app's product page and installs the app within 30
                        days.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Advanced option</h3>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={attributionSettings.incremental}
                onChange={() => handleAttributionChange("incremental")}
              />
              <span>Incremental attribution</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-300">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
