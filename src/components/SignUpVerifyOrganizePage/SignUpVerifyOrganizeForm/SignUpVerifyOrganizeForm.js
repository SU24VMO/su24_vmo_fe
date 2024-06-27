import React, { useContext } from "react";
import { Formik } from "formik";
import { ToastAction } from "../../../components/ui/toast";
import { axiosPrivate } from "../../../api/axiosInstance";
import { VERIFYORGANIZATIONMANAGER } from "../../../api/apiConstants";
import { useToast } from "../../../components/ui/use-toast";

import { AuthContext } from "../../../context/AuthContext";
export default function SignUpVerifyOrganizeForm() {

  const { toast } = useToast();
  const { user } = useContext(AuthContext)

  const verifyOrganizationManager = async (data) => {
    try {
      const response = await axiosPrivate.post(VERIFYORGANIZATIONMANAGER, {
        organizationManagerID: user.organization_manager_id,
        name: data.name,
        phoneNumber: data.phoneNumber,
        address: data.address,
        citizenIdentification: data.citizenIdentification,
        personalTaxCode: data.personalTaxCode,
        isAcceptTermOfUse: data.isAcceptTermOfUse

      });
      if (response.status === 200) {
        console.log(response.data);
        toast({
          title: "Tạo tổ chức thành công",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Tạo tổ chức thất bại !",
          description: "Vui lòng kiểm tra lại thông tin Tạo tổ chức !",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Tạo tổ chức thất bại !",
        description: "Vui lòng kiểm tra lại thông tin Tạo tổ chức !",
        action: <ToastAction altText="undo">Ẩn</ToastAction>,
      });
    } finally {
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          phoneNumber: "",
          address: "",
          citizenIdentification: null,
          personalTaxCode: null,
          isAcceptTermOfUse: false,
        }}
        validate={(values) => {
          const errors = {};
          // name validation
          if (!values.name) {
            errors.name = "Không được để trống!";
          }
          // citizenIdentification validation
          if (!values.citizenIdentification) {
            errors.citizenIdentification = "Không được để trống!";
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
          // address validation
          if (!values.address) {
            errors.address = "Không được để trống!";
          }
          // personalTaxCode validation
          if (!values.personalTaxCode) {
            errors.personalTaxCode = "Không được để trống!";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          verifyOrganizationManager(user.organization_manager_id, values.name, values.phoneNumber, 
            values.address , values.citizenIdentification, values.personalTaxCode, values.isAcceptTermOfUse)
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
        }) => (
          <form
            onSubmit={handleSubmit}
            class=" w-3/4 laptop:max-w-4xl mx-auto my-8"
          >
            <div class="mb-5 bg-vmo p-5 rounded-xl">
              <span className="text-white text-sm mobile:text-xl font-semibold">
                Thông tin người quản lý{" "}
              </span>
            </div>
            <div class="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Họ và tên người quản lý*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập tên..."
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {" "}
                {errors.name && touched.name && errors.name}
              </p>
            </div>
            <div class="mb-5">
              <label
                for="phoneNumber"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Số điện thoại *
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập số điện thoại..."
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {" "}
                {errors.phoneNumber &&
                  touched.phoneNumber &&
                  errors.phoneNumber}
              </p>
            </div>
            <div class="mb-5">
              <label
                for="address"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Địa chỉ *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập số điện thoại..."
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {" "}
                {errors.address && touched.address && errors.address}
              </p>
            </div>

            <div class="mb-5">
              <label
                for="citizenIdentification"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Căn Cước Công Dân *
              </label>
              <input
                type="text"
                id="citizenIdentification"
                name="citizenIdentification"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.citizenIdentification}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập số căn cước..."
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {" "}
                {errors.citizenIdentification && touched.citizenIdentification && errors.citizenIdentification}
              </p>
            </div>

            <div class="mb-5">
              <label
                for="personalTaxCode"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mã số thuế cá nhân *
              </label>
              <input
                type="text"
                id="personalTaxCode"
                name="personalTaxCode"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.personalTaxCode}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập số căn cước..."
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {" "}
                {errors.personalTaxCode &&
                  touched.personalTaxCode &&
                  errors.personalTaxCode}
              </p>
            </div>

            <div class="mb-5 bg-vmo p-5 rounded-xl">
              <span className="text-white text-sm mobile:text-xl font-semibold text-justify">
                Cam kết mục đích sử dụng Tài khoản thanh toán minh bạch{" "}
              </span>
            </div>

            <div>
              <span class="block mb-2 text-sx mobile:text-lg font-bold text-gray-900 dark:text-white text-justify ">
                Anh chị/tổ chức cam kết sử dụng VMO cho mục đích *
              </span>
              <ul className="flex flex-col gap-4 mb-2  text-sm mobile:text-base text-justify">
                <li>- Vận động, tiếp nhận các nguồn đóng góp tự nguyện</li>
                <li>
                  - Vận động gây quỹ nhằm phát triển, thực hiện các dự án cộng
                  đồng
                </li>
                <li>
                  - Để công khai minh bạch đối với nhà tài trợ, người ủng hộ,
                  người đóng góp
                </li>
                <li>- Các mục đích phi lợi nhuận khác</li>
              </ul>

              <span class="block mb-2  text-sx mobile:text-lg font-bold text-gray-900 dark:text-white text-justify">
                Anh chị/tổ chức phải đảm bảo sao kê đầy đủ thông tin hình ảnh
                tất cả sau khi chiến dịch kết thúc (tối thiểu 30 ngày kể từ ngày
                chiến dịch kết thúc)
              </span>

              <span class="block mb-2  text-sx mobile:text-lg font-bold text-gray-900 dark:text-white text-justify">
                Anh chị/tổ chức vui lòng đọc các quy định về pháp luật dưới đây
                để nắm rõ *
              </span>
              <ul className="flex flex-col gap-4 mb-2 text-sm mobile:text-base text-justify">
                <li>
                  - Nghị định 93/2021/NĐ-CP về vận động, tiếp nhận, phân phối và
                  sử dụng các nguồn đóng góp tự nguyện hỗ trợ khắc phục khó khăn
                  do thiên tai, dịch bệnh, sự cố; hỗ trợ bệnh nhân mắc bệnh hiểm
                  nghèo
                </li>
                <li>
                  - Nghị định 93/2019/NĐ-CP về tổ chức, hoạt động của quỹ xã
                  hội, quỹ từ thiện
                </li>
                <li>
                  - Thông tư 41/2022/TT-BTC hướng dẫn Chế độ kế toán áp dụng cho
                  các hoạt động xã hội, từ thiện các quy định pháp luật liên
                  quan
                </li>
              </ul>
              <span class="block mb-2  text-sx mobile:text-lg font-bold text-gray-900 dark:text-white text-justify">
                Mọi hành vi thiện nguyện trái với mục tiêu đạo đức hoặc vi phạm
                pháp luật phải chịu trách nhiệm bạn có:
              </span>
              <div class="flex items-start mb-5">
                <div class="flex items-center h-5">
                  <input
                    id="isAcceptTermOfUse"
                    type="checkbox"
                    name="isAcceptTermOfUse"
                    checked={values.isAcceptTermOfUse}
                    onChange={() => setFieldValue("isAcceptTermOfUse", !values.isAcceptTermOfUse)}
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <label
                  for="isAcceptTermOfUse"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Đồng ý{" "}
                </label>
              </div>
              <span class="block mb-2 text-sm font-medium text-red-600 dark:text-white text-justify">
                **Lưu ý: Mọi thông tin bạn điền sẽ là bằng chứng cho mọi hành vi
                phạm pháp của anh/chị/tổ chức trước pháp luật.
              </span>
            </div>

            <div className="flex justify-end">
              {values.isAcceptTermOfUse ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full mobile:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-4"
                >
                  Gửi
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="text-white bg-gray-400 cursor-not-allowed focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full mobile:w-auto px-5 py-2.5 text-center dark:bg-gray-500 dark:focus:ring-gray-700 my-4"
                >
                  Gửi
                </button>
              )}
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
