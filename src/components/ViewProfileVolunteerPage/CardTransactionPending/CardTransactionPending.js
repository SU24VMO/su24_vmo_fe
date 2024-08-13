import { DollarSignIcon } from "lucide-react";
import React from "react";
import { Card } from "../../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const CardTransactionPaid = ({
  amount,
  createDate,
  campaignName,
  campaignID,
  payerName,
  transactionID,
  note,
  campaignTier,
}) => {
  // Hàm format số tiền ủng hộ
  const formatMoney = (money) => {
    // Ensure money is a string
    const moneyStr = money.toString();
    // Remove non-digit characters from the input money
    const cleanValue = moneyStr.replace(/\D/g, "");
    // Format the money with thousand separators
    const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedValue;
  };

  return (
    <Card className="p-6 grid gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-muted rounded-md p-3 items-center justify-center hidden mobile:flex">
            <DollarSignIcon className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <div className="font-semibold">{formatMoney(amount)} VNĐ</div>
            <div className="text-sm text-muted-foreground">
              {format(new Date(createDate), "dd/MM/yyyy, h:mm:ss a")}
            </div>
            <div className="text-sm text-muted-foreground">
              Đến: <span className="text-black font-bold">{campaignName}</span>
            </div>
          </div>
        </div>
        <div>
          {campaignTier === 1 ? (
            <Link to={`/viewCampaigns/campaignDetail/tier1/${campaignID}`}>
              <Button variant="green_theme_primary">Xem chiến dịch</Button>
            </Link>
          ) : (
            <Link to={`/viewCampaigns/campaignDetail/tier2/${campaignID}`}>
              <Button variant="green_theme_primary">Xem chiến dịch</Button>
            </Link>
          )}
        </div>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <span>Xem chi tiết</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2 pt-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground">Họ và tên</div>
                <div>{payerName}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground">ID giao dịch</div>
                <div>{transactionID}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground">
                  Nội dung chuyển khoản
                </div>
                <div>{note}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground">Trạng thái</div>
                <div className="text-red-500">Chưa thanh toán</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default CardTransactionPaid;
