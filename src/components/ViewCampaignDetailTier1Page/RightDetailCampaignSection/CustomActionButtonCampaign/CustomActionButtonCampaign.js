import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { ExternalLink, MessageSquareWarning } from "lucide-react";
import { CopyButton } from "../Feature/CopyButton";

const CustomActionButtonCampaign = ({ data, campaignId, campaignTier }) => {
  return (
    <div className="w-full flex flex-row items-center justify-end">
      <div className="flex items-center justify-center">
        <Dialog>
          <DialogTrigger>
            <ExternalLink />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Lan tỏa yêu thương đến cộng đồng</DialogTitle>
              <DialogDescription>
                Bằng cách chia sẻ chiến dịch{" "}
                <span className="font-bold text-black">{data.name}</span>, bạn
                sẽ góp phần giúp đỡ những hoàn cảnh khó khăn.
              </DialogDescription>
            </DialogHeader>
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link">
                  Vui lòng sao chép đường dẫn sau để chia sẻ chiến dịch
                </Label>
                <div className="flex items-center space-x-2">
                  {campaignTier === 1 ? (
                    <>
                      <Input
                        id="link"
                        defaultValue={`https://su24-vmo-fe.vercel.app/viewCampaigns/campaignDetail/tier1/${campaignId}`}
                        disabled
                      />
                      <CopyButton type="button"
                        code={`https://su24-vmo-fe.vercel.app/viewCampaigns/campaignDetail/tier1/${campaignId}`}
                      />
                    </>
                  ) : (
                    <>
                      <Input
                        id="link"
                        defaultValue={`https://su24-vmo-fe.vercel.app/viewCampaigns/campaignDetail/tier2/${campaignId}`}
                        disabled
                      />
                      <CopyButton type="button"
                        code={`https://su24-vmo-fe.vercel.app/viewCampaigns/campaignDetail/tier2/${campaignId}`}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center">
        <a
          href="mailto:vmoreport@gmail.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2"
        >
          <MessageSquareWarning className="h-6 w-6 ml-2" />
        </a>
      </div>
    </div>
  );
};

export default CustomActionButtonCampaign;
