import React from "react";
import { ReactComponent as BackgroundAvatar } from '../../assets/images/introduction/bg-avatar-introduction.svg';
import { ReactComponent as Bars } from '../../assets/images/introduction/bars-2.svg';
import { ReactComponent as Clock } from '../../assets/images/introduction/clock.svg';
import { ReactComponent as Convert } from '../../assets/images/introduction/convert.svg';
import { ReactComponent as Money } from '../../assets/images/introduction/money.svg';
import { ReactComponent as Calendar } from '../../assets/images/introduction/calendar.svg';
import { ReactComponent as Target } from '../../assets/images/introduction/target.svg';
import { ReactComponent as Frame221 } from '../../assets/images/introduction/Frame221.svg';
import { ReactComponent as Frame222 } from '../../assets/images/introduction/Frame222.svg';
import { ReactComponent as Frame223 } from '../../assets/images/introduction/Frame223.svg';
import { ReactComponent as Frame550 } from '../../assets/images/introduction/Frame550.svg';
import { ReactComponent as Testimonial } from '../../assets/images/introduction/Testimonial.svg';
import { ReactComponent as Cube192 } from '../../assets/images/introduction/cube192.svg';
import { ReactComponent as Cube493 } from '../../assets/images/introduction/cube493.svg';
import { ReactComponent as Cube501 } from '../../assets/images/introduction/cube501.svg';
import { ReactComponent as Cube502 } from '../../assets/images/introduction/cube502.svg';
import { ReactComponent as Cube503 } from '../../assets/images/introduction/cube503.svg';
import { ReactComponent as Cube504 } from '../../assets/images/introduction/cube504.svg';
import { ReactComponent as Cube505 } from '../../assets/images/introduction/cube505.svg';
import { ReactComponent as Cube506 } from '../../assets/images/introduction/cube506.svg';




