import React,{ useEffect} from "react";
import Datepicker from "flowbite-datepicker/Datepicker";

export default function SignUpVerifyOrganizePage() {
    // const [value, setValue] = useState();
    // const dobHandler = (e) => {
    //     console.log(e.target.value);
    // }
    useEffect(() => {
        const datepickerEl = document?.getElementById("datepickerId");
        new Datepicker(datepickerEl, {});
    }, []);
  return <div>

  <div className="bg-orange-300 w-full h-14 flex justify-center items-center ">
      <h1 className=" text-sx mobile:text-2xl font-medium">Đăng kí tài khoản thiện nguyện tổ chức</h1>
  </div>

  <div className="w-3/4 mx-auto">
      {/* <div className="flex justify-center w-full h-52 my-8 " >
          <img src="https://i.pinimg.com/564x/36/be/28/36be287cc396c609ba13fbf7ffa981cb.jpg" className="w-full rounded-xl" alt="ảnh nền" />
      </div> */}
      <div className="w-full h-48 tablet:h-60 my-4 flex justify-center rounded-xl bg-center bg-contain bg-[url('https://i.pinimg.com/564x/a4/65/77/a46577eabca06fc400fc092f89ef9c7e.jpg')]" >
          {/* <img src="https://i.pinimg.com/564x/36/be/28/36be287cc396c609ba13fbf7ffa981cb.jpg" className="w-full rounded-xl" alt="ảnh nền" /> */}
      </div>


      <div className=" bg-vmo rounded-xl">
          <div className="bg-black text-center rounded-tl-xl rounded-tr-xl py-3">
              <span className="text-white text-sm mobile:text-xl font-semibold ">Vui lòng điền thông tin bên dưới để chúng tôi có thể tin tưởng bạn!</span>
          </div>
          <form class=" w-3/4 laptop:max-w-4xl mx-auto my-8">
              <div class="mb-5 ">
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên tổ chức *</label>
                  <input type="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập tên..." required />
              </div>
              <div class="mb-5">
                  <label for="dateOfBirth" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày thành lập</label>
                  <div class="relative w-full ">
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
                                    id="datepickerId"
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
              <div class="mb-5">
                  <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website hoặc trang tin điện tử *</label>
                  <input type="website" id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Website..." required />
              </div>
              <div class="mb-5">
                  <label for="fieldOfWork" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lĩnh vực hoạt động chính *</label>
                  <input type="fieldOfWork" id="fieldOfWork" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="vd: Kinh doanh" required />
              </div>
              <div class="mb-5">
                  <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ trụ sở chính *</label>
                  <input type="address" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div class="mb-5">
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">Email tài khoản người dùng của tổ chức trên ứng dụng VMO (tochucthiennguyen@gmail.com) *</label>
                  <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="vd: tddkhoa0811@gmail.com -> email đã đăng ký trên hệ thống" required />
              </div>
              
              
             
              <div class="mb-5">
                  <label for="linkOfInfo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-justify">Thông tin giới thiệu hoạt động, kinh nghiệm, kế hoạch thiện nguyện của tổ chức (Đường dẫn Facebook, website, youtube, instagram, tiktok . . .) *</label>
                  <input type="linkOfInfo" id="linkOfInfo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div class="mb-5">
                  <label for="linkOfAchievement" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white  text-justify">Thành tích, khen thưởng, được ghi nhận trong hoạt động tình nguyện, cộng đồng, xã hội (Đoạn văn ngắn bao gồm đường dẫn/link hoặc đính kèm hình ảnh minh hoạ)*</label>
                  <span className="text-xs mobile:text-sm">(Chấp nhận các file ảnh, MS Word, MS Excel. Tối đa 5 file, mỗi file dung lượng tối đa 20MB)</span>
                  <input type="linkOfAchievement" id="linkOfAchievement" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>

              <div class="mb-5 bg-orange-400 p-5 rounded-xl">
                  <span className="text-white text-sm mobile:text-xl font-semibold">Thông tin người đại diện tổ chức </span>
              </div>
              <div class="mb-5">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên *</label>
                        <input type="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập tên..." required />
                    </div>
                  
                    <div class="mb-5">
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại *</label>
                        <input type="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập số điện thoại..." pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                    </div>
                    <div class="mb-5">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email *</label>
                        <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="vd: tddkhoa0811@gmail.com -> email đã đăng ký trên hệ thống" required />
                    </div>
              <div class="mb-5 bg-orange-400 p-5 rounded-xl">
                  <span className="text-white text-sm mobile:text-xl font-semibold text-justify">Cam kết mục đích sử dụng Tài khoản thanh toán minh bạch   </span>
              </div>

              <div>
                  <span class="block mb-2 text-sx mobile:text-lg font-bold text-gray-900 dark:text-white text-justify ">Anh chị/tổ chức cam kết sử dụng VMO cho mục đích *</span>
                  <ul className="flex flex-col gap-4 mb-2  text-sm mobile:text-base text-justify">
                      <li>- Vận động, tiếp nhận các nguồn đóng góp tự nguyện</li>
                      <li>- Vận động gây quỹ nhằm phát triển, thực hiện các dự án cộng đồng</li>
                      <li>- Để công khai minh bạch đối với nhà tài trợ, người ủng hộ, người đóng góp</li>
                      <li>- Các mục đích phi lợi nhuận khác</li>
                  </ul>

                  <span class="block mb-2  text-sx mobile:text-lg font-bold text-gray-900 dark:text-white text-justify">Anh chị/tổ chức phải đảm bảo sao kê đầy đủ thông tin hình ảnh tất cả sau khi chiến dịch kết thúc (tối thiểu 30 ngày kể từ ngày chiến dịch kết thúc)</span>

                  <span class="block mb-2  text-sx mobile:text-lg font-bold text-gray-900 dark:text-white text-justify">Anh chị/tổ chức vui lòng đọc các quy định về pháp luật dưới đây để nắm rõ *</span>
                  <ul className="flex flex-col gap-4 mb-2 text-sm mobile:text-base text-justify">
                      <li>- Nghị định 93/2021/NĐ-CP về vận động, tiếp nhận, phân phối và sử dụng các nguồn đóng góp tự nguyện hỗ trợ khắc phục khó khăn do thiên tai, dịch bệnh, sự cố; hỗ trợ bệnh nhân mắc bệnh hiểm nghèo</li>
                      <li>- Nghị định 93/2019/NĐ-CP về tổ chức, hoạt động của quỹ xã hội, quỹ từ thiện</li>
                      <li>- Thông tư 41/2022/TT-BTC hướng dẫn Chế độ kế toán áp dụng cho các hoạt động xã hội, từ thiện các quy định pháp luật liên quan</li>
                  </ul>
                  <span class="block mb-2  text-sx mobile:text-lg font-bold text-gray-900 dark:text-white text-justify">Mọi hành vi thiện nguyện trái với mục tiêu đạo đức hoặc vi phạm pháp luật phải chịu trách nhiệm bạn có:</span>
                  <div class="flex items-start mb-5">
                      <div class="flex items-center h-5">
                          <input id="agree" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                      </div>
                      <label for="agree" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Đồng ý </label>
                  </div>
                  <span class="block mb-2 text-sm font-medium text-red-600 dark:text-white text-justify">**Lưu ý: Mọi thông tin bạn điền sẽ là bằng chứng cho mọi hành vi phạm pháp của anh/chị/tổ chức trước pháp luật.</span>
              </div>

              <div className="flex justify-end">
                  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-10 mobile:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-4">Gửi</button>

              </div>
          </form>
      </div>



  </div>


</div>;
}
