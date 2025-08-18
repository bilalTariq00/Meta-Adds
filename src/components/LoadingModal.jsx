// src/components/LoadingModal.jsx
import React from "react";

const LoadingModal = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-md shadow-lg p-6 flex flex-col items-center gap-4 min-w-lg">
          <p className="text-sm text-gray-700">Loading...</p>
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        {/* Loading text */}
      
      </div>
    </div>
  );
};

export default LoadingModal;
