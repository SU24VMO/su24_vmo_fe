import React, { useContext, useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import ManageOrganizeSlideBar from "../ManageOrganizeSlideBar/ManageOrganizeSlideBar";
import axios from "axios";
import { axiosPrivate } from "../../../api/axiosInstance";
import { GETALLORGANIZATIONBYID } from "../../../api/apiConstants";
import { AuthContext } from "../../../context/AuthContext";
import { Helmet } from "react-helmet";
async function getData(cancelToken, user,  pageSize, pageNo,sortConfig,organizationName, setLoading) {

  try {
    const normalizeAndEncode = (str) => encodeURIComponent(str.normalize('NFC'));

    const encoded= normalizeAndEncode(organizationName);
    const response = await axiosPrivate.get(GETALLORGANIZATIONBYID + `${user.organization_manager_id}?pageSize=${pageSize}&pageNo=${pageNo}&orderBy=${sortConfig.orderByDirection}&orderByProperty=${sortConfig.orderByProperty}&organizationName=${encoded}`, {
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
const ManageOrganizeOrganizationsTable = () => {
  const [data, setData] = useState([]);
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [list, setList] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [sortConfig, setSortConfig] = useState({
    orderByProperty: '',
    orderByDirection: 'asc',
  });
  const [organizationName, setOrganizationName] = useState("")

const fetchData = async (cancelToken, user, pageSize, pageNo,organizationName, sortConfig) => {
    try {
      const result = await getData(cancelToken,user, pageSize, pageNo, sortConfig,  organizationName, setLoading);
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
    fetchData(source.token, user, pageSize, pageNo,organizationName, sortConfig);

    return () => {
      source.cancel('Component unmounted');
    };
  }, [pageSize, pageNo,organizationName, sortConfig]);

  const totalPages = Math.ceil(totalItems / pageSize);


  return (
    <>
      <Helmet>
        <title>Quản lý các tổ chức • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
    <div className="w-3/4 mx-auto">
      <ManageOrganizeSlideBar></ManageOrganizeSlideBar>
      <DataTable
       columns={columns({onSort})}
       setOrganizationName={setOrganizationName}
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

export default ManageOrganizeOrganizationsTable;
