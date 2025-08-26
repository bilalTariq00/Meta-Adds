import {
  ChevronDown,
  ChevronRight,
  Plus,
  Image,
  FileText,
  BarChart3,
  Link2,
  Navigation,
  Share,
  Share2,
  ScreenShare,
  ShareIcon,
  Share2Icon,
  LucideShare,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

export default function AdsReportingDropdown({ children, onSelect }) {
  const [open, setOpen] = useState(false);
  const [savedReportsHover, setSavedReportsHover] = useState(false);
  const [templatesHover, setTemplatesHover] = useState(false);
  const [templateCategory, setTemplateCategory] = useState(null);
  const [savedReportsPosition, setSavedReportsPosition] = useState("right");
  const [templatesPosition, setTemplatesPosition] = useState("right");
  const savedReportsRef = useRef(null);
  const templatesRef = useRef(null);

  const savedReports = [
    { name: "Untitled report", lastViewed: "Last viewed 7 days ago" },
    { name: "Untitled report", lastViewed: "Last viewed 7 days ago" },
  ];

  const templateCategories = {
    basic: ["All levels", "Campaign", "Ad set", "Ad"],
    objective: [],
    demographics: [
      "Age",
      "Gender",
      "Age and gender",
      "Country",
      "Region",
      "DMA region",
      "Business locations",
    ],
    delivery: [
      "Placement",
      "Placement and device",
      "Platform",
      "Platform and device",
      "Time of Day (Ad Account)",
      "Time of day (viewer)",
    ],
    actions: [
      "Canvas component",
      "Conversion device",
      "Product ID",
      "Carousel card",
      "Reactions",
      "Video view type",
      "Video sound",
    ],
  };

  const checkPosition = (ref, setPosition) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const menuWidth = 290; // Approximate width of hover menus

      // If there's not enough space on the right, position on the left
      if (rect.right + menuWidth > windowWidth) {
        setPosition("left");
      } else {
        setPosition("right");
      }
    }
  };

  useEffect(() => {
    if (savedReportsHover) {
      checkPosition(savedReportsRef, setSavedReportsPosition);
    }
  }, [savedReportsHover]);

  useEffect(() => {
    if (templatesHover) {
      checkPosition(templatesRef, setTemplatesPosition);
    }
  }, [templatesHover]);

  const handleMouseEnter = (type) => {
    if (type === "savedReports") {
      setSavedReportsHover(true);
      setTemplatesHover(false);
      setTemplateCategory(null);
    } else if (type === "templates") {
      setTemplatesHover(true);
      setSavedReportsHover(false);
      setTemplateCategory(null);
    }
  };

  const handleMouseLeave = () => {
    // Add a small delay to prevent flickering when moving between elements
    setTimeout(() => {
      setSavedReportsHover(false);
      setTemplatesHover(false);
      setTemplateCategory(null);
    }, 100);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-2 flex items-center bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors"
      >
        {children} <ChevronDown className="ml-2 w-4 h-4" />
      </button>

      {open && (
        <div className="absolute top-full right-0  bg-white border border-gray-200 rounded-md shadow-lg z-50 w-80">
          <div className="p-4">
            <h3 className="font-semibold text-sm text-gray-900 ">
              Ads Reporting
            </h3>

            {/* Create new report */}
            <button
              onClick={() => {
                onSelect?.({ type: "create" });
                setOpen(false);
              }}
              className="w-full flex items-center p-3 text-sm hover:bg-gray-50 rounded text-left"
            >
              <Plus className="w-4 h-4 mr-3 text-gray-600" />
              <span>Create new report</span>
            </button>

            {/* View ad creative performance */}
            <button
              onClick={() => {
                onSelect?.({ type: "creative-performance" });
                setOpen(false);
              }}
              className="w-full flex items-center text-sm p-3 hover:bg-gray-50 rounded text-left"
            >
              <Image className="w-4 h-4 mr-3 text-gray-600" />
              <span>View ad creative performance</span>
            </button>

            {/* Access saved reports - with hover menu */}
            <div
              ref={savedReportsRef}
              className="relative"
              onMouseEnter={() => handleMouseEnter("savedReports")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="w-full flex text-sm items-center justify-between p-3 hover:bg-gray-50 rounded text-left">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-3 text-gray-600" />
                  <span>Access saved reports</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              {savedReportsHover && (
                <div
                  className={`absolute top-0 ml-1 bg-white border border-gray-200 rounded-md shadow-lg w-72 z-60 ${
                    savedReportsPosition === "right"
                      ? "left-full"
                      : "right-full mr-1 ml-0"
                  }`}
                  onMouseEnter={() => setSavedReportsHover(true)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="px-4 py-1">
                    {savedReports.map((report, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          onSelect?.({ type: "saved-report", value: report });
                          setOpen(false);
                        }}
                        className="w-full text-left  p-1 hover:bg-gray-50 rounded "
                      >
                        <div className="font-medium text-sm text-gray-900">
                          {report.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {report.lastViewed}
                        </div>
                      </button>
                    ))}

                    <button
                      onClick={() => {
                        onSelect?.({ type: "view-all-reports" });
                        setOpen(false);
                      }}
                      className="w-full flex text-sm items-center p-1 hover:bg-gray-50 rounded mt-2 text-gray-600"
                    >
                      <LucideShare className="w-4 h-4 mr-2" />
                      <span>View all reports</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Try report templates - with hover menu */}
            <div
              ref={templatesRef}
              className="relative"
              onMouseEnter={() => handleMouseEnter("templates")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="w-full text-sm flex items-center justify-between p-3 hover:bg-gray-50 rounded text-left">
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-3 text-gray-600" />
                  <span>Try report templates</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              {templatesHover && (
                <div
                  className={`absolute top-0 ml-1 bg-white border border-gray-200 rounded-md shadow-lg w-64 z-60 max-h-46 overflow-y-auto ${
                    templatesPosition === "right"
                      ? "left-full"
                      : "right-full mr-1 ml-0"
                  }`}
                  onMouseEnter={() => setTemplatesHover(true)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="px-4">
                    {/* Basic Section */}
                    <div className="">
                      <div className="py-2 text-sm font-semibold text-gray-900 border-b border-gray-100 ">
                        Basic
                      </div>
                      <div className="space-y-1">
                        {templateCategories.basic.map((item) => (
                          <button
                            key={item}
                            onClick={() => {
                              onSelect?.({
                                type: "template",
                                category: "basic",
                                value: item,
                              });
                              setOpen(false);
                            }}
                            className="w-full text-left text-xs px-2 hover:bg-gray-50 rounded "
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Objective Section */}
                    <div className="">
                      <div className="py-2 font-semibold text-sm text-gray-900 border-b border-gray-100">
                        Objective
                      </div>
                      <div className="space-y-1">
                        {templateCategories.basic.map((item) => (
                          <button
                            key={item}
                            onClick={() => {
                              onSelect?.({
                                type: "template",
                                category: "basic",
                                value: item,
                              });
                              setOpen(false);
                            }}
                            className="w-full text-left text-xs  px-2 hover:bg-gray-50 rounded "
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Demographics Section */}
                    <div className="">
                      <div className=" font-semibold text-sm text-gray-900 border-b border-gray-100 mb-2">
                        Demographics
                      </div>
                      <div className="space-y-1">
                        {templateCategories.demographics.map((item) => (
                          <button
                            key={item}
                            onClick={() => {
                              onSelect?.({
                                type: "template",
                                category: "demographics",
                                value: item,
                              });
                              setOpen(false);
                            }}
                            className="w-full text-left text-xs px-2 hover:bg-gray-50 rounded "
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Section */}
                    <div className="">
                      <div className=" text-sm font-semibold text-gray-900 border-b border-gray-100 mb-2">
                        Delivery
                      </div>
                      <div className="space-y-1">
                        {templateCategories.delivery.map((item) => (
                          <button
                            key={item}
                            onClick={() => {
                              onSelect?.({
                                type: "template",
                                category: "delivery",
                                value: item,
                              });
                              setOpen(false);
                            }}
                            className="w-full text-left text-xs px-2 hover:bg-gray-50 rounded "
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Actions Section */}
                    <div className="">
                      <div className="text-sm font-semibold text-gray-900 border-b border-gray-100 mb-2">
                        Actions
                      </div>
                      <div className="space-y-1">
                        {templateCategories.actions.map((item) => (
                          <button
                            key={item}
                            onClick={() => {
                              onSelect?.({
                                type: "template",
                                category: "actions",
                                value: item,
                              });
                              setOpen(false);
                            }}
                            className="w-full text-left text-xs px-2 hover:bg-gray-50 rounded "
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sample data table at bottom */}
        </div>
      )}
    </div>
  );
}

// Example usage
