"use client";
import {
  X,
  ExternalLink,
  BarChart3,
  Target,
  Users,
  FileText,
  MessageSquare,
  Calendar,
  Home,
  Settings,
  Building,
  CreditCard,
  Shield,
  ShieldCheck,
  Smartphone,
  MapPin,
  Play,
  FileImage,
  MessageCircle,
  TrendingUp,
  Eye,
  Palette,
  Beaker,
  Activity,
  ShoppingCart,
  DollarSign,
  Navigation,
  Navigation2,
  PieChart,
} from "lucide-react";
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
import { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Heart = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const AllToolsMenu = ({ isOpen, onClose, sidebarExpanded }) => {
  const [shortcuts, setShortcuts] = useState([
    {
      icon: { light: AdsReportIcon, dark: AdsReportDarkIcon },
      label: "Ads Reporting",
      color: "bg-gray-100",
    },
    {
      icon: { light: EventIcon, dark: EventDarkIcon },
      label: "Events Manager",
      color: "bg-gray-100",
    },
    {
      icon: { light: Navigation, dark: Navigation2 },
      label: "Ads Manager",
      color: "bg-gray-100",
    },
    {
      icon: { light: AudienceIcon, dark: AudienceDarkIcon },
      label: "Audiences",
      color: "bg-gray-100",
    },
    {
      icon: { light: AudienceIcon, dark: AudienceDarkIcon },
      label: "Content",
      color: "bg-gray-100",
    },
    {
      icon: { light: AudienceIcon, dark: AudienceDarkIcon },
      label: "Inbox",
      color: "bg-gray-100",
    },
  ]);
  const location = useLocation();
  const navigate = useNavigate();

  const getSelectedToolFromRoute = (pathname) => {
    const routeMap = {
      "/": "Account Overview",
      "/account-overview": "Account Overview",
      "/campaigns": "Campaigns",
      "/ads-reporting": "Ads Reporting",
      "/audiences": "Audiences",
      "/advertising-settings": "Advertising Settings",
      "/billing-payments": "Billing & Payments",
      "/events-manager": "Events Manager",
    };
    return routeMap[pathname] || "Ads Manager";
  };

  const [selectedTool, setSelectedTool] = useState(() =>
    getSelectedToolFromRoute(location.pathname)
  );

  useEffect(() => {
    setSelectedTool(getSelectedToolFromRoute(location.pathname));
  }, [location.pathname]);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);
  useEffect(() => {
    setSelectedTool(getSelectedToolFromRoute(location.pathname));
  }, [location.pathname]);
  if (!isOpen) return null;

  const categories = [
    {
      title: "Manage",
      items: [
        { icon: <Home size={16} />, label: "Business support home" },
        { icon: <CreditCard size={16} />, label: "Billing & payments" },
        { icon: <Shield size={16} />, label: "Brand Rights Protection" },
        {
          icon: <ShieldCheck size={16} />,
          label: "Brand safety and suitability",
        },
        { icon: <Smartphone size={16} />, label: "Business apps" },
        { icon: <MapPin size={16} />, label: "Store locations" },
        { icon: <Settings size={16} />, label: "Business settings" },
        { icon: <Play size={16} />, label: "Get Started" },
        { icon: <FileText size={16} />, label: "Instant Forms" },
        { icon: <FileImage size={16} />, label: "Media Library" },
        { icon: <MessageCircle size={16} />, label: "WhatsApp Manager" },
      ],
    },
    {
      title: "Advertise",
      items: [
        { icon: <FileText size={16} />, label: "Ad account settings" },
        { icon: <Target size={16} />, label: "Ads" },
        { icon: <FileText size={16} />, label: "Ad limits per Page" },
        {
          icon: <Target size={16} />,
          label: "Ads Manager",
          active: selectedTool === "Ads Manager",
        },
        { icon: <Settings size={16} />, label: "Advertising settings" },
        { icon: <Users size={16} />, label: "Audiences" },
        { icon: <Settings size={16} />, label: "Automated rules" },
        { icon: <Calendar size={16} />, label: "Campaign Planner" },
        { icon: <Palette size={16} />, label: "Creative Hub" },
        { icon: <Building size={16} />, label: "Partnership Ads Hub" },
        { icon: <Calendar size={16} />, label: "Events Manager" },
      ],
    },
    {
      title: "Analyse and report",
      items: [
        { icon: <BarChart3 size={16} />, label: "Ads Reporting" },
        { icon: <Eye size={16} />, label: "Audience Insights" },
        { icon: <TrendingUp size={16} />, label: "Insights" },
        { icon: <FileText size={16} />, label: "Branded content" },
        { icon: <Palette size={16} />, label: "Creative reporting" },
        { icon: <Beaker size={16} />, label: "Experiments" },
        { icon: <Activity size={16} />, label: "Traffic analysis report" },
      ],
    },
    {
      title: "Engage audience",
      items: [
        { icon: <Calendar size={16} />, label: "Planner" },
        { icon: <MessageSquare size={16} />, label: "Inbox" },
        { icon: <Heart size={16} />, label: "Charity manager" },
        { icon: <FileText size={16} />, label: "Page posts" },
        { icon: <FileText size={16} />, label: "Content" },
        { icon: <Play size={16} />, label: "Sound Collection" },
        { icon: <Activity size={16} />, label: "Live dashboard" },
      ],
    },
    {
      title: "Sell products and services",
      items: [
        { icon: <ShoppingCart size={16} />, label: "Commerce Manager" },
        { icon: <DollarSign size={16} />, label: "Monetisation" },
      ],
    },
  ];

  const handleToolSelect = (toolName) => {
    setSelectedTool(toolName);

    // 🔹 Reorder shortcuts: move selected tool to front
    setShortcuts((prev) => {
      const clicked = prev.find((s) => s.label === toolName);
      if (!clicked) return prev; // if not in shortcuts, do nothing
      const others = prev.filter((s) => s.label !== toolName);
      return [clicked, ...others]; // move clicked to front
    });

    const routeMap = {
      "Account Overview": "/account-overview",
      Campaigns: "/campaigns",
      "Ads Reporting": "/ads-reporting",
      Audiences: "/audiences",
      "Advertising Settings": "/advertising-settings",
      "Billing & Payments": "/billing-payments",
      "Events Manager": "/events-manager",
      "Ads Manager": "/campaigns",
    };

    const route = routeMap[toolName];
    if (route) {
      navigate(route);
      onClose();
    }
  };

  return (
    <div
      ref={menuRef}
      className="absolute left-full top-0 bg-white border border-gray-200 shadow-lg z-[9999] w-[1000px] max-w-[calc(55vw-80px)] max-h-[90vh] overflow-y-auto p-1"
    >
      {/* Header */}
      <div className="px-3 py-4 top-0 bg-white z-10">
        <div className="flex items-center justify-between ">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">All tools</h3>
          </div>
          <button className="flex items-center gap-2 bg-gray-100 p-2 rounded-md hover:bg-gray-200 text-sm text-gray-700">
            <PieChart size={15} className="text-black font-bold" />
            Meta Business Suite
            <ExternalLink size={15} className="text-black font-bold" />
          </button>
        </div>
      </div>

      {/* Shortcuts */}
      <h1 className="text-sm font-bold p-3">Shortcuts</h1>
      <div className="grid grid-cols-6 gap-4">
        {shortcuts.map((item, index) => {
          const isActive = selectedTool === item.label;
          const iconSrc = isActive ? item.icon.light : item.icon.dark; // Compare with current tool
          return (
            <button
              key={index}
              onClick={() => handleToolSelect(item.label)}
              className={`flex flex-col items-center  p-3 rounded-lg transition-colors hover:bg-gray-50 ${
                isActive ? "bg-blue-50" : ""
              }`}
            >
              <div
                className={`w-12 h-12 ${
                  item.color
                } rounded-lg flex items-center justify-center ${
                  isActive ? "bg-blue-500 text-[#0A78BE]" : "text-gray-600"
                }`}
              >
                <img src={iconSrc} alt={item.label} className="p-3" />
              </div>
              <span
                className={`text-xs text-center leading-tight ${
                  isActive ? "text-[#0A78BE] font-bold" : "text-gray-700"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Categories */}
      <div className="px-6 py-5">
        <div className="grid grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <div key={index}>
              <h5 className="text-sm font-semibold text-gray-900 mb-4">
                {category.title}
              </h5>
              <div className="space-y-1">
                {category.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    onClick={() => handleToolSelect(item.label)}
                    className={`w-full flex items-center gap-3 text-left text-sm px-2 py-2 rounded-md transition-colors hover:bg-gray-50 ${
                      item.active
                        ? "text-blue-600 bg-blue-50 font-medium"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    <span
                      className={`${
                        item.active ? "text-blue-600" : "text-black"
                      }`}
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllToolsMenu;
