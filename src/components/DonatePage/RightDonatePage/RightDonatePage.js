import React from "react";
import DonateForm from "./DonateForm";

const RightDonatePage = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4">
        <p className="text-3xl text-muted-foreground font-bold">
          Thông tin ủng hộ
        </p>
        <DonateForm />
      </div>
    </div>
  );
};

export default RightDonatePage;
