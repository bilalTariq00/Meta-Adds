"use client";

import React, { useState } from "react";

const presets = {
  "Recently used": ["Performance"],
  Popular: ["Performance and clicks", "Engagement", "Delivery"],
  Other: ["Video", "App installs", "Leads"],
};

export default function ColumnPresetsDropdown({ children, onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div onClick={() => setOpen((v) => !v)}>{children}</div>
      {open && (
        <div className="absolute right-0 mt-1 w-80 bg-white border border-gray-200 rounded-md shadow p-2 z-20">
          {Object.entries(presets).map(([group, items]) => (
            <div key={group} className="mb-2 last:mb-0">
              <div className="text-xs text-gray-500 px-2 py-1">{group}</div>
              {items.map((label) => (
                <button
                  key={label}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded"
                  onClick={() => {
                    onSelect?.(label);
                    setOpen(false);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
