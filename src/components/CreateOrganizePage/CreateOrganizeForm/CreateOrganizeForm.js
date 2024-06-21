import React from "react";
import { Formik } from "formik";
import BirthDayPicker from "../BirthDayPicker/BirthDayPicker";
import Address from "../Address/Address";

export default function CreateOrganizeForm() {
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          birthday: null,
          website: "",
          fieldOfWork: "",
          address: "",
          linkOfInfo: "",
          // emailOrganize: "",
          linkOfAchievement: "",
          // nameOfUser: "",
          // phoneNumber: "",
          // emailPersonal: "",
          agree: false,
        }}
        validate={(values) => {
          const errors = {};

          // name validation
          if (!values.name) {
            errors.name = "Không được để trống!";
          }
          // Birthday validation
          if (!values.birthday) {
            errors.birthday = "Không được để trống!";
          }
          if (!values.authorizationLetter) {
            errors.authorizationLetter = "Không được để trống!";
          }
          // Email validation
          // if (!values.emailOrganize) {
          //   errors.emailOrganize = "Không được để trống!";
          // } else if (
          //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
          //     values.emailOrganize
          //   )
          // ) {
          //   errors.emailOrganize = "Email không hợp lệ!";
          // }
          // PhoneNumber validation
          // if (!values.phoneNumber) {
          //   errors.phoneNumber = "Không được để trống!";
          // } else if (values.phoneNumber.length < 10) {
          //   errors.phoneNumber = "Số điện thoại không hợp lệ";
          // } else if (
          //   !/((09|03|07|08|05)+([0-9]{8})\b$)/g.test(values.phoneNumber)
          // ) {
          //   errors.phoneNumber = "Số điện thoại không hợp lệ";
          // }
          // Email validation
          // if (!values.emailPersonal) {
          //   errors.emailPersonal = "Không được để trống!";
          // } else if (
          //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
          //     values.emailPersonal
          //   )
          // ) {
          //   errors.emailPersonal = "Email không hợp lệ!";
          // }
          // address validation
          if (!values.address) {
            errors.address = "Không được để trống!";
          }
          // nameOfUser validation
          // if (!values.nameOfUser) {
          //   errors.nameOfUser = "Không được để trống!";
          // }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            console.log(values);
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
        }) => (
          <form
            onSubmit={handleSubmit}
            class=" w-3/4 laptop:max-w-4xl mx-auto my-8"
          >
            <div class="mb-5 ">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tên tổ chức *
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
                for="dateOfBirth"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ngày thành lập *
              </label>
              <div class="relative w-full ">
                <BirthDayPicker
                  setFieldValue={setFieldValue}
                  popOverTriggerId="birthday"
                ></BirthDayPicker>
              </div>
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {" "}
                {errors.birthday && touched.birthday && errors.birthday}
              </p>
            </div>
            <div class="mb-5">
              <label
                for="website"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Website, liên kết mạng xã hội hoặc trang tin điện tử của tổ chức
              </label>
              <input
                type="text"
                id="website"
                name="website"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.website}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Website..."
              />
            </div>
            <div class="mb-5">
              <label
                for="fieldOfWork"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Lĩnh vực hoạt động chính *
              </label>
              <input
                type="fieldOfWork"
                id="fieldOfWork"
                name="fieldOfWork"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fieldOfWork}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="vd: Kinh doanh"
              />
            </div>
            <div class="mb-5">
              <label
                for="address"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Địa chỉ trụ sở chính *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {" "}
                {errors.address && touched.address && errors.address}
              </p>
            </div>

            <div class="mb-5">
              <label
                for="linkOfInfo"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-justify"
              >
                Thông tin giới thiệu hoạt động, kinh nghiệm, kế hoạch thiện
                nguyện của tổ chức ( mục đích làm thiện nguyên của tổ chức )
              </label>
              <input
                type="text"
                id="linkOfInfo"
                name="linkOfInfo"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.linkOfInfo}
                autoComplete="off"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div class="mb-5">
              <label
                for="linkOfAchievement"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white  text-justify"
              >
                Thành tích, khen thưởng, được ghi nhận trong hoạt động tình
                nguyện, cộng đồng, xã hội (Đoạn văn ngắn bao gồm đường dẫn/link
                hoặc đính kèm hình ảnh minh hoạ)
              </label>
              <span className="text-xs mobile:text-sm">
                (Chấp nhận các file ảnh, MS Word, MS Excel. Tối đa 5 file, mỗi
                file dung lượng tối đa 20MB)
              </span>
              <input
                type="text"
                id="linkOfAchievement"
                name="linkOfAchievement"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.linkOfAchievement}
                autoComplete="off"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div class="mb-5">
              <label
                for="authorizationLetter"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white  text-justify"
              >
                Giấy ủy quyền của tổ chức *
              </label>
              <span className="text-xs mobile:text-sm">
                (Chấp nhận các file ảnh, MS Word, MS Excel. Tối đa 5 file, mỗi
                file dung lượng tối đa 20MB)
              </span>
              <input
                type="text"
                id="authorizationLetter"
                name="authorizationLetter"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.authorizationLetter}
                autoComplete="off"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {" "}
                {errors.authorizationLetter &&
                  touched.authorizationLetter &&
                  errors.authorizationLetter}
              </p>
            </div>

            {/* <div class="mb-5 bg-orange-400 p-5 rounded-xl">
              <span className="text-white text-sm mobile:text-xl font-semibold">
                Thông tin người đại diện tổ chức{" "}
              </span>
            </div>
            <div class="mb-5">
              <label
                for="nameOfUser"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Họ và tên *
              </label>
              <input
                type="text"
                id="nameOfUser"
                name="nameOfUser"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nameOfUser}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập tên..."
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {" "}
                {errors.nameOfUser && touched.nameOfUser && errors.nameOfUser}
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
                for="emailPersonal"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email cá nhân *
              </label>
              <input
                type="email"
                id="emailPersonal"
                name="emailPersonal"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emailPersonal}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="vd: tddkhoa0811@gmail.com -> email đã đăng ký trên hệ thống"
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {" "}
                {errors.emailPersonal &&
                  touched.emailPersonal &&
                  errors.emailPersonal}
              </p>
            </div> */}

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
