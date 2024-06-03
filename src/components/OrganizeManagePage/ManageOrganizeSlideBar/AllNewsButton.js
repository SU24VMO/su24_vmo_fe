import React from "react";
import { ScrollText } from "lucide-react";

const AllNewsButton = () => {
  return (
    <>
      <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <ScrollText className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        <span className="ms-3">All News</span>
      </div>
    </>
  );
};

export default AllNewsButton;
