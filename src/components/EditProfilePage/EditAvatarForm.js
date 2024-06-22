import React, { useContext, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { axiosPrivate } from "../../api/axiosInstance";
import { GET_ACCOUNT_BY_ID, UPDATE_AVATAR } from "../../api/apiConstants";
import { AuthContext } from "../../context/AuthContext";
import { Loader2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

export default function EditAvatarForm() {
  const { toast } = useToast();
  const { user, updateUserAvatar } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [avatar, setAvatar] = useState(
    user ? user.avatar : "https://via.placeholder.com/150"
  );
  const [loading, setLoading] = useState(false); // Thêm state loading

  function handleChange(e) {
    console.log("File ảnh đại diện vừa chọn: ", e.target.files);
    setFile(e.target.files[0]); // Save the File object
  }

  const handleSubmitAvatar = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (file) {
      const formData = new FormData();
      formData.append("request", file);

      try {
        const response = await axiosPrivate.put(
          `${UPDATE_AVATAR}?accountId=${user.account_id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          // Gọi API lấy thông tin người dùng mới nhất
          const userInfoResponse = await axiosPrivate.get(
            GET_ACCOUNT_BY_ID +
              `${user.account_id}?accountId=${user.account_id}`
          );
          if (userInfoResponse.status === 200) {
            // Cập nhật context và localStorage
            updateUserAvatar(userInfoResponse.data.data.avatar);
           
            // Cập nhật avatar trong UI
            setAvatar(userInfoResponse.data.data.avatar);
          }

          toast({
            title: "Cập nhật ảnh Avatar thành công!",
            action: <ToastAction altText="undo">Ẩn</ToastAction>,
          });
        } else {
          throw new Error("Failed to update avatar");
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Có lỗi xảy ra !",
          description: "Vui lòng thử lại!",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
        console.error("Error updating avatar", error);
      } finally {
        setLoading(false);
        setOpen(false);
      }
    } else {
      console.log("No file selected");
      setLoading(false);
    }
  };
  return (
    <div>
      <form className="tablet:order-none">
        <p className="text-2xl font-bold mb-10">Ảnh đại diện của bạn</p>
        <Card>
          <CardHeader>
            <div className="flex justify-center">
              <Avatar className="w-[220px] h-[220px]">
                <AvatarImage src={avatar} alt="avatar" />
                <AvatarFallback>{user.lastname[0]}</AvatarFallback>
              </Avatar>
            </div>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Thay đổi ảnh đại diện</Button>
              </DialogTrigger>
              <DialogContent className="mobile:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Thay đổi ảnh đại diện</DialogTitle>
                  <DialogDescription>
                    Thay đổi ảnh đại diện của bạn ở đây. Nhấn "Lưu thay đổi" sau
                    khi thay đổi xong nhé.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center">
                  <div>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="file_input"
                    >
                      Vui lòng chọn ảnh đại diện mới
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      aria-describedby="file_input_help"
                      id="file_input"
                      type="file"
                      onChange={handleChange}
                    />
                    <p
                      className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                      id="file_input_help"
                    >
                      SVG, PNG, JPG or GIF (MAX. 800x400px).
                    </p>
                  </div>
                </div>
                <DialogFooter className="flex flex-row items-center justify-around">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Hủy bỏ
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    onClick={handleSubmitAvatar}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Lưu thay đổi
                      </>
                    ) : (
                      "Lưu thay đổi"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
