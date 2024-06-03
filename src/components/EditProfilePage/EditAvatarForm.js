import React, { useState } from "react";
import Datepicker from "flowbite-datepicker/Datepicker";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
export default function EditAvatarForm() {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState();
    const [avatar, setAvatar] = useState(
        "https://i.pinimg.com/736x/23/f0/ae/23f0ae241add8bc53d7f334e42a60e3d.jpg"
    );

    function handleChange(e) {
        console.log("File ảnh đại diện vừa chọn: ", e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }



    const handleSubmitAvatar = (e) => {
        e.preventDefault();
        console.log("Avatar changed");
        if (file) {
            setAvatar(file);
        } else {
            // Handle trường hợp không có chọn avatar nào
            console.log("No file selected");
        }
        setOpen(false);
    };

    return <div>

        <form className="tablet:order-none">
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
                                    Thay đổi ảnh đại diện của bạn ở đây. Nhấn "Lưu thay đổi" sau khi
                                    thay đổi xong nhé.
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
                                <Button type="submit" onClick={handleSubmitAvatar}>
                                    Lưu thay đổi
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </form>
    </div>;
}
