import React from "react";
import LeftDetailCampaignSection from "./LeftDetailCampaignSection/LeftDetailCampaignSection";
import RightDetailCampaignSection from "./RightDetailCampaignSection/RightDetailCampaignSection";
import BottomDetailCampaignSection from "./BottomDetailCampaignSection/BottomDetailCampaignSection";
import { Separator } from "../ui/separator";
import { Navigate, useParams } from "react-router-dom";
import { GET_CAMPAIGN_BY_ID } from "../../api/apiConstants";
import { axiosPublic } from "../../api/axiosInstance";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import LeftDetailCampaignSkeleton from "./LeftDetailCampaignSection/LeftDetailCampaignSkeleton/LeftDetailCampaignSkeleton";
import RightDetailCampaignSkeleton from "./RightDetailCampaignSection/RightDetailCampaignSkeleton/RightDetailCampaignSkeleton";

const ViewCampaignDetailPage = () => {
  const { id: campaignId } = useParams();
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
          setCampaign(response.data.data);
          setDataLoaded(true);
          toast({
            title: "Đã lấy dữ liệu chiến dịch thành công!",
            action: <ToastAction altText="undo">Ẩn</ToastAction>,
          });
          console.log("Campaign get được: ", response.data.data);
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
    fetchData(campaignId);
  }, [fetchData]);

  console.log("campaignId của campaign", campaignId);

  if (error) {
    return <Navigate to="/404" />; // Redirect người dùng nếu có lỗi
  }
  return (
    <>
      <div className="px-3 tablet:px-24">
        <div className="h-full py-6 flex flex-col items-center justify-center">
          <div className="grid h-full w-full items-stretch gap-6 tablet:grid-cols-1">
            <div className="flex flex-col space-y-4">
              <div className="grid h-full gap-6 tablet:grid-cols-3 space-y-2">
                {/* Left */}
                <div className="tablet:col-span-2">
                  {dataLoaded ? (
                    <LeftDetailCampaignSection data={campaign} />
                  ) : (
                    <LeftDetailCampaignSkeleton />
                  )}
                </div>
                {/* Right */}
                <div>
                  {dataLoaded ? (
                    <RightDetailCampaignSection data={campaign} />
                  ) : (
                    <RightDetailCampaignSkeleton />
                  )}
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
