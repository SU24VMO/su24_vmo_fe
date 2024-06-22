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
import { GETALLTYPECAMPAIGN } from "../../../api/apiConstants";
const TypeOfCampaignSelect = ({ setFieldValue, selectTriggerId }) => {
  const [typesOfCampaign, setTypesOfCampaign] = useState([]);

  const getTypeOfCampaign = async () => {
    try {
      const response = await axiosPrivate.get(GETALLTYPECAMPAIGN);

      if (response.status === 200) {
        setTypesOfCampaign(response.data.data); 
      } else {
        console.error("Failed to fetch types of campaign.");
      }

    } catch (error) {
      console.error("Get type of campaign is error!");

    }
  }

  useEffect(() => {

    getTypeOfCampaign()
  }, [])
  const handleSelectTypeCampaign = (typeOfCampaign) => {
    setFieldValue("typeOfCampaign", typeOfCampaign);
  };
  return (
    <Select onValueChange={handleSelectTypeCampaign}>
      <SelectTrigger className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id={selectTriggerId}>
        <SelectValue placeholder="Loại chiến dịch" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Loại chiến dịch</SelectLabel>
          {typesOfCampaign.map((type) => (
            <SelectItem key={type.campaignTypeID} value={type.campaignTypeID}>
              {type.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TypeOfCampaignSelect;
