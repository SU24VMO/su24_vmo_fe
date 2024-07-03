import xlsx from "json-as-xlsx";

export function exportToExcel({ post }) {
  let columns = [
    {
      sheet: "Persons",
      columns: [
        { label: "Id yêu cầu tạo bài viết", value: "create_post_request_id" },
        { label: "Id bài đăng", value: "post_id" },
        { label: "Tiêu đề", value: "title" },
        {
          label: "Tạo bởi",
          value: (row) =>
            row.create_by_user == null && row.create_by_om != null
              ? "Tạo bởi tổ chức"
              : "Tạo bởi người dùng",
        },
        {
          label: "Cover",
          value: "cover",
        },
        {
          label: "Ảnh",
          value: "image",
        },
        { label: "Nội dung", value: "content" },
        { label: "Ngày duyệt", value: "approved_date" },
        { label: "Ngày cập nhật", value: "update_date" },
        { label: "Ngày tạo", value: "create_date" },
        {
          label: "Xác thực",
          value: (row) => (row.is_approved === true ? "Đồng ý" : "Từ chối"),
        },
        // {
        //   label: "Date of Birth",
        //   value: (row) => new Date(row.date_of_birth).toLocaleDateString(),
        // },
      ],
      content: post,
    },
  ];

  let settings = {
    fileName: "Danh sách yêu cầu tạo hoạt động",
  };

  xlsx(columns, settings);
}
