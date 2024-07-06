/* eslint-disable no-useless-escape */
import React, { useContext, useState } from "react";
import { Formik } from "formik";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "../../lib/utils";
import BirthDayPicker from "./BirthDayPicker/BirthDayPicker";
import GenderSelect from "./GenderSelect/GenderSelect";
import { AuthContext } from "../../context/AuthContext";
import { UPDATE_INFORMATION } from "../../api/apiConstants";
import { axiosPrivate } from "../../api/axiosInstance";
import { Loader2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
export default function EditProfileForm() {
  const { toast } = useToast();
  const { user, updateUserInformation } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  // console.log("User bên context: ", user);

  // Handle form submission
  async function handleSubmit(values, setSubmitting, setLoading) {
    toast({
      title: "Đang cập nhật thông tin cá nhân...",
      description: "Vui lòng chờ trong giây lát !",
      action: <ToastAction altText="undo">Ẩn</ToastAction>,
    });
    try {
      setLoading(true); // Start loading
      // Step 4: Make the API call to update the user information
      const response = await axiosPrivate.put(UPDATE_INFORMATION, values);
      if (response.status === 200) {
        // Cập nhật context và localStorage
        updateUserInformation(
          values.firstName,
          values.lastName,
          values.birthday,
          values.gender,
          values.phoneNumber,
          values.facebookUrl,
          values.tiktokUrl,
          values.youtubeUrl
        );
        toast({
          title: "Cập nhật thông tin cá nhân thành công!",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
        console.log("Profile updated successfully");
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
      let errorMessage = "Có lỗi xảy ra. Vui lòng thử lại!";
      // Kiểm tra nếu có phản hồi lỗi và phản hồi đó chứa thông điệp lỗi cụ thể
      if (
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.response.data.message ===
          "An unexpected error occurred: Phone number already exists!"
      ) {
        errorMessage = "Số điện thoại đã tồn tại!";
      } else if (error.message) {
        // Nếu không có thông điệp lỗi cụ thể, sử dụng thông điệp lỗi chung từ Axios
        errorMessage = error.message;
      }
      // Hiển thị thông điệp lỗi
      toast({
        variant: "destructive",
        title: "Có lỗi xảy ra!",
        description: errorMessage,
        action: <ToastAction altText="undo">Ẩn</ToastAction>,
      });
      console.error("Error updating profile:", errorMessage);
    } finally {
      setLoading(false); // Stop loading regardless of the outcome
      setSubmitting(false); // Set Formik submitting to false
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          accountID: user ? user.account_id : "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          birthday: user ? user.birthday : "",
          gender: user ? user.gender : "",
          facebookUrl: user.facebooklink
            ? user.facebooklink === "string"
              ? ""
              : user.facebooklink
            : "",
          youtubeUrl: user.youtubelink
            ? user.youtubelink === "string"
              ? ""
              : user.youtubelink
            : "",
          tiktokUrl: user.tiktoklink
            ? user.tiktoklink === "string"
              ? ""
              : user.tiktoklink
            : "",
        }}
        validate={(values) => {
          const errors = {};

          // Birthday validation
          if (!values.birthday) {
            errors.birthday = "Không được để trống!";
          } else {
            // Chuyển đổi values.birthday sang đối tượng Date nếu cần
            const birthday = new Date(values.birthday);
            const today = new Date();
            // Đảm bảo rằng giờ, phút, giây và mili giây không ảnh hưởng đến so sánh
            today.setHours(0, 0, 0, 0);

            if (birthday > today) {
              errors.birthday =
                "Ngày tháng năm sinh không thể lớn hơn hoặc bằng ngày hiện tại!";
            }
          }
          // Gender validation
          if (!values.gender) {
            errors.gender = "Không được để trống!";
          }
          // PhoneNumber validation
          if (!values.phoneNumber) {
            errors.phoneNumber = "Không được để trống!";
          } else if (values.phoneNumber.length < 10) {
            errors.phoneNumber = "Số điện thoại không hợp lệ";
          } else if (
            !/((09|03|07|08|05)+([0-9]{8})\b$)/g.test(values.phoneNumber)
          ) {
            errors.phoneNumber = "Số điện thoại không hợp lệ";
          }
          // FirstName validation
          if (!values.firstName) {
            errors.firstName = "Không được để trống!";
          }
          // else if (!/^[a-zA-Z ]+$/.test(values.firstName)) {
          //   errors.firstName = "Họ không hợp lệ! Vui lòng nhập không dấu!";
          // }
          // LastName validation
          if (!values.lastName) {
            errors.lastName = "Không được để trống!";
          }
          // else if (!/^[a-zA-Z ]+$/.test(values.lastName)) {
          //   errors.lastName = "Tên không hợp lệ! Vui lòng nhập không dấu!";
          // }

          // Kiểm tra URL Facebook
          if (values.facebookUrl) {
            const facebookUrlPattern =
              /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9(\.\?)?]/;
            if (!facebookUrlPattern.test(values.facebookUrl)) {
              errors.facebookUrl =
                "Đường dẫn không hợp lệ. Vui lòng nhập lại link Facebook của bạn";
            }
          }

          // Kiểm tra URL Youtube
          if (values.youtubeUrl) {
            const youtubeUrlPattern =
              /^(https?:\/\/)?(www\.)?youtubeUrl\.com\/@([a-zA-Z0-9_\.]+)$/;
            if (!youtubeUrlPattern.test(values.youtubeUrl)) {
              errors.youtubeUrl =
                "Đường dẫn không hợp lệ. Vui lòng nhập lại link Youtube của bạn";
            }
          }

          // Kiểm tra URL tiktokUrl
          if (values.tiktokUrl) {
            const tiktokUrlPattern =
              /^(https?:\/\/)?(www\.)?tiktokUrl\.com\/@([a-zA-Z0-9_\.]+)$/;
            if (!tiktokUrlPattern.test(values.tiktokUrl)) {
              errors.tiktokUrl =
                "Đường dẫn không hợp lệ. Vui lòng nhập lại link Tiktok của bạn";
            }
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, setSubmitting, setLoading);
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
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="mb-10">
              <p className="text-2xl font-bold">Thông tin cá nhân</p>
              <p className="text-sm text-muted-foreground">
                Lưu ý: Các thông tin bị hiển thị dưới dạng mờ là thông tin hiện
                tại của bạn, vui lòng cung cấp đầy đủ thông tin để tiến hành!
              </p>
            </div>
            <div className="grid gap-4 ">
              {/* FirstName & LastName */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">Họ</Label>
                  <Input
                    id="firstName"
                    placeholder={user ? user.firstname : "Nguyen"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    autoComplete="off"
                  />
                  <p className={cn("text-sm font-medium text-destructive")}>
                    {errors.firstName && touched.firstName && errors.firstName}
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Tên</Label>
                  <Input
                    id="lastName"
                    placeholder={user ? user.lastname : "Van A"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    autoComplete="off"
                  />
                  <p className={cn("text-sm font-medium text-destructive")}>
                    {errors.lastName && touched.lastName && errors.lastName}
                  </p>
                </div>
              </div>
              {/* BirthDay & Gender */}
              {/* <div className="grid tablet:grid-cols-2 gap-4"> */}
              <div className="grid gap-2">
                {/* BirthDay */}
                <Label htmlFor="birthday">Ngày tháng năm sinh</Label>
                <BirthDayPicker
                  userDate={user ? new Date(user.birthday) : null}
                  setFieldValue={setFieldValue}
                  popOverTriggerId="birthday"
                />
                <p className={cn("text-sm font-medium text-destructive")}>
                  {errors.birthday && touched.birthday && errors.birthday}
                </p>
              </div>
              <div className="grid gap-2">
                {/* Gender */}
                <Label htmlFor="selectGender">Giới tính</Label>
                <GenderSelect
                  userGender={user ? user.gender : ""}
                  setFieldValue={setFieldValue}
                  selectTriggerId="selectGender"
                />
                <p className={cn("text-sm font-medium text-destructive")}>
                  {errors.gender && touched.gender && errors.gender}
                </p>
              </div>
              {/* </div> */}

              {/* PhoneNumber */}
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Số điện thoại</Label>
                <Input
                  id="phoneNumber"
                  type="text"
                  placeholder={
                    user ? user.phonenumber : "Nhập số điện thoại của bạn"
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  autoComplete="off"
                />
                <p className={cn("text-sm font-medium text-destructive")}>
                  {errors.phoneNumber &&
                    touched.phoneNumber &&
                    errors.phoneNumber}
                </p>
              </div>

              {/* FaceBook */}
              <div className="grid gap-2">
                <Label htmlFor="facebookUrl">Facebook Link</Label>
                <Input
                  id="facebookUrl"
                  type="text"
                  placeholder={
                    user
                      ? user.facebooklink === "string"
                        ? "Nhập đường dẫn facebook của bạn"
                        : user.facebooklink
                      : "Nhập đường dẫn facebook của bạn"
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.facebookUrl}
                  autoComplete="off"
                />
                <p className={cn("text-sm font-medium text-destructive")}>
                  {errors.facebookUrl &&
                    touched.facebookUrl &&
                    errors.facebookUrl}
                </p>
              </div>

              {/* youtubeUrl */}
              <div className="grid gap-2">
                <Label htmlFor="youtubeUrl">Youtube Link</Label>
                <Input
                  id="youtubeUrl"
                  type="text"
                  placeholder="Nhập kênh youtubeUrl của bạn"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.youtubeUrl}
                  autoComplete="off"
                />
                <p className={cn("text-sm font-medium text-destructive")}>
                  {errors.youtubeUrl && touched.youtubeUrl && errors.youtubeUrl}
                </p>
              </div>

              {/* tiktokUrl */}
              <div className="grid gap-2">
                <Label htmlFor="tiktokUrl">Tiktok Link</Label>
                <Input
                  id="tiktokUrl"
                  type="text"
                  placeholder="Nhập kênh tiktokUrl của bạn"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.tiktokUrl}
                  autoComplete="off"
                />
                <p className={cn("text-sm font-medium text-destructive")}>
                  {errors.tiktokUrl && touched.tiktokUrl && errors.tiktokUrl}
                </p>
              </div>
              <Button
                type="submit"
                onClick={handleSubmit} // This should trigger the form submission
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Lưu chỉnh sửa thông tin
                  </>
                ) : (
                  "Lưu chỉnh sửa thông tin"
                )}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
