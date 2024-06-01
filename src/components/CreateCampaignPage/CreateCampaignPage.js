import React, { useState } from "react";
import TypeOfCampaignSelect from "./TypeOfCampaignSelect/TypeOfCampaignSelect";
import EndDayPicker from "./EndDayPicker/EndDayPicker";
import StartDayPicker from "./StartDayPicker/StartDayPicker";
import { Formik } from "formik";

export default function CreateCampaignPage() {

    const [fileImageBackground, setFileImageBackground] = useState();

    function handleImageBackgroundChange(e, setFieldValue) {
        console.log(e.target.files);
        setFileImageBackground(URL.createObjectURL(e.target.files[0]));
        setFieldValue("imageBackgroundFile", URL.createObjectURL(e.target.files[0]));

    }
    function handleImageQRCode(e, setFieldValue) {
        console.log(e.target.files);
        setFieldValue("imageQRCode", URL.createObjectURL(e.target.files[0]));

    }
    function handleImageLocalDocument(e, setFieldValue) {
        console.log(e.target.files);
        setFieldValue("imageLocalDocument", URL.createObjectURL(e.target.files[0]));

    }
    function removeImage(e, setFieldValue) {
        setFileImageBackground('');
        setFieldValue("imageBackgroundFile", null);

    }



    const formatAmount = (value) => {
        // Remove non-digit characters from the input value
        const cleanValue = value.replace(/\D/g, '');
        // Format the value with thousand separators
        const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return formattedValue;
    };
    // Handle change for targetAmount input
    const handleTargetAmountChange = (e, setFieldValue) => {
        const formattedValue = formatAmount(e.target.value);
        // Update the targetAmount value with the formatted value
        setFieldValue("targetAmount", formattedValue);
    };
    return (<>

        <Formik
            initialValues={{
                startDate: null,
                endDate: null,
                typeOfCampaign: "",
                nameOfBank: "",
                nameOfUserBank: "",
                numberOfBankAccount: "",
                targetAmount: "",
                nameOfCampaign: "",
                address: "",
                imageBackgroundFile: null,
                description: "",
                imageQRCode: null,
                imageLocalDocument: null


            }}
            validate={(values) => {
                const errors = {};
                var today = new Date();
                today.setHours(0, 0, 0, 0); // Đặt giờ phút giây về 0 để so sánh chính xác hơn
                var startDate = new Date(values.startDate);
                var endDate = new Date(values.endDate);
                var thirtyDaysFromToday = new Date();
                thirtyDaysFromToday.setDate(today.getDate() + 30);

                // Kiểm tra ngày bắt đầu
                if (!values.startDate) {
                    errors.startDate = "Không được để trống!";
                } else {
                    if (startDate < today) {
                        errors.startDate = "Ngày không được nằm trong quá khứ!";
                    }
                }

                // Kiểm tra ngày kết thúc
                if (!values.endDate) {
                    errors.endDate = "Không được để trống!";
                } else {
                    if (endDate <= today) {
                        errors.endDate = "Ngày kết thúc phải diễn ra trong tương lai!";
                    } else if (endDate <= startDate) {
                        errors.endDate = "Ngày kết thúc phải lớn hơn ngày bắt đầu!";
                    } else if (endDate < thirtyDaysFromToday) {
                        errors.endDate = "Ngày kết thúc phải lớn hơn ngày hiện tại ít nhất 30 ngày!";
                    } else if ((endDate - startDate) / (1000 * 60 * 60 * 24) < 30) {
                        errors.endDate = "Ngày kết thúc và ngày bắt đầu phải cách nhau ít nhất 30 ngày!";
                    }
                }

                // Kiểm tra sự khác biệt giữa ngày bắt đầu và ngày kết thúc ít nhất 30 ngày
                if (startDate && endDate && (endDate - startDate) / (1000 * 60 * 60 * 24) < 30) {
                    errors.startDate = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc ít nhất 30 ngày!";
                    errors.endDate = "Ngày kết thúc và ngày bắt đầu phải cách nhau ít nhất 30 ngày!";
                }
                // typeOfCampaign validation
                if (!values.typeOfCampaign) {
                    errors.typeOfCampaign = "Không được để trống!";
                }
                // nameOfBank validation
                if (!values.nameOfBank) {
                    errors.nameOfBank = "Không được để trống!";
                }

                // nameOfUserBank validation
                if (!values.nameOfUserBank) {
                    errors.nameOfUserBank = "Không được để trống!";
                }

                // numberOfBankAccount validation
                if (!values.numberOfBankAccount) {
                    errors.numberOfBankAccount = "Không được để trống!";
                } else {
                    // Biểu thức chính quy để kiểm tra ký tự đặc biệt và dấu âm dương
                    var specialCharAndSignRegex = /[!@#$%^&*(),.?":{}|<>+-]/g;
                    if (specialCharAndSignRegex.test(values.numberOfBankAccount)) {
                        errors.numberOfBankAccount = "Không được chứa ký tự đặc biệt!";
                    }
                }

                // nameOfCampaign validation
                if (!values.nameOfCampaign) {
                    errors.nameOfCampaign = "Không được để trống!";
                }
                // address validation
                if (!values.address) {
                    errors.address = "Không được để trống!";
                }
                // description validation
                if (!values.description) {
                    errors.description = "Không được để trống!";
                }
                // imageBackgroundFile validation
                if (!values.imageBackgroundFile) {
                    errors.imageBackgroundFile = "Không được để trống!";
                }
                // imageQRCode validation
                if (!values.imageQRCode) {
                    errors.imageQRCode = "Không được để trống!";
                }
                // targetAmount validation
                if (!values.targetAmount) {
                    errors.targetAmount = "Không được để trống!";
                } else {
                    const cleanValue = values.targetAmount.replace(/\D/g, ''); // Loại bỏ tất cả các ký tự không phải số
                    const amount = parseFloat(cleanValue);
                    if (isNaN(amount)) {
                        errors.targetAmount = "Vui lòng nhập số tiền hợp lệ!";
                    } else if (amount <= 0) {
                        errors.targetAmount = "Số tiền mục tiêu phải lớn hơn 0!";
                    } else if (amount > 500000000) {
                        errors.targetAmount = "Số tiền mục tiêu không được vượt quá 500,000,000 VND!";
                    }
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
                <form onSubmit={handleSubmit}>
                    <div className="bg-orange-300 w-full h-14 flex justify-center items-center  ">
                        <h1 className="text-sm mobile:text-2xl laptop:text-2xl font-medium">Tạo chiến dịch của bạn!</h1>
                    </div>

                    <div className="w-4/5 mx-auto rounded-xl">
                        <div className="grid gap-6 grid-cols-1 laptop:grid-cols-3 ">

                            <div className=" col-span-2 laptop:col-span-1 border-2 shadow rounded-xl">
                                <div >
                                    <div className="bg-gray-500 mb-6  rounded-tl-xl rounded-tr-xl ">
                                        <h1 className="text-center py-3 font-semibold text-sm mobile:text-xl">Ảnh chiến dịch</h1>
                                    </div>


                                    <div class="flex items-center justify-center w-full laptop:w-4/5 mx-auto">

                                        {fileImageBackground ? <div className=" flex flex-col justify-center items-center">
                                            <img className="mb-6 w-1/2 h-1/2 laptop:w-2/3 laptop:h-2/3 rounded-xl"
                                                id="image"

                                                value={fileImageBackground}
                                                src={fileImageBackground} width={220} height={220} alt="avatar" />
                                            <button type="button"
                                                onClick={(e) => { removeImage(e, setFieldValue) }}
                                                class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Remove Image</button>

                                        </div> : <label for="imageBackgroundFile" class="flex flex-col items-center justify-center w-2/3 tablet:w-4/5 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400 w-3/4 mobile:w-full"><span class="font-semibold">Nhấp vào đây</span> hoặc kéo thả file ảnh</p>
                                                <p class="text-xs text-gray-500 dark:text-gray-400 w-3/4 mobile:w-full">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                            <input id="imageBackgroundFile" type="file" name="imageBackgroundFile" class="hidden"
                                                onChange={(e) => { handleImageBackgroundChange(e, setFieldValue) }}
                                                value={values.imageBackgroundFile}

                                            />
                                        </label>}


                                    </div>
                                    <div className="text-center mt-2">
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.imageBackgroundFile && touched.imageBackgroundFile && errors.imageBackgroundFile}</p>
                                        <p className="text-sm italic font-thin">Chọn ảnh chiến dịch của bạn</p>
                                    </div>

                                    <div className="bg-vmo m-4 rounded-xl w-3/5 mx-auto laptop:w-4/5">
                                        <div className="p-4 mobile:flex mobile:justify-center gap-3 items-center">
                                            <img class=" w-24 h-24  mobile:w-16 mobile:h-16 rounded-full mx-auto mobile:mx-0" src="https://i.pinimg.com/564x/86/a2/31/86a231836008cca4d4a613a021ab90a1.jpg" alt="Rounded avatar" />
                                            <div>
                                                <p className="text-gray-100 text-center mobile:text-left">Tài khoản người dùng:</p>
                                                <h2 className="font-semibold text-center mobile:text-left">Bocchi desu</h2>
                                            </div>
                                        </div>


                                    </div>

                                    <div class=" w-4/5 mx-auto">
                                        <label for="nameOfBank" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên ngân hàng:</label>
                                        <div class="relative mb-6">
                                            <input type="text"
                                                id="nameOfBank"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.nameOfBank}
                                                autocomplete="off"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pe-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập tên ngân hàng..." />

                                            <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.nameOfBank && touched.nameOfBank && errors.nameOfBank}</p>
                                        </div>
                                        <label for="nameOfUserBank" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên tài khoản:</label>
                                        <div class="relative mb-6">
                                            <input type="text"
                                                id="nameOfUserBank"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.nameOfUserBank}
                                                autocomplete="off"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pe-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập tên tài khoản ngân hàng..." />
                                            <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.nameOfUserBank && touched.nameOfUserBank && errors.nameOfUserBank}</p>
                                        </div>
                                        <label for="numberOfBankAccount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số tài khoản:</label>
                                        <div class="relative mb-6">
                                            <input type="number"
                                                id="numberOfBankAccount"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.numberOfBankAccount}
                                                autocomplete="off"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pe-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="4242 4242 4242 4242" />

                                            <p class=" absolute mt-2  text-sm text-red-600 dark:text-red-500"> {errors.numberOfBankAccount && touched.numberOfBankAccount && errors.numberOfBankAccount}</p>
                                            <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                                <svg fill="none" class="h-6 text-[#1434CB] dark:text-white" viewBox="0 0 36 21"><path fill="currentColor" d="M23.315 4.773c-2.542 0-4.813 1.3-4.813 3.705 0 2.756 4.028 2.947 4.028 4.332 0 .583-.676 1.105-1.832 1.105-1.64 0-2.866-.73-2.866-.73l-.524 2.426s1.412.616 3.286.616c2.78 0 4.966-1.365 4.966-3.81 0-2.913-4.045-3.097-4.045-4.383 0-.457.555-.957 1.708-.957 1.3 0 2.36.53 2.36.53l.514-2.343s-1.154-.491-2.782-.491zM.062 4.95L0 5.303s1.07.193 2.032.579c1.24.442 1.329.7 1.537 1.499l2.276 8.664h3.05l4.7-11.095h-3.043l-3.02 7.543L6.3 6.1c-.113-.732-.686-1.15-1.386-1.15H.062zm14.757 0l-2.387 11.095h2.902l2.38-11.096h-2.895zm16.187 0c-.7 0-1.07.37-1.342 1.016L25.41 16.045h3.044l.589-1.68h3.708l.358 1.68h2.685L33.453 4.95h-2.447zm.396 2.997l.902 4.164h-2.417l1.515-4.164z" /></svg>
                                            </div>
                                        </div>

                                        <div className="mb-6 mt-10">
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                for="imageQRCode">QR code tài khoản(ảnh)</label>
                                            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                aria-describedby="imageQRCode"
                                                id="imageQRCode"
                                                name="imageQRCode"
                                                onChange={(e) => { handleImageQRCode(e, setFieldValue) }}
                                                type="file" />
                                            <p class="  mt-2  text-sm text-red-600 dark:text-red-500"> {errors.imageQRCode && touched.imageQRCode && errors.imageQRCode}</p>

                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className=" col-span-2 laptop:col-span-2 border-2 shadow rounded-xl">
                                <div className="bg-black mb-6 rounded-tl-xl rounded-tr-xl">
                                    <h1 className="text-white text-center py-3 font-semibold text-sm mobile:text-xl">Hoàn thành các thông tin bên dưới để chúng tôi xét duyệt chiến dịch của bạn </h1>
                                </div>
                                <div className="w-4/5 mx-auto">
                                    <div class="mb-6">
                                        <label for="nameOfCampaign" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên chiến dịch</label>
                                        <input type="text"
                                            id="nameOfCampaign"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.nameOfCampaign}
                                            autocomplete="off"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập tên chiến dịch..." />
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.nameOfCampaign && touched.nameOfCampaign && errors.nameOfCampaign}</p>

                                    </div>

                                    <div class="mb-6">
                                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                                        <input type="text"
                                            id="address"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.address}
                                            autocomplete="off"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập địa chỉ..." />
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.address && touched.address && errors.address}</p>

                                    </div>
                                    <div className="mb-6">

                                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
                                        <textarea id="description"
                                            rows="4"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.description}
                                            autocomplete="off"
                                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mô tả về chiến dịch..."></textarea>
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.description && touched.description && errors.description}</p>

                                    </div>
                                    <div className=" laptop:flex justify-between w-full items-center mb-6">
                                        <div className="laptop:w-2/5">
                                            <label for="dateFrom" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Diễn ra từ</label>

                                            <div class="relative tablet:w-full mb-6 laptop:mb-0">

                                                <StartDayPicker setStartFieldValue={setFieldValue}
                                                    popOverTriggerIdStart="startDate"
                                                ></StartDayPicker>
                                                <p class=" z-10 mt-2 text-sm text-red-600 dark:text-red-500"> {errors.startDate && touched.startDate && errors.startDate}</p>
                                            </div>

                                        </div>

                                        <hr class=" hidden laptop:block w-10 h-1 mx-auto my-4 bg-black border-0 rounded  dark:bg-gray-700"></hr>

                                        <div className="laptop:w-2/5">
                                            <label for="dateTo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">đến ngày</label>

                                            <div class="relative  tablet:w-full">
                                                <EndDayPicker setEndFieldValue={setFieldValue}
                                                    popOverTriggerIdEnd="endDate"></EndDayPicker>
                                                <p class=" z-10 mt-2 text-sm text-red-600 dark:text-red-500"> {errors.endDate && touched.endDate && errors.endDate}</p>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label for="targetAmount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mục tiêu chiến dịch:</label>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <input
                                                type="text"
                                                name="targetAmount"
                                                id="targetAmount"
                                                maxLength="11"
                                                onChange={(e) => handleTargetAmountChange(e, setFieldValue)}
                                                onBlur={handleBlur}
                                                value={values.targetAmount}
                                                autoComplete="off"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 font-semibold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="0"
                                                aria-describedby="price-currency"
                                            />


                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                <span className="text-gray-600 font-semibold sm:text-sm" id="price-currency">
                                                    VND
                                                </span>
                                            </div>
                                        </div>
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.targetAmount &&
                                                touched.targetAmount &&
                                                errors.targetAmount}
                                        </p>
                                    </div>
                                    <div className="mb-6">
                                        <label for="typeOfCampaign" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại chiến dịch:</label>

                                        <TypeOfCampaignSelect
                                            setFieldValue={setFieldValue}
                                            selectTriggerId="typeOfCampaign"></TypeOfCampaignSelect>
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.typeOfCampaign && touched.typeOfCampaign && errors.typeOfCampaign}</p>

                                    </div>
                                    <div className="mb-6">
                                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Giấy tờ xác thực cấp phép thiện nguyện của địa phương(ảnh)</label>
                                        <input
                                            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            aria-describedby="imageLocalDocument"
                                            id="imageLocalDocument"
                                            name="imageLocalDocument"
                                            onChange={(e) => { handleImageLocalDocument(e, setFieldValue) }}
                                            type="file" />
                                        <p class="  mt-2  text-sm text-red-600 dark:text-red-500"> {errors.imageLocalDocument && touched.imageLocalDocument && errors.imageLocalDocument}</p>

                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <button type="submit" disabled={isSubmitting} class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-20 py-2.5 text-center my-10 ">Gửi</button>

                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            )}
        </Formik>
    </>);
}
