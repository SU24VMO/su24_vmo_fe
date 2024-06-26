import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import EditStatusForm from "../Feature/EditStatusForm";
import axios from "axios";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { GETALLREQUESTCAMPAIGN } from "../../../../api/apiConstants";


// call api get 
export async function getData(cancelToken, pageSize, pageNo) {
  try {
    const response = await axiosPrivate.get(GETALLREQUESTCAMPAIGN + `?pageSize=${pageSize}&pageNo=${pageNo}`, {
      cancelToken: cancelToken
    });

    if (response.status === 200) {
      console.log('Fetched data:', response.data.data);
      return response.data.data;
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request cancelled:', error.message);
    } else {
      console.error("Error fetching data from API:", error);
    }
  }

  return [];
}

const TableRequestCampaigns = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [list, setList] = useState(null);
  const [totalItems, setTotalItems] = useState(0);

  const onEdit = React.useCallback((row) => {
    setIsDialogOpen(true);
    setSelectedRow(row);
  }, []);

  const onDelete = React.useCallback((row) => {
    alert(`Deleting request with ID: ${row.id}`);
  }, []);

  
  
  const fetchData = async (cancelToken, pageSize, pageNo) => {
    try {
      const result = await getData(cancelToken, pageSize, pageNo);
      setData(result?.list || []);
      setList(result);
      setTotalItems(result?.totalItem || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000); 
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

  const handleRefresh = () => {
    setLoading(true);
    const source = axios.CancelToken.source();
    fetchData(source.token, pageSize, pageNo);
  };


  return (
    <div className="flex flex-col">
      <div>
        <EditStatusForm
          isOpen={isDialogOpen}
          campaigns={selectedRow}
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

export default TableRequestCampaigns;
