import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import EditUserForm from "../Feature/EditUserForm";
import axios from "axios";
import { axiosPrivate } from "../../../../api/axiosInstance";

async function getData(cancelToken,  pageSize, pageNo, setLoading) {
  try {
    const response = await axiosPrivate.get(`/api/account/all/role/user?pageSize=${pageSize}&pageNo=${pageNo}`, {
      cancelToken: cancelToken
    });

    if (response.status === 200) {
      console.log('Fetched data:', response.data.data);
      setLoading(false)
      return response.data.data;
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request cancelled:', error.message);

    } else {
      console.error("Error fetching data from API:", error);
      setLoading(false)

    }
  }

  return [];
}

const TableUsers = () => {
  const [data, setData] = useState([]); // State lưu dữ liệu trả về từ API, ban đầu là mảng rỗng
  const [selectedRow, setSelectedRow] = useState(null); // State lưu thông tin của row được chọn
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State quản lý việc mở dialog cho edit hoặc delete
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [list, setList] = useState(null);
  const [totalItems, setTotalItems] = useState(0);

  const onEdit = React.useCallback((row) => {
    // Implement edit logic here.
    setIsDialogOpen(true); // Mở dialog
    setSelectedRow(row);
  }, []);

  const onDelete = React.useCallback((row) => {
    // Implement delete logic here.
    alert(`Deleting user with ID: ${row.id}`);
  }, []);

const fetchData = async (cancelToken, pageSize, pageNo) => {
    try {
      const result = await getData(cancelToken, pageSize, pageNo, setLoading);
      setData(result?.list || []);
      setList(result);
      setTotalItems(result?.totalItem || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
     
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoading(true);
    fetchData(source.token, pageSize, pageNo);

    return () => {
      source.cancel('Component unmounted');
    };
  }, [pageSize, pageNo]);

  const totalPages = Math.ceil(totalItems / pageSize);

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
      <DataTable 
      columns={columns({ onEdit, onDelete })}
       data={data}
       loading={loading}
       list={list}
       pageSize={pageSize}
       pageNo={pageNo}
       setPageSize={setPageSize}
       setPageNo={setPageNo}
       totalPages={totalPages}
       />
    </div>
  );
};

export default TableUsers;
