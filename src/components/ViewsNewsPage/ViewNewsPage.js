import React from "react";
import { Link } from "react-router-dom";

export default function ViewNewsPage() {
    return (
        <div className="w-4/5 mx-auto">
            <div className="bg-white dark:bg-gray-800  py-6 mobile:py-8 laptop:py-12">
                <div className="mx-auto max-w-screen-2xl px-4 tablet:px-8">
                    <div className="mb-4 flex items-center justify-between gap-8 mobile:mb-8 tablet:mb-12">
                        <div className="flex items-center gap-12">
                            <h2 className="text-2xl font-bold text-gray-800 laptop:text-3xl dark:text-white">Tin tức</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-6 xl:gap-8">
                        <Link to="/news/newsDetail" className="group  relative flex h-72 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg tablet:h-80">
                            <img
                                src="https://static.thiennguyen.app/public/news/photo/2023/12/18/085eedb8-b64a-40ee-8c1e-7251cb30c249.jpg"
                                loading="lazy"
                                alt="Photo by Minh Pham"
                                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                            />

<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent text-end mt-3">
                                <span class=" bg-green-100 text-green-800 text-sm font-medium me-2 px-2 py-1 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">19:00 Th2 19/02/2024</span>

                            </div>

                            <span className="relative ml-4 mb-3 inline-block text-base tablet:text-2xl font-bold text-white tablet:ml-5 tablet:text-lg break-words w-3/4 ">
                                Chủ tịch Chương Nhật Trầu đã chiếm đoạt hàng tỷ đồng
                            </span>
                        </Link>

                        <Link to="/news/newsDetail" className="group relative flex h-72 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg tablet:col-span-2 tablet:h-80">
                            <img
                                src="https://static.thiennguyen.app/public/news/photo/2024/4/10/05c8d01e-33cb-4c43-858f-28a9e8bf43cb.jpg"
                                loading="lazy"
                                alt="Photo by Magicle"
                                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                            />
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent text-end mt-3">
                                <span class=" bg-green-100 text-green-800 text-sm font-medium me-2 px-2 py-1 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">19:00 Th2 19/02/2024</span>

                            </div>

                            <span className="relative ml-4 mb-3 inline-block text-base tablet:text-2xl font-bold text-white tablet:ml-5 tablet:text-lg break-words  w-3/4 ">
                                Chủ tịch Chương Nhật Trầu đã chiếm đoạt hàng tỷ đồng
                            </span>

                        </Link>

                        <Link to="/news/newsDetail" className="group relative flex h-72 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg tablet:col-span-2 tablet:h-80">
                            <img
                                src="https://static.thiennguyen.app/public/news/photo/2022/11/24/6f3d953a-1fb3-4974-ba4d-5517da9553d7.jpg"
                                loading="lazy"
                                alt="Photo by Martin Sanchez"
                                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                            />

<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent text-end mt-3">
                                <span class=" bg-green-100 text-green-800 text-sm font-medium me-2 px-2 py-1 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">19:00 Th2 19/02/2024</span>

                            </div>

                            <span className="relative ml-4 mb-3 inline-block text-base tablet:text-2xl font-bold text-white tablet:ml-5 tablet:text-lg break-words  w-3/4 ">
                                Chủ tịch Chương Nhật Trầu đã chiếm đoạt hàng tỷ đồng
                            </span>
                        </Link>

                        <Link to="/news/newsDetail" className="group relative flex h-72 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg tablet:h-80">

                            <img
                                src="https://static.thiennguyen.app/public/news/photo/2022/11/1/24e35b08-9aae-4462-b444-0d2af97505e8.jpg"
                                loading="lazy"
                                alt="Photo by Lorenzo Herrera"
                                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                            />

                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent text-end mt-3">
                                <span class=" bg-green-100 text-green-800 text-sm font-medium me-2 px-2 py-1 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">19:00 Th2 19/02/2024</span>

                            </div>

                            <span className="relative ml-4 mb-3 inline-block text-base tablet:text-2xl font-bold text-white tablet:ml-5 tablet:text-lg break-words  w-3/4 ">
                                Chủ tịch Chương Nhật Trầu đã chiếm đoạt hàng tỷ đồng

                            </span>
                        </Link>
                    </div>

                </div>
            </div>
            <div className="w-full flex justify-center">
                <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Xem thêm</button>

            </div>
        </div>
    );
}
