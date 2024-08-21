import React, { useContext, useEffect, useState } from "react";
import TypeOfCampaignSelect from "./TypeOfCampaignSelect/TypeOfCampaignSelect";
import EndDayPicker from "./EndDayPicker/EndDayPicker";
import StartDayPicker from "./StartDayPicker/StartDayPicker";
import { Formik } from "formik";
import { axiosPrivate } from "../../api/axiosInstance";
import { CREATECAMPAIGN } from "../../api/apiConstants";
import { AuthContext } from "../../context/AuthContext";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import OrganizationsSelect from "./OrganizationsSelect/OrganizationsSelect";
import { Helmet } from "react-helmet";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import SelectBanks from "./SelectBanks/SelectBanks";
import './HiddenInputUpDown.css'
import SelectCampaignDisbursement from "./SelectCampaignDisbursement/SelectCampaignDisbursement";

export default function CreateCampaignOrganizationManagerPage() {
    const { toast } = useToast();

    const { user } = useContext(AuthContext)
    const [fileImageBackground, setFileImageBackground] = useState();
    const [fileImageQR, setFileImageQR] = useState()
    const [fileImageDocument, setFileImageDocument] = useState()

    const [checkTierCampaign, setCheckTierCampaign] = useState(0)
    const [checkTargetAmount, setCheckTargetAmount] = useState(0)

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    function handleImageBackgroundChange(e, setFieldValue) {
        console.log(e.target.files);
        setFileImageBackground(URL.createObjectURL(e.target.files[0]));
        setFieldValue("imageBackgroundFile", e.target.files[0]);

    }
    function handleImageQRCode(e, setFieldValue) {
        console.log(e.target.files);
        setFileImageQR(URL.createObjectURL(e.target.files[0]));
        setFieldValue("imageQRCode", e.target.files[0]);

    }
    function handleImageLocalDocument(e, setFieldValue) {
        console.log(e.target.files);
        setFileImageDocument(URL.createObjectURL(e.target.files[0]));
        setFieldValue("imageLocalDocument", e.target.files[0]);

    }
    function removeImageBackground(e, setFieldValue) {
        setFileImageBackground('');
        setFieldValue("imageBackgroundFile", null);

    }
    function removeImageQRcode(e, setFieldValue) {
        setFileImageQR('');
        setFieldValue("imageQRCode", null);

    }
    function removeImageDocument(e, setFieldValue) {
        setFileImageDocument('');
        setFieldValue("imageLocalDocument", null);

    }

    const formatAmount = (value) => {
        const cleanValue = value.replace(/\D/g, '');
        const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return formattedValue;
    };

    const cleanFormattedAmount = (formattedValue) => {
        return formattedValue.replace(/\./g, '');
    };

    const handleTargetAmountChange = (e, setFieldValue) => {
        const formattedValue = formatAmount(e.target.value);

        setCheckTargetAmount(cleanFormattedAmount(formattedValue))

        setFieldValue("targetAmount", formattedValue);

    };


    // ------------------------------------------------

    // Clean format tiền trước khi gửi đi submit
    const cleanFormattedAmountTier = (formattedValue) => {
        return formattedValue.replace(/\./g, '').replace(/[^0-9.]/g, '');
    };
    const [elements, setElements] = useState([]);


    const [errorPlan, setErrorPlan] = useState({});

    // Xử lí nhập liệu title và amount
    const handleInputChange = (index, field, value, setFieldValue) => {
        // Conditionally clean the value if the field is 'amount'
        const cleanedValue = field === 'amount' ? cleanFormattedAmountTier(value) : value;

        setElements(prevElements => {
            const updatedElements = prevElements.map((element, i) =>
                i === index ? { ...element, [field]: cleanedValue } : element
            );
            setFieldValue('stages', updatedElements);
            return updatedElements;
        });
    };

    // Xử lí lõi blur nhập liệu title và amount
    const handleBlurErrors = (index, field) => {
        console.log('Index:', index);
        console.log('Field:', field);
        console.log('Elements:', elements);

        // Kiểm tra nếu index hoặc field không tồn tại
        if (index >= elements.length || !elements[index]) {
            console.warn('Invalid index or element');
            return;
        }

        const value = elements[index][field] || '';
        console.log('Value:', value);

        const error = validateField(field, value);
        console.log('Error:', error);

        setErrorPlan(prevErrors => ({
            ...prevErrors,
            [`${index}-${field}`]: error
        }));
    };
    // bắt lỗi
    const validateField = (field, value) => {
        if (field === 'title') {
            return validateTitle(value) ? '' : 'Vui lòng điền';
        }
        if (field === 'amount') {
            return validateAmount(value) ? '' : 'Vui lòng điền';
        }
        return '';
    };

    const validateTitle = (title) => {
        return title.trim() !== '';
    };

    const validateAmount = (amount) => {
        const cleanedAmount = cleanFormattedAmount(amount);
        return cleanedAmount.trim() !== '';
    };

    // Thêm thẻ cho việc add plan
    const addElement = () => {
        setElements(prevElements => [...prevElements, { title: '', amount: '' }]);
    };

    const removeElement = (index, setFieldValue) => {
        setElements(prevElements => {
            const updatedElements = prevElements.filter((_, i) => i !== index);
            setFieldValue('stages', updatedElements);
            return updatedElements;
        });
    };


    useEffect(() => {
        console.log("đây là", checkTierCampaign);

    }, [checkTierCampaign])

    useEffect(() => {


    }, [errorPlan])


    const createCampaign = async (data, resetForm) => {
        setLoading(true)
        const formData = new FormData();
        formData.append('ApplicationConfirmForm', data.imageLocalDocument);
        formData.append('ImageCampaign', data.imageBackgroundFile);
        formData.append('QRCode', data.imageQRCode);
        formData.append('Name', data.nameOfCampaign);
        formData.append('Address', data.address);
        formData.append('CampaignTypeId', data.typeOfCampaign);
        formData.append('Description', data.description);
        formData.append('StartDate', data.startDate);
        formData.append('ExpectedEndDate', data.endDate);
        formData.append('TargetAmount', cleanFormattedAmount(data.targetAmount));
        formData.append('OrganizationId', data.organizations);
        formData.append('BankingName', data.nameOfBank);
        formData.append('AccountName', data.nameOfUserBank);
        formData.append('BankingAccountNumber', data.numberOfBankAccount);
        formData.append('CampaignTier', data.campaignTier);
        // check nếu  vô tình ng ta nhập xong mà chọn lại tier 1 thì nó ẩn đi không gửi về stages json
        if ((checkTierCampaign * 1) === 2) {
            formData.append('stagesJson', JSON.stringify(data.stages))

        } else {
            setElements([])
            formData.append('stagesJson', elements)
        }

        try {
            const response = await axiosPrivate.post(CREATECAMPAIGN + `?accountId=${user.account_id}`, formData, {

                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                console.log(response.data);
                setFileImageBackground(null);
                if ((data.campaignTier * 1) === 2) {
                    navigate("/manage/organize/allCampaignsTier2")
                } else {
                    navigate("/manage/organize/allCampaignsTier1")
                }
                resetForm();

                toast({
                    title: "Tạo chiến dịch thành công !",
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
            setLoading(false)
        }
    }



    return (<>
        <Helmet>
            <title>Tạo chiến dịch • VMO</title>
            <meta
                name="description"
                content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
            />
        </Helmet>
        <Formik
            initialValues={{
                nameOfCampaign: "",
                address: "",
                typeOfCampaign: null,
                description: "",
                startDate: null,
                endDate: null,
                targetAmount: "",
                organizations: null,
                imageLocalDocument: null,
                imageBackgroundFile: null,
                nameOfBank: "",
                nameOfUserBank: "",
                numberOfBankAccount: "",
                imageQRCode: null,
                campaignTier: null,
                stages: elements,


            }}
            validate={(values) => {
                const errors = {};
                var today = new Date();
                today.setHours(0, 0, 0, 0); // Đặt giờ phút giây về 0 để so sánh chính xác hơn
                var startDate = new Date(values.startDate);
                var endDate = new Date(values.endDate);


                // Kiểm tra ngày bắt đầu
                if (!values.startDate) {
                    errors.startDate = "Không được để trống!";
                } else {
                    if (startDate < today) {
                        errors.startDate = "Ngày không được nằm trong quá khứ!";
                    }
                }

                // Kiểm tra ngày kết thúc
                if (!values.endDate) {
                    errors.endDate = "Không được để trống!";
                } else {
                    if (endDate <= today) {
                        errors.endDate = "Ngày kết thúc phải diễn ra trong tương lai!";
                    } else if (endDate <= startDate) {
                        errors.endDate = "Ngày kết thúc phải lớn hơn ngày bắt đầu!";

                    } else if (startDate && endDate && (endDate - startDate) / (1000 * 60 * 60 * 24) < 1) {
                        errors.startDate = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc ít nhất 1 ngày!";
                        errors.endDate = "Ngày kết thúc và ngày bắt đầu phải cách nhau ít nhất 1 ngày!";
                    }
                }


                // typeOfCampaign validation
                if (!values.typeOfCampaign) {
                    errors.typeOfCampaign = "Không được để trống!";
                }
                // nameOfBank validation
                if (!values.nameOfBank) {
                    errors.nameOfBank = "Không được để trống!";
                }

                // nameOfUserBank validation
                if (!values.nameOfUserBank) {
                    errors.nameOfUserBank = "Không được để trống!";
                }

                // numberOfBankAccount validation
                if (!values.numberOfBankAccount) {
                    errors.numberOfBankAccount = "Không được để trống!";
                } else {
                    // Biểu thức chính quy để kiểm tra ký tự đặc biệt và dấu âm dương
                    var specialCharAndSignRegex = /[!@#$%^&*(),.?":{}|<>+-]/g;
                    if (specialCharAndSignRegex.test(values.numberOfBankAccount)) {
                        errors.numberOfBankAccount = "Không được chứa ký tự đặc biệt!";
                    }
                }

                // nameOfCampaign validation
                if (!values.nameOfCampaign) {
                    errors.nameOfCampaign = "Không được để trống!";
                }
                // address validation
                if (!values.address) {
                    errors.address = "Không được để trống!";
                }
                // description validation
                if (!values.description) {
                    errors.description = "Không được để trống!";
                }
                // imageBackgroundFile validation
                if (!values.imageBackgroundFile) {
                    errors.imageBackgroundFile = "Không được để trống!";
                }
                // imageQRCode validation
                if (!values.imageQRCode) {
                    errors.imageQRCode = "Không được để trống!";
                }
                // targetAmount validation
                if (!values.targetAmount) {
                    errors.targetAmount = "Không được để trống!";
                } else {
                    const cleanValue = values.targetAmount.replace(/\D/g, ''); // Loại bỏ tất cả các ký tự không phải số
                    const amount = parseFloat(cleanValue);
                    if (isNaN(amount)) {
                        errors.targetAmount = "Vui lòng nhập số tiền hợp lệ!";
                    } else if (amount <= 0) {
                        errors.targetAmount = "Số tiền mục tiêu phải lớn hơn 0!";
                    } else if (amount > 500000000) {
                        errors.targetAmount = "Số tiền mục tiêu không được vượt quá 500,000,000 VND!";
                    }
                }

                // organizations validate 
                if (!values.organizations) {
                    errors.organizations = "Không được để trống!";
                }
                // imageLocalDocument validate 
                if (!values.imageLocalDocument) {
                    errors.imageLocalDocument = "Không được để trống!";
                }
                // campaignTier validate 
                if (!values.campaignTier) {
                    errors.campaignTier = "Không được để trống!";
                }

                // stages validate 
                if ((checkTierCampaign * 1) === 2) {
                    // Validate the stages
                    // Kiểm tra xem có ít nhất một phần tử trong mảng thỏa mãn điều kiện do hàm cung cấp không.
                    // Trả về true và false
                    // some được sử dụng để kiểm tra xem có bất kỳ lỗi nào trong mảng stages không. Nó lặp qua 
                    // từng phần tử và kiểm tra xem có lỗi nào liên quan đến tiêu đề hoặc số tiền không. Nếu có 
                    // ít nhất một giai đoạn có lỗi, nó trả về true.
                    const hasStageErrors = values.stages.some((_, index) => {
                        const titleError = errorPlan[`${index}-title`] && !values.stages[index].title;
                        const amountError = errorPlan[`${index}-amount`] && !values.stages[index].amount;
                        return titleError || amountError;
                    });
                    // Áp dụng một hàm cho một giá trị tích lũy và từng phần tử trong mảng (từ trái qua phải) để giảm mảng xuống thành một giá trị duy nhất.
                    // Phương thức này trả về giá trị cuối cùng sau tất cả các lần lặp.
                    // reduce được sử dụng để tính tổng số tiền bằng cách lặp qua từng giai đoạn và cộng dồn giá trị
                    //  amount. Nó bắt đầu với tổng ban đầu là 0 và cộng dồn từng số tiền của giai đoạn vào đó.
                    const totalAmount = values.stages.reduce((sum, stage) => {
                        const amount = parseFloat(stage.amount) || 0; // Ensure amount is a number, fallback to 0 if it's not
                        return sum + amount;
                    }, 0);
                    console.log('====================================');
                    console.log("Số tiền ", totalAmount);
                    console.log('====================================');
                    console.log('====================================');
                    console.log("Số tiền target", checkTargetAmount);
                    console.log('====================================');

                    if (!values.stages.length) {
                        errors.stages = "Vui lòng ít nhất có 1 hoạt động của kế hoạch!";
                    } else if (hasStageErrors) {
                        errors.stages = 'Vui lòng điền đầy đủ thông tin!';
                    } else if ((totalAmount * 1) !== (checkTargetAmount * 1)) {
                        errors.stages = 'Tổng tiền của bạn có vẻ như chưa đúng với mục tiêu!';
                    }
                }


                return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm, setFieldValue }) => {
                createCampaign(values, resetForm)

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
                setFieldValue,

            }) => (
                <form onSubmit={handleSubmit}>
                    {/* <div className="bg-orange-300 w-full h-14 flex justify-center items-center  ">
                        <h1 className="text-sm mobile:text-2xl laptop:text-2xl font-medium">Tạo chiến dịch của bạn!</h1>
                    </div> */}

                    <div className="w-4/5 mx-auto rounded-xl animate-fadeInLeft">
                        <div className="grid gap-6 grid-cols-1 laptop:grid-cols-3 ">

                            <div className=" col-span-2 laptop:col-span-1 border-2 shadow rounded-xl">
                                <div >
                                    <div className="bg-vmo mb-6  rounded-tl-xl rounded-tr-xl ">
                                        <h1 className="text-white text-center py-3 font-semibold text-sm mobile:text-xl">Ảnh chiến dịch</h1>
                                    </div>


                                    <div class="flex items-center justify-center w-full laptop:w-4/5 mx-auto">

                                        {fileImageBackground ? <div className=" flex flex-col justify-center items-center">
                                            <img className="mb-6 w-1/2 h-1/2 laptop:w-2/3 laptop:h-2/3 rounded-xl"
                                                id="image"

                                                value={fileImageBackground}
                                                src={fileImageBackground} width={220} height={220} alt="avatar" />
                                            <button type="button"
                                                onClick={(e) => { removeImageBackground(e, setFieldValue) }}
                                                class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Xóa ảnh</button>

                                        </div> : <label for="imageBackgroundFile" class="flex flex-col items-center justify-center w-2/3 tablet:w-4/5 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400 w-3/4 mobile:w-full"><span class="font-semibold">Nhấp vào đây</span> hoặc kéo thả file ảnh</p>
                                                <p class="text-xs text-gray-500 dark:text-gray-400 w-3/4 mobile:w-full"> PNG, JPG </p>
                                            </div>
                                            <input id="imageBackgroundFile" type="file" name="imageBackgroundFile" class="hidden"
                                                onChange={(e) => { handleImageBackgroundChange(e, setFieldValue) }}
                                                value={values.imageBackgroundFile}

                                            />
                                        </label>}


                                    </div>
                                    <div className="text-center mt-2">
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.imageBackgroundFile && touched.imageBackgroundFile && errors.imageBackgroundFile}</p>
                                        <p className="text-sm italic font-thin">Chọn ảnh chiến dịch của bạn *</p>
                                    </div>

                                    <div className="bg-vmo m-4 rounded-xl w-3/5 mx-auto laptop:w-4/5">
                                        <div className="p-4 mobile:flex mobile:justify-center gap-3 items-center">
                                            {user?.avatar !== "string" ? (<img class=" w-24 h-24  mobile:w-16 mobile:h-16 rounded-full mx-auto mobile:mx-0" src={user?.avatar} alt="Rounded avatar" />)
                                                : (<Avatar className="w-24 h-24  mobile:w-16 mobile:h-16 rounded-full mx-auto mobile:mx-0">
                                                    <AvatarImage
                                                        alt="Avatar User"
                                                    />
                                                    <AvatarFallback>{user.lastname[0]}</AvatarFallback>
                                                </Avatar>)}
                                            <div>
                                                <p className="text-gray-100 text-center mobile:text-left">Tài khoản người dùng:</p>
                                                <h2 className="font-semibold text-center mobile:text-left">{user.username}</h2>
                                            </div>
                                        </div>


                                    </div>

                                    <div class=" w-4/5 mx-auto">
                                        <label for="nameOfBank" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên ngân hàng *</label>
                                        {/* <div class="relative mb-6">
                                            <input type="text"
                                                id="nameOfBank"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.nameOfBank}
                                                autoComplete="off"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pe-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập tên ngân hàng..." />

                                            <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.nameOfBank && touched.nameOfBank && errors.nameOfBank}</p>
                                        </div> */}

                                        <SelectBanks
                                            setFieldValue={setFieldValue}
                                            selectTriggerId="nameOfBank"></SelectBanks>
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.nameOfBank && touched.nameOfBank && errors.nameOfBank}</p>
                                        <label for="nameOfUserBank" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên tài khoản *</label>
                                        <div class="relative mb-6">
                                            <input type="text"
                                                id="nameOfUserBank"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.nameOfUserBank}
                                                autoComplete="off"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pe-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập tên tài khoản ngân hàng..." />
                                            <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.nameOfUserBank && touched.nameOfUserBank && errors.nameOfUserBank}</p>
                                        </div>
                                        <label for="numberOfBankAccount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số tài khoản *</label>
                                        <div class="relative mb-6">
                                            <input type="number"
                                                id="numberOfBankAccount"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.numberOfBankAccount}
                                                autoComplete="off"
                                                class="number-to-text bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pe-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập số tài khoản..." />

                                            <p class=" absolute mt-2  text-sm text-red-600 dark:text-red-500"> {errors.numberOfBankAccount && touched.numberOfBankAccount && errors.numberOfBankAccount}</p>
                                            <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                                <svg fill="none" class="h-6 text-[#1434CB] dark:text-white" viewBox="0 0 36 21"><path fill="currentColor" d="M23.315 4.773c-2.542 0-4.813 1.3-4.813 3.705 0 2.756 4.028 2.947 4.028 4.332 0 .583-.676 1.105-1.832 1.105-1.64 0-2.866-.73-2.866-.73l-.524 2.426s1.412.616 3.286.616c2.78 0 4.966-1.365 4.966-3.81 0-2.913-4.045-3.097-4.045-4.383 0-.457.555-.957 1.708-.957 1.3 0 2.36.53 2.36.53l.514-2.343s-1.154-.491-2.782-.491zM.062 4.95L0 5.303s1.07.193 2.032.579c1.24.442 1.329.7 1.537 1.499l2.276 8.664h3.05l4.7-11.095h-3.043l-3.02 7.543L6.3 6.1c-.113-.732-.686-1.15-1.386-1.15H.062zm14.757 0l-2.387 11.095h2.902l2.38-11.096h-2.895zm16.187 0c-.7 0-1.07.37-1.342 1.016L25.41 16.045h3.044l.589-1.68h3.708l.358 1.68h2.685L33.453 4.95h-2.447zm.396 2.997l.902 4.164h-2.417l1.515-4.164z" /></svg>
                                            </div>
                                        </div>

                                        <div className="mb-6 mt-10">
                                            {fileImageQR ? (<div className=" flex flex-col justify-center items-center">
                                                <img className="mb-6 w-1/2 h-1/2 laptop:w-2/3 laptop:h-2/3 rounded-xl"
                                                    id="image"

                                                    value={fileImageQR}
                                                    src={fileImageQR} width={220} height={220} alt="qr-code" />
                                                <button type="button"
                                                    onClick={(e) => { removeImageQRcode(e, setFieldValue) }}
                                                    class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Xóa ảnh</button>

                                            </div>) : (<div>
                                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                    for="imageQRCode">QR code tài khoản (ảnh)*</label>
                                                <label
                                                    className="block w-full py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                    htmlFor="imageQRCode"
                                                >
                                                    <span className="ml-2">Chọn ảnh</span>
                                                </label>
                                                <input
                                                    className="hidden"
                                                    aria-describedby="imageQRCode"
                                                    id="imageQRCode"
                                                    name="imageQRCode"
                                                    onChange={(e) => { handleImageQRCode(e, setFieldValue) }}
                                                    type="file"
                                                    accept="image/png, image/jpeg, image/jpg"
                                                />
                                                <p class="  mt-2  text-sm text-red-600 dark:text-red-500"> {errors.imageQRCode && touched.imageQRCode && errors.imageQRCode}</p>
                                            </div>)}

                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className=" col-span-2 laptop:col-span-2 border-2 shadow rounded-xl">
                                <div className="bg-vmo mb-6 rounded-tl-xl rounded-tr-xl">
                                    <h1 className="text-white text-center py-3 font-semibold text-sm mobile:text-xl">Tạo chiến dịch</h1>
                                </div>
                                <div className="w-4/5 mx-auto">
                                    <div class="mb-6">
                                        <label for="nameOfCampaign" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên chiến dịch *</label>
                                        <input type="text"
                                            id="nameOfCampaign"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.nameOfCampaign}
                                            autoComplete="off"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập tên chiến dịch..." />
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.nameOfCampaign && touched.nameOfCampaign && errors.nameOfCampaign}</p>

                                    </div>

                                    <div class="mb-6">
                                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ *</label>
                                        <input type="text"
                                            id="address"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.address}
                                            autoComplete="off"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập địa chỉ..." />
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.address && touched.address && errors.address}</p>

                                    </div>
                                    <div className="mb-6">

                                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả *</label>
                                        <textarea id="description"
                                            rows="4"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.description}
                                            autoComplete="off"
                                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mô tả về chiến dịch..."></textarea>
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.description && touched.description && errors.description}</p>

                                    </div>
                                    <div className="mb-2">
                                        <label for="" class=" bg-vmo p-1 rounded-sm w-fit block mb-2 text-sm font-medium text-gray-900 dark:text-white">-Thời gian cho giai đoạn ủng hộ quyên góp-</label>

                                    </div>
                                    <div className=" laptop:flex justify-between w-full items-center mb-6">
                                        <div className="laptop:w-2/5">
                                            <label for="dateFrom" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Diễn ra từ *</label>

                                            <div class="relative tablet:w-full mb-6 laptop:mb-0">

                                                <StartDayPicker setStartFieldValue={setFieldValue}
                                                    popOverTriggerIdStart="startDate"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                ></StartDayPicker>
                                                <p class=" z-10 mt-2 text-sm text-red-600 dark:text-red-500"> {errors.startDate && touched.startDate && errors.startDate}</p>
                                            </div>

                                        </div>

                                        <hr class=" hidden laptop:block w-10 h-1 mx-auto my-4 bg-black border-0 rounded  dark:bg-gray-700"></hr>

                                        <div className="laptop:w-2/5">
                                            <label for="dateTo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">đến ngày *</label>

                                            <div class="relative  tablet:w-full">
                                                <EndDayPicker setEndFieldValue={setFieldValue}
                                                    popOverTriggerIdEnd="endDate"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                ></EndDayPicker>
                                                <p class=" z-10 mt-2 text-sm text-red-600 dark:text-red-500"> {errors.endDate && touched.endDate && errors.endDate}</p>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label for="targetAmount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mục tiêu chiến dịch *</label>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <input
                                                type="text"
                                                name="targetAmount"
                                                id="targetAmount"
                                                maxLength="11"
                                                onChange={(e) => handleTargetAmountChange(e, setFieldValue)}
                                                onBlur={handleBlur}
                                                value={values.targetAmount}
                                                autoComplete="off"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 font-semibold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="0"
                                                aria-describedby="price-currency"
                                            />


                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                <span className="text-gray-600 font-semibold sm:text-sm" id="price-currency">
                                                    VND
                                                </span>
                                            </div>
                                        </div>
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.targetAmount &&
                                                touched.targetAmount &&
                                                errors.targetAmount}
                                        </p>
                                    </div>
                                    <div className="mb-6">
                                        <label for="typeOfCampaign" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại chiến dịch *</label>

                                        <TypeOfCampaignSelect
                                            setFieldValue={setFieldValue}
                                            selectTriggerId="typeOfCampaign"
                                        >

                                        </TypeOfCampaignSelect>
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.typeOfCampaign && touched.typeOfCampaign && errors.typeOfCampaign}</p>

                                    </div>

                                    <div className="mb-6">
                                        <label for="campaignTier" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại hình giải ngân *</label>

                                        <SelectCampaignDisbursement
                                            setFieldValue={setFieldValue}
                                            selectTriggerId="campaignTier"
                                            onChange={(value) => setCheckTierCampaign(value)}
                                            campaignTier={values.campaignTier}
                                        >

                                        </SelectCampaignDisbursement>
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.campaignTier && touched.campaignTier && errors.campaignTier}</p>

                                    </div>
                                    {(checkTierCampaign * 1) === 2 ? (
                                        <div className="mb-6"
                                            name='stages'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <label
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                htmlFor="stages"
                                            >
                                                Kế hoạch chiến dịch
                                            </label>
                                            <div className="rounded-lg border bg-card text-card-foreground shadow-sm"
                                            // onChange={(e) => handleSetListStages(e, setFieldValue)}
                                            >
                                                <div className="flex flex-col space-y-1.5 p-6">
                                                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b mobile:mb-5 dark:border-gray-600">
                                                        <h3 className="font-medium text-muted-foreground">Tiến trình</h3>

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-chart-gantt"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 8h7" /><path d="M8 12h6" /><path d="M11 16h5" /></svg>
                                                    </div>
                                                </div>
                                                {elements.map((el, index) => (

                                                    <div className=" p-6 pt-0 flex-col flex mobile:flex-row mobile:gap-6 gap-7 justify-center  " key={index}>
                                                        <div className="flex flex-col justify-center">
                                                            <div className="w-12 h-12 rounded-full bg-green-200 items-center flex justify-center">
                                                                <span>{index + 1}</span>
                                                            </div>
                                                        </div>

                                                        <div className="mobile:h-20">
                                                            <label
                                                                className="text-sm font-medium leading-none"
                                                                htmlFor={`title-${index}`}
                                                            >
                                                                Mô tả
                                                            </label>
                                                            <input
                                                                className="bg-gray-50 border text-gray-900 font-semibold text-sm rounded-lg block w-full p-2.5"
                                                                id={`title-${index}`}
                                                                placeholder="Tên...."
                                                                value={el.title}
                                                                onChange={(e) => handleInputChange(index, 'title', e.target.value, setFieldValue)}
                                                                onBlur={() => handleBlurErrors(index, 'title')}
                                                            />
                                                            {errorPlan[`${index}-title`] && (
                                                                <p className="mt-2 text-sm text-red-600">
                                                                    {errorPlan[`${index}-title`]}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <div className="mobile: h-20">
                                                            <label
                                                                className="text-sm font-medium leading-none"
                                                                htmlFor={`amount-${index}`}
                                                            >
                                                                Số tiền
                                                            </label>
                                                            <div className="relative">
                                                                <input
                                                                    type="text"
                                                                    name="amount"
                                                                    id={`amount-${index}`}
                                                                    maxLength="11"
                                                                    autoComplete="off"
                                                                    className="bg-gray-50 border text-gray-900 font-semibold text-sm rounded-lg block w-full p-2.5"
                                                                    placeholder="0"
                                                                    value={formatAmount(el.amount)}
                                                                    onChange={(e) => handleInputChange(index, 'amount', e.target.value, setFieldValue)}
                                                                    onBlur={() => handleBlurErrors(index, 'amount')}
                                                                />
                                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                                    <span className="text-gray-600 font-semibold sm:text-sm" id="price-currency">
                                                                        VND
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            {errorPlan[`${index}-amount`] && (
                                                                <p className="mt-2 text-sm text-red-600">
                                                                    {errorPlan[`${index}-amount`]}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <div className="flex flex-col justify-center items-center">
                                                            <button
                                                                type="button"
                                                                className="px-8 py-2 rounded bg-red-500 text-white"
                                                                onClick={() => removeElement(index, setFieldValue)}
                                                            >
                                                                Xóa
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}

                                                <div className="flex items-center p-6 pt-0 justify-between space-x-2">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                                                        onClick={addElement}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="lucide lucide-circle-plus"
                                                        >
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M8 12h8" />
                                                            <path d="M12 8v8" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.stages && touched.stages && errors.stages}</p>

                                        </div>
                                    ) : ""}


                                    <div className="mb-6">
                                        <label for="organizations" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn tổ chức *</label>

                                        <OrganizationsSelect
                                            setFieldValue={setFieldValue}
                                            selectTriggerId="organizations"></OrganizationsSelect>
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.organizations && touched.organizations && errors.organizations}</p>

                                    </div>

                                    <div className="mb-6">
                                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Giấy tờ xác thực cấp phép thiện nguyện của địa phương (ảnh)*</label>
                                        {fileImageDocument ? (<div className=" flex flex-col justify-center items-center">
                                            <img className="mb-6 w-1/2 h-1/2 laptop:w-2/3 laptop:h-2/3 rounded-xl"
                                                id="image"

                                                value={fileImageDocument}
                                                src={fileImageDocument} width={220} height={220} alt="qr-code" />
                                            <button type="button"
                                                onClick={(e) => { removeImageDocument(e, setFieldValue) }}
                                                class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Xóa ảnh</button>

                                        </div>) : (<div>

                                            <label
                                                className="block w-full py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                htmlFor="imageLocalDocument"
                                            >
                                                <span className="ml-2">Chọn ảnh</span>
                                            </label>
                                            <input
                                                className="hidden"
                                                aria-describedby="imageLocalDocument"
                                                id="imageLocalDocument"
                                                name="imageLocalDocument"
                                                onChange={(e) => { handleImageLocalDocument(e, setFieldValue) }}
                                                type="file"
                                                accept="image/png, image/jpeg, image/jpg"
                                            />
                                            <p class="  mt-2  text-sm text-red-600 dark:text-red-500"> {errors.imageLocalDocument && touched.imageLocalDocument && errors.imageLocalDocument}</p>

                                        </div>)}


                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <button type="submit" disabled={isSubmitting} class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-20 py-2.5 text-center my-10 ">

                                        {loading ? (
                                            <>
                                                <Loader2 className="  animate-spin flex items-center justify-center w-full" />

                                            </>
                                        ) : (
                                            "Gửi"
                                        )}
                                    </button>

                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            )}
        </Formik>
    </>);
}
