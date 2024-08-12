import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../ui/dialog";
import { ScrollArea } from "../../../../ui/scroll-area";
import { Checkbox } from "../../../../ui/checkbox";
import { Button } from "../../../../ui/button";
import Term from "./Term/Term";

const DialogTerm = ({
  isTermsDialogOpen,
  setTermsDialogOpen,
  isTermsAccepted,
  setTermsAccepted,
  handleTermsConfirm,
}) => {
  return (
    <Dialog open={isTermsDialogOpen} onOpenChange={setTermsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Điều khoản</DialogTitle>
          <DialogDescription>
            Vui lòng đọc và chấp thuận điều khoản trước khi tiếp tục.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[65vh] shadow-inner">
          <Term />
        </ScrollArea>
        <div className="items-top flex space-x-2">
          <Checkbox
            id="terms1"
            checked={isTermsAccepted}
            onCheckedChange={() => setTermsAccepted(!isTermsAccepted)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Đồng ý với điều khoản
            </label>
            <p className="text-sm text-muted-foreground">
              Tôi đã đọc và đồng ý với điều khoản sử dụng của hệ thống.
            </p>
          </div>
        </div>
        <Button
          type="submit"
          variant="green_theme_primary"
          onClick={handleTermsConfirm}
          disabled={!isTermsAccepted}
        >
          Xác nhận
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DialogTerm;
