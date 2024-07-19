import { format } from "date-fns";
import { LinkIcon } from "lucide-react";
import React from "react";
import { Button } from "../../ui/button";

const OrganizationInformation = ({ organizationData }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [maxHeight, setMaxHeight] = React.useState("10em");
  const contentRef = React.useRef(null);
  const organizationDescription = organizationData?.description;
  const organizationDescriptionFormat = organizationDescription ? (organizationDescription.replace(
    /(?:\r\n|\r|\n)/g,
    "<br>"
  ) ) : "Chưa có";
  const toggleContent = () => {
    if (isExpanded) {
      setMaxHeight("10em"); // Đặt lại về giá trị ban đầu khi thu gọn
    } else {
      setMaxHeight(`${contentRef.current.scrollHeight}px`); // Cập nhật maxHeight dựa trên độ cao thực tế của nội dung
    }
    setIsExpanded(!isExpanded);
  };

  React.useEffect(() => {
    if (isExpanded) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    }
  }, [organizationDescription, isExpanded]); // Cập nhật maxHeight khi campaignDescription thay đổi

  // Thêm style cho hiệu ứng bóng mờ
  const contentStyle = {
    maxHeight: maxHeight,
    overflow: "hidden",
    position: "relative",
    transition: "max-height 0.5s ease",
    ...(isExpanded
      ? {}
      : {
          // Khi chưa mở rộng, thêm bóng mờ ở cuối
          maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 50%, transparent 100%)",
        }),
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <img
            src={organizationData.logo}
            width="100"
            height="100"
            alt="Organization Logo"
            className="rounded-md"
          />
          <div className="grid gap-1">
            <h2 className="text-2xl font-bold">{organizationData.name}</h2>
            <p className="text-muted-foreground">Tổ chức</p>
          </div>
        </div>
      </div>
      {/* Mô tả của tổ chức  */}
      <div>
        <div
          ref={contentRef}
          style={contentStyle}
          dangerouslySetInnerHTML={{ __html: organizationDescriptionFormat }}
        />
        <Button
          size={"lg"}
          variant={"link"}
          onClick={toggleContent}
          className="p-0"
        >
          {isExpanded ? "Thu gọn" : "Xem thêm"}
        </Button>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <a
          href={organizationData.website}
          className="inline-flex items-center gap-2 text-primary hover:underline"
          prefetch={false}
          target="_blank"
          rel="noreferrer"
        >
          <LinkIcon className="w-4 h-4" />
          <span>Website</span>
        </a>
      </div>
      <div className="mt-4 grid mobile:grid-cols-2">
        {/* left */}
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Địa chỉ</p>
            <p>{organizationData.location}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Ngày thành lập
            </p>
            <p>
              {format(new Date(organizationData.foundingDate), "dd/MM/yyyy")}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Giấy phép hoạt động
            </p>
            <a
              href="https://www.masangroup.com/vi/about-us/masan-history.html#:~:text=C%C3%B4ng%20ty%20C%E1%BB%95%20ph%E1%BA%A7n%20T%E1%BA%ADp%20%C4%91o%C3%A0n%20Ma%20San%20%C4%91%C6%B0%E1%BB%A3c%20th%C3%A0nh,ph%E1%BA%A7n%20H%C3%A0ng%20H%E1%BA%A3i%20Ma%20San."
              className="inline-flex items-center gap-2 text-primary hover:underline"
              prefetch={false}
              target="_blank"
              rel="noreferrer"
            >
              <LinkIcon className="w-4 h-4" />
              <span>Giấy phép hoạt động</span>
            </a>
          </div>
        </div>
        {/* right */}
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Ngày tham gia hệ thống
            </p>
            <p>{format(new Date(organizationData.createdAt), "dd/MM/yyyy")}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Hạng mục
            </p>
            <p>{organizationData.category}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Mã số thuế
            </p>
            <p>{organizationData.tax}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationInformation;
