import React, { useState, useEffect } from "react";
import Datepicker from "flowbite-datepicker/Datepicker";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
export default function EditProfilePage() {
  // const [value, setValue] = useState();
  // const dobHandler = (e) => {
  //     console.log(e.target.value);
  // }
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [avatar, setAvatar] = useState(
    "https://i.pinimg.com/736x/23/f0/ae/23f0ae241add8bc53d7f334e42a60e3d.jpg"
  );
  function handleChange(e) {
    console.log("File ảnh đại diện vừa chọn: ", e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  useEffect(() => {
    const datepickerEl = document?.getElementById("datepickerId");
    new Datepicker(datepickerEl, {});
  }, []);
  const handleSubmitAvatar = (e) => {
    e.preventDefault();
    console.log("Avatar changed");
    if (file) {
      setAvatar(file);
    } else {
      // Handle Trường hợp không có chọn avatar nào
      console.log("No file selected");
    }
    setOpen(false);
  };
  return (
    <div>
      <div className="mb-8 w-full text-center">
        <h1 className="text-xl font-bold my-2">Chỉnh sửa thông tin cá nhân</h1>
      </div>
      <div className="w-3/4 mx-auto">
        <div class="grid gap-6 tablet:grid-cols-2">
          <form>
            <div className="grid gap-4">
              <p className="text-2xl font-bold">Thông tin cá nhân của bạn</p>
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tên tài khoản
                </label>
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập tên..."
                  required
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email liên hệ
                </label>
                <input
                  type="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập email..."
                  required
                />
              </div>
              <div>
                <label
                  for="gender"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Giới tính
                </label>
                <select
                  id="gender"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
              <div>
                <label
                  for="dateOfBirth"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ngày sinh
                </label>

                <div class="relative max-w-xl">
                  <input
                    datepicker
                    datepicker-autohide
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 mobile:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Select date"
                    onSelect={(e) => console.log(e.target.value)}
                    // onClick={(e) => dobHandler(e)}
                    // onClick={(e) => console.log(e.target.value)}
                    // onChange={(e) => console.log(e)}
                    id="datepickerId"
                  />
                  <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label
                  for="phone"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone number
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  max={10}
                  maxLength="10"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0929341231"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
                />
              </div>
              <div>
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mô tả
                </label>
                <textarea
                  id="description"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Mô tả về bản thân  ..."
                ></textarea>
              </div>
              <div>
                <label
                  for="facebook"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Facebook Link
                </label>
                <input
                  type="url"
                  id="facebook"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="facebook.com"
                  required
                />
              </div>
              <div>
                <label
                  for="youtube"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Youtube Link
                </label>
                <input
                  type="url"
                  id="youtube"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="youtube.com"
                  required
                />
              </div>
              <div>
                <label
                  for="tiktok"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tiktok Link
                </label>
                <input
                  type="url"
                  id="tiktok"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="tiktok.com"
                  required
                />
              </div>
              <div className="flex justify-center my-10 ">
                <button
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  mobile:w-64 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-auto"
                >
                  Lưu thông tin cá nhân chỉnh sửa
                </button>
              </div>
            </div>
          </form>
          <form className="order-first tablet:order-none">
            <p className="text-2xl font-bold mb-10">Ảnh đại diện của bạn</p>
            <Card>
              <CardHeader>
                <div className="flex justify-center">
                  <Avatar className="w-[220px] h-[220px]">
                    <AvatarImage src={avatar} alt="avatar" />
                    <AvatarFallback>Avatar</AvatarFallback>
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
                        Thay đổi ảnh đại điện của bạn ở đây. Nhấn "Lưu thay đổi"
                        sau khi thay đổi xong nhé.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center">
                      <div>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          for="file_input"
                        >
                          Vui lòng chọn ảnh đại diện mới
                        </label>
                        <input
                          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          aria-describedby="file_input_help"
                          id="file_input"
                          type="file"
                          onChange={handleChange}
                        />
                        <p
                          class="mt-1 text-sm text-gray-500 dark:text-gray-300"
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

                      <Button type="submit" onClick={handleSubmitAvatar}>
                        Lưu thay đổi
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
