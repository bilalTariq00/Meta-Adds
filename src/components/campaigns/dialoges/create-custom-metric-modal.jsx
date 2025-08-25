"use client";

import { useState } from "react";
import { X, Plus, ChevronDown } from "lucide-react";

export default function CreateCustomMetricModal({ open, onClose, onSave }) {
  const [selectedMetric, setSelectedMetric] = useState("");
  const [formula, setFormula] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [format, setFormat] = useState("Numeric (123)");
  const [access, setAccess] = useState("Only you");
  const [showMetricDropdown, setShowMetricDropdown] = useState(false);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [showAccessDropdown, setShowAccessDropdown] = useState(false);

  const metrics = [
    "Impressions",
    "Clicks",
    "Conversions",
    "Cost per result",
    "Reach",
    "Frequency",
  ];

  const operators = ["+", "-", "×", "÷", "(", ")"];

  const popularFormulas = [
    "Impressions to 3-second video plays rate",
    "Impressions to post engagements rate",
    "Link clicks to landing page views rate",
    "Video plays to link clicks rate",
    "Link clicks to purchases rate",
  ];

  const formatOptions = [
    "Numeric (123)",
    "Percentage (%)",
    "Currency ($)",
    "Decimal (123.45)",
  ];

  const accessOptions = [
    "Only you",
    "Everyone with access to this business portfolio",
  ];

  const handleOperatorClick = (operator) => {
    setFormula((prev) => prev + operator);
  };

  const handleMetricSelect = (metric) => {
    setSelectedMetric(metric);
    setFormula((prev) => prev + metric);
    setShowMetricDropdown(false);
  };

  const handleSave = () => {
    if (name.trim()) {
      onSave({
        name: name.trim(),
        description: description.trim(),
        formula: formula.trim(),
      });
      // Reset form
      setName("");
      setDescription("");
      setFormula("");
      setSelectedMetric("");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">Create custom metric</h2>
            <p className="text-sm text-gray-600 mt-1">
              Create custom metrics to get more detailed information about
              campaign performance.{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Learn more about creating custom metrics
              </a>
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex">
          {/* Left Panel */}
          <div className="flex-1 p-6 space-y-6">
            {/* Metric Selection and Formula Builder */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="relative">
                  <button
                    onClick={() => setShowMetricDropdown(!showMetricDropdown)}
                    className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Select metric
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {showMetricDropdown && (
                    <div className="absolute top-full mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                      {metrics.map((metric) => (
                        <button
                          key={metric}
                          onClick={() => handleMetricSelect(metric)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                        >
                          {metric}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {operators.map((op) => (
                  <button
                    key={op}
                    onClick={() => handleOperatorClick(op)}
                    className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 min-w-[40px]"
                  >
                    {op}
                  </button>
                ))}
              </div>

              <div>
                <textarea
                  value={formula}
                  onChange={(e) => setFormula(e.target.value)}
                  placeholder="To combine metrics into a formula, either select metrics from the drop-down menu above or start typing here."
                  className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name this metric"
                  maxLength={100}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="absolute right-3 top-2 text-xs text-gray-500">
                  {name.length}/100
                </span>
              </div>
            </div>

            {/* Format */}
            <div>
              <label className="block text-sm font-medium mb-2">Format</label>
              <div className="relative">
                <button
                  onClick={() => setShowFormatDropdown(!showFormatDropdown)}
                  className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  {format}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showFormatDropdown && (
                  <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {formatOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setFormat(option);
                          setShowFormatDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Description <span className="text-gray-500">• Optional</span>
              </label>
              <div className="relative">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe this metric"
                  maxLength={350}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="absolute bottom-2 right-3 text-xs text-gray-500">
                  {description.length}/350
                </span>
              </div>
            </div>

            {/* Access */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Who can access this?
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowAccessDropdown(!showAccessDropdown)}
                  className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  {access}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showAccessDropdown && (
                  <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {accessOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setAccess(option);
                          setShowAccessDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-md">
              <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">i</span>
              </div>
              <p className="text-sm text-gray-700">
                When you build a custom metric, Meta only performs basic
                mathematical calculations based on your formula to deliver your
                result, and does not otherwise add to or modify the metric.
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-80 border-l p-6 bg-gray-50">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-w4UWnwr2FpcRwX37wxhxqonymcdHqI.png"
              alt="Custom metrics illustration"
              className="w-full h-32 object-cover rounded-lg mb-4"
            />

            <h3 className="font-semibold text-lg mb-2">
              Try popular custom formulas
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Apply custom formulas that other businesses frequently create. You
              can only add one custom formula at a time.
            </p>

            <div className="space-y-2">
              {popularFormulas.map((formula) => (
                <button
                  key={formula}
                  onClick={() => setFormula(formula)}
                  className="w-full text-left p-3 border border-gray-300 rounded-md hover:bg-white text-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4 text-gray-400" />
                  {formula}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 bg-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleSave();
              onClose();
            }}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 bg-white"
          >
            Create and add another
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Metric
          </button>
        </div>
      </div>
    </div>
  );
}
