import { NotebookPen } from "lucide-react";
import React from "react";

export default function Phase3Button() {
    return <div> <a
        href="."
        className="flex h-14 items-center  tablet:h-[40px]"
    >
       <NotebookPen className="w-fit" />
        <span className="flex-1 ms-3 ">Giai đoạn sao kê</span>
    </a></div>;
}
