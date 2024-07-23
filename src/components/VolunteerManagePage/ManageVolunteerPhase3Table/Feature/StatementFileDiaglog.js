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

import { useToast } from "../../../ui/use-toast";

import React, { useContext, useEffect, useState } from "react";

import { Loader2 } from "lucide-react";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { AuthContext } from "../../../../context/AuthContext";
import { POSTSTATEMENTFILE } from "../../../../api/apiConstants";
import { ToastAction } from "../../../ui/toast";
import { Formik } from "formik";

const StatementFileDiaglog = ({ isOpen, onOpenChange, row, onSubmitSuccess }) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const [fileSheet, setFileSheet] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);


    const handleSelectSheet = (e, setFieldValue) => {
        const files = Array.from(e.target.files);
        const filePreviews = files.map(file => URL.createObjectURL(file));

        setFileSheet((prevFiles) => {
            const newFiles = [...prevFiles, ...files];
            setFieldValue('statementFiles', newFiles);
            return newFiles;
        });
        setImagePreviews((prevPreviews) => [...prevPreviews, ...filePreviews]);
    };

    function removeFile(index, setFieldValue) {
        setFileSheet((prevFiles) => {
            const newFiles = prevFiles.filter((_, i) => i !== index);
            setFieldValue('statementFiles', newFiles);
            return newFiles;
        });
        setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    }


    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);

    const viewImage = (imagePreview) => {
        setCurrentImage(imagePreview);
        setIsImageModalOpen(true);
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
        setCurrentImage(null);
    }

    const submitStatementFile = async (data) => {
        setLoading(true);
        const formData = new FormData();
        console.log(data);
        formData.append('StatementPhaseId', row?.statementPhase?.statementPhaseId);
        data.statementFiles.forEach(file => {
            formData.append('StatementFile', file);
        });
        formData.append('AccountId', user.account_id);

        try {
            const response = await axiosPrivate.post(POSTSTATEMENTFILE, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                console.log(response.data);
                onSubmitSuccess();
                toast({
                    title: "Đăng tải thành công",
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
            setLoading(false);
            onOpenChange(false);
        }
    };


    useEffect(() => {
        // Reset fileSheet and imagePreviews when row changes
        setFileSheet([]);
        setImagePreviews([]);
    }, [row]);


    useEffect(() => {
        return () => {
            imagePreviews.forEach(file => URL.revokeObjectURL(file));
        };
    }, []);

    return (
        <>
            <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
                <DialogContent className="flex items-center justify-center">
                    <img src={currentImage} alt="Preview" className="max-w-full min-h-full" />
                    <Button onClick={closeImageModal} className="absolute top-0 right-0 m-4">Đóng</Button>
                </DialogContent>
            </Dialog>
            <Formik
                initialValues={{
                    statementFiles: []
                }}
                validate={(values) => {
                    const errors = {};
                    if (values.statementFiles.length === 0) {
                        errors.statementFiles = "Không được để trống!";
                    }
                    console.log(errors);
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    submitStatementFile(values);
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
                                    <DialogTitle>Bạn vui lòng gửi chi tiết sao kê</DialogTitle>
                                </DialogHeader>
                                {row && (
                                    <div className="flex flex-col gap-3">
                                        <label htmlFor="statementFile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            File chi tiết sao kê*
                                        </label>

                                        <label
                                            className="block w-full py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            htmlFor="statementFile"
                                        >
                                            <span className="ml-2">Chọn ảnh</span>
                                        </label>
                                        <input
                                            className="hidden"
                                            aria-describedby="statementFile"
                                            id="statementFile"
                                            name="statementFile"
                                            onChange={(e) => { handleSelectSheet(e, setFieldValue) }}
                                            type="file"
                                            accept="image/png, image/jpeg, image/jpg"
                                        />
                                        <div>
                                            {/* {values.statementFiles.map((file, index) => (
                                            <div key={index} className="flex items-center gap-3 mt-2">
                                                <span>{file.name}</span>
                                                <Button type="button" variant="destructive" onClick={() => removeFile(index, setFieldValue)}>
                                                    Xóa
                                                </Button>
                                            </div>
                                        ))} */}
                                            <ScrollArea className="h-[40vh] ">
                                                <ul className=" grid grid-cols-4 gap-2">
                                                    {imagePreviews.map((imagePreview, index) => (
                                                        <li key={index} className="mx-auto">
                                                            <div className="w-52 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
                                                                <img className="h-40 object-cover rounded-xl mx-auto" src={imagePreview} alt="" />
                                                                <div className="p-2">
                                                                    <h2 className="font-bold text-lg mb-2">File {index + 1}</h2>
                                                                </div>
                                                                <div className="flex justify-evenly">
                                                                    <button className="text-white bg-red-600 px-4 py-1 rounded-md hover:bg-red-700"
                                                                        onClick={() => removeFile(index, setFieldValue)}
                                                                    >Xóa</button>
                                                                    <button className="text-white bg-green-600 px-4 py-1 rounded-md hover:bg-green-700"
                                                                        onClick={() => viewImage(imagePreview)}
                                                                    >Xem</button>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </ScrollArea>

                                        </div>
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.statementFiles && touched.statementFiles && errors.statementFiles}
                                        </p>
                                    </div>
                                )}
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary">
                                            Đóng
                                        </Button>
                                    </DialogClose>
                                    <Button className="" type="submit" disabled={isSubmitting} onClick={handleSubmit}
                                        variant="green_theme_primary"
                                    >
                                        {loading ? (
                                            <Loader2 className="animate-spin flex items-center justify-center w-full" />
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

export default StatementFileDiaglog;
