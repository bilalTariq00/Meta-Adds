import { useState } from "react";
import { Search, Filter, Info, User, Activity, Download, Calendar, MoreHorizontal } from "lucide-react";

export default function PaymentActivityTab({ selectedAccount, setSelectedAccount, transactions }) {
  const [activeSubTab, setActiveSubTab] = useState("ad-accounts");

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Payment activity</h2>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Payment Settings
            </button>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-400" />
              <select 
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Adkin Digital (1263790274765251)">Adkin Digital (1263790274765251)</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Select a filter..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
          </button>
        </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 w-full">
       
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
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

        {/* Tab Content */}
        {activeSubTab === "ad-accounts" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Ad account</span>
                <span className="font-medium text-gray-900">Adkin Digital (1263790274765251)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Current balance</span>
                <Info className="w-4 h-4 text-gray-400" />
                <span className="font-bold text-gray-900">$4.02</span>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === "whatsapp-accounts" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">WhatsApp Business account</span>
                <span className="font-medium text-gray-900">No accounts available</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Current balance</span>
                <Info className="w-4 h-4 text-gray-400" />
                <span className="font-bold text-gray-900">$0.00</span>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <span className="text-sm text-gray-700">Transactions</span>
              <Filter className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by transaction ID..."
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Reference number"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="12 Aug 2025 - 8 Sep 2025"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2 ml-auto">
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">Download</span>
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-medium text-gray-500">
                  <div className="flex items-center space-x-1">
                    <span>Transaction ID</span>
                    <Info className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">
                  <div className="flex items-center space-x-1">
                    <span>Date</span>
                    <Info className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">
                  <div className="flex items-center space-x-1">
                    <span>Amount</span>
                    <Info className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">
                  <div className="flex items-center space-x-1">
                    <span>Payment method</span>
                    <Info className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">
                  <div className="flex items-center space-x-1">
                    <span>Payment status</span>
                    <Info className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">
                  <div className="flex items-center space-x-1">
                    <span>VAT invoice ID</span>
                    <Info className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {activeSubTab === "ad-accounts" ? (
                transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4">
                      <div className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                        {transaction.transactionId}
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-gray-900">{transaction.date}</span>
                    </td>
                    <td className="py-4">
                      <span className="text-sm font-medium text-gray-900">{transaction.amount}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-4 bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-xs font-semibold text-gray-600">
                            {transaction.paymentMethod.includes('MasterCard') ? 'MC' : 'VISA'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-900">{transaction.paymentMethod}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction.status === "Paid" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-gray-900">{transaction.vatInvoice || "-"}</span>
                    </td>
                    <td className="py-4">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-12 text-center">
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
              )}
            </tbody>
          </table>
        </div>

        {/* See More Button */}
        <div className="text-center mt-6">
          <button className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium">
            See More
          </button>
        </div>
      </div>
    </div>
  );
}
