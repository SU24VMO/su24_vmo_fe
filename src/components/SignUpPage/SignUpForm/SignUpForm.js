import React from "react";
import { Formik } from "formik";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { cn } from "../../../lib/utils";
import BirthDayPicker from "../BirthDayPicker/BirthDayPicker";
import GenderSelect from "../GenderSelect/GenderSelect";
import AccountTypeSelect from "../AccountTypeSelect/AccountTypeSelect";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthContext } from "../../../context/AuthContext";

const SignUpForm = () => {
  //State để show/hide password
  const [showPassword, setShowPassword] = React.useState(false);
  const { registerAction, loading } = React.useContext(AuthContext);
  //Function để toggle show/hide password
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          username: "",
          avatar: "string",
          phoneNumber: "",
          firstName: "",
          lastName: "",
          gender: "",
          facebookUrl: "string",
          youtubeUrl: "string",
          tiktokUrl: "string",
          birthday: null,
          accountType: "",
        }}
        validate={(values) => {
          const errors = {};
          // Email validation
          if (!values.email) {
            errors.email = "Không được để trống!";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Email không hợp lệ!";
          }
          // Password validation
          if (!values.password) {
            errors.password = "Không được để trống!";
          } else if (
            !/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/.test(
              values.password
            )
          ) {
            errors.password =
              "Mật khẩu phải bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 kỹ tự. Ví dụ: Abc@1234";
          }
          // Birthday validation
          if (!values.birthday) {
            errors.birthday = "Không được để trống!";
          }
          // Gender validation
          if (!values.gender) {
            errors.gender = "Không được để trống!";
          }
          // AccountType validation
          if (!values.accountType) {
            errors.accountType = "Không được để trống!";
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
              "Tên đăng nhập phải bao gồm chuỗi và số từ 3 đến 16 ký tự chỉ được thêm kí tự '-' hoặc '_', không được để dấu, chữ cái viết hoa. Ví dụ: abc_123";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          registerAction(
            values.email,
            values.password,
            values.username,
            values.phoneNumber,
            values.firstName,
            values.lastName,
            values.gender,
            values.avatar,
            values.facebookUrl,
            values.youtubeUrl,
            values.tiktokUrl,
            values.birthday,
            values.accountType
          );
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
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              {/* FirstName & LastName */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">Họ</Label>
                  <Input
                    id="firstName"
                    placeholder="Nguyen"
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
                    placeholder="Van A"
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
              {/* PhoneNumber */}
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Số điện thoại</Label>
                <Input
                  id="phoneNumber"
                  type="text"
                  placeholder="Nhập số điện thoại của bạn"
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
              {/* BirthDay & Gender */}
              <div className="grid tablet:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  {/* BirthDay */}
                  <Label htmlFor="birthday">Ngày tháng năm sinh</Label>
                  <BirthDayPicker
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
                    setFieldValue={setFieldValue}
                    selectTriggerId="selectGender"
                  />
                  <p className={cn("text-sm font-medium text-destructive")}>
                    {errors.gender && touched.gender && errors.gender}
                  </p>
                </div>
              </div>
              {/* Account Type */}
              <div className="grid gap-2">
                <Label htmlFor="selectAccountType">Loại tài khoản</Label>
                <AccountTypeSelect
                  setFieldValue={setFieldValue}
                  selectTriggerId="selectAccountType"
                />
                <p className={cn("text-sm font-medium text-destructive")}>
                  {errors.accountType &&
                    touched.accountType &&
                    errors.accountType}
                </p>
              </div>
              {/* UserName */}
              <div className="grid gap-2">
                <Label htmlFor="username">Tên đăng nhập</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Nhập tên đăng nhập của bạn"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  autoComplete="off"
                />
                <p className={cn("text-sm font-medium text-destructive")}>
                  {errors.username && touched.username && errors.username}
                </p>
              </div>
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Nhập email của bạn"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  autoComplete="off"
                />
                <p className={cn("text-sm font-medium text-destructive")}>
                  {errors.email && touched.email && errors.email}
                </p>
              </div>
              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Nhập mật khẩu của bạn"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    className="absolute bottom-1 right-1 h-7 w-7"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                </div>
                <p className={cn("text-sm font-medium text-destructive")}>
                  {errors.password && touched.password && errors.password}
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Tạo tài khoản
                  </>
                ) : (
                  "Tạo tài khoản"
                )}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
