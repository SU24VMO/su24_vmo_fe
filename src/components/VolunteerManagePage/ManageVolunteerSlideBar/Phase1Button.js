import { Receipt } from "lucide-react";
import React from "react";

export default function Phase1Button() {
    return <div>    <a
        href="."
        className="flex h-14 items-center  tablet:h-[40px]"
    >
        <Receipt className="w-fit" />
        <span className="flex-1 ms-3 ">Giai đoạn quyên góp ủng hộ</span>

    </a></div>;
}
