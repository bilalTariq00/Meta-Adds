import { Outlet } from "react-router-dom"

// This is your main "chrome-content" layout
export default function MainLayout() {
  return (
    <div className="h-screen w-full bg-gray-100">
      {/* Chrome-like browser frame */}
      <div className="h-full flex flex-col">
        {/* Browser top bar */}
        <div className="h-12 bg-gray-200 border-b border-gray-300 flex items-center px-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-white rounded px-3 py-1 text-sm text-gray-600">localhost:5173</div>
          </div>
        </div>

        {/* Main content area - this will contain your app layout */}
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
