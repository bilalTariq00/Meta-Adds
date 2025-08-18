"use client";

import { Info } from "lucide-react";
import Tooltip from "../Tooltip";
import userInfo from "@/assets/icons/userOverview.png";

export function AccountHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray flex items-center justify-center">
            <img
              src={userInfo || "/placeholder.svg"}
              alt=""
              className="w-6 h-4"
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Adkin Digital
            </h1>
            <p className="text-sm text-blue-600">1 active campaign</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right text-sm text-gray-600">
          Amount spent in last seven days:{" "}
          <span className="font-semibold">$9.33</span>{" "}
          <Tooltip content="Information about spending" id="spending-info">
            <Info size={14} className="inline text-gray-400 " />
          </Tooltip>{" "}
          | 0% spent in learning phase{" "}
          <Tooltip
            content="Information about learning phase"
            id="learning-info"
          >
            <Info size={14} className="inline text-gray-400 " />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
