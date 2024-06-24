import xlsx from "json-as-xlsx";

export function exportToExcel({ campaigns }) {
  let columns = [
    {
      sheet: "Request Campaigns",
      columns: [
        { label: "Tên chiến dịch", value: "campaign.name" },
        { label: "Tạo bởi thành viên", value: "user.lastName" },
        { label: "Tạo bởi quản lí tổ chức", value: "organizationManager.lastName" },
        { label: "Người duyệt", value: "requestManager.lastName" },
        { label: "Ngày tạo", value: "createDate" },
        { label: "Ngày duyệt", value: "approvedDate" },
        {
          label: "Xác thực",
          value: (row) => (row.isApproved === true ? "Đồng ý" : "Từ chối"),
        },
        
      ],
      content: campaigns,
    },
  ];

  let settings = {
    fileName: "Bảng danh sách yêu cầu tạo chiến dịch",
  };

  xlsx(columns, settings);
}
