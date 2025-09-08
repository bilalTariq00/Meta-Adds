import { useState } from "react";
import BillingSidebar from "@/components/billing/BillingSidebar";
import AccountsTab from "@/components/billing/AccountsTab";
import PaymentMethodsTab from "@/components/billing/PaymentMethodsTab";
import PaymentActivityTab from "@/components/billing/PaymentActivityTab";

export default function BillingPayments() {
  const [activeTab, setActiveTab] = useState("accounts");
  const [selectedAccount, setSelectedAccount] = useState("Adkin Digital (1263790274765251)");
  const [searchQuery, setSearchQuery] = useState("");

  const accounts = [
    {
      id: "1263790274765251",
      name: "Adkin Digital",
      status: "Active",
      paymentMethod: { type: "Visa", number: "2319" },
      currentBalance: "$4.02"
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: "Visa",
      number: "2319",
      status: "Default",
      expires: "11/29",
      logo: "Visa"
    },
    {
      id: 2,
      type: "MasterCard",
      number: "8069",
      status: "Backup",
      expires: "8/27",
      logo: "MasterCard"
    }
  ];

  const transactions = [
    {
      id: "24370832642604582-24523277644026743",
      date: "31 Aug 2025",
      amount: "$6.01",
      paymentMethod: "MasterCard · 8069 HPW6R2MNK2",
      status: "Paid",
      vatInvoice: "FBADS-452-104828119"
    },
    {
      id: "24679679808386527-24422393417448506",
      date: "30 Aug 2025",
      amount: "$6.01",
      paymentMethod: "MasterCard · 8069 LTQ8FY4PK2",
      status: "Failed",
      vatInvoice: null
    },
    {
      id: "24679679288386579-24564792109875299",
      date: "30 Aug 2025",
      amount: "$6.01",
      paymentMethod: "Visa · 2319 A3VRBZCNK2",
      status: "Failed",
      vatInvoice: null
    },
    {
      id: "24679679288386580-24564792109875300",
      date: "30 Aug 2025",
      amount: "$6.00",
      paymentMethod: "Visa · 2319 LBC9SZGNK2",
      status: "Failed",
      vatInvoice: null
    },
    {
      id: "24679679288386581-24564792109875301",
      date: "26 Aug 2025",
      amount: "$5.00",
      paymentMethod: "Prepaid balance",
      status: "Paid",
      vatInvoice: "FBADS-452-104808159"
    },
    {
      id: "24679679288386582-24564792109875302",
      date: "25 Aug 2025",
      amount: "$2.91",
      paymentMethod: "Prepaid balance",
      status: "Paid",
      vatInvoice: "FBADS-452-104797817"
    },
    {
      id: "24679679288386583-24564792109875303",
      date: "24 Aug 2025",
      amount: "$1.50",
      paymentMethod: "Prepaid balance",
      status: "Paid",
      vatInvoice: "FBADS-452-104789234"
    },
    {
      id: "24679679288386584-24564792109875304",
      date: "23 Aug 2025",
      amount: "$0.50",
      paymentMethod: "Prepaid balance",
      status: "Paid",
      vatInvoice: "FBADS-452-104780123"
    },
    {
      id: "24679679288386585-24564792109875305",
      date: "22 Aug 2025",
      amount: "$0.01",
      paymentMethod: "Prepaid balance",
      status: "Paid",
      vatInvoice: "FBADS-452-104808160"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 w-full">
      <div className="flex w-full">
        {/* Left Sidebar */}
        <BillingSidebar 
          activeView={activeTab} 
          onViewChange={setActiveTab} 
        />

        {/* Main Content */}
        <div className="flex-1 p-6 w-full min-w-0 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === "accounts" && "Accounts"}
                {activeTab === "payment-methods" && "Payment methods"}
                
              </h1>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "accounts" && (
            <AccountsTab 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              accounts={accounts}
            />
          )}
          {activeTab === "payment-methods" && (
            <PaymentMethodsTab 
              selectedAccount={selectedAccount}
              setSelectedAccount={setSelectedAccount}
              paymentMethods={paymentMethods}
            />
          )}
          {activeTab === "payment-activity" && (
            <PaymentActivityTab 
              selectedAccount={selectedAccount}
              setSelectedAccount={setSelectedAccount}
              transactions={transactions}
            />
          )}
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-20 right-6 flex flex-col space-y-3">
        <button className="w-12 h-12 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
          <span className="text-lg">?</span>
        </button>
        <button className="w-12 h-12 bg-white text-gray-600 rounded-full shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
          <span className="text-lg">⚙</span>
        </button>
      </div>
    </div>
  );
}