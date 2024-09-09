import { HeartHandshake } from "lucide-react";
import React from "react";

export default function AllCampaignsTier1Button() {
    return <div className="flex h-14 items-center tablet:h-[40px] ">  
     
     <HeartHandshake className="w-fit" />
        <span className="ms-3">Chiến dịch toàn phần</span>
    </div>;
}
