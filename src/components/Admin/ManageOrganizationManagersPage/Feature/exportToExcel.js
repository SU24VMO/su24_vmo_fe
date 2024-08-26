import xlsx from "json-as-xlsx";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { GETALLACCOUNTSOM } from "../../../../api/apiConstants";

export async function exportToExcel() {
  try {
    const response = await axiosPrivate.get(
      GETALLACCOUNTSOM
    );

    if (response.status === 200) {
      console.log("Fetched data:", response.data.data);

      let organzationManagers = response.data.data.accounts.map((organzationManager) => ({
        "ID người dùng": organzationManager?.accountID,
        "Tên người dùng": organzationManager?.username,
        "Email": organzationManager?.email ,
        "Vai trò": "Quản lí tổ chức",
        "Ngày tạo": organzationManager?.createdAt,
        "Trạng thái": organzationManager?.isActived === true ? "Đang hoạt động" : "Dừng hoạt động",
      }));

      let columns = [
        {
          sheet: "Request organzation managers",
          columns: [
            { label: "ID người dùng", value: "ID người dùng" },
            { label: "Tên người dùng", value: "Tên người dùng" },
            { label: "Email", value: "Email" },
            { label: "Vai trò", value: "Vai trò" },
            { label: "Ngày tạo", value: "Ngày tạo" },
            { label: "Trạng thái", value: "Trạng thái" },
          ],
          content: organzationManagers,
        },
      ];

      let settings = {
        fileName: "Bảng danh sách tài khoản thành viên tổ chức",
      };

      xlsx(columns, settings);
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    // Handle error as needed
  }
}
