import { Search, Mic, Camera, Plus, Facebook } from "lucide-react";

export default function ChromeContent({ activeTab }) {
  if (activeTab.type === "google") {
    return (
      <div className="flex flex-col items-center justify-start pt-20 px-5 gap-5 bg-white">
        <div className="text-8xl font-bold text-gray-800 mb-5 pb-5">
          Google
        </div>

        <div className="bg-white rounded-full border border-gray-200 flex items-center px-4 py-3 w-full max-w-2xl shadow-lg hover:shadow-xl transition-shadow">
          <Search size={18} className="text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search Google or type a URL"
            className="flex-1 outline-none text-base text-gray-700 placeholder-gray-400"
          />

          <svg width="0" height="0">
            <defs>
              <linearGradient
                id="googleGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop stopColor="#4285F4" offset="0%" />
                <stop stopColor="#EA4335" offset="25%" />
                <stop stopColor="#FBBC05" offset="50%" />
                <stop stopColor="#34A853" offset="75%" />
              </linearGradient>
            </defs>
          </svg>

          <Mic
            size={30}
            strokeWidth={2}
            style={{ stroke: "url(#googleGradient)" }}
            className="mx-2 cursor-pointer hover:bg-gray-100 p-1.5 rounded-full transition-colors"
          />
          <Camera
            size={30}
            strokeWidth={2}
            style={{ stroke: "url(#googleGradient)" }}
            className="mx-2 cursor-pointer hover:bg-gray-100 p-1.5 rounded-full transition-colors"
          />
        </div>

        <div className="flex gap-8 mt-12">
          <div className="flex flex-col items-center gap-3 cursor-pointer group">
            <div className="w-16 h-16 rounded-full bg-gray-100 shadow-sm group-hover:shadow-md transition-all duration-200 flex items-center justify-center">
              <img 
                src="https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico" 
                alt="Google Sheets" 
                className="w-6 h-6 object-contain"
              />
            </div>
            <span className="text-sm text-gray-700 font-medium">Google Sheets</span>
          </div>
          <div className="flex flex-col items-center gap-3 cursor-pointer group">
            <div className="w-16 h-16 rounded-full bg-gray-100 shadow-sm group-hover:shadow-md transition-all duration-200 flex items-center justify-center">
              <img 
                src="https://vitejs.dev/logo.svg" 
                alt="Vite" 
                className="w-6 h-6 object-contain"
              />
            </div>
            <span className="text-sm text-gray-700 font-medium">Vite + React</span>
          </div>
          <div className="flex flex-col items-center gap-3 cursor-pointer group">
            <div className="w-16 h-16 rounded-full bg-gray-100 shadow-sm group-hover:shadow-md transition-all duration-200 flex items-center justify-center">
              <img 
                src="/meta.png" 
                alt="Meta Ads Manager" 
                className="w-6 h-6 object-contain"
              />
            </div>
            <span className="text-sm text-gray-700 font-medium">(2) Ads Mana...</span>
          </div>
          <div className="flex flex-col items-center gap-3 cursor-pointer group">
            <div className="w-16 h-16 rounded-full bg-gray-100 shadow-sm group-hover:shadow-md transition-all duration-200 flex items-center justify-center">
              <img 
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
                alt="GitHub" 
                className="w-6 h-6 object-contain"
              />
            </div>
            <span className="text-sm text-gray-700 font-medium">GitHub</span>
          </div>
          <div className="flex flex-col items-center gap-3 cursor-pointer group">
            <div className="w-16 h-16 rounded-full bg-blue-100 shadow-sm group-hover:shadow-md transition-all duration-200 flex items-center justify-center">
              <Plus size={16} className="text-gray-600" />
            </div>
            <span className="text-sm text-gray-700 font-medium">Add shortcut</span>
          </div>
        </div>

        <div className="absolute bottom-4 right-4">
          <button className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
            <span className="text-sm">Customise Chrome</span>
          </button>
        </div>
      </div>
    );
  } else {
    // Handle all other tab types (non-google, non-meta-ads)
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white">
        <div className="mt-5 p-8 border border-dashed border-gray-300 bg-gray-50 text-gray-500 italic text-center w-4/5 rounded-lg">
          <h2 className="text-xl font-medium text-gray-700 mb-3">
            {activeTab.title}
          </h2>
          <p className="text-gray-600">{activeTab.content}</p>
        </div>
      </div>
    );
  }
}
