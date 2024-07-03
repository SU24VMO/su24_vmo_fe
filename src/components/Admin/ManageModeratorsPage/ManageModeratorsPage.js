import React from "react";
import { Helmet } from "react-helmet";
import TableModerators from "./TableModerators/TableModerators";

const ManageModeratorsPage = () => {
  return (
    <>
      <Helmet>
        <title>Quản lí nhân viên kiểm duyệt • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <p className="font-bold text-2xl">Quản lí nhân viên kiểm duyệt</p>
      <TableModerators></TableModerators>
    </>
  );
};

export default ManageModeratorsPage;
