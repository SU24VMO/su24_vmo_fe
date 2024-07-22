import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../ui/carousel";
import React from "react";
import CustomCardCampaign from "./CustomCardCampaign";
import { useToast } from "../../../ui/use-toast";
import { ToastAction } from "../../../ui/toast";
import { GET_CAMPAIGN_FILTER } from "../../../../api/apiConstants";
import { axiosPublic } from "../../../../api/axiosInstance";
import CampaignsSectionSkeleton from "./CampaignsSectionSkeleton/CampaignsSectionSkeleton";
import axios from "axios";

const CarouselCampaignsOrganization = () => {
  const { toast } = useToast();
  const [data, setData] = React.useState([]);
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true); // Thêm trạng thái kiểm tra còn dữ liệu hay không

  // Lấy dữ liệu các campaign từ API
  const fetchData = async (signal) => {
    // if (!hasMore) return;
    // toast({
    //   title: "Đang tải dữ liệu các chiến dịch...",
    //   description: "Vui lòng chờ đợi trong giây lát !",
    //   action: <ToastAction altText="undo">Ẩn</ToastAction>,
    // });
    try {
      let url = `${GET_CAMPAIGN_FILTER}?pageSize=6&pageNo=1&createBy=organization`;
      const response = await axiosPublic.get(url, { signal });
      if (response.status === 200) {
        const fetchedData = response.data.data.list;
        if (fetchedData.length === 0) {
          setHasMore(false);
        } else {
          setData(fetchedData);
          console.log(
            "Homepage - các chiến dịch được tạo bởi tổ chức",
            fetchedData
          );
        }
        setDataLoaded(true);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        toast({
          variant: "destructive",
          title: "Lỗi !",
          description:
            "Vui lòng kiểm tra lại thiết bị của bạn ! Code: " + error,
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    }
  };

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setData([]);
    setHasMore(true);
    fetchData(signal);
    return () => {
      abortController.abort();
    };
  }, []);

  const renderSkeletons = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <CampaignsSectionSkeleton key={index} />
    ));
  };

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
          {dataLoaded
            ? data.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="tablet:basis-1/2 laptop:basis-1/3"
                >
                  <div className="p-1">
                    <CustomCardCampaign
                      campaignId={item.campaignID}
                      key={index}
                      achievedAmount={item.donatePhase.currentMoney}
                      campaignCategory={item.campaignType?.name}
                      campaignName={item?.name}
                      daysLeft={item.expectedEndDate}
                      imgSrc={item.image}
                      organizerName={
                        item.organization
                          ? item.organization?.name
                          : item.member
                          ? item.member?.firstName + " " + item.member?.lastName
                          : "Không xác định"
                      } // Sửa lỗi null bằng cách thêm dấu ? để kiểm tra trước khi truy cập
                      progressValue={item.donatePhase.percent}
                      phases={[
                        item.donatePhase,
                        item.processingPhase,
                        item.statementPhase,
                      ]}
                    />
                  </div>
                </CarouselItem>
              ))
            : renderSkeletons()}
          {hasMore ? null : <p>Chưa có chiến dịch được tạo bởi tổ chức</p>}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default CarouselCampaignsOrganization;
