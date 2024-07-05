import xlsx from "json-as-xlsx";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { GETALLREQUESTORGANIZATION } from "../../../../api/apiConstants";
import { format } from "date-fns";

export async function exportToExcel() {
  try {
    const response = await axiosPrivate.get(
      GETALLREQUESTORGANIZATION
    );

    if (response.status === 200) {
      console.log("Fetched data:", response.data.data);

      let listOrganizations = response.data.data.list.map((organizations) => ({
        "ID tổ chức": organizations?.organizationID,
        "Tên tổ chức": organizations?.organizationName,
        "Mã số thuế": organizations?.organizationTaxCode, 
        "Địa chỉ": organizations?.address,
        "Ngày thành lập tổ chức": organizations?.foundingDate,
       "Mạng xã hội":organizations?.socialMediaLink,
       "Lĩnh vực hoạt động": organizations?.areaOfActivity ,
       "Thành tích": organizations?.achievementLink,
        "Đơn xác thực ủy quyền": organizations?.authorizationDocuments,
        "Người duyệt": (organizations?.moderator?.firstName + " " + organizations?.moderator?.lastName),
        "Ngày tạo": format(new Date(organizations?.createDate), 'dd/MM/yyyy, h:mm:ss a'),
        "Ngày duyệt": format(new Date(organizations?.approvedDate), 'dd/MM/yyyy, h:mm:ss a'),
        "Xác thực": organizations.isApproved === true ? "Đồng ý" : "Từ chối",
      }));

      let columns = [
        {
          sheet: "Request listOrganizations",
          columns: [
            { label: "ID tổ chức", value: "ID tổ chức" },
            { label: "Tên tổ chức", value: "Tên tổ chức" },
            { label: "Mã số thuế", value: "Mã số thuế" },
            { label: "Địa chỉ", value: "Địa chỉ" },
            { label: "Ngày thành lập tổ chức", value: "Ngày thành lập tổ chức" },
            { label: "Mạng xã hội", value: "Mạng xã hội" },
            { label: "Lĩnh vực hoạt động", value: "Lĩnh vực hoạt động" },
            { label: "Thành tích", value: "Thành tích" },
            { label: "Đơn xác thực ủy quyền", value: "Đơn xác thực ủy quyền" },
            { label: "Người duyệt", value: "Người duyệt" },
            { label: "Ngày tạo", value: "Ngày tạo" },
            { label: "Ngày duyệt", value: "Ngày duyệt" },
            { label: "Xác thực", value: "Xác thực" },
          ],
          content: listOrganizations,
        },
      ];

      let settings = {
        fileName: "Bảng danh sách yêu cầu tạo tổ chức",
      };

      xlsx(columns, settings);
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    // Handle error as needed
  }
}
