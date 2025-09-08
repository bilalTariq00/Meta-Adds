"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  BarChart3,
  FileText,
  Users,
  Megaphone,
  CreditCard,
  Calendar,
  Menu,
  HelpCircle,
  Settings,
  Bell,
  Search,
  ChevronDown,
  Bug,
  BookOpen,
  CircleHelp,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// Import smaller components
import SidebarItem from "../SideBar/SidebarItem";
import FooterIcon from "../SideBar/FooterIcon";
import AllToolsMenu from "../SideBar/AllToolsMenu";
import HelpSidebar from "../SideBar/HelpSidebar";
import AddAccountUpdateSidebar from "../SideBar/AddAccountUpdateSidebar";
import NotificationsSidebar from "../SideBar/NotificationsSidebar";
import SearchDialog from "../SideBar/SearchDialog";
import ReportBugDialog from "../SideBar/ReportBugDialog";

//icons
import overviewIcon from "@/assets/icons/overview.png";
import overviewDarkIcon from "@/assets/icons/overviewdark.png";
import campaignIcon from "@/assets/icons/campaign.png";
import campaignDarkIcon from "@/assets/icons/campaigndark.png";
import AdsReportIcon from "@/assets/icons/AdsReport.png";
import AdsReportDarkIcon from "@/assets/icons/AdsReportdark.png";
import AudienceIcon from "@/assets/icons/Audience.png";
import AudienceDarkIcon from "@/assets/icons/Audiencedark.png";
import ADSettingsIcon from "@/assets/icons/ADSettings.png";
import ADSettingsDarkIcon from "@/assets/icons/ADSettingdark.png";
import BillsIcon from "@/assets/icons/Bills.png";
import BillsDarkIcon from "@/assets/icons/Billsdark.png";
import EventIcon from "@/assets/icons/Event.png";
import EventDarkIcon from "@/assets/icons/Eventdark.png";
import AlltoolsDarkIcon from "@/assets/icons/Alltoolsdark.png";
import NotificationIcon from "@/assets/icons/notification.png";
import NotificationDarkIcon from "@/assets/icons/Notificationdark.png";
import helpIcon from "@/assets/icons/help.png";
import { useLoading } from "@/components/LoadingContext";

