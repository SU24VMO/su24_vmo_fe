import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

import { axiosPrivate } from "../../../api/axiosInstance";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
const SelectBanks = ({ setFieldValue, selectTriggerId }) => {
  const [banks, setBanks] = useState([]);

  const getBanks = async () => {
    try {
      const response = await axiosPrivate.get('https://api.vietqr.io/v2/banks');

      if (response.status === 200) {
        setBanks(response.data.data);
        console.log("du lieu", response.data.data);
        console.log("du lieu sau set: ", banks);
      } else {
        console.error("Failed to fetch banks.");
      }

    } catch (error) {
      console.error("Get banks is error!");

    }
  }

  useEffect(() => {

    getBanks()
  }, [])
  const handleSelectBanks = (nameOfBank) => {
    setFieldValue("nameOfBank", nameOfBank);
  };
  return (
    <Select onValueChange={handleSelectBanks}>
      <SelectTrigger className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id={selectTriggerId}>
        <SelectValue placeholder="Tên ngân hàng" />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          {banks.map((bank) => (
            <SelectItem className="w-full " key={bank.id} value={bank.name}>
              <div className="flex items-center ">
              <img class=" w-10 h-10 mobile:w-12 mobile:h-7 rounded-full mx-auto mobile:mx-0" src={bank?.logo} alt="Logo" />
              <span className="truncate">  {bank?.name}</span>
              </div>

             
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectBanks;
