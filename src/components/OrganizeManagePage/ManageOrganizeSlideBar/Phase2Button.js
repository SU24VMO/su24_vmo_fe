import { Target } from "lucide-react";
import React from "react";

export default function Phase2Button() {
    return <div>  <a
        href="."
        className="flex h-14 items-center  tablet:h-[40px]"
    >
       <Target className="w-fit" />
        <span className="flex-1 ms-3 ">Giai đoạn hoạt động toàn phần</span>

    </a></div>;
}
