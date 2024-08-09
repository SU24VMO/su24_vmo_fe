import React from "react";
import { Button } from "../../../ui/button";

const DescriptionCampaign = ({ campaignDescription }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [maxHeight, setMaxHeight] = React.useState("10em");
  const contentRef = React.useRef(null);
  const campaignDescriptionFormat = campaignDescription.replace(
    /(?:\r\n|\r|\n)/g,
    "<br>"
  );
  const toggleContent = () => {
    if (isExpanded) {
      setMaxHeight("10em"); // Đặt lại về giá trị ban đầu khi thu gọn
    } else {
      setMaxHeight(`${contentRef.current.scrollHeight}px`); // Cập nhật maxHeight dựa trên độ cao thực tế của nội dung
    }
    setIsExpanded(!isExpanded);
  };
  
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


  React.useEffect(() => {
    if (isExpanded) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    }
  }, [campaignDescription, isExpanded]); // Cập nhật maxHeight khi campaignDescription thay đổi

  return (
    <div>
      <div
        ref={contentRef}
        style={contentStyle}
        dangerouslySetInnerHTML={{ __html: campaignDescriptionFormat }}
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
  );
};

export default DescriptionCampaign;
