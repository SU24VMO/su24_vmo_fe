import React from "react";

const TermsPage = () => {
  return (
    <div className="mobile:px-24">
      {/* TITLE */}
      <div className="w-full flex items-center justify-center py-5 px-3 bg-gray-100">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Điều khoản sử dụng</h1>
          <p className="text-lg">Cập nhật lần cuối: 27/05/2024, 10:00</p>
        </div>
      </div>
      {/* CONTENTS */}
      <div className="py-5 px-5">
        <div>
          <p>
            Chào mừng bạn đến với ứng dụng Thiện nguyện minh bạch - VMO. Trên
            hành trình thực hiện sứ mệnh thiện nguyện, lan tỏa yêu thương của
            mình, VMO hi vọng bạn vui lòng dành thời gian đọc, tìm hiểu những
            điều khoản sau đây
          </p>
          <div className="my-3">
            {/* SECTION 1 */}
            <div>
              <p className="font-bold my-5">GIẢI THÍCH KHÁI NIỆM</p>
              <p className="mb-3">
                1. <strong>“Ứng dụng Thiện nguyện”</strong> (Gọi tắt là ứng
                dụng) là giải pháp công nghệ cung cấp các tiện ích và công cụ
                cho các cá nhân, câu lạc bộ, hội, đội, nhóm đang hoạt động liên
                quan đến lĩnh vực tình nguyện, nhân đạo, từ thiện, hoạt động xã
                hội, tình nguyện vì mục tiêu phát triển bền vững tổ chức các
                chiến dịch cộng đồng theo tiêu chí công khai, minh bạch, hiệu
                quả. Ứng dụng ra đời với mục tiêu xây dựng một cộng đồng những
                cá nhân theo đuổi sứ mệnh thiện nguyện minh bạch, bền vững, lan
                toả những giá trị tốt đẹp trong cộng đồng.
              </p>
              <p className="mb-3">
                2. <strong>“Người dùng”</strong> ứng dụng là các cá nhân và tổ
                chức tham gia vào hoạt động thiện nguyện cộng đồng trên nền tảng
                dưới các vai trò khác nhau như người vận động, người ủng hộ,
                người tạo nội dung. Các tổ chức, câu lạc bộ, đội, nhóm tình
                nguyện có tư cách pháp nhân trực thuộc các tổ chức tại địa
                phương hoặc tư lập chưa hoặc không có tư cách pháp nhân.
              </p>
              <p className="mb-3">
                3. <strong>“Người vận động”</strong> là các cá nhân bao gồm
                nhưng không giới hạn các ngành nghề như nhà báo, nghệ sĩ, ca sĩ,
                diễn viên, vận động viên thể thao nhà hoạt động xã hội có ảnh
                hưởng tốt trong xã hội, cộng đồng, có mong muốn và khả năng tổ
                chức các chiến dịch gây quỹ cộng đồng, đề cao giá trị minh bạch
                trong hoạt động thiện nguyện. Cá nhân có đủ năng lực hành vi dân
                sự theo quy định tại Nghị định 93/2021/NĐ-CP và các quy định có
                liên quan.
              </p>
              <p className="mb-3">
                4. <strong>“Người ủng hộ”</strong> là tất cả các cá nhân, tổ
                chức có mong muốn tham gia cộng đồng thiện nguyện minh bạch
                thông qua tải ứng dụng và đăng ký thành viên.
              </p>
              <p className="mb-3">
                5. <strong>“Tài khoản xác thực”</strong>: là tài khoản thiện
                nguyện được liên kết với tài khoản của Người vận động trên ứng
                dụng Thiện nguyện nhằm hiển thị thông tin tài khoản thiện nguyện
                được liên kết đồng thời cập nhật các hoạt động liên quan đến
                việc phát động chiến dịch, vận động, tiếp nhận và phân phối.
              </p>
              <p className="mb-3">
                6. <strong>“Tài khoản người dùng”</strong> là tài khoản được mở
                cho tất cả cá nhân và tổ chức trên ứng dụng Thiện nguyện nhằm tổ
                chức và tham gia các hoạt động thiện nguyện.
              </p>
              <p className="mb-3">
                7. <strong>“VietQR”</strong>: là nhận diện thương hiệu dành cho
                các dịch vụ thanh toán, chuyển khoản bằng mã QR được xử lý qua
                mạng lưới Napas, các Ngân hàng thành viên, Trung gian thanh
                toán, các đối tác thanh toán tại Việt Nam và Quốc tế của Napas.
              </p>
            </div>
            {/* SECTION 2 */}
            <div>
              <p className="font-bold my-5">NGUYÊN TẮC HOẠT ĐỘNG</p>
              <p className="mb-3">
                1. Ứng dụng Thiện nguyện là giải pháp nhằm ứng dụng công nghệ
                vào giải quyết các bài toán về kết nối và lan tỏa hoạt động nhân
                đạo, từ thiện, phát triển cộng đồng, mục tiêu trở thành một mạng
                xã hội chuyên sâu về thiện nguyện tại Việt Nam.
              </p>
              <p className="mb-3">
                2. Ứng dụng Thiện nguyện là nền tảng nhân đạo thiện nguyện phi
                lợi nhuận và không thu chi phí quản lý hay bất kỳ chi phí gì của
                người dùng. 100% số tiền ủng hộ cho các chiến dịch nhận được sẽ
                được sử dụng đúng với mục đích kêu gọi.
              </p>
              <p className="mb-3">
                3. Ứng dụng Thiện nguyện hoạt động trên tôn chỉ thúc đẩy tính
                minh bạch của hoạt động từ thiện tại Việt Nam, thông qua cơ chế
                giám sát công khai từ cộng đồng.
              </p>
            </div>
            {/* SECTION 3 */}
            <div>
              <p className="font-bold my-5">CÁC HÀNH VI BỊ CẤM</p>
              <p className="mb-3">
                1. Cản trở hoặc ép buộc tổ chức, cá nhân tham gia hoạt động
                thiện nguyện.
              </p>
              <p className="mb-3">
                2. Báo cáo sai sự thật, gian lận, chiếm đoạt, sử dụng trái phép
                tiền, hàng do các tổ chức, cá nhân trong nước, ngoài nước ủng
                hộ, đóng góp.
              </p>
              <p className="mb-3">
                3. Lợi dụng hoạt động thiện nguyện để vụ lợi.
              </p>
            </div>
            {/* SECTION 4 */}
            <div>
              <p className="font-bold my-5">MỤC TIÊU KÊU GỌI GÂY QUỸ</p>
              <p className="mb-3">
                Với mục tiêu trở thành mạng xã hội thiện nguyện đầu tiên tại
                Việt Nam, xây dựng và phát triển lớn mạnh cộng đồng những cá
                nhân, tổ chức theo đuổi sứ mệnh thiện nguyện minh bạch, vì sự
                phát triển bền vững của cộng đồng, các mục tiêu kêu gọi gây quỹ
                trên ứng dụng Thiện nguyện khuyến khích phù hợp với 17 mục tiêu
                phát triển bền vững đã được Chính phủ ban hành tại Nghị quyết
                136/NQ-CP ngày 25/9/2020. Cụ thể các mục tiêu gồm:
              </p>
              <p className="mb-3">
                1. Mục tiêu 1: Chấm dứt mọi hình thức nghèo ở mọi nơi.
              </p>
              <p className="mb-3">
                2. Mục tiêu 2: Xóa đói, bảo đảm an ninh lương thực, cải thiện
                dinh dưỡng và thúc đẩy phát triển nông nghiệp bền vững.
              </p>
              <p className="mb-3">
                3. Mục tiêu 3: Bảo đảm cuộc sống khỏe mạnh và tăng cường phúc
                lợi cho mọi người ở mọi lứa tuổi.
              </p>
              <p className="mb-3">
                4. Mục tiêu 4: Đảm bảo nền giáo dục có chất lượng, công bằng,
                toàn diện và thúc đẩy các cơ hội học tập suốt đời cho tất cả mọi
                người.
              </p>
              <p className="mb-3">
                5. Mục tiêu 5: Đạt được bình đẳng giới; tăng quyền và tạo cơ hội
                cho phụ nữ và trẻ em gái.
              </p>
              <p className="mb-3">
                6. Mục tiêu 6: Đảm bảo đầy đủ và quản lý bền vững tài nguyên
                nước và hệ thống vệ sinh cho tất cả mọi người.
              </p>
              <p className="mb-3">
                7. Mục tiêu 7: Đảm bảo khả năng tiếp cận nguồn năng lượng bền
                vững, đáng tin cậy và có khả năng chi trả cho tất cả mọi người.
              </p>
              <p className="mb-3">
                8. Mục tiêu 8: Đảm bảo tăng trưởng kinh tế bền vững, toàn diện,
                liên tục; tạo việc làm đầy đủ, năng suất và việc làm tốt cho tất
                cả mọi người.
              </p>
              <p className="mb-3">
                9. Mục tiêu 9: Xây dựng cơ sở hạ tầng có khả năng chống chịu
                cao, thúc đẩy công nghiệp hóa bao trùm và bền vững, tăng cường
                đổi mới.
              </p>
              <p className="mb-3">
                10. Mục tiêu 10: Giảm bất bình đẳng trong xã hội.
              </p>
              <p className="mb-3">
                11. Mục tiêu 11: Phát triển đô thị, nông thôn bền vững, có khả
                năng chống chịu; đảm bảo môi trường sống và làm việc an toàn;
                phân bổ hợp lý dân cư và lao động theo vùng.
              </p>
              <p className="mb-3">
                12. Mục tiêu 12: Đảm bảo sản xuất và tiêu dùng bền vững.
              </p>
              <p className="mb-3">
                13. Mục tiêu 13: Ứng phó kịp thời, hiệu quả với biến đổi khí hậu
                và thiên tai.
              </p>
              <p className="mb-3">
                14. Mục tiêu 14: Bảo tồn và sử dụng bền vững đại dương, biển và
                nguồn lợi biển để phát triển bền vững.
              </p>
              <p className="mb-3">
                15. Mục tiêu 15: Bảo vệ và phát triển rừng bền vững, bảo tồn đa
                dạng sinh học, phát triển dịch vụ hệ sinh thái, chống sa mạc
                hóa, ngăn chặn suy thoái và phục hồi tài nguyên đất.
              </p>
              <p className="mb-3">
                16. Mục tiêu 16: Thúc đẩy xã hội hòa bình, dân chủ, công bằng,
                bình đẳng, văn minh vì sự phát triển bền vững, tạo khả năng tiếp
                cận công lý cho tất cả mọi người; xây dựng các thể chế hiệu quả,
                có trách nhiệm giải trình và có sự tham gia ở các cấp.
              </p>
              <p className="mb-3">
                17. Mục tiêu 17: Tăng cường phương thức thực hiện và thúc đẩy
                đối tác toàn cầu vì sự phát triển bền vững.
              </p>
              <p className="mb-3">
                <i>
                  Chi tiết tham khảo tại Nghị quyết 136/NQ-CP được ban hành ngày
                  25/9/2020.
                </i>
              </p>
            </div>
            {/* SECTION 5 */}
            <div>
              <p className="font-bold my-5">DÀNH CHO NGƯỜI VẬN ĐỘNG</p>
              <p className="mb-3">
                1. Ứng dụng là nền tảng phi lợi nhuận, Người gây quỹ tự nguyện
                tham gia và không nhận bất kỳ khoản thù lao dưới bất kỳ hình
                thức nào và không sở hữu bất kỳ tài sản nào của Ứng Dụng.
              </p>
              <p className="mb-3">
                2. Khi đăng ký tham gia dưới vai trò Người vận động, mỗi cá nhân
                bắt buộc phải hoàn thành bản đăng ký tham gia cộng đồng thiện
                nguyện minh bạch: họ tên, năm sinh, giới tính, ngành nghề, trình
                độ, số điện thoại và địa chỉ email, tên quỹ/câu lạc bộ/nhóm
                thiện nguyện do cá nhân điều hành, tôn chỉ, mục đích, kinh
                nghiệm, thời gian hoạt động thiện nguyện. . . Người vận động
                đồng ý cho VMO chia sẻ thông tin này với Người Dùng.
              </p>
              <p className="mb-3">
                3. Khuyến khích người vận động phát động các chiến dịch có mục
                tiêu hưởng ứng lời kêu gọi, chiến dịch của Ủy ban Mặt trận Tổ
                quốc Việt Nam và các tổ chính trị xã hội các cấp như Hội Chữ
                thập đỏ Việt Nam, Trung ương Đoàn TNCS Việt Nam, Hội Phụ nữ,
                Công đoàn Việt Nam, . . . Các cơ quan thông tin đại chúng (Báo,
                Đài).
              </p>
              <p className="mb-3">
                4. Khuyến khích Người vận động tuân thủ các quy định chi tiết
                tại Nghị định 93/2021/NĐ-CP Về vận động, tiếp nhận, phân phối và
                sử dụng các nguồn đóng góp tự nguyện hỗ trợ khắc phục khó khăn
                do thiên tai, dịch bệnh, sự cố; hỗ trợ bệnh nhân mắc bệnh hiểm
                nghèo.
              </p>
              <p className="mb-3">
                5. Khuyến khích gây quỹ với mục tiêu phù hợp với 17 mục tiêu
                phát triển bền vững đã được Chính phủ ban hành tại Nghị quyết
                136/NQ-CP ngày 25/9/2020. Mục tiêu cần được trình bày trung
                thực, rõ ràng, có bằng chứng khảo sát, xác minh cụ thể, cập
                nhật.
              </p>
              <p className="mb-3">
                6. Những mục tiêu sau đây sẽ không được kêu gọi gây quỹ tại ứng
                dụng Thiện nguyện: Kêu gọi góp Vốn hoặc góp Cổ phần, không liên
                quan tới các hoạt động thiết thực hoặc hữu ích cho xã hội, Mâu
                thuẫn với nguyên tắc hoạt động và các tiêu chuẩn đạo đức và
                chuẩn mực xã hội; Liên quan tới các hoạt động chính trị và tôn
                giáo; Nội dung các mục tiêu trái quy định của pháp luật, Không
                phù hợp với mục tiêu và sứ mệnh của nền tảng Thiện nguyện.
              </p>
              <p className="mb-3">
                7. Người vận động cần mở Tài khoản xác thực và đồng ý cho VMO
                công khai, minh bạch số dư, hoạt động chiến dịch, mọi giao dịch
                thu, chi với cộng đồng thông qua ứng dụng VMO đồng thời đồng ý
                với các Điều khoản Điều kiện của VMO liên quan đến Tài khoản
                thiện nguyện đã được xác thực.
              </p>
              <p className="mb-3">
                8. Người vận động có trách nhiệm tiếp nhận, quản lý, phân phối
                tiền trên tài khoản thiện nguyện tuân thủ các quy định tại Nghị
                định 93/2021/NĐ-CP và theo nguyên tắc hoạt động của nền tảng
                Thiện nguyện.
              </p>
              <p className="mb-3">
                9. Khuyến khích Người vận động truyền thông, thông tin rộng rãi
                ý nghĩa, mục tiêu, đối tượng được hỗ trợ của chiến dịch gây quỹ,
                thời gian, số hiệu tài khoản thiện nguyện tiếp nhận tiền ủng hộ
                trên các kênh thông tin đại chúng và các trang tin cá nhân trên
                các nền tảng mạng xã hội.
              </p>
              <p className="mb-3">
                10. Mục tiêu 10: Giảm bất bình đẳng trong xã hội.
              </p>
              <ul className="mb-3">
                <li>
                  - Hỗ trợ khẩn cấp: cứu đói, cứu rét (lương thực, thực phẩm,
                  chăn màn, quần áo, thuốc chữa bệnh...), cấp cứu người bị
                  thương; thăm hỏi gia đình có người bị nạn; hỗ trợ xây dựng nhà
                  bị đổ, bị trôi, bị hư hỏng nặng do ảnh hưởng của thiên tai,
                  hoả hoạn, sự cố nghiêm trọng nhằm ổn định cuộc sống trước mắt
                  đối với nạn nhân, thân nhân của nạn nhân;
                </li>
                <li>
                  - Hỗ trợ có tính chất lâu dài: Hỗ trợ kinh phí cho các nạn
                  nhân, gia đình nạn nhân, Hỗ duy trì, khắc phục sản xuất, Hỗ
                  trợ kinh phí để xoá nhà tạm, xây dựng cơ sở vật chất khác.
                </li>
              </ul>
            </div>
            {/* SECTION 6 */}
            <div>
              <p className="font-bold my-5">DÀNH CHO NGƯỜI ỦNG HỘ</p>
              <p className="mb-3">
                Ứng Dụng là nền tảng công nghệ giúp kết nối cộng đồng các cá
                nhân, tổ chức hoạt động thiện nguyện với tôn chỉ công khai minh
                bạch, kết nối giữa các cá nhân có kinh nghiệm và uy tín gây quỹ
                cộng đồng được Ứng dụng cấp quyền gây quỹ (‘Người vận động”) và
                “Người ủng hộ”, BẢN THÂN ỨNG DỤNG KHÔNG PHẢI MỘT QUỸ TỪ THIỆN
                hoặc TỔ CHỨC TỪ THIỆN XÃ HỘI. Do đó:
              </p>
              <p className="mb-3">
                1. “Người vận động” tự động tổ chức hoạt động gây quỹ tự nguyện,
                không theo sự chỉ đạo hay quản lý trực tiếp của một tổ chức hay
                đơn vị pháp nhân nào. Để tránh hiểu nhầm, VMO không phải chịu
                bất cứ trách nhiệm nào hoặc không đưa ra bất kỳ cam kết nào về
                tính chính xác hoặc mức độ hiệu quả về các chiến dịch gây quỹ
                được tổ chức trên ứng dụng Thiện nguyện;
              </p>
              <p className="mb-3">
                2. Ứng Dụng là một nền tảng công nghệ cung cấp cho người dùng
                các chiến dịch, hoạt động thiện nguyện để Người ủng hộ tự đánh
                giá, lựa chọn tham gia, ủng hộ theo nhu cầu và mong muốn thiện
                nguyện của mình. Người ủng hộ cần đánh giá, cân nhắc trước khi
                quyết định và hoàn toàn tự nguyện khi tham gia ủng hộ các chiến
                dịch, mục tiêu kêu gọi;
              </p>
              <p className="mb-3">
                3. VMO nỗ lực để kêu gọi “Người vận động” là các cá nhân có
                nhiều kinh nghiệm, uy tín trong cộng đồng trong lĩnh vực thiện
                nguyện. Tuy nhiên trong mọi trường hợp, VMO sẽ không chịu trách
                nhiệm cho bất kỳ tổn thất hoặc thiệt hại nào, bao gồm không giới
                hạn ở trực tiếp hoặc gián tiếp hoặc do hậu quả của tổn thất;
                hoặc bất kỳ tổn thất nào do hoạt động thiện nguyện trên ứng dụng
                gây ra.
              </p>
            </div>
            {/* SECTION 7 */}
            <div>
              <p className="font-bold my-5">QUY ĐỊNH KHÁC</p>
              <p className="mb-3">
                Nhằm hướng đến xây dựng cộng đồng thiện nguyện minh bạch đầu
                tiên tại Việt Nam, người dùng cần tuân thủ các quy định khác như
                sau:
              </p>
              {/* SUB SECTION */}
              <div>
                <p className="font-bold my-5">
                  1. Quy định về đặt tên tài khoản
                </p>
                <ul class="mb-3">
                  <li>
                    - Không được đặt tên tài khoản, nhân vật theo tên của danh
                    nhân, tên của các vị lãnh đạo, tên của trùm khủng bố, phát
                    xít, tội phạm, và tên của những cá nhân, tổ chức chống lại
                    Nhà nước Cộng hòa xã hội chủ nghĩa Việt Nam, mà gây phương
                    hại đến an ninh quốc gia, trật tự an toàn xã hội và nguyên
                    tắc hoạt động của nền tảng.
                  </li>
                  <li>
                    - Không được đặt tên tài khoản, nhân vật trùng hoặc tương tự
                    gây nhầm lẫn với tên viết tắt, tên đầy đủ của cơ quan nhà
                    nước, tổ chức chính trị, tổ chức chính trị - xã hội, tổ chức
                    chính trị xã hội - nghề nghiệp, tổ chức xã hội, tổ chức xã
                    hội - nghề nghiệp của Việt Nam và tổ chức quốc tế, nếu không
                    được cơ quan, tổ chức đó cho phép.
                  </li>
                  <li>
                    - Không được đặt tên tài khoản, nhân vật trùng hoặc gây nhầm
                    lẫn để giả mạo các cá nhân, tổ chức khác nhằm mục đích đưa
                    thông tin sai sự thật, xuyên tạc, vu khống, xúc phạm uy tín
                    của tổ chức, danh dự và nhân phẩm của cá nhân khác.
                  </li>
                  <li>
                    - Không được đặt tên tài khoản, nhân vật vi phạm các quyền
                    sở hữu trí tuệ.
                  </li>
                  <li>
                    - Tài khoản vi phạm quy định về đặt tên sẽ bị khoá và/hoặc
                    xóa vĩnh viễn mà không cần thông báo.
                  </li>
                </ul>
              </div>
              {/* SUB SECTION */}
              <div>
                <p className="font-bold my-5">2. Quy định về hình ảnh</p>
                <ul class="mb-3">
                  <li>
                    - Không sử dụng hình ảnh có hàm ý kích động bạo lực, dâm ô,
                    đồi trụy, tội ác, tệ nạn xã hội, mê tín dị đoan, phá hoại
                    thuần phong, mỹ tục của dân tộc.
                  </li>
                  <li>
                    - Không sử dụng hình ảnh hoặc hình ảnh mô tả có tính xúc
                    phạm các danh nhân, anh hùng dân tộc, lãnh đạo Đảng và Nhà
                    nước của Việt Nam và lãnh đạo của các cơ quan tổ chức quốc
                    tế.
                  </li>
                  <li>
                    - Không sử dụng hình ảnh có chứa dấu hiệu trùng hoặc tương
                    tự đến mức gây nhầm lẫn với biểu tượng, cờ, huy hiệu, tên
                    viết tắt, tên đầy đủ của cơ quan nhà nước, tổ chức chính
                    trị, tổ chức chính trị - xã hội, tổ chức chính trị xã hội -
                    nghề nghiệp, tổ chức xã hội, tổ chức xã hội - nghề nghiệp
                    của Việt Nam và tổ chức quốc tế mà xúc phạm đến uy tín của
                    các tổ chức này.
                  </li>
                  <li>
                    - Không sử dụng các hình ảnh liên quan tới tôn giáo mà gây
                    kích động, chia rẽ khối đại đoàn kết dân tộc, đi ngược lại
                    chính sách tôn giáo của Việt Nam.
                  </li>
                  <li>
                    - Không sử dụng ảnh của tội phạm, khủng bố, phát xít, và ảnh
                    hoặc hình ảnh mô tả các cá nhân, tổ chức chống lại Nhà nước
                    Cộng hòa xã hội chủ nghĩa Việt Nam, gây phương hại đến an
                    ninh quốc gia, trật tự an toàn xã hội.
                  </li>
                  <li>
                    - Không sử dụng ảnh xúc phạm uy tín của tổ chức, danh dự và
                    nhân phẩm của cá nhân khác.
                  </li>
                  <li>
                    - Không sử dụng hình ảnh vi phạm các quyền sở hữu trí tuệ.
                  </li>
                  <li>
                    - Tài khoản vi phạm quy định về hình đại diện sẽ bị khoá
                    và/hoặc xóa vĩnh viễn mà không cần thông báo.
                  </li>
                </ul>
              </div>
            </div>
            {/* SECTION 8 */}
            <div>
              <p className="font-bold my-5">DUY TRÌ DỊCH VỤ</p>
              <p className="mb-3">
                1. Để cung cấp cho người dùng Ứng Dụng những thông tin hữu ích
                khác, Ứng Dụng có thể chứa các đường dẫn liên kết đến các
                website và ứng dụng khác không thuộc quyền kiểm soát của VMO.
                Việc bao gồm bất kỳ liên kết nào không mang ngụ ý khuyến nghị
                hoặc xác nhận quan điểm, sản phẩm hoặc dịch vụ được thể hiện
                trong đó. VMO không cung cấp thẩm quyền và áp dụng chính sách
                của Ứng Dụng cho các đơn vị quản lý các website và ứng dụng có
                đường dẫn liên kết. Các website và ứng dụng đó có thể có các
                điều khoản sử dụng khác nhau.
              </p>
              <p className="mb-3">
                2. VMO nỗ lực để giữ cho Ứng Dụng hoạt động tốt. Tuy nhiên, VMO
                không chịu trách nhiệm và sẽ không chịu trách nhiệm về việc Ứng
                Dụng thời không truy cập được vì bất kỳ lý do gì và VMO có quyền
                tạm thời hoặc vĩnh viễn ngưng Ứng Dụng, hay bất kỳ trang, hay
                bất kỳ chức năng nào vào bất cứ lúc nào và không cần thông báo
                trước.
              </p>
              <p className="mb-3">
                3. VMO chịu trách nhiệm quản lý nội dung của Ứng Dụng, bao gồm
                mọi chỉnh sửa, diễn giải hoặc cập nhật nội dung theo quyết định
                riêng của mình.
              </p>
            </div>
            {/* SECTION 9 */}
            <div>
              <p className="font-bold my-5">BẢN QUYỀN</p>
              <p className="mb-3">
                1. Tất cả nội dung, hình ảnh, thiết kế, tập tin và thông tin
                trong Ứng Dụng đều thuộc bản quyền của VMO và không được sao
                chép, sửa đổi hoặc sử dụng dưới bất kỳ hình thức nào nếu không
                có sự cho phép bằng văn bản của VMO. Ứng Dụng có thể bao gồm các
                thương hiệu, chi nhánh hoặc dịch vụ của VMO hoặc các bên thứ ba
                khác của VMO, dưới dạng từ ngữ, đồ họa và/hoặc logo.
              </p>
              <p className="mb-3">
                2. Nhãn hiệu hoặc nhãn hiệu Ứng Dụng của VMO được bảo vệ bởi
                luật pháp hiện hành và việc sử dụng Ứng Dụng không cấu thành bất
                kỳ quyền sở hữu hoặc bất kỳ quyền hoặc giấy phép sử dụng nào mà
                không có sự cho phép trước bằng văn bản của VMO.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
