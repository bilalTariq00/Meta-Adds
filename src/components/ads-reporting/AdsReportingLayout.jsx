"use client";

import { useState } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import MainReportsContainer from "./MainReportsContainer";
import ChooseLayoutModal from "./modals/ChooseLayoutModal";

export default function AdsReportingLayout() {
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState("reports"); // "reports" or "exports"
  const [showChooseLayoutModal, setShowChooseLayoutModal] = useState(false);
  const [currentLayout, setCurrentLayout] = useState("pivot-table"); // "pivot-table", "trend", "bar-chart"

  return (
    <div className="h-full w-full flex bg-gray-50">
      {/* Left Sidebar */}
      <LeftSidebar
        activeView={activeView}
        onViewChange={setActiveView}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <MainReportsContainer
          activeView={activeView}
          currentLayout={currentLayout}
          onChooseLayout={() => setShowChooseLayoutModal(true)}
        />
      </div>

      {/* Right Sidebar */}
      <RightSidebar
        collapsed={rightSidebarCollapsed}
        onToggle={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
        activeView={activeView}
      />

      {/* Choose Layout Modal */}
      <ChooseLayoutModal
        isOpen={showChooseLayoutModal}
        onClose={() => setShowChooseLayoutModal(false)}
        currentLayout={currentLayout}
        onLayoutSelect={(layout) => {
          setCurrentLayout(layout);
          setShowChooseLayoutModal(false);
        }}
      />
    </div>
  );
}
