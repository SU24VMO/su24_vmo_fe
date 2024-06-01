/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useFormik } from "formik";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { cn } from "../../../../lib/utils";
import { Button } from "../../../ui/button";
import { Checkbox } from "../../../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";
import { useMediaQuery } from "../../../../hooks/use-media-query";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../../../ui/drawer";
import img_placeholder from "../../../../assets/images/placeholder.svg";
import logo_vietQR from "../../../../assets/images/logo_vietqr.png";
import logo_napas from "../../../../assets/images/logo_napas.png";
import { Separator } from "../../../ui/separator";
import { CopyButton } from "./CopyButton";
import { ButtonStatusDonate } from "./ButtonStatusDonate";

const DonateForm = () => {
  const [selectedAmount, setSelectedAmount] = React.useState(null);
  const [formattedValue, setFormattedValue] = React.useState("");
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState({});
  const isDesktop = useMediaQuery("(min-width: 768px)");

  React.useEffect(() => {
    console.log("====================================");
    console.log("Form value lấy được: ", formValues);
    console.log("====================================");
  }, [formValues]); // This effect runs whenever formValues changes

  const formatCurrency = (value) => {
    const numberValue = Number(value);
    if (isNaN(numberValue)) return "";
    return new Intl.NumberFormat("it-IT", {
      // style: "currency",
      // currency: "VND",
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
      const maxAmount = 500000000;
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
      } else {
        const moneyDonateValue = Number(values.moneyDonate);
        if (isNaN(moneyDonateValue)) {
          errors.moneyDonate = "Số tiền không hợp lệ!";
        } else if (moneyDonateValue > maxAmount) {
          errors.moneyDonate = `Số tiền phải nhỏ hơn ${maxAmount.toLocaleString(
            "it-IT"
          )} VND!`;
        }
      }

      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      // setTimeout(() => {
      //   alert(JSON.stringify(values, null, 2)); // For testing
      //   setSubmitting(false);
      // }, 400);
      setFormValues(values);
      setDialogOpen(true);
      setSubmitting(false);
    },
  });
  React.useEffect(() => {
    setFormattedValue(formatCurrency(formik.values.moneyDonate));
  }, [formik.values.moneyDonate]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-4 tablet:gap-10 tablet:px-24 px-5">
          <p className="text-3xl text-muted-foreground font-bold">
            Thông tin ủng hộ
          </p>
          {/* moneyDonate */}
          <div className="grid gap-2">
            <div>
              <Label htmlFor="moneyDonate">
                Nhập số tiền ủng hộ <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="moneyDonate"
                  type="text"
                  inputMode="numeric"
                  maxLength="15"
                  placeholder="Nhập số tiền ủng hộ của bạn"
                  onChange={handleMoneyDonateChange}
                  onBlur={formik.handleBlur}
                  value={formattedValue}
                  className="font-bold text-2xl py-8 my-3"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span
                    className="text-gray-600 font-semibold sm:text-sm"
                    id="price-currency"
                  >
                    VND
                  </span>
                </div>
              </div>

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
                  formik.values.moneyDonate === 50000
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                } h-10 px-4 py-2 cursor-pointer`}
              >
                50.000
              </div>
              <div
                onClick={() => handleButtonClick(100000, formik.setFieldValue)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  formik.values.moneyDonate === 100000
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                } h-10 px-4 py-2 cursor-pointer`}
              >
                100.000
              </div>
              <div
                onClick={() => handleButtonClick(200000, formik.setFieldValue)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  formik.values.moneyDonate === 200000
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                } h-10 px-4 py-2 cursor-pointer`}
              >
                200.000
              </div>
              <div
                onClick={() => handleButtonClick(500000, formik.setFieldValue)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  formik.values.moneyDonate === 500000
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
            className="w-full text-xl py-6"
            disabled={formik.isSubmitting}
          >
            Ủng hộ
          </Button>
        </div>
        <p className="text-center mt-3">
          Bằng việc ủng hộ, bạn đã đồng ý với{" "}
          <a href="#." className="font-bold">
            Điều khoản sử dụng
          </a>
        </p>
      </form>
      {isDesktop ? (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="w-full text-2xl">Thanh Toán</DialogTitle>
              <blockquote className="mt-6 border-l-2 pl-6 italic">
                "Vì một cộng đồng không ai bị bỏ lại phía sau"
              </blockquote>
              <DialogDescription className="text-xl">
                Cảm ơn bạn đã ủng hộ, bạn có thể chuyển khoản theo thông tin
                dưới đây:
              </DialogDescription>
              <Separator />
            </DialogHeader>
            <div className="grid grid-cols-3 w-full h-full">
              <div className="col-span-2">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <p className="text-sm w-[40%]">Ngân hàng:</p>
                  <p className="text-sm font-bold w-[60%]">
                    Ngân hàng TMCP Quân Đội (MB Bank)
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <p className="text-sm w-[40%]">Chủ tài khoản thiện nguyện:</p>
                  <p className="text-sm font-bold w-[60%]">150</p>
                </div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <p className="text-sm w-[40%]">Chủ tài khoản:</p>
                  <p className="text-sm font-bold w-[60%]">CHAU NHAT TRUONG</p>
                </div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <p className="text-sm w-[40%]">Số tiền:</p>
                  <p className="text-sm font-bold w-[60%]">
                    {formatCurrency(formValues.moneyDonate)} VND
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <p className="text-sm w-[40%]">Nội dung chuyển khoản:</p>
                  <div className="w-[60%] flex items-center gap-x-1">
                    <p className="text-sm font-bold ">
                      UH2J2DNJIIU5RW 'TTK_viettat' 2024
                    </p>
                    <CopyButton code={"UH2J2DNJIIU5RW 'TTK_viettat' 2024"} />
                  </div>
                </div>
                <p className="text-sm text-center text-muted-foreground italic">
                  Vui lòng sao chép mã này vào nội dung chuyển khoản để chúng
                  tôi nhận ra ủng hộ của bạn <br />
                  <b>Lưu ý: Mã chỉ hoạt động một lần trên mỗi chuyển khoản</b>
                </p>
              </div>
              <div className="col-span-1 place-self-center">
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="max-w-40">
                    <img
                      src={img_placeholder}
                      alt="Image"
                      width="160"
                      height="160"
                      className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale block"
                    />
                    <div className="flex items-center">
                      <div className="self-start w-2/4 mr-4">
                        <img
                          src={logo_vietQR}
                          alt="logo_vietQR"
                          className="w-full h-auto"
                        />
                      </div>
                      <div className="self-end w-2/4">
                        <img
                          src={logo_napas}
                          alt="logo_napas"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-center text-muted-foreground italic">
                    Sử dụng ứng dụng ngân hàng hoặc ứng dụng thanh toán hỗ trợ
                    QR code để quét mã
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <ButtonStatusDonate />
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Thanh Toán</DrawerTitle>
              <DrawerDescription>
                Cảm ơn bạn đã ủng hộ, chúng tôi đã nhận được thông tin của bạn.
                Bạn có thể chuyển khoản theo thông tin dưới đây:
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col items-center justify-center px-3">
              <div className="flex flex-col items-center justify-center w-full">
                <div className="max-w-40">
                  <img
                    src={img_placeholder}
                    alt="Image"
                    width="160"
                    height="160"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale block"
                  />
                  <div className="flex items-center">
                    <div className="self-start w-2/4 mr-4">
                      <img
                        src={logo_vietQR}
                        alt="logo_vietQR"
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="self-end w-2/4">
                      <img
                        src={logo_napas}
                        alt="logo_napas"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-center text-muted-foreground italic">
                  Sử dụng ứng dụng ngân hàng hoặc ứng dụng thanh toán hỗ trợ QR
                  code để quét mã
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <p className="text-sm">Ngân hàng:</p>
                  <p className="text-sm font-bold">
                    Ngân hàng TMCP Quân Đội (MB Bank)
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <p className="text-sm">Chủ tài khoản thiện nguyện:</p>
                  <p className="text-sm font-bold">150</p>
                </div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <p className="text-sm">Chủ tài khoản:</p>
                  <p className="text-sm font-bold">CHAU NHAT TRUONG</p>
                </div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <p className="text-sm">Số tiền:</p>
                  <p className="text-sm font-bold">
                    {formatCurrency(formValues.moneyDonate)} VND
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <p className="text-sm">Nội dung chuyển khoản:</p>
                  <div className="flex items-center gap-x-1">
                    <p className="text-sm font-bold ">
                      UH2J2DNJIIU5RW 'TTK_viettat' 2024
                    </p>
                    <CopyButton code={"UH2J2DNJIIU5RW 'TTK_viettat' 2024"} />
                  </div>
                </div>
                <p className="text-sm text-center text-muted-foreground italic">
                  Vui lòng sao chép mã này vào nội dung chuyển khoản để chúng
                  tôi nhận ra ủng hộ của bạn
                  <br />
                  <b>Lưu ý: Mã chỉ hoạt động một lần trên mỗi chuyển khoản</b>
                </p>
              </div>
              <div className="my-3">
                <ButtonStatusDonate />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default DonateForm;
