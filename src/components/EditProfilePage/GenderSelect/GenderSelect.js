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

const GenderSelect = ({ setFieldValue, selectTriggerId, userGender }) => {
  const handleSelectGender = (gender) => {
    setFieldValue("gender", gender);
  };
  return (
    <Select onValueChange={handleSelectGender} defaultValue={userGender}>
      <SelectTrigger className="" id={selectTriggerId}>
        <SelectValue placeholder="Giới tính" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Giới tính</SelectLabel>
          <SelectItem value="Male">Nam</SelectItem>
          <SelectItem value="Female">Nữ</SelectItem>
          <SelectItem value="Other">Khác</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default GenderSelect;
