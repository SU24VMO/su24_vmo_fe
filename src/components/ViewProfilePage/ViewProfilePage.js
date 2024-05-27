import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import CarouselCampaign from "./CarouselCampaign/CarouselCampaign";


export default function ViewProfilePage() {



    return <div className="w-4/5 mx-auto rounded-xl">

        <div className="grid gap-6 tablet:grid-cols-2 bg-vmo rounded-xl p-10">
            <div className=" justify-center mobile:justify-evenly mobile:flex  gap-4 items-center">
                <div className="rounded-full flex justify-center">
                    <img className="rounded-full" src="https://i.pinimg.com/736x/98/24/03/982403255d6d3641004fb044cfcaac07.jpg" alt="avatar" width={180} height={180} />
                </div>
                <div className="flex justify-center">
                    <div className="">
                        <h1 className=" text-sx w-full text-center mobile:text-left mobile:text-xl font-bold my-2 text-white   ">Trương Đinh Đăng Khoa</h1>
                        <p className="font-normal my-2  text-white text-sm text-center mobile:text-left w-full mobile:text-base    ">tddkhoa0811@gmail.com</p>
                        <p className="font-normal my-2  text-white text-sm text-center mobile:text-left w-full mobile:text-base    ">Tham gia từ:<span> 3/2024</span></p>
                        <p className="font-normal my-2  text-white text-sm text-center mobile:text-left w-full mobile:text-base    ">Xem thêm thông tin tài khoản tại:</p>
                        {/* <div>
                    <a className="font-normal my-2" href="">Xem thêm thông tin tài khoản tại:</a><br />
                    <a className="font-normal my-2" href="">Xem thêm thông tin tài khoản tại:</a><br />
                    </div> */}
                    </div>




                </div>
            </div>
            <div className=" mobile:flex justify-around   gap-4 items-center">
                <div className="text-center">
                    <h1 className=" text-sx mobile:text-xl font-bold text-white ">1.000.000.000 tỷ</h1>
                    <span className="text-white  text-sm mobile:text-sx ">Số tiền ủng hộ</span>
                </div>
                <div className="text-center">
                    <h1 className=" text-sx mobile:text-xl font-bold text-white ">2</h1>
                    <span className="text-white  text-sm mobile:text-sx">Lượt ủng hộ</span>
                </div>
                <div className="text-center">
                    <h1 className=" text-sx mobile:text-xl font-bold text-white ">10</h1>
                    <span className="text-white  text-sm mobile:text-sx">Chiến dịch đã thực hiện</span>
                </div>

            </div>

        </div>

        <div class="inline-flex items-center justify-center w-full">
            <hr class="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
            <div class="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
                <svg class="w-4 h-4 text-gray-700 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                </svg>
            </div>
        </div>

        <div className="mb-8">
            <h1 className="text-sx mobile:text-xl  font-bold my-2">Chiến dịch gây quỹ:</h1>
        </div>
        <Tabs defaultValue="process" className="w-full">
            <TabsList>
                <TabsTrigger value="process">Đang thực hiện</TabsTrigger>
                <TabsTrigger value="waitAccept">Chờ phê duyệt</TabsTrigger>
                <TabsTrigger value="end">Đã kết thúc</TabsTrigger>

            </TabsList>
            <TabsContent value="process">
                <CarouselCampaign></CarouselCampaign>
            </TabsContent>
            <TabsContent value="waitAccept">
            <CarouselCampaign></CarouselCampaign>

            </TabsContent>
            <TabsContent value="end">
            <CarouselCampaign></CarouselCampaign>

            </TabsContent>

        </Tabs>



    </div>;
}
