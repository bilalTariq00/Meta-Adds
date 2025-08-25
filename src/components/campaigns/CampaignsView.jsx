"use client";

import React, { useMemo, useState, useCallback } from "react";
import Toolbar from "./Toolbar";
import ABTestWizard from "./ABTestWizard";
import RulesModal from "./RulesModal";
import SplitAudienceModal from "./SplitAudienceModal";
import DeleteModal from "./DeleteModal";
import ChartsSidebar from "./ChartsSidebar";
import CampaignTable from "./CampaignTable";
import PageFiltersBar from "./PageFiltersBar";
import SaveEditsPanel from "./SaveEditsPanel";
import TabsAndDatePicker from "./TabsAndDatePicker";
import { CreateCampaignModal } from "../Accountoverview/create-campaign-modal";
import DuplicateModal from "./DuplicateModel";
import DynamicDuplicateModal from "./dialoges/DynamicDuplicateModal";

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
  });
  const [activeTab, setActiveTab] = useState("campaigns"); // campaigns | adsets | ads

  const [showCreate, setShowCreate] = useState(false);
  const [showABTest, setShowABTest] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showSplitAudience, setShowSplitAudience] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const [showSavePanel, setShowSavePanel] = useState(false);
  const [open, setOpen] = useState(false);
  const [applyRecommendation, setApplyRecommendation] = useState(true);
  const [selection, setSelection] = useState([]); // selected row IDs
  const [selectedTab, setSelectedTab] = useState(null); // which tab the selection belongs to
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectionHasToggleOn, setSelectionHasToggleOn] = useState(false);
  // Derived filter state connected to search bar in toolbar
  const tableQuery = useMemo(
    () => ({ search, filters, activeTab }),
    [search, filters, activeTab]
  );

  const handleSelectionChange = (newSelection, hasToggleOn = false) => {
    console.log("CampaignsView Selection Change:", {
      newSelection,
      hasToggleOn,
      selectionLength: newSelection.length,
    });

    setSelection(newSelection);
    setSelectedTab(newSelection.length > 0 ? activeTab : null);
    setSelectionHasToggleOn(hasToggleOn);
  };

  // Actions
  const handleDuplicate = async (opts) => {
    await fakeApi.duplicate(selection, opts);
  };

  const handleDelete = async () => {
    await fakeApi.delete(selection);
    setShowDelete(false);
  };

  const handleRevert = async () => {
    await fakeApi.revert();
    setFilters({ hadDelivery: false, active: false, categories: [] });
    setSearch("");
  };

  const handleSaveRule = async (payload) => {
    await fakeApi.saveRule(payload);
    setShowRules(false);
  };

  const handleToggleCharts = useCallback(() => setShowCharts((v) => !v), []);

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
      />

      {/* Tabs and Date Picker */}
      <TabsAndDatePicker
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCount={selection.length}
        selectedTab={selectedTab}
      />

      {/* Inner card holding controls + table */}
      <div className="   flex flex-col">
        <div className="flex-1 min-h-0 flex gap-2  ">
          <div
            className={`flex-1 min-w-0 bg-white  shadow-sm p-3 ${
              showSavePanel ? "pr-0 rounded-l-xl" : "pr-0 rounded-xl"
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
              compactActions={showSavePanel}
              onCreate={() => setShowCreate(true)}
              onShowSplit={() => setShowSplitAudience(true)}
              onDuplicate={() => setOpen(true)}
              onEdit={() => {}}
              onDelete={() => setShowDelete(true)}
              onRevert={handleRevert}
              onABTest={() => setShowABTest(true)}
              onRules={() => setShowRules(true)}
              onToggleCharts={handleToggleCharts}
            />

            <CampaignTable
              query={tableQuery}
              selectedIds={selection}
              onSelectionChange={handleSelectionChange}
            />
          </div>
          {showSavePanel && (
            <SaveEditsPanel
              open={showSavePanel}
              onClose={() => setShowSavePanel(false)}
            />
          )}
        </div>
      </div>

      {/* Right Charts Sidebar */}
      <ChartsSidebar open={showCharts} onClose={() => setShowCharts(false)} />

      {/* Modals */}
      {/* <CreateCampaignModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
      /> */}
      <CreateCampaignModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
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
