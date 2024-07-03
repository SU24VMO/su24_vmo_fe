import React from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useFormik } from "formik";
import { cn } from "../../../lib/utils";
import { useStepper } from "../../ui/stepper";
import { useToast } from "../../ui/use-toast";
import { axiosPublic } from "../../../api/axiosInstance";
import { FORGOT_PASSWORD_GET_OTP } from "../../../api/apiConstants";
import { ToastAction } from "../../ui/toast";
import { Loader2 } from "lucide-react";
import { set } from "date-fns";

const EmailInput = ({ setOTP, setEmail }) => {
  const { nextStep } = useStepper();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  // Handle form submission
  async function handleSubmit(values, setSubmitting, setLoading) {
    try {
      toast({
        title: "Đang lấy mã OTP!",
        description: "Vui chờ trong giây lát!",
        action: <ToastAction altText="undo">Ẩn</ToastAction>,
      });
      setLoading(true); // Start loading
      // Step 4: Make the API call to update the user information
      const response = await axiosPublic.post(
        `${FORGOT_PASSWORD_GET_OTP}?email=${values.email}`
      );
      if (response.status === 200) {
        toast({
          title: "Lấy mã OTP thành công!",
          description: "Vui lòng kiểm tra mã OTP đã gửi tới email của bạn!",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
        console.log("Get OTP successfully: ", response.data);
        setOTP(response.data.data);
        setEmail(values.email);
        nextStep(); // Move to the next step
      } else {
        // Handle any other status code appropriately
        toast({
          variant: "destructive",
          title: "Có lỗi xảy ra !",
          description: "Vui lòng thử lại!",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
        console.log("Failed to update profile");
      }
    } catch (error) {
      // Handle error (e.g., show an error message)
      toast({
        variant: "destructive",
        title: "Có lỗi xảy ra !",
        description: "Vui lòng thử lại!",
        action: <ToastAction altText="undo">Ẩn</ToastAction>,
      });
      console.error("Error get OTP:", error);
    } finally {
      setLoading(false); // Stop loading regardless of the outcome
      setSubmitting(false); // Set Formik submitting to false
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Không được để trống!";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Email không hợp lệ!";
      }
      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      handleSubmit(values, setSubmitting, setLoading);
    },
  });

  return (
    <>
      <form className="grid gap-4 mt-3" onSubmit={formik.handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Nhập email của bạn"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <p className="text-muted-foreground text-sm">
            Bạn sẽ nhận được một email kèm theo mã xác nhận
          </p>
          <p className={cn("text-sm font-medium text-destructive")}>
            {formik.errors.email && formik.touched.email && formik.errors.email}
          </p>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Gửi mã xác nhận
            </>
          ) : (
            "Gửi mã xác nhận"
          )}
        </Button>
      </form>
    </>
  );
};

export default EmailInput;
