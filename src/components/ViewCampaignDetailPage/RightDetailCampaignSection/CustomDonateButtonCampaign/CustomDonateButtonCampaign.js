import React from "react";
import { Button } from "../../../ui/button";
import { AuthContext } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CustomDonateButtonCampaign = ({ data, setIsDialogOpen }) => {
  const { isLogin } = React.useContext(AuthContext);
  const navigate = useNavigate();
  // Hàm xử lý khi click vào nút ủng hộ
  const handleDonateClick = () => {
    if (isLogin) {
      navigate(`/donate/${data.campaignID}`);
    } else {
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      {data.donatePhase.isProcessing && data.donatePhase.isEnd === false ? (
        <Button
          variant="green_theme_primary"
          size="lg"
          className="font-bold text-lg"
          onClick={handleDonateClick}
        >
          Ủng hộ
        </Button>
      ) : (
        <Button
          variant="green_theme_primary"
          size="lg"
          className="font-bold text-lg"
          disabled={true}
        >
          Ủng hộ
        </Button>
      )}
    </>
  );
};

export default CustomDonateButtonCampaign;
