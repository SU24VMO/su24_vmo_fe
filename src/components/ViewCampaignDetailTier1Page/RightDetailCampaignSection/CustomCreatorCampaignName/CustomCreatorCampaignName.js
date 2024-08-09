import React from "react";
import { CardTitle } from "../../../ui/card";
import { Link } from "react-router-dom";

const CustomCreatorCampaignName = ({ data }) => {
  return (
    <>
      {data.organization ? (
        <Link to={`/organization/${data.organization.organizationID}`}>
          <CardTitle className="text-lg laptop:text-2xl">
            {data.organization
              ? data.organization.name
              : data.member
              ? data.member.firstName + " " + data.member.lastName
              : "Không xác định"}
          </CardTitle>
        </Link>
      ) : data.member ? (
        <Link to={`/volunteer/${data.member.accountID}`}>
          <CardTitle className="text-lg laptop:text-2xl">
            {data.organization
              ? data.organization.name
              : data.member
              ? data.member.firstName + " " + data.member.lastName
              : "Không xác định"}
          </CardTitle>
        </Link>
      ) : (
        <CardTitle className="text-lg laptop:text-xl">Không xác định</CardTitle>
      )}
    </>
  );
};

export default CustomCreatorCampaignName;
