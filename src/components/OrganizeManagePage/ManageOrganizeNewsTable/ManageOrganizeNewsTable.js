import React, { useContext, useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import ManageOrganizeSlideBar from "../ManageOrganizeSlideBar/ManageOrganizeSlideBar";

import axios from "axios";
import { axiosPrivate } from "../../../api/axiosInstance";
import { AuthContext } from "../../../context/AuthContext";
import { GETALLNEWSBYOMID } from "../../../api/apiConstants";

async function getData(cancelToken, user,  pageSize, pageNo) {

  try {
    const response = await axiosPrivate.get(GETALLNEWSBYOMID + `${user.organization_manager_id}?pageSize=10&pageNo=1`, {
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

const ManageOrganizeNewsTable = () => {
  const [data, setData] = useState([]);
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [list, setList] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const fetchData = async (cancelToken, user, pageSize, pageNo) => {
    try {
      const result = await getData(cancelToken,user, pageSize, pageNo);
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
    fetchData(source.token, user, pageSize, pageNo);

    return () => {
      source.cancel('Component unmounted');
    };
  }, [pageSize, pageNo]);

  const totalPages = Math.ceil(totalItems / pageSize);
  return (
    <div className="w-3/4 mx-auto">
      <ManageOrganizeSlideBar></ManageOrganizeSlideBar>
      <DataTable 
      columns={columns} 
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

export default ManageOrganizeNewsTable;
