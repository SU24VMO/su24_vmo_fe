import React from "react";
import TableRequestNews from "./TableRequestNews/TableRequestNews";
import { Helmet } from "react-helmet";

const ManageRequestNewsPage = () => {
  return (
    <>
     <Helmet>
        <title>Quản lý các "yêu cầu tin tức" • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <p className="font-bold text-2xl">Danh sách yêu cầu tin tức</p>
      <TableRequestNews />
    </>
  );
};

export default ManageRequestNewsPage;