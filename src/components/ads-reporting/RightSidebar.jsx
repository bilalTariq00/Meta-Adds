"use client";

import { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Lightbulb, 
  BarChart3, 
  Users, 
  TrendingUp,
  Pin,
  Archive,
  Eye
} from "lucide-react";

export default function RightSidebar({ collapsed, onToggle, activeView }) {
  const [activeSection, setActiveSection] = useState("info");

  const sections = [
    {
      id: "info",
      label: "Info",
      icon: Lightbulb,
      active: activeSection === "info"
    },
    {
      id: "overall-performance",
      label: "Overall Performance",
      icon: BarChart3,
      active: activeSection === "overall-performance"
    },
    {
      id: "engagement",
      label: "Engagement",
      icon: TrendingUp,
      active: activeSection === "engagement"
    },
    {
      id: "age-gender",
      label: "Age and Gender",
      icon: Users,
      active: activeSection === "age-gender"
    }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case "info":
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Info Section</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get insights and tips for your reports. This section provides helpful information and guidance.
            </p>
            <div className="space-y-2">
              <button className="w-full text-left p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-sm text-blue-600">Learn more about reports</span>
              </button>
              <button className="w-full text-left p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-sm text-blue-600">Report best practices</span>
              </button>
            </div>
          </div>
        );
      
      case "overall-performance":
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Overall Performance</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Total Reach</div>
                <div className="text-xl font-semibold text-gray-900">170</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Impressions</div>
                <div className="text-xl font-semibold text-gray-900">172</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Clicks</div>
                <div className="text-xl font-semibold text-gray-900">3</div>
              </div>
            </div>
          </div>
        );
      
      case "engagement":
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Engagement</h3>
            <p className="text-sm text-gray-600 mb-4">
              Find out which of your ads your audience interacted with most.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Post Reactions</span>
                <span className="text-sm font-medium text-gray-900">-</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Post Comments</span>
                <span className="text-sm font-medium text-gray-900">-</span>
              </div>
            </div>
          </div>
        );
      
      case "age-gender":
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Age and Gender</h3>
            <p className="text-sm text-gray-600 mb-4">
              See how your ads performed across each demographic segment.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">45-54 Male</span>
                <span className="text-sm font-medium text-gray-900">101</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">65+ Female</span>
                <span className="text-sm font-medium text-gray-900">69</span>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`bg-white border-l border-gray-200 transition-all duration-300 ${
      collapsed ? "w-12" : "w-80"
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <h2 className="text-lg font-semibold text-gray-900">Suggested report templates</h2>
        )}
        <button
          onClick={onToggle}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {collapsed ? (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {!collapsed && (
        <>
          {/* Introduction */}
          <div className="p-4 border-b border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              Try a report template to get started. Each one will have a selection of metrics and breakdowns which you can edit, add to or delete.{" "}
              <button className="text-blue-600 hover:underline">Learn more</button>
            </p>
          </div>

          {/* Section Navigation */}
          <div className="p-2 border-b border-gray-200">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center p-2 rounded-lg mb-1 transition-colors ${
                    section.active
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <IconComponent className="w-4 h-4 flex-shrink-0" />
                  <span className="ml-2 text-sm font-medium">{section.label}</span>
                </button>
              );
            })}
          </div>

          {/* Section Content */}
          <div className="flex-1 overflow-y-auto">
            {renderSectionContent()}
          </div>

          {/* Pin and Archive Actions */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <button className="flex-1 flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Pin className="w-4 h-4 text-gray-600 mr-2" />
                <span className="text-sm text-gray-700">Pin</span>
              </button>
              <button className="flex-1 flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Archive className="w-4 h-4 text-gray-600 mr-2" />
                <span className="text-sm text-gray-700">Archive</span>
              </button>
            </div>
            <button className="w-full mt-2 flex items-center justify-center p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Eye className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">View reports</span>
            </button>
          </div>
        </>
      )}

      {/* Collapsed State Icons */}
      {collapsed && (
        <div className="p-2 space-y-2">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center justify-center p-2 rounded-lg transition-colors ${
                  section.active
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                title={section.label}
              >
                <IconComponent className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
