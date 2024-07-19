import xlsx from "json-as-xlsx";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { GETALLREQUESTNEWS } from "../../../../api/apiConstants";
import { format } from "date-fns";

export async function exportToExcel() {
  try {
    const response = await axiosPrivate.get(
      GETALLREQUESTNEWS
    );

    if (response.status === 200) {
      console.log("Fetched data:", response?.data?.data);

      let listNews = response?.data?.data?.list.map((news) => ({
        "ID News": news.post?.postID,  
        "Tên bài viết": news.post?.title,
        "Tạo bởi tình nguyện viên": (news?.member?.firstName + " " + news?.member?.lastName),
        "Tạo bởi quản lý tổ chức": (news?.organizationManager?.firstName + " " + news?.organizationManager?.lastName),
        "Người duyệt": (news?.moderator?.firstName + " " + news?.moderator?.lastName),
        "Ngày tạo": format(new Date(news?.createDate), 'dd/MM/yyyy, h:mm:ss a'),
        "Ngày duyệt": format(new Date(news?.approvedDate), 'dd/MM/yyyy, h:mm:ss a'),
        "Xác thực": news.isApproved === true ? "Đồng ý" : "Từ chối",
      }));

      let columns = [
        {
          sheet: "Request listNews",
          columns: [
            { label: "ID News", value: "ID News" },
            { label: "Tên bài viết", value: "Tên bài viết" },
            { label: "Tạo bởi tình nguyện viên", value: "Tạo bởi tình nguyện viên" },
            { label: "Tạo bởi quản lý tổ chức", value: "Tạo bởi quản lý tổ chức" },
            { label: "Người duyệt", value: "Người duyệt" },
            { label: "Ngày tạo", value: "Ngày tạo" },
            { label: "Ngày duyệt", value: "Ngày duyệt" },
            { label: "Xác thực", value: "Xác thực" },
          ],
          content: listNews,
        },
      ];

      let settings = {
        fileName: "Bảng danh sách yêu cầu tạo tin tức",
      };

      xlsx(columns, settings);
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    // Handle error as needed
  }
}
