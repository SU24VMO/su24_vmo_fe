import React from "react";

import { Helmet } from "react-helmet";
import TableVolunteers from "./TableVolunteers/TableVolunteers";

const ManageVolunteerPage = () => {
  return (
    <>
      <Helmet>
        <title>Quản lý tài khoản tình nguyện viên • VMO</title>
        <meta
          name="description"
          content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
        />
      </Helmet>
      <p className="font-bold text-2xl">Quản lý tài khoản tình nguyện viên</p>
      <TableVolunteers />
    </>
  );
};

export default ManageVolunteerPage;
