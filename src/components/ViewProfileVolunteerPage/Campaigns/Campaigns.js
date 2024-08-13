import React from "react";
import CardCampaign from "./CardCampaign";
import CampaignCardSkeleton from "./CampaignCardSkeleton";

const Campaigns = ({ campaigns, dataLoaded }) => {
  const renderSkeletons = () => {
    return Array.from({ length: 4 }).map((_, index) => (
      <CampaignCardSkeleton key={index} />
    ));
  };
  const activeCampaigns = campaigns.filter((campaign) => campaign.isActive);
  console.log("Campaigns lấy được trong volunteer (active): ", activeCampaigns);
  return (
    <div className="grid laptop:grid-cols-2 gap-6 my-3">
      {dataLoaded
        ? activeCampaigns.map((item, index) => (
            <CardCampaign
              campaignId={item.campaignID}
              key={index}
              achievedAmount={item?.donatePhase?.currentMoney}
              campaignCategory={item?.campaignType?.name}
              campaignName={item?.name}
              daysLeft={item?.expectedEndDate}
              imgSrc={item?.image}
              organizerName={
                item?.organization
                  ? item?.organization?.name
                  : item?.member
                  ? item?.member?.firstName + " " + item?.member?.lastName
                  : "Không xác định"
              } // Sửa lỗi null bằng cách thêm dấu ? để kiểm tra trước khi truy cập
              progressValue={item?.donatePhase?.percent}
              phases={[
                item?.donatePhase,
                item?.processingPhase,
                item?.statementPhase,
              ]}
              isTransparent={item?.isTransparent}
              checkTransparentDate={item?.checkTransparentDate}
              campaignTier={item?.campaignTier}
            />
          ))
        : renderSkeletons()}
    </div>
  );
};

export default Campaigns;
