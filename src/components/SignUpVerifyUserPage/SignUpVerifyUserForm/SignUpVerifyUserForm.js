import React from "react";
import BirthDayPicker from "../BirthDayPicker/BirthDayPicker";
import { Formik } from "formik";

export default function SignUpVerifyUserForm() {
    return (<>

        <Formik
            initialValues={{
                name: '',
                birthday: null,
                phoneNumber: "",
                email: "",
                socialMediaLink: "",
                address: "",
                role: "",
                nameOfClub: "",
                linkOfInfo: "",
                linkOfAchievement: "",
                agree: false




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
                // Email validation
                if (!values.email) {
                    errors.email = "Không được để trống!";
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = "Email không hợp lệ!";
                }

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
                <form onSubmit={handleSubmit} class="w-3/4 laptop:max-w-4xl mx-auto my-8" >
                    <div class="mb-5">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên *</label>
                        <input type="text"
                            id="name"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập tên..." />
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.name && touched.name && errors.name}</p>

                    </div>
                    <div class="mb-5">
                        <label for="dateOfBirth" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày/tháng/năm sinh * </label>
                        <div class="relative w-full ">
                            <BirthDayPicker
                                setFieldValue={setFieldValue}
                                popOverTriggerId="birthday"
                            ></BirthDayPicker>
                        </div>
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.birthday && touched.birthday && errors.birthday}</p>

                    </div>
                    <div class="mb-5">
                        <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại *</label>
                        <input type="text"
                            id="phoneNumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phoneNumber}
                            autocomplete="off"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập số điện thoại..." />
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}</p>

                    </div>
                    <div class="mb-5">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email tài khoản người dùng của tổ chức trên ứng dụng VMO (tochucthiennguyen@gmail.com) *</label>
                        <input type="email"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            autocomplete="off"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="vd: tddkhoa0811@gmail.com -> email đã đăng ký trên hệ thống" />
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.email && touched.email && errors.email}</p>

                    </div>
                    <div class="mb-5">
                        <label for="socialMediaLink" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tài khoản mạng xã hội của bạn(link)</label>
                        <input type="text"
                            id="socialMediaLink"
                            name="socialMediaLink"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.socialMediaLink}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Đường dẫn tài khoản mạng xã hội..."  />
                    </div>

                    <div class="mb-5">
                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ cư trú của bạn(Phường, Xã, Huyện, Thành phố) *</label>
                        <input type="address"
                            id="address"
                            name="address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                            autocomplete="off"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.address && touched.address && errors.address}</p>

                    </div>
                    <div class="flex items-start mb-5 flex-col">
                        <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vai trò của bạn trong CLB/Đội/Nhóm</label>

                        <div class="flex items-start mb-5 ">
                            <div class="flex items-center h-5">
                                <input
                                    id="founder"
                                    type="radio"
                                    value="founder" 
                                    name="role"
                                    checked={values.role === "founder"} 
                                    onChange={() => setFieldValue("role", "founder")} 
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <label for="founder" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nhà sáng lập</label>
                        </div>
                        <div class="flex items-start mb-5 ">
                            <div class="flex items-center h-5">
                                <input
                                    id="leader"
                                    type="radio"
                                    value="leader" 
                                    name="role"
                                    checked={values.role === "leader"} 
                                    onChange={() => setFieldValue("role", "leader")} 
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <label for="leader" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Chủ nhiệm</label>
                        </div>
                    </div>
                    <div class="mb-5">
                    <label for="nameOfClub" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên CLB/Đội/Nhóm của bạn  </label>
                        <input type="text"
                            id="nameOfClub"
                            name="nameOfClub"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.nameOfClub}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập tên..." />
                    </div>
                    <div class="mb-5">
                        <label for="linkOfInfo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-justify">Đường dẫn/link facebook, website, youtube, instagram, tiktok . . .mô tả, giới thiệu hoạt động, kinh nghiệm, kế hoạch thiện nguyện, cộng đồng đã triển khai*</label>
                        <input type="text" 
                      id="linkOfInfo"
                      name="linkOfInfo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.linkOfInfo}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                    </div>
                    <div class="mb-5">
                        <label for="linkOfAchievement" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-justify">Thành tích, khen thưởng, được ghi nhận trong hoạt động tình nguyện, cộng đồng, xã hội (Đoạn văn ngắn bao gồm đường dẫn/link hoặc đính kèm hình ảnh minh hoạ)*</label>
                        <span className="text-xs mobile:text-sm">(Chấp nhận các file ảnh, MS Word, MS Excel. Tối đa 5 file, mỗi file dung lượng tối đa 20MB)</span>
                        <input type="text"
                         id="linkOfAchievement"
                         name="linkOfAchievement"
                         onChange={handleChange}
                         onBlur={handleBlur}
                         value={values.linkOfAchievement}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                    </div>
                    <div class="mb-5 bg-orange-400 p-5 rounded-xl">
                        <span className="text-white text-sm mobile:text-xl font-semibold text-justify">Cam kết mục đích sử dụng Tài khoản thanh toán minh bạch   </span>
                    </div>

                    <div>
                        <span class="block mb-2 text-sx mobile:text-lg font-bold text-gray-900 dark:text-white text-justify">Anh chị/tổ chức cam kết sử dụng VMO cho mục đích *</span>
                        <ul className="flex flex-col gap-4 mb-2 text-sm mobile:text-base text-justify">
                            <li>- Vận động, tiếp nhận các nguồn đóng góp tự nguyện</li>
                            <li>- Vận động gây quỹ nhằm phát triển, thực hiện các dự án cộng đồng</li>
                            <li>- Để công khai minh bạch đối với nhà tài trợ, người ủng hộ, người đóng góp</li>
                            <li>- Các mục đích phi lợi nhuận khác</li>
                        </ul>

                        <span class="block mb-2 text-sx mobile:text-lg font-bold text-gray-900 dark:text-white text-justify">Anh chị/tổ chức phải đảm bảo sao kê đầy đủ thông tin hình ảnh tất cả sau khi chiến dịch kết thúc (tối thiểu 30 ngày kể từ ngày chiến dịch kết thúc)</span>

                        <span class="block mb-2 text-sx mobile:text-lg font-bold text-gray-900 dark:text-white text-justify">Anh chị/tổ chức vui lòng đọc các quy định về pháp luật dưới đây để nắm rõ *</span>
                        <ul className="flex flex-col gap-4 mb-2 text-sm mobile:text-base text-justify">
                            <li>- Nghị định 93/2021/NĐ-CP về vận động, tiếp nhận, phân phối và sử dụng các nguồn đóng góp tự nguyện hỗ trợ khắc phục khó khăn do thiên tai, dịch bệnh, sự cố; hỗ trợ bệnh nhân mắc bệnh hiểm nghèo</li>
                            <li>- Nghị định 93/2019/NĐ-CP về tổ chức, hoạt động của quỹ xã hội, quỹ từ thiện</li>
                            <li>- Thông tư 41/2022/TT-BTC hướng dẫn Chế độ kế toán áp dụng cho các hoạt động xã hội, từ thiện các quy định pháp luật liên quan</li>
                        </ul>
                        <span class="block mb-2 text-sx mobile:text-lg font-bold text-gray-900 dark:text-white text-justify">Mọi hành vi thiện nguyện trái với mục tiêu đạo đức hoặc vi phạm pháp luật phải chịu trách nhiệm bạn có:</span>
                        <div class="flex items-start mb-5">
                            <div class="flex items-center h-5">
                                <input 
                                id="agree"
                                 type="checkbox" 
                                 name="agree"
                                 checked={values.agree} 
                                 onChange={() => setFieldValue("agree", !values.agree)} 
                                 class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
                            </div>
                            <label for="agree" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Đồng ý </label>
                        </div>
                        <span class="block mb-2 text-sm font-medium text-red-600 dark:text-white text-justify">**Lưu ý: Mọi thông tin bạn điền sẽ là bằng chứng cho mọi hành vi phạm pháp của anh/chị/tổ chức trước pháp luật.</span>
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
    </>);
}
