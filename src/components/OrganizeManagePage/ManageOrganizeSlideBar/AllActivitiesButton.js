import { LandPlot } from "lucide-react";
import React from "react";

export default function AllActivitiesButton() {
  return (
    <div>
      <p className="flex h-14 items-center  tablet:h-[40px]">
      <LandPlot className="w-fit" />
        <span className="flex-1 ms-3 whitespace-nowrap">Tất cả hoạt động</span>
      </p>
    </div>
  );
}
