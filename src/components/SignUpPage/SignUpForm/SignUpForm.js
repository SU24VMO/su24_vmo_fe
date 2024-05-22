import React from "react";
import { Formik } from "formik";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { cn } from "../../../lib/utils";
import BirthDayPicker from "../BirthDayPicker/BirthDayPicker";
import GenderSelect from "../GenderSelect/GenderSelect";

const SignUpForm = () => {
  return (
    <div className="flex flex-col items-center justify-between p-24">
      <p>SignUpForm</p>
      <Formik
        initialValues={{ email: "", password: "", birthday: null, gender: "" }}
        validate={(values) => {
          const errors = {};
          // Email validation
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          // Password validation
          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
          }
          // Birthday validation
          if (!values.birthday) {
            errors.birthday = "Required";
          }
          // Gender validation
          if (!values.gender) {
            errors.gender = "Required";
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <p className={cn("text-sm font-medium text-destructive")}>
              {errors.email && touched.email && errors.email}
            </p>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <p className={cn("text-sm font-medium text-destructive")}>
              {errors.password && touched.password && errors.password}
            </p>
            {/* BirthDay */}
            <div className="flex flex-col">
              <Label htmlFor="birthday">Ngày tháng năm sinh</Label>
              <BirthDayPicker
                setFieldValue={setFieldValue}
                popOverTriggerId="birthday"
              />
              <p className={cn("text-sm font-medium text-destructive")}>
                {errors.birthday && touched.birthday && errors.birthday}
              </p>
            </div>
            {/* Gender */}
            <div className="flex flex-col">
              <Label htmlFor="selectGender">Giới tính</Label>
              <GenderSelect
                setFieldValue={setFieldValue}
                selectTriggerId="selectGender"
              />
            </div>
            <p className={cn("text-sm font-medium text-destructive")}>
              {errors.gender && touched.gender && errors.gender}
            </p>
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
