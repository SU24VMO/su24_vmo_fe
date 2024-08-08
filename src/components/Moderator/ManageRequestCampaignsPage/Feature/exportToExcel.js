import xlsx from "json-as-xlsx";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { GETALLREQUESTCAMPAIGN } from "../../../../api/apiConstants";

export async function exportToExcel() {
  try {
    const response = await axiosPrivate.get(
      GETALLREQUESTCAMPAIGN
    );

    if (response.status === 200) {
      console.log("Fetched data:", response?.data?.data);

      let campaigns = response?.data?.data?.list.map((campaign) => ({
        "Tên chiến dịch": campaign.campaign?.name,
        // "Loại chiến dịch": campaign.campaign?.name,
        "Tạo bởi tình nguyện viên": campaign.member?.lastName,
        "Tạo bởi quản lý tổ chức": campaign.organizationManager?.lastName,
        "Người duyệt": campaign.moderator?.lastName,
        "Ngày tạo": campaign?.createDate,
        "Ngày duyệt": campaign?.approvedDate,
        "Xác thực": campaign?.isApproved === true ? "Đồng ý" : "Từ chối",
      }));

      let columns = [
        {
          sheet: "Request Campaigns",
          columns: [
            { label: "Tên chiến dịch", value: "Tên chiến dịch" },
            { label: "Tạo bởi tình nguyện viên", value: "Tạo bởi tình nguyện viên" },
            { label: "Tạo bởi quản lý tổ chức", value: "Tạo bởi quản lý tổ chức" },
            { label: "Người duyệt", value: "Người duyệt" },
            { label: "Ngày tạo", value: "Ngày tạo" },
            { label: "Ngày duyệt", value: "Ngày duyệt" },
            { label: "Xác thực", value: "Xác thực" },
          ],
          content: campaigns,
        },
      ];

      let settings = {
        fileName: "Bảng danh sách yêu cầu tạo chiến dịch",
      };

      xlsx(columns, settings);
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    // Handle error as needed
  }
}
