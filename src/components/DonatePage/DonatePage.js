import React from "react";
import LeftDonatePage from "./LeftDonatePage/LeftDonatePage";
import RightDonatePage from "./RightDonatePage/RightDonatePage";

const DonatePage = () => {
  return (
    <>
      <div className="px-3 tablet:px-24">
        <div className="h-full py-6 flex flex-col items-center justify-center">
          <div className="grid h-full w-full items-stretch gap-6 tablet:grid-cols-1">
            <div className="flex flex-col space-y-4">
              <div className="grid h-full gap-6 tablet:grid-cols-3 space-y-2">
                {/* Left */}
                <div>
                  <LeftDonatePage />
                </div>
                {/* Right */}
                <div className="tablet:col-span-2">
                  <RightDonatePage />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonatePage;
