import React, { useState, useEffect, useContext } from "react";
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
import { GETALLORGANIZATIONBYID } from "../../../api/apiConstants";
import { AuthContext } from "../../../context/AuthContext";

const OrganizationsSelect = ({ setFieldValue, selectTriggerId, organizationSelected }) => {
  const [organizations, setOrganizations] = useState([]);
  const { user } = useContext(AuthContext);

  // Function to fetch organizations
  const getAllOrganizations = async () => {
    try {
      const response = await axiosPrivate.get(GETALLORGANIZATIONBYID + `${user.organization_manager_id}`);
      if (response.status === 200) {
        const activeOrganizations = response.data.data.list.filter(org => org.isActive);
        setOrganizations(activeOrganizations);
      } else {
        console.error("Failed to fetch types of organizations.");
      }
    } catch (error) {
      console.error("Get type of organization is error!");
    }
  };

  useEffect(() => {
    getAllOrganizations();
  }, []); // Fetch organizations only once on component mount

  // Handle organization selection
  const handleSelectOrganization = (selectedOrganizationID) => {
    setFieldValue("organizations", selectedOrganizationID);
  };

  return (
    <Select onValueChange={handleSelectOrganization} value={organizationSelected}>
      <SelectTrigger className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id={selectTriggerId}>
        <SelectValue placeholder="Danh sách tổ chức" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Chọn tổ chức của bạn</SelectLabel>
          {organizations.map((organization) => (
            <SelectItem key={organization.organizationID} value={organization.organizationID}>
              {organization.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default OrganizationsSelect;
