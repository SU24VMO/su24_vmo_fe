import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { Button } from "../../ui/button";
import { Menu as MenuIcon } from "lucide-react";
import { Separator } from "../../ui/separator";
import SearchBar from "../Feature/SearchBar";

const MobileNavLeft = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* This button will trigger open the mobile sheet menu */}
      <SheetTrigger asChild>
        <div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col items-start">
          <Button
            variant="outline"
            className="rounded-none px-10 py-10 bg-[#cccc] mb-10"
          >
            VMO-LOGO
          </Button>
          <div className="w-full mb-5">
            <Button
              variant="ghost"
              className="w-full items-start justify-start"
            >
              Trang chủ
            </Button>
            <Button
              variant="ghost"
              className="w-full items-start justify-start"
            >
              Giới thiệu
            </Button>
            <Button
              variant="ghost"
              className="w-full items-start justify-start"
            >
              Chiến dịch
            </Button>
          </div>
          <Separator className="mb-5" />
          <div className="w-full">
            <Button
              variant="ghost"
              className="w-full items-start justify-start"
            >
              Đăng nhập
            </Button>
            <Button
              variant="ghost"
              className="w-full items-start justify-start"
            >
              Đăng ký
            </Button>
          </div>
          <Separator className="mb-5" />
          <div className="w-full">
            <SearchBar/>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNavLeft;
