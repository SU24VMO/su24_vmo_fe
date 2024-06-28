import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Helmet } from "react-helmet";

export default function CreateActivityPage() {

    const [listImageFile, setListImageFile] = useState([]);
    function fileSelectedHandler(e, setFieldValue) {
        const files = Array.from(e.target.files);
        const filePreviews = files.map(file => URL.createObjectURL(file));
        setListImageFile((prevFiles) => {
            const newFiles = [...prevFiles, ...filePreviews];
            setFieldValue('listImageFile', newFiles);  // Set Formik field after updating state
            return newFiles;
        });
    }

    function removeImage (index, setFieldValue){
        setListImageFile((prevFiles) => {
            const newFiles = prevFiles.filter((_, i) => i !== index);
            setFieldValue('listImageFile', newFiles);  // Set Formik field after updating state
            return newFiles;
        });
    };

    function handleSelectCampaign(e, setFieldValue){
        console.log(e.target.value);
        setFieldValue('listCampaigns', e.target.value)
    }
    useEffect(() => {
        return () => {
            listImageFile.forEach(file => URL.revokeObjectURL(file));
        };
    }, []);


    console.log('====================================');
    console.log(listImageFile);
    console.log('====================================');

    return (<>
    <Helmet>
      <title>Tạo hoạt động • VMO</title>
      <meta
        name="description"
        content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
      />
    </Helmet>
        <Formik
            initialValues={{
                title: "",
                listCampaigns: "",
                listImageFile: [],
                description: "",

            



            }}
            validate={(values) => {
                const errors = {};
                if (!values.title) {
                    errors.title = 'Không được để trống'
                }
                if (!values.listCampaigns) {
                    errors.listCampaigns = 'Không được để trống'
                }
                

                if (!values.listImageFile.length) {
                    errors.listImageFile = 'Không được để trống'
                }
                
                
                if (!values.description) {
                    errors.description = 'Không được để trống'
                }
                

                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    console.log(values);
                    setSubmitting(false);
                }, 400);
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
                    <div id="defaultModal" tabindex="-1" aria-hidden="true" class="justify-center items-center w-full h-modal">
                        <div class="p-4 mx-auto w-3/4 h-full tablet:h-auto">
                            <div class="p-4 bg-white rounded-lg shadow dark:bg-gray-800 mobile:p-5">
                                <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b mobile:mb-5 dark:border-gray-600">
                                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                        Đăng tải hoạt động của bạn!
                                    </h3>
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10.827 5.465-.435-2.324m.435 2.324a5.338 5.338 0 0 1 6.033 4.333l.331 1.769c.44 2.345 2.383 2.588 2.6 3.761.11.586.22 1.171-.31 1.271l-12.7 2.377c-.529.099-.639-.488-.749-1.074C5.813 16.73 7.538 15.8 7.1 13.455c-.219-1.169.218 1.162-.33-1.769a5.338 5.338 0 0 1 4.058-6.221Zm-7.046 4.41c.143-1.877.822-3.461 2.086-4.856m2.646 13.633a3.472 3.472 0 0 0 6.728-.777l.09-.5-6.818 1.277Z" />
                                    </svg>

                                </div>
                                <div >
                                    <div class="grid gap-4 mb-4 grid-rows-1">
                                        <div>
                                            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Tiêu đề
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                id="title"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.title}
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Tiêu đề cho hoạt động của bạn..."
                                            />
                                            <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.title && touched.title && errors.title}</p>

                                        </div>
                                        <div>
                                            <label for="listCampaigns" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Chọn bài đăng cho campaign
                                            </label>
                                            <select
                                                id="listCampaigns"
                                                name="listCampaigns"
                                                onBlur={handleBlur}
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                onChange={(e) => {handleSelectCampaign(e, setFieldValue)}}
                                         >
                                                <option  >Chiến dịch</option>
                                                <option value="0">Đánh cắp cây xoài nhà bà hai</option>
                                                <option value="1">Ăn chặn đêm cô hồn</option>
                                            </select>
                                            <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.listCampaigns && touched.listCampaigns && errors.listCampaigns}</p>

                                        </div>
                                        <div>
                                            <label for="listImagesPreview" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Danh sách hình ảnh:
                                            </label>
                                            <div>
                                                <ul className="flex justify-stretch flex-wrap gap-3">
                                                    {listImageFile.map((imageFile, index) => (
                                                        <li key={index} className="relative ">
                                                            <img
                                                                className="w-48 h-48"
                                                                src={imageFile}
                                                                alt=""
                                                                width={200}
                                                                height={200}
                                                            />
                                                            <button className="absolute top-2 right-2" 
                                                            type="button"
                                                            onClick={() => removeImage(index, setFieldValue)}>
                                                                <svg
                                                                    class="w-6 h-6 text-gray-800 dark:text-white"
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="24"
                                                                    height="24"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                                                                        clip-rule="evenodd"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </li>

                                                    ))}
                                                    <li>
                                                        <div class="flex items-center justify-center w-full">
                                                            <label
                                                                for="listImageFile"
                                                                class="flex flex-col items-center justify-center w-48 h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                                            >
                                                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path fill-rule="evenodd" d="M12 3a1 1 0 0 1 .78.375l4 5a1 1 0 1 1-1.56 1.25L13 6.85V14a1 1 0 1 1-2 0V6.85L8.78 9.626a1 1 0 1 1-1.56-1.25l4-5A1 1 0 0 1 12 3ZM9 14v-1H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4v1a3 3 0 1 1-6 0Zm8 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clip-rule="evenodd" />
                                                                    </svg>

                                                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">
                                                                        Upload image
                                                                    </p>
                                                                    <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG (MAX. 800x400px)</p>
                                                                </div>
                                                                <input 
                                                                multiple
                                                                id="listImageFile"
                                                                 type="file" 
                                                                 accept=".jpg"
                                                                  alt="image" 
                                                                  class="hidden" 
                                                                  name="listImageFile"
                                                                  onChange={(e) => { fileSelectedHandler(e, setFieldValue) }}/>

                                                            </label>
                                                        </div>
                                                    </li>

                                                </ul>
                                            <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.listImageFile && touched.listImageFile && errors.listImageFile}</p>

                                            </div>
                                        </div>


                                        <div class="">
                                            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Nội dung
                                            </label>
                                            <textarea
                                                id="description"
                                                rows="4"
                                                name="description"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.description}
                                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Mô tả hoạt động của bạn..."
                                            ></textarea>
                                            <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.description && touched.description && errors.description}</p>

                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        class="bg-vmo text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        Tạo bài đăng
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
