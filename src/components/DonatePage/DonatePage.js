import React from "react";
import LeftDonatePage from "./LeftDonatePage/LeftDonatePage";
import RightDonatePage from "./RightDonatePage/RightDonatePage";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { GET_CAMPAIGN_BY_ID } from "../../api/apiConstants";
import { axiosPublic } from "../../api/axiosInstance";
import LeftDonatePageSkeleton from "./LeftDonatePageSkeleton/LeftDonatePageSkeleton";
import RightDonatePageSkeleton from "./RightDonatePageSkeleton/RightDonatePageSkeleton";
import axios from "axios";

const DonatePage = () => {
  const { campaignID: campaignId } = useParams();
  const [campaign, setCampaign] = React.useState(null);
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [unauthorized, setUnauthorized] = React.useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Hàm lấy dữ liệu campaign detail từ API
  const fetchData = React.useCallback(
    async (campaignId, signal) => {
      if (!campaignId) {
        setError(true); // Nếu không có id, set lỗi
        return;
      }
      try {
        const response = await axiosPublic.get(
          `${GET_CAMPAIGN_BY_ID}${campaignId}`,
          { signal }
        );
        if (response.status === 200) {
          const campaignData = response.data?.data;
          setCampaign(campaignData);
          setDataLoaded(true);

          // Kiểm tra campaign.donatePhase.isProcessing
          if (!campaignData.donatePhase.isProcessing) {
            setUnauthorized(true);
          }

          console.log("Campaign donate get được: ", campaignData);
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
        if (axios.isCancel(error)) {
          console.log("Request was cancelled", error.message);
        } else {
          toast({
            variant: "destructive",
            title: "Lỗi !",
            description:
              "Vui lòng kiểm tra lại thiết bị của bạn ! Code: " + error,
            action: <ToastAction altText="undo">Ẩn</ToastAction>,
          });
          console.error("Error fetching data from API:", error);
        }
      }
    },
    [toast]
  );

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Tạo hiệu ứng cuộn nhẹ
    });
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetchData(campaignId, signal);
    return () => {
      abortController.abort();
    };
  }, [fetchData]);

  if (error) {
    navigate("/unauthorized"); // Redirect người dùng nếu có lỗi
    return;
  }

  if (unauthorized) {
    navigate("/unauthorized"); // Redirect người dùng nếu không được phép
    return;
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
