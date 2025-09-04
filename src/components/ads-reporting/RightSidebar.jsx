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
  MoreHorizontal,
  Pin,
  Archive,
  ChevronDown,
  ChevronUp,
  Sidebar,
  SidebarClose
} from "lucide-react";

export default function RightSidebar({ collapsed, onToggle, activeView }) {
  const [showDropdown, setShowDropdown] = useState(null);
  const [pinnedCards, setPinnedCards] = useState([]);
  const [archivedCards, setArchivedCards] = useState([]);
  const [archivedExpanded, setArchivedExpanded] = useState(false);

  const reportTemplates = [
    {
      id: "engagement",
      title: "Engagement",
      description: "Find out which of your ads your audience interacted with most.",
      icon: (
        <div className="w-12 h-12 grid grid-cols-2 gap-1">
          <div className="bg-gray-200 rounded flex items-center justify-center">
            <Users className="w-4 h-4 text-gray-600" />
          </div>
          <div className="bg-blue-500 rounded flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div className="bg-gray-200 rounded flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-gray-600" />
          </div>
          <div className="bg-gray-200 rounded flex items-center justify-center">
            <FileText className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      )
    },
    {
      id: "age-gender",
      title: "Age and gender",
      description: "See how your ads performed across each demographic segment.",
      icon: (
        <div className="w-12 h-12 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-6 relative">
              <div className="absolute top-0 left-0 w-2 h-2 bg-teal-400 rounded-full"></div>
              <div className="absolute top-1 left-3 w-2 h-2 bg-teal-400 rounded-full"></div>
              <div className="absolute top-2 left-6 w-2 h-2 bg-teal-400 rounded-full"></div>
              <div className="absolute top-0 left-0 w-8 h-0.5 bg-teal-400"></div>
              <div className="absolute top-1 left-3 w-5 h-0.5 bg-teal-400"></div>
              <div className="absolute top-2 left-6 w-2 h-0.5 bg-teal-400"></div>
            </div>
          </div>
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-gray-300 rounded-sm"></div>
          <div className="absolute -bottom-1 -right-1 w-4 h-2 bg-gray-300 rounded-sm"></div>
        </div>
      )
    },
    {
      id: "overall-performance",
      title: "Overall performance",
      description: "Get an overview of how your ads are doing by looking at commonly used performance metrics.",
      icon: (
        <div className="w-12 h-12 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-6 relative">
              <div className="absolute top-0 left-0 w-2 h-2 bg-teal-400 rounded-full"></div>
              <div className="absolute top-1 left-3 w-2 h-2 bg-teal-400 rounded-full"></div>
              <div className="absolute top-2 left-6 w-2 h-2 bg-teal-400 rounded-full"></div>
              <div className="absolute top-0 left-0 w-8 h-0.5 bg-teal-400"></div>
              <div className="absolute top-1 left-3 w-5 h-0.5 bg-teal-400"></div>
              <div className="absolute top-2 left-6 w-2 h-0.5 bg-teal-400"></div>
            </div>
          </div>
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-gray-300 rounded-sm"></div>
          <div className="absolute -bottom-1 -right-1 w-4 h-2 bg-gray-300 rounded-sm"></div>
        </div>
      )
    }
  ];

  const handlePin = (cardId) => {
    // Remove from archived if it's there
    const isArchived = archivedCards.find(a => a.id === cardId);
    if (isArchived) {
      setArchivedCards(archivedCards.filter(card => card.id !== cardId));
    }
    
    // Add to pinned if not already pinned
    const card = reportTemplates.find(t => t.id === cardId);
    if (card && !pinnedCards.find(p => p.id === cardId)) {
      setPinnedCards([...pinnedCards, card]);
    }
    setShowDropdown(null);
  };

  const handleArchive = (cardId) => {
    // Remove from pinned if it's there
    const isPinned = pinnedCards.find(p => p.id === cardId);
    if (isPinned) {
      setPinnedCards(pinnedCards.filter(card => card.id !== cardId));
    }
    
    // Add to archived if not already archived
    const card = reportTemplates.find(t => t.id === cardId);
    if (card && !archivedCards.find(a => a.id === cardId)) {
      setArchivedCards([...archivedCards, card]);
    }
    setShowDropdown(null);
  };

  const handleRestore = (cardId) => {
    // Remove from archived
    const archivedCard = archivedCards.find(card => card.id === cardId);
    if (archivedCard) {
      setArchivedCards(archivedCards.filter(card => card.id !== cardId));
    }
  };

  const handleUnpin = (cardId) => {
    setPinnedCards(pinnedCards.filter(card => card.id !== cardId));
  };

  const getVisibleCards = () => {
    const pinned = pinnedCards.map(card => ({ ...card, isPinned: true }));
    const regular = reportTemplates.filter(card => 
      !pinnedCards.find(p => p.id === card.id) && 
      !archivedCards.find(a => a.id === card.id)
    );
    return [...pinned, ...regular];
  };

  const renderCard = (template, isPinned = false) => (
    <div key={template.id} className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{template.title}</h3>
        <div className="flex items-center space-x-1">
          {isPinned && (
            <button 
              onClick={() => handleUnpin(template.id)}
              className="p-1 hover:bg-gray-100 rounded"
              title="Unpin"
            >
              <Pin className="w-4 h-4 text-gray-600" />
            </button>
          )}
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(showDropdown === template.id ? null : template.id)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-600" />
            </button>
            
            {showDropdown === template.id && (
              <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => handlePin(template.id)}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <Pin className="w-4 h-4 mr-2" />
                  Pin
                </button>
                <button
                  onClick={() => handleArchive(template.id)}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex items-start space-x-3 mb-4">
        <div className="flex-shrink-0">
          {template.icon}
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          {template.description}
        </p>
      </div>

      {/* View Report Button */}
      <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
        View Report
      </button>
    </div>
  );

  return (
    <div className={`bg-white border-l ml-4 border-gray-200 rounded-md transition-all overflow-y-auto duration-300 ease-in-out overflow-hidden ${
      collapsed ? "w-12" : "w-90"
    }`}>
      {/* Header */}
      <div className="p-4 sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-lg font-semibold text-gray-900 whitespace-nowrap">Suggested report templates</h2>
          )}
          <button
            onClick={onToggle}
            className=" rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            {collapsed ? (
              <Sidebar className="w-4 h-4 text-gray-600" />
            ) : (
              <SidebarClose className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <div className={`transition-all duration-300 ease-in-out ${
        collapsed ? "opacity-0 max-h-0 overflow-hidden" : "opacity-100 max-h-full"
      }`}>
        {/* Introduction */}
        <div className="p-4 ">
          <p className="text-sm text-gray-600">
            Try a report template to get started. Each one will have a selection of metrics and breakdowns which you can edit, add to or delete.{" "}
            <button className="text-blue-600 hover:underline">Learn more</button>
          </p>
        </div>

        {/* Report Template Cards */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {getVisibleCards().map((template) => renderCard(template, template.isPinned))}
        </div>

        {/* Archived Section */}
        {archivedCards.length > 0 && (
          <div className="border-t border-gray-200 p-2">
            <button
              onClick={() => setArchivedExpanded(!archivedExpanded)}
              className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <span>Archived ({archivedCards.length})</span>
              {archivedExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            
            {archivedExpanded && (
              <div className="mt-3 space-y-3">
                {archivedCards.map((card) => (
                  <div key={card.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-700">{card.title}</h4>
                      <button
                        onClick={() => handleRestore(card.id)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Restore
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">{card.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Collapsed State - Bulb Icon */}
      {collapsed && (
        <div className="p-1">
          <button 
            onClick={onToggle}
            className="w-full flex items-center align-middle text-center justify-center px-2 rounded-lg hover:bg-gray-100 transition-colors" 
            title="Suggested report templates"
          >
            <Lightbulb className="w-6 h-6 text-teal-500" />
          </button>
        </div>
      )}
    </div>
  );
}
