"use client";

import React, { useState } from "react";
import {
  Chrome,
  RectangleGoggles,
  Search,
  Star,
  TowerControl,
} from "lucide-react";
import google from "/images/google.png";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState(
    "https://adsmanager.facebook.com/adsmanager/manage/accounts?nav_source=fb4b&act=24223661240661184"
  );

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex-1 px-2">
      <div className="bg-gray-100 rounded-full flex items-center px-3 py-1.5 border border-gray-200 shadow-inner">
        <img
          src={google}
          alt="icon"
          className="text-gray-500 bg-white rounded-full p-1 w-6 h-6"
        />
        <input
          type="text"
          placeholder="Search Google or type a URL"
          className="flex-1 bg-transparent outline-none text-sm text-gray-700 px-2"
          value={inputValue}
          onChange={handleChange}
        />
        <Star size={16} className="text-gray-500" />
      </div>
    </div>
  );
}
