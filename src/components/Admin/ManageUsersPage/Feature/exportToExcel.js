import xlsx from "json-as-xlsx";

export function exportToExcel({ user }) {
  let columns = [
    {
      sheet: "Persons",
      columns: [
        { label: "ID", value: "id" },
        { label: "Tên người dùng", value: "userName" },
        { label: "Email", value: "userEmail" },
        { label: "Mật khẩu", value: "userPassword" },
        { label: "Đang hoạt động", value: (row) => row.isActive === true ? "Có" : "Không", },
        { label: "Dừng hoạt động", value: (row) => row.isBlocked === true ? "Có" : "Không", },
        { label: "Ngày tạo", value: "createAt" },
        // { 
        //   label: "Date of Birth",
        //   value: (row) => new Date(row.date_of_birth).toLocaleDateString(),
        // },
      ],
      content: user,
    },
  ];

  let settings = {
    fileName: "Bảng người dùng",
  };

  xlsx(columns, settings);
}