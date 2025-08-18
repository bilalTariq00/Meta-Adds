"use client";

import { useState } from "react";
import { X, ChevronDown, ChevronUp, Info } from "lucide-react";

export function ManageAdjustmentsModal({ isOpen, onClose }) {
  const [expandedSections, setExpandedSections] = useState({});
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [isLoadingActivityLog, setIsLoadingActivityLog] = useState(false);
  const [automaticAdjustmentsEnabled, setAutomaticAdjustmentsEnabled] =
    useState(true);
  const [categoryCheckedStates, setCategoryCheckedStates] = useState({
    "campaign-structure": true,
    audience: false,
    "creative-format": false,
    "delivery-engagement": false,
    "spend-schedule": false,
  });
  const [itemCheckedStates, setItemCheckedStates] = useState({
    "reduce-auction-overlap": true,
    "reduce-audience-fragmentation": true,
    "advantage-audience": false,
    "optimise-ad-creative": false,
    "expand-image": false,
    "turn-on-music": false,
  });

  const adjustmentImages = {
    "campaign-structure": "/images/campaign-structure.png",
    audience: "/images/audience.png",
    "creative-format": "/images/creative-format.png",
    "delivery-engagement": "/images/delivery-engagement.png",
    "spend-schedule": "/images/spend-schedule.png",
  };

  const getAdjustmentImage = (adjustmentName) => {
    const adjustmentMap = {
      "Reduce audience fragmentation": "campaign-structure",
      "Reduce auction overlap": "campaign-structure",
      "Advantage+ audience": "audience",
      "Optimise ad creative": "creative-format",
      "Add music to eligible ads": "creative-format",
      "Expand image": "creative-format",
      "Advantage+ placements": "delivery-engagement",
      "Advantage+ campaign budget": "spend-schedule",
    };

    const adjustmentType = adjustmentMap[adjustmentName];
    return adjustmentType
      ? adjustmentImages[adjustmentType]
      : adjustmentImages["campaign-structure"];
  };

  const handleAutomaticAdjustmentsToggle = () => {
    const newState = !automaticAdjustmentsEnabled;
    setAutomaticAdjustmentsEnabled(newState);

    // Update all categories
    const newCategoryStates = {};
    Object.keys(categoryCheckedStates).forEach((key) => {
      newCategoryStates[key] = newState;
    });
    setCategoryCheckedStates(newCategoryStates);

    // Update all items
    const newItemStates = {};
    Object.keys(itemCheckedStates).forEach((key) => {
      newItemStates[key] = newState;
    });
    setItemCheckedStates(newItemStates);
  };

  const handleCategoryChange = (categoryId, checked) => {
    setCategoryCheckedStates((prev) => ({
      ...prev,
      [categoryId]: checked,
    }));

    // Update related items
    const categoryItems =
      adjustmentCategories.find((cat) => cat.id === categoryId)?.itemIds || [];
    const newItemStates = { ...itemCheckedStates };
    categoryItems.forEach((itemId) => {
      newItemStates[itemId] = checked;
    });
    setItemCheckedStates(newItemStates);
  };

  const handleItemChange = (itemId, checked) => {
    setItemCheckedStates((prev) => ({
      ...prev,
      [itemId]: checked,
    }));
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleViewActivityLog = async () => {
    setIsLoadingActivityLog(true);
    // Simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoadingActivityLog(false);
    setShowActivityLog(true);
  };

  const adjustmentCategories = [
    {
      id: "campaign-structure",
      title: "Campaign structure",
      description:
        "Ad sets may be combined or ads that are underperforming could be turned off. This may redistribute your budget.",
      icon: (
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img
            src={adjustmentImages["campaign-structure"] || "/placeholder.svg"}
            alt="Campaign structure"
            className="w-full h-full object-cover"
          />
        </div>
      ),
      itemIds: ["reduce-auction-overlap", "reduce-audience-fragmentation"],
      items: [
        {
          id: "reduce-auction-overlap",
          name: "Reduce auction overlap – auto-apply",
          action: "Turn off ad sets",
          schedule: "Daily",
          notification: "Facebook",
        },
        {
          id: "reduce-audience-fragmentation",
          name: "Reduce audience fragmentation – auto-apply",
          action: "Combine ad sets, audiences and budgets automatically",
          schedule: "Daily",
          notification: "Facebook",
        },
      ],
    },
    {
      id: "audience",
      title: "Audience",
      description:
        "Targeting settings may be adjusted to reach more people who might be interested in your ads.",
      icon: (
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img
            src={adjustmentImages["audience"] || "/placeholder.svg"}
            alt="Audience"
            className="w-full h-full object-cover"
          />
        </div>
      ),
      itemIds: ["advantage-audience"],
      items: [
        {
          id: "advantage-audience",
          name: "Advantage+ audience",
          action:
            "Ads are shown beyond some settings when it may improve performance. Any location and age limits will still be applied",
          schedule: "Daily",
          notification: "Facebook",
        },
      ],
    },
    {
      id: "creative-format",
      title: "Creative and format",
      description:
        "Ad creative may be enhanced. This applies to media, text, ad format and other visual elements.",
      icon: (
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img
            src={adjustmentImages["creative-format"] || "/placeholder.svg"}
            alt="Creative and format"
            className="w-full h-full object-cover"
          />
        </div>
      ),
      itemIds: ["optimise-ad-creative", "expand-image", "turn-on-music"],
      items: [
        {
          id: "optimise-ad-creative",
          name: "Optimise ad creative – auto-apply",
          action:
            "Turn on visual touch-ups, text improvements and add overlays",
          schedule: "Daily",
          notification: "Facebook",
        },
        {
          id: "expand-image",
          name: "Expand image",
          action:
            "Fit your ad in more placements by automatically adjusting image size",
          schedule: "Daily",
          notification: "Facebook",
        },
        {
          id: "turn-on-music",
          name: "Turn on music",
          action: "Automatically add music to eligible ad",
          schedule: "Daily",
          notification: "Facebook",
        },
      ],
    },
    {
      id: "delivery-engagement",
      title: "Delivery and engagement",
      description:
        "Placements may be added or removed. Settings for outcomes may be adjusted.",
      icon: (
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img
            src={adjustmentImages["delivery-engagement"] || "/placeholder.svg"}
            alt="Delivery and engagement"
            className="w-full h-full object-cover"
          />
        </div>
      ),
      itemIds: [],
      items: [],
    },
    {
      id: "spend-schedule",
      title: "Spend and schedule",
      description:
        "Your budget will never be changed. Other bid and schedule settings may be adjusted.",
      icon: (
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img
            src={adjustmentImages["spend-schedule"] || "/placeholder.svg"}
            alt="Spend and schedule"
            className="w-full h-full object-cover"
          />
        </div>
      ),
      itemIds: [],
      items: [],
    },
  ];

  const activityLogData = [
    {
      selection: "Optimise ad creative",
      activity: "Recommendation turned off by Codessey Pk",
      date: "16 Aug 2025",
    },
    {
      selection: "Reduce auction overlap",
      activity: "Recommendation turned off by Codessey Pk",
      date: "16 Aug 2025",
    },
    {
      selection: "Advantage+ audience",
      activity: "Recommendation turned off by Codessey Pk",
      date: "16 Aug 2025",
    },
    {
      selection: "Add music to eligible ads",
      activity: "Recommendation turned off by Codessey Pk",
      date: "16 Aug 2025",
    },
    {
      selection: "Reduce audience fragmentation",
      activity: "Recommendation turned off by Codessey Pk",
      date: "16 Aug 2025",
    },
    {
      selection: "Advantage+ placements",
      activity: "Recommendation turned off by Codessey Pk",
      date: "16 Aug 2025",
    },
    {
      selection: "Expand image",
      activity: "Recommendation turned off by Codessey Pk",
      date: "16 Aug 2025",
    },
    {
      selection: "Include other relevant products",
      activity: "Recommendation turned off by Muhammad Bilal",
      date: "16 Aug 2025",
    },
    {
      selection: "Audience",
      activity: "Recommendation turned off by Codessey Pk",
      date: "16 Aug 2025",
    },
  ];

  if (!isOpen && !showActivityLog && !isLoadingActivityLog) return null;

  if (isLoadingActivityLog) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading activity log...</p>
        </div>
      </div>
    );
  }

  if (showActivityLog) {
    return (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={() => setShowActivityLog(false)}
      >
        <div
          className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-scroll shadow-lg pb-6 "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 py-2 ">
            <h2 className="text-lg font-semibold text-gray-900">
              Automatic adjustments history
            </h2>
            <button
              onClick={() => setShowActivityLog(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="px-4">
            <p className="text-sm text-gray-900 mb-2">
              <span className="font-semibold">Ad account:</span> Adkin Digital
              (1263790274765251)
            </p>

            <div className="overflow-hidden  rounded-lg ">
              <table className="w-full">
                <thead className="bg-white   shadow-sm shadow-gray-200 relative z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-black border-b border-gray-200">
                      Selection
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-black border-b border-gray-200">
                      Activity
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-black border-b border-gray-200">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {activityLogData.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                            <img
                              src={
                                getAdjustmentImage(item.selection) ||
                                "/placeholder.svg"
                              }
                              alt={item.selection}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-sm text-gray-900 font-medium">
                            {item.selection}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {item.activity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {item.date}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-200 mt-6">
              <button
                onClick={() => setShowActivityLog(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <span>←</span> Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 "
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-5xl max-h-[80vh] overflow-y-scroll shadow-lg pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Manage automatic adjustments
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4">
          <div className="mb-2">
            <p className="text-sm text-gray-900 mb-4">
              <span className="font-semibold">Account:</span> Adkin Digital
              (1263790274765251)
            </p>

            <div className="flex items-center gap-3 mb-2">
              <div
                className="relative inline-flex items-center cursor-pointer"
                onClick={handleAutomaticAdjustmentsToggle}
              >
                <div
                  className={`w-9 h-5 rounded-full transition-colors duration-200 ease-in-out ${
                    automaticAdjustmentsEnabled
                      ? "bg-blue-600/15"
                      : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5  w-4 h-4 rounded-full shadow transition-transform duration-200 ease-in-out ${
                      automaticAdjustmentsEnabled
                        ? "transform translate-x-4 bg-blue-700 "
                        : "transform translate-x-0 bg-gray-700"
                    }`}
                  ></div>
                </div>
              </div>
              <span className="text-gray-900 text-sm">
                Automatic adjustments
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-5">
              Turned on by Codessey PK on 31 July 2025
            </p>
          </div>

          <p className="text-sm text-gray-500 mb-3 leading-relaxed">
            Automatically apply recommendations whenever there's a chance to
            improve the performance of your active campaigns and ad sets.
            Selecting a category will allow any recommendations that get added
            to be automatically applied. You can also select individual
            recommendations and customise how frequently they apply.
          </p>

          <div className="space-y-4 mb-8">
            {adjustmentCategories.map((category) => (
              <div
                key={category.id}
                className="border-b border-gray-200  overflow-hidden"
              >
                <div className="flex items-center p-4 bg-white">
                  <div className="flex items-center mr-4">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={categoryCheckedStates[category.id]}
                        onChange={(e) =>
                          handleCategoryChange(category.id, e.target.checked)
                        }
                        className="sr-only"
                      />
                      <div
                        onClick={() =>
                          handleCategoryChange(
                            category.id,
                            !categoryCheckedStates[category.id]
                          )
                        }
                        className={`w-6 h-6 rounded border-2 cursor-pointer flex items-center justify-center transition-colors ${
                          categoryCheckedStates[category.id]
                            ? "bg-white border-gray-300 "
                            : "bg-white border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {categoryCheckedStates[category.id] && (
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mr-4">{category.icon}</div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {category.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <div className="ml-4">
                    <button
                      onClick={() => toggleSection(category.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded border border-gray-200"
                    >
                      {expandedSections[category.id] ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {expandedSections[category.id] && category.items.length > 0 && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    <div className="overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-white border border-gray-300 shadow-md shadow-gray-200 relative z-10">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                              Action & condition
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                              Schedule
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                              Notification
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 border border-gray-300">
                          {category.items.map((item, index) => (
                            <tr
                              key={index}
                              className="hover:bg-gray-50 transition-colors duration-150"
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="relative">
                                    <input
                                      type="checkbox"
                                      checked={itemCheckedStates[item.id]}
                                      onChange={(e) =>
                                        handleItemChange(
                                          item.id,
                                          e.target.checked
                                        )
                                      }
                                      className="sr-only"
                                    />
                                    <div
                                      onClick={() =>
                                        handleCategoryChange(
                                          category.id,
                                          !categoryCheckedStates[category.id]
                                        )
                                      }
                                      className={`w-5 h-5 rounded border-2 cursor-pointer flex items-center justify-center transition-colors ${
                                        categoryCheckedStates[category.id]
                                          ? "bg-white border-gray-300 "
                                          : "bg-white border-gray-300 hover:border-gray-400"
                                      }`}
                                    >
                                      {categoryCheckedStates[category.id] && (
                                        <svg
                                          className="w-5 h-5 text-blue-600"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      )}
                                    </div>
                                  </div>
                                  <span className="text-sm text-gray-900 whitespace-nowrap">
                                    {item.name}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 max-w-[200px]">
                                <span className="text-sm text-gray-600 ">
                                  {item.action}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm text-gray-600">
                                  {item.schedule}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-600">
                                    {item.notification}
                                  </span>
                                  <button className="ml-4 px-4 py-1.5 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors">
                                    Edit
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              onClick={handleViewActivityLog}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 transition-colors"
            >
              <Info size={16} />
              View activity log
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Apply changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Demo component to show the modal
export default function Demo() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Open Manage Adjustments Modal
      </button>

      <ManageAdjustmentsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
