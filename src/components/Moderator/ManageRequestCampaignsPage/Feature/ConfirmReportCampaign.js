import React, { useState, useRef, useEffect } from "react";
import { Button } from "../../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";
import { useFormik } from "formik";
import { useToast } from "../../../ui/use-toast";
import { Label } from "../../../ui/label";
import { Switch } from "../../../ui/switch";
import { ToastAction } from "../../../../components/ui/toast";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { CREATEEMAILREPORTCAMPAIGN, UPDATESTATUSREPORTCAMPAIGN } from "../../../../api/apiConstants";
import { Check, Loader2 } from "lucide-react";

const ConfirmReportCampaign = ({
  isOpen,
  onOpenChange,
  campaigns,
  onSubmitSuccess,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const updateStatusReport = async (data) => {
    try {
      setLoading(true);
      const response = await axiosPrivate.put(UPDATESTATUSREPORTCAMPAIGN, {
        campaignID: campaigns.campaignID,
        isTransparent: data.isTransparent,
      });

      const responseReport = await axiosPrivate.post(CREATEEMAILREPORTCAMPAIGN, {
        campaignID: campaigns.campaignID,
      });

      if (response.status === 200 && responseReport.status === 200) {
        onSubmitSuccess();
        toast({
          title: "Cập nhật thành công",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    } catch (error) {
      if (error.response  && error.responseReport && error.response.data && error.responseReport.data) {
        const serverMessage = error?.response?.data?.message;
        const serverMessageReport = error?.responseReport?.data?.message;

        if(serverMessage){
          toast({
            variant: "destructive",
            title: "Đã xảy ra lỗi!",
            description: serverMessage,
            action: <ToastAction altText="undo">Ẩn</ToastAction>,
          });
        } else if (serverMessageReport){
          toast({
            variant: "destructive",
            title: "Đã xảy ra lỗi!",
            description: serverMessageReport,
            action: <ToastAction altText="undo">Ẩn</ToastAction>,
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Đã xảy ra lỗi!",
          description: "Đã có lỗi xảy ra, vui lòng thử lại sau.",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    } finally {
      onOpenChange(false);
      setLoading(false);
    }
  };



  


  const formik = useFormik({
    initialValues: {
      isTransparent: campaigns?.campaign ? campaigns?.campaign?.isTransparent : false,
    },
    onSubmit: (values, { setSubmitting }) => {
      updateStatusReport(values);
      setSubmitting(false);
    },
  });

  const setValuesRef = useRef(formik.setValues);

  useEffect(() => {
    setValuesRef.current({
      isTransparent: campaigns?.campaign ? campaigns?.campaign?.isTransparent : false,
    });
  }, [campaigns]);

  const handleSwitchChange = (field) => (isChecked) => {
    formik.setFieldValue(field, isChecked);

  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-screen-mobile">
        <DialogHeader>
          <DialogTitle>Cập nhật trạng thái minh bạch</DialogTitle>
          <DialogDescription>
            Trạng thái minh bạch hiện tại:
            {campaigns?.campaign?.isTransparent === true
              ? ( <span className="ml-2 bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-orange-900 dark:text-orange-300">
                Minh bạch 
              </span>)
              : (<span className="ml-2 bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-orange-900 dark:text-orange-300">
                Không minh bạch
              </span>)}
          </DialogDescription>
        </DialogHeader>

        <div>
          {campaigns && (
            <form onSubmit={formik.handleSubmit} className="space-y-3">
              <div className="flex flex-col gap-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isTransparent"
                    checked={formik.values.isTransparent}
                    onCheckedChange={ handleSwitchChange("isTransparent")}
                     className="bg-vmo"
                  />
                  {formik.values?.isTransparent ? (
                    <Label htmlFor="isTransparent">Minh bạch</Label>
                  ) : (
                    <Label htmlFor="isTransparent">Không minh bạch</Label>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Đóng
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={formik.isSubmitting}
            onClick={formik.handleSubmit}
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

export default ConfirmReportCampaign;
