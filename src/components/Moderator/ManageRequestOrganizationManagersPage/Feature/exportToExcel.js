import xlsx from "json-as-xlsx";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { GETALLREQUESTOM } from "../../../../api/apiConstants";
import { format } from "date-fns";

export async function exportToExcel() {
  try {
    const response = await axiosPrivate.get(
      GETALLREQUESTOM
    );

    if (response.status === 200) {
      console.log("Fetched data:", response?.data?.data);

      let listOM = response?.data?.data?.list.map((organizationManager) => ({
        "ID quản lí tổ chức": organizationManager.organizationManager?.organizationManagerID,
        "Tên quản lí tổ chức": (organizationManager?.organizationManager?.firstName + " " + organizationManager?.organizationManager?.lastName),
        "Số diện thoại": organizationManager?.phoneNumber,
        "Địa chỉ": organizationManager?.address,
        "Mã CCCD": organizationManager?.citizenIdentification,
        "Mã số thuế cá nhân": organizationManager?.personalTaxCode,
        "Người duyệt": (organizationManager?.moderator?.firstName + " " + organizationManager?.moderator?.lastName),
        "Ngày tạo": format(new Date(organizationManager?.createDate), 'dd/MM/yyyy, h:mm:ss a'),
        "Ngày duyệt": format(new Date(organizationManager?.approvedDate), 'dd/MM/yyyy, h:mm:ss a'),
        "Xác thực": organizationManager.isApproved === true ? "Đồng ý" : "Từ chối",
      }));

      let columns = [
        {
          sheet: "Request listOM",
          columns: [
            { label: "ID quản lí tổ chức", value: "ID quản lí tổ chức" },
            { label: "Tên quản lí tổ chức", value: "Tên quản lí tổ chức" },

            { label: "Số diện thoại", value: "Số diện thoại" },

            { label: "Địa chỉ", value: "Địa chỉ" },

            { label: "Mã CCCD", value: "Mã CCCD" },
            { label: "Mã số thuế cá nhân", value: "Mã số thuế cá nhân" },


            { label: "Người duyệt", value: "Người duyệt" },
            { label: "Ngày tạo", value: "Ngày tạo" },
            { label: "Ngày duyệt", value: "Ngày duyệt" },
            { label: "Xác thực", value: "Xác thực" },
          ],
          content: listOM,
        },
      ];

      let settings = {
        fileName: "Bảng danh sách yêu cầu tạo quản lí tổ chức",
      };

      xlsx(columns, settings);
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    // Handle error as needed
  }
}
