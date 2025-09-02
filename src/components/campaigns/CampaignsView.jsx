"use client";

import React, { useMemo, useState, useCallback, useEffect } from "react";
import Toolbar from "./Toolbar";
import ABTestWizard from "./ABTestWizard";
import RulesModal from "./RulesModal";
import SplitAudienceModal from "./SplitAudienceModal";
import DeleteModal from "./DeleteModal";
import RevertModal from "./RevertModal";
import ChartsSidebar from "./ChartsSidebar";
import CampaignTable, { campaignsSeed, adsetsSeed, adsSeed } from "./CampaignTable";
import PageFiltersBar from "./PageFiltersBar";
import SaveEditsPanel from "./SaveEditsPanel";
import CreateViewSidebar from "./CreateViewSidebar";
import TabsAndDatePicker from "./TabsAndDatePicker";
import { CreateCampaignModal } from "../Accountoverview/create-campaign-modal";
import DuplicateModal from "./DuplicateModel";
import DynamicDuplicateModal from "./dialoges/DynamicDuplicateModal";
import ExportPopups from "./dropdowns/export-popup";
import { useCampaignSidebar } from "@/contexts/CampaignSidebarContext";


// Dummy API helpers
const wait = (ms) => new Promise((res) => setTimeout(res, ms));
const fakeApi = {
  duplicate: async (ids, opts) => {
    await wait(500);
    return { ok: true, ids, opts };
  },
  delete: async (ids) => {
    await wait(400);
    return { ok: true, deleted: ids };
  },
  revert: async () => {
    await wait(300);
    return { ok: true };
  },
  saveRule: async (payload) => {
    await wait(600);
    return { ok: true, payload };
  },
};

