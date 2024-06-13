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
import React from "react";
const EditStatusForm = ({ isOpen, onOpenChange, post }) => {
  const { toast } = useToast();
  // Formik setup
  const formik = useFormik({
    initialValues: {
      is_approved: post ? post.is_approved : false,
    },
    onSubmit: (values, { setSubmitting }) => {
      toast({
        title: "Thông tin duyệt:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-black p-4">
            <code className="text-white">
              {JSON.stringify(values, null, 2)}
            </code>{" "}
            {/* For testing*/}
          </pre>
        ),
      });
      setSubmitting(false);
      onOpenChange(false); // Close the dialog after form submission
    },
  });
  /* Giải thích: 
  Vấn đề ở đây là formik là một đối tượng được tạo ra bởi hook useFormik, và nó thay đổi mỗi khi component re-render. Khi mình thêm formik vào mảng dependencies của useEffect, nó sẽ chạy mỗi khi formik thay đổi, tức là mỗi khi component re-render. Một cách để giải quyết vấn đề này là sử dụng useRef để lưu trữ giá trị formik.setValues và sau đó sử dụng giá trị đó trong useEffect.
   */
  const setValuesRef = React.useRef(formik.setValues);
  // Update formik initialValues when post changes
  React.useEffect(() => {
    setValuesRef.current({
      is_approved: post ? post.is_approved : false,
    });
  }, [post]);
  // Handle switch change
  const handleSwitchChange = (field) => (isChecked) => {
    formik.setFieldValue(field, isChecked);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mobile:max-w-screen-tablet">
        <DialogHeader>
          <DialogTitle>Chi tiết bài viết</DialogTitle>
          <DialogDescription>
            Lưu ý: Bạn chỉ có thể chỉnh sửa trạng thái xác thực của chiến dịch!
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-96 px-10 py-5 shadow-inner ">
          <div className="flex flex-col gap-5">
            {/* Show tên chiến dịch */}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="title">Tiêu đề</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="title"
                    defaultValue={post ? post.title : ""}
                    disabled
                  />
                  <CopyButton code={post ? post.title : ""} />
                </div>
              </div>
            </div>
            {/* Show bài đăng được tạo bởi*/}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="create_by">Tạo bởi</Label>
                <div className="flex items-center space-x-2">
                  {post &&
                  post.create_by_user == null &&
                  post.create_by_om != null ? (
                    <Badge variant="outline">Tạo bởi tổ chức</Badge>
                  ) : (
                    <Badge variant="outline">Tạo bởi người dùng</Badge>
                  )}
                  <CopyButton
                    code={
                      post &&
                      post.create_by_user == null &&
                      post.create_by_om != null
                        ? "Tạo bởi tổ chức"
                        : "Tạo bởi người dùng "
                    }
                  />
                </div>
              </div>
            </div>
            {/* Show nội dung bài đăng*/}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="content">Nội dung</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="content"
                    defaultValue={post ? post.content : ""}
                    disabled
                  />
                  <CopyButton code={post ? post.content : ""} />
                </div>
              </div>
            </div>
            {/* Show cover bài đăng*/}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="cover">Cover</Label>
                <div className="max-w-40">
                  <img
                    src={post ? post.cover : ""}
                    alt="cover"
                    width="160"
                    height="160"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale block"
                  />
                </div>
                {post && post.cover && (
                  <a href={post.cover} download>
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
            {/* Show ảnh bài đăng*/}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="image">Ảnh</Label>
                <div className="max-w-40">
                  <img
                    src={post ? post.image : ""}
                    alt="image_volunteer"
                    width="160"
                    height="160"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale block"
                  />
                </div>
                {post && post.image && (
                  <a href={post.image} download>
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
            {/* Show Ngày duyệt */}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="approved_date">Ngày duyệt</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="approved_date"
                    defaultValue={post ? post.approved_date : ""}
                    disabled
                  />
                  <CopyButton code={post ? post.approved_date : ""} />
                </div>
              </div>
            </div>
            {/* Show ngày Ngày cập nhật */}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="update_date">Ngày cập nhật</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="update_date"
                    defaultValue={post ? post.update_date : ""}
                    disabled
                  />
                  <CopyButton code={post ? post.update_date : ""} />
                </div>
              </div>
            </div>
            {/* Show ngày tạo */}
            <div className="flex">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="create_date">Ngày tạo</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="create_date"
                    defaultValue={post ? post.create_date : ""}
                    disabled
                  />
                  <CopyButton code={post ? post.create_date : ""} />
                </div>
              </div>
            </div>
            {post && (
              <form onSubmit={formik.handleSubmit} className="space-y-3">
                {/*  */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_approved"
                    checked={formik.values.is_approved}
                    onCheckedChange={handleSwitchChange("is_approved")}
                  />
                  <Label htmlFor="is_approved">Chấp thuận</Label>
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
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditStatusForm;
