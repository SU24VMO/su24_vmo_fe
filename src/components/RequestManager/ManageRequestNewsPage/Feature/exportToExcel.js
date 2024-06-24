import xlsx from "json-as-xlsx";

export function exportToExcel({ posts }) {
  let columns = [
    {
      sheet: "Request News",
      columns: [
        { label: "Tên bài viết", value: "post.title" },
        { label: "Thành viên", value: "user.lastName" },
        { label: "Quản lí tổ chức", value: "organizationManager.lastName" },
        
        {
          label: "Ngày tạo",
          value: "createDate",
        },
        {
          label: "Ngày duyệt",
          value: "approvedDate",
        },
        { label: "Người duyệt", value: "requestManager.lastName" },
        {
          label: "Xác thực",
          value: (row) => (row.isApproved === true ? "Đồng ý" : "Từ chối"),
        },
    
      ],
      content: posts,
    },
  ];

  let settings = {
    fileName: "Danh sách yêu cầu tạo bài viết",
  };

  xlsx(columns, settings);
}
