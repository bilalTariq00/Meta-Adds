"use client"

import React from "react"
import { X, MessageSquare, FileImage } from "lucide-react"

const ReportBugDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="absolute inset-0 z-[9999] flex items-center justify-center max-h-screen overflow-y-auto">
      <div className="report-bug-dialog bg-white rounded-lg shadow-xl w-96 max-h-96 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">How can we improve?</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={32} className="text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">
              Please give us feedback on how we can improve. If you need help with solving a specific problem, please visit the{" "}
              <a href="#" className="text-blue-600 hover:underline">Help Centre</a>.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select a topic</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>General feedback</option>
                <option>Bug report</option>
                <option>Feature request</option>
                <option>Performance issue</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select topic details</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Please select a topic first</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={4}
                placeholder="Please include as much info as possible..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                <FileImage size={16} />
                Add a screenshot or video (recommended)
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Send Feedback
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReportBugDialog 