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

const GenderSelect = ({ setFieldValue, selectTriggerId }) => {
  const handleSelectGender = (gender) => {
    setFieldValue("gender", gender);
  };
  return (
    <Select onValueChange={handleSelectGender}>
      <SelectTrigger className="" id={selectTriggerId}>
        <SelectValue placeholder="Giới tính" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Giới tính</SelectLabel>
          <SelectItem value="male">Nam</SelectItem>
          <SelectItem value="female">Nữ</SelectItem>
          <SelectItem value="other">Khác</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default GenderSelect;
