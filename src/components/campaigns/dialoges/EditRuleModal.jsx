"use client";

import { useState } from "react";
import { X, ChevronDown, Info } from "lucide-react";

export default function EditRuleModal({ isOpen, onClose, onSave, ruleData }) {
  const [ruleName, setRuleName] = useState(ruleData?.name || "newww2");
  const [applyTo, setApplyTo] = useState(
    ruleData?.applyTo || "1 selected campaign"
  );
  const [action, setAction] = useState(ruleData?.action || "Turn off campaign");
  const [conditionMetric, setConditionMetric] = useState("Cost per result");
  const [conditionComparison, setConditionComparison] =
    useState("is greater than");
  const [conditionValue, setConditionValue] = useState("");
  const [timeRange, setTimeRange] = useState("37 months (maximum)");
  const [schedule, setSchedule] = useState("continuously");

  if (!isOpen) return null;

  const handleSave = () => {
    const updatedRuleData = {
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
    onSave(updatedRuleData);
  };

  const handleDelete = () => {
    // Handle delete logic
    console.log("Delete rule");
  };

  return (
    <div className="text-xs fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[70vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-3 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-900">
            Edit rule: {ruleName}
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
          {/* Rule Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Rule name
            </label>
            <input
              type="text"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Apply Rule To and Action */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Apply rule to
              </label>
              <div className="text-blue-600 text-sm">{applyTo}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Action
              </label>
              <div className="relative">
                <button className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <span>{action}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
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

            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <button className="px-3 py-2 border border-gray-300 rounded-md text-left flex items-center justify-between min-w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <span>{conditionMetric}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 ml-2" />
                </button>
              </div>

              <div className="relative">
                <button className="px-3 py-2 border border-gray-300 rounded-md text-left flex items-center justify-between min-w-[130px] focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <span>{conditionComparison}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 ml-2" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">$</span>
                <input
                  type="text"
                  value={conditionValue}
                  onChange={(e) => setConditionValue(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button className="p-2 text-gray-400 hover:text-gray-600">
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
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
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
              Save Rule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