export default function CampaignsView() {
  const [search, setSearch] = useState("");
  const [chips, setChips] = useState([
    "Impressions (campaign) > 0",
    "Campaign delivery is Active",
  ]); // page chips
  const [filters, setFilters] = useState({
    hadDelivery: false,
    active: false,
    categories: [],
    breakdowns: [], // for breakdown dropdown
    columns: "performance", // for column preferences
    status: "all", // all, active, paused, draft
    budget: "all", // all, low, medium, high
    performance: "all", // all, good, poor
  });
  const [activeTab, setActiveTab] = useState("campaigns"); // campaigns | adsets | ads

  const [showCreate, setShowCreate] = useState(false);
  const [showABTest, setShowABTest] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showSplitAudience, setShowSplitAudience] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showRevert, setShowRevert] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const [showSavePanel, setShowSavePanel] = useState(false);
  const [showCreateViewPanel, setShowCreateViewPanel] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [duplicatedItems, setDuplicatedItems] = useState([]); // Track duplicated items
  const [isCreating, setIsCreating] = useState(false); // Track if we're in create mode
  const [createData, setCreateData] = useState(null); // Store create data
  const [dateRange, setDateRange] = useState({
    range: "last30days",
    startDate: "22 Jul 2025",
    endDate: "20 Aug 2025",
    compare: false
  });
  const [open, setOpen] = useState(false);
  const [applyRecommendation, setApplyRecommendation] = useState(true);
  const [selection, setSelection] = useState([]); // selected row IDs
  const [selectedTab, setSelectedTab] = useState(null); // which tab the selection belongs to
  const [selectedCountsByTab, setSelectedCountsByTab] = useState({
    campaigns: 0,
    adsets: 0,
    ads: 0
  });
  const [customTabs, setCustomTabs] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectionHasToggleOn, setSelectionHasToggleOn] = useState(false);
  // Derived filter state connected to search bar in toolbar
  const tableQuery = useMemo(
    () => {
      console.log('Table query updated:', { search, filters, activeTab });
      return { search, filters, activeTab };
    },
    [search, filters, activeTab]
  );

  const handleSelectionChange = (newSelection, hasToggleOn = false) => {
    console.log("CampaignsView Selection Change:", {
      newSelection,
      hasToggleOn,
      selectionLength: newSelection.length,
      activeTab
    });

    setSelection(newSelection);
    setSelectedTab(newSelection.length > 0 ? activeTab : null);
    setSelectionHasToggleOn(hasToggleOn);
    
    // Update counts per tab
    setSelectedCountsByTab(prev => ({
      ...prev,
      [activeTab]: newSelection.length
    }));
  };

  // Actions
  const { openSidebar, closeSidebar } = useCampaignSidebar();

  const handleCreate = async (data) => {
    // Store create data and open sidebar in create mode
    setCreateData(data);
    setIsCreating(true);
    setHasUnsavedChanges(true); // Mark that changes have been made
    
    // Open the main sidebar with edit tab for creation
    openSidebar("edit", {
      ...data,
      isCreating: true,
      name: `New ${data.objective} Campaign with recommended settings`,
      onPublish: handlePublish // Pass the publish function
    });
  };

  const handleDuplicate = async (opts) => {
    // Get current data based on active tab
    const currentData = activeTab === "adsets" ? adsetsSeed :
                       activeTab === "ads" ? adsSeed : campaignsSeed;
    
    // Find selected items
    const selectedData = currentData.filter(item => selection.includes(item.id));
    
    // Create duplicated items with new IDs
    const duplicatedData = selectedData.map(item => ({
      ...item,
      id: `${item.id}_duplicate_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: `${item.name} (Copy)`,
      lastEdit: new Date().toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }) + ', ' + new Date().toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      editTime: "Just now"
    }));
    
    // Store duplicated items for potential reversion
    setDuplicatedItems(prev => [...prev, ...duplicatedData]);
    setHasUnsavedChanges(true); // Mark that changes have been made
    
    // Close the duplicate modal
    setOpen(false);
    
    console.log('Duplicated items:', duplicatedData);
  };

  const handleDelete = async () => {
    await fakeApi.delete(selection);
    setShowDelete(false);
  };

  const handlePublish = async (campaignData) => {
    // Add the new campaign to duplicated items (which will show in table)
    setDuplicatedItems(prev => [...prev, campaignData]);
    setIsCreating(false);
    setCreateData(null);
    setHasUnsavedChanges(false); // Clear unsaved changes since it's now published
    
    // Close the sidebar
    closeSidebar();
    
    console.log('Published campaign:', campaignData);
  };

  const handleDateRangeChange = (newDateRange) => {
    console.log("Date range changed in CampaignsView:", newDateRange);
    setDateRange(newDateRange);
    // Here you can add logic to filter table data based on date range
    // For now, we'll just update the state
  };

  // Clear current selection when switching tabs, but keep the counts for contextual text
  useEffect(() => {
    setSelection([]);
    setSelectedTab(null);
    setSelectionHasToggleOn(false);
    // Note: We keep selectedCountsByTab intact so contextual text can be shown
  }, [activeTab]);

  const handleRevert = async () => {
    // Remove all duplicated items and clear create state
    setDuplicatedItems([]);
    setIsCreating(false);
    setCreateData(null);
    setHasUnsavedChanges(false); // Clear unsaved changes
    setShowRevert(false);
    
    console.log('Reverted: Removed duplicated items and cleared create state');
  };

  const clearAllSelections = () => {
    setSelection([]);
    setSelectedTab(null);
    setSelectionHasToggleOn(false);
    setSelectedCountsByTab({
      campaigns: 0,
      adsets: 0,
      ads: 0
    });
  };



  const handleClearSelection = (tabId) => {
    setSelectedCountsByTab(prev => ({
      ...prev,
      [tabId]: 0
    }));
    // Also clear current selection if it's the active tab
    if (activeTab === tabId) {
      setSelection([]);
      setSelectedTab(null);
      setSelectionHasToggleOn(false);
    }
  };



  const handleSaveRule = async (payload) => {
    await fakeApi.saveRule(payload);
    setShowRules(false);
  };

  const handleToggleCharts = useCallback(() => setShowCharts((v) => !v), []);

  const handleEdit = useCallback(() => {
    if (selection.length > 0) {
      // Get the selected field data from the current table data
      const currentData = activeTab === "adsets" ? adsetsSeed : 
                         activeTab === "ads" ? adsSeed : campaignsSeed;
      const selectedData = currentData.filter(item => selection.includes(item.id));
      const fieldData = selectedData[0]; // Take the first selected item
      openSidebar("edit", fieldData); // Open the main CampaignSidebar with edit tab
    }
  }, [selection, activeTab, openSidebar]);

  return (
    <div className="flex flex-col h-full">
      {/* Page-scoped filters bar */}
      <PageFiltersBar
        chips={chips}
        setChips={setChips}
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
        onOpenSave={() => setShowSavePanel(true)}
        onCreateView={() => setShowCreateViewPanel(true)}
        customViews={customTabs}
        onViewCreated={(newView) => {
          console.log('New view created:', newView);
          // Add the new view to custom views (will appear in PageFiltersBar)
          setCustomTabs(prev => [newView, ...prev]);
          // Close the create view panel
          setShowCreateViewPanel(false);
        }}
      />

      {/* Tabs and Date Picker */}
      <TabsAndDatePicker
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCount={selection.length}
        selectedTab={selectedTab}
        selectedCountsByTab={selectedCountsByTab}
        onClearSelection={handleClearSelection}
        onDateRangeChange={handleDateRangeChange}
      />

      {/* Inner card holding controls + table */}
      <div className="   flex flex-col">
        <div className="flex-1 min-h-0 flex gap-2  ">
          <div
            className={`flex-1 min-w-0 bg-white  shadow-sm p-3 ${
              showSavePanel || showCreateViewPanel ? "pr-0 rounded-l-xl" : "pr-0 rounded-xl"
            }`}
          >
            <Toolbar
              search={search}
              setSearch={setSearch}
              filters={filters}
              setFilters={setFilters}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              selectedCount={selection.length}
              compactActions={showSavePanel || showCreateViewPanel}
              ChartOpen={showCharts}
              onCreate={() => setShowCreate(true)}
              onShowSplit={() => setShowSplitAudience(true)}
              onDuplicate={() => setOpen(true)}
              onEdit={handleEdit}
              onDelete={() => setShowDelete(true)}
              onRevert={() => setShowRevert(true)}
              hasUnsavedChanges={hasUnsavedChanges || isCreating}
              onABTest={() => {
                console.log("A/B Test button clicked, setting showABTest to true");
                setShowABTest(true);
              }}
              onRules={() => setShowRules(true)}
              onToggleCharts={handleToggleCharts}
            />

            <CampaignTable
              query={tableQuery}
              selectedIds={selection}
              onSelectionChange={handleSelectionChange}
              duplicatedItems={duplicatedItems}
              isCreating={isCreating}
              createData={createData}
              dateRange={dateRange}
              onViewCharts={(item) => {
                // Open chart tab in main right sidebar
                openSidebar("chart", item);
              }}
              onEdit={(item) => {
                // Open edit tab in main right sidebar
                openSidebar("edit", item);
              }}
              onDuplicate={(item) => {
                // Set selection to this item and open duplicate modal
                setSelection([item.id]);
                setOpen(true);
              }}
              onCompare={(item) => {
                // Open compare small right sidebar
                setShowCharts(true);
              }}

              onViewHistory={(item) => {
                // Open view history tab in main right sidebar
                openSidebar("activity", item);
              }}
            />
          </div>
          {showSavePanel && (
            <SaveEditsPanel
              open={showSavePanel}
              onClose={() => setShowSavePanel(false)}
            />
          )}
          {showCreateViewPanel && (
            <CreateViewSidebar
              open={showCreateViewPanel}
              onClose={() => setShowCreateViewPanel(false)}
              onSave={(viewData) => {
                const newView = {
                  id: Date.now(),
                  name: viewData.name,
                  filters: viewData.filters,
                  createdAt: new Date().toISOString(),
                };
                
                setCustomTabs(prev => [newView, ...prev]);
                setShowCreateViewPanel(false);
              }}
            />
          )}
          <ChartsSidebar
            open={showCharts}
            onClose={() => setShowCharts(false)}
          />
        </div>
      </div>

      {/* Right Charts Sidebar */}

      {/* Modals */}
      {/* <CreateCampaignModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
      /> */}
      <CreateCampaignModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onCreate={handleCreate}
      />
      <ABTestWizard open={showABTest} onClose={() => setShowABTest(false)} />
      <RulesModal
        open={showRules}
        onClose={() => setShowRules(false)}
        onSave={handleSaveRule}
      />
      <SplitAudienceModal
        open={showSplitAudience}
        onClose={() => setShowSplitAudience(false)}
        onDuplicate={handleDuplicate}
      />
      <DeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />
      <RevertModal
        open={showRevert}
        onClose={() => setShowRevert(false)}
        onConfirm={handleRevert}
      />
      {selectionHasToggleOn ? (
        <DynamicDuplicateModal
          open={open}
          onClose={() => setOpen(false)}
          onDuplicate={handleDuplicate}
          activeTab={activeTab}
          applyRecommendation={applyRecommendation}
          setApplyRecommendation={setApplyRecommendation}
        />
      ) : (
        <DuplicateModal
          open={open}
          onClose={() => setOpen(false)}
          onDuplicate={handleDuplicate}
          applyRecommendation={applyRecommendation}
          setApplyRecommendation={setApplyRecommendation}
        />
      )}



    </div>
  );
}
