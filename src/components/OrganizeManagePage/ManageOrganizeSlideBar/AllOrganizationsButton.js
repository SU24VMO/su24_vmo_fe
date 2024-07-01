import React from "react";
import { Building2 } from "lucide-react";

const AllOrganizationsButton = () => {
  return (
    <>
      <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <Building2 className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        <span className="ms-3">Tất cả tổ chức</span>
      </div>
    </>
  );
};

export default AllOrganizationsButton;