export default function IntroductionPage() {
    return (
        <div className="w-full my-5">


            <div className="w-4/5 mx-auto">

                <div className="grid grid-cols-1 mobile:grid-cols-2">
                    <div className="col-span-1 order-1 mobile:order-none">
                        <div className=" w-full   mt-12">
                            <div className="w-4/5">
                                <h1 className="text-4xl tablet:text-6xl font-semibold text-start  ">Chào mừng bạn đến với cộng đồng thiện nguyện của chúng tôi.</h1>
                                <p className="text-xl my-4">Hãy cùng nhau xây dựng cộng đồng thiện nguyện số 2 Việt Nam nào!.</p>
                                <button type="button" className="text-white bg-vmo hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Đi nào!</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 items-center drop-shadow-xl relative flex justify-center">
                        {/* Left blurred image */}
                        <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 w-2/5 h-3/5 rounded-xl overflow-hidden">
                            <img
                                src={require("../../assets/images/thumbnail8.jpeg")}
                                className="w-full h-full object-cover object-center filter blur-sm opacity-50"
                                alt="ảnh nhỏ bên trái"
                            />
                        </div>

                        {/* Main image */}
                        <div className=" relative w-full mobile:w-4/5 h-48 tablet:h-[50vh] my-4 flex justify-center rounded-xl shadow overflow-hidden z-10">
                            <img
                                src={require("../../assets/images/thumbnail4.jpg")}
                                className="w-full h-full object-cover object-center"
                                alt="ảnh nền"
                            />
                        </div>

                        {/* Right blurred image */}
                        <div className=" absolute -right-10 top-1/2 transform -translate-y-1/2 w-2/5 h-3/5 rounded-xl overflow-hidden">
                            <img
                                src={require("../../assets/images/thumbnail11.jpg")}
                                className="w-full h-full object-cover object-center filter blur-sm opacity-50"
                                alt="ảnh nhỏ bên phải"
                            />
                        </div>
                    </div>

                </div>

                <div className="w-full text-center mt-32 mb-10">
                    <h1 className="text-2xl font-semibold">
                        Mô hình thiện nguyện
                    </h1>
                    <p className="italic">
                        Chúng tôi mang tới một giải pháp thiện nguyện hiện đại, minh bạch, dễ dàng, nhanh chóng, tiện lợi. Mang tới một cộng đồng thiện nguyện cho cả nước!
                    </p>
                </div>

                <div className="grid grid-cols-1 tablet:grid-cols-3 mb-28">
                    <div className="grid grid-rows-2">
                        <div className="flex gap-5 row-span-1 p-7">
                            <div className="w-14 h-14 flex justify-center items-center">
                                <Bars />
                            </div>
                            <div className="w-full">
                                <span className="font-semibold text-xl">Ăn chặn</span>
                                <p className="break-words text-sm">Hình thức ăn chặn dễ dàng nhanh chóng có kế hoạch rõ ràng.</p>
                            </div>
                        </div>
                        <div className="flex gap-5 row-span-1 p-7">
                            <div className="w-14 h-14 flex justify-center items-center">
                                <Clock />
                            </div>
                            <div className="w-full">
                                <span className="font-semibold text-xl">Thời gian</span>
                                <p className="break-words text-sm">Ăn chặn bất kể mọi lúc mà không sợ đối chiếu.</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-rows-2">
                        <div className="flex gap-5 row-span-1 p-7">
                            <div className="w-14 h-14 flex justify-center items-center">
                                <Convert />
                            </div>
                            <div className="w-full">
                                <span className="font-semibold text-xl">Dòng tiền</span>
                                <p className="break-words text-sm">Tiền luôn luôn về túi của bạn bất kể chuyện gì có xảy ra.</p>
                            </div>
                        </div>
                        <div className="flex gap-5 row-span-1 p-7">
                            <div className="w-14 h-14 flex justify-center items-center">
                                <Money />
                            </div>
                            <div className="w-full">
                                <span className="font-semibold text-xl">Rút tiền</span>
                                <p className="break-words text-sm">Hỗ trợ giao dịch 24/7 không lo gặp khó tiền mặt.</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-rows-2">
                        <div className="flex gap-5 row-span-1 p-7">
                            <div className="w-14 h-14 flex justify-center items-center">
                                <Calendar />
                            </div>
                            <div className="w-full">
                                <span className="font-semibold text-xl">Lịch trình</span>
                                <p className="break-words text-sm">Kệ lịch trình, khi nào muốn bạn có thể end bất cứ lúc nào.</p>
                            </div>
                        </div>
                        <div className="flex gap-5 row-span-1 p-7">
                            <div className="w-14 h-14 flex justify-center items-center">
                                <Target />
                            </div>
                            <div className="w-full">
                                <span className="font-semibold text-xl">Mục tiêu</span>
                                <p className="break-words text-sm">100 triệu ư, không nhiều hơn thế nữa.</p>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="grid grid-cols-1 tablet:grid-cols-2 mb-28 relative">
                    <div className="absolute tablet:z-10 bottom-0 mobile:-translate-x-5 translate-y-2 rotate-12 ">
                        <Cube501 className="drop-shadow-md" ></Cube501>

                    </div>
                    {/* <div className=" hidden tablet:block drop-shadow-lg tablet:h-96  rounded-xl bg-cover bg-no-repeat bg-[url('https://s.memehay.com/files/posts/20210526/hoai-linh-voi-sieu-voucher-14-ty-tren-shopee.webp')]">
                    </div> */}
                    <img src={require('../../assets/images/thumbnail11.jpg')} className="hidden tablet:block drop-shadow-lg tablet:h-96  rounded-xl" alt="ảnh 1" />
                    <div className=" flex justify-center items-center ">
                        <div className="w-3/4 block  border-2 drop-shadow-xl  shadow-inner p-10 rounded-xl bg-white">
                            <h1 className="font-bold  text-2xl tablet:text-3xl">Minh bạch?</h1>
                            <p className="my-5 break-words">Ở đây chúng tôi không làm thế, cơ hội cho người lương thiện là không bao giờ! Tiền của bạn sẽ là tiền của chúng tôi.</p>
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Đi nào!</button>
                        </div>
                    </div>
                    <div className="absolute -z-10 right-0">
                        <Cube493 className="drop-shadow-md" ></Cube493>

                    </div>
                </div>

                <div className="grid grid-cols-1 tablet:grid-cols-2 mb-28 relative">
                    <div className="absolute bottom-0 ">
                        <Cube505 className="drop-shadow-md"></Cube505>
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="w-3/4 block border-2  drop-shadow-xl shadow-inner p-10 rounded-xl bg-white">
                            <h1 className="font-bold text-2xl tablet:text-3xl">Minh bạch?</h1>
                            <p className="my-5 break-words">Ở đây chúng tôi không làm thế, cơ hội cho người lương thiện là không bao giờ! Tiền của bạn sẽ là tiền của chúng tôi.</p>
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Đi nào!</button>
                        </div>
                    </div>
                    <div className="absolute -z-10 tablet:z-10 right-0 -translate-x-4 -translate-y-6 -rotate-45 ">
                        <Cube504 className="drop-shadow-md"></Cube504>
                    </div>
                    <img src={require('../../assets/images/thumbnail6.jpg')} className="hidden tablet:block drop-shadow-lg tablet:h-96  rounded-xl" alt="ảnh 2" />
                    {/* <div className=" hidden tablet:block drop-shadow-lg tablet:h-96  rounded-xl bg-cover bg-no-repeat bg-[url('https://s.memehay.com/files/posts/20210526/hoai-linh-voi-sieu-voucher-14-ty-tren-shopee.webp')]">

                    </div> */}

                </div>





                <div className=" mb-10 tablet:mb-28">
                    <div className=" w-3/4 mx-auto text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600  focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        <h1 className=" text-xl mobile:text-4xl font-semibold text-center">Đội ngũ ăn chặn của chúng tôi</h1>
                    </div>

                    {/* <div className=" w-full flex justify-center relative">
                        <Testimonial className="w-full   hidden tablet:block"></Testimonial>
                        <div className="tablet:absolute top-52 z-10 mt-8 tablet:mt-0">
                            <div className=" flex gap-32 " >
                                <div>
                                    <div className="absolute -z-10 ">
                                        <Frame221 className="w-4/5 tablet:w-full"></Frame221>
                                    </div>
                                    <img className=" drop-shadow-xl " src={require('../../assets/images/introduction/fatnotfat.png')} width={240} height={240} alt="" />
                                    <span className="font-semibold text-xl">BE: fatnotfat</span>
                                </div>
                                <div>
                                    <div className="absolute -z-10">
                                        <Frame550 className="w-4/5  tablet:w-full"></Frame550>
                                    </div>
                                    <img className=" drop-shadow-xl " src={require('../../assets/images/introduction/cubi.png')} width={240} height={240} alt="" />
                                    <span className="font-semibold text-xl">FE: cu bu qua</span>

                                </div>
                            </div>
                            <div className="  flex gap-32 my-10 " >
                                <div>
                                    <div className="absolute -z-10">
                                        <Frame222 className="w-4/5  tablet:w-full"></Frame222>
                                    </div>
                                    <img className=" drop-shadow-xl " src={require('../../assets/images/introduction/truongmagnus.png')} width={240} height={240} alt="" />
                                    <span className="font-semibold text-xl">PM: truong mút nắc</span>

                                </div>
                                <div>
                                    <div className="absolute -z-10">
                                        <Frame223 className="w-4/5  tablet:w-full"></Frame223>
                                    </div>
                                    <img className=" drop-shadow-xl " src={require('../../assets/images/introduction/bocchi_png.png')} width={240} height={240} alt="" />
                                    <span className="font-semibold text-xl">FE: bocchi dê sù</span>

                                </div>
                            </div>


                        </div>


                    </div> */}

                    {/* <div className=" w-full flex justify-center">
                        <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={require('../../assets/images/introduction/fatnotfat.png')} alt=""/>
                                <div class="flex flex-col justify-between p-4 leading-normal" >
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Backend</h5>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">"Tôi xuất sắc, chỉ vậy thôi"</p>
                               </div>
                        </div>


                    </div> */}

                    <div className="w-full flex flex-wrap justify-center mt-5">
                        <div class="  w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                            <div class="flex  flex-col items-center pb-10">
                                <img class="w-36 h-36 mb-3 rounded-full shadow-lg animate-spin" src={require('../../assets/images/introduction/fatnotfat.png')} alt="ảnh fat" />
                                <h5 class="mb-1 text-xl font-bold text-gray-900 dark:text-white">Backend Developer</h5>
                                <span class="text-sx text-gray-500 dark:text-gray-400">"Tôi gay"</span>

                            </div>
                        </div>
                        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                            <div class="flex flex-col items-center pb-10">
                                <img class="w-36 h-36 mb-3 rounded-full shadow-lg animate-spin" src={require('../../assets/images/introduction/cubi.png')} alt="ảnh fat" />
                                <h5 class="mb-1 text-xl font-bold text-gray-900 dark:text-white">Frontend Developer</h5>
                                <span class="text-sx text-gray-500 dark:text-gray-400">"Tôi là số 1, tôi là độc nhất"</span>

                            </div>
                        </div>
                        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                            <div class="flex flex-col items-center pb-10">
                                <img class="w-36 h-36 mb-3 rounded-full shadow-lg animate-spin" src={require('../../assets/images/introduction/truongmagnus.png')} alt="ảnh fat" />
                                <h5 class="mb-1 text-xl font-bold text-gray-900 dark:text-white">Backend Developer</h5>
                                <span class="text-sx text-gray-500 dark:text-gray-400">"Không có gì ngoài tiền, đó là tôi"</span>

                            </div>
                        </div>
                        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                            <div class="flex flex-col items-center pb-10">
                                <img class="w-36 h-36 mb-3 rounded-full shadow-lg animate-spin" src={require('../../assets/images/introduction/khoa.png')} alt="ảnh fat" />
                                <h5 class="mb-1 text-xl font-bold text-gray-900 dark:text-white">Frontend Developer</h5>
                                <span class="text-sx text-gray-500 dark:text-gray-400">"Tôi là mệt mỏi, tôi gục ngã "</span>

                            </div>
                        </div>
                    </div>



                </div>

                <div className="w-full">
                    <div className="mobile:w-4/5 mx-auto">
                        <div className="relative w-full rounded-tr-3xl rounded-bl-3xl mx-auto drop-shadow-xl">
                            <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-center p-4">
                                <h1 className="font-bold  mobile:text-2xl mb-5">
                                    Hãy cho chúng tôi biết ý kiến của bạn về đội ngũ của chúng tôi!
                                </h1>
                                <div className="flex gap-1 items-center">
                                    <span className="text-xs mobile:text-xl">Email:</span>
                                    <p className="font-bold text-xs mobile:text-xl">requestmanager@gmail.com</p>
                                </div>
                            </div>
                            <img className="  mobile:w-full rounded-tr-3xl rounded-bl-3xl" src={require('../../assets/images/introduction/Feedback.png')} alt="Feedback" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
