"use client";

import { useState } from "react";
import { X, ChevronDown, Info } from "lucide-react";

export default function CreateCustomRuleModal({ isOpen, onClose, onSave }) {
  const [ruleName, setRuleName] = useState("");
  const [applyTo, setApplyTo] = useState("1 selected campaign");
  const [action, setAction] = useState("Select an option");
  const [showApplyToDropdown, setShowApplyToDropdown] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [showConditionsDropdown, setShowConditionsDropdown] = useState(false);
  const [showComparisonDropdown, setShowComparisonDropdown] = useState(false);
  const [conditionMetric, setConditionMetric] = useState("Cost per result");
  const [conditionComparison, setConditionComparison] =
    useState("is greater than");
  const [conditionValue, setConditionValue] = useState("");
  const [timeRange, setTimeRange] = useState("37 months (maximum)");
  const [schedule, setSchedule] = useState("continuously");

  if (!isOpen) return null;

  const applyToOptions = [
    "1 selected campaign",
    "Active ad sets in 1 selected campaign",
    "Active ads in 1 selected campaign",
    "All active campaigns",
    "All active ad sets",
    "All active ads",
  ];

  const actionOptions = [
    "Turn off campaign",
    "Turn on campaign",
    "Send notification only",
    "Increase daily budget by",
    "Decrease daily budget by",
    "Increase lifetime budget by",
    "Decrease lifetime budget by",
  ];

  const conditionMetrics = [
    "Spent",
    "Lifetime Spent",
    "Frequency",
    "Results",
    "Cost per result",
    "Mobile app install",
    "Cost per Mobile App Install",
  ];

  const comparisonOptions = [
    "is greater than",
    "is smaller than",
    "is between",
    "is not between",
  ];

  const handleSave = () => {
    const ruleData = {
      name: ruleName,
      applyTo,
      action,
      conditions: {
        metric: conditionMetric,
        comparison: conditionComparison,
        value: conditionValue,
      },
      timeRange,
      schedule,
    };
    onSave(ruleData);
  };

  return (
    <div className="fixed inset-0  bg-opacity-20 flex items-center justify-center z-[9999] text-xs">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 max-h-[60vh] overflow-y-scroll">
        {/* Header */}
        <div className="sticky top-0 bg-white z-50 flex items-center justify-between px-6 py-3 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-900">
            Create a custom rule
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <p className="text-sm text-gray-600">
            Automatically update the settings of selected campaigns, ad sets or
            ads by creating a rule.{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Learn more
            </a>
          </p>

          {/* Rule Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Rule name
            </label>
            <input
              type="text"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              placeholder="Rule name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Apply Rule To and Action */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Apply rule to
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowApplyToDropdown(!showApplyToDropdown)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span className="text-blue-600">{applyTo}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {showApplyToDropdown && (
                  <div className="absolute z-[10000] mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                    {applyToOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setApplyTo(option);
                          setShowApplyToDropdown(false);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            option === applyTo
                              ? "border-blue-600 bg-blue-600"
                              : "border-gray-300"
                          }`}
                        >
                          {option === applyTo && (
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                          )}
                        </div>
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Action
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowActionDropdown(!showActionDropdown)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span
                    className={
                      action === "Select an option"
                        ? "text-gray-400"
                        : "text-gray-900"
                    }
                  >
                    {action}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {showActionDropdown && (
                  <div className="absolute z-[10000] mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {actionOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setAction(option);
                          setShowActionDropdown(false);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            option === action
                              ? "border-blue-600 bg-blue-600"
                              : "border-gray-300"
                          }`}
                        >
                          {option === action && (
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                          )}
                        </div>
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-800">
                Your rule will apply to campaigns that are active at the time
                the rule runs.
              </p>
            </div>
          </div>

          {/* Conditions */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <label className="text-sm font-medium text-gray-900">
                Conditions
              </label>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600 mb-3">
              ALL of the following match
            </p>

            <div className="flex items-center bg-gray-300/70 p-2 gap-2 mb-4">
              <div className="relative">
                <button
                  onClick={() =>
                    setShowConditionsDropdown(!showConditionsDropdown)
                  }
                  className="px-3 py-2 border border-gray-300 bg-white rounded-md text-left flex items-center justify-between min-w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span>{conditionMetric}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 ml-2" />
                </button>
                {showConditionsDropdown && (
                  <div className="absolute z-[10000] mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    <div className="p-2">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div className="px-2 py-1 text-xs font-medium text-gray-500 border-b">
                      Most common
                    </div>
                    {conditionMetrics.map((metric) => (
                      <button
                        key={metric}
                        onClick={() => {
                          setConditionMetric(metric);
                          setShowConditionsDropdown(false);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm flex items-center gap-2"
                      >
                        <Info className="w-3 h-3 text-gray-400" />
                        {metric}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() =>
                    setShowComparisonDropdown(!showComparisonDropdown)
                  }
                  className="px-3 py-2 border bg-white border-gray-300 rounded-md text-left flex items-center justify-between min-w-[130px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span>{conditionComparison}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 ml-2" />
                </button>
                {showComparisonDropdown && (
                  <div className="absolute z-[10000] mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                    {comparisonOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setConditionComparison(option);
                          setShowComparisonDropdown(false);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm flex items-center gap-2"
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            option === conditionComparison
                              ? "border-blue-600 bg-blue-600"
                              : "border-gray-300"
                          }`}
                        >
                          {option === conditionComparison && (
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                          )}
                        </div>
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">$</span>
                <input
                  type="text"
                  value={conditionValue}
                  onChange={(e) => setConditionValue(e.target.value)}
                  className="px-3 py-2 border border-gray-300 bg-white rounded-md w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button className="px-2 rounded-md text-gray-400 bg-white hover:text-gray-600">
                <span className="text-lg">⋯</span>
              </button>

              <button className="px-3 py-2 bg-green-100 text-green-700 rounded-md text-sm font-medium hover:bg-green-200 transition-colors">
                Add
              </button>

              <button className="p-2 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Time Range */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium text-gray-900">
                Time range
              </label>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>37 months (maximum)</option>
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Yesterday</option>
            </select>
          </div>

          {/* Schedule */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <label className="text-sm font-medium text-gray-900">
                Schedule
              </label>
              <Info className="w-4 h-4 text-gray-400" />
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3">
                <input
                  type="radio"
                  name="schedule"
                  value="continuously"
                  checked={schedule === "continuously"}
                  onChange={(e) => setSchedule(e.target.value)}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium text-gray-900">Continuously</div>
                  <div className="text-sm text-gray-600">
                    Rule runs as often as possible (usually every 30-60
                    minutes).
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="radio"
                  name="schedule"
                  value="daily"
                  checked={schedule === "daily"}
                  onChange={(e) => setSchedule(e.target.value)}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium text-gray-900">Daily</div>
                  <div className="text-sm text-gray-600">
                    between 12:00 and 01:00 Karachi Time
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="radio"
                  name="schedule"
                  value="custom"
                  checked={schedule === "custom"}
                  onChange={(e) => setSchedule(e.target.value)}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium text-gray-900">Custom</div>
                  <div className="text-sm text-gray-600">
                    Adjust rule schedule to run on specific days and specific
                    times of the day. If the start and end time are the same,
                    then the rule will run once per day within 30-60 minutes
                    after the set time. All times are in{" "}
                    <strong>Karachi Time</strong>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white flex items-center justify-between px-6 py-3 border-t border-gray-200">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            Delete rule
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
