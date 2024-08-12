/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import img_placeholder from "../../../../../assets/images/placeholder.svg";
import { useMediaQuery } from "../../../../../hooks/use-media-query";
import { ButtonStatusDonate } from "../ButtonStatusDonate";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../ui/dialog";
import { Separator } from "../../../../ui/separator";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../../../../ui/drawer";

const DialogDonate = ({
  isDialogOpen,
  setDialogOpen,
  formValues,
  qrCode,
  email,
  firstname,
  lastname,
  orderId,
  campaignId,
  campaignTier,
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const formatCurrency = (value) => {
    const numberValue = Number(value);
    if (isNaN(numberValue)) return "";
    return new Intl.NumberFormat("it-IT", {}).format(numberValue);
  };

  return (
    <>
      {isDesktop ? (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="w-full text-2xl">Thanh Toán</DialogTitle>
              <blockquote className="mt-6 border-l-2 pl-6 italic">
                "Vì một cộng đồng không ai bị bỏ lại phía sau"
              </blockquote>
              <DialogDescription className="text-xl">
                Cảm ơn bạn đã ủng hộ, bạn có thể chuyển khoản theo thông tin
                dưới đây:
              </DialogDescription>
              <Separator />
            </DialogHeader>
            <div className="grid grid-cols-3 w-full h-full">
              <div className="col-span-2">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <p className="text-sm w-[40%]">Ngân hàng:</p>
                  <p className="text-sm font-bold w-[60%]">
                    Ngân hàng TMCP Quân Đội (MB Bank)
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <p className="text-sm w-[40%]">Chủ tài khoản:</p>
                  <p className="text-sm font-bold w-[60%]">CHAU NHAT TRUONG</p>
                </div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <p className="text-sm w-[40%]">Số tiền:</p>
                  <p className="text-sm font-bold w-[60%]">
                    {formatCurrency(formValues.price)} VND
                  </p>
                </div>
                <p className="text-sm text-center text-muted-foreground italic">
                  <b>
                    Lưu ý: Mã QR chỉ hoạt động một lần trên mỗi chuyển khoản
                  </b>
                </p>
              </div>
              <div className="col-span-1 place-self-center">
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="max-w-40">
                    <img
                      src={qrCode ? qrCode : img_placeholder}
                      alt="Image"
                      width="200"
                      height="200"
                      className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale block"
                    />
                  </div>
                  <p className="text-sm text-center text-muted-foreground italic">
                    Sử dụng ứng dụng ngân hàng hoặc ứng dụng thanh toán hỗ trợ
                    QR code để quét mã
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <ButtonStatusDonate
                email={email}
                firstName={firstname}
                lastName={lastname}
                orderID={orderId}
                campaignID={campaignId}
                campaignTier={campaignTier}
              />
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Thanh Toán</DrawerTitle>
              <DrawerDescription>
                Cảm ơn bạn đã ủng hộ, chúng tôi đã nhận được thông tin của bạn.
                Bạn có thể chuyển khoản theo thông tin dưới đây:
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col items-center justify-center px-3">
              <div className="flex flex-col items-center justify-center w-full">
                <div className="max-w-40">
                  <img
                    src={qrCode ? qrCode : img_placeholder}
                    alt="Image"
                    width="160"
                    height="160"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale block"
                  />
                </div>
                <p className="text-sm text-center text-muted-foreground italic">
                  Sử dụng ứng dụng ngân hàng hoặc ứng dụng thanh toán hỗ trợ QR
                  code để quét mã
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <p className="text-sm">Ngân hàng:</p>
                  <p className="text-sm font-bold">
                    Ngân hàng TMCP Quân Đội (MB Bank)
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <p className="text-sm">Chủ tài khoản:</p>
                  <p className="text-sm font-bold">CHAU NHAT TRUONG</p>
                </div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <p className="text-sm">Số tiền:</p>
                  <p className="text-sm font-bold">
                    {formatCurrency(formValues.price)} VND
                  </p>
                </div>
                <p className="text-sm text-center text-muted-foreground italic">
                  <br />
                  <b>
                    Lưu ý: Mã QR chỉ hoạt động một lần trên mỗi chuyển khoản
                  </b>
                </p>
              </div>
              <div className="my-3">
                <ButtonStatusDonate
                  email={email}
                  firstName={firstname}
                  lastName={lastname}
                  orderID={orderId}
                  campaignID={campaignId}
                  campaignTier={campaignTier}
                />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default DialogDonate;
