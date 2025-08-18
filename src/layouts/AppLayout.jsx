"use client";

import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Accountoverview/Sidebar";
import Header from "@/components/Accountoverview/Header";
import { useLoading } from "@/components/LoadingContext";
import LoadingModal from "@/components/LoadingModal";
import { ActivityHistorySidebar } from "@/components/activity-history-sidebar";
import { useState } from "react";
import { Clock } from "lucide-react";

// This is your child layout with Header and Sidebar
export default function AppLayout() {
  const { isLoading } = useLoading();
  const [isActivitySidebarOpen, setIsActivitySidebarOpen] = useState(false);

  return (
    <div className="h-full w-full flex bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] relative overflow-hidden">
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

        <div className="absolute right-0 top-0 bottom-0 w-10 bg-slate-700 flex flex-col items-center py-4 border-l border-slate-600 z-40">
          <div className="relative group">
            <button
              onClick={() => setIsActivitySidebarOpen(true)}
              className="px-3 text-slate-300 hover:text-white hover:bg-slate-600 rounded-lg transition-colors"
            >
              <Clock className="w-5 h-5" />
            </button>

            {/* Hover tooltip */}
            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                See history (Ctrl+H)
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
              </div>
            </div>
          </div>
        </div>

        <ActivityHistorySidebar
          isOpen={isActivitySidebarOpen}
          onClose={() => setIsActivitySidebarOpen(false)}
        />
      </div>
    </div>
  );
}
