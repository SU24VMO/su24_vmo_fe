import React from "react";
import { Formik, useFormik } from "formik";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { cn } from "../../../../lib/utils";
import { Button } from "../../../ui/button";
import { Checkbox } from "../../../ui/checkbox";

const DonateForm = () => {
  const [selectedAmount, setSelectedAmount] = React.useState(null);
  const [formattedValue, setFormattedValue] = React.useState("");

  const formatCurrency = (value) => {
    const numberValue = Number(value);
    if (isNaN(numberValue)) return "";
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "VND",
    }).format(numberValue);
  };
  const handleButtonClick = (value, setFieldValue) => {
    setSelectedAmount(value);
    setFieldValue("moneyDonate", value);
  };
  const handleMoneyDonateChange = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    formik.setFieldValue("moneyDonate", numericValue);
    setFormattedValue(formatCurrency(numericValue));
  };

  const formik = useFormik({
    initialValues: {
      moneyDonate: "",
      wish: "",
      firstName: "",
      lastName: "",
      email: "",
      isAnonymously: false,
    },
    validate: (values) => {
      const errors = {};
      // Email validation
      if (!values.email) {
        errors.email = "Không được để trống!";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Email không hợp lệ!";
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
      // moneyDonate validation
      if (!values.moneyDonate) {
        errors.moneyDonate = "Không được để trống!";
      }

      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    },
  });
  React.useEffect(() => {
    setFormattedValue(formatCurrency(formik.values.moneyDonate));
  }, [formik.values.moneyDonate]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-4 tablet:gap-10 tablet:px-24">
          <p className="text-3xl text-muted-foreground font-bold">
            Thông tin ủng hộ
          </p>
          {/* moneyDonate */}
          <div className="grid gap-2">
            <div>
              <Label htmlFor="moneyDonate">
                Nhập số tiền ủng hộ <span className="text-destructive">*</span>
              </Label>
              <Input
                id="moneyDonate"
                type="text"
                inputMode="numeric"
                maxLength="15"
                placeholder="Nhập số tiền ủng hộ của bạn"
                onChange={handleMoneyDonateChange}
                onBlur={formik.handleBlur}
                value={formattedValue}
              />
              <p className={cn("text-sm font-medium text-destructive")}>
                {formik.errors.moneyDonate &&
                  formik.touched.moneyDonate &&
                  formik.errors.moneyDonate}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div
                onClick={() => handleButtonClick(50000, formik.setFieldValue)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  selectedAmount === 50000
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                } h-10 px-4 py-2 cursor-pointer`}
              >
                50.000
              </div>
              <div
                onClick={() => handleButtonClick(100000, formik.setFieldValue)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  selectedAmount === 100000
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                } h-10 px-4 py-2 cursor-pointer`}
              >
                100.000
              </div>
              <div
                onClick={() => handleButtonClick(200000, formik.setFieldValue)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  selectedAmount === 200000
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                } h-10 px-4 py-2 cursor-pointer`}
              >
                200.000
              </div>
              <div
                onClick={() => handleButtonClick(500000, formik.setFieldValue)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  selectedAmount === 500000
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                } h-10 px-4 py-2 cursor-pointer`}
              >
                500.000
              </div>
            </div>
          </div>
          {/* Lời chúc */}
          <div className="grid gap-2">
            <Label htmlFor="wish">Lời chúc</Label>
            <Input
              id="wish"
              type="wish"
              name="wish"
              placeholder="Nhập lời chúc trao gửi yêu thương"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.wish}
            />
          </div>
          <p className="text-3xl text-muted-foreground font-bold">
            Thông tin của bạn
          </p>
          {/* FirstName & LastName */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">Họ</Label>
              <Input
                id="firstName"
                placeholder="Nguyen"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              <p className={cn("text-sm font-medium text-destructive")}>
                {formik.errors.firstName &&
                  formik.touched.firstName &&
                  formik.errors.firstName}
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Tên</Label>
              <Input
                id="lastName"
                placeholder="Van A"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              <p className={cn("text-sm font-medium text-destructive")}>
                {formik.errors.lastName &&
                  formik.touched.lastName &&
                  formik.errors.lastName}
              </p>
            </div>
          </div>
          {/* Email */}
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
              Bạn sẽ nhận được một email xác nhận về thông tin đóng góp của mình
            </p>
            <p className={cn("text-sm font-medium text-destructive")}>
              {formik.errors.email &&
                formik.touched.email &&
                formik.errors.email}
            </p>
          </div>
          {/*  */}
          <div className="grid gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isAnonymously"
                checked={formik.values.isAnonymously}
                onCheckedChange={(checked) =>
                  formik.setFieldValue("isAnonymously", checked)
                }
              />
              <label
                htmlFor="isAnonymously"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Ủng hộ ẩn danh
              </label>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={formik.isSubmitting}
          >
            Ủng hộ
          </Button>
        </div>
      </form>
    </>
  );
};

export default DonateForm;
