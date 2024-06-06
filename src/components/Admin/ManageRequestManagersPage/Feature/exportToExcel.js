import xlsx from "json-as-xlsx";

export function exportToExcel({ organizationManager }) {
  let columns = [
    {
      sheet: "Persons",
      columns: [
        { label: "ID", value: "account_id" },
        { label: "Tên người duyệt", value: "username" },
          { label: "Email", value: "email" },
        { label: "Số điện thoại", value: "phone_number" },
        { label: "Dừng hoạt động", value: "is_block"},
        { label: "Trạng thái xác thực", value: "is_verified"},
        { label: "Ngày tạo", value: "create_at" },
        
      ],
      content: organizationManager,
    },
  ];

  let settings = {
    fileName: "Bảng quản lí người duyệt yêu cầu",
  };

  xlsx(columns, settings);
}