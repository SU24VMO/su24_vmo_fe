/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../../../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../ui/dialog";
import { ScrollArea } from "../../../../ui/scroll-area";
import img_placeholder from "../../../../../assets/images/placeholder.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../ui/card";
import { Label } from "../../../../ui/label";

const AdminTransactionCard = ({
  statementImage,
  statementCreatedDate,
  statementNote,
  statementAmount,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
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
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Chi tiết</DialogTitle>
            <DialogDescription>
              Đã đăng vào{" "}
              {format(new Date(statementCreatedDate), "dd/MM/yyyy, h:mm:ss a")}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[65vh] shadow-inner ">
            <div className="flex items-center space-x-2">
              <img
                src={statementImage ? statementImage : img_placeholder}
                alt="Statement 1"
                className="object-cover w-full h-full"
              />
            </div>
          </ScrollArea>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Đóng
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Giao dịch từ hệ thống</CardTitle>
          <CardDescription>
            Đã đăng vào{" "}
            {format(new Date(statementCreatedDate), "dd/MM/yyyy, h:mm:ss a")}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Số tiền</Label>
              <div className="text-2xl font-bold">
                {formatMoney(statementAmount)} VND
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="note">Ghi chú</Label>
              <div className="text-muted-foreground">{statementNote}</div>
            </div>
          </div>
          <div>
            <Label htmlFor="image">Hình ảnh giao dịch</Label>
            <img
              src={statementImage ? statementImage : img_placeholder}
              width={800}
              height={400}
              alt="Transaction Image"
              className="w-full rounded-md object-cover"
              style={{ aspectRatio: "800/400", objectFit: "cover" }}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="green_theme_primary" onClick={setIsOpen}>
            Xem chi tiết <ArrowUpRight className="w-5 h-5" />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default AdminTransactionCard;
