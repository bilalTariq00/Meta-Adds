"use client";

import { useState } from "react";
import { ChevronDown, Users, Monitor, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from "recharts";

export default function DemographicsPlatform() {
  const [activeTab, setActiveTab] = useState("demographics");
  const [demographicsFilter, setDemographicsFilter] = useState("all");
  const [resultsFilter, setResultsFilter] = useState("results");
  const [showDemographicsDropdown, setShowDemographicsDropdown] = useState(false);
  const [showResultsDropdown, setShowResultsDropdown] = useState(false);
  const [showImpressionsDropdown, setShowImpressionsDropdown] = useState(false);
  const [showAmountSpentDropdown, setShowAmountSpentDropdown] = useState(false);

  const [showDeviceTypeDropdown, setShowDeviceTypeDropdown] = useState(false);
  const [selectedImpressionsMetric, setSelectedImpressionsMetric] = useState("impressions");
  const [selectedAmountSpentMetric, setSelectedAmountSpentMetric] = useState("amountSpent");

  const [selectedDeviceType, setSelectedDeviceType] = useState("desktop-only");

  // Download reports function
  const handleDownloadReports = () => {
    // Create a dummy zip file content
    const zipContent = "This is a dummy zip file content for delivery reports.";
    const blob = new Blob([zipContent], { type: 'application/zip' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'delivery_reports.zip';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const ageGroups = ["13-17", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"];
  
  // Mock data for demographics bar chart
  const demographicsData = ageGroups.map(ageGroup => ({
    ageGroup,
    men: 0,
    women: 0
  }));

  // Add some sample data for visualization
  demographicsData[2].men = 1.2; // 25-34 age group
  demographicsData[2].women = 1.8;
  demographicsData[3].men = 2.1; // 35-44 age group
  demographicsData[3].women = 2.4;

  // Platform data for different metrics
  const platformData = {
    reach: [
      { name: "Facebook", value: 125 },
      { name: "Audience Netw...", value: 0 },
      { name: "Instagram", value: 0 },
      { name: "Messenger", value: 0 },
      { name: "Oculus", value: 0 },
      { name: "Threads", value: 0 },
      { name: "WhatsApp", value: 0 }
    ],
    impressions: [
      { name: "Facebook", value: 180 },
      { name: "Audience Netw...", value: 0 },
      { name: "Instagram", value: 0 },
      { name: "Messenger", value: 0 },
      { name: "Oculus", value: 0 },
      { name: "Threads", value: 0 },
      { name: "WhatsApp", value: 0 }
    ],
    amountSpent: [
      { name: "Facebook", value: 2.35 },
      { name: "Audience Netw...", value: 0 },
      { name: "Instagram", value: 0 },
      { name: "Messenger", value: 0 },
      { name: "Oculus", value: 0 },
      { name: "Threads", value: 0 },
      { name: "WhatsApp", value: 0 }
    ]
  };



  const renderDemographicsChart = () => {
    return (
      <div className="bg-white  border-gray-200 rounded-lg p-6 ">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-gray-900">Age and gender distribution</h4>
          <div className="flex gap-2">
            {/* All Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDemographicsDropdown(!showDemographicsDropdown)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                <span>All</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showDemographicsDropdown && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-32">
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg">
                    All
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg">
                    Custom
                  </button>
                </div>
              )}
            </div>

            {/* Results Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowResultsDropdown(!showResultsDropdown)}
                className="flex items-center gap-2 px-3 py-2  border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                <span>Results</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showResultsDropdown && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-40">
                  <div className="px-3 py-2 text-sm hover:bg-blue-50 first:rounded-t-lg">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="results"
                        value="results"
                        checked={resultsFilter === "results"}
                        onChange={() => setResultsFilter("results")}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <div className="font-medium">Results</div>
                        <div className="text-xs text-gray-500">Website views content</div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2 text-sm hover:bg-gray-50 last:rounded-b-lg">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="results"
                        value="amount-spent"
                        checked={resultsFilter === "amount-spent"}
                        onChange={() => setResultsFilter("amount-spent")}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <div className="font-medium">Amount spent</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="h-54 mb-4 relative">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={demographicsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="ageGroup" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                domain={[0, 4]}
                ticks={[0, 1, 2, 3, 4]}
              />
              <Tooltip />
              <Bar dataKey="men" fill="#8B5CF6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="women" fill="#14B8A6" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          
          {/* Highlight for 35-44 age group */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-full flex">
              {demographicsData.map((_, index) => (
                <div key={index} className="flex-1">
                  {index === 3 && ( // 35-44 age group (index 3)
                    <div className="w-full h-full bg-blue-50 opacity-30"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-6 text-sm w-full justify-center">
          <div className="flex items-start gap-2 ">
            <div className="w-3 h-3 bg-purple-500 rounded mt-1"></div>
            <div>
              <div className="font-medium">Men</div>
              <div className="text-gray-600">
                {demographicsData.reduce((sum, item) => sum + item.men, 0).toFixed(1)}% ({demographicsData.reduce((sum, item) => sum + item.men, 0).toFixed(1)})
              </div>
              <div className="text-gray-600">Cost per result: $0.00</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-3 h-3 bg-teal-500 rounded mt-1"></div>
            <div>
              <div className="font-medium">Women</div>
              <div className="text-gray-600">
                {demographicsData.reduce((sum, item) => sum + item.women, 0).toFixed(1)}% ({demographicsData.reduce((sum, item) => sum + item.women, 0).toFixed(1)})
              </div>
              <div className="text-gray-600">Cost per result: $0.00</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPlatformChart = () => {
    return (
      <div className="bg-white  rounded-lg ">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-gray-900">Placement per platform</h4>
          <div className="flex gap-2">
            {/* Impressions Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowImpressionsDropdown(!showImpressionsDropdown)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span>Impressions</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showImpressionsDropdown && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-32">
                  <div className="px-3 py-2 text-sm hover:bg-blue-50 first:rounded-t-lg">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="impressions"
                        value="impressions"
                        checked={selectedImpressionsMetric === "impressions"}
                        onChange={() => setSelectedImpressionsMetric("impressions")}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span>Impressions</span>
                    </div>
                  </div>
                  <div className="px-3 py-2 text-sm hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="impressions"
                        value="reach"
                        checked={selectedImpressionsMetric === "reach"}
                        onChange={() => setSelectedImpressionsMetric("reach")}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span>Reach</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Amount Spent Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowAmountSpentDropdown(!showAmountSpentDropdown)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                <div className="w-3 h-3 bg-teal-500 rounded"></div>
                <span>Amount spent</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showAmountSpentDropdown && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-32">
                  <div className="px-3 py-2 text-sm hover:bg-blue-50 first:rounded-t-lg">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="amountSpent"
                        value="amountSpent"
                        checked={selectedAmountSpentMetric === "amountSpent"}
                        onChange={() => setSelectedAmountSpentMetric("amountSpent")}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span>Amount spent</span>
                    </div>
                  </div>
                  <div className="px-3 py-2 text-sm hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="amountSpent"
                        value="impressions"
                        checked={selectedAmountSpentMetric === "impressions"}
                        onChange={() => setSelectedAmountSpentMetric("impressions")}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span>Impressions</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Combination Chart - Selected metric (purple bars) + Amount spent (teal bars) */}
        <div className="h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={platformData.reach.map((item, index) => ({
              name: item.name,
              selectedMetric: platformData[selectedImpressionsMetric][index].value,
              amountSpent: platformData[selectedAmountSpentMetric][index].value
            }))} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <YAxis 
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                domain={[0, 200]}
                ticks={[0, 50, 100, 150, 200]}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                domain={[0, 3]}
                ticks={[0, 1, 2, 3]}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip />
              <Bar yAxisId="left" dataKey="selectedMetric" fill="#8B5CF6" radius={[2, 2, 0, 0]} />
              <Bar yAxisId="right" dataKey="amountSpent" fill="#14B8A6" radius={[2, 2, 0, 0]} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex gap-6 text-sm mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span>{selectedImpressionsMetric === 'reach' ? 'Reach' : selectedImpressionsMetric === 'impressions' ? 'Impressions' : 'Amount spent'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-teal-500 rounded"></div>
            <span>{selectedAmountSpentMetric === 'reach' ? 'Reach' : selectedAmountSpentMetric === 'impressions' ? 'Impressions' : 'Amount spent'}</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-gray-600 mb-4">
          * You may see low delivery of ads to the Facebook Stories placement until it's available to everyone who uses Facebook Stories. A more accurate metric is cost per result.
        </div>

        {/* Download Reports Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="text-sm font-medium text-gray-900 mb-2">See where your ads appeared</h5>
          <p className="text-xs text-gray-600 mb-3">
            Download delivery reports to see where your ads appeared. Reports show the last 30 days of available data for Audience Network, Facebook in-stream reels and Ads on Facebook Reels. Recent data may be delayed by a few days.{' '}
            <a href="#" className="text-blue-600 hover:underline">Learn more</a>
          </p>
          <button 
            onClick={handleDownloadReports}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download reports
          </button>
        </div>
      </div>
    );
  };

  const renderDeviceTypeCard = () => {
    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <h5 className="text-sm font-medium text-gray-900 mb-3">Device type</h5>
        
        {/* Device Type Dropdown */}
        <div className="relative mb-4">
          <button
            onClick={() => setShowDeviceTypeDropdown(!showDeviceTypeDropdown)}
            className="w-full flex items-center justify-between px-3 py-2 border border-blue-500 rounded-lg text-sm bg-white"
          >
            <span>{selectedDeviceType === "mobile-and-desktop" ? "Mobile and desktop" : selectedDeviceType === "desktop-only" ? "Desktop only" : "Mobile only"}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {showDeviceTypeDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="px-3 py-2 text-sm hover:bg-blue-50 first:rounded-t-lg">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="device-type"
                    value="mobile-and-desktop"
                    checked={selectedDeviceType === "mobile-and-desktop"}
                    onChange={() => setSelectedDeviceType("mobile-and-desktop")}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>Mobile and desktop</span>
                </div>
              </div>
              <div className="px-3 py-2 text-sm hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="device-type"
                    value="desktop-only"
                    checked={selectedDeviceType === "desktop-only"}
                    onChange={() => setSelectedDeviceType("desktop-only")}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>Desktop only</span>
                </div>
              </div>
              <div className="px-3 py-2 text-sm hover:bg-gray-50 last:rounded-b-lg">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="device-type"
                    value="mobile-only"
                    checked={selectedDeviceType === "mobile-only"}
                    onChange={() => setSelectedDeviceType("mobile-only")}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>Mobile only</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* About Placement Results */}
        <div>
          <h6 className="text-sm font-medium text-gray-900 mb-2">About placement results</h6>
          <p className="text-xs text-gray-600 mb-2">
            Ad delivery is optimised to allocate your budget to the placements likely to perform best with your audience, based on your targeting and bid amount.
          </p>
          <a href="#" className="text-xs text-blue-600 hover:underline">Learn more</a>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Tabs */}
      <div className="p-2">
        <div className="flex">
          <button
            onClick={() => setActiveTab("demographics")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "demographics"
                ? " text-blue-600 bg-blue-50"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <Users className={`w-4 h-4 ${activeTab === "demographics" ? "text-blue-600" : "text-gray-500"}`} />
            Demographics
          </button>
          <button
            onClick={() => setActiveTab("platform")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "platform"
                ? " text-blue-600 bg-blue-50"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <Monitor className={`w-4 h-4 ${activeTab === "platform" ? "text-blue-600" : "text-gray-500"}`} />
            Platform
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "demographics" && renderDemographicsChart()}
        {activeTab === "platform" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 ">
              {renderPlatformChart()}
            </div>
            <div className="lg:col-span-1">
              {renderDeviceTypeCard()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
