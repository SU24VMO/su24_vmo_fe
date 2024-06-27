import React, { useContext, useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import ManageOrganizeSlideBar from "../ManageOrganizeSlideBar/ManageOrganizeSlideBar";
import axios from "axios";
import { axiosPrivate } from "../../../api/axiosInstance";
import { GETALLORGANIZATIONBYID } from "../../../api/apiConstants";
import { AuthContext } from "../../../context/AuthContext";
import { Helmet } from "react-helmet";
async function getData(cancelToken, user) {

  try {
    const response = await axiosPrivate.get(GETALLORGANIZATIONBYID + `${user.organization_manager_id}?pageSize=10&pageNo=1`, {
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
const ManageOrganizeOrganizationsTable = () => {
  const [data, setData] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      const result = await getData(source.token, user);
      setData(result);
    };

    fetchData();

    // Cleanup function to cancel the request on component unmount
    return () => {
      source.cancel('Component unmounted');
    };
  }, []);


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
      <DataTable columns={columns} data={data} />
    </div>
    </>
  );
};

export default ManageOrganizeOrganizationsTable;
