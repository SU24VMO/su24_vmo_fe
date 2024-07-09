import React from "react";
import CardCampaign from "./CardCampaign";

const Campaigns = ({ campaigns }) => {
  console.log("Campaigns lấy được trong volunteer: ", campaigns);
  return (
    <div className="grid laptop:grid-cols-2 gap-6 my-3">
      {campaigns ? (
        campaigns.map((item, index) => (
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
          />
        ))
      ) : (
        <p>Chưa có chiến dịch nào được tạo!</p>
      )}
    </div>
  );
};

export default Campaigns;
