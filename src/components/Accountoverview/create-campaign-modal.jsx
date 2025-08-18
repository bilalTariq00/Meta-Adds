"use client";

import { useState, useEffect } from "react";
import {
  X,
  ChevronDown,
  FileText,
  Users,
  MousePointer,
  MessageCircle,
  Filter,
  Smartphone,
  ShoppingBag,
  Grid3X3,
  FileImage,
} from "lucide-react";

export function CreateCampaignModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("create-campaign");
  const [selectedObjective, setSelectedObjective] = useState("");
  const [hoveredObjective, setHoveredObjective] = useState(null);
  const [showBuyingTypeDropdown, setShowBuyingTypeDropdown] = useState(false);
  const [selectedBuyingType, setSelectedBuyingType] = useState("Auction");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [showCampaignDropdown, setShowCampaignDropdown] = useState(false);
  const [showAdSetDropdown, setShowAdSetDropdown] = useState(false);
  const [showAdDropdown, setShowAdDropdown] = useState(false);
  const [selectedAdSetOption, setSelectedAdSetOption] =
    useState("Create ad set");
  const [selectedAdOption, setSelectedAdOption] = useState("Create ad");
  const [adSetName, setAdSetName] = useState("");
  const [adName, setAdName] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState("");

  const existingCampaigns = [
    {
      id: "auto-insurance",
      name: "Auto Insurance Leads - AFDTFB",
      status: "Paused",
      id_number: "120233452247680228",
      type: "Leads",
      buying_type: "Auction",
    },
    {
      id: "cruises",
      name: "Cruises Around The World - AFD",
      status: "Paused",
      id_number: "120233356900490228",
      type: "Leads",
      buying_type: "Auction",
    },
    {
      id: "solar-panel",
      name: "DYT - Solar Panel",
      status: "Paused",
      id_number: "120232250531730228",
      type: "Leads",
      buying_type: "Auction",
    },
    {
      id: "home-improvement",
      name: "DYT - Home Improvement US Campaign",
      status: "Active",
      id_number: "120232146845310228",
      type: "Leads",
      buying_type: "Auction",
    },
  ];

  const objectives = [
    {
      id: "awareness",
      label: "Awareness",
      icon: Users,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%284%29%20%281%29-GipvdvEVHrjdccGcdOvc3lz7G4Yd3M.png",
      title: "Awareness",
      description:
        "Show your ads to people who are most likely to remember them.",
      goodFor: ["Reach", "Impressions"],
    },
    {
      id: "traffic",
      label: "Traffic",
      icon: MousePointer,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%283%29%20%281%29-FRra3vLSJvccCMcxQWhHZTyrGxqPRB.png",
      title: "Traffic",
      description:
        "Send people to a destination, like your website, app or Facebook event.",
      goodFor: ["Link clicks", "Landing page views", "Impressions"],
    },
    {
      id: "engagement",
      label: "Engagement",
      icon: MessageCircle,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%286%29%20%281%29-7NasUfny8Wvv9X5DjdJNU897sShkiV.png",
      title: "Engagement",
      description:
        "Get more messages, purchases through messaging, video views, post engagement, Page likes or event responses.",
      goodFor: [
        "Messenger, Instagram and WhatsApp",
        "Video views",
        "Post engagement",
        "Conversions",
        "Calls",
      ],
    },
    {
      id: "leads",
      label: "Leads",
      icon: Filter,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%287%29%20%281%29-iCZCZiqdjfulQ784A2oFig8wDHtKOw.png",
      title: "Leads",
      description: "Collect leads for your business or brand.",
      goodFor: [
        "Website and instant forms",
        "Instant forms",
        "Messenger, Instagram and WhatsApp",
        "Conversions",
        "Calls",
      ],
    },
    {
      id: "app-promotion",
      label: "App promotion",
      icon: Smartphone,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%288%29%20%281%29-3f04lz9IOGWPfLuPLG9MgrIb2dJ5cd.png",
      title: "App promotion",
      description: "Find new people to install your app and continue using it.",
      goodFor: ["App installs", "App events"],
    },
    {
      id: "sales",
      label: "Sales",
      icon: ShoppingBag,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%289%29%20%281%29-iypX5xCpCoOfbUTNLde2IqMf7o9wD4.png",
      title: "Sales",
      description: "Find people likely to purchase your products or services.",
      goodFor: ["Conversions", "Catalogue sales", "Store visits"],
    },
  ];

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const currentObjective =
      objectives.find((obj) => obj.id === hoveredObjective) ||
      (selectedObjective
        ? objectives.find((obj) => obj.id === selectedObjective)
        : null);

    if (currentObjective && currentObjective.image !== currentImageSrc) {
      setImageLoaded(false);
      const img = new Image();
      img.onload = () => {
        setCurrentImageSrc(currentObjective.image);
        setImageLoaded(true);
      };
      img.src = currentObjective.image;
    } else if (!currentObjective) {
      setCurrentImageSrc(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%283%29%20%281%29-FRra3vLSJvccCMcxQWhHZTyrGxqPRB.png"
      );
      setImageLoaded(true);
    }
  }, [hoveredObjective, selectedObjective, currentImageSrc]);

  const currentObjective =
    objectives.find((obj) => obj.id === hoveredObjective) ||
    (selectedObjective
      ? objectives.find((obj) => obj.id === selectedObjective)
      : null);

  const getModalHeight = () => {
    if (activeTab === "create-campaign") {
      return "680px"; // Keep original height for campaign creation
    } else {
      if (!selectedCampaign) {
        return "280px"; // Fixed compact height for initial state
      } else {
        return "480px"; // Fixed height when campaign is selected
      }
    }
  };

  const resetDialogState = () => {
    setActiveTab("create-campaign");
    setSelectedObjective("");
    setHoveredObjective(null);
    setShowBuyingTypeDropdown(false);
    setSelectedBuyingType("Auction");
    setSelectedCampaign("");
    setShowCampaignDropdown(false);
    setShowAdSetDropdown(false);
    setShowAdDropdown(false);
    setSelectedAdSetOption("Create ad set");
    setSelectedAdOption("Create ad");
    setAdSetName("");
    setAdName("");
    setImageLoaded(false);
    setCurrentImageSrc("");
  };

  const handleClose = () => {
    resetDialogState();
    onClose();
  };

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-700">Loading campaign setup...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-2xl shadow-xl flex flex-col transition-all duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
        style={{ height: getModalHeight() }}
      >
        <div className="flex items-center justify-between px-3 py-2  flex-shrink-0">
          <div className="flex items-center">
            <button
              onClick={() => setActiveTab("create-campaign")}
              className={`px-4 py-2 font-medium rounded-md text-sm mr-1 transition-colors ${
                activeTab === "create-campaign"
                  ? "bg-blue-600/15 text-blue-600/90"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Create new campaign
            </button>
            <button
              onClick={() => setActiveTab("new-ad-set")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "new-ad-set"
                  ? "bg-blue-600/15 text-blue-600/90"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              New ad set or add
            </button>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === "create-campaign" ? (
            <div className="px-4 h-full w-full">
              <div className="mb-3">
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  Buying type
                </h3>
                <div className="relative ">
                  <button
                    onClick={() =>
                      setShowBuyingTypeDropdown(!showBuyingTypeDropdown)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex items-center justify-between hover:border-gray-400 bg-white text-sm transition-colors"
                  >
                    <span>{selectedBuyingType}</span>
                    <ChevronDown size={16} className="text-gray-500" />
                  </button>
                  {showBuyingTypeDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <div className="py-1">
                        {["Auction", "Reservation"].map((type) => (
                          <button
                            key={type}
                            onClick={() => {
                              setSelectedBuyingType(type);
                              setShowBuyingTypeDropdown(false);
                            }}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8 h-full max-h-[80%]">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    Choose a campaign objective
                  </h3>
                  <div className="">
                    {objectives.map((objective) => {
                      const IconComponent = objective.icon;
                      const isSelected = selectedObjective === objective.id;
                      const isHovered = hoveredObjective === objective.id;

                      return (
                        <label
                          key={objective.id}
                          className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-all duration-150 ${
                            isSelected
                              ? "bg-blue-50 border border-blue-200"
                              : isHovered
                              ? "bg-gray-50"
                              : "hover:bg-gray-50"
                          }`}
                          onMouseEnter={() => {
                            if (hoveredObjective !== objective.id) {
                              setHoveredObjective(objective.id);
                            }
                          }}
                          onMouseLeave={() => {
                            if (hoveredObjective === objective.id) {
                              setHoveredObjective(null);
                            }
                          }}
                        >
                          <input
                            type="radio"
                            name="objective"
                            value={objective.id}
                            checked={isSelected}
                            onChange={(e) =>
                              setSelectedObjective(e.target.value)
                            }
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <div
                            className={`p-2 rounded-md transition-colors duration-150 ${
                              isSelected
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            <IconComponent size={16} />
                          </div>
                          <span className="text-gray-900 text-sm font-medium">
                            {objective.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="text-left h-full flex flex-col">
                    <div
                      className=" flex justify-center"
                      style={{ height: "200px" }}
                    >
                      {currentImageSrc && (
                        <img
                          src={currentImageSrc || "/placeholder.svg"}
                          alt={currentObjective?.title || "Default"}
                          className={`w-48 h-48 object-contain transition-opacity duration-200 ${
                            imageLoaded ? "opacity-100" : "opacity-0"
                          }`}
                          onLoad={() => setImageLoaded(true)}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      {currentObjective ? (
                        <>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">
                            {currentObjective.title}
                          </h4>
                          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                            {currentObjective.description}
                          </p>
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-3 text-sm">
                              Good for:
                            </h5>
                            <div className="space-y-2">
                              {currentObjective.goodFor.map((item, index) => (
                                <div
                                  key={index}
                                  className="bg-gray-100 px-3 py-2 rounded-md text-sm text-gray-700"
                                >
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center">
                          <p className="text-gray-600 text-sm max-w-sm leading-relaxed mx-auto">
                            Your campaign objective is the business goal you
                            hope to achieve by running your ads. Hover over each
                            one for more information.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between  py-6 border-t border-gray-200">
                <button className="text-blue-600 hover:underline text-sm">
                  About campaign objectives
                </button>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!selectedObjective}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 h-full flex flex-col">
              {!selectedCampaign ? (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <FileText size={20} className="text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Campaign
                    </h3>
                  </div>

                  <div className="relative mb-8">
                    <button
                      onClick={() =>
                        setShowCampaignDropdown(!showCampaignDropdown)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400 bg-white transition-colors"
                      data-campaign-dropdown
                    >
                      <span className="text-gray-500">Choose a campaign</span>
                      <ChevronDown size={16} className="text-gray-500" />
                    </button>

                    {showCampaignDropdown && (
                      <div
                        className="fixed bg-white border border-gray-200 rounded-md shadow-lg z-[60] max-h-48 overflow-y-auto"
                        style={{
                          top: `${
                            document
                              .querySelector("[data-campaign-dropdown]")
                              ?.getBoundingClientRect().bottom +
                            window.scrollY +
                            4
                          }px`,
                          left: `${
                            document
                              .querySelector("[data-campaign-dropdown]")
                              ?.getBoundingClientRect().left + window.scrollX
                          }px`,
                          width: `${
                            document
                              .querySelector("[data-campaign-dropdown]")
                              ?.getBoundingClientRect().width
                          }px`,
                        }}
                      >
                        {existingCampaigns.map((campaign) => (
                          <button
                            key={campaign.id}
                            onClick={() => {
                              setSelectedCampaign(campaign.name);
                              setShowCampaignDropdown(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                          >
                            <div className="font-medium text-gray-900">
                              {campaign.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {campaign.status} • {campaign.id_number} •{" "}
                              {campaign.type} • {campaign.buying_type}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex-1"></div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div></div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleClose}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        disabled={true}
                        className="px-6 py-2 bg-gray-300 text-white rounded cursor-not-allowed transition-colors"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Campaign
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedCampaign("")}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="bg-white border border-gray-300 rounded-lg px-4 py-3 mb-6 flex items-center justify-between">
                    <span className="text-gray-900 font-medium">
                      {selectedCampaign}
                    </span>
                    <button
                      onClick={() => setSelectedCampaign("")}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Grid3X3 size={20} className="text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Ad set
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setShowAdSetDropdown(!showAdSetDropdown)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400 bg-white transition-colors"
                          data-adset-dropdown
                        >
                          <span>{selectedAdSetOption}</span>
                          <ChevronDown size={16} className="text-gray-500" />
                        </button>

                        {showAdSetDropdown && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-[60]">
                            <div className="py-1">
                              {["Create ad set", "Use existing ad set"].map(
                                (option) => (
                                  <button
                                    key={option}
                                    onClick={() => {
                                      setSelectedAdSetOption(option);
                                      setShowAdSetDropdown(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                                      selectedAdSetOption === option
                                        ? "bg-blue-50 text-blue-700"
                                        : ""
                                    }`}
                                  >
                                    <div
                                      className={`w-3 h-3 rounded-full border-2 ${
                                        selectedAdSetOption === option
                                          ? "border-blue-600 bg-blue-600"
                                          : "border-gray-300"
                                      }`}
                                    >
                                      {selectedAdSetOption === option && (
                                        <div className="w-1 h-1 bg-white rounded-full mx-auto mt-0.5"></div>
                                      )}
                                    </div>
                                    {option}
                                  </button>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <input
                        type="text"
                        placeholder="Name this ad set"
                        value={adSetName}
                        onChange={(e) => setAdSetName(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FileImage size={20} className="text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Ad
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <button
                          onClick={() => setShowAdDropdown(!showAdDropdown)}
                          className="w-full p-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400 bg-white transition-colors"
                          data-ad-dropdown
                        >
                          <span>{selectedAdOption}</span>
                          <ChevronDown size={16} className="text-gray-500" />
                        </button>

                        {showAdDropdown && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-[60]">
                            <div className="py-1">
                              {["Create ad", "Skip ad"].map((option) => (
                                <button
                                  key={option}
                                  onClick={() => {
                                    setSelectedAdOption(option);
                                    setShowAdDropdown(false);
                                  }}
                                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                                    selectedAdOption === option
                                      ? "bg-blue-50 text-blue-700"
                                      : ""
                                  }`}
                                >
                                  <div
                                    className={`w-3 h-3 rounded-full border-2 ${
                                      selectedAdOption === option
                                        ? "border-blue-600 bg-blue-600"
                                        : "border-gray-300"
                                    }`}
                                  >
                                    {selectedAdOption === option && (
                                      <div className="w-1 h-1 bg-white rounded-full mx-auto mt-0.5"></div>
                                    )}
                                  </div>
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <input
                        type="text"
                        placeholder="Name this ad"
                        value={adName}
                        onChange={(e) => setAdName(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-auto">
                    <div></div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleClose}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                        Continue
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
