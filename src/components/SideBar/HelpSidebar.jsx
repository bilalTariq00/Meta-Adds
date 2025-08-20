"use client";

import React from "react";
import {
  X,
  Search,
  FileText,
  Settings,
  BookOpen,
  Shield,
  ChevronDown,
  Clock,
  Edit,
  BarChart,
  MailQuestionMark,
  MessageCircleQuestion,
} from "lucide-react";

const HelpSidebar = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-y-0 right-0 w-96 bg-gray-100 border-l border-gray-200 shadow-xl z-[9999] max-h-screen overflow-y-auto flex flex-row">
      <div className="w-11 bg-gray-700 flex flex-col items-center text-white p-4 sticky top-0">
        <BarChart size={16} className="mb-4" />

        <Edit size={16} className="mb-4" />
        <Clock size={16} className="mb-4" />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="p-4 ">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Help</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-2">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 "
              />
              <input
                type="text"
                placeholder="Search help articles"
                className="w-full pl-10 bg-white pr-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm text-[#1C2B3399] mb-3">
              Pick a topic to see related articles
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Meta pixel",
                "ad pending review",
                "account error",
                "billing",
                "payment",
              ].map((topic, index) => (
                <button
                  key={index}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-sm hover:bg-gray-200 transition-colors text-sm border border-gray-300"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 bg-white p-3 rounded-sm">
            <h4 className="text-sm font-bold text-gray-900 ">
              Recommended articles
            </h4>
            <p className="text-xs text-gray-500 mb-3">
              Explore suggested articles on popular topics.
            </p>
            <div className="space-y-3">
              {[
                "Fix a disabled ad account due to failed payment issues on Meta",
                "Troubleshoot a disabled or restricted account",
                "About advertising restrictions",
              ].map((article, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FileText
                    size={16}
                    className="text-gray-400 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-sm text-gray-700">{article}</span>
                </div>
              ))}
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 mt-3">
              View more articles
              <ChevronDown size={16} />
            </button>
          </div>
          <button className="flex mb-4 flex-row justify-center items-center border border-gray-300 text-sm text-gray-700 gap-2 w-full p-2">
            <MessageCircleQuestion size={16} /> Contact Support
          </button>
          <div className="mb-6 bg-white p-3 rounded-sm">
            <h4 className="text-sm font-bold text-gray-900 mb-3">
              Additional resources
            </h4>
            <p className="text-xs text-gray-500 mb-3">
              Tools and resources to improve your advertising.
            </p>
            <div className="space-y-3">
              {[
                {
                  icon: <Settings size={16} />,
                  title: "Meta ads guide",
                  desc: "Find creative specs and technical requirements for ads.",
                },
                {
                  icon: <BookOpen size={16} />,
                  title: "Blueprint e-learning",
                  desc: "Take free online courses to learn how to improve advertising.",
                },
                {
                  icon: <Shield size={16} />,
                  title: "Advertising Policies",
                  desc: "Find policies and guidance on what types of ad content is allowed.",
                },
              ].map((resource, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="text-gray-400 mt-0.5 flex-shrink-0">
                    {resource.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {resource.title}
                    </div>
                    <div className="text-xs text-gray-600">{resource.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSidebar;
