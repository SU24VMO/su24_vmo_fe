import React, {useContext, useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import ManageOrganizeSlideBar from "../ManageOrganizeSlideBar/ManageOrganizeSlideBar";
import { Helmet } from "react-helmet";

import axios from "axios";
import { axiosPrivate } from "../../../api/axiosInstance";
import { GETALLACTIVITIESOM } from "../../../api/apiConstants";
import { AuthContext } from "../../../context/AuthContext";

async function getData(cancelToken, user,  pageSize, pageNo,sortConfig, activityTitle, setLoading) {
console.log("Activity truyền vào: " , activityTitle);
  try {

    const normalizeAndEncode = (str) => encodeURIComponent(str.normalize('NFC'));

    const encoded= normalizeAndEncode(activityTitle);
    const response = await axiosPrivate.get(GETALLACTIVITIESOM + `${user.organization_manager_id}?pageSize=${pageSize}&pageNo=${pageNo}&orderBy=${sortConfig.orderByDirection}&orderByProperty=${sortConfig.orderByProperty}&activityTitle=${encoded}`, {
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

const ManageOrganizeAllActivitiesTable = () => {
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
const [activityTitle, setActivityTitle] = useState("")


  const fetchData = async (cancelToken, user, pageSize, pageNo, activityTitle, sortConfig) => {
    try {
      const result = await getData(cancelToken,user, pageSize, pageNo, sortConfig, activityTitle, setLoading);
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
    fetchData(source.token, user, pageSize, pageNo,activityTitle, sortConfig);

    return () => {
      source.cancel('Component unmounted');
    };
  }, [pageSize, pageNo,activityTitle, sortConfig]);

  const totalPages = Math.ceil(totalItems / pageSize);


  return (
    <>
      <Helmet>
        <title>Quản lý các hoạt động • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
    <div className="w-3/4 mx-auto">
      <ManageOrganizeSlideBar></ManageOrganizeSlideBar>
      <DataTable 
       columns={columns({onSort})}
       setActivityTitle={setActivityTitle}
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

export default ManageOrganizeAllActivitiesTable;
