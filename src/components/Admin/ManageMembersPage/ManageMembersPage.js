import React from "react";
import TableMembers from "./TableMembers/TableMembers";
import { Helmet } from "react-helmet";

const ManageMembersPage = () => {
  return (
    <>
      <Helmet>
        <title>Quản lí thành viên • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <p className="font-bold text-2xl">Quản lí thành viên</p>
      <TableMembers />
    </>
  );
};

export default ManageMembersPage;
