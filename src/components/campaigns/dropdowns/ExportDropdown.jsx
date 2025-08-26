"use client";

import React, { useState } from "react";
import { Calendar, Link } from "lucide-react";

export default function ExportDropdown({ children, onSelect }) {
  const [open, setOpen] = useState(false);

  const exportOptions = [
    { label: "Export as .csv", type: "export" },
    { label: "Export as .xlsx", type: "export" },
    { label: "Customise export", type: "export" },
    { label: "Schedule export", type: "action", icon: Calendar },
    { label: "Share table link", type: "action", icon: Link },
  ];

  return (
    <div className="relative">
      <div onClick={() => setOpen((v) => !v)}>{children}</div>
      {open && (
        <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-20">
          <div className="py-1">
            {exportOptions.map((option, index) => {
              const Icon = option.icon;
              const isLastExport = index === 2; // Last export option before actions

              return (
                <React.Fragment key={option.label}>
                  <button
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                    onClick={() => {
                      onSelect?.(option.label);
                      setOpen(false);
                    }}
                  >
                    {Icon && <Icon className="w-4 h-4 text-gray-500" />}
                    <span>{option.label}</span>
                  </button>
                  {isLastExport && (
                    <div className="border-t border-gray-200 my-1" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
