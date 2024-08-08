import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const SelectCampaignDisbursement = ({ setFieldValue, selectTriggerId }) => {
  const selectedItemDisbursement = [
    { key: '1', value: '1', label: 'Chiến dịch giải ngân toàn phần' },
    { key: '2', value: '2', label: 'Chiến dịch giải ngân từng phần' },
]


 
  const handleSelectCampaignDisbursement = (campaignTier) => {
    setFieldValue("campaignTier", campaignTier);
  };

  return (
    <Select onValueChange={handleSelectCampaignDisbursement}>
      <SelectTrigger className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id={selectTriggerId}>
        <SelectValue placeholder="Chọn hình thức"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectedItemDisbursement.map((type) => (
            <SelectItem key={type.key} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectCampaignDisbursement;
