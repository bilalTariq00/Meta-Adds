"use client"

import { useState } from "react"
import { Search, Shield } from "lucide-react"

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("business.facebook.com/adsmanager")

  return (
    <div className="flex-1 max-w-2xl mx-4">
      <div className="relative">
        <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
          {/* Security Icon */}
          <Shield size={16} className="text-gray-500 mr-2" />

          {/* URL Input */}
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="flex-1 text-sm text-gray-700 outline-none bg-transparent"
            placeholder="Search Google or type a URL"
          />

          {/* Search Icon */}
          <Search size={16} className="text-gray-400 ml-2" />
        </div>
      </div>
    </div>
  )
}
