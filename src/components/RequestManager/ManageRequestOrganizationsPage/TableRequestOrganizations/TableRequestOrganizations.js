import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import EditStatusForm from "../Feature/EditStatusForm";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      create_organization_request_id: "1",
      organization_id: "1",
      organization_name: "Công ty phòng chống Châu Nhật Trường",
      organization_manager_email: "khoatdd0811@gmail.com",
      organization_tax_code: "903910239013",
      founding_date: "19/9/2002",
      social_media_link: "https://www.facebook.com/chaunhattruong4747",
      area_of_activity: "Kinh doanh",
      address: "Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000",
      plan_information: "Chi phí y tế cho con em không may gặp các tình huống trên của các gia đình là rất lớn. Do đó, ngay từ năm 2006, Quỹ Nâng Bước Tuổi Thơ đã được sáng lập nhằm cung cấp chuyên môn điều trị bệnh lý và phẫu thuật đa khoa theo tiêu chuẩn quốc tế cho trẻ em dị tật bẩm sinh có hoàn cảnh khó khăn. Tổ chức này ra đời với sứ mệnh tạo nên sức mạnh của tình yêu thương, giúp trẻ em có hoàn cảnh khó khăn trên khắp Việt Nam vượt qua những khiếm khuyết của cơ thể thông qua điều trị y tế bài bản, có cơ hội phát triển hết tiềm năng của mình cho một cuộc sống mới tốt đẹp hơn.",
      achievement_link: "",
      authorization_documents: "https://docs.google.com/document/d/1-y-06Ez_ZeYTLbQotpfdK8VU-nOAVZeMwzfGAtgIVc4/edit",
      approved_by: "",
      create_date: "12/06/2024",
      create_by: '1',
      approved_date: "",
      is_rejected: false,
      is_pending: false,
      is_locked: false,
      is_approved: true

    },
    {
      create_organization_request_id: 2,
      organization_id: 2,
      organization_name: "Công ty bảo vệ sức khỏe Phương Nam",
      organization_manager_email: "phuongnam@gmail.com",
      organization_tax_code: "912345678901",
      founding_date: "01/03/2004",
      social_media_link: "https://www.facebook.com/phuongnamhealth",
      area_of_activity: "Kinh doanh",
      address: "123 Đường Lê Lợi, Quận 1, Thành phố Hồ Chí Minh",
      plan_information: "Tổ chức Phương Nam cam kết cung cấp dịch vụ chăm sóc sức khỏe toàn diện và chất lượng cho mọi người dân.",
      achievement_link: "",
      authorization_documents: "https://docs.google.com/document/d/2x2x2x2x2x2x2x2/edit",
      approved_by: "",
      create_date: "12/06/2024",
      create_by: 1,
      approved_date: "",
      is_rejected: false,
      is_pending: true,
      is_locked: false,
      is_approved: false
    },
    {
      create_organization_request_id: 3,
      organization_id: 3,
      organization_name: "Tổ chức cứu trợ trẻ em Việt Nam",
      organization_manager_email: "treemvietnam@gmail.com",
      organization_tax_code: "908765432109",
      founding_date: "10/05/2010",
      social_media_link: "https://www.facebook.com/treemvietnam",
      area_of_activity: "Kinh doanh",
      address: "456 Đường Hoàng Diệu, Quận 4, Thành phố Hồ Chí Minh",
      plan_information: "Chúng tôi cung cấp sự hỗ trợ và cứu trợ cho trẻ em có hoàn cảnh khó khăn tại Việt Nam.",
      achievement_link: "",
      authorization_documents: "https://docs.google.com/document/d/3x3x3x3x3x3x3x3/edit",
      approved_by: "",
      create_date: "12/06/2024",
      create_by: 1,
      approved_date: "",
      is_rejected: false,
      is_pending: true,
      is_locked: false,
      is_approved: false
    },
    {
      create_organization_request_id: 4,
      organization_id: 4,
      organization_name: "Quỹ phát triển giáo dục Việt Nam",
      organization_manager_email: "giaoducvietnam@gmail.com",
      organization_tax_code: "901234567890",
      founding_date: "20/11/2005",
      social_media_link: "https://www.facebook.com/giaoducvietnam",
      area_of_activity: "Kinh doanh",
      address: "789 Đường Nguyễn Huệ, Quận 1, Thành phố Hồ Chí Minh",
      plan_information: "Quỹ phát triển giáo dục Việt Nam hỗ trợ học sinh nghèo vượt khó, giúp các em có cơ hội học tập tốt hơn.",
      achievement_link: "",
      authorization_documents: "https://docs.google.com/document/d/4x4x4x4x4x4x4x4/edit",
      approved_by: "",
      create_date: "12/06/2024",
      create_by: 1,
      approved_date: "",
      is_rejected: false,
      is_pending: true,
      is_locked: false,
      is_approved: false
    },
    {
      create_organization_request_id: 5,
      organization_id: 5,
      organization_name: "Tổ chức bảo vệ môi trường xanh",
      organization_manager_email: "moitruongxanh@gmail.com",
      organization_tax_code: "912345670123",
      founding_date: "15/08/2012",
      social_media_link: "https://www.facebook.com/moitruongxanh",
      area_of_activity: "Kinh doanh",
      address: "123 Đường Trần Hưng Đạo, Quận 5, Thành phố Hồ Chí Minh",
      plan_information: "Tổ chức bảo vệ môi trường xanh cam kết giữ gìn và bảo vệ môi trường sống cho thế hệ tương lai.",
      achievement_link: "",
      authorization_documents: "https://docs.google.com/document/d/5x5x5x5x5x5x5x5/edit",
      approved_by: "",
      create_date: "12/06/2024",
      create_by: 1,
      approved_date: "",
      is_rejected: false,
      is_pending: true,
      is_locked: false,
      is_approved: false
    },
    {
      create_organization_request_id: 6,
      organization_id: 6,
      organization_name: "Tổ chức phát triển cộng đồng Hạnh Phúc",
      organization_manager_email: "hanhphucvietnam@gmail.com",
      organization_tax_code: "908765432123",
      founding_date: "01/02/2007",
      social_media_link: "https://www.facebook.com/hanhphucvietnam",
      area_of_activity: "Kinh doanh",
      address: "456 Đường Lê Văn Sỹ, Quận 3, Thành phố Hồ Chí Minh",
      plan_information: "Chúng tôi giúp phát triển cộng đồng bền vững và mang lại hạnh phúc cho mọi người.",
      achievement_link: "",
      authorization_documents: "https://docs.google.com/document/d/6x6x6x6x6x6x6x6/edit",
      approved_by: "",
      create_date: "12/06/2024",
      create_by: 1,
      approved_date: "",
      is_rejected: false,
      is_pending: true,
      is_locked: false,
      is_approved: false
    },
    {
      create_organization_request_id: 7,
      organization_id: 7,
      organization_name: "Công ty hỗ trợ phụ nữ Việt Nam",
      organization_manager_email: "phunuvietnam@gmail.com",
      organization_tax_code: "901234567012",
      founding_date: "22/03/2009",
      social_media_link: "https://www.facebook.com/phunuvietnam",
      area_of_activity: "Kinh doanh",
      address: "789 Đường Nguyễn Trãi, Quận 5, Thành phố Hồ Chí Minh",
      plan_information: "Chúng tôi hỗ trợ phụ nữ Việt Nam vượt qua khó khăn và phát triển bản thân.",
      achievement_link: "",
      authorization_documents: "https://docs.google.com/document/d/7x7x7x7x7x7x7x7/edit",
      approved_by: "",
      create_date: "12/06/2024",
      create_by: 1,
      approved_date: "",
      is_rejected: false,
      is_pending: true,
      is_locked: false,
      is_approved: false
    },
    {
      create_organization_request_id: 8,
      organization_id: 8,
      organization_name: "Tổ chức vì người nghèo",
      organization_manager_email: "nguoinheovietnam@gmail.com",
      organization_tax_code: "912345678012",
      founding_date: "10/10/2008",
      social_media_link: "https://www.facebook.com/nguoinheovietnam",
      area_of_activity: "Kinh doanh",
      address: "123 Đường Võ Văn Tần, Quận 3, Thành phố Hồ Chí Minh",
      plan_information: "Tổ chức vì người nghèo giúp đỡ người nghèo có cuộc sống tốt hơn thông qua các chương trình hỗ trợ.",
      achievement_link: "",
      authorization_documents: "https://docs.google.com/document/d/8x8x8x8x8x8x8x8/edit",
      approved_by: "",
      create_date: "12/06/2024",
      create_by: 1,
      approved_date: "",
      is_rejected: false,
      is_pending: true,
      is_locked: false,
      is_approved: false
    },
    {
      create_organization_request_id: 9,
      organization_id: 9,
      organization_name: "Quỹ hỗ trợ sinh viên nghèo hiếu học",
      organization_manager_email: "sinhvienngheo@gmail.com",
      organization_tax_code: "908765432012",
      founding_date: "05/09/2006",
      social_media_link: "https://www.facebook.com/sinhvienngheo",
      area_of_activity: "Kinh doanh",
      address: "456 Đường Điện Biên Phủ, Quận Bình Thạnh, Thành phố Hồ Chí Minh",
      plan_information: "Quỹ hỗ trợ sinh viên nghèo hiếu học giúp các em sinh viên vượt qua khó khăn tài chính và hoàn thành việc học.",
      achievement_link: "",
      authorization_documents: "https://docs.google.com/document/d/9x9x9x9x9x9x9x9/edit",
      approved_by: "",
      create_date: "12/06/2024",
      create_by: 1,
      approved_date: "",
      is_rejected: false,
      is_pending: true,
      is_locked: false,
      is_approved: false
    },
    {
      create_organization_request_id: 10,
      organization_id: 10,
      organization_name: "Tổ chức hỗ trợ nông dân Việt Nam",
      organization_manager_email: "nongdanvietnam@gmail.com",
      organization_tax_code: "901234567890",
      founding_date: "15/05/2011",
      social_media_link: "https://www.facebook.com/nongdanvietnam",
      area_of_activity: "Kinh doanh",
      address: "789 Đường Phan Văn Trị, Quận Gò Vấp, Thành phố Hồ Chí Minh",
      plan_information: "Tổ chức hỗ trợ nông dân Việt Nam giúp nông dân cải thiện năng suất và thu nhập.",
      achievement_link: "",
      authorization_documents: "https://docs.google.com/document/d/10x10x10x10x10x10x10/edit",
      approved_by: "",
      create_date: "12/06/2024",
      create_by: 1,
      approved_date: "",
      is_rejected: false,
      is_pending: true,
      is_locked: false,
      is_approved: false
    },
    {
      create_organization_request_id: 11,
      organization_id: 11,
      organization_name: "Quỹ bảo vệ động vật hoang dã",
      organization_manager_email: "dongvathoangda@gmail.com",
      organization_tax_code: "912345678910",
      founding_date: "12/11/2013",
      social_media_link: "https://www.facebook.com/dongvathoangda",
      area_of_activity: "Kinh doanh",
      address: "123 Đường Cộng Hòa, Quận Tân Bình, Thành phố Hồ Chí Minh",
      plan_information: "Quỹ bảo vệ động vật hoang dã cam kết bảo vệ và duy trì môi trường sống của các loài động vật hoang dã.",
      achievement_link: "",
      authorization_documents: "https://docs.google.com/document/d/11x11x11x11x11x11x11/edit",
      approved_by: "",
      create_date: "12/06/2024",
      create_by: 1,
      approved_date: "",
      is_rejected: false,
      is_pending: true,
      is_locked: false,
      is_approved: false
    },
    {
      create_organization_request_id: 12,
      organization_id: 12,
      organization_name: "Tổ chức giáo dục và đào tạo Việt Nam",
      organization_manager_email: "giaoducvietnam@gmail.com",
      organization_tax_code: "908765432890",
      founding_date: "20/06/2014",
      social_media_link: "https://www.facebook.com/giaoducvietnam",
      area_of_activity: "Kinh doanh",
      address: "456 Đường Trường Chinh, Quận Tân Phú, Thành phố Hồ Chí Minh",
      plan_information: "Tổ chức giáo dục và đào tạo Việt Nam cung cấp các chương trình giáo dục và đào tạo chất lượng cao.",
      achievement_link: "",
      authorization_documents: "https://docs.google.com/document/d/12x12x12x12x12x12x12/edit",
      approved_by: "",
      create_date: "12/06/2024",
      create_by: 1,
      approved_date: "",
      is_rejected: false,
      is_pending: true,
      is_locked: false,
      is_approved: false
    },
    {
      create_organization_request_id: 13,
      organization_id: 13,
      organization_name: "Quỹ hỗ trợ bệnh nhân nghèo",
      organization_manager_email: "benhnhanngheo@gmail.com",
      organization_tax_code: "901234567890",
      founding_date: "01/01/2015",
      social_media_link: "https://www.facebook.com/benhnhanngheo",
      area_of_activity: "Kinh doanh",
      address: "789 Đường Lý Thường Kiệt, Quận 10, Thành phố Hồ Chí Minh",
      plan_information: "Quỹ hỗ trợ bệnh nhân nghèo cung cấp tài chính và hỗ trợ y tế cho các bệnh nhân có hoàn cảnh khó khăn.",
      achievement_link: "",
      authorization_documents: "https://docs.google.com/document/d/13x13x13x13x13x13x13/edit",
      approved_by: "",
      create_date: "12/06/2024",
      create_by: 1,
      approved_date: "",
      is_rejected: false,
      is_pending: true,
      is_locked: false,
      is_approved: false
    },
    {
      create_organization_request_id: 14,
      organization_id: 14,
      organization_name: "Tổ chức phát triển y tế cộng đồng",
      organization_manager_email: "ytccongdong@gmail.com",
      organization_tax_code: "912345678012",
      founding_date: "15/07/2016",
      social_media_link: "https://www.facebook.com/ytccongdong",
      area_of_activity: "Kinh doanh",
      address: "123 Đường Hồng Bàng, Quận 11, Thành phố Hồ Chí Minh",
      plan_information: "Tổ chức phát triển y tế cộng đồng cung cấp các dịch vụ y tế cộng đồng cho người dân.",
      achievement_link: "",
      authorization_documents: "https://docs.google.com/document/d/14x14x14x14x14x14x14/edit",
      approved_by: "",
      create_date: "12/06/2024",
      create_by: 1,
      approved_date: "",
      is_rejected: false,
      is_pending: true,
      is_locked: false,
      is_approved: false
    },
    {
      create_organization_request_id: 15,
      organization_id: 15,
      organization_name: "Công ty phát triển xã hội bền vững",
      organization_manager_email: "xahoibenvung@gmail.com",
      organization_tax_code: "908765432012",
      founding_date: "20/12/2017",
      social_media_link: "https://www.facebook.com/xahoibenvung",
      area_of_activity: "Kinh doanh",
      address: "456 Đường Phan Đình Phùng, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
      plan_information: "Công ty phát triển xã hội bền vững cam kết xây dựng các giải pháp bền vững cho xã hội.",
      achievement_link: "",
      authorization_documents: "https://docs.google.com/document/d/15x15x15x15x15x15x15/edit",
      approved_by: "",
      create_date: "12/06/2024",
      create_by: 1,
      approved_date: "",
      is_rejected: false,
      is_pending: true,
      is_locked: false,
      is_approved: false
    },
   
    // ...
  ];
}

const TableRequestOrganizations = () => {
  const [data, setData] = useState([]); // State lưu dữ liệu trả về từ API, ban đầu là mảng rỗng
  const [selectedRow, setSelectedRow] = useState(null); // State lưu thông tin của row được chọn
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State quản lý việc mở dialog cho edit hoặc delete

  const onEdit = React.useCallback((row) => {
    // Implement edit logic here.
    setIsDialogOpen(true); // Mở dialog
    setSelectedRow(row);
  }, []);

  const onDelete = React.useCallback((row) => {
    // Implement delete logic here.
    alert(`Deleting user with ID: ${row.id}`);
  }, []);

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  return (
    <div className="flex flex-col">
      <div>
        <EditStatusForm
          isOpen={isDialogOpen}
          organize={selectedRow}
          onOpenChange={(value) => {
            setIsDialogOpen(value);
            if (!value) {
              setSelectedRow(null);
            }
          }}
        />
      </div>
      <DataTable columns={columns({ onEdit, onDelete })} data={data} />
    </div>
  );
};

export default TableRequestOrganizations;
