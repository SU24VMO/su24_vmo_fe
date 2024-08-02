import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";

import axios from "axios";
import { axiosPrivate } from "../../../../api/axiosInstance";
import EditBankingCampaignForm from "../../ManageBankingCampaignPage/Feature/EditBankingCampaignForm";

async function getData(cancelToken,  pageSize, pageNo,sortConfig, campaignName, setLoading) {
  try {
    const normalizeAndEncode = (str) => encodeURIComponent(str.normalize('NFC'));

    const encoded= normalizeAndEncode(campaignName);
    const response = await axiosPrivate.get(`/api/transaction/all/statement/receive-transaction?pageSize=${pageSize}&pageNo=${pageNo}&orderBy=${sortConfig.orderByDirection}&orderByProperty=${sortConfig.orderByProperty}&campaignName=${encoded}`, {
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
      setLoading(false)

    }
  }

  return [];
}

const TableTransactionUserCampaignPage = () => {
  const [data, setData] = useState([]); // State lưu dữ liệu trả về từ API, ban đầu là mảng rỗng
  const [selectedRow, setSelectedRow] = useState(null); // State lưu thông tin của row được chọn
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State quản lý việc mở dialog cho edit hoặc delete
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [list, setList] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [sortConfig, setSortConfig] = useState({
    orderByProperty: '',
    orderByDirection: 'asc',
  });

const [campaignName, setCampaignName] = useState("")


  const onEdit = React.useCallback((row) => {
    // Implement edit logic here.
    setIsDialogOpen(true); // Mở dialog
    setSelectedRow(row);
  }, []);

  const onDelete = React.useCallback((row) => {
    // Implement delete logic here.
    alert(`Deleting user with ID: ${row.account_id}`);
  }, []);

  const fetchData = async (cancelToken, pageSize, pageNo, campaignName, sortConfig) => {
    try {
      const result = await getData(cancelToken, pageSize, pageNo,sortConfig, campaignName,  setLoading);
      setData(result?.list || []);
      setList(result);
      setTotalItems(result?.totalItem || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
     
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
    fetchData(source.token, pageSize, pageNo, campaignName, sortConfig);

    return () => {
      source.cancel('Component unmounted');
    };
  }, [pageSize, pageNo, campaignName,  sortConfig]);

  const totalPages = Math.ceil(totalItems / pageSize);

  const handleRefresh = () => {
    setLoading(true);
    const source = axios.CancelToken.source();
    fetchData(source.token, pageSize, pageNo, campaignName, sortConfig);
  };
  return (
    <div className="flex flex-col">
      <div>
        <EditBankingCampaignForm
          isOpen={isDialogOpen}
          banking={selectedRow}
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
      setCampaignName={setCampaignName}
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

export default TableTransactionUserCampaignPage;
