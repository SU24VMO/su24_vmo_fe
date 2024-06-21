import React, { useContext, useState } from "react";
import { Formik } from "formik";
import FoundingDatePicker from "../FoundingDatePicker/FoundingDatePicker";
import { ToastAction } from "../../../components/ui/toast";
import { axiosPrivate } from "../../../api/axiosInstance";
import { CREATEORGANIZATION } from "../../../api/apiConstants";
import { useToast } from "../../../components/ui/use-toast";

import { AuthContext } from "../../../context/AuthContext";

export default function CreateOrganizeForm() {
  const { toast } = useToast();
  const { user } = useContext(AuthContext)

  const [file, setFile] = useState();

  function handleLogoChange(e, setFieldValue) {
    console.log("File ảnh đại diện vừa chọn: ", e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setFieldValue('Logo', file);
  }



  const createOrganization = async (data) => {
    try {
      const response = await axiosPrivate.post(CREATEORGANIZATION +
        `?organizationManagerId=${data.organizationManagerId}&OrganizationName=${data.OrganizationName}
        &OrganizationManagerEmail=${data.OrganizationManagerEmail}&OrganizationTaxCode=${data.OrganizationTaxCode}
        &FoundingDate=${data.FoundingDate}&SocialMediaLink=${data.SocialMediaLink}&AreaOfActivity=${data.AreaOfActivity}
        &Address=${data.Address}&PlanInformation=${data.PlanInformation}&AchievementLink=${data.AchievementLink}
        &AuthorizationDocuments=${data.AuthorizationDocuments}`, { Logo: data.Logo });
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
          OrganizationName: "",
          OrganizationManagerEmail: "",
          FoundingDate: null,
          OrganizationTaxCode: "",
          SocialMediaLink: "",
          AreaOfActivity: "",
          Address: "",
          PlanInformation: "",
          AchievementLink: "",
          Logo: null,
          AuthorizationDocuments: "",
          agree: false,
        }}
        validate={(values) => {
          const errors = {};

          // OrganizationName  validation
          if (!values.OrganizationName) {
            errors.OrganizationName = "Không được để trống!";
          }
          // FoundingDate  validation
          if (!values.FoundingDate) {
            errors.FoundingDate = "Không được để trống!";
          }
          if (!values.AuthorizationDocuments) {
            errors.AuthorizationDocuments = "Không được để trống!";
          }
          // OrganizationTaxCode  validation
          if (!values.OrganizationTaxCode) {
            errors.OrganizationTaxCode = "Không được để trống!";
          }
          // Email validation
          if (!values.OrganizationManagerEmail) {
            errors.OrganizationManagerEmail = "Không được để trống!";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
              values.OrganizationManagerEmail
            )
          ) {
            errors.OrganizationManagerEmail = "Email không hợp lệ!";
          }
          // OrganizationTaxCode validation
          if (!values.OrganizationTaxCode) {
            errors.OrganizationTaxCode = "Không được để trống!";
          } else if (values.OrganizationTaxCode.length < 10) {
            errors.OrganizationTaxCode = "Số thuế không hợp lệ";
          } else if (
            !/((09|03|07|08|05)+([0-9]{8})\b$)/g.test(values.OrganizationTaxCode)
          ) {
            errors.OrganizationTaxCode = "Số thuế không hợp lệ";
          }
          // Address validation
          if (!values.Address) {
            errors.Address = "Không được để trống!";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          createOrganization(user.organization_manager_id, values.OrganizationName, values.OrganizationManagerEmail, values.OrganizationTaxCode, values.FoundingDate, values.SocialMediaLink, values.AreaOfActivity, values.Address, values.PlanInformation, values.AchievementLink, values.AuthorizationDocuments, values.Logo)
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
            <div class="mb-5 ">
              <label
                for="OrganizationName "
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tên tổ chức *
              </label>
              <input
                type="text"
                id="OrganizationName"
                name="OrganizationName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.OrganizationName}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập tên..."
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {" "}
                {errors.OrganizationName && touched.OrganizationName && errors.OrganizationName}
              </p>
            </div>
            <div class="mb-5 ">
              <label
                for="OrganizationManagerEmail"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email *
              </label>
              <input
                type="text"
                id="OrganizationManagerEmail"
                name="OrganizationManagerEmail"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.OrganizationManagerEmail}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập email..."
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {" "}
                {errors.OrganizationManagerEmail && touched.OrganizationManagerEmail && errors.OrganizationManagerEmail}
              </p>
            </div>
            <div class="mb-5">
              <label
                for="OrganizationTaxCode"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mã số thuế doanh nghiệp *
              </label>
              <input
                type="text"
                id="OrganizationTaxCode"
                name="OrganizationTaxCode"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.OrganizationTaxCode}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập số mã số thuế..."
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {" "}
                {errors.OrganizationTaxCode &&
                  touched.OrganizationTaxCode &&
                  errors.OrganizationTaxCode}
              </p>
            </div>

            <div class="mb-5">
              <label
                for="FoundingDate"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ngày thành lập *
              </label>
              <div class="relative w-full ">
                <FoundingDatePicker
                  setFieldValue={setFieldValue}
                  popOverTriggerId="FoundingDate"
                ></FoundingDatePicker>
              </div>
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {" "}
                {errors.FoundingDate && touched.FoundingDate && errors.FoundingDate}
              </p>
            </div>
            <div class="mb-5">
              <label
                for="SocialMediaLink"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                SocialMediaLink, liên kết mạng xã hội hoặc trang tin điện tử của tổ chức
              </label>
              <input
                type="text"
                id="SocialMediaLink"
                name="SocialMediaLink"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.SocialMediaLink}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="SocialMediaLink..."
              />
            </div>
            <div class="mb-5">
              <label
                for="AreaOfActivity"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Lĩnh vực hoạt động chính
              </label>
              <input
                type="AreaOfActivity"
                id="AreaOfActivity"
                name="AreaOfActivity"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.AreaOfActivity}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="vd: Kinh doanh"
              />
            </div>
            <div class="mb-5">
              <label
                for="Address"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Địa chỉ trụ sở chính *
              </label>
              <input
                type="text"
                id="Address"
                name="Address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Address}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {" "}
                {errors.Address && touched.Address && errors.Address}
              </p>
            </div>

            <div class="mb-5">
              <label
                for="PlanInformation"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-justify"
              >
                Thông tin giới thiệu hoạt động, kinh nghiệm, kế hoạch thiện
                nguyện của tổ chức ( mục đích làm thiện nguyên của tổ chức )
              </label>
              <textarea
                type="text"
                id="PlanInformation"
                name="PlanInformation"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.PlanInformation}
                autocomplete="off"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div class="mb-5">
              <label
                for="AchievementLink"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white  text-justify"
              >
                Thành tích, khen thưởng, được ghi nhận trong hoạt động tình
                nguyện, cộng đồng, xã hội (Đoạn văn ngắn bao gồm đường dẫn/link
                hoặc đính kèm hình ảnh minh hoạ)
              </label>

              <input
                type="text"
                id="AchievementLink"
                name="AchievementLink"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.AchievementLink}
                autocomplete="off"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div class="mb-5">
              <label
                for="AuthorizationDocuments"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white  text-justify"
              >
                Giấy ủy quyền của tổ chức *
              </label>

              <input
                type="text"
                id="AuthorizationDocuments"
                name="AuthorizationDocuments"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.AuthorizationDocuments}
                autocomplete="off"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {" "}
                {errors.AuthorizationDocuments &&
                  touched.AuthorizationDocuments &&
                  errors.AuthorizationDocuments}
              </p>
            </div>
            <div class="mb-5">
              <div className="">
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="Logo"
                  >
                    Vui lòng chọn ảnh Logo tổ chức(công ty)
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="Logo_help"
                    id="Logo"
                    type="file"
                    name="Logo"
                    onChange={(e) => { handleLogoChange(e, setFieldValue) }}
                  />
                  <p
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="Logo_help"
                  >
                    SVG, PNG, JPG or GIF (MAX. 800x400px).
                  </p>
                </div>
              </div>
            </div>



            <div class="mb-5 bg-orange-400 p-5 rounded-xl">
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
                    id="agree"
                    type="checkbox"
                    name="agree"
                    checked={values.agree}
                    onChange={() => setFieldValue("agree", !values.agree)}
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <label
                  for="agree"
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
              {values.agree ? (
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
