import React from "react";
import DonateForm from "./DonateForm/DonateForm";
import { AuthContext } from "../../../context/AuthContext";

const RightDonatePage = ({ data }) => {
  const { user } = React.useContext(AuthContext);

  console.log("CampaignId để donate lúc này", data.campaignID);
  console.log("User id hiện tại", user.account_id);
  return (
    <div className="flex flex-col space-y-4">
      <DonateForm
        accountId={user.account_id}
        campaignId={data.campaignID}
        firstname={user.firstname}
        lastname={user.lastname}
        email={user.email}
      />
    </div>
  );
};

export default RightDonatePage;
