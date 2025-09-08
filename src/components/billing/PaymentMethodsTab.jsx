import { useState } from "react";
import { MoreHorizontal, Activity, Info } from "lucide-react";

export default function PaymentMethodsTab({ selectedAccount, setSelectedAccount, paymentMethods }) {
  const [activeSubTab, setActiveSubTab] = useState("ad-accounts");

  return (
    <div className="w-full space-y-6">
      

      {/* Business Portfolio Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Adkin Digital LTD</h3>
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              Business portfolio
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          These are connected to your business portfolio and can be shared to your other portfolios.
        </p>
        
        {/* Finance Access Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">Finance access needed</h4>
              <p className="text-sm text-blue-800">
                To modify billing or payment information, contact a business admin to update your access to manage this information in Business Manager.{" "}
                <a href="#" className="text-blue-600 hover:text-blue-800 underline">Learn more</a>
              </p>
            </div>
          </div>
        </div>

        {/* Add Business Payment Method */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 max-w-md">
          <div className="flex items-center justify-between ">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">Add business payment method</h4>
              <p className="text-sm text-gray-600">
                Payment methods added to your business can be shared to other accounts connected to your business.
              </p>
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 w-full">
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
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Adkin Digital</h3>
                <p className="text-sm text-gray-600">These are connected to this ad account.</p>
              </div>
              <div className="flex items-center space-x-2">
                <select 
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Adkin Digital (1263790274765251)">Adkin Digital (1263790274765251)</option>
                </select>
              </div>
            </div>

            <button className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add payment method
            </button>

            {/* Payment Methods Cards - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs font-semibold text-gray-600">{method.logo}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{method.logo} · {method.number}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          method.status === "Default" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {method.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Expires on {method.expires}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSubTab === "whatsapp-accounts" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">WhatsApp Business Accounts</h3>
                <p className="text-sm text-gray-600">These are connected to your WhatsApp Business accounts.</p>
              </div>
              <div className="flex items-center space-x-2">
                <select 
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Adkin Digital (1263790274765251)">Adkin Digital (1263790274765251)</option>
                </select>
              </div>
            </div>

            <button className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add payment method
            </button>

            {/* Empty State Table */}
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-full table-fixed">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-500 w-1/2">Payment Method</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500 w-1/4">Status</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500 w-1/4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="3" className="py-12 text-center">
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

      {/* Account Spending Limit */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900">Account spending limit</h3>
            <Info className="w-4 h-4 text-gray-400" />
          </div>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Edit
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Set a spending limit to control how much you spend on ads across all your ad accounts.
        </p>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Monthly spending limit</span>
            <span className="text-lg font-semibold text-gray-900">No limit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
