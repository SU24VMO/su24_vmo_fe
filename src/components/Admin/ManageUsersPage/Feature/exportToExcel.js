import xlsx from "json-as-xlsx";

export function exportToExcel({ user }) {
  let columns = [
    {
      sheet: "Persons",
      columns: [
        { label: "Tên người dùng", value: "username" },
        { label: "Email", value: "email" },
        { label: "Mật khẩu", value: "hashPassword" },
        { label: "Đang hoạt động", value: (row) => row.isActived === true ? "Có" : "Không", },
        { label: "Ngày tạo", value: "createdAt" },
        // { 
        //   label: "Date of Birth",
        //   value: (row) => new Date(row.date_of_birth).toLocaleDateString(),
        // },
      ],
      content: user,
    },
  ];

  let settings = {
    fileName: "Danh sách người dùng",
  };

  xlsx(columns, settings);
}