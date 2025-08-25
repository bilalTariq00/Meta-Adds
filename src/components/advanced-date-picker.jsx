"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const DatePicker = () => {
  const [formData, setFormData] = useState({
    startDate: "26/8/2025",
  });
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState({
    month: 7, // August (0-indexed)
    year: 2025,
  });

  const calendarRef = useRef(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowStartCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Parse date from DD/MM/YYYY format
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

  // Format date to DD/MM/YYYY
  const formatDate = (date) => {
    if (!date || !(date instanceof Date)) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Handle input change
  const handleInputChange = (value) => {
    setFormData((prev) => ({ ...prev, startDate: value }));

    // Try to parse the date and update calendar view
    const parsedDate = parseDate(value);
    if (parsedDate) {
      setCalendarDate({
        month: parsedDate.getMonth(),
        year: parsedDate.getFullYear(),
      });
    }
  };

  // Handle date selection from calendar
  const handleDateSelect = (date) => {
    const formattedDate = formatDate(date);
    setFormData((prev) => ({ ...prev, startDate: formattedDate }));
    setShowStartCalendar(false);
  };

  // Navigate months
  const navigateMonth = (direction) => {
    setCalendarDate((prev) => {
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

  // Handle month/year change from dropdowns
  const handleMonthChange = (month) => {
    setCalendarDate((prev) => ({ ...prev, month: Number.parseInt(month, 10) }));
  };

  const handleYearChange = (year) => {
    setCalendarDate((prev) => ({ ...prev, year: Number.parseInt(year, 10) }));
  };

  // Generate calendar days
  const generateCalendar = () => {
    const { month, year } = calendarDate;
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

    return days;
  };

  // Check if a date is selected
  const isDateSelected = (date) => {
    if (!date) return false;
    const selectedDate = parseDate(formData.startDate);
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  // Check if a date is today
  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
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

  // Generate year options (current year ± 10 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    yearOptions.push(i);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Advanced Date Picker
      </h2>

      <div className="relative" ref={calendarRef}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Start Date
        </label>

        {/* Date Input with Calendar Icon */}
        <div className="flex items-center border border-gray-300 rounded-lg bg-white shadow-sm">
          <input
            type="text"
            value={formData.startDate}
            onChange={(e) => handleInputChange(e.target.value)}
            onClick={() => setShowStartCalendar(!showStartCalendar)}
            placeholder="DD/MM/YYYY"
            className="w-full p-3 rounded-l-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={() => setShowStartCalendar(!showStartCalendar)}
            className="p-3 border-l border-gray-300 rounded-r-lg bg-white hover:bg-gray-50 flex items-center justify-center"
          >
            <Calendar className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Calendar Popup */}
        {showStartCalendar && (
          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20 p-4 min-w-80">
            {/* Calendar Header with Navigation and Dropdowns */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              <div className="flex items-center space-x-2">
                {/* Month Dropdown */}
                <select
                  value={calendarDate.month}
                  onChange={(e) => handleMonthChange(e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {monthNames.map((month, index) => (
                    <option key={month} value={index}>
                      {month}
                    </option>
                  ))}
                </select>

                {/* Year Dropdown */}
                <select
                  value={calendarDate.year}
                  onChange={(e) => handleYearChange(e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => navigateMonth(1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
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
              {generateCalendar().map((date, index) => (
                <button
                  key={index}
                  onClick={() => date && handleDateSelect(date)}
                  disabled={!date}
                  className={`
                    p-2 text-sm rounded hover:bg-blue-50 transition-colors
                    ${!date ? "invisible" : ""}
                    ${
                      isDateSelected(date)
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : ""
                    }
                    ${
                      isToday(date) && !isDateSelected(date)
                        ? "bg-blue-100 text-blue-700"
                        : ""
                    }
                    ${
                      date && !isDateSelected(date) && !isToday(date)
                        ? "text-gray-700"
                        : ""
                    }
                  `}
                >
                  {date ? date.getDate() : ""}
                </button>
              ))}
            </div>

            {/* Today Button */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <button
                onClick={() => {
                  const today = new Date();
                  handleDateSelect(today);
                  setCalendarDate({
                    month: today.getMonth(),
                    year: today.getFullYear(),
                  });
                }}
                className="w-full py-2 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
              >
                Today
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Display Selected Date Info */}
      <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Selected Date:
        </h3>
        <p className="text-lg font-semibold text-gray-900">
          {formData.startDate || "No date selected"}
        </p>
        {parseDate(formData.startDate) && (
          <p className="text-sm text-gray-500 mt-1">
            {parseDate(formData.startDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </div>
    </div>
  );
};

export default DatePicker;
