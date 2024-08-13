import React, { useContext, useState } from "react";
import { Formik } from "formik";
import FoundingDatePicker from "../FoundingDatePicker/FoundingDatePicker";
import { ToastAction } from "../../../components/ui/toast";
import { axiosPrivate } from "../../../api/axiosInstance";
import { CREATEORGANIZATION, GETREQUESTORGANIZATIONTOUPDATE, UPDATEORGANIZATION } from "../../../api/apiConstants";
import { useToast } from "../../../components/ui/use-toast";
import { AuthContext } from "../../../context/AuthContext";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";


export default function UpdateOrganizationForm() {
  const { id } = useParams();

  const { toast } = useToast();
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)

  const navigate = useNavigate()
  const [fileImage, setFileImage] = useState();

  const [fileImagelogo, setFileImageLogo] = useState()

  const [fileAuthorImage, setFileAuthorImage] = useState();

  const [authorizationDocumentsImage, setAuthorizationDocumentsImage] = useState()

  const [initialValues, setInitialValues] = useState(
    {
      OrganizationName: "",
      OrganizationManagerEmail: "",
      FoundingDate: null,
      OrganizationTaxCode: "",
      SocialMediaLink: "",
      AreaOfActivity: "",
      Address: "",
      PlanInformation: "",
      AchievementLink: "",
      Logo: null,
      AuthorizationDocuments: null,


    }
  )
  // Xử lí ảnh logo
  function handleLogoChange(e, setFieldValue) {
    console.log("File ảnh đại diện vừa chọn: ", e.target.files);
    setFileImage(e.target.files[0]);
    setFileImageLogo(URL.createObjectURL(e.target.files[0]))
    setFieldValue('Logo', e.target.files[0]);
  }

  function removeLogo(e, setFieldValue) {
    setFileImageLogo('');
    setFieldValue("Logo", null);

  }
  // Xử lí ảnh ủy quyền tổ chức cho thành viên

  function handleAuthorizationDocumentsImage(e, setFieldValue) {
    console.log("File ảnh đại diện vừa chọn: ", e.target.files);
    setFileAuthorImage(e.target.files[0]);
    setAuthorizationDocumentsImage(URL.createObjectURL(e.target.files[0]))
    setFieldValue('AuthorizationDocuments', e.target.files[0]);
  }

  function removeAuthorizationDocumentsImage(e, setFieldValue) {
    setAuthorizationDocumentsImage('');
    setFieldValue("AuthorizationDocuments", null);

  }
  const getRequestOrganization = async (id) => {
    setLoadingData(true)
    try {
      const response = await axiosPrivate.get(`${GETREQUESTORGANIZATIONTOUPDATE}${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        console.log("đây là:", response.data);
        setInitialValues({
          OrganizationName: response?.data?.data?.organizationName,
          OrganizationManagerEmail: response?.data?.data?.organizationManagerEmail,
          FoundingDate: response?.data?.data?.foundingDate,
          OrganizationTaxCode: response?.data?.data?.organizationTaxCode,
          SocialMediaLink: response?.data?.data?.socialMediaLink,
          AreaOfActivity: response?.data?.data?.areaOfActivity,
          Address: response?.data?.data?.address,
          PlanInformation: response?.data?.data?.planInformation,
          AchievementLink: response?.data?.data?.achievementLink,
          Logo: null,
          AuthorizationDocuments: null,


        })
        toast({
          title: "Lấy tổ chức thành công",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Lấy tổ chức thất bại !",
          description: "Vui lòng kiểm tra lại thông tin Lấy tổ chức !",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lấy tổ chức thất bại !",
        description: "Vui lòng kiểm tra lại thông tin Lấy tổ chức !",
        action: <ToastAction altText="undo">Ẩn</ToastAction>,
      });
    } finally {
      setLoadingData(false)
    }

  }
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Tạo hiệu ứng cuộn nhẹ
    });
    getRequestOrganization(id);
  }, []);


  const updateOrganization = async (data, resetForm, setFieldValue, setSubmitting) => {
    try {

      const formData = new FormData();
      formData.append('OrganizationName', data.OrganizationName);
      formData.append('OrganizationManagerEmail', data.OrganizationManagerEmail);
      formData.append('OrganizationTaxCode', data.OrganizationTaxCode);
      formData.append('FoundingDate', data.FoundingDate);
      formData.append('SocialMediaLink', data.SocialMediaLink);
      formData.append('AreaOfActivity', data.AreaOfActivity);
      formData.append('Address', data.Address);
      formData.append('PlanInformation', data.PlanInformation);
      formData.append('AchievementLink', data.AchievementLink);
      formData.append('AuthorizationDocuments', fileAuthorImage);
      formData.append('Logo', fileImage)

      setLoading(true)

      const response = await axiosPrivate.put(UPDATEORGANIZATION +
        `?createOrganizationRequestRequestId=${id}`, formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }

      );
      if (response.status === 200) {
        resetForm()
        setFileImage(null)
        setFieldValue('Logo', null);
        setFieldValue('FoundingDate', null);
        setFieldValue('AuthorizationDocuments', null);
        navigate("/manage/organize/allOrganizations")


        toast({
          title: "Tạo tổ chức thành công",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      } else {

        toast({
          variant: "destructive",
          title: "Tạo tổ chức thất bại !",
          description: "Vui lòng kiểm tra lại thông tin Tạo tổ chức !",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    } catch (error) {

      toast({
        variant: "destructive",
        title: "Tạo tổ chức thất bại !",
        description: "Vui lòng kiểm tra lại thông tin Tạo tổ chức !",
        action: <ToastAction altText="undo">Ẩn</ToastAction>,
      });
    } finally {
      setLoading(false)
      setSubmitting(false)
    }
  }

  return (
    <>
      {loadingData ? (
        <div>
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass="w-max h-screen  mx-auto items-center"
          />
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validate={(values) => {
            const errors = {};
            var today = new Date();
            const cleanedTaxCode = values.OrganizationTaxCode.replace(/\s+/g, '');
            // OrganizationName  validation
            if (!values.OrganizationName) {
              errors.OrganizationName = "Không được để trống!";
            }
            // FoundingDate  validation
            if (!values.FoundingDate) {
              errors.FoundingDate = "Không được để trống!";
            } else {
              if (new Date(values.FoundingDate) > today) {
                errors.FoundingDate = "Ngày thành lập không được diễn ra ở tương lai!";

              }
            }

            if (!values.AuthorizationDocuments) {
              errors.AuthorizationDocuments = "Không được để trống!";
            }

            // Email validation
            if (!values.OrganizationManagerEmail) {
              errors.OrganizationManagerEmail = "Không được để trống!";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                values.OrganizationManagerEmail
              )
            ) {
              errors.OrganizationManagerEmail = "Email không hợp lệ!";
            }
            // OrganizationTaxCode validation
            if (!values.OrganizationTaxCode) {
              errors.OrganizationTaxCode = "Không được để trống!";
            } else if (!/^\d{10}-\d{3}$/.test(cleanedTaxCode) && !/^\d{10}$/.test(cleanedTaxCode)) {
              errors.OrganizationTaxCode = "Số thuế không hợp lệ";
            }

            // Address validation
            if (!values.Address) {
              errors.Address = "Không được để trống!";
            }
            // Logo validation
            if (!values.Logo) {
              errors.Logo = "Không được để trống!";
            }
            console.log(errors.Logo);
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm, setFieldValue }) => {
            console.log("bug tới chơi");
            updateOrganization(values, resetForm, setFieldValue, setSubmitting)

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

            <form
              onSubmit={handleSubmit}
              class=" w-3/4 laptop:max-w-4xl mx-auto my-8"
            >

              <div class="mb-5 ">
                <label
                  for="OrganizationName "
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tên tổ chức *
                </label>
                <input
                  type="text"
                  id="OrganizationName"
                  name="OrganizationName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.OrganizationName}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập tên..."
                />
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {" "}
                  {errors.OrganizationName && touched.OrganizationName && errors.OrganizationName}
                </p>
              </div>
              <div class="mb-5 ">
                <label
                  for="OrganizationManagerEmail"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email *
                </label>
                <input
                  type="text"
                  id="OrganizationManagerEmail"
                  name="OrganizationManagerEmail"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.OrganizationManagerEmail}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập email..."
                />
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {" "}
                  {errors.OrganizationManagerEmail && touched.OrganizationManagerEmail && errors.OrganizationManagerEmail}
                </p>
              </div>
              <div class="mb-5">
                <label
                  for="OrganizationTaxCode"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mã số thuế doanh nghiệp *
                </label>
                <input
                  type="tel"
                  id="OrganizationTaxCode"
                  name="OrganizationTaxCode"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.OrganizationTaxCode}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập số mã số thuế..."
                />
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {" "}
                  {errors.OrganizationTaxCode &&
                    touched.OrganizationTaxCode &&
                    errors.OrganizationTaxCode}
                </p>
              </div>

              <div class="mb-5">
                <label
                  for="FoundingDate"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ngày thành lập *
                </label>
                <div class="relative w-full ">
                  <FoundingDatePicker
                    setFieldValue={setFieldValue}
                    popOverTriggerId="FoundingDate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    foundingDateSelected={values.FoundingDate}

                  ></FoundingDatePicker>
                </div>
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {" "}
                  {errors.FoundingDate && touched.FoundingDate && errors.FoundingDate}
                </p>
              </div>
              <div class="mb-5">
                <label
                  for="SocialMediaLink"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  SocialMediaLink, liên kết mạng xã hội hoặc trang tin điện tử của tổ chức
                </label>
                <input
                  type="text"
                  id="SocialMediaLink"
                  name="SocialMediaLink"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.SocialMediaLink}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="SocialMediaLink..."
                />
              </div>
              <div class="mb-5">
                <label
                  for="AreaOfActivity"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Lĩnh vực hoạt động chính
                </label>
                <input
                  type="AreaOfActivity"
                  id="AreaOfActivity"
                  name="AreaOfActivity"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.AreaOfActivity}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="vd: Kinh doanh"
                />
              </div>
              <div class="mb-5">
                <label
                  for="Address"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Địa chỉ trụ sở chính *
                </label>
                <input
                  type="text"
                  id="Address"
                  name="Address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.Address}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {" "}
                  {errors.Address && touched.Address && errors.Address}
                </p>
              </div>

              <div class="mb-5">
                <label
                  for="PlanInformation"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-justify"
                >
                  Thông tin giới thiệu hoạt động, kinh nghiệm, kế hoạch thiện
                  nguyện của tổ chức ( mục đích làm thiện nguyên của tổ chức )
                </label>
                <textarea
                  type="text"
                  id="PlanInformation"
                  name="PlanInformation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.PlanInformation}
                  autocomplete="off"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div class="mb-5">
                <label
                  for="AchievementLink"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white  text-justify"
                >
                  Thành tích, khen thưởng, được ghi nhận trong hoạt động tình
                  nguyện, cộng đồng, xã hội (Đoạn văn ngắn bao gồm đường dẫn/link
                  hoặc đính kèm hình ảnh minh hoạ)
                </label>

                <input
                  type="text"
                  id="AchievementLink"
                  name="AchievementLink"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.AchievementLink}
                  autocomplete="off"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div class="mb-5">
                <div className="">
                  <div>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="AuthorizationDocuments"
                    >
                      Giấy ủy quyền của tổ chức *
                    </label>
                    {authorizationDocumentsImage ? (<div className=" flex flex-col justify-center items-center">
                      <img className="mb-6 w-1/3 h-fit rounded-xl shadow-md"
                        id="image"

                        value={authorizationDocumentsImage}
                        src={authorizationDocumentsImage} alt="author_image" />
                      <button type="button"
                        onClick={(e) => { removeAuthorizationDocumentsImage(e, setFieldValue) }}
                        class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Xóa ảnh</button>

                    </div>) : (<div>

                      <label
                        className="block w-full py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        htmlFor="AuthorizationDocuments"
                      >
                        <span className="ml-2">Chọn ảnh</span>
                      </label>
                      <input
                        className="hidden"
                        aria-describedby="AuthorizationDocuments"
                        id="AuthorizationDocuments"
                        name="AuthorizationDocuments"
                        onChange={(e) => { handleAuthorizationDocumentsImage(e, setFieldValue) }}
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                      />
                    </div>)}
                  </div>
                  <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                    {" "}
                    {errors.AuthorizationDocuments &&
                      touched.AuthorizationDocuments &&
                      errors.AuthorizationDocuments}
                  </p>
                </div>
              </div>
              <div class="mb-5">
                <div className="">
                  <div>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="Logo"
                    >
                      Vui lòng chọn ảnh Logo tổ chức(công ty) *
                    </label>
                    {fileImagelogo ? (<div className=" flex flex-col justify-center items-center">
                      <img className="mb-6 w-52 h-52  laptop:w-40 laptop:h-40 rounded-xl shadow-md"
                        id="image"

                        value={fileImagelogo}
                        src={fileImagelogo} alt="qr-code" />
                      <button type="button"
                        onClick={(e) => { removeLogo(e, setFieldValue) }}
                        class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Xóa ảnh</button>

                    </div>) : (<div>

                      <label
                        className="block w-full py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        htmlFor="Logo"
                      >
                        <span className="ml-2">Chọn ảnh</span>
                      </label>
                      <input
                        className="hidden"
                        aria-describedby="Logo"
                        id="Logo"
                        name="Logo"
                        onChange={(e) => { handleLogoChange(e, setFieldValue) }}
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                      />
                    </div>)}
                  </div>
                  <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                    {" "}
                    {errors.Logo &&
                      touched.Logo &&
                      errors.Logo}
                  </p>
                </div>
              </div>



              <div class="mb-5 bg-vmo p-5 rounded-xl">
                <span className="text-white text-sm mobile:text-xl font-semibold text-justify">
                  Cam kết mục đích sử dụng Tài khoản thanh toán minh bạch{" "}
                </span>
              </div>

              <div>
                <span class="block mb-2 text-sx mobile:text-lg font-bold text-gray-900 dark:text-white text-justify ">
                  ⚫ Thành viên/tổ chức cam kết sử dụng VMO cho mục đích *
                </span>
                <ul className="flex flex-col gap-4 mb-2  text-sm mobile:text-base text-justify">
                  <li>- Vận động, tiếp nhận các nguồn đóng góp tự nguyện</li>
                  <li>
                    - Vận động gây quỹ nhằm phát triển, thực hiện các dự án cộng
                    đồng
                  </li>
                  <li>
                    - Để công khai minh bạch đối với nhà tài trợ, người ủng hộ,
                    người đóng góp
                  </li>
                  <li>- Các mục đích phi lợi nhuận khác</li>
                </ul>

                <span class="block mb-2  text-sx mobile:text-lg font-bold text-gray-900 dark:text-white text-justify">
                  ⚫ Thành viên/tổ chức phải đảm bảo sao kê đầy đủ thông tin hình ảnh
                  tất cả sau khi chiến dịch kết thúc
                </span>

                <span class="block mb-2  text-sx mobile:text-lg font-bold text-gray-900 dark:text-white text-justify">
                  ⚫ Thành viên/tổ chức vui lòng đọc các quy định về pháp luật dưới đây
                  để nắm rõ *
                </span>
                <ul className="flex flex-col gap-4 mb-2 text-sm mobile:text-base text-justify">
                  <li>
                    - Nghị định 93/2021/NĐ-CP về vận động, tiếp nhận, phân phối và
                    sử dụng các nguồn đóng góp tự nguyện hỗ trợ khắc phục khó khăn
                    do thiên tai, dịch bệnh, sự cố; hỗ trợ bệnh nhân mắc bệnh hiểm
                    nghèo
                  </li>
                  <li>
                    - Nghị định 93/2019/NĐ-CP về tổ chức, hoạt động của quỹ xã
                    hội, quỹ từ thiện
                  </li>
                  <li>
                    - Thông tư 41/2022/TT-BTC hướng dẫn Chế độ kế toán áp dụng cho
                    các hoạt động xã hội, từ thiện các quy định pháp luật liên
                    quan
                  </li>
                </ul>
                <span class="block mb-2  text-sx mobile:text-lg font-bold text-gray-900 dark:text-white text-justify">
                  Mọi hành vi thiện nguyện trái với mục tiêu đạo đức hoặc vi phạm
                  pháp luật phải chịu trách nhiệm thành viên/tổ chức có:
                </span>
                <div class="flex items-start mb-5">
                  <div class="flex items-center h-5">
                    <input
                      id="isAcceptTermOfUse"
                      type="checkbox"
                      name="isAcceptTermOfUse"
                      checked={values.isAcceptTermOfUse}
                      onChange={() => setFieldValue("isAcceptTermOfUse", !values.isAcceptTermOfUse)}
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    />
                  </div>
                  <label
                    for="isAcceptTermOfUse"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Đồng ý{" "}
                  </label>
                </div>
                <span class="block mb-2 text-sm font-medium text-red-600 dark:text-white text-justify">
                  **Lưu ý: Mọi thông tin thành viên/tổ chức điền sẽ là bằng chứng cho mọi hành vi
                  phạm pháp của thành viên/tổ chức trước pháp luật.
                </span>
              </div>


              <div className="flex justify-end">
                {values.isAcceptTermOfUse ? (

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-20 py-2.5 text-center my-10"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="  animate-spin flex items-center justify-center w-full" />
                      </>
                    ) : (
                      "Gửi"
                    )}
                  </button>



                ) : (
                  <button
                    type="button"
                    disabled
                    className=" text-white bg-gray-400  focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-20 py-2.5 text-center my-10"
                  >
                    Gửi
                  </button>
                )}
              </div>
            </form>
          )}
        </Formik>
      )}
    </>
  );
}
