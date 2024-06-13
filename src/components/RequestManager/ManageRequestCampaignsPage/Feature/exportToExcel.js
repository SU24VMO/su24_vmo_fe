import xlsx from "json-as-xlsx";

export function exportToExcel({ campaign }) {
  let columns = [
    {
      sheet: "RequestCampaigns",
      columns: [
        { label: "Mã số đơn tạo chiến dịch", value: "create_campaign_request_id" },
        { label: "Mã chiến dịch", value: "campaign_id" },
        { label: "Tên chiến dịch", value: "name" },
        { label: "Tạo bởi thành viên", value: "create_by_user" },
        { label: "Tạo bởi tổ chức", value: "create_by_om" },
        { label: "Duyệt bởi", value: "approved_by" },
        { label: "Cập nhật bởi", value: "update_by" },
        { label: "Ngày tạo đơn duyệt", value: "create_date" },
        {
          label: "Xác thực",
          value: (row) => (row.is_verified === true ? "Đồng ý" : "Từ chối"),
        },
        
      ],
      content: campaign,
    },
  ];

  let settings = {
    fileName: "Bảng danh sách yêu cầu tạo chiến dịch",
  };

  xlsx(columns, settings);
}
