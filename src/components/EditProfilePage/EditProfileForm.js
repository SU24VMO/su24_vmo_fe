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
import { GET_ACCOUNT_BY_ID, UPDATE_INFORMATION } from "../../api/apiConstants";
import { axiosPrivate } from "../../api/axiosInstance";
import { Loader2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
export default function EditProfileForm() {
  const { toast } = useToast();
  const { user, updateUserInformation } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  console.log("User bên context: ", user);

  // Handle form submission
  async function handleSubmit(values, setSubmitting, setLoading) {
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
          values.faceBook,
          values.tiktok,
          values.youtube
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
      // Handle error (e.g., show an error message)
      toast({
        variant: "destructive",
        title: "Có lỗi xảy ra !",
        description: "Vui lòng thử lại!",
        action: <ToastAction altText="undo">Ẩn</ToastAction>,
      });
      console.error("Error updating profile:", error);
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
          birthday: "",
          gender: user ? user.gender : "",
          faceBook: "",
          youtube: "",
          tiktok: "",
        }}
        validate={(values) => {
          const errors = {};

          // Birthday validation
          if (!values.birthday) {
            errors.birthday = "Không được để trống!";
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
          } else if (!/^[a-zA-Z ]+$/.test(values.firstName)) {
            errors.firstName = "Họ không hợp lệ! Vui lòng nhập không dấu!";
          }
          // LastName validation
          if (!values.lastName) {
            errors.lastName = "Không được để trống!";
          } else if (!/^[a-zA-Z ]+$/.test(values.lastName)) {
            errors.lastName = "Tên không hợp lệ! Vui lòng nhập không dấu!";
          }

          // Kiểm tra URL Facebook
          if (values.faceBook) {
            const facebookUrlPattern =
              /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9(\.\?)?]/;
            if (!facebookUrlPattern.test(values.faceBook)) {
              errors.faceBook =
                "Đường dẫn không hợp lệ. Vui lòng nhập lại link Facebook của bạn";
            }
          }

          // Kiểm tra URL Youtube
          if (values.youtube) {
            const youtubeUrlPattern =
              /^(https?:\/\/)?(www\.)?youtube\.com\/@([a-zA-Z0-9_\.]+)$/;
            if (!youtubeUrlPattern.test(values.youtube)) {
              errors.youtube =
                "Đường dẫn không hợp lệ. Vui lòng nhập lại link Youtube của bạn";
            }
          }

          // Kiểm tra URL tiktok
          if (values.tiktok) {
            const tiktokUrlPattern =
              /^(https?:\/\/)?(www\.)?tiktok\.com\/@([a-zA-Z0-9_\.]+)$/;
            if (!tiktokUrlPattern.test(values.tiktok)) {
              errors.tiktok =
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
            <p className="text-2xl font-bold mb-10">Thông tin cá nhân</p>
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
                <Label htmlFor="faceBook">Facebook Link</Label>
                <Input
                  id="faceBook"
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
                  value={values.faceBook}
                  autoComplete="off"
                />
                <p className={cn("text-sm font-medium text-destructive")}>
                  {errors.faceBook && touched.faceBook && errors.faceBook}
                </p>
              </div>

              {/* youtube */}
              <div className="grid gap-2">
                <Label htmlFor="youtube">Youtube Link</Label>
                <Input
                  id="youtube"
                  type="text"
                  placeholder="Nhập kênh youtube của bạn"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.youtube}
                  autoComplete="off"
                />
                <p className={cn("text-sm font-medium text-destructive")}>
                  {errors.youtube && touched.youtube && errors.youtube}
                </p>
              </div>

              {/* tiktok */}
              <div className="grid gap-2">
                <Label htmlFor="tiktok">Tiktok Link</Label>
                <Input
                  id="tiktok"
                  type="text"
                  placeholder="Nhập kênh tiktok của bạn"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.tiktok}
                  autoComplete="off"
                />
                <p className={cn("text-sm font-medium text-destructive")}>
                  {errors.tiktok && touched.tiktok && errors.tiktok}
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
