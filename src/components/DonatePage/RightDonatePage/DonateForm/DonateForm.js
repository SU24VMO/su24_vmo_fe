import React from "react";
import { useFormik } from "formik";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { cn } from "../../../../lib/utils";
import { Button } from "../../../ui/button";
import { Checkbox } from "../../../ui/checkbox";
import { axiosPublic } from "../../../../api/axiosInstance";
import { CREATE_TRANSACTION } from "../../../../api/apiConstants";
import { useToast } from "../../../ui/use-toast";
import { ToastAction } from "../../../ui/toast";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import DialogDonate from "./DialogDonate/DialogDonate";
import DialogTerm from "./DialogTerm/DialogTerm";

const DonateForm = ({
  accountId,
  campaignId,
  firstname,
  lastname,
  email,
  campaignTier,
}) => {
  const [selectedAmount, setSelectedAmount] = React.useState(null);
  const [formattedValue, setFormattedValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [qrCode, setQrCode] = React.useState(null);
  const [orderId, setOrderId] = React.useState(null);
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [isTermsDialogOpen, setTermsDialogOpen] = React.useState(false);
  const [isTermsAccepted, setTermsAccepted] = React.useState(false);
  const [isFormValid, setFormValid] = React.useState(false);
  const [formValues, setFormValues] = React.useState({});
  const { toast } = useToast();

  const formatCurrency = (value) => {
    const numberValue = Number(value);
    if (isNaN(numberValue)) return "";
    return new Intl.NumberFormat("it-IT", {}).format(numberValue);
  };
  const handleButtonClick = (value, setFieldValue) => {
    setSelectedAmount(value);
    setFieldValue("price", value);
  };
  const handleMoneyDonateChange = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    formik.setFieldValue("price", numericValue);
    setFormattedValue(formatCurrency(numericValue));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        setFormValid(true);
        setTermsDialogOpen(true);
      } else {
        setFormValid(false);
        formik.handleSubmit();
      }
    });
  };

  const handleTermsConfirm = () => {
    if (isTermsAccepted) {
      setTermsDialogOpen(false);
      formik.handleSubmit();
    }
  };

  const formik = useFormik({
    initialValues: {
      note: "",
      price: "",
      isIncognito: false,
      accountId: accountId,
      campaignId: campaignId,
    },
    validate: (values) => {
      const errors = {};
      const maxAmount = 500000000;
      // price validation
      if (!values.price) {
        errors.price = "Không được để trống!";
      } else {
        const moneyDonateValue = Number(values.price);
        if (isNaN(moneyDonateValue)) {
          errors.price = "Số tiền không hợp lệ!";
        } else if (moneyDonateValue > maxAmount) {
          errors.price = `Số tiền phải nhỏ hơn ${maxAmount.toLocaleString(
            "it-IT"
          )} VND!`;
        }
      }

      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (typeof setLoading === "function") {
          setLoading(true); // Start loading
        }
        toast({
          title: "Đang xử lý...",
          description: "Vui lòng chờ trong giây lát!",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
        // Step 4: Make the API call to update the user information
        const response = await axiosPublic.post(CREATE_TRANSACTION, values);
        if (response.status === 200) {
          setOrderId(response.data.orderID);
          console.log("orderID: ", orderId);
          console.log("Thông tin donate: ", values);
          console.log("Thông tin từ donate api", response.data);
          setQrCode(response.data.qrCode);
          setFormValues(values);
          setDialogOpen(true);
        } else {
          // Handle any other status code appropriately
          toast({
            variant: "destructive",
            title: "Có lỗi xảy ra !",
            description: "Vui lòng thử lại!",
            action: <ToastAction altText="undo">Ẩn</ToastAction>,
          });
          console.log("Lấy dữ liệu từ api donate không thành công!");
        }
      } catch (error) {
        // Hiển thị thông điệp lỗi
        toast({
          variant: "destructive",
          title: "Có lỗi xảy ra!",
          description:
            error.response?.data?.message || "Đã xảy ra lỗi không xác định",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
        console.error("Lỗi lấy dữ liệu khi gọi api lấy mã QR:", error);
      } finally {
        setLoading(false); // Stop loading regardless of the outcome
        setSubmitting(false); // Set Formik submitting to false
      }
    },
  });

  React.useEffect(() => {
    setFormattedValue(formatCurrency(formik.values.price));
  }, [formik.values.price]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 tablet:gap-10 tablet:px-24 px-5">
          <p className="text-3xl text-muted-foreground font-bold">
            Thông tin ủng hộ
          </p>
          {/* price */}
          <div className="grid gap-2">
            <div>
              <Label htmlFor="price">
                Nhập số tiền ủng hộ <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="price"
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
                {formik.errors.price &&
                  formik.touched.price &&
                  formik.errors.price}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div
                onClick={() => handleButtonClick(50000, formik.setFieldValue)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  formik.values.price === 50000
                    ? "bg-green-theme-primary text-primary-foreground hover:bg-green-theme-primary/90"
                    : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                } h-10 px-4 py-2 cursor-pointer`}
              >
                50.000
              </div>
              <div
                onClick={() => handleButtonClick(100000, formik.setFieldValue)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  formik.values.price === 100000
                    ? "bg-green-theme-primary text-primary-foreground hover:bg-green-theme-primary/90"
                    : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                } h-10 px-4 py-2 cursor-pointer`}
              >
                100.000
              </div>
              <div
                onClick={() => handleButtonClick(200000, formik.setFieldValue)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  formik.values.price === 200000
                    ? "bg-green-theme-primary text-primary-foreground hover:bg-green-theme-primary/90"
                    : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                } h-10 px-4 py-2 cursor-pointer`}
              >
                200.000
              </div>
              <div
                onClick={() => handleButtonClick(500000, formik.setFieldValue)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  formik.values.price === 500000
                    ? "bg-green-theme-primary text-primary-foreground hover:bg-green-theme-primary/90"
                    : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                } h-10 px-4 py-2 cursor-pointer`}
              >
                500.000
              </div>
            </div>
          </div>
          {/* Lời chúc */}
          <div className="grid gap-2">
            <Label htmlFor="note">Lời chúc</Label>
            <Input
              id="note"
              type="note"
              name="note"
              placeholder="Nhập lời chúc trao gửi yêu thương"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.note}
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
                disabled
                defaultValue={firstname}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Tên</Label>
              <Input
                id="lastName"
                placeholder="Van A"
                disabled
                defaultValue={lastname}
              />
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
              disabled
              defaultValue={email}
            />
            <p className="text-muted-foreground text-sm">
              Bạn sẽ nhận được một email xác nhận về thông tin đóng góp của mình
            </p>
          </div>
          {/*  */}
          <div className="grid gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isIncognito"
                checked={formik.values.isIncognito}
                onCheckedChange={(checked) =>
                  formik.setFieldValue("isIncognito", checked)
                }
              />
              <label
                htmlFor="isIncognito"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Ủng hộ ẩn danh
              </label>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full text-xl py-6"
            disabled={loading}
            variant="green_theme_primary"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Ủng hộ
              </>
            ) : (
              "Ủng hộ"
            )}
          </Button>
        </div>
        <p className="text-center mt-3">
          Bằng việc ủng hộ, bạn đã đồng ý với{" "}
          <Link to="/terms" className="font-bold">
            Điều khoản sử dụng
          </Link>
        </p>
        {/* Dialog điều khoản */}
        <DialogTerm
          handleTermsConfirm={handleTermsConfirm}
          isTermsAccepted={isTermsAccepted}
          isTermsDialogOpen={isTermsDialogOpen}
          setTermsAccepted={setTermsAccepted}
          setTermsDialogOpen={setTermsDialogOpen}
        />
      </form>
      {/* Dialog chuyển tiền ủng hộ */}
      <DialogDonate
        campaignId={campaignId}
        campaignTier={campaignTier}
        email={email}
        firstname={firstname}
        isDialogOpen={isDialogOpen}
        formValues={formValues}
        lastname={lastname}
        orderId={orderId}
        qrCode={qrCode}
        setDialogOpen={setDialogOpen}
      />
    </>
  );
};

export default DonateForm;