// Main Sidebar Component
export default function Sidebar() {
  const location = useLocation();

  // const { isLoading, startLoading } = useLoading();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("Account overview");
  const [showAllTools, setShowAllTools] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showReportBug, setShowReportBug] = useState(false);
  const navigate = useNavigate();
  const { startLoading } = useLoading();

  const sidebarItems = [
    {
      icon: { light: overviewIcon, dark: overviewDarkIcon },
      label: "Account overview",
      id: "Account overview",
      path: "/account-overview",
    },
    {
      icon: { light: campaignIcon, dark: campaignDarkIcon },
      label: "Campaigns",
      id: "Campaigns",
      path: "/campaigns",
    },
    {
      icon: { light: AdsReportIcon, dark: AdsReportDarkIcon },
      label: "Ads Reporting",
      id: "Ads Reporting",
      path: "/ads-reporting",
    },
    {
      icon: { light: AudienceIcon, dark: AudienceDarkIcon },
      label: "Audiences",
      id: "Audiences",
      path: "/audiences",
    },
    {
      icon: { light: ADSettingsIcon, dark: ADSettingsDarkIcon },
      label: "Advertising settings",
      id: "Advertising settings",
      path: "/advertising-settings",
    },
    {
      icon: { light: BillsIcon, dark: BillsDarkIcon },
      label: "Billing & payments",
      id: "Billing & payments",
      path: "/billing-payments",
    },
    {
      icon: { light: EventIcon, dark: EventDarkIcon },
      label: "Events Manager",
      id: "Events Manager",
      path: "/events-manager",
    },
    {
      icon: { light: AlltoolsDarkIcon, dark: AlltoolsDarkIcon },
      label: "All tools",
      id: "All tools",
      path: "#", // special case toggle menu
    },
  ];

  // Remove this old footerItems constant
  // const footerItems = [...]

  // Create footer items based on activeItem
  const footerItems =
    activeItem === "Events Manager"
      ? [
          {
            icon: (
              <img
                src="/images/footer/BSetting.png"
                alt="Business Setting"
                className=""
              />
            ),
            label: "Business Setting",
            action: () => {},
            tooltip: "Business Setting",
          },
          {
            icon: (
              <img
                src="/images/footer/Bell.png"
                alt="Notifications"
                className=""
              />
            ),
            label: "Notifications",
            action: () => setShowNotifications(true),
            tooltip: "Notifications",
          },
          {
            icon: (
              <img src="/images/footer/Search.png" alt="Search" className="" />
            ),
            label: "Search",
            action: () => setShowSearch(true),
            tooltip: "Search",
          },
          {
            icon: <img src="/images/footer/Help.png" alt="Help" className="" />,
            label: "Help",
            action: () => setShowHelp(true),
            tooltip: "Help",
          },
          {
            icon: (
              <img src="/images/footer/Bug.png" alt="Report Bug" className="" />
            ),
            label: "Report Bug",
            action: () => setShowReportBug(true),
            tooltip: "Report Bug",
          },
        ]
      : [
          {
            icon: (
              <img
                src="/images/footer/Ad.png"
                alt="Add Account Update"
                className=""
              />
            ),
            label: "Add Account Update",
            action: () => setShowAddAccount(true),
            tooltip: "Add Account Update",
          },
          {
            icon: (
              <img
                src="/images/footer/BSetting.png"
                alt="Business Setting"
                className=""
              />
            ),
            label: "Business Setting",
            action: () => {},
            tooltip: "Business Setting",
          },
          {
            icon: (
              <img src="/images/footer/Search.png" alt="Search" className="" />
            ),
            label: "Search",
            action: () => setShowSearch(true),
            tooltip: "Search",
          },
          {
            icon: (
              <img src="/images/footer/Bug.png" alt="Report Bug" className="" />
            ),
            label: "Report Bug",
            action: () => setShowReportBug(true),
            tooltip: "Report Bug",
          },
        ];

  const handleItemClick = (item) => {
    if (item.id === "All tools") {
      setShowAllTools(!showAllTools);
    } else {
      setActiveItem(item.id);
      setShowAllTools(false);
      if (item.path && item.path !== "#") {
        startLoading();
        navigate(item.path); // 🚀 Go to the page
      }
    }
  };

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSearch && !event.target.closest(".search-dialog")) {
        setShowSearch(false);
      }
      // Removed ReportBugDialog handling - it manages its own closing
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch]); // Also remove showReportBug from dependencies
  useEffect(() => {
    const current = sidebarItems.find(
      (item) => item.path === location.pathname
    );
    if (current) {
      setActiveItem(current.id);
    } else if (location.pathname === "/detailed-report") {
      // If we're on detailed-report page, show ads-reporting as active
      setActiveItem("Ads Reporting");
    }
  }, [location.pathname]);
  return (
    <>
      <div className="relative bg-white ">
        {/* Main Sidebar - Now positioned relative to parent container */}
        <div
          className={`absolute left-0 top-0 h-full bg-white border-r border-gray-200 shadow-xl transition-all duration-300 ease-out whitespace-nowrap z-50 ${
            sidebarExpanded ? "w-64" : "w-16"
          } flex flex-col`}
          onMouseLeave={() => setSidebarExpanded(false)}
        >
          <div
            className={`flex flex-col flex-1`}
            onMouseEnter={() => setSidebarExpanded(true)}
          >
            {/* Brand Section */}
            <div className="p-3  border-gray-200">
              <div className="flex items-center gap-3">
                {!sidebarExpanded ? (
                  // Collapsed: Only logo, original size
                  <img
                    src="/meta.png"
                    alt="∞"
                    className="w-9 h-5 w-fit mb-5 mt-2"
                  />
                ) : (
                  // Expanded: Smaller logo, Meta text, Ads Manager below
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <img src="/meta.png" alt="∞" className="w-6 h-3" />
                      <span className="font-semibold text-black text-base">
                        Meta
                      </span>
                    </div>
                    <span className="text-xl font-bold text-black mt-1">
                      Ads Manager
                    </span>
                  </div>
                )}
              </div>
            </div>
            {activeItem !== "Events Manager" && (
              <>
                <SidebarItem
                  icon={
                    <img
                      src={
                        activeItem === "Notifications"
                          ? NotificationIcon
                          : NotificationDarkIcon
                      }
                      alt="Notifications"
                      width={32}
                      height={32}
                    />
                  }
                  label="Notifications"
                  tooltip="Notifications"
                  active={activeItem === "Notifications"}
                  onClick={() => {
                    setSidebarExpanded(false);
                    setShowNotifications(true);
                    setActiveItem("Notifications"); // ✅ so the active state logic works
                  }}
                  sidebarExpanded={sidebarExpanded}
                  badge={null}
                  className=""
                />

                <div className="mx-2 my-2">
                  <div className="border-b border-gray-200" />
                </div>
              </>
            )}
            {/* Account Selector */}
            {/* Conditional Section */}
            {sidebarExpanded && activeItem === "Events Manager" && (
              // Account Selector
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-medium">AD</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">
                      Adkin Digital LTD
                    </div>
                    <div className="text-xs text-gray-500">
                      ADKI DIGI Digital Media
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    className="text-gray-400 flex-shrink-0"
                  />
                </div>
              </div>
            )}
            {/* Navigation Items */}
            <div className=" py-2 ">
              {sidebarItems.slice(0, -1).map((item) => (
                <SidebarItem
                  key={item.id}
                  icon={
                    <img
                      src={
                        activeItem === item.id
                          ? item.icon.light
                          : item.icon.dark
                      }
                      alt={item.label}
                      width={32}
                      height={32}
                    />
                  }
                  label={item.label}
                  active={activeItem === item.id}
                  onClick={() => handleItemClick(item)} // ✅ pass full object, not just id
                  sidebarExpanded={sidebarExpanded}
                  badge={item.id === "Account overview" ? "2" : null}
                />
              ))}

              {/* All tools item */}
              <SidebarItem
                icon={
                  <img
                    src={AlltoolsDarkIcon}
                    alt="All tools"
                    width={32}
                    height={32}
                  />
                }
                label={sidebarItems[sidebarItems.length - 1].label}
                tooltip={sidebarItems[sidebarItems.length - 1].label}
                active={showAllTools}
                onClick={() =>
                  handleItemClick(sidebarItems[sidebarItems.length - 1])
                } // ✅ pass full object
                sidebarExpanded={sidebarExpanded}
              />
            </div>
          </div>
          {/* Footer Icons */}
          <div className={`border-t border-gray-200  flex  flex-col `}>
            {activeItem !== "Events Manager" && (
              <SidebarItem
                icon={<img src={helpIcon} alt="Help" width={10} height={10} />}
                label="Help"
                tooltip="Help"
                active={activeItem === "Help"}
                onClick={() => setShowHelp(true)}
                sidebarExpanded={sidebarExpanded}
                badge={null}
                className="bg-green-50 hover:bg-green-100 my-3 "
              />
            )}
            <div
              className={`flex my-2  ${
                sidebarExpanded
                  ? "flex-row px-6 gap-4"
                  : "flex-col items-center gap-2"
              }`}
            >
              {footerItems.map((item, index) => (
                <FooterIcon
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  onClick={item.action}
                  tooltip={sidebarExpanded ? null : item.tooltip}
                  sidebarExpanded={sidebarExpanded}
                />
              ))}
            </div>
          </div>
          <NotificationsSidebar
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
            sidebarCollapsedWidth={sidebarExpanded ? 0 : 64} // pass 64px if collapsed, 0 if expanded
          />{" "}
          {/* All Tools Menu */}
          <AllToolsMenu
            isOpen={showAllTools}
            onClose={() => setShowAllTools(false)}
            sidebarExpanded={sidebarExpanded}
          />
          <AddAccountUpdateSidebar
            isOpen={showAddAccount}
            onClose={() => setShowAddAccount(false)}
          />
        </div>

        {/* Overlay Sidebars and Dialogs - All positioned relative to parent container */}
      </div>
      <HelpSidebar isOpen={showHelp} onClose={() => setShowHelp(false)} />

      <SearchDialog isOpen={showSearch} onClose={() => setShowSearch(false)} />
      <ReportBugDialog
        isOpen={showReportBug}
        onClose={() => setShowReportBug(false)}
      />
    </>
  );
}
