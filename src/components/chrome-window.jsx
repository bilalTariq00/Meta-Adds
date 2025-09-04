"use client";

import { useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import TabSection from "./tab-section";
import SearchBar from "./search-bar";
import VerticalMenu from "./vertical-menu";
import ChromeContent from "./chrome-content";
import AppLayout from "@/layouts/AppLayout";

// Import all page components
import AccountOverview from "@/pages/AccountOverview";
import Campaigns from "@/pages/Campaigns";
import AdsReporting from "@/pages/AdsReporting";
import DetailedReport from "@/pages/DetailedReport";
import Audiences from "@/pages/Audiences";
import AdvertisingSettings from "@/pages/AdvertisingSettings";
import BillingPayments from "@/pages/BillingPayments";
import EventsManager from "@/pages/EventsManager";

import {
  Minus,
  Square,
  X,
  Copy,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  MoreVertical,
  Puzzle,
  UserCircle,
  FlaskConical,
  Pencil,
  BlocksIcon,
} from "lucide-react";
import TitleBar from "./TitleBar";
import { Avatar, AvatarFallback } from "./ui/avatar";

export default function ChromeWindow({ onClose, onMinimize }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [tabs, setTabs] = useState([
    {
      id: "tab-home",
      title: "New Tab",
      type: "google",
      content: "Welcome to your new tab!",
    },
    {
      id: "tab-meta",
      title: "Meta Ads Manager",
      type: "meta-ads",
      content: "Meta advertising platform",
    },
  ]);
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  // Window controls
  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  // Tab controls
  const addTab = useCallback(() => {
    const newTabId = `tab-${Date.now()}`;
    const newTab = {
      id: newTabId,
      title: `New Tab ${tabs.length + 1}`,
      type: "text",
      content: `Content for New Tab ${tabs.length + 1}`,
    };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setActiveTabId(newTabId);
  }, [tabs.length]);

  const removeTab = useCallback(
    (idToRemove) => {
      if (tabs.length === 1) {
        alert("Cannot close the last tab!");
        return;
      }
      const tabIndexToRemove = tabs.findIndex((tab) => tab.id === idToRemove);
      const newTabs = tabs.filter((tab) => tab.id !== idToRemove);
      setTabs(newTabs);

      if (activeTabId === idToRemove) {
        const newActiveIndex = Math.max(0, tabIndexToRemove - 1);
        setActiveTabId(newTabs[newActiveIndex].id);
      }
    },
    [tabs, activeTabId]
  );

  const handleTabClick = useCallback((id) => {
    setActiveTabId(id);
  }, []);

  const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0];

  return (
    <div
      className={`fixed bg-white shadow-lg flex flex-col border border-gray-200 transition-all duration-200 ease-in-out z-2 ${
        isMaximized
          ? "top-0 left-0 right-0 bottom-12 rounded-none"
          : "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] rounded-lg"
      }`}
      style={{ 
        minWidth: "800px", 
        minHeight: "600px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Row 1: Tabs + Window Controls */}
      <TitleBar
        isMaximized={isMaximized}
        onMinimize={onMinimize}
        handleMaximize={handleMaximize}
        onClose={onClose}
        tabs={tabs}
        activeTabId={activeTabId}
        handleTabClick={handleTabClick}
        addTab={addTab}
        removeTab={removeTab}
      />

      {/* Row 2: Navigation Bar */}
      <div className="flex items-center px-3 py-2 gap-2 border-b border-gray-100 bg-white">
        <div className="flex gap-1">
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={16} className="text-gray-700" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowRight size={16} className="text-gray-700" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <RotateCw size={16} className="text-gray-700" />
          </button>
        </div>

        <SearchBar />

        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <Avatar className="w-6 h-6 bg-blue-500">
              <AvatarFallback className="text-white text-xs">
                H
              </AvatarFallback>
            </Avatar>
          </button>
          <button
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors relative"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreVertical size={16} className="text-gray-700" />
            {showMenu && <VerticalMenu onClose={() => setShowMenu(false)} />}
          </button>
        </div>
      </div>

      {/* Row 4: Page Content */}
      <div
        className={`flex-1 overflow-auto relative ${
          !isMaximized ? "rounded-b-xl" : ""
        }`}
      >
        {/* Handle routing here based on active tab */}
        {activeTab.title === "Meta Ads Manager" ||
        activeTab.type === "meta-ads" ? (
          <div className="h-full w-full">
            <Routes>
              <Route path="/*" element={<AppLayout />}>
                <Route index element={<AccountOverview />} />
                <Route path="account-overview" element={<AccountOverview />} />
                <Route path="campaigns" element={<Campaigns />} />
                <Route path="ads-reporting" element={<AdsReporting />} />
                <Route path="detailed-report" element={<DetailedReport />} />
                <Route path="audiences" element={<Audiences />} />
                <Route
                  path="advertising-settings"
                  element={<AdvertisingSettings />}
                />
                <Route path="billing-payments" element={<BillingPayments />} />
                <Route path="events-manager" element={<EventsManager />} />
              </Route>
            </Routes>
          </div>
        ) : (
          <ChromeContent activeTab={activeTab} />
        )}
      </div>
    </div>
  );
}
