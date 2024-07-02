import React from "react";
import TableRequestManagers from "./TableRequestManagers/TableRequestManagers";
import { Helmet } from "react-helmet";

const ManageRequestManagersPage = () => {
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
      <TableRequestManagers></TableRequestManagers>
    </>
  );
};

export default ManageRequestManagersPage;
