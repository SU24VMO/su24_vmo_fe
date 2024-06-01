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

const AccountTypeSelect = ({ setFieldValue, selectTriggerId }) => {
  const handleSelectAccountType = (accountType) => {
    setFieldValue("accountType", accountType);
  };
  return (
    <>
      <Select onValueChange={handleSelectAccountType}>
        <SelectTrigger className="w-[180px]" id={selectTriggerId}>
          <SelectValue placeholder="Chọn loại tài khoản" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tài khoản</SelectLabel>
            <SelectItem value="user">Tài khoản người dùng</SelectItem>
            <SelectItem value="organizationManager">Tài khoản tổ chức</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default AccountTypeSelect;
