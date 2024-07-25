import React from "react";
import {
  Building2,
  Goal,
  HandCoins,
  HeartHandshake,
  UserPlus,
  UsersRound,
} from "lucide-react";
import image_src from "../../../assets/images/call_for_action_image_full.svg";
import { axiosPublic } from "../../../api/axiosInstance";
import {
  GET_ALL_AMOUNT_OF_DONATE_PHASE,
  GET_NUMBER_OF_ACCOUNT,
  GET_NUMBER_OF_ACTIVATED_CAMPAIGN,
  GET_NUMBER_OF_DONATED_ACCOUNT,
  GET_NUMBER_OF_ORGANIZATION,
  GET_NUMBER_OF_TRANSACTION,
} from "../../../api/apiConstants";
import { Skeleton } from "../../ui/skeleton";
import axios from "axios";

const CallForActionSection = () => {
  const [data, setData] = React.useState({
    numberOfAccounts: 0,
    numberOfDonatedAccounts: 0,
    numberOfActivatedCampaigns: 0,
    totalAmountOfDonatePhase: 0,
    numberOfTransactions: 0,
    numberOfOrganizations: 0,
  });

  const [dataLoadingStatus, setDataLoadingStatus] = React.useState({
    numberOfAccounts: true,
    numberOfDonatedAccounts: true,
    numberOfActivatedCampaigns: true,
    totalAmountOfDonatePhase: true,
    numberOfTransactions: true,
    numberOfOrganizations: true,
  });

  const [dataLoaded, setDataLoaded] = React.useState(false);

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchData = async () => {
      setDataLoaded(false);
      setDataLoadingStatus({
        numberOfAccounts: true,
        numberOfDonatedAccounts: true,
        numberOfActivatedCampaigns: true,
        totalAmountOfDonatePhase: true,
        numberOfTransactions: true,
        numberOfOrganizations: true,
      });
      try {
        const urls = [
          GET_NUMBER_OF_ACCOUNT,
          GET_NUMBER_OF_DONATED_ACCOUNT,
          GET_NUMBER_OF_ACTIVATED_CAMPAIGN,
          GET_ALL_AMOUNT_OF_DONATE_PHASE,
          GET_NUMBER_OF_TRANSACTION,
          GET_NUMBER_OF_ORGANIZATION,
        ];

        const requests = urls.map((url) => axiosPublic.get(url, { signal }));
        const responses = await Promise.all(requests);

        setData({
          numberOfAccounts: responses[0].data.data,
          numberOfDonatedAccounts: responses[1].data.data,
          numberOfActivatedCampaigns: responses[2].data.data,
          totalAmountOfDonatePhase: responses[3].data.data,
          numberOfTransactions: responses[4].data.data,
          numberOfOrganizations: responses[5].data.data,
        });
        setDataLoadingStatus({
          numberOfAccounts: false,
          numberOfDonatedAccounts: false,
          numberOfActivatedCampaigns: false,
          totalAmountOfDonatePhase: false,
          numberOfTransactions: false,
          numberOfOrganizations: false,
        });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Lỗi khi lấy dữ liệu từ API:", error);
          // Xử lý lỗi
        }
      } finally {
        setDataLoaded(true);
      }
    };

    fetchData();
    return () => {
      abortController.abort();
    };
  }, []);

  // Hàm format số tiền ủng hộ
  const formatMoney = (money) => {
    // Ensure money is a string
    const moneyStr = money.toString();
    // Remove non-digit characters from the input money
    const cleanValue = moneyStr.replace(/\D/g, "");
    // Format the money with thousand separators
    const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedValue;
  };

  return (
    <>
      {/* Icon Blocks */}
      <div className="bg-green-theme-thirdly dark:bg-gray-900 p-24">
        <div className="max-w-screen-desktop mx-auto">
          {/* Grid */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl text-center font-semibold mb-4">
              Số liệu thống kê về nền tảng <br />{" "}
              <span className="font-bold">VMO</span>
            </p>
            <div className="grid tablet:grid-cols-3 gap-6 lg:gap-12">
              <div className="col-span-1 place-self-center">
                <img src={image_src} alt="Ảnh" className="w-full h-full" />
              </div>
              <div className="grid tablet:col-span-2 tablet:grid-cols-2 gap-6 lg:gap-12">
                <div className="space-y-6 col-span-1 lg:space-y-10 place-self-center">
                  <div>
                    {/* Icon Block */}
                    <div className="flex">
                      <Building2 className="flex-shrink-0 mt-2 h-8 w-8 text-[#14452F]" />
                      <div className="ms-5 sm:ms-8">
                        <h3 className="text-base sm:text-lg font-semibold">
                          Số lượng tổ chức thiện nguyện
                        </h3>
                        {dataLoadingStatus.numberOfOrganizations ||
                        data.numberOfOrganizations === 0 ? (
                          <Skeleton className="w-10 h-4 bg-green-theme-primary" />
                        ) : (
                          <p className="mt-1 font-bold text-green-theme-primary">
                            {data.numberOfOrganizations}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* End Icon Block */}
                    {/* Icon Block */}
                    <div className="flex">
                      <Goal className="flex-shrink-0 mt-2 h-8 w-8 text-[#14452F]" />
                      <div className="ms-5 sm:ms-8">
                        <h3 className="text-base sm:text-lg font-semibold">
                          Số lượng chiến dịch thiện nguyện
                        </h3>
                        {dataLoadingStatus.numberOfActivatedCampaigns ||
                        data.numberOfActivatedCampaigns === 0 ? (
                          <Skeleton className="w-10 h-4 bg-green-theme-primary" />
                        ) : (
                          <p className="mt-1 font-bold text-green-theme-primary">
                            {data.numberOfActivatedCampaigns}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* End Icon Block */}
                    {/* Icon Block */}
                    <div className="flex">
                      <UsersRound className="flex-shrink-0 mt-2 h-8 w-8 text-[#14452F]" />
                      <div className="ms-5 sm:ms-8">
                        <h3 className="text-base sm:text-lg font-semibold">
                          Số lượng cá nhân thiện nguyện
                        </h3>
                        {dataLoadingStatus.numberOfDonatedAccounts ||
                        data.numberOfDonatedAccounts === 0 ? (
                          <Skeleton className="w-10 h-4 bg-green-theme-primary" />
                        ) : (
                          <p className="mt-1 font-bold text-green-theme-primary">
                            {data.numberOfDonatedAccounts}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 col-span-1 lg:space-y-10 place-self-center">
                  <div>
                    <div className="flex">
                      <HandCoins className="flex-shrink-0 mt-2 h-8 w-8 text-[#14452F]" />
                      <div className="ms-5 sm:ms-8">
                        <h3 className="text-base sm:text-lg font-semibold">
                          Tổng giá trị đổi ra tiền đã ủng hộ
                        </h3>
                        {dataLoadingStatus.totalAmountOfDonatePhase ||
                        data.totalAmountOfDonatePhase === 0 ? (
                          <Skeleton className="w-10 h-4 bg-green-theme-primary" />
                        ) : (
                          <p className="mt-1 font-bold text-green-theme-primary">
                            {formatMoney(data.totalAmountOfDonatePhase)} VNĐ
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex">
                      <UserPlus className="flex-shrink-0 mt-2 h-8 w-8 text-[#14452F]" />
                      <div className="ms-5 sm:ms-8">
                        <h3 className="text-base sm:text-lg font-semibold">
                          Số lượng người dùng
                        </h3>
                        {dataLoadingStatus.numberOfAccounts ||
                        data.numberOfAccounts === 0 ? (
                          <Skeleton className="w-10 h-4 bg-green-theme-primary" />
                        ) : (
                          <p className="mt-1 font-bold text-green-theme-primary">
                            {data.numberOfAccounts}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex">
                      <HeartHandshake className="flex-shrink-0 mt-2 h-8 w-8 text-[#14452F]" />
                      <div className="ms-5 sm:ms-8">
                        <h3 className="text-base sm:text-lg font-semibold">
                          Tổng số lượt đã ủng hộ của người dùng
                        </h3>
                        {dataLoadingStatus.numberOfTransactions ||
                        data.numberOfTransactions === 0 ? (
                          <Skeleton className="w-10 h-4 bg-green-theme-primary" />
                        ) : (
                          <p className="mt-1 font-bold text-green-theme-primary">
                            {data.numberOfTransactions}
                          </p>
                        )}
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
