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

const GenderSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
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
