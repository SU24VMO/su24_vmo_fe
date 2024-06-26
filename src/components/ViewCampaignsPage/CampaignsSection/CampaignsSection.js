import React from "react";
import CustomCardCampaign from "./CustomCardCampaign";
import { Button } from "../../ui/button";
import { axiosPublic } from "../../../api/axiosInstance";
import { GET_CAMPAIGN } from "../../../api/apiConstants";
import CampaignsSectionSkeleton from "./CampaignsSectionSkeleton/CampaignsSectionSkeleton";
import { CheckCheck } from 'lucide-react';

const CampaignsSection = () => {
  const [data, setData] = React.useState([]);
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [pageNo, setPageNo] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true); // Thêm trạng thái kiểm tra còn dữ liệu hay không

  // Lấy dữ liệu các campaign từ API
  const fetchData = React.useCallback(async (page) => {
    if (!hasMore) return; // Kiểm tra nếu không còn dữ liệu thì không gọi API
    try {
      const response = await axiosPublic.get(
        `${GET_CAMPAIGN}?pageSize=6&pageNo=${page}`
      );
      if (response.status === 200) {
        const fetchedData = response.data.data.list;
        if (fetchedData.length === 0 || fetchedData.length < 0) {
          setData((prevData) => [...prevData, ...fetchedData]);
          setHasMore(false); // Nếu dữ liệu trả về ít hơn yêu cầu, đánh dấu là đã hết dữ liệu
        }
        if (page > 1) {
          setData((prevData) => [...prevData, ...fetchedData]);
          console.log("fetchedData", fetchedData)
        } else {
          console.log("fetchedData", fetchedData)
          setData(fetchedData);
        }
        setDataLoaded(true);
      }
    } catch (error) {
      console.error("Error fetching data from API:", error);
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore]);

  // Gọi hàm fetchData khi component được render (chỉ chạy 1 lần)
  React.useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  // Hàm xử lý khi nhấn nút Xem Thêm
  const handleLoadMore = () => {
    setLoadingMore(true);
    setPageNo((prevPageNo) => prevPageNo + 1);
    fetchData(pageNo + 1);
  };

  const renderSkeletons = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <CampaignsSectionSkeleton key={index} />
    ));
  };

  return (
    <>
      <div className="flex items-center justify-center my-10">
        {/* Header và các phần khác giữ nguyên */}
      </div>
      <div className="grid tablet:grid-cols-2 laptop:grid-cols-3 gap-6">
        {dataLoaded
          ? data.map((item, index) => (
              <CustomCardCampaign
                key={index}
                achievedAmount={item.achievedAmount}
                campaignName={item?.name}
                daysLeft={item.daysLeft}
                imgSrc={item.image}
                organizerName={item.organization?.name} // Sửa lỗi null bằng cách thêm dấu ? để kiểm tra trước khi truy cập
                progressValue={item.progressValue}
              />
            ))
          : renderSkeletons()}
      </div>
      {/* Button Xem thêm */}
      {loadingMore ? (
        <div className="grid tablet:grid-cols-2 laptop:grid-cols-3 gap-6 my-3">
          {renderSkeletons()}
        </div>
      ) : hasMore ? ( // Kiểm tra nếu còn dữ liệu thì hiển thị nút Xem Thêm
        <div className="flex items-center justify-center my-10">
          <Button
            variant="default"
            className="tablet:text-lg"
            onClick={handleLoadMore}
          >
            Xem Thêm
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center my-10 text-lg font-medium">
          Bạn đã xem hết các chiến dịch từ thiện đang diễn ra 
          <CheckCheck className="text-green-600 h-8 w-8"/>
        </div>
      )}
    </>
  );
};

export default CampaignsSection;