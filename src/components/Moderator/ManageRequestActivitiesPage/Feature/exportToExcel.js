import xlsx from "json-as-xlsx";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { GETALLREQUESTACTIVITIES } from "../../../../api/apiConstants";
import { format } from "date-fns";

export async function exportToExcel() {
  try {
    const response = await axiosPrivate.get(
      GETALLREQUESTACTIVITIES
    );

    if (response.status === 200) {
      console.log("Fetched data:", response?.data?.data);

      let listActivities = response?.data?.data?.createActivityRequests.map((activity) => ({
        "ID activity": activity.activity?.activityId,  
        "Tiêu đề": activity.activity?.title,
        "Nội dung": activity.activity?.content,
        // "Nội dung": activity.activity?.content,

        // "Nội dung": activity.activity?.content,

        "Tạo bởi tình nguyện viên": activity?.member ? (activity?.member?.firstName + " " + activity?.member?.lastName) : "Không có",
        "Tạo bởi quản lý tổ chức": activity?.organizationManager ? (activity?.organizationManager?.firstName + " " + activity?.organizationManager?.lastName) : "Không có",
        "Người duyệt": activity?.moderator ? (activity?.moderator?.firstName + " " + activity?.moderator?.lastName) : "Chưa có",
        "Ngày tạo": format(new Date(activity?.createDate), 'dd/MM/yyyy, h:mm:ss a'),
        "Ngày duyệt": format(new Date(activity?.approvedDate), 'dd/MM/yyyy, h:mm:ss a'),
        "Ngày cập nhật": format(new Date(activity?.updateDate), 'dd/MM/yyyy, h:mm:ss a'),

        "Xác thực": activity.isApproved === true ? "Đồng ý" : "Từ chối",
      }));

      let columns = [
        {
          sheet: "Request Activities",
          columns: [
            { label: "ID activity", value: "ID activity" },
            { label: "Tiêu đề", value: "Tiêu đề" },
            { label: "Nội dung", value: "Nội dung" },

            { label: "Tạo bởi tình nguyện viên", value: "Tạo bởi tình nguyện viên" },
            { label: "Tạo bởi quản lý tổ chức", value: "Tạo bởi quản lý tổ chức" },
            { label: "Người duyệt", value: "Người duyệt" },
            { label: "Ngày tạo", value: "Ngày tạo" },
            { label: "Ngày duyệt", value: "Ngày duyệt" },
            { label: "Xác thực", value: "Xác thực" },
          ],
          content: listActivities,
        },
      ];

      let settings = {
        fileName: "Bảng danh sách yêu cầu tạo hoạt động toàn phần",
      };

      xlsx(columns, settings);
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    // Handle error as needed
  }
}

