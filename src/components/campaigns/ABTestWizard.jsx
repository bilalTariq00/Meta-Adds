"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar,
  Info,
  Blocks,
} from "lucide-react";

const ABTestWizard = ({ open = false, onClose = () => {} }) => {
  console.log("ABTestWizard rendered with open:", open);
  const [step, setStep] = useState(1);
  const [showVariableDropdown, setShowVariableDropdown] = useState(false);
  const [showAdDropdown, setShowAdDropdown] = useState(false);
  const [showMetricDropdown, setShowMetricDropdown] = useState(false);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showStandardEvents, setShowStandardEvents] = useState(false);

  const [startCalendarDate, setStartCalendarDate] = useState({
    month: 7, // August (0-indexed)
    year: 2025,
  });
  const [endCalendarDate, setEndCalendarDate] = useState({
    month: 8, // September (0-indexed)
    year: 2025,
  });

  const startCalendarRef = useRef(null);
  const endCalendarRef = useRef(null);

  const [formData, setFormData] = useState({
    testName: "Test",
    variable: "",
    selectedAd: "",
    keyMetric: "CPC (cost per link click)",
    includeUpperFunnel: true,
    endTestEarly: true,
    startDate: "26/8/2025",
    endDate: "2/9/2025",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        startCalendarRef.current &&
        !startCalendarRef.current.contains(event.target)
      ) {
        setShowStartCalendar(false);
      }
      if (
        endCalendarRef.current &&
        !endCalendarRef.current.contains(event.target)
      ) {
        setShowEndCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const parseDate = (dateString) => {
    if (!dateString) return null;
    const parts = dateString.split("/");
    if (parts.length !== 3) return null;

    const day = Number.parseInt(parts[0], 10);
    const month = Number.parseInt(parts[1], 10) - 1; // Convert to 0-indexed
    const year = Number.parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
    if (month < 0 || month > 11) return null;
    if (day < 1 || day > 31) return null;

    return new Date(year, month, day);
  };

  const formatDate = (date) => {
    if (!date || !(date instanceof Date)) return "";
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handlePublish = () => {
    setIsPublishing(true);
    // Simulate publishing process
    setTimeout(() => {
      setIsPublishing(false);
      onClose();
    }, 2000);
  };

  if (!open) return null;

  const next = () => setStep((s) => Math.min(4, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));
  const close = () => {
    setStep(1);
    onClose();
  };

  const variables = [
    {
      name: "Creative",
      description: "Find out which images, videos or ad text work best.",
      selected: formData.variable === "Creative",
    },
    {
      name: "Audience",
      description: "See how targeting a new audience can affect performance.",
      selected: formData.variable === "Audience",
    },
    {
      name: "Placement",
      description: "Discover the most effective places to show your ads.",
      selected: formData.variable === "Placement",
    },
    {
      name: "Custom",
      description: "Learn how changing multiple variables can affect results.",
      selected: formData.variable === "Custom",
    },
  ];

  const ads = [
    {
      name: "Auto Insurance Leads - AFDTFB",
      image: "/api/placeholder/40/40",
    },
  ];

  const metrics = [
    { name: "Cost per result – Website content views", recommended: false },
    { name: "CPC (cost per link click)", recommended: true },
    {
      name: "Cost per 1,000 Accounts Centre accounts reached",
      recommended: false,
    },
    { name: "Cost per purchase", recommended: false },
  ];

  const generateCalendar = (month, year, selectedDate, onDateSelect) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days.map((date, index) => {
      if (!date) {
        return <div key={`empty-${index}`} className="w-8 h-8"></div>;
      }

      const isSelected = selectedDate === formatDate(date);
      const isToday = new Date().toDateString() === date.toDateString();

      return (
        <button
          key={index}
          onClick={() => onDateSelect(formatDate(date))}
          className={`
            w-8 h-8 text-sm rounded hover:bg-blue-50 transition-colors
            ${isSelected ? "bg-blue-500 text-white hover:bg-blue-600" : ""}
            ${isToday && !isSelected ? "bg-blue-100 text-blue-700" : ""}
            ${!isSelected && !isToday ? "text-gray-700" : ""}
          `}
        >
          {date.getDate()}
        </button>
      );
    });
  };

  const navigateStartMonth = (direction) => {
    setStartCalendarDate((prev) => {
      let newMonth = prev.month + direction;
      let newYear = prev.year;

      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      } else if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }

      return { month: newMonth, year: newYear };
    });
  };

  const navigateEndMonth = (direction) => {
    setEndCalendarDate((prev) => {
      let newMonth = prev.month + direction;
      let newYear = prev.year;

      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      } else if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }

      return { month: newMonth, year: newYear };
    });
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleStartDateChange = (value) => {
    setFormData((prev) => ({ ...prev, startDate: value }));

    // Try to parse the date and update calendar view
    const parsedDate = parseDate(value);
    if (parsedDate) {
      setStartCalendarDate({
        month: parsedDate.getMonth(),
        year: parsedDate.getFullYear(),
      });
    }
  };

  const handleEndDateChange = (value) => {
    setFormData((prev) => ({ ...prev, endDate: value }));

    // Try to parse the date and update calendar view
    const parsedDate = parseDate(value);
    if (parsedDate) {
      setEndCalendarDate({
        month: parsedDate.getMonth(),
        year: parsedDate.getFullYear(),
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="">
              {/* Hero illustration placeholder */}
              <div className="sticky top-0  z-10 w-full h-full bg-gradient-to-r from-pink-100 via-blue-100 to-cyan-100 rounded-lg mb-8 flex items-center justify-center overflow-hidden">
                <img
                  src="/images/campaigns/ABTest1.png"
                  className="w-full h-full object-cover rounded-lg"
                />

                {/* Close Button */}
                <button
                  onClick={close}
                  className="absolute top-9 right-3  hover:bg-white rounded-full p-1  z-20"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>
              <div className="text-center p-8">
                <h2 className="text-lg font-semibold mb-3 text-gray-900">
                  Help improve ad performance with A/B testing
                </h2>
                <p className="text-gray-600 mb-8 text-sm max-w-2xl mx-auto">
                  Compare versions with different images, text, audiences or
                  other settings to see what works best. We'll make sure that
                  nobody sees more than one version for better accuracy.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left px-36">
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-semibold text-xs">
                        1
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-2">
                        Choose what to test
                      </h3>
                      <p className="text-xs text-gray-600">
                        You can copy an existing campaign or ad set or compare
                        published ones.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-semibold text-xs">
                        2
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900 mb-2">
                        Select test settings
                      </h3>
                      <p className="text-xs text-gray-600">
                        This includes duration and key metrics, which are what
                        we'll use to determine a winner.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-semibold text-xs">
                        3
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-2">
                        Get results
                      </h3>
                      <p className="text-xs text-gray-600">
                        You'll get an email with results. You can also track
                        progress and manage your test by going to{" "}
                        <span className="text-blue-600">Experiments</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className="">
              {/* Hero illustration */}
              <div className="sticky top-0  z-10 w-full h-full bg-gradient-to-r from-pink-100 via-blue-100 to-cyan-100 rounded-lg mb-8 flex items-center justify-center overflow-hidden">
                <img
                  src="/images/campaigns/ABTest2.png"
                  className="w-full h-full object-cover rounded-lg"
                />

                {/* Close Button */}
                <button
                  onClick={close}
                  className="absolute top-9 right-3  hover:bg-white rounded-full p-1  z-20"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 divide-x divide-gray-200">
                <div className="pr-2 col-span-2">
                  <h2 className="text-lg font-semibold ">
                    Start by setting up an ad to test against the one you
                    selected
                  </h2>
                  <p className="text-gray-600 mb-6 text-sm">
                    You can make a copy of your ad and edit it, or you can pick
                    a second ad to test it against.
                  </p>

                  <div className="space-y-4 ">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="adChoice"
                        defaultChecked
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="font-medium text-sm">
                        Make a copy of this ad
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="adChoice"
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="font-medium text-sm">
                        Pick another existing ad
                      </span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4 col-span-1">
                  <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg font-bold">Version A</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ChevronRight className="w-4 h-4 text-gray-400" />

                      <span className="text-sm text-gray-700 flex justify-center items-center gap-1">
                        <Blocks size={16} />
                        Auto Insurance Lea...
                      </span>
                      <div className="w-12 h-12 bg-red-100 rounded overflow-hidden flex-shrink-0">
                        <img
                          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=60&h=60&fit=crop&crop=center"
                          alt="Auto Insurance"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg shadow p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-gray-500">
                        Version B
                      </span>
                    </div>
                    <div className="w-full h-12 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <div className="">
              <div className="sticky top-0  z-10 w-full h-full bg-gradient-to-r from-pink-100 via-blue-100 to-cyan-100 rounded-lg mb-8 flex items-center justify-center overflow-hidden">
                <img
                  src="/images/campaigns/ABTest3.png"
                  className="w-full h-full object-cover rounded-lg"
                />

                {/* Close Button */}
                <button
                  onClick={close}
                  className="absolute top-9 right-3  hover:bg-white rounded-full p-1  z-20"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 divide-x divide-gray-200">
                <div className="col-span-2 pr-3">
                  <h2 className="text-lg font-semibold mb-4">
                    Which variable would you like to test?
                  </h2>
                  <p className="text-gray-600 mb-6 text-sm">
                    Select the variable that will differ for each version.
                    Choose Custom to compare more than one variable at the same
                    time.
                  </p>

                  <div className="space-y-4 text-sm">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowVariableDropdown(!showVariableDropdown)
                        }
                        className={`w-full p-3 border rounded-lg bg-white flex items-center justify-between text-left ${
                          formData.variable
                            ? "border-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        <span
                          className={
                            formData.variable
                              ? "text-blue-600 font-medium"
                              : "text-gray-500"
                          }
                        >
                          {formData.variable || "Select a variable to test"}
                        </span>
                        <div className="flex items-center gap-2">
                          <ChevronDown className="w-5 h-5" />
                          {formData.variable && (
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </button>

                      {showVariableDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white  rounded-lg shadow-lg z-50">
                          {variables.map((variable, index) => (
                            <label
                              key={index}
                              className="flex items-start gap-3 p-4 hover:bg-gray-50 cursor-pointer  last:border-b-0"
                            >
                              <input
                                type="radio"
                                name="variable"
                                className="w-4 h-4 mt-0.5 text-blue-600"
                                checked={variable.selected}
                                onChange={() => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    variable: variable.name,
                                  }));
                                  setShowVariableDropdown(false);
                                }}
                              />
                              <div>
                                <div className="font-medium">
                                  {variable.name}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {variable.description}
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {formData.variable && (
                      <div>
                        <h3 className="font-semibold mb-4">
                          Which ad do you want to copy?
                        </h3>
                        <div className="relative">
                          <button
                            onClick={() => setShowAdDropdown(!showAdDropdown)}
                            className={`w-full p-3 border rounded-lg bg-white flex items-center justify-between text-left ${
                              formData.selectedAd
                                ? "border-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            <span
                              className={
                                formData.selectedAd
                                  ? "text-blue-600 font-medium"
                                  : "text-gray-500"
                              }
                            >
                              {formData.selectedAd || "Select an ad to copy"}
                            </span>
                            <div className="flex items-center gap-2">
                              <ChevronDown className="w-5 h-5" />
                              {formData.selectedAd && (
                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                  <svg
                                    className="w-3 h-3 text-white"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </button>

                          {showAdDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10">
                              {ads.map((ad, index) => (
                                <label
                                  key={index}
                                  className="flex items-center gap-3 p-4 hover:bg-blue-50 cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    name="selectedAd"
                                    className="w-4 h-4 text-blue-600"
                                    checked={formData.selectedAd === ad.name}
                                    onChange={() => {
                                      setFormData((prev) => ({
                                        ...prev,
                                        selectedAd: ad.name,
                                      }));
                                      setShowAdDropdown(false);
                                    }}
                                  />
                                  <div className="w-8 h-8 bg-red-100 rounded overflow-hidden flex-shrink-0">
                                    <img
                                      src={ad.image || "/placeholder.svg"}
                                      alt="Ad"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <span className="font-medium">{ad.name}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {formData.variable && formData.selectedAd && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start flex-col gap-1 mb-2">
                          <span className="text-lg font-bold">Version A</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <ChevronRight className="w-4 h-4 text-gray-400" />

                          <span className="text-sm text-gray-700 flex justify-center items-center gap-1">
                            <Blocks size={16} />
                            Auto Insurance Lea...
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4 col-span-1">
                  <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex flex-row justify-between">
                      <div className="flex items-start flex-col gap-1 mb-2">
                        <span className="text-lg font-bold">Version A</span>
                      </div>
                      {formData.variable ? (
                        <div className="w-12 h-12 bg-red-100 rounded overflow-hidden flex-shrink-0">
                          <img
                            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=60&h=60&fit=crop&crop=center"
                            alt="Auto Insurance"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded animate-pulse flex-shrink-0"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      {formData.variable ? (
                        <span className="text-sm text-gray-700 flex justify-center items-center gap-1">
                          <Blocks size={16} />
                          Auto Insurance Lea...
                        </span>
                      ) : (
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex flex-row justify-between">
                      <div className="flex items-start flex-col gap-1 mb-2">
                        <span className="text-lg font-bold">Version B</span>
                        {formData.selectedAd && (
                          <p className="text-gray-300">Copy of version A</p>
                        )}
                      </div>
                      {formData.selectedAd ? (
                        <div className="w-12 h-12 bg-red-100 rounded overflow-hidden flex-shrink-0">
                          <img
                            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=60&h=60&fit=crop&crop=center"
                            alt="Auto Insurance"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded animate-pulse flex-shrink-0"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      {formData.selectedAd ? (
                        <div className="flex flex-col justify-center items-start">
                          <span className="text-sm text-gray-700 flex justify-center items-center gap-1">
                            <Blocks size={16} />
                            Auto Insurance Lea...
                          </span>
                          <p className="text-xs">
                            You can change the creative after you've finished
                            setting up the test in the next step
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-1">
                            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                          <div className="w-32 h-3 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <div className="">
              <div className="sticky top-0 z-10 w-full h-full bg-gradient-to-r from-pink-100 via-blue-100 to-cyan-100 rounded-lg mb-8 flex items-center justify-center overflow-hidden">
                <img
                  src="/images/campaigns/ABTest4.png"
                  className="w-full h-full object-cover rounded-lg"
                />

                {/* Close Button */}
                <button
                  onClick={close}
                  className="absolute top-9 right-3  hover:bg-white rounded-full p-1  z-20"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 p-8 divide-x divide-gray-300">
                <div className="space-y-6 col-span-3 pr-3 ">
                  {/* Test Name */}
                  <div>
                    <label className="block text-sm font-medium ">
                      Test name
                    </label>
                    <input
                      type="text"
                      value={formData.testName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          testName: e.target.value,
                        }))
                      }
                      className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Key Metric */}
                  <div>
                    <h3 className="font-semibold ">Determining the winner</h3>
                    <p className="text-xs text-gray-600 mb-2">
                      Pick a key metric, which will determine the winning
                      version. You'll see a recommendation based on your ad
                      objectives and budget.
                    </p>

                    <div className="mb-2">
                      <label className="block text-sm font-bold mb-2">
                        Key metric
                      </label>
                      <div className="relative">
                        <button
                          onClick={() =>
                            setShowMetricDropdown(!showMetricDropdown)
                          }
                          className="w-full p-2 border border-gray-500 rounded-lg bg-white flex items-center justify-between text-left"
                        >
                          <span className="text-gray-600 font-medium">
                            {formData.keyMetric}
                          </span>
                          <ChevronDown className="w-5 h-5" />
                        </button>
                        {showMetricDropdown && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white  rounded-lg shadow-lg z-10">
                            {metrics.map((metric, index) => (
                              <label
                                key={index}
                                className="flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer last:border-b-0"
                              >
                                <div className="flex items-center gap-1">
                                  <input
                                    type="radio"
                                    name="keyMetric"
                                    className="w-4 h-4 text-gray-600"
                                    checked={formData.keyMetric === metric.name}
                                    onChange={() => {
                                      setFormData((prev) => ({
                                        ...prev,
                                        keyMetric: metric.name,
                                      }));
                                      setShowMetricDropdown(false);
                                    }}
                                  />
                                  <span className="text-sm">{metric.name}</span>
                                </div>
                                {metric.recommended && (
                                  <span className="text-xs bg-blue-100 text-gray-600 px-2 py-1 rounded">
                                    Recommended
                                  </span>
                                )}
                              </label>
                            ))}

                            <div className="">
                              <button
                                onClick={() =>
                                  setShowStandardEvents(!showStandardEvents)
                                }
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 text-left"
                              >
                                <span className="text-sm font-medium">
                                  Standard events
                                </span>
                                <ChevronDown
                                  className={`w-4 h-4 transition-transform ${
                                    showStandardEvents ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                              {showStandardEvents && (
                                <div className="px-4 pb-4">
                                  <div className="text-sm text-gray-600">
                                    Additional standard events would appear here
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Upper Funnel Toggle */}
                    <label className="flex items-center gap-3 cursor-pointer mt-2">
                      <div
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            includeUpperFunnel: !prev.includeUpperFunnel,
                          }))
                        }
                        className={`relative inline-flex h-6 w-11 items-center  rounded-full cursor-pointer transition-colors ${
                          formData.includeUpperFunnel
                            ? "bg-blue-300/40"
                            : "bg-white border border-black"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full  transition-transform ${
                            formData.includeUpperFunnel
                              ? "translate-x-6 bg-blue-600"
                              : "translate-x-1 bg-black"
                          }`}
                        />
                      </div>

                      <span className="text-sm">
                        Include upper-funnel metrics in test report
                      </span>
                      <Info className="w-4 h-4 text-gray-400" />
                    </label>

                    <button className="text-blue-600 text-sm flex items-center gap-1 mt-2">
                      Add additional metrics
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Schedule */}
                  <div>
                    <h3 className="font-semibold mb-2">Schedule</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      This test will run from 00:00 on your start date to 00:00
                      on your end date.
                    </p>

                    {/* Start Date */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Start
                      </label>
                      <div className="relative" ref={startCalendarRef}>
                        <div className="flex items-center border rounded-lg p-1">
                          <button
                            onClick={() =>
                              setShowStartCalendar(!showStartCalendar)
                            }
                            className="p-1   bg-white hover:bg-gray-50 flex items-center justify-center"
                          >
                            <Calendar className="w-5 h-5 text-gray-400" />
                          </button>
                          <input
                            type="text"
                            value={formData.startDate}
                            onChange={(e) =>
                              handleStartDateChange(e.target.value)
                            }
                            onClick={() =>
                              setShowStartCalendar(!showStartCalendar)
                            }
                            placeholder="DD/MM/YYYY"
                            className="w-full p-1   bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        {showStartCalendar && (
                          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20 p-4 min-w-80">
                            {/* Calendar Header with Navigation */}
                            <div className="flex items-center justify-between mb-4">
                              <button
                                onClick={() => navigateStartMonth(-1)}
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                <ChevronLeft className="w-5 h-5 text-gray-600" />
                              </button>

                              <span className="font-medium">
                                {monthNames[startCalendarDate.month]}{" "}
                                {startCalendarDate.year}
                              </span>

                              <button
                                onClick={() => navigateStartMonth(1)}
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                              </button>
                            </div>

                            {/* Days of Week Header */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                              {[
                                "Sun",
                                "Mon",
                                "Tue",
                                "Wed",
                                "Thu",
                                "Fri",
                                "Sat",
                              ].map((day) => (
                                <div
                                  key={day}
                                  className="text-xs font-medium text-gray-500 text-center p-2"
                                >
                                  {day}
                                </div>
                              ))}
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-1">
                              {generateCalendar(
                                startCalendarDate.month,
                                startCalendarDate.year,
                                formData.startDate,
                                (date) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    startDate: date,
                                  }));
                                  setShowStartCalendar(false);
                                }
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* End Date */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">
                        End
                      </label>
                      <div className="relative" ref={endCalendarRef}>
                        <div className="flex items-center border rounded-lg p-1">
                          <button
                            onClick={() => setShowEndCalendar(!showEndCalendar)}
                            className="p-1 bg-white hover:bg-gray-50 flex items-center justify-center"
                          >
                            <Calendar className="w-5 h-5 text-gray-400" />
                          </button>
                          <input
                            type="text"
                            value={formData.endDate}
                            onChange={(e) =>
                              handleEndDateChange(e.target.value)
                            }
                            onClick={() => setShowEndCalendar(!showEndCalendar)}
                            placeholder="DD/MM/YYYY"
                            className="w-full p-1  bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        {showEndCalendar && (
                          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20 p-4 min-w-80">
                            {/* Calendar Header with Navigation */}
                            <div className="flex items-center justify-between mb-4">
                              <button
                                onClick={() => navigateEndMonth(-1)}
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                <ChevronLeft className="w-5 h-5 text-gray-600" />
                              </button>

                              <span className="font-medium">
                                {monthNames[endCalendarDate.month]}{" "}
                                {endCalendarDate.year}
                              </span>

                              <button
                                onClick={() => navigateEndMonth(1)}
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                              </button>
                            </div>

                            {/* Days of Week Header */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                              {[
                                "Sun",
                                "Mon",
                                "Tue",
                                "Wed",
                                "Thu",
                                "Fri",
                                "Sat",
                              ].map((day) => (
                                <div
                                  key={day}
                                  className="text-xs font-medium text-gray-500 text-center p-2"
                                >
                                  {day}
                                </div>
                              ))}
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-1">
                              {generateCalendar(
                                endCalendarDate.month,
                                endCalendarDate.year,
                                formData.endDate,
                                (date) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    endDate: date,
                                  }));
                                  setShowEndCalendar(false);
                                }
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* End Early Toggle */}
                    <div className="mt-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              endTestEarly: !prev.endTestEarly,
                            }))
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${
                            formData.endTestEarly
                              ? "bg-blue-300/40"
                              : "bg-white border border-black"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                              formData.endTestEarly
                                ? "translate-x-6 bg-blue-600"
                                : "translate-x-1 bg-black"
                            }`}
                          />
                        </div>

                        <span className="text-sm">
                          End test early if a winner is found
                        </span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </label>
                    </div>

                    {/* Minimum Spend */}
                    <div className="mt-4   ">
                      <h1 className="font-bold">Minimum ad spend limit</h1>
                      <p className="text-sm text-gray-600">
                        One or more ad sets in this test are using Advantage+
                        campaign budget. To ensure sufficient delivery for a
                        fair comparison, a minimum ad spend limit of no more
                        than 10% of your campaign budget will be set for each of
                        them during the test.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right column preview */}
                <div className="space-y-4 col-span-2">
                  <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex flex-row justify-between">
                      <div className="flex items-start flex-col gap-1 mb-2">
                        <span className="text-lg font-bold">Version A</span>
                      </div>
                      {formData.variable ? (
                        <div className="w-12 h-12 bg-red-100 rounded overflow-hidden flex-shrink-0">
                          <img
                            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=60&h=60&fit=crop&crop=center"
                            alt="Auto Insurance"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded animate-pulse flex-shrink-0"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      {formData.variable ? (
                        <span className="text-sm text-gray-700 flex justify-center items-center gap-1">
                          <Blocks size={16} />
                          Auto Insurance Lea...
                        </span>
                      ) : (
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex flex-row justify-between">
                      <div className="flex items-start flex-col gap-1 mb-2">
                        <span className="text-lg font-bold">Version B</span>
                        {formData.selectedAd && (
                          <p className="text-gray-300">Copy of version A</p>
                        )}
                      </div>
                      {formData.selectedAd ? (
                        <div className="w-12 h-12 bg-red-100 rounded overflow-hidden flex-shrink-0">
                          <img
                            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=60&h=60&fit=crop&crop=center"
                            alt="Auto Insurance"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded animate-pulse flex-shrink-0"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      {formData.selectedAd ? (
                        <div className="flex flex-col justify-center items-start">
                          <span className="text-sm text-gray-700 flex justify-center items-center gap-1">
                            <Blocks size={16} />
                            Auto Insurance Lea...
                          </span>
                          <p className="text-xs">
                            You can change the creative after you've finished
                            setting up the test in the next step
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-1">
                            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                          <div className="w-32 h-3 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Header with close button */}
        <div className="flex justify-end items-center px-4 mb-[-30px] z-50 ">
          {/* <button
            onClick={close}
            className="absolute top-3 right-3 bg-white/70 hover:bg-white rounded-full p-1 shadow z-20"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button> */}
        </div>

        {renderStep()}

        {/* Footer navigation */}
        <div className="sticky bottom-0 bg-white border-t border-gray-300 p-4 flex justify-between items-center">
          <button
            onClick={prev}
            disabled={step === 1 || isPublishing}
            className={`px-4 py-2 rounded-lg border ${
              step === 1 || isPublishing
                ? "text-gray-400 border-gray-200"
                : "text-blue-600 border-blue-200 hover:bg-blue-50"
            }`}
          >
            Previous
          </button>
          <button
            onClick={step === 4 ? handlePublish : next}
            disabled={
              isPublishing ||
              (step === 3 && (!formData.variable || !formData.selectedAd))
            }
            className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
              isPublishing ||
              (step === 3 && (!formData.variable || !formData.selectedAd))
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {step === 4 ? (
              isPublishing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Publishing...
                </>
              ) : (
                <>
                  Publish test
                  <ChevronRight className="w-4 h-4" />
                </>
              )
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ABTestWizard;
