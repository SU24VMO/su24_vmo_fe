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
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { AuthContext } from "../../../../context/AuthContext";
import { EXTENDONATEPHASE } from "../../../../api/apiConstants";
import { ToastAction } from "../../../ui/toast";
import EndDayPicker from "../EndDayPicker/EndDayPicker";
import { Formik } from "formik";


const ExtendDonatePhase = ({ isOpen, onOpenChange, row, onSubmitSuccess }) => {
  const { toast } = useToast();
  // Formik setup
  const [loading, setLoading] = useState(false)
  const { user } = useContext(AuthContext)

  console.log(row);

  const onExtendDonatePhase = async (data, donatePhaseId) => {
    setLoading(true)

    try {
      const response = await axiosPrivate.put(EXTENDONATEPHASE, {
        donatePhaseId: donatePhaseId,
        accountId: user.account_id,
        endDate: data?.endDate
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
    <>

      <Formik
        initialValues={{
          endDate: null,
        }}
        validate={(values) => {
          const errors = {};
          var today = new Date();
          today.setHours(0, 0, 0, 0);
          var endDate = new Date(values.endDate);

          // // Kiểm tra ngày kết thúc
          if (!values.endDate) {
            errors.endDate = "Không được để trống!";
          } else {
            if (endDate <= today) {
              errors.endDate = "Ngày kết thúc phải diễn ra trong tương lai!";
            } else if (endDate <= row?.startDate) {
              errors.endDate = "Ngày kết thúc phải lớn hơn ngày bắt đầu!";

            } else if (row?.startDate && endDate && (endDate - row?.startDate) / (1000 * 60 * 60 * 24) < 1) {
         
              errors.endDate = "Ngày kết thúc và ngày bắt đầu phải cách nhau ít nhất 1 ngày!";
            }
          }
          console.log(errors);
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          onExtendDonatePhase(values, row?.donatePhase?.donatePhaseId)

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
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <Dialog open={isOpen} onOpenChange={onOpenChange}>
              <DialogContent className="mobile:max-w-screen-mobile">
                <DialogHeader>
                  <DialogTitle>Mở rộng thời gian kết thúc giai đoạn quyên góp ủng hộ của bạn!</DialogTitle>
                  <DialogDescription>
                    Lưu ý: Chiến dịch của bạn hiện chưa đủ tối thiểu <span className="text-destructive font-semibold">80%</span> số tiền mục tiêu, vì vậy hãy tiến hành mở rộng thời gian chiến dịch của bạn!
                  </DialogDescription>
                </DialogHeader>

                <div className="flex justify-around">
                  <div>
                  <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày bắt đầu: </label>
                  <span>{row?.startDate ? format(new Date(row?.startDate), 'dd/MM/yyyy, h:mm:ss a') : ""}</span>
                  </div>
                  <div>
                  <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày kết thúc dự kiến hiện tại: </label>
                  <span>{row?.expectedEndDate ?  format(new Date(row?.expectedEndDate), 'dd/MM/yyyy, h:mm:ss a') : ""}</span>
                  </div>
                </div>

                <div>
                  <label for="dateTo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mở rộng đến ngày *</label>

                  <div class="relative  tablet:w-full">
                    <EndDayPicker setEndFieldValue={setFieldValue}
                      popOverTriggerIdEnd="endDate"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></EndDayPicker>
                    <p class=" z-10 mt-2 text-sm text-red-600 dark:text-red-500"> {errors.endDate && touched.endDate && errors.endDate}</p>
                  </div>

                </div>

                <DialogFooter>
                  {/* <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Đóng
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    variant="green_theme_primary"
                    disabled={isSubmitting}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="  animate-spin flex items-center justify-center w-full" />

                      </>
                    ) : (
                      "Xác nhận"
                    )}
                  </Button> */}
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Đóng
                    </Button>
                  </DialogClose>
                  <Button className="" type="submit" disabled={isSubmitting} onClick={handleSubmit}
                    variant="green_theme_primary"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin flex items-center justify-center w-full" />
                    ) : (
                      "Xác nhận"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ExtendDonatePhase;
