import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Star } from "lucide-react";
import google from "/images/google.png";

export default function SearchBar() {
  const location = useLocation();
  const [displayUrl, setDisplayUrl] = useState("");

  useEffect(() => {
    // Create a more realistic URL display based on the current route
    const baseUrl = "https://business.facebook.com/adsmanager";

    // Map your routes to more realistic URLs
    const routeToUrl = {
      "/": `${baseUrl}/manage/campaigns`,
      "/account-overview": `${baseUrl}/manage/overview`,
      "/campaigns": `${baseUrl}/manage/campaigns`,
      "/ads-reporting": `${baseUrl}/manage/ads/reports`,
      "/audiences": `${baseUrl}/manage/audiences`,
      "/advertising-settings": `${baseUrl}/settings`,
      "/billing-payments": `${baseUrl}/billing`,
      "/events-manager": `${baseUrl}/events`,
    };

    // Get the mapped URL or use the current path as fallback
    const mappedUrl =
      routeToUrl[location.pathname] || `${baseUrl}${location.pathname}`;

    // Add query parameters if they exist
    const fullUrl = location.search
      ? `${mappedUrl}${location.search}`
      : mappedUrl;

    setDisplayUrl(fullUrl);
  }, [location]);

  return (
    <div className="flex-1 px-2">
      <div className="bg-gray-100 rounded-full flex items-center px-3 py-1.5 border border-gray-200 shadow-inner">
        <img
          src={google}
          alt="icon"
          className="bg-white rounded-full p-1 w-6 h-6"
        />
        <input
          type="text"
          className="flex-1 bg-transparent outline-none text-sm text-gray-700 px-2"
          value={displayUrl}
          readOnly
        />
        <Star size={16} className="text-gray-500" />
      </div>
    </div>
  );
}
