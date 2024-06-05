import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import EditOrganizationManagerForm from "../Feature/EditOrganizationManagersForm";
import avatar1 from "../../../../assets/avatars/01.png";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      "account_id": "2",
      "avatar": avatar1,
      "create_at": "5/6/2024",
      "phone_number": "0938466579",
      "username": "Van A",
      "email": "khoatddse1661228@fpt.edu.vn",
      "name": "FPT Software HCM",
      "is_verified": true,
      "is_block": false
    },
    {
      "account_id": "3",
      "avatar": avatar1,
      "create_at": "5/6/2024",
      "phone_number": "0949466570",
      "username": "Thi B",
      "email": "khoatddse1661228@fpt.edu.vn",
      "name": "FPT Software HCM",
      "is_verified": true,
      "is_block": false
    },
    {
      "account_id": "4",
      "avatar": avatar1,
      "create_at": "5/6/2024",
      "phone_number": "0959466571",
      "username": "Duc C",
      "email": "khoatddse1661228@fpt.edu.vn",
      "name": "FPT Software HN",
      "is_verified": false,
      "is_block": false
    },
    {
      "account_id": "5",
      "avatar": avatar1,
      "create_at": "5/6/2024",
      "phone_number": "0969466572",
      "username": "Minh D",
      "email": "khoatddse1661228@fpt.edu.vn",
      "name": "FPT Software HN",
      "is_verified": true,
      "is_block": true
    },
    {
      "account_id": "6",
      "avatar": avatar1,
      "create_at": "5/6/2024",
      "phone_number": "0979466573",
      "username": "Thi E",
      "email": "khoatddse1661228@fpt.edu.vn",
      "name": "FPT Software HCM",
      "is_verified": true,
      "is_block": false
    },
    {
      "account_id": "7",
      "avatar": avatar1,
      "create_at": "5/6/2024",
      "phone_number": "0989466574",
      "username": "Thi F",
      "email": "khoatddse1661228@fpt.edu.vn",
      "name": "FPT Software DN",
      "is_verified": false,
      "is_block": false
    },
    {
      "account_id": "8",
      "avatar": avatar1,
      "create_at": "5/6/2024",
      "phone_number": "0999466575",
      "username": "Quang G",
      "email": "khoatddse1661228@fpt.edu.vn",
      "name": "FPT Software DN",
      "is_verified": true,
      "is_block": false
    },
    {
      "account_id": "9",
      "avatar": avatar1,
      "create_at": "5/6/2024",
      "phone_number": "0910466576",
      "username": "Thi H",
      "email": "khoatddse1661228@fpt.edu.vn",
      "name": "FPT Software HN",
      "is_verified": true,
      "is_block": false
    },
    {
      "account_id": "10",
      "avatar": avatar1,
      "create_at": "5/6/2024",
      "phone_number": "0921466577",
      "username": "Duy I",
      "email": "khoatddse1661228@fpt.edu.vn",
      "name": "FPT Software HCM",
      "is_verified": false,
      "is_block": true
    },
    {
      "account_id": "11",
      "avatar": avatar1,
      "create_at": "5/6/2024",
      "phone_number": "0932466578",
      "username": "Khoa J",
      "email": "khoatddse1661228@fpt.edu.vn",
      "name": "FPT Software HCM",
      "is_verified": true,
      "is_block": false
    },
    {
      "account_id": "12",
      "avatar": avatar1,
      "create_at": "5/6/2024",
      "phone_number": "0943466579",
      "username": "Thi K",
      "email": "khoatddse1661228@fpt.edu.vn",
      "name": "FPT Software HN",
      "is_verified": true,
      "is_block": false
    },
    {
      "account_id": "13",
      "avatar": avatar1,
      "create_at": "5/6/2024",
      "phone_number": "0954466580",
      "username": "Lam L",
      "email": "khoatddse1661228@fpt.edu.vn",
      "name": "FPT Software HN",
      "is_verified": true,
      "is_block": false
    },
    {
      "account_id": "14",
      "avatar": avatar1,
      "create_at": "5/6/2024",
      "phone_number": "0965466581",
      "username": "Thi M",
      "email": "khoatddse1661228@fpt.edu.vn",
      "name": "FPT Software DN",
      "is_verified": false,
      "is_block": false
    },
    {
      "account_id": "15",
      "avatar": avatar1,
      "create_at": "5/6/2024",
      "phone_number": "0976466582",
      "username": "Nhat N",
      "email": "khoatddse1661228@fpt.edu.vn",
      "name": "FPT Software DN",
      "is_verified": true,
      "is_block": false
    },

    // ...
  ];
}

const TableOrganizationManagers = () => {
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
        <EditOrganizationManagerForm
          isOpen={isDialogOpen}
          organizationManager={selectedRow}
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

export default TableOrganizationManagers;
