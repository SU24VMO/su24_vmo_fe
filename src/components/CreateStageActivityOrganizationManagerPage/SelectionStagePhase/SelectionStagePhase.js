import React, {useContext, useState, useEffect } from "react";
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
import { GETPROCESSINGOMTIERIIACTIVE} from "../../../api/apiConstants";
import { AuthContext } from "../../../context/AuthContext";
const SelectionStagePhase = ({ setFieldValue, selectTriggerId }) => {
  const [processingPhase, setProcessingPhase] = useState([]);
  const {user} = useContext(AuthContext)

  const getProcessingPhase = async () => {
    try {
      const response = await axiosPrivate.get(GETPROCESSINGOMTIERIIACTIVE + `/${user.organization_manager_id}`);

      if (response.status === 200) {
        setProcessingPhase(response.data.data.list); 
        console.log('====================================');
        console.log(response.data.data.list);
        console.log('====================================');
      } else {
        console.error("Failed to fetch processing phase.");
      }

    } catch (error) {
      console.error("Get processing phase is error!");

    }
  }

  useEffect(() => {

    getProcessingPhase()
  }, [])
  const handleSelectTypeCampaign = (processingPhase) => {
    setFieldValue("processingPhase", processingPhase);
  };
  return (
    <Select onValueChange={handleSelectTypeCampaign}>
      <SelectTrigger className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id={selectTriggerId}>
        <SelectValue placeholder="Giai đoạn để tạo hoạt động" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Giai đoạn</SelectLabel>
          {processingPhase.map((type) => (
            <SelectItem key={type.processingPhaseId} value={type.processingPhaseId}>
              {type.name} - {type.currentMoney + " VND"} - {type.campaign.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectionStagePhase;
