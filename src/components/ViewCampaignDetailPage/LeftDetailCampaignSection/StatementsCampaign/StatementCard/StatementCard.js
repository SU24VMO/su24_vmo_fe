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
  DialogTrigger,
} from "../../../../ui/dialog";
import { ScrollArea } from "../../../../ui/scroll-area";
import img_placeholder from "../../../../../assets/images/placeholder.svg";

const StatementCard = ({ statementImage, statementCreatedDate }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer">
          <img
            src={statementImage ? statementImage : img_placeholder}
            width={600}
            height={400}
            alt="Statement 1"
            className="object-cover w-full h-64"
          />
          <div className="p-4 bg-background flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Đã đăng vào{" "}
              {format(new Date(statementCreatedDate), "dd/MM/yyyy, h:mm:ss a")}
            </p>
            <Button variant="icon" className="p-0">
              <ArrowUpRight />
            </Button>
          </div>
        </div>
      </DialogTrigger>
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
  );
};

export default StatementCard;
