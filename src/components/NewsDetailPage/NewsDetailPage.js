import React from "react";
import { Helmet } from "react-helmet";

export default function NewsDetailPage() {
    return <div>
         <Helmet>
            <title>Nền tảng Thiện nguyện của MB được vinh danh tại Human Act Prize 2023</title>
                <meta
                name="description"
                content="Tin tức về nền tảng Thiện nguyện của MB được vinh danh tại Human Act Prize 2023"
                />
        </Helmet>
        {/* Nếu làm trang này thì hãy truyền title vào helmet nữa nhé */}
        <div className="w-4/5 mx-auto ">
            <div className="bg-vmo w-full h-48 tablet:h-96 flex justify-center rounded-xl bg-cover bg-no-repeat bg-[url('https://i.pinimg.com/originals/98/00/57/980057eb7075eec500fd49d88c9cf590.gif')]" >
            </div>

            <div>
                <p className="text-sm text-gray-400 my-4">13 tháng 2 , 2023</p>
                <h1 className="text-xl mobile:text-3xl font-bold mb-6 text-justify" >Nền tảng Thiện nguyện của MB được vinh danh tại Human Act Prize 2023</h1>
                <p className="my-3 text-sx mobile:text-xl font-bold text-justify">Sự ra đời của App Thiện nguyện được ví như liều thuốc hóa giải “nỗi đau”
                    của xã hội, kịp thời lấy lại niềm tin cho cộng đồng trong việc quản lý
                    minh bạch các tài khoản thiện nguyện, để những khoản đóng góp được trao
                    đến đúng tay người cần giúp đỡ.</p>
                <p className="text-sm text-justify">Sau chuỗi hoạt động triển lãm CSR và chia sẻ những câu chuyện, bài học quý
                    giá từ các dự án vì cộng đồng, tối ngày 11/12, tại Nhà hát Hồ Gươm (Hà Nội
                    đã diễn ra Đêm Gala tổng kết hành trình và trao giải Giải Thưởng Hành Động
                    Vì Cộng Đồng 2023 (Human Act Prize). Đây là giải thưởng thường niên do Báo
                    Nhân Dân chỉ đạo tổ chức, với sự tham gia đồng hành của Bộ Lao động - Thương
                    binh và Xã hội, Bộ Tài nguyên và Môi trường, Bộ Khoa học và Công nghệ, cùng
                    sự phối hợp tổ chức của Công ty Cổ phần VCCorp, nhằm tôn vinh các cá nhân,
                    tổ chức có đóng góp tích cực cho xã hội thông qua những sáng kiến, dự án cộng
                    đồng uy tín, mang lại hiệu quả lâu dài và bền vững.</p>
                <div className="flex justify-center my-10 w-full ">
                    <img className=" w-1/2 h-1/2"  src="https://images.pexels.com/photos/12439594/pexels-photo-12439594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>
                <p className="text-sm text-justify">Sau chuỗi hoạt động triển lãm CSR và chia sẻ những câu chuyện, bài học quý
                    giá từ các dự án vì cộng đồng, tối ngày 11/12, tại Nhà hát Hồ Gươm (Hà Nội
                    đã diễn ra Đêm Gala tổng kết hành trình và trao giải Giải Thưởng Hành Động
                    Vì Cộng Đồng 2023 (Human Act Prize). Đây là giải thưởng thường niên do Báo
                    Nhân Dân chỉ đạo tổ chức, với sự tham gia đồng hành của Bộ Lao động - Thương
                    binh và Xã hội, Bộ Tài nguyên và Môi trường, Bộ Khoa học và Công nghệ, cùng
                    sự phối hợp tổ chức của Công ty Cổ phần VCCorp, nhằm tôn vinh các cá nhân,
                    tổ chức có đóng góp tích cực cho xã hội thông qua những sáng kiến, dự án cộng
                    đồng uy tín, mang lại hiệu quả lâu dài và bền vững.</p>

                <div className="flex justify-end text-end pr-10 my-5">
                    <div className="flex-col">
                        <h3 className="font-bold">Truong mag nú</h3>
                        <div className="text-center">
                            <span className="">@admin</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>;
}
