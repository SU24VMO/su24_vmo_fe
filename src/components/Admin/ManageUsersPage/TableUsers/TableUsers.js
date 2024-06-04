import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import avatar1 from "../../../../assets/avatars/01.png";
import avatar2 from "../../../../assets/avatars/02.png";
import avatar3 from "../../../../assets/avatars/03.png";
import avatar4 from "../../../../assets/avatars/04.png";
import avatar5 from "../../../../assets/avatars/05.png";
import EditUserForm from "../Feature/EditUserForm";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      userAvatar: avatar4,
      userName: "phatnguyen2711",
      userEmail: "phatnguyen2711@gmail.com",
      userPassword: "Abc123@",
      isActive: true,
      isBlocked: false,
      createAt: "21:29:56 - 19/05/2024",
    },
    {
      id: "2",
      userAvatar: avatar2,
      userName: "dungnvse160223",
      userEmail: "dungnvse160223@fpt.edu.vn",
      userPassword: "Abc123@",
      isActive: false,
      isBlocked: true,
      createAt: "20:06:00 - 19/05/2024",
    },
    {
      id: "3",
      userAvatar: avatar1,
      userName: "truongcn",
      userEmail: "truongcnse161225@fpt.edu.vn",
      userPassword: "Abc123@",
      isActive: true,
      isBlocked: false,
      createAt: "19:53:22 - 19/05/2024",
    },
    {
      id: "4",
      userAvatar: avatar3,
      userName: "khoatdd",
      userEmail: "khoatddse161228@fpt.edu.vn",
      userPassword: "Abc123@",
      isActive: true,
      isBlocked: false,
      createAt: "17:47:26 - 19/05/2024",
    },
    {
      id: "5",
      userAvatar: avatar5,
      userName: "duongvtt",
      userEmail: "duongvtt9@fe.edu.vn",
      userPassword: "Abc123@",
      isActive: true,
      isBlocked: false,
      createAt: "16:06:30 - 19/05/2024",
    },
    {
      id: "6",
      userAvatar: "https://i.pravatar.cc/150?img=1",
      userName: "hotruongphuongthao",
      userEmail: "hotruongphuongthao@gmail.com",
      userPassword: "Abc123@",
      isActive: true,
      isBlocked: false,
      createAt: "07:10:59 - 20/05/2024",
    },
    {
      id: "7",
      userAvatar: "https://i.pravatar.cc/150?img=1",
      userName: "hotruongphuongthao2",
      userEmail: "hotruongphuongthao2@gmail.com",
      userPassword: "Abc123@",
      isActive: true,
      isBlocked: false,
      createAt: "07:10:59 - 20/05/2024",
    },
    {
      id: "8",
      userAvatar: "https://i.pravatar.cc/150?img=1",
      userName: "nguyenthiphuongthao",
      userEmail: "nguyenthiphuongthao@gmail.com",
      userPassword: "Abc123@",
      isActive: true,
      isBlocked: false,
      createAt: "07:01:41 - 20/05/2024",
    },
    {
      id: "9",
      userAvatar: "https://i.pravatar.cc/150?img=1",
      userName: "nguyenthilanhuong",
      userEmail: "nguyenthilanhuong@gmail.com",
      userPassword: "Abc123@",
      isActive: true,
      isBlocked: false,
      createAt: "23:59:16 - 19/05/2024",
    },
    {
      id: "10",
      userAvatar: "https://i.pravatar.cc/150?img=1",
      userName: "hungnv",
      userEmail: "hungnv@gmail.com",
      userPassword: "Abc123@",
      isActive: true,
      isBlocked: false,
      createAt: "22:08:57 - 19/05/2024",
    },
    {
      id: "11",
      userAvatar: "https://i.pravatar.cc/150?img=1",
      userName: "phucnv",
      userEmail: "phucnv@gmail.com",
      userPassword: "Abc123@",
      isActive: true,
      isBlocked: false,
      createAt: "11:54:37 - 20/05/2024",
    },
    {
      id: "12",
      userAvatar: "https://i.pravatar.cc/150?img=1",
      userName: "linhct",
      userEmail: "linhct@gmail.com",
      userPassword: "Abc123@",
      isActive: true,
      isBlocked: false,
      createAt: "10:55:29 - 20/05/2024",
    },
    {
      id: "13",
      userAvatar: "https://i.pravatar.cc/150?img=1",
      userName: "hanhnh",
      userEmail: "hanhnh@gmail.com",
      userPassword: "Abc123@",
      isActive: true,
      isBlocked: false,
      createAt: "09:24:05 - 20/05/2024",
    },
    {
      id: "14",
      userAvatar: "https://i.pravatar.cc/150?img=1",
      userName: "lent",
      userEmail: "lent@gmail.com",
      userPassword: "Abc123@",
      isActive: true,
      isBlocked: false,
      createAt: "08:55:05 - 20/05/2024",
    },
    {
      id: "15",
      userAvatar: "https://i.pravatar.cc/150?img=1",
      userName: "lept",
      userEmail: "lept@gmail.com",
      userPassword: "Abc123@",
      isActive: true,
      isBlocked: false,
      createAt: "08:44:54 - 20/05/2024",
    },

    // ...
  ];
}

const TableUsers = () => {
  const [data, setData] = useState([]); // State lưu dữ liệu trả về từ API, ban đầu là mảng rỗng
  const [selectedRow, setSelectedRow] = useState(null); // State lưu thông tin của row được chọn
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State quản lý việc mở dialog cho edit hoặc delete

  const onEdit = React.useCallback((row) => {
    // Implement edit logic here.
    setIsDialogOpen(true); // Mở dialog
    setSelectedRow(row);
  }, []);

  const onDelete = React.useCallback((row) => {
    // Implement delete logic here.
    alert(`Deleting user with ID: ${row.id}`);
  }, []);

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  return (
    <div className="flex flex-col">
      <div>
        <EditUserForm
          isOpen={isDialogOpen}
          user={selectedRow}
          onOpenChange={(value) => {
            setIsDialogOpen(value);
            if (!value) {
              setSelectedRow(null);
            }
          }}
        />
      </div>
      <DataTable columns={columns({ onEdit, onDelete })} data={data} />
    </div>
  );
};

export default TableUsers;
