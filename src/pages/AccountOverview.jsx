"use client"

import FacebookAdsManager from "@/components/facebook-ads-manager"
import { FileText, Info, CreditCard, ChevronDown, ChevronUp, Facebook, Phone, Lightbulb, X } from "lucide-react"
import { useState } from "react"

export default function AccountOverview() {
  const [expandedSections, setExpandedSections] = useState({
    payment: true,
    facebook: true,
    phone: true,
  })
  const [activeTab, setActiveTab] = useState("available")
  const [showOptimization, setShowOptimization] = useState(true)
  const [showTooltip, setShowTooltip] = useState(false)

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    // <div className="p-6 max-w-5xl mx-auto">
    //   <div className="flex items-center justify-between mb-6 bg-gray-50 p-4 rounded-lg">
    //     <div className="flex items-center gap-4">
    //       <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
    //         <FileText size={24} className="text-blue-600" />
    //       </div>
    //       <div>
    //         <h2 className="text-xl font-semibold text-gray-900">Muhammad Bilal</h2>
    //         <p className="text-sm text-blue-600">0 active campaigns</p>
    //       </div>
    //     </div>
    //     <div className="flex items-center gap-6">
    //       <div className="text-right">
    //         <p className="text-sm text-gray-600">
    //           Amount spent in last seven days: <span className="font-semibold">Rs0.00 ₹</span> | 0% spent in learning
    //           phase{" "}
    //           <span
    //             className="relative inline-block"
    //             onMouseEnter={() => setShowTooltip(true)}
    //             onMouseLeave={() => setShowTooltip(false)}
    //           >
    //             <Info size={14} className="inline text-gray-400 cursor-help" />
    //             {showTooltip && (
    //               <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-10">
    //                 The estimated total amount of money spent on your ads.
    //                 <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
    //               </div>
    //             )}
    //           </span>
    //         </p>
    //       </div>
    //       <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
    //         Continue
    //       </button>
    //     </div>
    //   </div>

    //   <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
    //     <h3 className="text-lg font-semibold text-gray-900 mb-2">Get set up to run ads</h3>
    //     <p className="text-gray-600 mb-6">Confirm the details below and you'll be ready to publish your first ad.</p>

    //     <div className="space-y-4">
    //       {/* Add payment method */}
    //       <div className="border border-gray-200 rounded-lg">
    //         <div
    //           className="flex items-center justify-between p-4 cursor-pointer"
    //           onClick={() => toggleSection("payment")}
    //         >
    //           <div className="flex items-center gap-3">
    //             <CreditCard size={20} className="text-gray-600" />
    //             <h4 className="font-medium text-gray-900">Add payment method</h4>
    //           </div>
    //           {expandedSections.payment ? (
    //             <ChevronUp size={16} className="text-gray-400" />
    //           ) : (
    //             <ChevronDown size={16} className="text-gray-400" />
    //           )}
    //         </div>
    //         {expandedSections.payment && (
    //           <div className="px-4 pb-4 border-t border-gray-100">
    //             <p className="text-sm text-gray-600 mb-4 mt-3">
    //               This is the payment method that we'll keep on file for your ad account. You won't be charged anything
    //               until your ads are up and running. <span className="text-blue-600 cursor-pointer">Learn more</span>
    //             </p>
    //             <div className="flex gap-3">
    //               <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300">
    //                 Add Payment Method
    //               </button>
    //               <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
    //                 Skip for now
    //               </button>
    //             </div>
    //           </div>
    //         )}
    //       </div>

    //       {/* Create Facebook Page */}
    //       <div className="border border-gray-200 rounded-lg">
    //         <div
    //           className="flex items-center justify-between p-4 cursor-pointer"
    //           onClick={() => toggleSection("facebook")}
    //         >
    //           <div className="flex items-center gap-3">
    //             <Facebook size={20} className="text-gray-600" />
    //             <h4 className="font-medium text-gray-900">Create Facebook Page</h4>
    //           </div>
    //           {expandedSections.facebook ? (
    //             <ChevronUp size={16} className="text-gray-400" />
    //           ) : (
    //             <ChevronDown size={16} className="text-gray-400" />
    //           )}
    //         </div>
    //         {expandedSections.facebook && (
    //           <div className="px-4 pb-4 border-t border-gray-100">
    //             <p className="text-sm text-gray-600 mb-3 mt-3">
    //               A Page is required to run ads. It will appear in your ad as the brand or business that you're
    //               promoting.
    //             </p>
    //             <p className="text-sm text-gray-600 mb-4">
    //               You have access to one or more Pages. You'll choose from your full list of Pages later.
    //             </p>
    //             <div className="flex items-center gap-3 mb-4">
    //               <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
    //                 <span className="text-orange-600 text-xs font-bold">PT</span>
    //               </div>
    //               <span className="text-sm text-gray-900">Phil Jakson Tech</span>
    //             </div>
    //             <p className="text-sm text-gray-600 mb-4">
    //               Can't find your Page? <span className="text-blue-600 cursor-pointer">Learn more</span>
    //             </p>
    //             <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300">
    //               Confirm
    //             </button>
    //           </div>
    //         )}
    //       </div>

    //       {/* Verify phone number */}
    //       <div className="border border-gray-200 rounded-lg">
    //         <div
    //           className="flex items-center justify-between p-4 cursor-pointer"
    //           onClick={() => toggleSection("phone")}
    //         >
    //           <div className="flex items-center gap-3">
    //             <Phone size={20} className="text-gray-600" />
    //             <h4 className="font-medium text-gray-900">Verify phone number</h4>
    //           </div>
    //           {expandedSections.phone ? (
    //             <ChevronUp size={16} className="text-gray-400" />
    //           ) : (
    //             <ChevronDown size={16} className="text-gray-400" />
    //           )}
    //         </div>
    //         {expandedSections.phone && (
    //           <div className="px-4 pb-4 border-t border-gray-100">
    //             <p className="text-sm text-gray-600 mb-4 mt-3">
    //               Before you run ads, you need to add a verified phone number to your ad account. We won't share this
    //               number publicly.
    //             </p>
    //             <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300">
    //               Add phone number
    //             </button>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>

    //   <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
    //     <div className="flex items-center justify-between mb-6">
    //       <div className="flex items-center gap-8">
    //         <div className="relative w-24 h-24">
    //           <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 120 120">
    //             <circle cx="60" cy="60" r="45" fill="none" stroke="#e5e7eb" strokeWidth="6" />
    //             <circle
    //               cx="60"
    //               cy="60"
    //               r="45"
    //               fill="none"
    //               stroke="#3b82f6"
    //               strokeWidth="6"
    //               strokeDasharray={`${2 * Math.PI * 45}`}
    //               strokeDashoffset={0}
    //               strokeLinecap="round"
    //             />
    //           </svg>
    //           <div className="absolute inset-0 flex flex-col items-center justify-center">
    //             <span className="text-2xl font-bold text-gray-900">100</span>
    //             <span className="text-xs text-gray-600">points</span>
    //           </div>
    //         </div>
    //         <div>
    //           <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
    //             Opportunity score <Info size={16} className="text-gray-400" />
    //           </h3>
    //           <p className="text-sm text-gray-600">
    //             You applied all recommendations, which are proven to help improve performance.
    //           </p>
    //           <p className="text-sm text-blue-600 mt-1 cursor-pointer">How you earn points</p>
    //         </div>
    //       </div>
    //       <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300">
    //         Set up automatic adjustments
    //       </button>
    //     </div>
    //   </div>

    //   {showOptimization && (
    //     <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 relative">
    //       <button
    //         onClick={() => setShowOptimization(false)}
    //         className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
    //       >
    //         <X size={16} />
    //       </button>
    //       <div className="flex items-center justify-between">
    //         <div className="flex-1">
    //           <h3 className="text-lg font-semibold text-gray-900 mb-2">
    //             Optimise your campaigns with automatic adjustments
    //           </h3>
    //           <p className="text-sm text-gray-600 mb-4">
    //             Save time and stay optimised by automatically applying the most impactful performance recommendations.
    //           </p>
    //           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
    //             Set up now
    //           </button>
    //         </div>
    //         <div className="w-48 h-32 bg-gradient-to-br from-green-400 to-teal-600 rounded-lg flex items-center justify-center ml-6">
    //           <img
    //             src="/placeholder.svg?height=120&width=180"
    //             alt="Optimization illustration"
    //             className="w-full h-full object-cover rounded-lg"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   )}

    //   <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
    //     <div className="flex items-center justify-between mb-6">
    //       <div className="flex gap-4">
    //         <button
    //           onClick={() => setActiveTab("available")}
    //           className={`px-4 py-2 rounded-lg transition-colors ${
    //             activeTab === "available"
    //               ? "bg-blue-100 text-blue-700 border-b-2 border-blue-600"
    //               : "text-gray-600 hover:bg-gray-50"
    //           }`}
    //         >
    //           Available
    //         </button>
    //         <button
    //           onClick={() => setActiveTab("dismissed")}
    //           className={`px-4 py-2 rounded-lg transition-colors ${
    //             activeTab === "dismissed"
    //               ? "bg-blue-100 text-blue-700 border-b-2 border-blue-600"
    //               : "text-gray-600 hover:bg-gray-50"
    //           }`}
    //         >
    //           Dismissed
    //         </button>
    //       </div>
    //       <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
    //         <option>Sort by personalised</option>
    //       </select>
    //     </div>

    //     <div className="text-center py-12">
    //       <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
    //         <Lightbulb size={32} className="text-gray-400" />
    //       </div>
    //       <h4 className="text-lg font-medium text-gray-900 mb-2">No recommendations available yet</h4>
    //       <p className="text-sm text-gray-600">Check again later to see ways to keep your score high.</p>
    //     </div>
    //   </div>

    //   <div className="bg-white rounded-lg border border-gray-200 p-6">
    //     <h3 className="text-lg font-semibold text-gray-900 mb-2">No recommended solutions found</h3>
    //     <p className="text-sm text-gray-600">
    //       Email your account manager for personalised recommendations to help improve your strategy.
    //     </p>
    //   </div>
    // </div>
    <FacebookAdsManager/>
  )
}
