import React, { useState, useEffect } from "react";
import Datepicker from "flowbite-datepicker/Datepicker";
export default function CreateCampaignPage() {
    // const [value, setValue] = useState();
    // const dobHandler = (e) => {
    //     console.log(e.target.value);
    // }
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    useEffect(() => {
        const datepickerEl = document?.getElementById("datepickerFromId");
        new Datepicker(datepickerEl, {});
    }, []);
    useEffect(() => {
        const datepickerE2 = document?.getElementById("datepickerToId");
        new Datepicker(datepickerE2, {});
    }, []);
    return <form>

        <div className="bg-orange-300 w-full h-14 flex justify-center items-center  ">
            <h1 className="text-sm mobile:text-2xl laptop:text-2xl font-medium">Đăng kí tài khoản thiện nguyện tổ chức</h1>
        </div>

        <div className="w-4/5 mx-auto bg-vmo rounded-xl">
            <div className="grid gap-6 tablet:grid-cols-3 ">

                <div className=" col-span-2 laptop:col-span-1  bg-gray-400 rounded-xl">
                    <div>
                        <div className="bg-gray-500 mb-6  rounded-tl-xl rounded-tr-xl">
                            <h1 className="text-center py-3 font-semibold">Ảnh chiến dịch</h1>
                        </div>


                        <div class="flex items-center justify-center w-full laptop:w-4/5 mx-auto">


                            {file ? <div className=" flex flex-col justify-center ">
                                <img className="" src={file} width={220} height={220} alt="avatar" />
                                <div>

                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onChange={handleChange} />
                                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>

                                </div>

                            </div> : <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" class="hidden" onChange={handleChange} />
                            </label>}


                        </div>
                        <div className="text-center mt-2">
                            <p className="text-sm italic font-thin">Chọn ảnh chiến dịch của bạn</p>
                        </div>

                        <div className="bg-blue-500 m-4 rounded-xl">
                            <div className="p-4 flex justify-center gap-3 items-center">
                                <img class="w-16 h-16 rounded-full" src="https://i.pinimg.com/564x/86/a2/31/86a231836008cca4d4a613a021ab90a1.jpg" alt="Rounded avatar" />
                                <div>
                                    <label className="text-gray-400">Tài khoản người dùng:</label>
                                    <h2 className="font-semibold">Bocchi desu</h2>
                                </div>
                            </div>


                        </div>

                        <div class=" w-4/5 mx-auto">
                            <label for="name-of-bank" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên ngân hàng:</label>
                            <div class="relative mb-6">
                                <input type="text" id="name-of-bank" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pe-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập tên ngân hàng..." required />

                            </div>
                            <label for="card-number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số tài khoản:</label>
                            <div class="relative mb-6">
                                <input type="text" id="card-number-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pe-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="4242 4242 4242 4242" pattern="^4[0-9]{12}(?:[0-9]{3})?$" required />
                                <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                    <svg fill="none" class="h-6 text-[#1434CB] dark:text-white" viewBox="0 0 36 21"><path fill="currentColor" d="M23.315 4.773c-2.542 0-4.813 1.3-4.813 3.705 0 2.756 4.028 2.947 4.028 4.332 0 .583-.676 1.105-1.832 1.105-1.64 0-2.866-.73-2.866-.73l-.524 2.426s1.412.616 3.286.616c2.78 0 4.966-1.365 4.966-3.81 0-2.913-4.045-3.097-4.045-4.383 0-.457.555-.957 1.708-.957 1.3 0 2.36.53 2.36.53l.514-2.343s-1.154-.491-2.782-.491zM.062 4.95L0 5.303s1.07.193 2.032.579c1.24.442 1.329.7 1.537 1.499l2.276 8.664h3.05l4.7-11.095h-3.043l-3.02 7.543L6.3 6.1c-.113-.732-.686-1.15-1.386-1.15H.062zm14.757 0l-2.387 11.095h2.902l2.38-11.096h-2.895zm16.187 0c-.7 0-1.07.37-1.342 1.016L25.41 16.045h3.044l.589-1.68h3.708l.358 1.68h2.685L33.453 4.95h-2.447zm.396 2.997l.902 4.164h-2.417l1.515-4.164z" /></svg>
                                </div>
                            </div>
                            <div className="mb-6">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">QR code tài khoản(ảnh)</label>
                                <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                            </div>
                        </div>

                    </div>

                </div>

                <div className=" col-span-2 bg-red-400 rounded-xl">
                    <div className="bg-black mb-6 rounded-tl-xl rounded-tr-xl">
                        <h1 className="text-white text-center py-3 font-semibold ">Hoàn thành các thông tin bên dưới để chúng tôi xét duyệt chiến dịch của bạn </h1>
                    </div>
                    <div className="w-4/5 mx-auto">
                        <div class="mb-6">
                            <label for="nameOfCampaign" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên chiến dịch</label>
                            <input type="nameOfCampaign" id="nameOfCampaign" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập tên chiến dịch..." required />
                        </div>

                        <div class="mb-6">
                            <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                            <input type="address" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập địa chỉ..." required />
                        </div>
                        <div className="mb-6">

                            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
                            <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mô tả về chiến dịch..."></textarea>

                        </div>
                        <div className=" laptop:flex justify-between w-full items-center mb-6">
                            <div className="laptop:w-2/5">
                                <label for="dateFrom" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Diễn ra từ</label>

                                <div class="relative max-w-xl">
                                    <input
                                        datepicker
                                        datepicker-autohide
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 mobile:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Select date"
                                        onSelect={(e) => console.log(e.target.value)}
                                        // onClick={(e) => dobHandler(e)}
                                        // onClick={(e) => console.log(e.target.value)}
                                        // onChange={(e) => console.log(e)}
                                        id="datepickerFromId"
                                    />
                                    <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
                                        <svg
                                            aria-hidden="true"
                                            class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>

                            </div>

                            <hr class=" hidden laptop:block w-10 h-1 mx-auto my-4 bg-gray-100 border-0 rounded  dark:bg-gray-700"></hr>

                            <div className="laptop:w-2/5">
                                <label for="dateTo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">đến ngày</label>

                                <div class="relative max-w-xl">
                                    <input
                                        datepicker
                                        datepicker-autohide
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 mobile:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Select date"
                                        onSelect={(e) => console.log(e.target.value)}
                                        // onClick={(e) => dobHandler(e)}
                                        // onClick={(e) => console.log(e.target.value)}
                                        // onChange={(e) => console.log(e)}
                                        id="datepickerToId"
                                    />
                                    <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
                                        <svg
                                            aria-hidden="true"
                                            class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="mb-6">
                            <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mục tiêu chiến dịch:</label>
                            <input type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0 vnd" required />
                        </div>
                        <div className="mb-6">
                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại chiến dịch</label>
                            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Chọn loại chiến dịch</option>
                                <option value="US">Xóa nghèo</option>
                                <option value="CA">Nạn đói</option>
                                <option value="FR">Khuyết tật</option>
                                <option value="DE">Ung thư</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Giấy tờ xác thực cấp phép thiện nguyện của địa phương(ảnh)</label>
                            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-20 py-2.5 text-center my-10 ">Gửi</button>

                    </div>
                </div>
            </div>

        </div>
    </form>;
}
