import xlsx from "json-as-xlsx";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { GETALLACCOUNTSMEMBER } from "../../../../api/apiConstants";

export async function exportToExcel() {
  try {
    const response = await axiosPrivate.get(
      GETALLACCOUNTSMEMBER
    );

    if (response.status === 200) {
      console.log("Fetched data:", response.data.data);

      let members = response.data.data.list.map((member) => ({
        "ID người dùng": member?.accountID,
        "Tên người dùng": member?.username,
        "Email": member?.email ,
        "Vai trò": "Member",
        "Ngày tạo": member?.createdAt,
        "Trạng thái": member?.isActived === true ? "Đang hoạt động" : "Dừng hoạt động",
      }));

      let columns = [
        {
          sheet: "Request members",
          columns: [
            { label: "ID người dùng", value: "ID người dùng" },
            { label: "Tên người dùng", value: "Tên người dùng" },
            { label: "Email", value: "Email" },
            { label: "Vai trò", value: "Vai trò" },
            { label: "Ngày tạo", value: "Ngày tạo" },
            { label: "Ngày duyệt", value: "Ngày duyệt" },
            { label: "Trạng thái", value: "Trạng thái" },
          ],
          content: members,
        },
      ];

      let settings = {
        fileName: "Bảng danh sách tài khoản người dùng",
      };

      xlsx(columns, settings);
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    // Handle error as needed
  }
}
