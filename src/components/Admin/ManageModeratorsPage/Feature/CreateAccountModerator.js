import { Button } from "../../../ui/button";
import { ScrollArea } from "../../../ui/scroll-area";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../../ui/dialog";
import { Formik } from "formik";
import { useToast } from "../../../ui/use-toast";
import React, { useState } from "react";
import { ToastAction } from "../../../../components/ui/toast";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { CREATEACCOUNTMODERATOR } from "../../../../api/apiConstants";
import { Loader2 } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Input } from "../../../ui/input";

const CreateAccountModerator = ({ isOpen, onOpenChange, onSubmitSuccess }) => {
    const { toast } = useToast();
    // Formik setup
    const [loading, setLoading] = useState(false)

    const createAccount = async (data) => {
        try {
            setLoading(true)

            const response = await axiosPrivate.post(CREATEACCOUNTMODERATOR, {
                email: data.email,
                password: data.password,
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                avatar: "string",
                role: 4
            });

            if (response.status === 200) {
                console.log(response);
                onSubmitSuccess()

                toast({
                    title: "Tạo tài khoản kiểm duyệt thành công",
                    action: <ToastAction altText="undo">Ẩn</ToastAction>,
                });
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const serverMessage = error?.response?.data?.message;
                toast({
                    variant: "destructive",
                    title: "Đã xảy ra lỗi!",
                    description: serverMessage,
                    action: <ToastAction altText="undo">Ẩn</ToastAction>,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Đã xảy ra lỗi!",
                    description: "Đã có lỗi xảy ra, vui lòng thử lại sau.",
                    action: <ToastAction altText="undo">Ẩn</ToastAction>,
                });
            }
        } finally {

            onOpenChange(false);
            setLoading(false)
        }
    }



    return (
        <>

            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    username: "",
                    firstName: "",
                    lastName: "",
                }}
                validate={(values) => {
                    const errors = {};

                    // Email validation
                    if (!values.email) {
                        errors.email = "Không được để trống!";
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            values.email
                        )
                    ) {
                        errors.email = "Email không hợp lệ!";
                    }


                    // Password validation
                    if (!values.password) {
                        errors.password = "Không được để trống!";
                    } else if (
                        !/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/.test(
                            values.password
                        )
                    ) {
                        errors.password =
                            "Mật khẩu phải bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 kỹ tự. Ví dụ: Abc@1234";
                    }


                    // UserName validation
                    if (!values.username) {
                        errors.username = "Không được để trống!";
                    } else if (!/^[a-z0-9_-]{3,16}$/.test(values.username)) {
                        errors.username =
                            "Tên đăng nhập phải bao gồm chuỗi và số từ 3 đến 16 ký tự chỉ được thêm kí tự '-' hoặc '_', không được để dấu, chữ cái viết hoa. Ví dụ: abc_123";
                    }

                    // FirstName validation
                    if (!values.firstName) {
                        errors.firstName = "Không được để trống!";
                    }
                    // else if (!/^[a-zA-Z ]+$/.test(values.firstName)) {
                    //   errors.firstName = "Họ không hợp lệ! Vui lòng nhập không dấu!";
                    // }
                    // LastName validation
                    if (!values.lastName) {
                        errors.lastName = "Không được để trống!";
                    }
                    // else if (!/^[a-zA-Z ]+$/.test(values.lastName)) {
                    //   errors.lastName = "Tên không hợp lệ! Vui lòng nhập không dấu!";
                    // }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    createAccount(values);
                    setSubmitting(false);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Dialog open={isOpen} onOpenChange={onOpenChange}>
                            <DialogContent className="mobile:max-w-screen-tablet">
                                <DialogHeader>
                                    <DialogTitle>Tạo tài khoản nhân viên kiểm duyệt</DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                        <label
                                            for="firstName"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Họ *
                                        </label>
                                            <Input
                                                id="firstName"
                                                placeholder="Nguyễn"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.firstName}
                                                autoComplete="off"
                                            />
                                            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                                {" "}
                                                {errors.firstName && touched.firstName && errors.firstName}
                                            </p>
                                        </div>
                                        <div className="grid gap-2">
                                        <label
                                            for="lastName"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            
                                            Tên *
                                        </label>
                                            <Input
                                                id="lastName"
                                                placeholder="Văn A"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.lastName}
                                                autoComplete="off"
                                            />
                                            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                                {" "}
                                                {errors.lastName && touched.lastName && errors.lastName}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="mb-5">
                                        <label
                                            for="email"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Email *
                                        </label>
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Nhập Email..."
                                        />
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {" "}
                                            {errors.email && touched.email && errors.email}
                                        </p>
                                    </div>
                                    <div class="mb-5">
                                        <label
                                            for="email"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Mật khẩu *
                                        </label>
                                        <input
                                            type="text"
                                            id="password"
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Nhập mật khẩu..."
                                        />
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {" "}
                                            {errors.password && touched.password && errors.password}
                                        </p>
                                    </div>
                                    <div class="mb-5">
                                        <label
                                            for="username"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Tên người dùng *
                                        </label>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.username}
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Nhập tên người dùng..."
                                        />
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {" "}
                                            {errors.username && touched.username && errors.username}
                                        </p>
                                    </div>
                                </DialogDescription>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary">
                                            Đóng
                                        </Button>
                                    </DialogClose>
                                    <Button
                                        type="button"
                                        disabled={isSubmitting}
                                        onClick={handleSubmit}
                                        variant="green_theme_primary"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="  animate-spin flex items-center justify-center w-full" />

                                            </>
                                        ) : (
                                            "Xác nhận"
                                        )}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default CreateAccountModerator;
