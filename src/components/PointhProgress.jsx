"use client"

import { useState } from "react"

export default function PointsProgress({ points = 100, progress = 1 }) {
  const [showTooltip, setShowTooltip] = useState(false)

  const radius = 45
  const arcLength = 2 * Math.PI * radius * 0.75 // 75% of full circle (270 degrees)
  const strokeDasharray = arcLength
  const strokeDashoffset = arcLength - (progress * arcLength)

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28 mb-4">
        <svg className="w-28 h-28 transform rotate-135" viewBox="0 0 100 100">
          {/* Background arc */}
          <circle 
            cx="50" 
            cy="50" 
            r={radius} 
            fill="none" 
            stroke="#e5e7eb" 
            strokeWidth="8"
            strokeDasharray={arcLength}
            strokeDashoffset="0"
            strokeLinecap="round"
          />
          {/* Progress arc */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#2563eb"
            strokeWidth="8"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-black">{points}</span>
          <span className="text-sm text-gray-600">points</span>
        </div>
      </div>

      <div className="relative">
        <button
          className="text-blue-600 text-sm hover:underline focus:outline-none"
          onClick={() => setShowTooltip(!showTooltip)}
        >
          How you earn points
        </button>

        {showTooltip && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Opportunity score</h3>
              <button 
                onClick={() => setShowTooltip(false)} 
                className="text-gray-400 hover:text-gray-600 ml-2 focus:outline-none"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3 text-xs text-gray-700">
              <p>
                Your score of {points} means that you've applied all of our recommendations to optimise your campaigns,
                ad sets or ads, or that we have no recommendations for you at the moment.
              </p>
              <p>
                Your score changes as new recommendations become available, so check back for more ways to keep it high.
              </p>
            </div>
            {/* Tooltip arrow */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>
          </div>
        )}
      </div>
    </div>
  )
}