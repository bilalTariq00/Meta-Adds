# Campaign Sidebar Components

This directory contains the components for the campaign structure sidebar system.

## Overview

The campaign sidebar system provides different functionality based on the page type:

- **Overview/Home pages**: Show only the activity history button in the right sidebar
- **Campaign pages**: Show a campaign header with a "Campaign Structure" button that opens a comprehensive sidebar

## Components

### 1. CampaignHeader.jsx
- Displays the campaign breadcrumb navigation
- Shows Performance and Actions tabs
- Contains the "Campaign Structure" button that triggers the sidebar
- Includes unpublished edits toggle and other campaign controls

### 2. CampaignChartComponent.jsx
- Main sidebar component that opens when "Campaign Structure" is clicked
- Contains three main tabs: Chart, Edit, and Activity
- Chart tab shows Performance and Actions sub-tabs
- Edit and Activity tabs are placeholder implementations

### 3. PerformanceOverview.jsx
- Shows three metric cards (Website views, Per view, Amount spent)
- Clicking on a card displays its corresponding line chart
- Includes filters for time range and activity history
- Shows historical edit indicators on the charts

### 4. DemographicsPlatform.jsx
- Contains Demographics and Platform tabs
- Demographics shows age and gender distribution chart
- Platform shows platform distribution (placeholder)
- Includes filter dropdowns for customization

### 5. ActionsTab.jsx
- Shows the "Actions to take" section
- Currently displays an empty state with no actions
- Includes the "All actions (0)" button

## Usage

### In Campaign Pages
1. The `CampaignHeader` component is automatically rendered
2. Click the "Campaign Structure" button to open the sidebar
3. Use the left sidebar navigation to switch between Chart, Edit, and Activity tabs
4. In the Chart tab, switch between Performance and Actions sub-tabs

### In Overview Pages
1. Only the activity history button appears in the right sidebar
2. Click to open the activity history sidebar

## State Management

The sidebar state is managed in the `CampaignsView` component:
- `showCampaignSidebar`: Controls sidebar visibility
- `campaignSidebarTab`: Tracks the active sidebar tab

## Styling

All components use Tailwind CSS classes and follow the existing design system:
- Slate-800 for sidebar backgrounds
- Blue accents for active states
- Consistent spacing and typography
- Responsive design considerations

## Future Enhancements

- Implement Edit tab functionality for campaign editing
- Add Activity tab with campaign-specific activity history
- Enhance chart interactions and data visualization
- Add more customization options for filters and charts
