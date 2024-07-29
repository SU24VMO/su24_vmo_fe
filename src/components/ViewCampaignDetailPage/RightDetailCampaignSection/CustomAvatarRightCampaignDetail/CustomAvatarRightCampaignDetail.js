import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import img_demo from "../../../../assets/images/placeholder.svg";
import { Link } from "react-router-dom";

const CustomAvatarRightCampaignDetail = ({ data }) => {
  return (
    <>
      {data.organization ? (
        <Link to={`/organization/${data.organization.organizationID}`}>
          <Avatar className="w-20 h-20">
            <AvatarImage
              src={
                data.organization
                  ? data.organization.logo
                  : data.member
                  ? data.member.account.avatar
                  : img_demo
              }
            />
            <AvatarFallback>
              {data.organization
                ? data.organization.name
                : data.member
                ? data.member.lastName[0]
                : "Logo"}
            </AvatarFallback>
          </Avatar>
        </Link>
      ) : data.member ? (
        <Link to={`/volunteer/${data.member.accountID}`}>
          <Avatar className="w-20 h-20">
            <AvatarImage
              src={
                data.organization
                  ? data.organization.logo
                  : data.member
                  ? data.member.account.avatar
                  : img_demo
              }
            />
            <AvatarFallback>
              {data.organization
                ? data.organization.name
                : data.member
                ? data.member.lastname
                : "Logo"}
            </AvatarFallback>
          </Avatar>
        </Link>
      ) : (
        img_demo
      )}
    </>
  );
};

export default CustomAvatarRightCampaignDetail;
