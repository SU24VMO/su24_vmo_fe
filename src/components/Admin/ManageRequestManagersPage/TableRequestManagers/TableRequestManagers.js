import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import EditRequestManagerForm from "../Feature/EditRequestManagersForm";
import avatar1 from "../../../../assets/avatars/01.png";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      "account_id": "2",
      "phone_number": "0938466579",
      "first_name": "Van",
      "last_name": "A", 
      "is_active": true,
      "is_block": false
    },
    {
      "account_id": "3",
      "phone_number": "0949466570",
      "first_name": "Thi",
      "last_name": "B", 
      "is_active": true,
      "is_block": false
    },
    {
      "account_id": "4",
      "phone_number": "0959466571",
      "first_name": "Duc",
      "last_name": "C", 
      "is_active": true,
      "is_block": false
    },
    {
      "account_id": "5",
      "phone_number": "0969466572",
      "first_name": "Minh",
      "last_name": "D", 
      "is_active": true,
      "is_block": false
    },
    {
      "account_id": "6",
      "phone_number": "0979466573",
      "first_name": "Thi",
      "last_name": "E", 
      "is_active": true,
      "is_block": false
    },
    {
      "account_id": "7",
      "phone_number": "0989466574",
      "first_name": "Thi",
      "last_name": "F", 
      "is_active": true,
      "is_block": false
    },
    {
      "account_id": "8",
      "phone_number": "0999466575",
      "first_name": "Quang",
      "last_name": "G", 
      "is_active": true,
      "is_block": false
    },
    {
      "account_id": "9",
      "phone_number": "0910466576",
      "first_name": "Thi",
      "last_name": "H", 
      "is_active": true,
      "is_block": false
    },
    {
      "account_id": "10",
      "phone_number": "0921466577",
      "first_name": "Duy",
      "last_name": "I", 
      "is_active": false,
      "is_block": true
    },
    {
      "account_id": "11",
      "phone_number": "0932466578",
      "first_name": "Khoa",
      "last_name": "J", 
      "is_active": true,
      "is_block": false
    },
    {
      "account_id": "12",
      "phone_number": "0943466579",
      "first_name": "Thi",
      "last_name": "K", 
      "is_active": true,
      "is_block": false
    },
    {
      "account_id": "13",
      "phone_number": "0954466580",
      "first_name": "Lam",
      "last_name": "L", 
      "is_active": true,
      "is_block": false
    },
    {
      "account_id": "14",
      "phone_number": "0965466581",
      "first_name": "Thi",
      "last_name": "M", 
      "is_active": true,
      "is_block": false
    },
    {
      "account_id": "15",
      "phone_number": "0976466582",
      "first_name": "Nhat",
      "last_name": "N", 
      "is_active": true,
      "is_block": false
    },

    // ...
  ];
}

const TableRequestManagers = () => {
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
    alert(`Deleting user with ID: ${row.account_id}`);
  }, []);

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  return (
    <div className="flex flex-col">
      <div>
        <EditRequestManagerForm
          isOpen={isDialogOpen}
          requestManager={selectedRow}
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

export default TableRequestManagers;
