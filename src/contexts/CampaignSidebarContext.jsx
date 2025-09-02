"use client";

import { createContext, useContext, useState } from "react";

const CampaignSidebarContext = createContext();

export const useCampaignSidebar = () => {
  const context = useContext(CampaignSidebarContext);
  if (!context) {
    throw new Error("useCampaignSidebar must be used within a CampaignSidebarProvider");
  }
  return context;
};

export const CampaignSidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chart");
  const [selectedFieldData, setSelectedFieldData] = useState(null);

  const openSidebar = (tab = "chart", fieldData = null) => {
    setActiveTab(tab);
    setSelectedFieldData(fieldData);
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
    setSelectedFieldData(null);
  };

  const value = {
    isOpen,
    activeTab,
    selectedFieldData,
    openSidebar,
    closeSidebar,
    setActiveTab,
  };

  return (
    <CampaignSidebarContext.Provider value={value}>
      {children}
    </CampaignSidebarContext.Provider>
  );
};
