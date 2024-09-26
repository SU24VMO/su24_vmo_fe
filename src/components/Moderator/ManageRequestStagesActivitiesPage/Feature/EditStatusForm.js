import { Button } from "../../../ui/button";
import { ScrollArea } from "../../../ui/scroll-area";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";
import { useFormik } from "formik";
import { useToast } from "../../../ui/use-toast";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { CopyButton } from "./CopyButton";
import { Switch } from "../../../ui/switch";
import { Badge } from "../../../ui/badge";
import { ImageDown } from "lucide-react";
import React, { useContext, useState } from "react";
import { format } from "date-fns";
import { AuthContext } from "../../../../context/AuthContext";
import { Loader2 } from "lucide-react";
import { ToastAction } from "../../../../components/ui/toast";

import { axiosPrivate } from "../../../../api/axiosInstance";
import { UPDATEAPPROVESTAGEACTIVITYREQUEST } from "../../../../api/apiConstants";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,

} from "../../../ui/carousel"


const EditStatusForm = ({ isOpen, onOpenChange, activities, onSubmitSuccess }) => {
  const { toast } = useToast();
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)


  const [isExpanded, setIsExpanded] = useState(false);
  const content = activities?.activity?.content ? (activities?.activity?.content?.replace(/(?:\r\n|\r|\n)/g, "<br>")) : "Không có"




  const updateStatus = async (data, setSubmitting) => {
    try {
      setLoading(true)

      const response = await axiosPrivate.put(UPDATEAPPROVESTAGEACTIVITYREQUEST, {

        createActivityRequestId: activities.createActivityRequestID,
        moderatorId: user.moderator_id,
        isApproved: data.isApproved,
      });



      if (response.status === 200) {
        onSubmitSuccess()
        toast({
          title: "Cập nhật thành công",
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
      setSubmitting(false)
    }
  }


  // Formik setup
  const formik = useFormik({
    initialValues: {
      isApproved: activities ? activities.isApproved : false,
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      updateStatus(values,setSubmitting)
    },
  });
  /* Giải thích: 
  Vấn đề ở đây là formik là một đối tượng được tạo ra bởi hook useFormik, và nó thay đổi mỗi khi component re-render. Khi mình thêm formik vào mảng dependencies của useEffect, nó sẽ chạy mỗi khi formik thay đổi, tức là mỗi khi component re-render. Một cách để giải quyết vấn đề này là sử dụng useRef để lưu trữ giá trị formik.setValues và sau đó sử dụng giá trị đó trong useEffect.
   */
  const setValuesRef = React.useRef(formik.setValues);
  // Update formik initialValues when activities changes
  React.useEffect(() => {
    setValuesRef.current({
      isApproved: activities ? activities.isApproved : false,
    });
  }, [activities]);
  // Handle switch change
  const handleSwitchChange = (isApproved) => {
    formik.setFieldValue("isApproved", isApproved);
  };


  //handle caroulsel

  const [api, setApi] = React.useState()
  const [apiActivity, setApiActivity] = React.useState()

  const [current, setCurrent] = React.useState(0);
  const [currentActivity, setCurrentActivity] = React.useState(0);

  const [count, setCount] = React.useState(0);
  const [countActivity, setCountActivity] = React.useState(0);

  React.useEffect(() => {
    if (!apiActivity) {
      return
    }

    setCountActivity(apiActivity.scrollSnapList().length)

    setCurrentActivity(apiActivity.selectedScrollSnap() + 1)


    apiActivity.on("select", () => {
      setCurrentActivity(apiActivity.selectedScrollSnap() + 1)

    })
  }, [apiActivity])

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)

    setCurrent(api.selectedScrollSnap() + 1)


    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)

    })
  }, [api])





  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-screen-laptop mobile:h-[90vh] h-full">
        {activities && (
          <form onSubmit={formik.handleSubmit} className="space-y-3">
            <DialogHeader>
              <DialogTitle>Chi tiết hoạt động</DialogTitle>

              <DialogDescription>
                Lưu ý: Bạn chỉ có thể chỉnh sửa trạng thái xác thực của hoạt động!
              </DialogDescription>
            </DialogHeader>

            <ScrollArea className="h-[65vh] shadow-inner ">
              <div className="flex flex-col p-5 gap-5">
                {/* Show tên hoạt động */}
                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="title">Tiêu đề</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="title"
                        defaultValue={activities ? activities.activity?.title : "Không có"}
                        disabled
                      />
                      <CopyButton code={activities ? activities.activity?.title : "Không có"} />
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="member">Tạo bởi tình nguyện viên</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="member"
                        defaultValue={activities?.member ? (activities.member?.firstName + " " + activities.member?.lastName) : "Không có"}
                        disabled
                      />
                      <CopyButton code={activities?.member ? (activities.member?.firstName + " " + activities.member?.lastName) : "Không có"} />
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="create_by_om">Tạo bởi quản lý tổ chức</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="create_by_om"
                        defaultValue={activities?.organizationManager ? (activities.organizationManager?.firstName + " " + activities.organizationManager?.lastName) : "Không có"}
                        disabled
                      />
                      <CopyButton code={activities?.organizationManager ? (activities.organizationManager?.firstName + " " + activities.organizationManager?.lastName) : "Không có"} />
                    </div>
                  </div>
                </div>
                {/* Show nội dung bài đăng*/}
                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="content">Nội dung </Label>
                    <div className="flex items-center space-x-2 text-sm">

                      <div variant={"outline"}>
                        <div dangerouslySetInnerHTML={{ __html: isExpanded ? content : content?.substring(0, 500) + '...' }} />
                        <Button variant="link" onClick={toggleDescription}>
                          {isExpanded ? "Thu gọn" : "Xem thêm"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Show ảnh bài đăng*/}
                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link">Ảnh hoạt động</Label>
                    <div className="">
                      <Carousel setApi={setApiActivity} className="w-full">
                        <CarouselContent>
                          {activities?.activity?.activityImages.map((image, index) => (
                            <CarouselItem key={index}>
                              <div className=" w-full mobile:w-1/3   mx-auto">
                                <img
                                  src={image.link}
                                  alt=""
                                  className="h-full w-full object-cover shadow block"
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                      <div className="py-2 text-center text-sm text-muted-foreground">
                        Ảnh {currentActivity} trên {countActivity}
                      </div>
                    </div>


                  </div>
                </div>



                {/* Show sao kê bài đăng*/}
                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link">Ảnh sao kê</Label>
                    <div className="">
                      <Carousel setApi={setApi} className="w-full">
                        <CarouselContent>
                          {activities?.activity?.activityStatementFiles.map((image, index) => (
                            <CarouselItem key={index}>
                              <div className=" w-full mobile:w-1/3   mx-auto">
                                <img
                                  src={image.link}
                                  alt=""
                                  className="h-full w-full object-cover shadow block"
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                      <div className="py-2 text-center text-sm text-muted-foreground">
                        Ảnh {current} trên {count}
                      </div>
                    </div>


                  </div>
                </div>



                {/* Show ngày tạo */}
                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="createDate">Ngày tạo</Label>
                    <div className="flex items-center space-x-2">
                      <Badge variant={"outline"}>
                        {activities ? format(new Date(activities?.createDate), 'dd/MM/yyyy, h:mm:ss a') : "Chưa có"}
                      </Badge>
                      <CopyButton
                        code={activities ? format(new Date(activities?.createDate), 'dd/MM/yyyy, h:mm:ss a') : "Chưa có"}
                      />
                    </div>
                  </div>
                </div>

                {/* Show Ngày duyệt */}
                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="approvedDate">Ngày duyệt</Label>
                    <div className="flex items-center space-x-2">
                      <Badge variant={"outline"}>
                        {activities?.approvedDate ? format(new Date(activities?.approvedDate), 'dd/MM/yyyy, h:mm:ss a') : "Chưa có"}
                      </Badge>
                      <CopyButton
                        code={activities?.approvedDate ? format(new Date(activities?.approvedDate), 'dd/MM/yyyy, h:mm:ss a') : "Chưa có"}
                      />
                    </div>
                  </div>
                </div>

                {/* Show ngày Ngày cập nhật */}
                <div className="flex">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="updateDate">Ngày cập nhật</Label>
                    <div className="flex items-center space-x-2">
                      <Badge variant={"outline"}>
                        {activities?.updateDate ? format(new Date(activities?.updateDate), 'dd/MM/yyyy, h:mm:ss a') : "Chưa có"}
                      </Badge>
                      <CopyButton
                        code={activities?.updateDate ? format(new Date(activities?.updateDate), 'dd/MM/yyyy, h:mm:ss a') : "Chưa có"}
                      />
                    </div>
                  </div>
                </div>


                <div className="flex flex-col gap-3">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isApproved"
                      checked={formik.values.isApproved}
                      onCheckedChange={() => handleSwitchChange(true)}
                    />
                    <Label htmlFor="isApproved">Chấp thuận</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isApproved"
                      checked={!formik.values.isApproved}
                      onCheckedChange={() => handleSwitchChange(false)}
                    />
                    <Label htmlFor="isApproved">Từ chối</Label>
                  </div>
                </div>

              </div>
            </ScrollArea>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Đóng
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={formik.isSubmitting}
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
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditStatusForm;
