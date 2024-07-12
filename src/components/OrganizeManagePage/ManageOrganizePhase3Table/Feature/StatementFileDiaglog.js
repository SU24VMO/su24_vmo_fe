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

import React, { useContext, useState } from "react";

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

    const handleSelectSheet = (e, setFieldValue) => {
        const files = Array.from(e.target.files);

        setFileSheet((prevFiles) => {
            const newFiles = [...prevFiles, ...files];
            setFieldValue('statementFiles', newFiles);  
            return newFiles;
        });
    };

    function removeFile(index, setFieldValue) {
        setFileSheet((prevFiles) => {
            const newFiles = prevFiles.filter((_, i) => i !== index);
            setFieldValue('statementFiles', newFiles);  
            return newFiles;
        });
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
            } else {
                toast({
                    variant: "destructive",
                    title: "Đăng tải thất bại !",
                    description: "Vui lòng kiểm tra lại thông tin Đăng tải !",
                    action: <ToastAction altText="undo">Ẩn</ToastAction>,
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Đăng tải thất bại !",
                description: "Vui lòng kiểm tra lại thông tin Đăng tải !",
                action: <ToastAction altText="undo">Ẩn</ToastAction>,
            });
        } finally {
            setLoading(false);
            onOpenChange(false);
        }
    };

    return (
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
                                    <input
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        id="statementFile"
                                        name="statementFile"
                                        onChange={(e) => handleSelectSheet(e, setFieldValue)}
                                        type="file"
                                        multiple
                                    />
                                    <div>
                                        {values.statementFiles.map((file, index) => (
                                            <div key={index} className="flex items-center gap-3 mt-2">
                                                <span>{file.name}</span>
                                                <Button type="button" variant="destructive" onClick={() => removeFile(index, setFieldValue)}>
                                                    Xóa
                                                </Button>
                                            </div>
                                        ))}
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
                                <Button type="submit" disabled={isSubmitting} onClick={handleSubmit}>
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
    );
};

export default StatementFileDiaglog;
