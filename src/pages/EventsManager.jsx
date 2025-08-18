import React, { useState, useEffect } from 'react';
import { Loader2, BarChart3, Users, Target, TrendingUp } from 'lucide-react';
import { useLoading } from '@/components/LoadingContext';

// Content Loader Component
const ContentLoader = () => {
  return (
    <div className="p-6 animate-pulse">
      {/* Header skeleton */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="h-10 bg-gray-200 rounded w-32"></div>
        </div>
        
        {/* Stats cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-6">
              <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
              <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-12"></div>
            </div>
          ))}
        </div>
        
        {/* Chart skeleton */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
        
        {/* Table skeleton */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex space-x-4 mb-3">
              <div className="h-4 bg-gray-200 rounded flex-1"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Spinning loader overlay for content area
const ContentSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-6">
      <div className="text-center">
        <div className="relative mb-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
          <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-pulse"></div>
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Loading Events Manager</h3>
        <p className="text-sm text-gray-500">Fetching your event data...</p>
        <div className="mt-4 flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
  </div>
);

export default function EventsManager() {
const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 3000); // 3 seconds
    return () => clearTimeout(timer);
  }, []); // Runs on every mount

  if (isLoading) {
    return <PageLoader />;
  }

  // Main content
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Events Manager</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
            Create Event
          </button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-600">Total Events</p>
                <p className="text-2xl font-bold text-blue-900">1,247</p>
                <p className="text-xs text-blue-500">+12% this month</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-green-600">Active Users</p>
                <p className="text-2xl font-bold text-green-900">45.2K</p>
                <p className="text-xs text-green-500">+8% this week</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6">
            <div className="flex items-center">
              <Target className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-purple-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-purple-900">3.24%</p>
                <p className="text-xs text-purple-500">+2.1% vs last month</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-orange-600">Revenue</p>
                <p className="text-2xl font-bold text-orange-900">$12.4K</p>
                <p className="text-xs text-orange-500">+15% growth</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chart Area */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Event Performance Overview</h3>
          <div className="h-64 bg-white rounded border border-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Chart will be displayed here</p>
          </div>
        </div>
        
        {/* Recent Events Table */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Events</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { name: 'Product Launch Campaign', date: '2024-01-15', participants: '2,847', status: 'Active' },
                  { name: 'Summer Sale Event', date: '2024-01-14', participants: '1,923', status: 'Completed' },
                  { name: 'User Onboarding Flow', date: '2024-01-13', participants: '5,672', status: 'Active' },
                  { name: 'Newsletter Signup', date: '2024-01-12', participants: '892', status: 'Paused' },
                ].map((event, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.participants}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        event.status === 'Active' ? 'bg-green-100 text-green-800' :
                        event.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {event.status}
                      </span>
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