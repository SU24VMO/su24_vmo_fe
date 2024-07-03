import xlsx from "json-as-xlsx";

export function exportToExcel({ organize }) {
  let columns = [
    {
      sheet: "RequestOrganize",
      columns: [
        { label: "Mã đơn tạo tổ chức", value: "create_organization_request_id" },
        { label: "Mã số tổ chức", value: "organization_id" },
        { label: "Tên tổ chức", value: "organization_name" },
        { label: "Email", value: "organization_manager_email" },
        { label: "Mã số thuế", value: "organization_tax_code" },
        { label: "Ngày thành lập tổ chức", value: "founding_date" },
        { label: "Mạng xã hội", value: "social_media_link" },
        { label: "Lĩnh vực hoạt động", value: "area_of_activity" },
        { label: "Địa chỉ", value: "address" },
        { label: "Thành tích", value: "achievement_link" },
        { label: "Đơn xác thực ủy quyền", value: "authorization_documents" },
        { label: "Duyệt bởi", value: "approved_by" },
        { label: "Ngày tạo đơn", value: "create_date" },
        { label: "Ngày duyệt", value: "approved_date" },
        {
          label: "Xác thực",
          value: (row) => (row.is_approved === true ? "Đã duyệt" : "Từ chối"),
        },
        
      ],
      content: organize,
    },
  ];

  let settings = {
    fileName: "Danh sách các đơn yêu cầu tạo tổ chức",
  };

  xlsx(columns, settings);
}
