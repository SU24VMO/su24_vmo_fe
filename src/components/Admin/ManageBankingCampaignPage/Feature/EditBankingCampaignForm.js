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
import { Formik } from "formik"; // Import useFormik
import { useToast } from "../../../ui/use-toast";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { CopyButton } from "./CopyButton";

import React, { useContext, useEffect, useState } from "react";
import { Badge } from "../../../ui/badge";
import { ToastAction } from "../../../ui/toast";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { UPDATEIMAGEBANKING } from "../../../../api/apiConstants";
import { Loader2 } from "lucide-react";

import { AuthContext } from "../../../../context/AuthContext";

const EditBankingCampaignForm = ({
  isOpen,
  onOpenChange,
  banking,
  onSubmitSuccess,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [fileImageBanking, setFileImageBanking] = useState(null);

  //Xử lí hiển thị ảnh chuyển khoản của admin
  function handleImageBanking(e, setFieldValue) {
    setFileImageBanking(URL.createObjectURL(e.target.files[0]));
    setFieldValue("transactionImage", e.target.files[0]);
  }
  //Xóa ảnh
  function removeImageBanking(e, setFieldValue) {
    setFileImageBanking("");
    setFieldValue("transactionImage", null);
  }
// Format tiền
  const formatAmount = (value) => {
    const cleanValue = value.replace(/\D/g, "");
    const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedValue + " VND";
  };

  const cleanFormattedAmount = (formattedValue) => {
    return formattedValue.replace(/\./g, "");
  };

  //Upload ảnh sao kê giao dịch admin
  const uploadImageBanking = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("AccountId", user?.account_id);
      formData.append("CampaignId", banking?.campaignID);
      formData.append("BankingAccountId", banking?.bankingAccountId);
      formData.append("Amount", cleanFormattedAmount(banking?.amount));
      formData.append("TransactionImage", data?.transactionImage);

      const response = await axiosPrivate.post(UPDATEIMAGEBANKING, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        onSubmitSuccess();
        setFileImageBanking("");
        toast({
          title: "Cập nhật thành công",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    } catch (error) {
      const serverMessage =
        error?.response?.data?.message ||
        "Đã có lỗi xảy ra, vui lòng thử lại sau.";
      toast({
        variant: "destructive",
        title: "Đã xảy ra lỗi!",
        description: serverMessage,
        action: <ToastAction altText="undo">Ẩn</ToastAction>,
      });
    } finally {
      onOpenChange(false);
      setLoading(false);
    }
  };

  useEffect(() => {}, [banking?.transactionImage]);

  return (
    <Formik
      initialValues={{
        transactionImage: null,
      }}
      validate={(values) => {
        const errors = {};
        if (!values.transactionImage) {
          errors.transactionImage = "Không được để trống!";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        uploadImageBanking(values);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent className="mobile:max-w-screen-laptop mobile:h-[90vh] h-full">
            <DialogHeader>
              <DialogTitle>Thông tin giao dịch</DialogTitle>
              <DialogDescription>
                Lưu ý: Xem kĩ thông tin trước khi giao dịch !
              </DialogDescription>
            </DialogHeader>
            {/* Thông tin */}
            <ScrollArea className="h-[65vh] shadow-inner">
              <div className="flex flex-col p-5 gap-5">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="qrCode">Ảnh QR Code</Label>
                  <div className=" w-52 h-fit mx-auto">
                    <img
                      src={banking?.qrCode ? banking?.qrCode : "Chưa có"}
                      alt="ảnh-nền"
                      className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale block"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-5 gap-5">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="campaignID">ID chiến dịch</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="campaignID"
                      defaultValue={
                        banking?.campaignID ? banking?.campaignID : "Chưa có"
                      }
                      disabled
                    />
                    <CopyButton
                      code={
                        banking?.campaignID ? banking?.campaignID : "Chưa có"
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-5 gap-5">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="name">Tên chiến dịch</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="name"
                      defaultValue={banking?.name ? banking?.name : "Chưa có"}
                      disabled
                    />
                    <CopyButton
                      code={banking?.name ? banking?.name : "Chưa có"}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-5 gap-5">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="bankingName">Tên ngân hàng</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="bankingName"
                      defaultValue={
                        banking?.bankingName ? banking?.bankingName : "Chưa có"
                      }
                      disabled
                    />
                    <CopyButton
                      code={
                        banking?.bankingName ? banking?.bankingName : "Chưa có"
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-5 gap-5">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="accountName">Tên tài khoản</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="accountName"
                      defaultValue={
                        banking?.accountName ? banking?.accountName : "Chưa có"
                      }
                      disabled
                    />
                    <CopyButton
                      code={
                        banking?.accountName ? banking?.accountName : "Chưa có"
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-5 gap-5">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="bankingAccountNumber">Số tài khoản</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="bankingAccountNumber"
                      defaultValue={
                        banking?.bankingAccountNumber
                          ? banking?.bankingAccountNumber
                          : "Chưa có"
                      }
                      disabled
                    />
                    <CopyButton
                      code={
                        banking?.bankingAccountNumber
                          ? banking?.bankingAccountNumber
                          : "Chưa có"
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-5 gap-5">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="create_date">Số tiền</Label>
                  <div className="flex items-center space-x-2">
                    <Badge variant={"outline"}>
                      {banking ? formatAmount(banking?.amount) : ""}
                    </Badge>
                    <CopyButton
                      code={banking ? formatAmount(banking?.amount) : ""}
                    />
                  </div>
                </div>
              </div>

              {/* Ảnh giao dịch */}

              {banking?.transactionImage !== null ? (
                <div className="flex flex-col p-5 gap-5">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="transactionImage">Ảnh sao kê</Label>
                    <div className=" w-52 h-fit mx-auto">
                      <img
                        src={
                          banking?.transactionImage
                            ? banking?.transactionImage
                            : "Chưa có"
                        }
                        alt="ảnh-nền"
                        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale block"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                banking && (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex flex-col p-5 gap-5">
                      {fileImageBanking ? (
                        <div className="flex flex-col justify-center items-center gap-2">
                          <Label htmlFor="transactionImage">
                            Ảnh sao kê đã chọn
                          </Label>

                          <div className="grid flex-1 gap-2">
                            <div className=" w-60 h-fit mx-auto">
                              <img
                                src={fileImageBanking}
                                alt="ảnh-nền"
                                className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale block"
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) =>
                              removeImageBanking(e, setFieldValue)
                            }
                            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none 
                            bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700
                             focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800
                              dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          >
                            Xóa ảnh
                          </button>
                        </div>
                      ) : (
                        <div>
                          <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor="transactionImage"
                          >
                            Sao kê (ảnh)*
                          </label>

                          <div>
                            <label
                              className="block w-full py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer
                               bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600
                                dark:placeholder-gray-400"
                              htmlFor="transactionImage"
                            >
                              <span className="ml-2">Chọn ảnh</span>
                            </label>
                            <input
                              className="hidden"
                              aria-describedby="transactionImage"
                              id="transactionImage"
                              name="transactionImage"
                              onChange={(e) => {
                                handleImageBanking(e, setFieldValue);
                              }}
                              type="file"
                              accept="image/png, image/jpeg, image/jpg"
                            />
                          </div>

                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors.transactionImage &&
                              touched.transactionImage &&
                              errors.transactionImage}
                          </p>
                        </div>
                      )}
                    </div>
                  </form>
                )
              )}
            </ScrollArea>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button">Đóng</Button>
              </DialogClose>
              {banking?.transactionImage !== null ? (
                ""
              ) : (
                <Button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  variant="green_theme_primary"
                >
                  {loading ? (
                    <Loader2 className="animate-spin flex items-center justify-center w-full" />
                  ) : (
                    "Xác nhận"
                  )}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Formik>
  );
};

export default EditBankingCampaignForm;
