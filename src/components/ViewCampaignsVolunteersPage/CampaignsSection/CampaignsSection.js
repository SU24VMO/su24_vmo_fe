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
import axios from "axios";

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
  const [selectedCampaignName, setSelectedCampaignName] = React.useState(null); // state cho selectedCampaignName

  // Lấy dữ liệu các campaign từ API
  const fetchData = async (
    page,
    selectedCampaignTypeID,
    selectedCampaignStatus,
    selectedCampaignName,
    signal
  ) => {
    // if (!hasMore) return;
    setLoadingMore(true);
    // toast({
    //   title: "Đang tải dữ liệu các chiến dịch...",
    //   description: "Vui lòng chờ đợi trong giây lát !",
    //   action: <ToastAction altText="undo">Ẩn</ToastAction>,
    // });
    try {
      let url = `${GET_CAMPAIGN_FILTER}?pageSize=6&pageNo=${page}&createBy=volunteer`;
      if (selectedCampaignTypeID) {
        url += `&campaignTypeId=${selectedCampaignTypeID}`;
      }
      if (selectedCampaignStatus) {
        url += `&status=${selectedCampaignStatus}`;
      }
      if (selectedCampaignName) {
        url += `&campaignName=${selectedCampaignName}`;
      }
      const response = await axiosPublic.get(url, { signal });
      if (response.status === 200) {
        let fetchedData = response.data.data;
        // Bước 2: Thêm logic lọc dữ liệu dựa trên trạng thái
        if (selectedCampaignStatus) {
          if (selectedCampaignStatus === "Đã kết thúc") {
            fetchedData = fetchedData.filter(
              (campaign) => campaign.isComplete === true
            );
          } else {
            // "Đang thực hiện" hoặc "Đạt mục tiêu"
            fetchedData = fetchedData.filter(
              (campaign) =>
                campaign.processingPhases.some(phase => phase.isProcessing) ||
                campaign.statementPhase.isProcessing ||
                campaign.donatePhase.isProcessing
            );
          }
        }
        // Bước 3: Cập nhật state với dữ liệu đã lọc
        if (fetchedData.length === 0) {
          setHasMore(false);
        } else if (page > 1) {
          setData((prevData) => [...prevData, ...fetchedData]);
        } else {
          setData(fetchedData);
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
          description: "Vui lòng kiểm tra lại thiết bị của bạn ! Code: " + error,
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    } finally {
      setLoadingMore(false);
    }
  };

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setData([]); // Reset data khi selectedCampaignTypeID thay đổi
    setPageNo(1);
    setHasMore(true);
    fetchData(
      1,
      selectedCampaignTypeID,
      selectedCampaignStatus,
      selectedCampaignName, 
      signal
    );
    return () => {
      abortController.abort();
    };
  }, [selectedCampaignTypeID, selectedCampaignStatus, selectedCampaignName]);

  // Hàm xử lý khi nhấn nút Xem Thêm
  const handleLoadMore = () => {
    // setLoadingMore(true);
    setPageNo((prevPageNo) => prevPageNo + 1);
    fetchData(
      pageNo + 1,
      selectedCampaignTypeID,
      selectedCampaignStatus,
      selectedCampaignName
    );
  };

  const renderSkeletons = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <CampaignsSectionSkeleton key={index} />
    ));
  };

  console.log("selectedCampaignTypeID vừa chọn", selectedCampaignTypeID);
  console.log("selectedCampaignStatus vừa chọn", selectedCampaignStatus);
  console.log("setSelectedCampaignName vừa search", selectedCampaignName);

  return (
    <>
      <div className="flex flex-col space-y-3 tablet:space-y-0 tablet:flex-row mobile:items-center justify-between my-10">
        {/* Đề mục & trạng thái của chiến dịch */}
        <div className="flex flex-col space-y-3 w-full mobile:justify-between tablet:w-fit tablet:items-center tablet:space-y-0 tablet:space-x-3 tablet:flex-row tablet:justify-normal p-3 border bg-background rounded-lg shadow-lg">
          {/* Tìm kiếm theo danh mục */}
          <CustomComboboxCategory
            setSelectedCampaignTypeID={setSelectedCampaignTypeID}
          />
          {/* Tìm kiếm theo giai đoạn */}
          <CustomComboboxStatus
            setSelectedCampaignStatus={setSelectedCampaignStatus}
          />
          {/* Tìm kiếm theo chiến dịch đó được tạo bởi user/organize */}
        </div>
        {/* Search chiến dịch */}
        <SearchBar setSelectedCampaignName={setSelectedCampaignName} />
      </div>
      <div className="grid tablet:grid-cols-2 laptop:grid-cols-3 gap-6">
        {dataLoaded
          ? data.map((item, index) => (
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
                  item.processingPhases[0],
                  item.statementPhase,
                ]}
                isTransparent={item.isTransparent}
                checkTransparentDate={item.checkTransparentDate}
                campaignTier={item.campaignTier}
                isComplete={item.isComplete}
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
            variant="green_theme_primary"
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
