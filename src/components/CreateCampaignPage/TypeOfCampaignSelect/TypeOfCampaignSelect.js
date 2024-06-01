import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const TypeOfCampaignSelect = ({ setFieldValue, selectTriggerId }) => {
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
          <SelectItem value="0">Ung thư</SelectItem>
          <SelectItem value="1">Xóa đói</SelectItem>
          <SelectItem value="2">Bệnh tật</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TypeOfCampaignSelect;
