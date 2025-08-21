import React, { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar,
  Info,
} from "lucide-react";

const ABTestWizard = ({ open = true, onClose = () => {} }) => {
  const [step, setStep] = useState(1);
  const [showVariableDropdown, setShowVariableDropdown] = useState(false);
  const [showAdDropdown, setShowAdDropdown] = useState(false);
  const [showMetricDropdown, setShowMetricDropdown] = useState(false);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  const [formData, setFormData] = useState({
    testName: "Creative test",
    variable: "Creative",
    selectedAd: "Auto Insurance Leads - AFDTFB",
    keyMetric: "CPC (cost per link click)",
    includeUpperFunnel: true,
    endTestEarly: true,
    startDate: "23/8/2025",
    endDate: "30/8/2025",
  });

  if (!open) return null;

  const next = () => setStep((s) => Math.min(9, s + 1));
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
    "CPC (cost per link click)",
    "CTR (click-through rate)",
    "CPA (cost per acquisition)",
    "CPM (cost per mille)",
  ];

  const generateCalendar = (month, year, selectedDate, onDateSelect) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate === `${day}/${month + 1}/${year}` ||
        (selectedDate === `${day}/8/2025` && month === 7);
      const isToday =
        today.getDate() === day &&
        today.getMonth() === month &&
        today.getFullYear() === year;

      days.push(
        <button
          key={day}
          onClick={() => onDateSelect(`${day}/${month + 1}/${year}`)}
          className={`w-8 h-8 text-sm rounded hover:bg-gray-100 ${
            isSelected ? "bg-blue-500 text-white" : isToday ? "bg-gray-200" : ""
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="px-6 py-4 border-b bg-gray-50"></div>
            <div className="p-8">
              {/* Hero illustration placeholder */}
              <div className="w-full h-32 bg-gradient-to-r from-pink-100 via-blue-100 to-cyan-100 rounded-lg mb-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-200/50 via-blue-200/50 to-cyan-200/50"></div>
                <div className="relative text-4xl">📊 🧪 📈</div>
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                  Help improve ad performance with A/B testing
                </h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Compare versions with different images, text, audiences or
                  other settings to see what works best. We'll make sure that
                  nobody sees more than one version for better accuracy.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-semibold text-sm">
                        1
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Choose what to test
                      </h3>
                      <p className="text-sm text-gray-600">
                        You can copy an existing campaign or ad set or compare
                        published ones.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-semibold text-sm">
                        2
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Select test settings
                      </h3>
                      <p className="text-sm text-gray-600">
                        This includes duration and key metrics, which are what
                        we'll use to determine a winner.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-semibold text-sm">
                        3
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Get results
                      </h3>
                      <p className="text-sm text-gray-600">
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
            <div className="px-6 py-4 border-b bg-gray-50"></div>
            <div className="p-8">
              {/* Hero illustration */}
              <div className="w-full h-32 bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100 rounded-lg mb-8 flex items-center justify-center relative overflow-hidden">
                <div className="relative text-4xl">🎯 📝 🔄</div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold mb-6">
                    Start by setting up an ad to test against the one you
                    selected
                  </h2>
                  <p className="text-gray-600 mb-6">
                    You can make a copy of your ad and edit it, or you can pick
                    a second ad to test it against.
                  </p>

                  <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="adChoice"
                        defaultChecked
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="font-medium">
                        Make a copy of this ad
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="adChoice"
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="font-medium">
                        Pick another existing ad
                      </span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-lg border p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium">Version A</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-100 rounded overflow-hidden flex-shrink-0">
                        <img
                          src="/api/placeholder/48/48"
                          alt="Auto Insurance"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm text-gray-700">
                        Auto Insurance Lea...
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg border border-dashed p-4">
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
            <div className="px-6 py-4 border-b bg-gray-50"></div>
            <div className="p-8">
              <div className="w-full h-32 bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100 rounded-lg mb-8 flex items-center justify-center relative overflow-hidden">
                <div className="relative text-4xl">🔄 👥 📍 ⚙️</div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Which variable would you like to test?
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Select the variable that will differ for each version.
                    Choose Custom to compare more than one variable at the same
                    time.
                  </p>

                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowVariableDropdown(!showVariableDropdown)
                      }
                      className="w-full p-3 border border-blue-500 rounded-lg bg-white flex items-center justify-between text-left"
                    >
                      <span>Select a variable to test</span>
                      <ChevronDown className="w-5 h-5" />
                    </button>

                    {showVariableDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10">
                        {variables.map((variable, index) => (
                          <label
                            key={index}
                            className="flex items-start gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
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
                              <div className="font-medium">{variable.name}</div>
                              <div className="text-sm text-gray-600">
                                {variable.description}
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-lg border p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium">Version A</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-100 rounded overflow-hidden flex-shrink-0">
                        <img
                          src="/api/placeholder/48/48"
                          alt="Auto Insurance"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm text-gray-700">
                        Auto Insurance Lea...
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg border border-dashed p-4">
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

      case 4:
        return (
          <>
            <div className="px-6 py-4 border-b bg-gray-50"></div>
            <div className="p-8">
              <div className="w-full h-32 bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100 rounded-lg mb-8 flex items-center justify-center relative overflow-hidden">
                <div className="relative text-4xl">🔄 👥 📍 ⚙️</div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Which variable would you like to test?
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Select the variable that will differ for each version.
                    Choose Custom to compare more than one variable at the same
                    time.
                  </p>

                  <div className="space-y-4">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowVariableDropdown(!showVariableDropdown)
                        }
                        className="w-full p-3 border border-blue-500 rounded-lg bg-white flex items-center justify-between text-left"
                      >
                        <span className="text-blue-600 font-medium">
                          {formData.variable}
                        </span>
                        <div className="flex items-center gap-2">
                          <ChevronDown className="w-5 h-5" />
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
                        </div>
                      </button>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4">
                        Which ad do you want to copy?
                      </h3>
                      <div className="relative">
                        <button
                          onClick={() => setShowAdDropdown(!showAdDropdown)}
                          className="w-full p-3 border border-blue-500 rounded-lg bg-white flex items-center justify-between text-left"
                        >
                          <span className="text-blue-600 font-medium">
                            {formData.selectedAd}
                          </span>
                          <div className="flex items-center gap-2">
                            <ChevronDown className="w-5 h-5" />
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
                                    src={ad.image}
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

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <div className="font-medium text-blue-900 mb-1">
                            Duplicating selected ad set for your test.
                          </div>
                          <div className="text-blue-700">
                            We'll duplicate your selected ad set, which you can
                            edit and publish. Your test will begin once your new
                            ad set has been published.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-lg border p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium">Version A</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-100 rounded overflow-hidden flex-shrink-0">
                        <img
                          src="/api/placeholder/48/48"
                          alt="Auto Insurance"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm text-gray-700">
                        Auto Insurance Lea...
                      </span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Version B
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-red-100 rounded overflow-hidden flex-shrink-0">
                        <img
                          src="/api/placeholder/48/48"
                          alt="Auto Insurance"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium">
                        Copy of version A
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      You can change the creative after you've finished setting
                      up the test in the next step.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 5:
        return (
          <>
            <div className="px-6 py-4 border-b bg-gray-50"></div>
            <div className="p-8">
              <div className="w-full h-32 bg-gradient-to-r from-cyan-100 via-pink-100 to-orange-100 rounded-lg mb-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/50 via-pink-200/50 to-orange-200/50" />
                <div className="relative text-4xl">📋 📊 📅 ⚙️</div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Test Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
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
                      className="w-full p-3 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Key Metric */}
                  <div>
                    <h3 className="font-semibold mb-2">
                      Determining the winner
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Pick a key metric, which will determine the winning
                      version.
                    </p>
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowMetricDropdown(!showMetricDropdown)
                        }
                        className="w-full p-3 border rounded-lg bg-white flex items-center justify-between text-left"
                      >
                        <span>{formData.keyMetric}</span>
                        <ChevronDown className="w-5 h-5" />
                      </button>
                      {showMetricDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10">
                          {metrics.map((metric, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  keyMetric: metric,
                                }));
                                setShowMetricDropdown(false);
                              }}
                              className="w-full p-3 text-left hover:bg-gray-50 border-b last:border-b-0"
                            >
                              {metric}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Upper Funnel Toggle */}
                    <label className="flex items-center gap-3 cursor-pointer mt-4">
                      <input
                        type="checkbox"
                        checked={formData.includeUpperFunnel}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            includeUpperFunnel: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 rounded text-blue-600"
                      />
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
                    <p className="text-sm text-gray-600 mb-4">
                      This test will run from 00:00 on your start date to 00:00
                      on your end date.
                    </p>

                    {/* Start Date */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Start
                      </label>
                      <div className="relative">
                        <button
                          onClick={() =>
                            setShowStartCalendar(!showStartCalendar)
                          }
                          className="w-full p-3 border rounded-lg bg-white flex items-center gap-2 text-left"
                        >
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <span>{formData.startDate}</span>
                        </button>
                        {showStartCalendar && (
                          <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg z-10 p-4">
                            <div className="flex items-center justify-between mb-4">
                              <ChevronLeft className="w-5 h-5 cursor-pointer" />
                              <span className="font-medium">August 2025</span>
                              <ChevronRight className="w-5 h-5 cursor-pointer" />
                            </div>
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
                                  className="text-xs text-gray-500 text-center"
                                >
                                  {day}
                                </div>
                              ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                              {generateCalendar(
                                7,
                                2025,
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
                      <div className="relative">
                        <button
                          onClick={() => setShowEndCalendar(!showEndCalendar)}
                          className="w-full p-3 border rounded-lg bg-white flex items-center gap-2 text-left"
                        >
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <span>{formData.endDate}</span>
                        </button>
                        {showEndCalendar && (
                          <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg z-10 p-4">
                            <div className="flex items-center justify-between mb-4">
                              <ChevronLeft className="w-5 h-5 cursor-pointer" />
                              <span className="font-medium">August 2025</span>
                              <ChevronRight className="w-5 h-5 cursor-pointer" />
                            </div>
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
                                  className="text-xs text-gray-500 text-center"
                                >
                                  {day}
                                </div>
                              ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                              {generateCalendar(
                                7,
                                2025,
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
                        <input
                          type="checkbox"
                          checked={formData.endTestEarly}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              endTestEarly: e.target.checked,
                            }))
                          }
                          className="w-4 h-4 rounded text-blue-600"
                        />
                        <span className="text-sm">
                          End test early if a winner is found
                        </span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </label>
                    </div>

                    {/* Minimum Spend */}
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600 border">
                      One or more ad sets in this test are using Advantage+
                      campaign budget. To ensure sufficient delivery for a fair
                      comparison, a minimum ad spend limit of no more than 10%
                      of your campaign budget will be set for each of them
                      during the test.
                    </div>
                  </div>
                </div>

                {/* Right column preview */}
                <div className="space-y-4">
                  <div className="bg-white rounded-lg border p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium">Version A</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-100 rounded overflow-hidden flex-shrink-0">
                        <img
                          src="/api/placeholder/48/48"
                          alt="Auto Insurance"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm text-gray-700">
                        Auto Insurance Lea...
                      </span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Version B
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-red-100 rounded overflow-hidden flex-shrink-0">
                        <img src="/api/placeholder/48/48" alt="Auto" />
                      </div>
                      <span className="text-sm font-medium">
                        Copy of version A
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      You can change the creative after you've finished setting
                      up the test in the next step.
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">A/B Test Wizard</h2>
          <button onClick={close}>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {renderStep()}

        {/* Footer navigation */}
        <div className="flex justify-between items-center p-4 border-t">
          <button
            onClick={prev}
            disabled={step === 1}
            className={`px-4 py-2 rounded-lg border ${
              step === 1
                ? "text-gray-400 border-gray-200"
                : "text-blue-600 border-blue-200 hover:bg-blue-50"
            }`}
          >
            Back
          </button>
          <button
            onClick={next}
            disabled={step === 5}
            className={`px-4 py-2 rounded-lg ${
              step === 5
                ? "bg-gray-300 text-gray-500"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {step === 5 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ABTestWizard;
