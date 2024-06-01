import React, { useState } from "react";
import { PreviewImageCoverPopover } from "./PreviewImageCoverPopover/PreviewImageCoverPopover";
import { PreviewImageCenterPopover } from "./PreviewImageCenterPopover/PreviewImageCenterPopover";
import { Formik } from "formik";
export default function CreatNewsPage() {
    // const [value, setValue] = useState();
    // const dobHandler = (e) => {
    //     console.log(e.target.value);
    // }

    const [imageCover, setImageCover] = useState();
    function handleChangeCoverImage(e, setFieldValue) {
        console.log(e.target.files);
        setImageCover(URL.createObjectURL(e.target.files[0]));
        setFieldValue("imageCover", URL.createObjectURL(e.target.files[0]));

    }

    const [imageCenter , setImageCenter] = useState();
    function handleChangeCenterImage(e, setFieldValue) {
        console.log(e.target.files);
        setImageCenter(URL.createObjectURL(e.target.files[0]));
        setFieldValue("imageCenter", URL.createObjectURL(e.target.files[0]));

    }




    return (<>

        <Formik
            initialValues={{
              title: "",
              imageCover: null,
              descriptionFocus:"",
              descriptionMain: "",
              imageCenter: null,
              descriptionEnd: ""



            }}
            validate={(values) => {
                const errors = {};
                if(!values.title){
                    errors.title = 'Không được để trống'
                }

 
                if (!values.imageCover) {
                    errors.imageCover = "Không được để trống!";
                }

                if(!values.descriptionFocus){
                    errors.descriptionFocus = 'Không được để trống'
                }
                
                if(!values.descriptionMain){
                    errors.descriptionMain = 'Không được để trống'
                }
                if(!values.imageCenter){
                    errors.imageCenter = 'Không được để trống'
                }
                if(!values.descriptionEnd){
                    errors.descriptionEnd = 'Không được để trống'
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
                <form onSubmit={handleSubmit} >

                <div className="bg-orange-300 w-full h-14 flex justify-center items-center ">
                    <h1 className="text-sm mobile:text-2xl laptop:text-2xl font-medium">Tạo tin tức</h1>
                </div>
        
                <div className="w-4/5 mx-auto rounded-xl my-10">
                    <div className="grid gap-6 ">
        
                        <div className=" col-span-1  rounded-xl shadow-2xl">
                            <div className="bg-black mb-6 rounded-tl-xl rounded-tr-xl">
                                <h1 className="text-white text-center py-3 font-semibold ">Bắt đầu tin tức mới thôi nào!!</h1>
                            </div>
                            <div className="w-4/5 mx-auto">
                                <div class="mb-6">
                                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiêu đề</label>
                                    <input type="title"
                                     id="title"
                                     name="title"
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.title}
                                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập tên chiến dịch..." required />
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.title && touched.title && errors.title}</p>
                              
                                </div>
                                <div className="mb-6">
                                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="imageCover">Ảnh cover</label>
                                  <div className=" mobile:flex mobile:gap-6 ">
                                    <input class="mb-6 mobile:mb-0 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                     aria-describedby="imageCover_help" 
                                     id="imageCover" 
                                     type="file" 
                                     name="imageCover"
                                     onChange={(e) => { handleChangeCoverImage(e, setFieldValue) }} />
                                {imageCover ? <PreviewImageCoverPopover  imageCover={imageCover} ></PreviewImageCoverPopover> : ''}

                                  </div>
                                <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.imageCover && touched.imageCover && errors.imageCover}</p>
                                   
                                </div>
        
                                <div className="mb-6">
                                    <label for="descriptionFocus" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nội dung tiêu điểm</label>
                                    <textarea id="descriptionFocus"
                                     rows="4"
                                     name="descriptionFocus"
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.descriptionFocus}
                                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mô tả..."></textarea>
                                <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.descriptionFocus && touched.descriptionFocus && errors.descriptionFocus}</p>
        
                                </div>
                                <div className="mb-6">
                                    <label for="descriptionMain" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nội dung chính</label>
                                    <textarea id="descriptionMain" 
                                    rows="4" 
                                    name="descriptionMain"
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.descriptionMain}
                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mô tả..."></textarea>
                                <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.descriptionMain && touched.descriptionMain && errors.descriptionMain}</p>
        
                                </div>
                                <div className="mb-6 ">
                                    
                                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="imageCenter">Ảnh giữa</label>
                                  <div className=" mobile:flex mobile:gap-6 ">
                                    <input class="mb-6 mobile:mb-0 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                    aria-describedby="imageCenter_help"
                                    id="imageCenter" 
                                    type="file" 
                                    name="imageCenter"
                                    onChange={(e) => { handleChangeCenterImage(e, setFieldValue) }} />
                                    {imageCenter ? <PreviewImageCenterPopover  imageCenter={imageCenter} ></PreviewImageCenterPopover> : ''}
        
                                  </div>
                                    <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.imageCenter && touched.imageCenter && errors.imageCenter}</p>
                                </div>
                                <div className="mb-6">
                                    <label for="descriptionEnd" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nội dung kết</label>
                                    <textarea id="descriptionEnd"
                                     rows="4" 
                                     name="descriptionEnd"
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.descriptionEnd}
                                     class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mô tả..."></textarea>
                                    <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.descriptionEnd && touched.descriptionEnd && errors.descriptionEnd}</p>
        
                                </div>
        
                            </div>
                            <div className="flex justify-center">
                                <button  type="submit"
                                 disabled={isSubmitting}
                                 class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-20 py-2.5 text-center my-10 ">Gửi</button>
        
                            </div>
                        </div>
                    </div>
        
                </div>
            </form>
            )}
        </Formik>
    </>);
}
