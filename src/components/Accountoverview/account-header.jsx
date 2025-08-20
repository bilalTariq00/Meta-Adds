"use client";

import { Info } from "lucide-react";
import Tooltip from "../Tooltip";
import userInfo from "@/assets/icons/userOverview.png";
import { useNavigate } from "react-router-dom";
import DetailedTooltip from "../DetailedTooltip";

export function AccountHeader() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between mb-4">
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
            <p
              className="text-sm font-light text-[#0A78BE] cursor-pointer hover:underline"
              onClick={() => navigate("/campaigns")}
            >
              1 active campaign
            </p>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="text-xs text-[#1C2B33A6]">
          Amount spent in last seven days:{" "}
          <span className="font-semibold text-black">$9.33</span>{" "}
          <DetailedTooltip content="The estimated total amount of money spent on your ads">
            <Info size={14} className="inline text-gray-400 " />
          </DetailedTooltip>{" "}
          | 0% spent in learning phase{" "}
          <DetailedTooltip content='The estimated percentage of money spent on your ads that have the "Learning" or "Learning limited" status in the Delivery column in Ads Manager. Learn More'>
            <Info size={14} className="inline text-gray-400 " />
          </DetailedTooltip>
        </div>
      </div>
    </div>
  );
}
