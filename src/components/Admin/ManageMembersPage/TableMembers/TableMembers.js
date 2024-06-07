import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import EditMemberForm from "../Feature/EditMemberForm";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      account_id: "1",
      phone_number: "0905392002",
      first_name: "Nguyen",
      last_name: "Van Dung",
      gender: "Male",
      birthday: "2002/09/30",
      facebook_url: "https://www.facebook.com/nvdungd/",
      youtube_url: "",
      tiktok_url: "",
      is_verified: true,
    },
    {
      account_id: "2",
      phone_number: "0812400096",
      first_name: "Nguyen",
      last_name: "Tien Phat",
      gender: "Male",
      birthday: "2002/11/27",
      facebook_url: "https://www.facebook.com/leven.aized",
      youtube_url: "",
      tiktok_url: "",
      is_verified: true,
    },
    {
      account_id: "3",
      phone_number: "0912345671",
      first_name: "Chau",
      last_name: "Nhat Truong",
      gender: "Male",
      birthday: "2000/09/25",
      facebook_url: "https://www.facebook.com/chaunhattruong4747",
      youtube_url: "",
      tiktok_url: "",
      is_verified: true,
    },
    {
      account_id: "4",
      phone_number: "0929476917",
      first_name: "Truong Dinh",
      last_name: "Dang Khoa",
      gender: "Male",
      birthday: "2000/08/11",
      facebook_url: "https://www.facebook.com/bocchi.desuuu",
      youtube_url: "",
      tiktok_url: "",
      is_verified: true,
    },
    {
      account_id: "5",
      phone_number: "0986550927",
      first_name: "Vu Thi",
      last_name: "Thuy Duong",
      gender: "Female",
      birthday: "1995/12/20",
      facebook_url: "https://www.facebook.com/duongvtt",
      youtube_url: "",
      tiktok_url: "",
      is_verified: true,
    },
    {
      account_id: "6",
      phone_number: "0912345671",
      first_name: "Ho Truong",
      last_name: "Phuong Thao",
      gender: "Female",
      birthday: "1995/12/20",
      facebook_url: "",
      youtube_url: "",
      tiktok_url: "",
      is_verified: true,
    },
    {
      account_id: "7",
      phone_number: "0912345672",
      first_name: "Ho Truong",
      last_name: "Phuong Anh",
      gender: "Female",
      birthday: "1995/12/20",
      facebook_url: "",
      youtube_url: "",
      tiktok_url: "",
      is_verified: true,
    },
    {
      account_id: "8",
      phone_number: "0912345673",
      first_name: "Nguyen Thi",
      last_name: "Phuong Thao",
      gender: "Female",
      birthday: "1995/12/20",
      facebook_url: "",
      youtube_url: "",
      tiktok_url: "",
      is_verified: true,
    },
    {
      account_id: "9",
      phone_number: "0978587555",
      first_name: "Nguyen Thi",
      last_name: "Lan Huong",
      gender: "Female",
      birthday: "2002/12/11",
      facebook_url: "https://www.facebook.com/Lhuong1211",
      youtube_url: "",
      tiktok_url: "",
      is_verified: true,
    },
    {
      account_id: "10",
      phone_number: "0912345674",
      first_name: "Nguyen",
      last_name: "Van Hung",
      gender: "Male",
      birthday: "1998/02/11",
      facebook_url: "",
      youtube_url: "",
      tiktok_url: "",
      is_verified: true,
    },
    {
      account_id: "11",
      phone_number: "0912345675",
      first_name: "Tran",
      last_name: "Van An",
      gender: "Male",
      birthday: "1990/03/12",
      facebook_url: "",
      youtube_url: "",
      tiktok_url: "",
      is_verified: true,
    },
    {
      account_id: "12",
      phone_number: "0912345676",
      first_name: "Le",
      last_name: "Thi B",
      gender: "Female",
      birthday: "1992/04/13",
      facebook_url: "",
      youtube_url: "",
      tiktok_url: "",
      is_verified: false,
    },
    {
      account_id: "13",
      phone_number: "0912345677",
      first_name: "Pham",
      last_name: "Van C",
      gender: "Male",
      birthday: "1994/05/14",
      facebook_url: "",
      youtube_url: "",
      tiktok_url: "",
      is_verified: true,
    },
    {
      account_id: "14",
      phone_number: "0912345678",
      first_name: "Nguyen",
      last_name: "Thi D",
      gender: "Female",
      birthday: "1996/06/15",
      facebook_url: "",
      youtube_url: "",
      tiktok_url: "",
      is_verified: false,
    },
    {
      account_id: "15",
      phone_number: "0912345679",
      first_name: "Nguyen",
      last_name: "Thi E",
      gender: "Female",
      birthday: "1996/06/15",
      facebook_url: "",
      youtube_url: "",
      tiktok_url: "",
      is_verified: false,
    },
    // ...
  ];
}

const TableMembers = () => {
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
        <EditMemberForm
          isOpen={isDialogOpen}
          member={selectedRow}
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

export default TableMembers;
