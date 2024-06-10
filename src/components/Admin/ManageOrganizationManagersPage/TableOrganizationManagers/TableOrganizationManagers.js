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
      "birthday": "5/6/2024",
      "phone_number": "0938466579",
      "first_name": "Van",
      "last_name": "A", 
      "email": "khoatddse1661228@fpt.edu.vn",
      "gender": "Male",
      // "name": "FPT Software HCM",
      "is_verified": true,
    },
    {
      "account_id": "3",
      "birthday": "5/6/2024",
      "phone_number": "0949466570",
      "first_name": "Thi",
      "last_name": "B", 
      "email": "khoatddse1661228@fpt.edu.vn",
      "gender": "Female",
      // "name": "FPT Software HCM",
      "is_verified": true,
    },
    {
      "account_id": "4",
      "birthday": "5/6/2024",
      "phone_number": "0959466571",
      "first_name": "Duc",
      "last_name": "C", 
      "email": "khoatddse1661228@fpt.edu.vn",
      "gender": "Male",
      // "name": "FPT Software HN",
      "is_verified": false,
    },
    {
      "account_id": "5",
      "birthday": "5/6/2024",
      "phone_number": "0969466572",
      "first_name": "Minh",
      "last_name": "D", 
      "email": "khoatddse1661228@fpt.edu.vn",
      "gender": "Male",
      // "name": "FPT Software HN",
      "is_verified": true,
    },
    {
      "account_id": "6",
      "birthday": "5/6/2024",
      "phone_number": "0979466573",
      "first_name": "Thi",
      "last_name": "E", 
      "email": "khoatddse1661228@fpt.edu.vn",
      "gender": "Female",
      // "name": "FPT Software HCM",
      "is_verified": true,
    },
    {
      "account_id": "7",
      "birthday": "5/6/2024",
      "phone_number": "0989466574",
      "first_name": "Thi",
      "last_name": "F", 
      "email": "khoatddse1661228@fpt.edu.vn",
      "gender": "Female",
      // "name": "FPT Software DN",
      "is_verified": false,
    },
    {
      "account_id": "8",
      "birthday": "5/6/2024",
      "phone_number": "0999466575",
      "first_name": "Quang",
      "last_name": "G", 
      "email": "khoatddse1661228@fpt.edu.vn",
      "gender": "Male",
      // "name": "FPT Software DN",
      "is_verified": true,
    },
    {
      "account_id": "9",
      "birthday": "5/6/2024",
      "phone_number": "0910466576",
      "first_name": "Thi",
      "last_name": "H", 
      "email": "khoatddse1661228@fpt.edu.vn",
      "gender": "Female",
      // "name": "FPT Software HN",
      "is_verified": true,
    },
    {
      "account_id": "10",
      "birthday": "5/6/2024",
      "phone_number": "0921466577",
      "first_name": "Duy",
      "last_name": "I", 
      "email": "khoatddse1661228@fpt.edu.vn",
      "gender": "Male",
      // "name": "FPT Software HCM",
      "is_verified": false,
    },
    {
      "account_id": "11",
      "birthday": "5/6/2024",
      "phone_number": "0932466578",
      "first_name": "Khoa",
      "last_name": "J", 
      "email": "khoatddse1661228@fpt.edu.vn",
      "gender": "Male",
      // "name": "FPT Software HCM",
      "is_verified": true,
    },
    {
      "account_id": "12",
      "birthday": "5/6/2024",
      "phone_number": "0943466579",
      "first_name": "Thi",
      "last_name": "K", 
      "email": "khoatddse1661228@fpt.edu.vn",
      "gender": "Female",
      // "name": "FPT Software HN",
      "is_verified": true,
    },
    {
      "account_id": "13",
      "birthday": "5/6/2024",
      "phone_number": "0954466580",
      "first_name": "Lam",
      "last_name": "L", 
      "email": "khoatddse1661228@fpt.edu.vn",
      "gender": "Male",
      // "name": "FPT Software HN",
      "is_verified": true,
    },
    {
      "account_id": "14",
      "birthday": "5/6/2024",
      "phone_number": "0965466581",
      "first_name": "Thi",
      "last_name": "M", 
      "email": "khoatddse1661228@fpt.edu.vn",
      "gender": "Female",
      // "name": "FPT Software DN",
      "is_verified": false,
    },
    {
      "account_id": "15",
      "birthday": "5/6/2024",
      "phone_number": "0976466582",
      "first_name": "Nhat",
      "last_name": "N", 
      "email": "khoatddse1661228@fpt.edu.vn",
      "gender": "Male",
      // "name": "FPT Software DN",
      "is_verified": true,
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
    alert(`Deleting user with ID: ${row.account_id}`);
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
