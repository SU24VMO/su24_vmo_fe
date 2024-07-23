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
  const [fileAvatarImage, setFileAvatarImage] = useState();

  const [avatar, setAvatar] = useState(
    user ? user.avatar : "https://via.placeholder.com/150"
  );
  const [loading, setLoading] = useState(false); // Thêm state loading

  function handleChange(e) {
    console.log("File ảnh đại diện vừa chọn: ", e.target.files);
    setFileAvatarImage(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0]); // Save the File object
  }
  function removeImageAvatar(e) {
    setFileAvatarImage('');
    setFile(null)

}
  const handleSubmitAvatar = async (e) => {
    toast({
      title: "Đang cập nhật ảnh đại diện...",
      description: "Vui lòng chờ trong giây lát !",
      action: <ToastAction altText="undo">Ẩn</ToastAction>,
    });
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
        setFileAvatarImage('');
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
                    {/* <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      aria-describedby="file_input_help"
                      id="file_input"
                      type="file"
                      onChange={handleChange}
                    /> */}
                    
                    {fileAvatarImage ? (<div className=" flex flex-col justify-center items-center">
                      <img className="mb-6 w-50 h-50 laptop:w-40 laptop:h-40 rounded-full"
                        id="image"

                        value={fileAvatarImage}
                        src={fileAvatarImage} width={220} height={220} alt="qr-code" />
                      <button type="button"
                        onClick={(e) => { removeImageAvatar(e) }}
                        class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Xóa ảnh</button>

                    </div>) : (<div>
                     
                      <label
                        className="block w-full py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        htmlFor="file_input"
                      >
                        <span className="ml-2">Chọn ảnh</span>
                      </label>
                      <input
                        className="hidden"
                        aria-describedby="file_input"
                        id="file_input"
                        name="file_input"
                        onChange={(e) => { handleChange(e) }}
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                      />
                    </div>)}

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
                    variant="green_theme_primary"
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
