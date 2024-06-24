import xlsx from "json-as-xlsx";

export function exportToExcel({ member }) {
  let columns = [
    {
      sheet: "Request member",
      columns: [
        { label: "Tên thành viên", value: "memberName" },
        { label: "Email", value: "email" },
        { label: "Địa chỉ", value: "memberAddress" },
        { label: "Người duyệt", value: "approvedBy" },
        { label: "Ngày tạo đơn", value: "createDate" },
        { label: "Ngày duyệt", value: "approvedDate" },
        {
          label: "Xác thực",
          value: (row) => (row.is_approved === true ? "Đã duyệt" : "Từ chối"),
        },
        
      ],
      content: member,
    },
  ];

  let settings = {
    fileName: "Danh sách các đơn yêu cầu tạo thành viên",
  };

  xlsx(columns, settings);
}
