import React, { useContext, useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import ManageOrganizeSlideBar from "../ManageOrganizeSlideBar/ManageOrganizeSlideBar";
import { Helmet } from "react-helmet";
import axios from "axios";
import { axiosPrivate } from "../../../api/axiosInstance";
import { AuthContext } from "../../../context/AuthContext";
import { GETALLPHASE123BYOM } from "../../../api/apiConstants";
import ExtendDonatePhase from "./Feature/ExtendDonatePhase";

async function getData(cancelToken, user, pageSize, pageNo, sortConfig, campaignName, setLoading) {

  try {
    const normalizeAndEncode = (str) => encodeURIComponent(str.normalize('NFC'));

    const encoded = normalizeAndEncode(campaignName);
    const response = await axiosPrivate.get(GETALLPHASE123BYOM + `${user.organization_manager_id}/donate-phase/processing-status?pageSize=${pageSize}&pageNo=${pageNo}&orderBy=${sortConfig.orderByDirection}&orderByProperty=${sortConfig.orderByProperty}&campaignName=${encoded}`, {
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
      console.error("Error fetching data from API:", error);

    }
  }

  return [];
}

const ManageOrganizePhase1Table = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); // State lưu thông tin của row được chọn
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State quản lý việc mở dialog cho edit hoặc delete
  const { user } = useContext(AuthContext);
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

  const fetchData = async (cancelToken, user, pageSize, pageNo, campaignName, sortConfig) => {
    try {
      const result = await getData(cancelToken, user, pageSize, pageNo, sortConfig, campaignName, setLoading);
      setData(result?.list || []);
      setList(result);
      setTotalItems(result?.totalItem || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {

    }
  };

  const onExtend = React.useCallback((row) => {
    // Implement Extend logic here.
    setIsDialogOpen(true); // Mở dialog
    setSelectedRow(row);
  }, []);

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
    fetchData(source.token, user, pageSize, pageNo, campaignName, sortConfig);

    return () => {
      source.cancel('Component unmounted');
    };
  }, [pageSize, pageNo, campaignName, sortConfig]);

  const totalPages = Math.ceil(totalItems / pageSize);

  // Mỗi khi submit thành công refresh trang
  const handleRefresh = () => {
    setLoading(true);
    const source = axios.CancelToken.source();
    fetchData(source.token, user, pageSize, pageNo, campaignName, sortConfig);
  };

  return (
    <>
      <Helmet>
        <title>Quản lý giai đoạn ủng hộ • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <div className="w-3/4 mx-auto min-h-screen">
        <ManageOrganizeSlideBar></ManageOrganizeSlideBar>
        <div>
          <ExtendDonatePhase
            isOpen={isDialogOpen}
            row={selectedRow}
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
          columns={columns({ onSort, onExtend })}
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
    </>
  );
};

export default ManageOrganizePhase1Table;
