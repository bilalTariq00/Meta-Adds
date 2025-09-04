"use client";

import { useState, useEffect } from "react";
import { X, Copy, ExternalLink } from "lucide-react";

export default function ShareModal({ isOpen, onClose, selectedReports, reportData, onShareConfirm }) {
  const [outsideSharing, setOutsideSharing] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  
  // Generate a unique link for the selected reports
  const generateShareLink = () => {
    const reportIds = selectedReports.join(',');
    const timestamp = Date.now();
    return `https://fb.me/share/${reportIds}/${timestamp}`;
  };

  // Update share link when modal opens or selected reports change
  useEffect(() => {
    if (isOpen && selectedReports.length > 0) {
      const newLink = generateShareLink();
      setShareLink(newLink);
    }
  }, [isOpen, selectedReports]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setLinkCopied(true);
      // Reset the copied state after 2 seconds
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  const handleDoMoreWithLinkSharing = () => {
    // This could open additional sharing options or settings
    console.log("Do more with link sharing clicked");
    // You could implement additional sharing features here
  };

  const handleShareConfirm = () => {
    // Call the parent handler with share data
    if (onShareConfirm) {
      const shareData = {
        reportIds: selectedReports,
        shareLink: shareLink,
        outsideSharing: outsideSharing,
        timestamp: new Date().toISOString()
      };
      onShareConfirm(shareData);
    }
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6">
          <h2 className="text-lg font-semibold text-gray-900">Share a link to this report</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDoMoreWithLinkSharing}
              className="px-3 py-1.5 text-sm font-medium text-purple-700 bg-purple-100 rounded-md hover:bg-purple-200 transition-colors"
            >
              Do more with link sharing
            </button>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Share with people in your business */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Share with people in your business
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              People in your business with access to the ad accounts included can view and edit this report.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-700"
              />
              <button
                onClick={handleCopyLink}
                className={`px-3 py-2 text-sm font-medium border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 transition-colors ${
                  linkCopied 
                    ? 'bg-green-100 text-green-700 border-green-300' 
                    : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Copy className="w-4 h-4" />
                {linkCopied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

          {/* Share with others */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-900">
                Share with others
              </h3>
              <button
                onClick={() => setOutsideSharing(!outsideSharing)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  outsideSharing ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    outsideSharing ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Outside link sharing is {outsideSharing ? 'on' : 'off'}. {outsideSharing ? 'Turn off' : 'Turn on'} outside link sharing to share the most recently saved version of this report with others outside of your business. They won't be able to edit your report or see changes that aren't saved.{" "}
              <button className="text-blue-600 hover:text-blue-800 underline">
                Learn more
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 pb-6">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Close
          </button>
          <button
            onClick={handleShareConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
