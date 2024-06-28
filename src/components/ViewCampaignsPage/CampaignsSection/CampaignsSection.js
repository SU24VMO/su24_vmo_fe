import React from "react";
import CustomCardCampaign from "./CustomCardCampaign";
import { Button } from "../../ui/button";
import { axiosPublic } from "../../../api/axiosInstance";
import { GET_CAMPAIGN_FILTER } from "../../../api/apiConstants";
import CampaignsSectionSkeleton from "./CampaignsSectionSkeleton/CampaignsSectionSkeleton";
import { CheckCheck } from "lucide-react";
import SearchBar from "./Feature/SearchBar";
import CustomComboboxCategory from "./Feature/CustomComboboxCategory";
import CustomComboboxStatus from "./Feature/CustomComboboxStatus";
import { useToast } from "../../ui/use-toast";
import { ToastAction } from "../../ui/toast";
import CustomComboboxCreateBy from "./Feature/CustomComboboxCreateBy";

const CampaignsSection = () => {
  const { toast } = useToast();
  const [data, setData] = React.useState([]);
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [pageNo, setPageNo] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true); // Thêm trạng thái kiểm tra còn dữ liệu hay không
  const [selectedCampaignTypeID, setSelectedCampaignTypeID] =
    React.useState(null); // state cho selectedCampaignTypeID
  const [selectedCampaignStatus, setSelectedCampaignStatus] =
    React.useState(null); // state cho selectedCampaignStatus
  const [selectedCampaignCreateBy, setSelectedCampaignCreateBy] =
    React.useState(null); // state cho selectedCampaignCreateBy

  // Lấy dữ liệu các campaign từ API
  const fetchData = async (
    page,
    selectedCampaignTypeID,
    selectedCampaignStatus,
    selectedCampaignCreateBy
  ) => {
    // if (!hasMore) return;
    setLoadingMore(true);
    toast({
      title: "Đang tải dữ liệu các chiến dịch...",
      description: "Vui lòng chờ đợi trong giây lát !",
      action: <ToastAction altText="undo">Ẩn</ToastAction>,
    });
    try {
      let url = `${GET_CAMPAIGN_FILTER}?pageSize=6&pageNo=${page}`;
      if (selectedCampaignTypeID) {
        url += `&campaignTypeId=${selectedCampaignTypeID}`;
      }
      if (selectedCampaignStatus) {
        url += `&status=${selectedCampaignStatus}`;
      }
      if (selectedCampaignCreateBy) {
        url += `&createBy=${selectedCampaignCreateBy}`;
      }
      const response = await axiosPublic.get(url);
      if (response.status === 200) {
        const fetchedData = response.data.data.list;
        if (fetchedData.length === 0) {
          setHasMore(false);
        } else if (page > 1) {
          setData((prevData) => [...prevData, ...fetchedData]);
        } else {
          setData(fetchedData);
        }
        toast({
          title: "Tải dữ liệu các chiến dịch thành công!",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
        setDataLoaded(true);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi !",
        description: "Vui lòng kiểm tra lại thiết bị của bạn ! Code: " + error,
        action: <ToastAction altText="undo">Ẩn</ToastAction>,
      });
    } finally {
      setLoadingMore(false);
    }
  };

  React.useEffect(() => {
    setData([]); // Reset data khi selectedCampaignTypeID thay đổi
    setPageNo(1);
    setHasMore(true);
    fetchData(1, selectedCampaignTypeID, selectedCampaignStatus, selectedCampaignCreateBy);
  }, [selectedCampaignTypeID, selectedCampaignStatus, selectedCampaignCreateBy]);

  // Hàm xử lý khi nhấn nút Xem Thêm
  const handleLoadMore = () => {
    // setLoadingMore(true);
    setPageNo((prevPageNo) => prevPageNo + 1);
    fetchData(pageNo + 1, selectedCampaignTypeID);
  };

  const renderSkeletons = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <CampaignsSectionSkeleton key={index} />
    ));
  };

  console.log("selectedCampaignTypeID vừa chọn", selectedCampaignTypeID);
  console.log("selectedCampaignStatus vừa chọn", selectedCampaignStatus);
  console.log("selectedCampaignCreateBy vừa chọn", selectedCampaignCreateBy);

  return (
    <>
      <div className="flex flex-col space-y-3 tablet:space-y-0 tablet:flex-row mobile:items-center justify-between my-10">
        {/* Đề mục & trạng thái của chiến dịch */}
        <div className="z-10 flex flex-col space-y-3 w-full mobile:justify-between tablet:w-fit tablet:items-center tablet:space-y-0 tablet:space-x-3 tablet:flex-row tablet:justify-normal p-3 border bg-background rounded-lg shadow-lg">
          {/* Tìm kiếm theo danh mục */}
          <CustomComboboxCategory
            setSelectedCampaignTypeID={setSelectedCampaignTypeID}
          />
          {/* Tìm kiếm theo giai đoạn */}
          <CustomComboboxStatus
            setSelectedCampaignStatus={setSelectedCampaignStatus}
          />
          {/* Tìm kiếm theo chiến dịch đó được tạo bởi user/organize */}
          <CustomComboboxCreateBy
            setSelectedCampaignCreateBy={setSelectedCampaignCreateBy}
          />
        </div>
        {/* Search chiến dịch */}
        <SearchBar />
      </div>
      <div className="grid tablet:grid-cols-2 laptop:grid-cols-3 gap-6">
        {dataLoaded
          ? data.map((item, index) => (
              <CustomCardCampaign
                key={index}
                achievedAmount={item.donatePhase.currentMoney}
                campaignCategory={item.campaignType?.name}
                campaignName={item?.name}
                daysLeft={item.expectedEndDate}
                imgSrc={item.image}
                organizerName={item.organization?.name} // Sửa lỗi null bằng cách thêm dấu ? để kiểm tra trước khi truy cập
                progressValue={item.donatePhase.percent}
                phases={[
                  item.donatePhase,
                  item.processingPhase,
                  item.statementPhase,
                ]}
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
          <CheckCheck className="text-green-600 h-8 w-8" />
        </div>
      )}
    </>
  );
};

export default CampaignsSection;
