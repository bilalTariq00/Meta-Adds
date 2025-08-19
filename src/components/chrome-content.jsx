import { Search, Mic, Camera, Plus } from "lucide-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import { LoadingProvider } from "@/components/LoadingContext";

// Import all page components
import AccountOverview from "@/pages/AccountOverview";
import Campaigns from "@/pages/Campaigns";
import AdsReporting from "@/pages/AdsReporting";
import Audiences from "@/pages/Audiences";
import AdvertisingSettings from "@/pages/AdvertisingSettings";
import BillingPayments from "@/pages/BillingPayments";
import EventsManager from "@/pages/EventsManager";

export default function ChromeContent({ activeTab }) {
  if (activeTab.title === "Meta Ads Manager" || activeTab.type === "meta-ads") {
    return (
      <div className="h-full w-full">
        <BrowserRouter>
          <LoadingProvider>
            <Routes>
              <Route path="/*" element={<AppLayout />}>
                <Route index element={<AccountOverview />} />
                <Route path="account-overview" element={<AccountOverview />} />
                <Route path="campaigns" element={<Campaigns />} />
                <Route path="ads-reporting" element={<AdsReporting />} />
                <Route path="audiences" element={<Audiences />} />
                <Route
                  path="advertising-settings"
                  element={<AdvertisingSettings />}
                />
                <Route path="billing-payments" element={<BillingPayments />} />
                <Route path="events-manager" element={<EventsManager />} />
              </Route>
            </Routes>
          </LoadingProvider>
        </BrowserRouter>
      </div>
    );
  }

  if (activeTab.type === "google") {
    return (
      <div className="flex flex-col items-center justify-start pt-20 px-5 gap-5">
        <div className="text-8xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent mb-5 pb-5">
          Google
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 flex items-center px-4 py-3 w-full max-w-lg shadow-sm">
          <Search size={18} className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search Google or type a URL"
            className="flex-1 outline-none text-base text-gray-700"
          />

          <svg width="0" height="0">
            <defs>
              <linearGradient
                id="googleGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop stopColor="#4285F4" offset="0%" />
                <stop stopColor="#EA4335" offset="25%" />
                <stop stopColor="#FBBC05" offset="50%" />
                <stop stopColor="#34A853" offset="75%" />
              </linearGradient>
            </defs>
          </svg>

          <Mic
            size={19}
            strokeWidth={2}
            style={{ stroke: "url(#googleGradient)" }}
            className="mx-2"
          />
          <Camera
            size={18}
            strokeWidth={2}
            style={{ stroke: "url(#googleGradient)" }}
            className="mx-2"
          />

          {/* <button className="bg-gray-100 hover:bg-gray-200 rounded-2xl px-3 py-1.5 text-sm flex items-center gap-2 ml-2 transition-colors">
            <Search size={15} strokeWidth={2} /> AI Mode
          </button> */}
        </div>

        <div className="flex gap-5 mt-8">
          <div className="flex flex-col items-center gap-2 cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-gray-100 shadow-sm"></div>
            <span className="text-xs text-gray-600">CreepJS</span>
          </div>
          <div className="flex flex-col items-center gap-2 cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-gray-100 shadow-sm"></div>
            <span className="text-xs text-gray-600">v0</span>
          </div>
          <div className="flex flex-col items-center gap-2 cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-gray-100 shadow-sm"></div>
            <span className="text-xs text-gray-600">Techlife</span>
          </div>
          <div className="flex flex-col items-center gap-2 cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-gray-100 shadow-sm"></div>
            <span className="text-xs text-gray-600">Web Store</span>
          </div>
          <div className="flex flex-col items-center gap-2 cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-yellow-100 shadow-sm flex items-center justify-center">
              <Plus size={24} className="text-gray-600" />
            </div>
            <span className="text-xs text-gray-600">Add shortcut</span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="mt-5 p-5 border border-dashed border-gray-300 bg-gray-50 text-gray-500 italic text-center w-4/5 rounded-lg">
          <h2 className="text-lg font-medium text-gray-700 mb-2">
            {activeTab.title}
          </h2>
          <p>{activeTab.content}</p>
        </div>
      </div>
    );
  }
}
