import React from "react";
import LeftDonatePage from "./LeftDonatePage/LeftDonatePage";
import RightDonatePage from "./RightDonatePage/RightDonatePage";
import { Navigate, useParams } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { GET_CAMPAIGN_BY_ID } from "../../api/apiConstants";
import { axiosPublic } from "../../api/axiosInstance";
import LeftDonatePageSkeleton from "./LeftDonatePageSkeleton/LeftDonatePageSkeleton";
import RightDonatePageSkeleton from "./RightDonatePageSkeleton/RightDonatePageSkeleton";

const DonatePage = () => {
  const { campaignID: campaignId } = useParams();
  const [campaign, setCampaign] = React.useState(null);
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { toast } = useToast();

  // Hàm lấy dữ liệu campaign detail từ API
  const fetchData = React.useCallback(
    async (campaignId) => {
      toast({
        title: "Đang tải dữ liệu chiến dịch...",
        description: "Vui lòng chờ đợi trong giây lát !",
        action: <ToastAction altText="undo">Ẩn</ToastAction>,
      });
      if (!campaignId) {
        setError(true); // Nếu không có id, set lỗi
        return;
      }
      try {
        const response = await axiosPublic.get(
          `${GET_CAMPAIGN_BY_ID}${campaignId}`
        );
        if (response.status === 200) {
          toast({
            title: "Đã lấy dữ liệu chiến dịch thành công!",
            action: <ToastAction altText="undo">Ẩn</ToastAction>,
          });
          setCampaign(response.data.data);
          setDataLoaded(true);

          console.log("Campaign donate get được: ", response.data.data);
        } else {
          toast({
            variant: "destructive",
            title: "Lỗi !",
            description:
              "Có thể chiến dịch ban đầu đã bị xóa hoặc không tồn tại !",
            action: <ToastAction altText="undo">Ẩn</ToastAction>,
          });
          setError(true); // Nếu response không thành công, set lỗi
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Lỗi !",
          description:
            "Vui lòng kiểm tra lại thiết bị của bạn ! Code: " + error,
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
        console.error("Error fetching data from API:", error);
      }
    },
    [toast]
  );

  React.useEffect(() => {
    // Cuộn lên đầu trang khi component được mount
    window.scrollTo(0, 0);
    fetchData(campaignId);
  }, [fetchData]);

  if (error) {
    return <Navigate to="/404" />; // Redirect người dùng nếu có lỗi
  }

  return (
    <>
      <div className="tablet:px-24">
        <div className="h-full py-6 flex flex-col items-center justify-center">
          <div className="grid h-full w-full items-stretch gap-6 tablet:grid-cols-1">
            <div className="flex flex-col space-y-4">
              <div className="grid h-full gap-6 tablet:grid-cols-3 space-y-2">
                {/* Left */}
                <div>
                  {dataLoaded ? (
                    <LeftDonatePage data={campaign} />
                  ) : (
                    <LeftDonatePageSkeleton />
                  )}
                </div>
                {/* Right */}
                <div className="tablet:col-span-2">
                  {dataLoaded ? (
                    <RightDonatePage data={campaign} />
                  ) : (
                    <RightDonatePageSkeleton />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonatePage;
