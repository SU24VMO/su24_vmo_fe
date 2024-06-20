import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import EditOrganizationManagerForm from "../Feature/EditOrganizationManagersForm";
import axios from "axios";
import { axiosPrivate } from "../../../../api/axiosInstance";

async function getData(cancelToken) {
  try {
    const response = await axiosPrivate.get('/api/account/all/role/organization-manager?pageSize=15&pageNo=1', {
      cancelToken: cancelToken
    });

    if (response.status === 200) {
      console.log('====================================');
      console.log(response.data.data.list);
      console.log('====================================');
      return response.data.data.list;
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request cancelled:', error.message);
    } else {
      console.error("Lỗi khi lấy dữ liệu từ API:", error);
    }
  }

  return [];
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
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      const result = await getData(source.token);
      setData(result);
    };

    fetchData();

    // Cleanup function to cancel the request on component unmount
    return () => {
      source.cancel('Component unmounted');
    };
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
