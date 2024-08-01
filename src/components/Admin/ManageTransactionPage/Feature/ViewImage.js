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
import { Formik, useFormik } from "formik"; // Import useFormik
import { useToast } from "../../../ui/use-toast";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { CopyButton } from "./CopyButton";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Switch } from "../../../ui/switch";
import React, { useContext, useEffect, useState } from "react";
import { Badge } from "../../../ui/badge";
import { ToastAction } from "../../../ui/toast";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { UPDATEIMAGEBANKING } from "../../../../api/apiConstants";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { AuthContext } from "../../../../context/AuthContext";

const ViewImage = ({ isOpen, onOpenChange, image, onSubmitSuccess }) => {
  // const { toast } = useToast();
  // const [loading, setLoading] = useState(false);
  // const { user } = useContext(AuthContext);
  // const [fileImageBanking, setFileImageBanking] = useState(null);

  // function handleImageBanking(e, setFieldValue) {
  //   setFileImageBanking(URL.createObjectURL(e.target.files[0]));
  // }



  useEffect(() => {

  }, [image?.transactionImageUrl]);


  return (

    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-screen-laptop mobile:h-[90vh] h-full">
        <DialogHeader>
          <DialogTitle>Thông tin giao dịch</DialogTitle>

        </DialogHeader>
        <ScrollArea className="h-[65vh] shadow-inner">
            <div className="flex flex-col p-5 gap-5">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="transactionImageUrl">Ảnh giao dịch</Label>
                <div className=" w-52 h-fit mx-auto">
                  <img
                    src={image?.transactionImageUrl ? (image?.transactionImageUrl) : "Chưa có"}
                    alt="ảnh-nền"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale block"
                  />
                </div>
              </div>
            </div>
          
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" >
              Đóng
            </Button>
          </DialogClose>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>

  );
};

export default ViewImage;
