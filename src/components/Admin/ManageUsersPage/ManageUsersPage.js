import React from "react";
import TableUsers from "./TableUsers/TableUsers";
import { Helmet } from "react-helmet";

const ManageUsersPage = () => {
  return (
    <>
      <Helmet>
        <title>Quản lý người dùng • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <p className="font-bold text-2xl">Manage Users</p>
      <TableUsers />
    </>
  );
};

export default ManageUsersPage;
