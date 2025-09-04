"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdsReportingHeader from "./AdsReportingHeader";
import FilterBanner from "./FilterBanner";
import PivotTableHeader from "./PivotTableHeader";
import PivotTable from "./PivotTable";
import FormatCustomiseSidebar from "./FormatCustomiseSidebar";

export default function AdsReportingPage() {
  const navigate = useNavigate();
  const [reportName, setReportName] = useState("Untitled report");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(["Had delivery"]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  const handleBack = () => {
    if (hasUnsavedChanges) {
      if (window.confirm("You have unsaved changes. Are you sure you want to leave?")) {
        navigate("/ads-reporting");
      }
    } else {
      navigate("/ads-reporting");
    }
  };

  const handleReportNameChange = (newName) => {
    setReportName(newName);
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    setHasUnsavedChanges(false);
    // Add save logic here
  };

  const handleRefresh = () => {
    // Add refresh logic here
  };

  const handleShare = () => {
    // Add share logic here
  };

  const handleExport = () => {
    // Add export logic here
  };

  const handleFilterChange = (filter) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handleRemoveFilter = (filterToRemove) => {
    setSelectedFilters(selectedFilters.filter(filter => filter !== filterToRemove));
  };

  const handleDateRangeChange = (range) => {
    // Add date range change logic here
  };

  const handleLayoutChange = (layout) => {
    // Add layout change logic here
  };

  const handleUngroupBreakdown = () => {
    // Add ungroup breakdown logic here
  };

  const handleResetColumnWidth = () => {
    // Add reset column width logic here
  };

  const handleFormatClick = () => {
    // Add format logic here
  };

  const handleCustomiseClick = () => {
    // Add customise logic here
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSort = (column, direction) => {
    // Add sort logic here
  };

  const handleRowSelect = (rowId) => {
    setSelectedRows(prev => 
      prev.includes(rowId) 
        ? prev.filter(id => id !== rowId)
        : [...prev, rowId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === tableData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tableData.map(row => row.id));
    }
  };

  const handleRowExport = (rowIds) => {
    // Add row export logic here
  };

  const handleRowShare = (rowIds) => {
    // Add row share logic here
  };

  const handleRowDuplicate = (rowIds) => {
    // Add row duplicate logic here
  };

  const handleRowDelete = (rowIds) => {
    // Add row delete logic here
  };

  return (
    <div className="h-screen w-full relative pl-20 flex flex-col">
      {/* Custom Header */}
      <AdsReportingHeader
        reportName={reportName}
        onReportNameChange={handleReportNameChange}
        onSave={handleSave}
        onRefresh={handleRefresh}
        onShare={handleShare}
        onExport={handleExport}
        hasUnsavedChanges={hasUnsavedChanges}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${activeTab ? 'mr-2' : 'mr-0'} overflow-hidden`}>
          {/* Filter Banner */}
          <FilterBanner
            onFilterChange={handleFilterChange}
            onDateRangeChange={handleDateRangeChange}
            selectedFilters={selectedFilters}
            onRemoveFilter={handleRemoveFilter}
          />

          {/* Pivot Table Header */}
          <PivotTableHeader
            onLayoutChange={handleLayoutChange}
            onUngroupBreakdown={handleUngroupBreakdown}
            onResetColumnWidth={handleResetColumnWidth}
            onFormatClick={handleFormatClick}
            onCustomiseClick={handleCustomiseClick}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

          {/* Pivot Table */}
          <div className="flex-1 overflow-hidden">
            <PivotTable
              data={tableData}
              onSort={handleSort}
              onExport={handleRowExport}
              onShare={handleRowShare}
              onDelete={handleRowDelete}
              onDuplicate={handleRowDuplicate}
              selectedRows={selectedRows}
              onRowSelect={handleRowSelect}
              onSelectAll={handleSelectAll}
            />
          </div>
        </div>

        {/* Right Sidebar */}
        {activeTab && (
          <div className="w-80 flex-shrink-0">
            <FormatCustomiseSidebar
              activeTab={activeTab}
              onClose={() => setActiveTab(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
