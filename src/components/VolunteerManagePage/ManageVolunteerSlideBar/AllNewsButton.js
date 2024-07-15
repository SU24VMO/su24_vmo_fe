import React from "react";
import { ScrollText } from "lucide-react";

const AllNewsButton = () => {
  return (
    <>
      <div className="flex h-14 items-center  tablet:h-[40px]">
        <ScrollText className="w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        <span className="ms-3">Tất cả tin tức</span>
      </div>
    </>
  );
};

export default AllNewsButton;
