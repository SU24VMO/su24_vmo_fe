import React from "react";
import { Building2 } from "lucide-react";

const AllOrganizationsButton = () => {
  return (
    <>
      <div className="flex h-14 items-center  tablet:h-[40px]">
        <Building2 className="w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        <span className="ms-3">Tất cả tổ chức</span>
      </div>
    </>
  );
};

export default AllOrganizationsButton;
