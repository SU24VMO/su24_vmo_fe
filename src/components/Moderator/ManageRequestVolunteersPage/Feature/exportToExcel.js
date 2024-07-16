import xlsx from "json-as-xlsx";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { GETALLREQUESTVOLUNTEERS } from "../../../../api/apiConstants";
import { format } from "date-fns";

export async function exportToExcel() {
  try {
    const response = await axiosPrivate.get(
      GETALLREQUESTVOLUNTEERS
    );

    if (response.status === 200) {
      console.log("Fetched data:", response.data.data);

      let listVolunteers = response.data.data.list.map((members) => ({
        "ID thành viên": members?.memberID,
        "Tên thành viên": members?.memberName,
        "Email": members?.email,
        "CCCD": members?.citizenIdentification,
        "Địa chỉ": members?.memberAddress,
        "Ngày sinh": members?.birthday,
        "Mạng xã hội": members?.socialMediaLink,
        "Tên CLB": members?.clubName,
        "Mô tả": members?.detailDescriptionLink,
        "Thành tích": members?.achievementLink,
        "Đơn xác thực ủy quyền": members?.authorizationDocuments,
        "Người duyệt": (members?.moderator?.firstName + " " + members?.moderator?.lastName),
        "Ngày tạo": format(new Date(members?.createDate), 'dd/MM/yyyy, h:mm:ss a'),
        "Ngày duyệt": format(new Date(members?.approvedDate), 'dd/MM/yyyy, h:mm:ss a'),
        "Xác thực": members.isApproved === true ? "Đồng ý" : "Từ chối",
      }));

      let columns = [
        {
          sheet: "Request listVolunteers",
          columns: [
            { label: "ID thành viên", value: "ID thành viên" },
            { label: "Tên thành viên", value: "Tên thành viên" },
            { label: "Email", value: "Email" },
            { label: "CCCD", value: "CCCD" },
            { label: "Địa chỉ", value: "Địa chỉ" },
            { label: "Ngày sinh", value: "Ngày sinh" },
            { label: "Mạng xã hội", value: "Mạng xã hội" },
            { label: "Tên CLB", value: "Tên CLB" },
            { label: "Mô tả", value: "Mô tả" },
            { label: "Thành tích", value: "Thành tích" },
            { label: "Đơn xác thực ủy quyền", value: "Đơn xác thực ủy quyền" },
            { label: "Người duyệt", value: "Người duyệt" },
            { label: "Ngày tạo", value: "Ngày tạo" },
            { label: "Ngày duyệt", value: "Ngày duyệt" },
            { label: "Xác thực", value: "Xác thực" },
          ],
          content: listVolunteers,
        },
      ];

      let settings = {
        fileName: "Bảng danh sách yêu cầu tạo thành viên",
      };

      xlsx(columns, settings);
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    // Handle error as needed
  }
}
