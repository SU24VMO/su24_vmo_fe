import React from "react";
import CustomCardCampaign from "./CustomCardCampaign";
import { Button } from "../../ui/button";

const data = [
  {
    imgSrc: "https://via.placeholder.com/360x150",
    daysLeft: "00",
    campaignName: "Tên chiến dịch",
    organizerName: "Tên Cá nhân/Tổ Chức",
    progressValue: 50,
    achievedAmount: "00.000.000 VND",
  },
  {
    imgSrc: "https://via.placeholder.com/360x150",
    daysLeft: "30",
    campaignName: "Chiến dịch ABC",
    organizerName: "Châu Nhật Trường",
    progressValue: 70,
    achievedAmount: "30.000.000 VND",
  },
  {
    imgSrc: "https://via.placeholder.com/360x150",
    daysLeft: "100",
    campaignName: "Chiến dịch XYZ",
    organizerName: "Nguyễn Tiến Phát",
    progressValue: 30,
    achievedAmount: "100.000.000 VND",
  },
  {
    imgSrc: "https://via.placeholder.com/360x150",
    daysLeft: "00",
    campaignName: "Chiến dịch 123",
    organizerName: "Trương Đinh Đăng Khoa",
    progressValue: 10,
    achievedAmount: "70.000.000 VND",
  },
  {
    imgSrc: "https://via.placeholder.com/360x150",
    daysLeft: "00",
    campaignName: "Chiến dịch 456",
    organizerName: "Nguyễn Văn Dũng",
    progressValue: 40,
    achievedAmount: "10.000.000 VND",
  },
  {
    imgSrc: "https://via.placeholder.com/360x150",
    daysLeft: "00",
    campaignName: "Chiến dịch 456",
    organizerName: "Nguyễn Văn Dũng",
    progressValue: 40,
    achievedAmount: "10.000.000 VND",
  },
];

const CampaignsSection = () => {
  return (
    <>
      <div className="grid tablet:grid-cols-2 laptop:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <CustomCardCampaign
            key={index}
            achievedAmount={item.achievedAmount}
            campaignName={item.campaignName}
            daysLeft={item.daysLeft}
            imgSrc={item.imgSrc}
            organizerName={item.organizerName}
            progressValue={item.progressValue}
          />
        ))}
      </div>
      <div className="flex items-center justify-center my-10">
        <Button variant="default" className="tablet:text-lg">Xem Thêm</Button>
      </div>
    </>
  );
};

export default CampaignsSection;
