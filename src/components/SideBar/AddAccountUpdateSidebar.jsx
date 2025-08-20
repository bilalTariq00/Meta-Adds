"use client";

import React from "react";
import { Lightbulb, X } from "lucide-react";

const AddAccountUpdateSidebar = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute left-full top-0 bg-white border border-gray-200 shadow-lg z-[9999] w-[1000px] max-w-[calc(36vw-80px)] max-h-[90vh] h-full overflow-y-auto p-1">
      {" "}
      <div className="p-4 ">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-gray-900">
            Add account Update
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
      <div className="">
        <div className="space-y-4">
          <div className="pl-4 pr-2">
            <h4 className="font-medium mb-2 text-[#1C2B33A6]">
              Updates for Adkin Digital
            </h4>
            <p className="text-[#1C2B33A6] whitespace-normal ">
              Learn how your ad accounnt and capaigns may changes as platform
              policies and government regulations evolve.
            </p>
          </div>

          {/* <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Recent Updates</h4>
            {[
              "Payment method updated",
              "Billing preferences modified",
              "Notification settings changed",
              "Account permissions updated",
            ].map((update, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{update}</span>
              </div>
            ))}
          </div> */}
          <div className="flex flex-col justify-center items-center h-full">
            <img
              src="/images/footer/Bulb.png"
              alt="lightbulb"
              className="w-40 h-40 mt-10 object-contain text-gray-400"
            />
            <h1 className="font-bold text-sm ">No updates </h1>
            <p className="text-xs text-[#1C2B33A6]">
              When there are updates you will find them here.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAccountUpdateSidebar;
