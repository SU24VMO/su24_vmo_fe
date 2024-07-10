import { Button } from "../../../ui/button";
import { ScrollArea } from "../../../ui/scroll-area";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";

import { useToast } from "../../../ui/use-toast";

import React, { useContext, useState } from "react";

import { Loader2 } from "lucide-react";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import { PUTPROCESSINGPHASE } from "../../../../api/apiConstants";
import { ToastAction } from "../../../ui/toast";


const ConfirmDialog = ({ isOpen, onOpenChange, row, onSubmitSuccess }) => {
  const { toast } = useToast();
  // Formik setup
  const [loading, setLoading] = useState(false)
  const {user} = useContext(AuthContext)



  const onUpdateStatusPhase = async (processingPhaseId) => {
    setLoading(true)

    try {
      const response = await axiosPrivate.put(PUTPROCESSINGPHASE, {
        processingPhaseId: processingPhaseId,
        isEnd: true,
        accountId: user.account_id
      });

      if (response.status === 200) {
        console.log(response.data);
        onSubmitSuccess()
        toast({
          title: "Cập nhật thành công",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Cập nhật thất bại !",
          description: "Vui lòng kiểm tra lại thông tin Cập nhật !",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Cập nhật thất bại !",
        description: "Vui lòng kiểm tra lại thông tin Cập nhật !",
        action: <ToastAction altText="undo">Ẩn</ToastAction>,
      });
    } finally {
      setLoading(false)
      onOpenChange(false);

    }
  }



  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-screen-mobile">
        <DialogHeader>
          <DialogTitle>Bạn có chắc rằng kết thúc giai đoạn 2 của chiến dịch này</DialogTitle>
          <DialogDescription>
            Lưu ý: Bạn chỉ có thể làm điều này duy nhất 1 lần!
          </DialogDescription>
        </DialogHeader>
      
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Đóng
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={() => onUpdateStatusPhase(row?.processingPhase?.processingPhaseId)}
          >
            {loading ? (
              <>
                <Loader2 className="  animate-spin flex items-center justify-center w-full" />

              </>
            ) : (
              "Xác nhận"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
