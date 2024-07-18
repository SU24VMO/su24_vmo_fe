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
import { ENABLEDISABLEORGANIZATION } from "../../../../api/apiConstants";
import { ToastAction } from "../../../ui/toast";


const ConformEnableDisable = ({ isOpen, onOpenChange, row, onSubmitSuccess }) => {
  const { toast } = useToast();
  // Formik setup
  const [loading, setLoading] = useState(false)
  const {user} = useContext(AuthContext)



  const onUpdateEnableDisable = async (organizationId) => {
    setLoading(true)

    try {
      const response = await axiosPrivate.put(ENABLEDISABLEORGANIZATION, {
        organizationId: organizationId,
        isDisable: true,
      });

      if (response.status === 200) {
        console.log(response.data);
        onSubmitSuccess()
        toast({
          title: "Cập nhật thành công",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      } 

    } catch (error) {
      if (error.response && error.response.data) {
        const serverMessage = error?.response?.data?.message;
        toast({
            variant: "destructive",
            title: "Đã xảy ra lỗi!",
            description: serverMessage,
            action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
    } else {
        toast({
            variant: "destructive",
            title: "Đã xảy ra lỗi!",
            description: "Đã có lỗi xảy ra, vui lòng thử lại sau.",
            action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
    }
    } finally {
      setLoading(false)
      onOpenChange(false);

    }
  }



  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-screen-mobile">
        <DialogHeader>
          <DialogTitle>Bạn có chắc rằng sẽ ẩn chiến dịch này</DialogTitle>
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
            onClick={() => onUpdateEnableDisable(row?.organizationID)}
            variant="green_theme_primary"
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

export default ConformEnableDisable;
