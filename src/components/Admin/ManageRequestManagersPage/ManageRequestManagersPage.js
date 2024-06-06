import React from "react";
import TableRequestManagers from "./TableRequestManagers/TableRequestManagers";

const ManageRequestManagersPage = () => {
  return (
    <>
      <p className="font-bold text-2xl">Manage Request Managers </p>
      <TableRequestManagers></TableRequestManagers>
    </>
  );
};

export default ManageRequestManagersPage;
