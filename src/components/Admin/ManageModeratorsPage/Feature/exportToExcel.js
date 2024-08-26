import xlsx from "json-as-xlsx";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { GETALLACCOUNTSMODERATOR } from "../../../../api/apiConstants";

export async function exportToExcel() {
  try {
    const response = await axiosPrivate.get(
      GETALLACCOUNTSMODERATOR
    );

    if (response.status === 200) {
      console.log("Fetched data:", response.data.data);

      let moderators = response.data.data.accounts.map((moderator) => ({
        "ID người dùng": moderator?.accountID,
        "Tên người dùng": moderator?.username,
        "Email": moderator?.email ,
        "Vai trò": "Người kiểm duyệt",
        "Ngày tạo": moderator?.createdAt,
        "Trạng thái": moderator?.isActived === true ? "Đang hoạt động" : "Dừng hoạt động",
      }));

      let columns = [
        {
          sheet: "Request moderators",
          columns: [
            { label: "ID người dùng", value: "ID người dùng" },
            { label: "Tên người dùng", value: "Tên người dùng" },
            { label: "Email", value: "Email" },
            { label: "Vai trò", value: "Vai trò" },
            { label: "Ngày tạo", value: "Ngày tạo" },
            { label: "Trạng thái", value: "Trạng thái" },
          ],
          content: moderators,
        },
      ];

      let settings = {
        fileName: "Bảng danh sách tài khoản ngưởi kiểm duyệt",
      };

      xlsx(columns, settings);
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    // Handle error as needed
  }
}
