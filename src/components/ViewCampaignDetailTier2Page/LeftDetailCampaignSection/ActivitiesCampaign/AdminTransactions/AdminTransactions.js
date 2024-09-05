import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../../../ui/accordion";
import { Badge } from "../../../../ui/badge";
import AdminTransactionCard from "./AdminTransactionCard";

const AdminTransactions = ({ adminTransactions }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex items-center justify-center">
            <p>Giao dịch từ hệ thống</p>
            {adminTransactions && adminTransactions.length > 0 ? (
              <Badge className="ml-2" variant="outline">
                Đã giải ngân
              </Badge>
            ) : (
              <Badge className="ml-2" variant="outline">
                Chưa giải ngân
              </Badge>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {adminTransactions && adminTransactions.length > 0 ? (
            <div className="grid grid-cols-2 gap-6 mobile:grid-cols-3">
              {adminTransactions.map((statementFile, index) => (
                <AdminTransactionCard
                  key={index}
                  statementImage={statementFile.transactionImageUrl}
                  statementCreatedDate={statementFile.createDate}
                  statementAmount={statementFile.amount}
                  statementNote={statementFile.note}
                />
              ))}
            </div>
          ) : (
            <p>Đang chờ giải ngân</p>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AdminTransactions;