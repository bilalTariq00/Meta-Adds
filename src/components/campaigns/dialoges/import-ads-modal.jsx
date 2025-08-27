"use client";

import React from "react";

import { useState } from "react";
import { X, ImageIcon, Video, FileText } from "lucide-react";

export default function ImportAdsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("File");
  const [selectedOption, setSelectedOption] = useState("text-excel");
  const [uploadedFile, setUploadedFile] = useState();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);

  if (!isOpen) return null;

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedImages(files);
  };

  const removeImage = (index) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedVideos(files);
  };

  const removeVideo = (index) => {
    setUploadedVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const renderFileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 ">
        <div className="flex items-center space-x-3">
          <input
            type="radio"
            id="text-excel"
            name="import-method"
            value="text-excel"
            checked={selectedOption === "text-excel"}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-4 h-4 text-blue-600"
          />
          <label
            htmlFor="text-excel"
            className="text-sm font-medium text-gray-900"
          >
            Text or Excel file
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="radio"
            id="copy-paste"
            name="import-method"
            value="copy-paste"
            checked={selectedOption === "copy-paste"}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-4 h-4 text-blue-600"
          />
          <label
            htmlFor="copy-paste"
            className="text-sm font-medium text-gray-900"
          >
            Copy and paste
          </label>
        </div>
      </div>

      {selectedOption === "text-excel" && (
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            Select a text or Excel file.{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Learn more
            </a>
          </div>

          {!uploadedFile ? (
            <div className=" border-gray-300 rounded-lg  ">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".csv,.xlsx,.xls,.txt"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded cursor-pointer transition-colors"
              >
                <FileText className="w-4 h-4" />
                Choose File
              </label>
            </div>
          ) : (
            <div className="border border-gray-300    ">
              <h1 className="text-xs  border-b px-3 py-3 ">File</h1>
              <div className="flex items-center justify-between p-4">
                <div>
                  <div className=" text-xs text-gray-900">
                    {uploadedFile.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round(uploadedFile.size / 1024)} KB
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {selectedOption === "copy-paste" && (
        <div className="space-y-4">
          <div className="text-sm text-gray-600">Copy and paste from Excel</div>
          <textarea
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Paste your data here..."
          />
        </div>
      )}
    </div>
  );

  const renderImagesTab = () => (
    <div className="space-y-6">
      <div className="text-sm text-gray-600">Select one or more images.</div>

      {uploadedImages.length === 0 ? (
        <div>
          <input
            type="file"
            id="image-upload"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
          <label
            htmlFor="image-upload"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded cursor-pointer transition-colors"
          >
            <ImageIcon className="w-4 h-4" />
            Choose Images
          </label>
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg">
          <h1 className="text-xs border-b px-3 py-2">Images</h1>
          <div className="divide-y">
            {uploadedImages.map((img, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 text-xs"
              >
                <div>
                  <div className="text-gray-900">{img.name}</div>
                  <div className="text-gray-500">
                    {Math.round(img.size / 1024)} KB
                  </div>
                </div>
                <button
                  onClick={() => removeImage(idx)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderVideosTab = () => (
    <div className="space-y-6">
      <div className="text-sm text-gray-600">
        Select up to ten videos. Each video can be up to 10 MB.
      </div>

      {uploadedVideos.length === 0 ? (
        <div>
          <input
            type="file"
            id="video-upload"
            className="hidden"
            accept="video/*"
            multiple
            onChange={handleVideoUpload}
          />
          <label
            htmlFor="video-upload"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded cursor-pointer transition-colors"
          >
            <Video className="w-4 h-4" />
            Choose Videos
          </label>
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg">
          <h1 className="text-xs border-b px-3 py-2">Videos</h1>
          <div className="divide-y">
            {uploadedVideos.map((vid, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 text-xs"
              >
                <div>
                  <div className="text-gray-900">{vid.name}</div>
                  <div className="text-gray-500">
                    {Math.round(vid.size / 1024)} KB
                  </div>
                </div>
                <button
                  onClick={() => removeVideo(idx)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
          <h2 className=" font-semibold text-gray-900">Import ads</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex space-x-8 border-b border-gray-200 mb-6">
            {["File", "Images", "Videos"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="">
            {activeTab === "File" && renderFileTab()}
            {activeTab === "Images" && renderImagesTab()}
            {activeTab === "Videos" && renderVideosTab()}
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-2 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            Close
          </button>
          <button className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">
            Import
          </button>
        </div>
      </div>
    </div>
  );
}
