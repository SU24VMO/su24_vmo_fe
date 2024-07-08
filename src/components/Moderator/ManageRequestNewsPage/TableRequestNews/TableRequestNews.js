import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import EditStatusForm from "../Feature/EditStatusForm";

import axios from "axios";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { GETALLREQUESTNEWS } from "../../../../api/apiConstants";

async function getData(cancelToken, pageSize, pageNo, sortConfig,postTitle, setLoading) {
  try {
    const response = await axiosPrivate.get(GETALLREQUESTNEWS + `?pageSize=${pageSize}&pageNo=${pageNo}&orderBy=${sortConfig.orderByDirection}&orderByProperty=${sortConfig.orderByProperty}&postTitle=${postTitle}`, {
      cancelToken: cancelToken
    });

    if (response.status === 200) {
      setLoading(false);
      return response.data.data;
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request cancelled:', error.message);
    } else {
      setLoading(false);
      console.error("Lỗi khi lấy dữ liệu từ API:", error);
    }
  }

  return [];
}

const TableRequestNews = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    orderByProperty: '',
    orderByDirection: 'asc',
  });

  const [list, setList] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [postTitle, setPostTitle] = useState("")  

  const onEdit = React.useCallback((row) => {
    setIsDialogOpen(true);
    setSelectedRow(row);
  }, []);

  const onDelete = React.useCallback((row) => {
    alert(`Deleting user with ID: ${row.id}`);
  }, []);

  const fetchData = async (cancelToken, pageSize, pageNo,postTitle, sortConfig) => {
    try {
      const result = await getData(cancelToken, pageSize, pageNo, sortConfig, postTitle, setLoading);
      console.log(result?.list);
      setData(result?.list || []);
      setList(result);
      setTotalItems(result?.totalItem || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onSort = (property) => {
    setSortConfig((prevConfig) => ({
      orderByProperty: property,
      orderByDirection:
        prevConfig.orderByProperty === property
          ? (prevConfig.orderByDirection === 'asc' ? 'desc' : 'asc')
          : 'asc',
    }));
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoading(true);
    fetchData(source.token, pageSize, pageNo, postTitle, sortConfig);

    return () => {
      source.cancel('Component unmounted');
    };
  }, [pageSize, pageNo, postTitle, sortConfig]);

  const totalPages = Math.ceil(totalItems / pageSize);

  const handleRefresh = () => {
    setLoading(true);
    const source = axios.CancelToken.source();
    fetchData(source.token, pageSize, pageNo, postTitle, sortConfig);
  };

  return (
    <div className="flex flex-col">
      <div>
        <EditStatusForm
          isOpen={isDialogOpen}
          posts={selectedRow}
          onOpenChange={(value) => {
            setIsDialogOpen(value);
            if (!value) {
              setSelectedRow(null);
            }
          }}
          onSubmitSuccess={handleRefresh}
        />
      </div>
      <DataTable 
        columns={columns({ onEdit, onDelete, onSort })}
      setPostTitle={setPostTitle}

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

export default TableRequestNews;
