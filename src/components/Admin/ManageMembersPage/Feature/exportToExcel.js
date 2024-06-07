import xlsx from "json-as-xlsx";

export function exportToExcel({ member }) {
  let columns = [
    {
      sheet: "Persons",
      columns: [
        { label: "ID", value: "account_id" },
        { label: "Họ", value: "first_name" },
        { label: "Tên", value: "last_name" },
        { label: "Số điện thoại", value: "phone_number" },
        {
          label: "Giới tính",
          value: (row) =>
            row.gender === "Male"
              ? "Nam"
              : row.gender === "Female"
              ? "Nữ"
              : "Khác",
        },
        { label: "Sinh nhật", value: "birthday" },
        { label: "Link facebook", value: "facebook_url" },
        { label: "Link youtube", value: "youtube_url" },
        { label: "Link tiktok", value: "tiktok_url" },
        {
          label: "Xác thực",
          value: (row) => (row.is_verified === true ? "Có" : "Không"),
        },
        // {
        //   label: "Date of Birth",
        //   value: (row) => new Date(row.date_of_birth).toLocaleDateString(),
        // },
      ],
      content: member,
    },
  ];

  let settings = {
    fileName: "Bảng thành viên",
  };

  xlsx(columns, settings);
}
