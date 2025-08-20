import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import google from "/images/google.png";

export default function SearchBar() {
  const [url, setUrl] = useState(window.location.href);

  useEffect(() => {
    const updateUrl = () => setUrl(window.location.href);

    window.addEventListener("popstate", updateUrl);
    window.addEventListener("hashchange", updateUrl);

    return () => {
      window.removeEventListener("popstate", updateUrl);
      window.removeEventListener("hashchange", updateUrl);
    };
  }, []);

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
          value={url}
          readOnly
        />
        <Star size={16} className="text-gray-500" />
      </div>
    </div>
  );
}
