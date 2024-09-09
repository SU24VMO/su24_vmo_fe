import { LayoutGrid } from "lucide-react";
import React from "react";

export default function AllProcessingPhaseButton() {
    return <div>  <a
        href="."
        className="flex h-14 items-center  tablet:h-[40px]"
    >
        <LayoutGrid className="w-fit" />
        <span className="flex-1 ms-3 ">Giai đoạn hoạt động từng phần</span>

    </a></div>;
}
