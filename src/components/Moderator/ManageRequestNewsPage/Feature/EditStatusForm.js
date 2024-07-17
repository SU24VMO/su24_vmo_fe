import { Button } from "../../../ui/button";
import { ScrollArea } from "../../../ui/scroll-area";
import { format } from "date-fns";


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
import { ToastAction } from "../../../../components/ui/toast";
import { axiosPrivate } from "../../../../api/axiosInstance";
import { UPDATEAPPROVENEWSREQUEST } from "../../../../api/apiConstants";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { Loader2 } from "lucide-react";

const EditStatusForm = ({ isOpen, onOpenChange, posts, onSubmitSuccess }) => {
  const { toast } = useToast();
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [isExpandedContent, setIsExpandedContent] = useState(false);
  const [isExpandedDescription, setIsExpandedDescription] = useState(false);

  const content = posts?.post?.content ? (posts?.post?.content?.replace(/(?:\r\n|\r|\n)/g, "<br>")) : "Không có";
  const description = posts?.post?.description ? (posts?.post?.description?.replace(/(?:\r\n|\r|\n)/g, "<br>")) : "Không có";


  const updateStatus = async (data) => {
    try {
      setLoading(true)

      const response = await axiosPrivate.put(UPDATEAPPROVENEWSREQUEST, {
        createPostRequestId: posts.createPostRequestID,
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

    }
  }
  console.log(posts);
  // Formik setup
  const formik = useFormik({
    initialValues: {
      isApproved: posts ? posts.isApproved : false,
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      updateStatus(values)
      setSubmitting(false);
    },
  });
  /* Giải thích: 
  Vấn đề ở đây là formik là một đối tượng được tạo ra bởi hook useFormik, và nó thay đổi mỗi khi component re-render. Khi mình thêm formik vào mảng dependencies của useEffect, nó sẽ chạy mỗi khi formik thay đổi, tức là mỗi khi component re-render. Một cách để giải quyết vấn đề này là sử dụng useRef để lưu trữ giá trị formik.setValues và sau đó sử dụng giá trị đó trong useEffect.
   */
  const setValuesRef = React.useRef(formik.setValues);
  // Update formik initialValues when posts changes
  React.useEffect(() => {
    setValuesRef.current({
      isApproved: posts ? posts.isApproved : false,
    });
  }, [posts]);
  // Handle switch change
  const handleSwitchChange = (isApproved) => {
    formik.setFieldValue("isApproved", isApproved);
  };

  const toggleContent = () => {
    setIsExpandedContent(!isExpandedContent);
  };
  const toggleDescription = () => {
    setIsExpandedDescription(!isExpandedDescription);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-screen-laptop mobile:h-[90vh] h-full">
        <DialogHeader>
          <DialogTitle>Chi tiết bài viết</DialogTitle>
          <DialogDescription>
            Lưu ý: Bạn chỉ có thể chỉnh sửa trạng thái xác thực của bài viết!
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[65vh]  shadow-inner ">
          <div className="flex flex-col p-5 gap-5">

            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="title">Tiêu đề</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="title"
                    defaultValue={posts?.post ? posts.post?.title : ""}
                    disabled
                  />
                  <CopyButton code={posts?.post ? posts.post?.title : ""} />
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="cover">Ảnh nền</Label>
                <div className="w-1/3 mx-auto">
                  <img
                    src={posts?.post ? posts.post?.cover : ""}
                    alt="cover"

                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale block"
                  />
                </div>
                {posts?.post && posts.post?.cover && (
                  <a href={posts.post?.cover} download>
                    <Button
                      variant="outline"
                      className="flex items-center space-x-1"
                    >
                      <ImageDown className="h-6 w-6" />
                      Tải về
                    </Button>
                  </a>
                )}
              </div>
            </div>
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="content">Nội dung chính</Label>
                <div className="flex items-center space-x-2 text-sm">
                  <div variant={"outline"}>
                    <div dangerouslySetInnerHTML={{ __html: isExpandedContent ? content : content?.substring(0, 500) + '...' }} />
                    <Button variant="link" onClick={toggleContent}>
                      {isExpandedContent ? "Thu gọn" : "Xem thêm"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>






            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="image">Ảnh chính</Label>
                <div className="w-1/3 mx-auto">
                  <img
                    src={posts?.post ? posts.post?.image : ""}
                    alt="image_volunteer"

                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale block"
                  />
                </div>
                {posts?.post && posts.post?.image && (
                  <a href={posts.post?.image} download>
                    <Button
                      variant="outline"
                      className="flex items-center space-x-1"
                    >
                      <ImageDown className="h-6 w-6" />
                      Tải về
                    </Button>
                  </a>
                )}
              </div>
            </div>

            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="content">Nội dung kết</Label>
                <div className="flex items-center space-x-2 text-sm">
                  <div variant={"outline"}>
                    <div dangerouslySetInnerHTML={{ __html: isExpandedDescription ? description : description?.substring(0, 500) + '...' }} />
                    <Button variant="link" onClick={toggleDescription}>
                      {isExpandedDescription ? "Thu gọn" : "Xem thêm"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="user">Thành viên</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="user"
                    defaultValue={posts?.user ? (posts.user?.firstName + posts.user?.lastName) : ""}
                    disabled
                  />
                  <CopyButton code={posts?.user ? (posts.user?.firstName + posts.user?.lastName) : ""} />
                </div>
              </div>
            </div>


            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="organizationManager">Quản lý tổ chức</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="organizationManager"
                    defaultValue={posts?.organizationManager ? (posts.organizationManager?.firstName + posts.organizationManager?.lastName) : ""}
                    disabled
                  />
                  <CopyButton code={posts?.organizationManager ? (posts.organizationManager?.firstName + posts.organizationManager?.lastName) : ""} />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="createDate">Ngày tạo</Label>
                <div className="flex items-center space-x-2">
                  <Badge variant={"outline"}>

                    {posts ? format(new Date(posts?.createDate), 'dd/MM/yyyy, h:mm:ss a') : ""}
                  </Badge>
                  <CopyButton
                    code={posts ? format(new Date(posts?.createDate), 'dd/MM/yyyy, h:mm:ss a') : ""}
                  />
                </div>
              </div>
            </div>

            {/* Show Ngày duyệt */}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="approvedDate">Ngày duyệt</Label>
                <div className="flex items-center space-x-2">
                  <Badge variant={"outline"}>

                    {posts?.approvedDate ? format(new Date(posts?.approvedDate), 'dd/MM/yyyy, h:mm:ss a') : "Chưa có"}
                  </Badge>
                  <CopyButton
                    code={posts?.approvedDate ? format(new Date(posts?.approvedDate), 'dd/MM/yyyy, h:mm:ss a') : "Chưa có"}
                  />
                </div>
              </div>
            </div>


            {posts && (
              <form onSubmit={formik.handleSubmit} className="space-y-3">
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
              </form>
            )}
          </div>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Đóng
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={formik.isSubmitting}
            onClick={formik.handleSubmit}
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
    </Dialog >
  );
};

export default EditStatusForm;
