import React from "react";
import { BrainCogIcon, PackageIcon, ZapIcon } from "lucide-react";

const CallForActionSection = () => {
  return (
    <>
      {/* Icon Blocks */}
      <div className="bg-green-theme-thirdly dark:bg-gray-900 p-24">
        <div className="max-w-screen-desktop mx-auto">
          {/* Grid */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl text-center font-semibold mb-4">
              Đồng hành dễ dàng hơn cùng <br /> <span className="font-bold">VMO</span> 
            </p>
            <div className="grid tablet:grid-cols-3 gap-6 lg:gap-12">
              <div className="space-y-6 col-span-1 lg:space-y-10 place-self-center">
                <img src="https://via.placeholder.com/360x150" alt="Ảnh" />
              </div>
              <div className="grid tablet:col-span-2 tablet:grid-cols-2 gap-6 lg:gap-12">
                <div className="space-y-6 col-span-1 lg:space-y-10 place-self-center">
                  <div>
                    {/* Icon Block */}
                    <div className="flex">
                      {/* <BrainCogIcon className="flex-shrink-0 mt-2 h-8 w-8" /> */}
                      <div className="ms-5 sm:ms-8">
                        <h3 className="text-base sm:text-lg font-semibold">
                          Số lượng tổ chức thiện nguyện
                        </h3>
                        <p className="mt-1 text-muted-foreground">
                          Số lượng...
                        </p>
                      </div>
                    </div>
                    {/* End Icon Block */}
                    {/* Icon Block */}
                    <div className="flex">
                      {/* <PackageIcon className="flex-shrink-0 mt-2 h-8 w-8" /> */}
                      <div className="ms-5 sm:ms-8">
                        <h3 className="text-base sm:text-lg font-semibold">
                          Số lượng chiến dịch thiện nguyện
                        </h3>
                        <p className="mt-1 text-muted-foreground">
                          Số lượng...
                        </p>
                      </div>
                    </div>
                    {/* End Icon Block */}
                    {/* Icon Block */}
                    <div className="flex">
                      {/* <ZapIcon className="flex-shrink-0 mt-2 h-8 w-8" /> */}
                      <div className="ms-5 sm:ms-8">
                        <h3 className="text-base sm:text-lg font-semibold">
                          Số lượng cá nhân thiện nguyện
                        </h3>
                        <p className="mt-1 text-muted-foreground">
                          Số lượng...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 col-span-1 lg:space-y-10 place-self-center">
                  <div>
                    <div className="flex">
                      {/* <BrainCogIcon className="flex-shrink-0 mt-2 h-8 w-8" /> */}
                      <div className="ms-5 sm:ms-8">
                        <h3 className="text-base sm:text-lg font-semibold">
                          Tổng giá trị đổi ra tiền đã ủng hộ
                        </h3>
                        <p className="mt-1 text-muted-foreground">
                          Số lượng...
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      {/* <PackageIcon className="flex-shrink-0 mt-2 h-8 w-8" /> */}
                      <div className="ms-5 sm:ms-8">
                        <h3 className="text-base sm:text-lg font-semibold">
                          Số lượng thành viên tham gia
                        </h3>
                        <p className="mt-1 text-muted-foreground">
                          Số lượng...
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      {/* <ZapIcon className="flex-shrink-0 mt-2 h-8 w-8" /> */}
                      <div className="ms-5 sm:ms-8">
                        <h3 className="text-base sm:text-lg font-semibold">
                          Tổng số lượt đã ủng hộ của người dùng
                        </h3>
                        <p className="mt-1 text-muted-foreground">
                          Số lượng...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallForActionSection;
