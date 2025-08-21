import CampaignsView from "@/components/campaigns/CampaignsView";

export default function Campaigns() {
  return (
    <div className="h-full overflow-y-auto  mr-6">
      <div
        className="h-full flex flex-col  pt-2 pb-2 overflow-y-auto mx-auto relative rounded-lg bg-[#f1f4f7] border border-[#0000001a]"
        style={{ width: "calc(100vw - 120px)" }}
      >
        <CampaignsView />
      </div>
    </div>
  );
}
