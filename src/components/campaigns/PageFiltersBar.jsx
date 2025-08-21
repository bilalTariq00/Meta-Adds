"use client";

import React, { useState } from "react";
import {
  Search as SearchIcon,
  Calendar as CalendarIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Folder,
  Plus,
  MailOpen,
  ActivityIcon,
  Send,
  SlidersHorizontal,
} from "lucide-react";

function Chip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-2 bg-white border border-gray-300 px-3 py-1.5 rounded-full text-sm shadow-sm">
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:bg-gray-100 rounded-full p-0.5"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </span>
  );
}

export default function PageFiltersBar({
  chips,
  setChips,
  search,
  setSearch,
  filters,
  setFilters,
  onOpenSave,
}) {
  const [showSearch, setShowSearch] = useState(false);

  const addChipFromSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    setChips((c) => [...c, search.trim()]);
    setSearch("");
  };

  const selectQuick = (key) => {
    setFilters((f) => ({
      ...f,
      allAds: key === "allAds",
      hadDelivery: key === "hadDelivery",
      actions: key === "actions",
      active: key === "active",
    }));
  };

  return (
    <div className="bg-transparent px-2 ">
      {/* Top row: search icon, quick buttons, Save edits */}
      <div className="flex items-center gap-2 px-1 py-2">
        <button
          onClick={() => setShowSearch((v) => !v)}
          className={`hover:bg-[#C3DCF5] p-3 rounded-sm border ${
            showSearch
              ? " border-[#0A78BE] font-bold text-[#0A78BE]"
              : "bg-white border-gray-300"
          }`}
        >
          <img
            src="/images/campaigns/search.png"
            alt="All Ads"
            className="w-4 h-4"
          />
        </button>
        <div className="border-l border-gray-300 h-8 mx-2"></div>

        <button
          onClick={() => selectQuick("allAds")}
          className={`hover:bg-[#C3DCF5] flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm border text-sm ${
            filters?.allAds
              ? " border-[#0A78BE] font-bold text-[#0A78BE]"
              : "bg-white border-gray-300 text-gray-700"
          }`}
        >
          <img
            src={
              filters?.allAds
                ? "/images/campaigns/AllAdsDark.png"
                : "/images/campaigns/AllAds.png"
            }
            alt="All Ads"
            className="w-5 h-4"
          />
          All ads
        </button>

        <button
          onClick={() => selectQuick("hadDelivery")}
          className={`hover:bg-[#C3DCF5] flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm border text-sm ${
            filters?.hadDelivery
              ? " border-[#0A78BE] font-bold text-[#0A78BE]"
              : "bg-white border-gray-300 text-gray-700"
          }`}
        >
          <img
            src={
              filters?.hadDelivery
                ? "/images/campaigns/DeliveryDark.png"
                : "/images/campaigns/Delivery.png"
            }
            alt="Had Delivery"
            className="w-5 h-4"
          />
          Had delivery
        </button>

        <button
          onClick={() => selectQuick("actions")}
          className={`hover:bg-[#C3DCF5] flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm border text-sm ${
            filters?.actions
              ? " border-[#0A78BE] font-bold text-[#0A78BE]"
              : "bg-white border-gray-300 text-gray-700"
          }`}
        >
          <img
            src={
              filters?.actions
                ? "/images/campaigns/ActionDark.png"
                : "/images/campaigns/Actions.png"
            }
            alt="Actions"
            className="w-5 h-4"
          />
          Actions
        </button>

        <button
          onClick={() => selectQuick("active")}
          className={`hover:bg-[#C3DCF5] flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm border text-sm ${
            filters?.active
              ? " border-[#0A78BE] font-bold text-[#0A78BE]"
              : "bg-white border-gray-300 text-gray-700"
          }`}
        >
          <img
            src={
              filters?.active
                ? "/images/campaigns/ActiveDark.png"
                : "/images/campaigns/ActiveAds.png"
            }
            alt="Active Ads"
            className="w-5 h-4"
          />
          Active ads
        </button>

        <button
          onClick={() => setFilters((f) => ({ ...f, more: !f.more }))}
          className={`flex items-center justify-center gap-2  px-3 py-2.5 rounded-sm text-sm hover:bg-gray-200 ${
            filters?.more ? "bg-gray-200  font-bold " : "  text-gray-700"
          }`}
        >
          <Plus size={20} />
          See more
        </button>

        <button
          onClick={onOpenSave}
          className="ml-auto px-3 py-2 text-gray-700  border border-gray-300 rounded-sm text-sm"
        >
          Save edits
        </button>
        <button
          className="p-2 rounded-sm border  text-gray-700 border-gray-300"
          title="settings"
        >
          <SlidersHorizontal size={20} />
        </button>
      </div>

      {/* Chips row */}
      {/* <div className="px-1 pb-2 flex items-center gap-2 flex-wrap">
        {chips.map((c, i) => (
          <Chip
            key={i}
            label={c}
            onRemove={() => setChips(chips.filter((_, idx) => idx !== i))}
          />
        ))}
      </div> */}

      {/* Toggleable search bar below, like screenshot */}
      {showSearch && (
        <div className="px-1 pb-2">
          <form onSubmit={addChipFromSearch} className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search to filter by name, ID or metrics"
              className="w-full px-3 py-2 rounded-sm border border-gray-300 bg-white text-sm"
            />
          </form>
        </div>
      )}

      {/* Date range button + dropdown */}
    </div>
  );
}
