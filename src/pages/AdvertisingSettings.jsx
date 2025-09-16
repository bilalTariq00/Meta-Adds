import { 
  Wrench, 
  X, 
  ArrowRight, 
  FileText, 
  Monitor, 
  RefreshCw, 
  Star, 
  CheckCircle, 
  Sparkles, 
  Users, 
  Globe,
  ChevronRight
} from "lucide-react";

export default function AdvertisingSettings() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <p className="text-gray-700 text-sm leading-6">
            Your advertising settings give you access to features and recommendations based on your business and are used when you create ads for this ad account.
          </p>
          
          {/* Global Actions */}
          <div className="flex justify-end gap-3 mt-4">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <FileText size={16} />
              Billing and payments
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Monitor size={16} />
              Ad account settings
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8 space-y-8">
        {/* Shortcuts Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Wrench size={20} className="text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Shortcuts</h2>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Audience controls */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">Audience controls</h3>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
                </div>
                <p className="text-sm text-gray-600 mb-3">Set who you want to see your ads.</p>
                <div className="text-sm font-medium text-green-600">Age</div>
              </div>

              {/* Placement controls */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">Placement controls</h3>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
                </div>
                <p className="text-sm text-gray-600 mb-3">Set where you want your ads to appear.</p>
                <div className="text-sm font-medium text-green-600">Defined</div>
              </div>

              {/* Engaged audience */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">Engaged audience</h3>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
                </div>
                <p className="text-sm text-gray-600 mb-3">Create a custom audience for people who are aware of your business but have not made a purchase.</p>
                <div className="text-sm text-gray-500">Not defined</div>
              </div>

              {/* Existing customers */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">Existing customers</h3>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
                </div>
                <p className="text-sm text-gray-600 mb-3">Create a custom audience for people who have purchased your products and signed up for your services.</p>
                <div className="text-sm text-gray-500">Not defined</div>
              </div>
            </div>
          </div>
        </div>

        {/* Your business Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Your business</h2>
            <p className="text-sm text-gray-600">
              Help us better understand your business so that we can provide recommendations and features that are more relevant.
            </p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Account controls */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <RefreshCw size={20} className="text-gray-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">Account controls</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Set account controls to limit who sees your ads and where they appear.</p>
                <div className="text-sm text-gray-700">Account controls: Age, Placement</div>
              </div>

              {/* Value rules */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Star size={20} className="text-gray-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">Value rules</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Create rules to tell us how much more certain audiences are worth to your business.</p>
                <div className="text-sm text-gray-500">No rule sets created</div>
              </div>

              {/* Meta Verified */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <CheckCircle size={20} className="text-gray-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">Meta Verified</h3>
                </div>
                <p className="text-sm text-gray-600">Get a verified badge to build confidence with your customers.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Creating ads Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Creating ads</h2>
            <p className="text-sm text-gray-600">
              Review and update your settings to make it easier to create ads.
            </p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Advantage+ creative */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Sparkles size={20} className="text-gray-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">Advantage+ creative</h3>
                </div>
                <p className="text-sm text-gray-600">Test new optimisations across eligible campaigns to improve performance and reduce manual work.</p>
              </div>

              {/* Audience segments */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Users size={20} className="text-gray-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">Audience segments</h3>
                </div>
                <p className="text-sm text-gray-600">Get additional insights about your sales campaign performance by audience segment.</p>
              </div>

              {/* Default beneficiary and payer */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Globe size={20} className="text-gray-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">Default beneficiary and payer</h3>
                </div>
                <p className="text-sm text-gray-600">Auto-fill beneficiary and payer information when it's required for your ads.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}