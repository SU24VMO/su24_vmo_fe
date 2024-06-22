import React, { useContext } from "react";
import { Formik } from "formik";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "../../lib/utils";
import BirthDayPicker from "./BirthDayPicker/BirthDayPicker";
import GenderSelect from "./GenderSelect/GenderSelect";
import { AuthContext } from "../../context/AuthContext";
export default function EditProfileForm() {
  const { user } = useContext(AuthContext);
  console.log("User bên context: ", user);
  // console.log("User date lấy ra : ", new Date(user.birthday));
  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          username: "",
          birthday: null,
          gender: "",
          phoneNumber: "",
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
          // UserName validation
          if (!values.username) {
            errors.username = "Không được để trống!";
          } else if (!/^[a-z0-9_-]{3,16}$/.test(values.username)) {
            errors.username =
              "Tên đăng nhập phải bao gồm chuỗi và số từ 3 đến 16 ký tự chỉ được thêm kí tự '-' hoặc '_', không được để dấu chữ cái. Ví dụ: abc_123";
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
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
              {/* UserName */}
              <div className="grid gap-2">
                <Label htmlFor="username">Tên đăng nhập</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder={
                    user ? user.username : "Nhập tên đăng nhập của bạn"
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  autoComplete="off"
                />
                <p className={cn("text-sm font-medium text-destructive")}>
                  {errors.username && touched.username && errors.username}
                </p>
              </div>
              {/* BirthDay & Gender */}
              <div className="grid tablet:grid-cols-2 gap-4">
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
              </div>

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
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Lưu chỉnh sửa thông tin
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
