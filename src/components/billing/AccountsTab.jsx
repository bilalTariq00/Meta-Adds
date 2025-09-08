import { useState } from "react";
import { Search, Filter, Info, MoreHorizontal, Building2, Activity } from "lucide-react";

export default function AccountsTab({ searchQuery, setSearchQuery, accounts }) {
  const [activeSubTab, setActiveSubTab] = useState("ad-accounts");

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 w-full">
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8 w-full">
            <button 
              onClick={() => setActiveSubTab("ad-accounts")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSubTab === "ad-accounts"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Ad accounts
            </button>
            <button 
              onClick={() => setActiveSubTab("whatsapp-accounts")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSubTab === "whatsapp-accounts"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              WhatsApp Business accounts
            </button>
          </nav>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Content */}
        {activeSubTab === "ad-accounts" && (
          <div className="w-full">
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-full table-fixed">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-500 w-1/4">Account</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500 w-1/6">Status</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500 w-1/4">
                      <div className="flex items-center space-x-1">
                        <span>How you'll pay</span>
                        <Info className="w-3 h-3 text-gray-400" />
                      </div>
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500 w-1/6">Current balance</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500 w-1/6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account) => (
                    <tr key={account.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-blue-600">{account.name}</div>
                            <div className="text-sm text-gray-500">ID: {account.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-900">{account.status}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-4 bg-blue-100 rounded flex items-center justify-center">
                            <span className="text-xs font-semibold text-blue-600">VISA</span>
                          </div>
                          <span className="text-sm text-gray-900">
                            {account.paymentMethod.type} • {account.paymentMethod.number}
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-sm font-medium text-gray-900">{account.currentBalance}</span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                            Pay Now
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
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

        {activeSubTab === "whatsapp-accounts" && (
          <div className="w-full">
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-full table-fixed">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-500 w-1/4">Account</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500 w-1/6">Status</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500 w-1/4">
                      <div className="flex items-center space-x-1">
                        <span>How you'll pay</span>
                        <Info className="w-3 h-3 text-gray-400" />
                      </div>
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500 w-1/6">Current balance</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500 w-1/6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="5" className="py-12 text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Activity className="w-8 h-8 text-purple-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">No WhatsApp business accounts</h4>
                      <p className="text-gray-500 mb-4">All of your WhatsApp business accounts will appear here.</p>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Add account
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
