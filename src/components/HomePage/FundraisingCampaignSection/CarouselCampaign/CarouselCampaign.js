import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../ui/carousel";
import React from "react";
import CustomCardCampaign from "./CustomCardCampaign";

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
];

const CarouselCampaign = () => {
  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-screen-laptop"
      >
        <CarouselContent>
          {data.map((item, index) => (
            <CarouselItem
              key={index}
              className="tablet:basis-1/2 laptop:basis-1/3"
            >
              <div className="p-1">
                <CustomCardCampaign {...item} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default CarouselCampaign;
