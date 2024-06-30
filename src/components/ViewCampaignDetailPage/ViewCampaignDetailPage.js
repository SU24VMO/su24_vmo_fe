import React from "react";
import LeftDetailCampaignSection from "./LeftDetailCampaignSection/LeftDetailCampaignSection";
import RightDetailCampaignSection from "./RightDetailCampaignSection/RightDetailCampaignSection";
import BottomDetailCampaignSection from "./BottomDetailCampaignSection/BottomDetailCampaignSection";
import { Separator } from "../ui/separator";
import { useParams } from "react-router-dom";

const ViewCampaignDetailPage = () => {
  const { id: campaignId } = useParams();
  console.log("campaignId của campaign", campaignId);
  return (
    <>
      <div className="px-3 tablet:px-24">
        <div className="h-full py-6 flex flex-col items-center justify-center">
          <div className="grid h-full w-full items-stretch gap-6 tablet:grid-cols-1">
            <div className="flex flex-col space-y-4">
              <div className="grid h-full gap-6 tablet:grid-cols-3 space-y-2">
                {/* Left */}
                <div className="tablet:col-span-2">
                  <LeftDetailCampaignSection campaignId={campaignId} />
                </div>
                {/* Right */}
                <div>
                  <RightDetailCampaignSection />
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-10 tablet:my-24" />
          <div className="w-full">
            <BottomDetailCampaignSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCampaignDetailPage;
