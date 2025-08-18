"use client";

import { useState } from "react";
import { AccountHeader } from "@/components/Accountoverview/account-header";
import { OpportunityScoreSection } from "@/components/Accountoverview/opportunity-score-section";
import { RecommendationsSection } from "@/components/Accountoverview/recommendations-section";
import { LatestResultsSection } from "@/components/Accountoverview/latest-results-section";
import { CampaignTrendsSection } from "@/components/Accountoverview/campaign-trends-section";
import { CreateCampaignModal } from "@/components/Accountoverview/create-campaign-modal";
import { ManageAdjustmentsModal } from "@/components/Accountoverview/manage-adjustments-modal";

export default function FacebookAdsManager() {
  const [showCreateCampaignModal, setShowCreateCampaignModal] = useState(false);
  const [showManageAdjustmentsModal, setShowManageAdjustmentsModal] =
    useState(false);

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto p-6">
        <AccountHeader />

        <OpportunityScoreSection
          onManageAdjustments={() => setShowManageAdjustmentsModal(true)}
        />

        {/* <RecommendationsSection /> */}

        <LatestResultsSection />

        <CampaignTrendsSection
          onCreateCampaign={() => setShowCreateCampaignModal(true)}
        />

        {/* No Recommended Solutions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No recommended solutions found
          </h3>
          <p className="text-sm text-gray-600">
            Email your account manager for personalised recommendations to help
            improve your strategy.
          </p>
        </div>
      </div>
      <div className="relative">
        {/* Page Content */}
        <CreateCampaignModal
          isOpen={showCreateCampaignModal}
          onClose={() => setShowCreateCampaignModal(false)}
        />
      </div>

      <ManageAdjustmentsModal
        isOpen={showManageAdjustmentsModal}
        onClose={() => setShowManageAdjustmentsModal(false)}
      />
    </div>
  );
}
