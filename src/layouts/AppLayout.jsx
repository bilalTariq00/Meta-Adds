"use client";

import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/Accountoverview/Sidebar";
import Header from "@/components/Accountoverview/Header";
import { useLoading } from "@/components/LoadingContext";
import LoadingModal from "@/components/LoadingModal";
import { ActivityHistorySidebar } from "@/components/activity-history-sidebar";
import { useState } from "react";
import { Clock, BarChart3, Edit3 } from "lucide-react";
import CampaignSidebar from "@/components/campaigns/CampaignSidebar";
import { CampaignSidebarProvider, useCampaignSidebar } from "@/contexts/CampaignSidebarContext";

// Sidebar controls component that uses the context
function SidebarControls() {
  const { isLoading } = useLoading();
  const { isOpen, activeTab, selectedFieldData, openSidebar, closeSidebar } = useCampaignSidebar();
  const [isActivitySidebarOpen, setIsActivitySidebarOpen] = useState(false);
  const [activityTab, setActivityTab] = useState("activity");
  const location = useLocation();

  // Check if current page is campaign page
  const isCampaignPage =
    location.pathname.includes("/campaign") ||
    location.pathname.includes("/campaigns") ||
    (location.pathname.includes("/ads") && !location.pathname.includes("/ads-reporting")) ||
    location.pathname.includes("/ad-sets");

  // Check if current page is overview page
  const isOverviewPage = location.pathname.includes("/account-overview") || location.pathname === "/";

  const handleTabClick = (tab) => {
    setActivityTab(tab);
    setIsActivitySidebarOpen(true);
  };

  return (
    <div className="h-full w-full flex bg-gradient-to-tl from-green-50 via-blue-50 to-pink-50 relative overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="pl-16 pr-4 flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <Header />

        {/* Page content */}
        <div className="flex-1 overflow-auto flex justify-center">
          <Outlet />
        </div>
        <LoadingModal isLoading={isLoading} />

        {/* Right sidebar with tabs - Only show on campaign or overview pages */}
        {(isCampaignPage || isOverviewPage) && (
          <div className="absolute right-0 top-0 bottom-0 w-10 bg-slate-700 flex flex-col items-center py-4 border-l border-slate-600 z-40">
            {/* Chart Tab - Only visible on campaign pages */}
            {isCampaignPage && (
              <div className="relative group mb-2">
                <button
                  onClick={() => openSidebar("chart")}
                  className={`px-3 text-slate-300 hover:text-white hover:bg-slate-600 rounded-lg transition-colors ${
                    activeTab === "chart" && isOpen
                      ? "bg-slate-600 text-white"
                      : ""
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                </button>

                {/* Hover tooltip */}
                <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                    Performance Charts (Ctrl+C)
                    <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Tab - Only visible on campaign pages */}
            {isCampaignPage && (
              <div className="relative group mb-2">
                <button
                  onClick={() => openSidebar("edit")}
                  className={`px-3 text-slate-300 hover:text-white hover:bg-slate-600 rounded-lg transition-colors ${
                    activeTab === "edit" && isOpen
                      ? "bg-slate-600 text-white"
                      : ""
                  }`}
                >
                  <Edit3 className="w-5 h-5" />
                </button>

                {/* Hover tooltip */}
                <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                    Edit Campaigns (Ctrl+E)
                    <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Activity History Tab - Visible on both campaign and overview pages */}
            <div className="relative group mb-2">
              <button
                onClick={() => {
                  if (isCampaignPage) {
                    openSidebar("activity");
                  } else {
                    handleTabClick("activity");
                  }
                }}
                className={`px-3 text-slate-300 hover:text-white hover:bg-slate-600 rounded-lg transition-colors ${
                  (isCampaignPage &&
                    activeTab === "activity" &&
                    isOpen) ||
                  (!isCampaignPage &&
                    activityTab === "activity" &&
                    isActivitySidebarOpen)
                    ? "bg-slate-600 text-white"
                    : ""
                }`}
              >
                <Clock className="w-5 h-5" />
              </button>

              {/* Hover tooltip */}
              <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                  Activity History (Ctrl+H)
                  <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Activity History Sidebar - Only show on overview pages */}
        {isOverviewPage && (
          <ActivityHistorySidebar
            isOpen={isActivitySidebarOpen}
            onClose={() => setIsActivitySidebarOpen(false)}
            initialTab={activityTab}
            showAllTabs={false}
          />
        )}

        {/* Campaign Sidebar - Only show on campaign pages */}
        {isCampaignPage && (
          <CampaignSidebar
            isOpen={isOpen}
            onClose={closeSidebar}
            activeTab={activeTab}
            selectedFieldData={selectedFieldData}
          />
        )}
      </div>
    </div>
  );
}

// Main AppLayout component that provides the context
export default function AppLayout() {
  return (
    <CampaignSidebarProvider>
      <SidebarControls />
    </CampaignSidebarProvider>
  );
}
