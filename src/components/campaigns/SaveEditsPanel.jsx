"use client";

import { useState } from "react";
import { X, Trash2, Settings, ChevronDown, Plus } from "lucide-react";
import ColumnPreferencesDropdown from "@/components/campaigns/column-preferences-dropdown";

export default function SaveEditsPanel({ open, onClose }) {
  const [name, setName] = useState("Active ads");
  const [description, setDescription] = useState("");
  const [dopen, setdOpen] = useState(false);
  const [value, setValue] = useState("only-you");
  const [selectedColumnPreset, setSelectedColumnPreset] =
    useState("performance");

  if (!open) return null;

  const options = [
    {
      id: "only-you",
      label: "Only you",
      description: "Only you can see and edit this view.",
    },
    {
      id: "business",
      label: "Everyone with access to this business portfolio",
      description:
        "Everyone with access to this business portfolio can see and save a copy of this view.",
    },
  ];

  return (
    <div className="w-[380px] bg-white border-l border-gray-200 h-full flex flex-col shrink-0 max-h-[57vh] overflow-y-auto">
      <div className="p-3 border-b border-gray-300 flex items-center justify-between">
        <div className="font-semibold">Save edits</div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-4 overflow-auto">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <div className="relative flex border border-gray-300 rounded items-center">
            <input
              placeholder="Active Ads"
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-3 py-2 text-sm pr-16 focus:outline-none"
              value={name}
              maxLength={100}
            />
            <span
              className={`absolute right-3 text-xs ${
                name.length >= 100 ? "text-red-500" : "text-gray-500"
              } pointer-events-none`}
            >
              {name.length}/100
            </span>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <div className="relative border border-gray-300 rounded">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              maxLength={350}
              className="w-full px-3 py-2 text-sm pr-16 focus:outline-none resize-none"
              placeholder="Describe what this view is about."
            />
            <span
              className={`absolute bottom-2 right-3 text-xs ${
                description.length >= 350 ? "text-red-500" : "text-gray-500"
              }`}
            >
              {description.length}/350
            </span>
          </div>
        </div>

        {/* Access */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Access</label>

          <button
            onClick={() => setdOpen(!dopen)}
            className="w-full flex justify-between items-center border border-gray-300 rounded px-3 py-2 text-sm"
          >
            {options.find((opt) => opt.id === value)?.label}
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {dopen && (
            <div className="mt-3 w-full border border-gray-200 rounded-md shadow-2xl p-2 bg-white absolute">
              {options.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => {
                    setValue(opt.id);
                    setdOpen(false);
                  }}
                  className={`flex items-start gap-2 px-3 py-2 cursor-pointer ${
                    value === opt.id ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    checked={value === opt.id}
                    onChange={() => setValue(opt.id)}
                    className="mt-1"
                  />
                  <div>
                    <p className="text-sm font-medium">{opt.label}</p>
                    <p className="text-xs text-gray-500">{opt.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-b border-gray-300 mt-[-10px]"></div>

        {/* Filters */}
        <div>
          <div className="text-sm font-bold mb-1">Filters</div>
          <button className="text-sm text-black hover:bg-gray-200 p-2 rounded-md flex gap-2 items-center justify-between">
            <Plus size={14} /> Add
          </button>
        </div>

        {/* Columns - Now using the reusable component */}
        <div>
          <div className="text-sm font-bold mb-1">Columns</div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-full max-w-76">
              <ColumnPreferencesDropdown
                value={selectedColumnPreset}
                onChange={setSelectedColumnPreset}
                placeholder="Columns: Performance"
              />
            </div>
            <button className="p-2 border rounded">
              <Settings className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <select className="flex-1 border rounded px-3 py-2 text-sm">
              <option>Sorting: Delivery</option>
            </select>
            <button className="p-2 border rounded">↑</button>
          </div>
        </div>

        {/* Breakdowns */}
        <div>
          <div className="text-sm font-semibold mb-1">Breakdowns</div>
          <select className="w-full border rounded px-3 py-2 text-sm">
            <option>Breakdowns: None selected</option>
          </select>
        </div>

        {/* Attribution settings */}
        <div>
          <div className="text-sm font-semibold mb-1">Attribution settings</div>
          <button className="text-sm text-blue-600 hover:underline">
            + Add comparison
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-gray-300 flex items-center gap-2">
        <button className="p-2 border rounded text-gray-700">
          <Trash2 className="w-4 h-4" />
        </button>
        <button className="ml-auto px-3 py-1.5 border rounded text-sm">
          Save copy
        </button>
        <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm">
          Save edits
        </button>
      </div>
    </div>
  );
}
