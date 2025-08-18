"use client"

import React from "react"
import { X } from "lucide-react"

const AddAccountUpdateSidebar = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="absolute inset-y-0 left-0 w-96 bg-white border-r border-gray-200 shadow-xl z-[9999] max-h-screen overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Add account Update</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Account Updates</h4>
            <p className="text-sm text-blue-700">Your account has been successfully updated with the latest settings and preferences.</p>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Recent Updates</h4>
            {[
              "Payment method updated",
              "Billing preferences modified",
              "Notification settings changed",
              "Account permissions updated"
            ].map((update, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{update}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddAccountUpdateSidebar 