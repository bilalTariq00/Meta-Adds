"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import CreateRuleSelectionModal from "./CreateRuleSelectionModal";
import CreateCustomRuleModal from "./CreateCustomRuleModal";

export default function CreateRuleModal() {
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [showCustomRuleModal, setShowCustomRuleModal] = useState(false);

  const handleCreateRule = () => {
    setShowSelectionModal(true);
  };

  const handleSelectCustomRule = () => {
    setShowSelectionModal(false);
    setShowCustomRuleModal(true);
  };

  const handleSelectAutomaticAdjustments = () => {
    setShowSelectionModal(false);
    // Handle automatic adjustments logic
    console.log("Navigate to automatic adjustments");
  };

  const handleSaveRule = (ruleData) => {
    console.log("Saving rule:", ruleData);
    setShowCustomRuleModal(false);
    // Handle save logic
  };

  const handleCloseModals = () => {
    setShowSelectionModal(false);
    setShowCustomRuleModal(false);
  };

  return (
    <>
      <button
        onClick={handleCreateRule}
        className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center gap-3"
      >
        <Plus className="w-4 h-4" />
        Create a rule
      </button>

      <CreateRuleSelectionModal
        isOpen={showSelectionModal}
        onClose={handleCloseModals}
        onSelectCustomRule={handleSelectCustomRule}
        onSelectAutomaticAdjustments={handleSelectAutomaticAdjustments}
      />

      <CreateCustomRuleModal
        isOpen={showCustomRuleModal}
        onClose={handleCloseModals}
        onSave={handleSaveRule}
      />
    </>
  );
}
