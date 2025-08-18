import { useState } from "react";

export default function Tooltip({ children, content, id }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
      {show && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-[9999]">
          <div className="bg-white rounded-lg shadow-lg px-3 py-2 text-xs text-gray-900 whitespace-nowrap">
            {content}
          </div>
          {/* <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-px border-4 border-transparent border-t-gray-200"></div> */}
        </div>
      )}
    </div>
  );
}
