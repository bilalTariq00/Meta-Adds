"use client";

import { useState } from "react";
import { X, Table, TrendingUp, BarChart3 } from "lucide-react";

export default function ChooseLayoutModal({ isOpen, onClose, currentLayout, onLayoutSelect }) {
  const [selectedLayout, setSelectedLayout] = useState(currentLayout);

  const layouts = [
    {
      id: "pivot-table",
      title: "Pivot table",
      description: "Cut and group data to find meaningful insights.",
      icon: Table,
      selected: selectedLayout === "pivot-table"
    },
    {
      id: "trend",
      title: "Trend line chart",
      description: "Compare data over time to discover trends.",
      icon: TrendingUp,
      selected: selectedLayout === "trend"
    },
    {
      id: "bar-chart",
      title: "Bar chart",
      description: "Compare different metrics across breakdowns.",
      icon: BarChart3,
      selected: selectedLayout === "bar-chart"
    }
  ];

  const handleContinue = () => {
    onLayoutSelect(selectedLayout);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Choose a layout</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            {layouts.map((layout) => {
              const IconComponent = layout.icon;
              return (
                <div
                  key={layout.id}
                  onClick={() => setSelectedLayout(layout.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    layout.selected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${
                      layout.selected ? "bg-blue-100" : "bg-gray-100"
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        layout.selected ? "text-blue-600" : "text-gray-600"
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-lg font-medium ${
                          layout.selected ? "text-blue-900" : "text-gray-900"
                        }`}>
                          {layout.title}
                        </h3>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          layout.selected
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300"
                        }`}>
                          {layout.selected && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                      </div>
                      <p className={`text-sm mt-1 ${
                        layout.selected ? "text-blue-700" : "text-gray-600"
                      }`}>
                        {layout.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={handleContinue}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
