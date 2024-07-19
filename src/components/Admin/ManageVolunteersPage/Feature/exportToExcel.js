import xlsx from "json-as-xlsx";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { GETALLACCOUNTSVOLUNTEER } from "../../../../api/apiConstants";

export async function exportToExcel() {
  try {
    const response = await axiosPrivate.get(
      GETALLACCOUNTSVOLUNTEER
    );

    if (response.status === 200) {
      console.log("Fetched data:", response.data.data);

      let volunteers = response.data.data.list.map((volunteer) => ({
        "ID người dùng": volunteer?.accountID,
        "Tên người dùng": volunteer?.username,
        "Email": volunteer?.email ,
        "Vai trò": "Volunteer",
        "Ngày tạo": volunteer?.createdAt,
        "Trạng thái": volunteer?.isActived === true ? "Đang hoạt động" : "Dừng hoạt động",
      }));

      let columns = [
        {
          sheet: "Request volunteers",
          columns: [
            { label: "ID người dùng", value: "ID người dùng" },
            { label: "Tên người dùng", value: "Tên người dùng" },
            { label: "Email", value: "Email" },
            { label: "Vai trò", value: "Vai trò" },
            { label: "Ngày tạo", value: "Ngày tạo" },
            { label: "Trạng thái", value: "Trạng thái" },
          ],
          content: volunteers,
        },
      ];

      let settings = {
        fileName: "Bảng danh sách tài khoản thành viên",
      };

      xlsx(columns, settings);
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    // Handle error as needed
  }
}
