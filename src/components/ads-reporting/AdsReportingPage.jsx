"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdsReportingHeader from "./AdsReportingHeader";
import FilterBanner from "./FilterBanner";
import PivotTableHeader from "./PivotTableHeader";
import PivotTable from "./PivotTable";
import TrendChart from "./TrendChart";
import BarChart from "./BarChart";
import FormatCustomiseSidebar from "./FormatCustomiseSidebar";

export default function AdsReportingPage({ templateData = null, reportName: initialReportName = "Untitled report" }) {
  const navigate = useNavigate();
  const [reportName, setReportName] = useState(initialReportName);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(["Had delivery"]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [viewType, setViewType] = useState("pivot-table");
  const [isGrouped, setIsGrouped] = useState(true);
  const [hasColumnWidthsChanged, setHasColumnWidthsChanged] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [selectedBreakdowns, setSelectedBreakdowns] = useState({});
  const [selectedMetrics, setSelectedMetrics] = useState({});
  const [filteredTableData, setFilteredTableData] = useState(null);

  // Load template data when provided
  useEffect(() => {
    if (templateData) {
      setTableData(templateData);
      setReportName(templateData.title || initialReportName);
      
      // Initialize selected metrics based on template columns
      if (templateData.columns) {
        const initialMetrics = {};
        templateData.columns.forEach(column => {
          // Map column keys to display names
          const keyToNameMap = {
            "amountSpent": "Amount spent",
            "impressions": "Impressions", 
            "reach": "Reach",
            "results": "Results",
            "costPerResult": "Cost per result",
            "delivery": "Delivery",
            "frequency": "Frequency",
            "linkClicks": "Link clicks",
            "postReactions": "Post reactions",
            "postComments": "Post comments", 
            "postShares": "Post shares",
            "cpc": "CPC (cost per link click)",
            "cpm": "CPM (cost per 1,000 impressions)",
            "ctr": "CTR (all)"
          };
          
          const displayName = keyToNameMap[column.key];
          if (displayName) {
            initialMetrics[displayName] = true;
          }
        });
        setSelectedMetrics(initialMetrics);
      }
    } else {
      // Reset to default state when no template data
      setTableData([]);
      setReportName(initialReportName);
      setSelectedMetrics({});
    }
  }, [templateData, initialReportName]);

  // Filter table data when breakdowns or metrics change
  useEffect(() => {
    console.log("Filtering data - tableData:", tableData, "selectedMetrics:", selectedMetrics);
    if (tableData) {
      const filtered = filterTableData(tableData, selectedBreakdowns, selectedMetrics);
      setFilteredTableData(filtered);
    } else {
      setFilteredTableData(tableData);
    }
  }, [tableData, selectedBreakdowns, selectedMetrics]);

  const handleBack = () => {
    console.log("Back button clicked from AdsReportingPage, hasUnsavedChanges:", hasUnsavedChanges);
    if (hasUnsavedChanges) {
      if (window.confirm("You have unsaved changes. Are you sure you want to leave?")) {
        console.log("Navigating to /ads-reporting from AdsReportingPage");
        navigate("/ads-reporting");
      }
    } else {
      console.log("Navigating to /ads-reporting from AdsReportingPage");
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
    setViewType(layout);
  };

  const handleUngroupBreakdown = () => {
    setIsGrouped(!isGrouped);
  };

  const handleResetColumnWidth = () => {
    // Trigger reset in PivotTable component
    setResetTrigger(prev => prev + 1);
    setHasColumnWidthsChanged(false);
  };

  const handleColumnWidthChange = (hasChanged) => {
    setHasColumnWidthsChanged(hasChanged);
  };

  // Create button handlers
  const handleCreateCustomBreakdown = () => {
    alert("Create Custom Breakdown functionality would be implemented here");
    // You can implement actual functionality like opening a modal or navigating to a form
  };

  const handleCreateCustomMetric = () => {
    alert("Create Custom Metric functionality would be implemented here");
    // You can implement actual functionality like opening a modal or navigating to a form
  };

  const handleCreateCustomConversion = () => {
    alert("Create Custom Conversion functionality would be implemented here");
    // You can implement actual functionality like opening a modal or navigating to a form
  };

  const handleBreakdownChange = (breakdownName, isChecked) => {
    setSelectedBreakdowns(prev => ({
      ...prev,
      [breakdownName]: isChecked
    }));
  };

  const handleMetricChange = (metricName, isChecked) => {
    setSelectedMetrics(prev => ({
      ...prev,
      [metricName]: isChecked
    }));
  };

  // Filter table data based on selected breakdowns and metrics
  const filterTableData = (data, breakdowns, metrics) => {
    if (!data || typeof data !== 'object') return data;
    
    const filteredData = { ...data };
    
    // If no metrics are selected, return original data
    const hasSelectedMetrics = Object.keys(metrics).length > 0 && Object.values(metrics).some(isSelected => isSelected);
    if (!hasSelectedMetrics) {
      return data;
    }
    
    // Filter columns based on selected metrics
    if (data.columns) {
      const selectedMetricKeys = Object.entries(metrics)
        .filter(([_, isSelected]) => isSelected)
        .map(([name, _]) => {
          // Map display names to column keys
          const nameToKeyMap = {
            "Amount spent": "amountSpent",
            "Impressions": "impressions", 
            "Reach": "reach",
            "Results": "results",
            "Cost per result": "costPerResult",
            "Delivery": "delivery",
            "Frequency": "frequency",
            "Link clicks": "linkClicks",
            "Post reactions": "postReactions",
            "Post comments": "postComments", 
            "Post shares": "postShares",
            "CPC (cost per link click)": "cpc",
            "CPM (cost per 1,000 impressions)": "cpm",
            "CTR (all)": "ctr"
          };
          return nameToKeyMap[name] || name.toLowerCase().replace(/\s+/g, '');
        });
      
      // Always include breakdown columns (campaign, adSet, ad, account) and selected metric columns
      filteredData.columns = data.columns.filter(column => 
        ['campaign', 'adSet', 'ad', 'account'].includes(column.key) || // Always include breakdown columns
        selectedMetricKeys.includes(column.key) // Include selected metric columns
      );
    }
    
    return filteredData;
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

          {/* Conditional Header and Content */}
          {viewType === "pivot-table" && (
            <>
              {/* Pivot Table Header */}
              <PivotTableHeader
                onLayoutChange={handleLayoutChange}
                onUngroupBreakdown={handleUngroupBreakdown}
                onResetColumnWidth={handleResetColumnWidth}
                onFormatClick={handleFormatClick}
                onCustomiseClick={handleCustomiseClick}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                currentView={viewType}
                isGrouped={isGrouped}
                hasColumnWidthsChanged={hasColumnWidthsChanged}
              />

              {/* Pivot Table */}
              <div className="flex-1 overflow-hidden">
                <PivotTable
                  data={filteredTableData || tableData}
                  columns={filteredTableData?.columns || templateData?.columns}
                  isGrouped={isGrouped}
                  onSort={handleSort}
                  onExport={handleRowExport}
                  onShare={handleRowShare}
                  onDelete={handleRowDelete}
                  onDuplicate={handleRowDuplicate}
                  selectedRows={selectedRows}
                  onRowSelect={handleRowSelect}
                  onSelectAll={handleSelectAll}
                  onResetColumnWidth={handleResetColumnWidth}
                  onColumnWidthChange={handleColumnWidthChange}
                  resetTrigger={resetTrigger}
                />
              </div>
            </>
          )}

          {viewType === "trend" && (
            <div className="flex-1 overflow-hidden">
              <TrendChart
                data={tableData}
                onLayoutChange={handleLayoutChange}
                onUngroupBreakdown={handleUngroupBreakdown}
                onResetColumnWidth={handleResetColumnWidth}
                onFormatClick={handleFormatClick}
                onCustomiseClick={handleCustomiseClick}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>
          )}

          {viewType === "bar-chart" && (
            <div className="flex-1 overflow-hidden">
              <BarChart
                data={tableData}
                onLayoutChange={handleLayoutChange}
                onUngroupBreakdown={handleUngroupBreakdown}
                onResetColumnWidth={handleResetColumnWidth}
                onFormatClick={handleFormatClick}
                onCustomiseClick={handleCustomiseClick}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        {activeTab && (
          <div className="w-70 flex-shrink-0">
            <FormatCustomiseSidebar
              activeTab={activeTab}
              onClose={() => setActiveTab(null)}
              viewType={viewType}
              onBreakdownChange={handleBreakdownChange}
              onMetricChange={handleMetricChange}
              onCreateCustomBreakdown={handleCreateCustomBreakdown}
              onCreateCustomMetric={handleCreateCustomMetric}
              onCreateCustomConversion={handleCreateCustomConversion}
            />
          </div>
        )}
      </div>
    </div>
  );
}