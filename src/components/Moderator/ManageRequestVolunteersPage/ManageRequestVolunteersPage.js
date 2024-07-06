import React from "react";
import { Helmet } from "react-helmet";
import TableRequestVolunteers from "./TableRequestVolunteers/TableRequestVolunteers";


const ManageRequestVolunteersPage = () => {
  return (
    <>
      <Helmet>
        <title>Quản lý các "người dùng xác thực" • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <p className="font-bold text-2xl">Danh sách yêu cầu thành viên</p>
    <TableRequestVolunteers/>
    </>
  );
};

export default ManageRequestVolunteersPage;
