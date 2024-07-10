/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useParams } from "react-router-dom";
import CardCampaign from "./CardCampaign/CardCampaign";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { axiosPublic } from "../../api/axiosInstance";
import { GET_ORGANIZATION_BY_ID } from "../../api/apiConstants";
import ViewProfileOrganizationSkeleton from "./ViewProfileOrganizationSkeleton/ViewProfileOrganizationSkeleton";
import OrganizationInformation from "./OrganizationInformation/OrganizationInformation";
import OrganizationManagerInformation from "./OrganizationManagerInformation/OrganizationManagerInformation";

const ViewProfileOrganizationPage = () => {
  const { id: organizationId } = useParams();
  console.log("Organization ID vừa nhấn vào: ", organizationId);
  const { toast } = useToast();
  const [data, setData] = React.useState([]);
  const [organizationManagerData, setOrganizationManagerData] = React.useState(
    []
  );
  const [campaigns, setCampaigns] = React.useState([]);
  const [dataLoaded, setDataLoaded] = React.useState(false);

  // Sử dụng useEffect để cuộn trang lên đầu sau khi component được render
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Tạo hiệu ứng cuộn nhẹ
    });
    async function fetchData() {
      try {
        toast({
          title: "Đang tải dữ liệu tổ chức...",
          description: "Vui lòng chờ đợi trong giây lát !",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
        const response = await axiosPublic.get(
          GET_ORGANIZATION_BY_ID + `${organizationId}`
        );
        if (response.status === 200) {
          setData(response.data.data);
          setOrganizationManagerData(response.data.data.organizationManager);
          setCampaigns(response.data.data.campaigns);
          setDataLoaded(true);
          toast({
            title: "Tải dữ liệu tổ chức thành công!",
            action: <ToastAction altText="undo">Ẩn</ToastAction>,
          });
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
        toast({
          title: "Lỗi...",
          variant: "destructive",
          description: "Lỗi khi lấy dữ liệu !" + error,
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    }
    fetchData();
  }, [organizationId, toast]); // Mảng rỗng đảm bảo rằng hiệu ứng chỉ chạy một lần sau khi component mount
  console.log("data profile tổ chức:", data);
  console.log("data profile quản lý tổ chức:", organizationManagerData);
  console.log("data campaigns tổ chức:", campaigns);

  return dataLoaded ? (
    <div className="w-4/5 mx-auto p-6 mobile:p-10 my-3">
      <div className="grid grid-cols-1 gap-8">
        <OrganizationInformation organizationData={data} />
        <OrganizationManagerInformation
          organizationManagerData={organizationManagerData}
        />
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold">Chiến dịch</h3>
        <div className="mt-4 grid grid-cols-1 mobile:grid-cols-2 gap-4">
          {campaigns.map((campaign) => (
            <CardCampaign
              key={campaign.campaignID}
              campaignId={campaign.campaignID}
              imgSrc={campaign.image}
              daysLeft={campaign.expectedEndDate}
              campaignName={campaign.name}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <ViewProfileOrganizationSkeleton />
  );
};

export default ViewProfileOrganizationPage;
