import { useState, useEffect, useRef } from "react";
import { 
  ChevronDown, 
  Search, 
  MoreHorizontal, 
  Info,
  Check,
  Circle,
  Users,
  UserPlus,
  Folder,
  DivideSquare
} from "lucide-react";

export default function Audiences() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAudienceType, setSelectedAudienceType] = useState("all");
  const [expandedFilters, setExpandedFilters] = useState({});
  const [selectedAudiences, setSelectedAudiences] = useState([]);
  const [showColumnsDropdown, setShowColumnsDropdown] = useState(false);
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filteredAudiences, setFilteredAudiences] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    availability: true,
    type: false,
    audienceLabel: false,
    estimatedSize: false,
    dateCreated: false,
    audienceId: false,
    sharing: false,
    source: false,
    status: false
  });
  const [activeFilters, setActiveFilters] = useState({
    status: [],
    type: [],
    availability: [],
    source: []
  });

  const audiences = [
    {
      id: 1,
      name: "DYT Home Improvement - Tonic",
      availability: "Ready",
      status: "active",
      type: "Custom Audience",
      source: "Website",
      audienceLabel: "Home Improvement",
      estimatedSize: "125,000",
      dateCreated: "2024-01-15",
      audienceId: "123456789",
      sharing: "Not shared"
    },
    {
      id: 2,
      name: "Lookalike Audience - 1%",
      availability: "Ready", 
      status: "active",
      type: "Lookalike Audience",
      source: "Custom Audience",
      audienceLabel: "Lookalike 1%",
      estimatedSize: "2.5M",
      dateCreated: "2024-01-20",
      audienceId: "123456790",
      sharing: "Shared with 2 accounts"
    },
    {
      id: 3,
      name: "Website Visitors - 30 days",
      availability: "Ready",
      status: "active", 
      type: "Custom Audience",
      source: "Website",
      audienceLabel: "Website Traffic",
      estimatedSize: "45,000",
      dateCreated: "2024-01-10",
      audienceId: "123456791",
      sharing: "Not shared"
    },
    {
      id: 4,
      name: "Email Subscribers",
      availability: "Ready",
      status: "active",
      type: "Custom Audience",
      source: "Customer List",
      audienceLabel: "Email List",
      estimatedSize: "15,000",
      dateCreated: "2024-01-05",
      audienceId: "123456792",
      sharing: "Not shared"
    },
    {
      id: 5,
      name: "App Users - 7 days",
      availability: "Processing",
      status: "active",
      type: "Custom Audience",
      source: "App",
      audienceLabel: "App Users",
      estimatedSize: "8,500",
      dateCreated: "2024-01-25",
      audienceId: "123456793",
      sharing: "Not shared"
    },
    {
      id: 6,
      name: "Engagement Audience",
      availability: "Ready",
      status: "active",
      type: "Saved Audience",
      source: "Engagement",
      audienceLabel: "Engaged Users",
      estimatedSize: "32,000",
      dateCreated: "2024-01-12",
      audienceId: "123456794",
      sharing: "Shared with 1 account"
    },
    {
      id: 7,
      name: "High Value Customers",
      availability: "Ready",
      status: "active",
      type: "Custom Audience",
      source: "Customer List",
      audienceLabel: "High Value",
      estimatedSize: "5,200",
      dateCreated: "2024-01-08",
      audienceId: "123456795",
      sharing: "Not shared"
    },
    {
      id: 8,
      name: "Mobile App Users",
      availability: "Ready",
      status: "active",
      type: "Custom Audience",
      source: "App",
      audienceLabel: "Mobile Users",
      estimatedSize: "12,000",
      dateCreated: "2024-01-18",
      audienceId: "123456796",
      sharing: "Not shared"
    },
    {
      id: 9,
      name: "Video Viewers - 25%",
      availability: "Processing",
      status: "active",
      type: "Lookalike Audience",
      source: "Engagement",
      audienceLabel: "Video Viewers",
      estimatedSize: "1.8M",
      dateCreated: "2024-01-22",
      audienceId: "123456797",
      sharing: "Not shared"
    },
    {
      id: 10,
      name: "Cart Abandoners",
      availability: "Ready",
      status: "active",
      type: "Custom Audience",
      source: "Website",
      audienceLabel: "Cart Abandon",
      estimatedSize: "3,500",
      dateCreated: "2024-01-14",
      audienceId: "123456798",
      sharing: "Not shared"
    },
    {
      id: 11,
      name: "Newsletter Subscribers",
      availability: "Ready",
      status: "active",
      type: "Custom Audience",
      source: "Customer List",
      audienceLabel: "Newsletter",
      estimatedSize: "22,000",
      dateCreated: "2024-01-03",
      audienceId: "123456799",
      sharing: "Not shared"
    },
    {
      id: 12,
      name: "Lookalike Audience - 2%",
      availability: "Ready",
      status: "active",
      type: "Lookalike Audience",
      source: "Custom Audience",
      audienceLabel: "Lookalike 2%",
      estimatedSize: "1.2M",
      dateCreated: "2024-01-19",
      audienceId: "123456800",
      sharing: "Not shared"
    },
    {
      id: 13,
      name: "Website Visitors - 7 days",
      availability: "Ready",
      status: "active",
      type: "Custom Audience",
      source: "Website",
      audienceLabel: "Recent Visitors",
      estimatedSize: "18,000",
      dateCreated: "2024-01-16",
      audienceId: "123456801",
      sharing: "Not shared"
    },
    {
      id: 14,
      name: "Email Subscribers - 90 days",
      availability: "Ready",
      status: "active",
      type: "Custom Audience",
      source: "Customer List",
      audienceLabel: "Email 90d",
      estimatedSize: "28,000",
      dateCreated: "2024-01-07",
      audienceId: "123456802",
      sharing: "Not shared"
    },
    {
      id: 15,
      name: "Engagement - 14 days",
      availability: "Processing",
      status: "active",
      type: "Custom Audience",
      source: "Engagement",
      audienceLabel: "Recent Engagement",
      estimatedSize: "9,500",
      dateCreated: "2024-01-24",
      audienceId: "123456803",
      sharing: "Not shared"
    }
  ];

  // Filter and search functionality
  useEffect(() => {
    let filtered = audiences;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(audience =>
        audience.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        audience.id.toString().includes(searchQuery)
      );
    }

    // Audience type filter
    if (selectedAudienceType === "expiring") {
      filtered = filtered.filter(audience => audience.status === "expiring");
    }

    // Active filters
    Object.entries(activeFilters).forEach(([filterType, selectedValues]) => {
      if (selectedValues.length > 0) {
        filtered = filtered.filter(audience => {
          const audienceValue = audience[filterType];
          return selectedValues.includes(audienceValue);
        });
      }
    });

    // Sorting
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredAudiences(filtered);
  }, [searchQuery, selectedAudienceType, activeFilters, sortField, sortDirection]);

  const toggleFilter = (filterName) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const handleFilterChange = (filterType, value, isChecked) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: isChecked
        ? [...prev[filterType], value]
        : prev[filterType].filter(item => item !== value)
    }));
  };

  const handleAudienceSelect = (audienceId) => {
    setSelectedAudiences(prev => 
      prev.includes(audienceId) 
        ? prev.filter(id => id !== audienceId)
        : [...prev, audienceId]
    );
  };

  const handleSelectAll = () => {
    if (selectedAudiences.length === filteredAudiences.length) {
      setSelectedAudiences([]);
    } else {
      setSelectedAudiences(filteredAudiences.map(audience => audience.id));
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleColumnToggle = (column) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  const handleCreateAudience = (type) => {
    alert(`Creating ${type} audience...`);
    setShowCreateDropdown(false);
  };

  // Close dropdowns when clicking outside
  const createDropdownRef = useRef(null);
  const columnsDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (createDropdownRef.current && !createDropdownRef.current.contains(event.target)) {
        setShowCreateDropdown(false);
      }
      if (columnsDropdownRef.current && !columnsDropdownRef.current.contains(event.target)) {
        setShowColumnsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="h-[70vh] rounded-md flex w-full px-2 overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-80 bg-white  flex flex-col h-[70vh] rounded-l-md overflow-hidden sticky top-0 z-20">
        {/* Sidebar Header */}
        <div className="p-4 ">
          <div className="flex items-center justify-between">
            <div className="relative" ref={createDropdownRef}>
              <button
                onClick={() => setShowCreateDropdown(!showCreateDropdown)}
                className="flex items-center space-x-2 bg-[#0A78BE] text-[12px] text-white px-3 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                <span>Create Audience</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showCreateDropdown && (
                <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="py-2">
                    <button 
                      onClick={() => handleCreateAudience("Custom Audience")}
                      className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium">Custom Audience</span>
                    </button>
                    <button 
                      onClick={() => handleCreateAudience("Lookalike Audience")}
                      className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <UserPlus className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium">Lookalike Audience</span>
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button 
                      onClick={() => handleCreateAudience("Saved Audience")}
                      className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <Folder className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium">Saved Audience</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or audience ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Audience Selection */}
        <div className="p-4">
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="audienceType"
                value="all"
                checked={selectedAudienceType === "all"}
                onChange={(e) => setSelectedAudienceType(e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 flex-shrink-0"
              />
              <span className="ml-3 text-sm font-medium text-gray-900">All audiences</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="audienceType"
                value="expiring"
                checked={selectedAudienceType === "expiring"}
                onChange={(e) => setSelectedAudienceType(e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 flex-shrink-0"
              />
              <span className="ml-3 text-sm font-medium text-gray-900">Expiring audiences</span>
              <Info className="ml-2 w-4 h-4 text-gray-400" />
            </label>
          </div>
        </div>

        {/* Filter Section */}
        <div className="p-4 flex-1 overflow-y-auto">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Filter</h3>
          <div className="space-y-1">
            {/* Status Filter */}
            <div>
              <button
                onClick={() => toggleFilter("Status")}
                className={`w-full flex items-center justify-between py-2 px-3 text-sm text-gray-700 hover:text-gray-900 rounded ${
                  expandedFilters["Status"] ? 'bg-blue-50' : ''
                }`}
              >
                <span>Status</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${
                  expandedFilters["Status"] ? 'rotate-180' : ''
                }`} />
              </button>
              {expandedFilters["Status"] && (
                <div className="bg-blue-50 rounded mt-1 p-2 space-y-2">
                  {["In Active Ads", "Recently Used", "Shared", "Action Needed"].map((option) => (
                    <label key={option} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                        checked={activeFilters.status.includes(option)}
                        onChange={(e) => handleFilterChange("status", option, e.target.checked)}
                      />
                      <span className="ml-2 text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Type Filter */}
            <div>
              <button
                onClick={() => toggleFilter("Type")}
                className={`w-full flex items-center justify-between py-2 px-3 text-sm text-gray-700 hover:text-gray-900 rounded ${
                  expandedFilters["Type"] ? 'bg-blue-50' : ''
                }`}
              >
                <span>Type</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${
                  expandedFilters["Type"] ? 'rotate-180' : ''
                }`} />
              </button>
              {expandedFilters["Type"] && (
                <div className="bg-blue-50 rounded mt-1 p-2 space-y-2">
                  {["Custom Audience", "Lookalike Audience", "Saved Audience"].map((option) => (
                    <label key={option} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                        checked={activeFilters.type.includes(option)}
                        onChange={(e) => handleFilterChange("type", option, e.target.checked)}
                      />
                      <span className="ml-2 text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Availability Filter */}
            <div>
              <button
                onClick={() => toggleFilter("Availability")}
                className={`w-full flex items-center justify-between py-2 px-3 text-sm text-gray-700 hover:text-gray-900 rounded ${
                  expandedFilters["Availability"] ? 'bg-blue-50' : ''
                }`}
              >
                <span>Availability</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${
                  expandedFilters["Availability"] ? 'rotate-180' : ''
                }`} />
              </button>
              {expandedFilters["Availability"] && (
                <div className="bg-blue-50 rounded mt-1 p-2 space-y-2">
                  {["Ready", "Processing", "Error"].map((option) => (
                    <label key={option} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                        checked={activeFilters.availability.includes(option)}
                        onChange={(e) => handleFilterChange("availability", option, e.target.checked)}
                      />
                      <span className="ml-2 text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Source Filter */}
            <div>
              <button
                onClick={() => toggleFilter("Source")}
                className={`w-full flex items-center justify-between py-2 px-3 text-sm text-gray-700 hover:text-gray-900 rounded ${
                  expandedFilters["Source"] ? 'bg-blue-50' : ''
                }`}
              >
                <span>Source</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${
                  expandedFilters["Source"] ? 'rotate-180' : ''
                }`} />
              </button>
              {expandedFilters["Source"] && (
                <div className="bg-blue-50 rounded mt-1 p-2 space-y-2">
                  {["Website", "App", "Customer List", "Engagement"].map((option) => (
                    <label key={option} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                        checked={activeFilters.source.includes(option)}
                        onChange={(e) => handleFilterChange("source", option, e.target.checked)}
                      />
                      <span className="ml-2 text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Size Filter */}
            <div>
              <button
                onClick={() => toggleFilter("Size")}
                className={`w-full flex items-center justify-between py-2 px-3 text-sm text-gray-700 hover:text-gray-900 rounded ${
                  expandedFilters["Size"] ? 'bg-blue-50' : ''
                }`}
              >
                <span>Size</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${
                  expandedFilters["Size"] ? 'rotate-180' : ''
                }`} />
              </button>
              {expandedFilters["Size"] && (
                <div className="bg-blue-50 rounded mt-1 p-2 space-y-2">
                  {["Small (1K-10K)", "Medium (10K-100K)", "Large (100K-1M)", "Very Large (1M+)"].map((option) => (
                    <label key={option} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                      />
                      <span className="ml-2 text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Created Date Filter */}
            <div>
              <button
                onClick={() => toggleFilter("Created")}
                className={`w-full flex items-center justify-between py-2 px-3 text-sm text-gray-700 hover:text-gray-900 rounded ${
                  expandedFilters["Created"] ? 'bg-blue-50' : ''
                }`}
              >
                <span>Created</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${
                  expandedFilters["Created"] ? 'rotate-180' : ''
                }`} />
              </button>
              {expandedFilters["Created"] && (
                <div className="bg-blue-50 rounded mt-1 p-2 space-y-2">
                  {["Last 7 days", "Last 30 days", "Last 90 days", "Last year"].map((option) => (
                    <label key={option} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                      />
                      <span className="ml-2 text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-[70vh] overflow-hidden">
        {/* Header */}
        <div className="bg-white px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-end">
            {/* Columns Button */}
            <div className="relative" ref={columnsDropdownRef}>
              <button
                onClick={() => setShowColumnsDropdown(!showColumnsDropdown)}
                className="flex items-center space-x-2 text-[14px] border border-gray-500 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <DivideSquare className="w-5 h-5" />
                <span>Columns</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showColumnsDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="py-2">
                    <div className="px-4 py-2 text-sm font-medium text-gray-900 border-b border-gray-200">
                      Show/Hide Columns
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <label className="flex items-start px-4 py-3 hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={visibleColumns.type}
                          onChange={() => handleColumnToggle('type')}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5 flex-shrink-0"
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">Type</div>
                          <div className="text-xs text-gray-500 mt-1">
                            The type of audience, including a Custom Audience, lookalike or <span className="text-blue-600">Accounts Centre accounts</span> connected to your Page, event or app.
                          </div>
                        </div>
                      </label>
                      
                      <label className="flex items-start px-4 py-3 hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={visibleColumns.audienceLabel}
                          onChange={() => handleColumnToggle('audienceLabel')}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5 flex-shrink-0"
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">Audience label</div>
                          <div className="text-xs text-gray-500 mt-1">
                            Label for the audience
                          </div>
                        </div>
                      </label>
                      
                      <label className="flex items-start px-4 py-3 hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={visibleColumns.estimatedSize}
                          onChange={() => handleColumnToggle('estimatedSize')}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5 flex-shrink-0"
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">Estimated audience size</div>
                          <div className="text-xs text-gray-500 mt-1">
                            The number of <span className="text-blue-600">Accounts Centre accounts</span> that Facebook has identified in the audience.
                          </div>
                        </div>
                      </label>
                      
                      <label className="flex items-start px-4 py-3 hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={visibleColumns.dateCreated}
                          onChange={() => handleColumnToggle('dateCreated')}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5 flex-shrink-0"
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">Date Created</div>
                          <div className="text-xs text-gray-500 mt-1">
                            The date and time the audience was created.
                          </div>
                        </div>
                      </label>
                      
                      <label className="flex items-start px-4 py-3 hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={visibleColumns.audienceId}
                          onChange={() => handleColumnToggle('audienceId')}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5 flex-shrink-0"
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">Audience ID</div>
                          <div className="text-xs text-gray-500 mt-1">
                            The ID number that is unique to each audience.
                          </div>
                        </div>
                      </label>
                      
                      <label className="flex items-start px-4 py-3 hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={visibleColumns.sharing}
                          onChange={() => handleColumnToggle('sharing')}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5 flex-shrink-0"
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">Sharing</div>
                          <div className="text-xs text-gray-500 mt-1">
                            The accounts you have shared an audience with or the account
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 bg-white overflow-auto">
         
          <div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedAudiences.length === filteredAudiences.length && filteredAudiences.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                    />
                  </th>
                  {visibleColumns.name && (
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center">
                        Name
                        {sortField === 'name' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  )}
                  {visibleColumns.availability && (
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('availability')}
                    >
                      <div className="flex items-center">
                        Availability
                        {sortField === 'availability' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  )}
                  {visibleColumns.type && (
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('type')}
                    >
                      <div className="flex items-center">
                        Type
                        {sortField === 'type' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  )}
                  {visibleColumns.audienceLabel && (
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('audienceLabel')}
                    >
                      <div className="flex items-center">
                        Audience Label
                        {sortField === 'audienceLabel' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  )}
                  {visibleColumns.estimatedSize && (
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('estimatedSize')}
                    >
                      <div className="flex items-center">
                        Estimated Size
                        {sortField === 'estimatedSize' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  )}
                  {visibleColumns.dateCreated && (
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('dateCreated')}
                    >
                      <div className="flex items-center">
                        Date Created
                        {sortField === 'dateCreated' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  )}
                  {visibleColumns.audienceId && (
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('audienceId')}
                    >
                      <div className="flex items-center">
                        Audience ID
                        {sortField === 'audienceId' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  )}
                  {visibleColumns.sharing && (
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('sharing')}
                    >
                      <div className="flex items-center">
                        Sharing
                        {sortField === 'sharing' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  )}
                  {visibleColumns.source && (
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('source')}
                    >
                      <div className="flex items-center">
                        Source
                        {sortField === 'source' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  )}
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAudiences.map((audience) => (
                  <tr key={audience.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedAudiences.includes(audience.id)}
                        onChange={() => handleAudienceSelect(audience.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                      />
                    </td>
                    {visibleColumns.name && (
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                          {audience.name}
                        </div>
                      </td>
                    )}
                    {visibleColumns.availability && (
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Circle className={`w-2 h-2 mr-2 ${
                            audience.availability === "Ready" ? "text-green-500" :
                            audience.availability === "Processing" ? "text-yellow-500" :
                            "text-red-500"
                          }`} />
                          <span className="text-sm text-gray-900">{audience.availability}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.type && (
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{audience.type}</span>
                      </td>
                    )}
                    {visibleColumns.audienceLabel && (
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{audience.audienceLabel}</span>
                      </td>
                    )}
                    {visibleColumns.estimatedSize && (
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{audience.estimatedSize}</span>
                      </td>
                    )}
                    {visibleColumns.dateCreated && (
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{audience.dateCreated}</span>
                      </td>
                    )}
                    {visibleColumns.audienceId && (
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500 font-mono">{audience.audienceId}</span>
                      </td>
                    )}
                    {visibleColumns.sharing && (
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{audience.sharing}</span>
                      </td>
                    )}
                    {visibleColumns.source && (
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{audience.source}</span>
                      </td>
                    )}
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Info className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}