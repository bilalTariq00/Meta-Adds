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
    <div className="min-h-screen ">
      {/* Header Section */}
      <div className="flex align-center justify-between">
        <div className="px-6 py-4 mt-2 max-w-3xl">
          <p className="text-gray-700 text-sm leading-6">
            Your advertising settings give you access to features and recommendations based on your business and are used when you create ads for this ad account.
          </p>
          
          {/* Global Actions */}
          
        </div>
        <div className="flex  justify-end gap-3  whitespace-nowrap">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors ">
              <FileText size={16} />
              Billing and payments
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Monitor size={16} />
              Ad account settings
            </button>
          </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8 space-y-8 max-w-[85%]">
        {/* Shortcuts Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between px-6 py-3 ">
            <div className="flex items-center gap-3">
            <img src="/images/campaign-structure.png" alt="Shortcuts" className="w-12 h-12" />
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
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Age</span>
              </div>

              {/* Placement controls */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">Placement controls</h3>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
                </div>
                <p className="text-sm text-gray-600 mb-3">Set where you want your ads to appear.</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Defined</span>
              </div>

              {/* Engaged audience */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">Engaged audience</h3>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
                </div>
                <p className="text-sm text-gray-600 mb-3">Create a custom audience for people who are aware of your business but have not made a purchase.</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">Not defined</span>
              </div>

              {/* Existing customers */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">Existing customers</h3>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
                </div>
                <p className="text-sm text-gray-600 mb-3">Create a custom audience for people who have purchased your products and signed up for your services.</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">Not defined</span>
              </div>
            </div>
          </div>
        </div>

        {/* Your business Section */}
        <div className=" rounded-lg ">
          <div className="p-6 border-b  border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Your business</h2>
            <p className="text-sm text-gray-600">
              Help us better understand your business so that we can provide recommendations and features that are more relevant.
            </p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Account controls */}
              <div className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
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
              <div className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
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
              <div className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
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
        <div className=" rounded-lg ">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Creating ads</h2>
            <p className="text-sm text-gray-600">
              Review and update your settings to make it easier to create ads.
            </p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Row 1 */}
              {/* Advantage+ creative */}
              <div className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Sparkles size={20} className="text-gray-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">Advantage+ creative</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Test new optimisations across eligible campaigns to help us improve our creative optimisations and your ad performance.</p>
                <div className="text-sm text-gray-700">Test new creative enhancements: Off</div>
              </div>

              {/* Audience segments */}
              <div className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Users size={20} className="text-gray-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">Audience segments</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Get additional insights about your sales campaign audiences when you define your engaged audience and existing customers</p>
                <div className="space-y-1">
                  <div className="text-sm text-gray-700">Engaged audience: Not defined</div>
                  <div className="text-sm text-gray-700">Existing customers: Not defined</div>
                </div>
              </div>

              {/* Default beneficiary and payer */}
              <div className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Globe size={20} className="text-gray-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">Default beneficiary and payer</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Auto-fill beneficiary and payer information when it's required to show your ads to audiences in certain regions.</p>
                <div className="text-sm text-gray-700">Beneficiary and payer not added</div>
              </div>

              {/* Row 2 */}
              {/* Datasets and pixels */}
              <div className="p-4 border bg-white border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900">Datasets and pixels</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Check the status of datasets and pixels connected to this ad account.</p>
                <div className="text-sm text-gray-700">Datasets and pixels: 5</div>
              </div>

              {/* Name templates */}
              <div className="p-4 border bg-white border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FileText size={20} className="text-gray-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">Name templates</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Name your campaigns, ad sets and ads consistently with templates based on your naming conventions.</p>
                <div className="text-sm text-gray-700">No name templates created</div>
              </div>

              {/* Social information */}
              <div className="p-4 border bg-white border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Sparkles size={20} className="text-gray-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">Social information</h3>
                </div>
                <p className="text-sm text-gray-600">Control how Meta shows social information, such as likes, follows and other engagement, on your ads.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}