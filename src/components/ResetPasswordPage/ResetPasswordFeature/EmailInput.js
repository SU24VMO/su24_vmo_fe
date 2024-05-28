import React from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useFormik } from "formik";
import { cn } from "../../../lib/utils";
import { useStepper } from "../../ui/stepper";
import { useToast } from "../../ui/use-toast";

const EmailInput = () => {
  const { nextStep } = useStepper();
  const { toast } = useToast();
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
      toast({
        title: "Email vừa nhập:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-black p-4">
            <code className="text-white">
              {JSON.stringify(values, null, 2)}
            </code>{" "}
            {/* For testing*/}
          </pre>
        ),
      });
      setSubmitting(false);
      nextStep();
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
        <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
          Gửi mã xác nhận
        </Button>
      </form>
    </>
  );
};

export default EmailInput;
