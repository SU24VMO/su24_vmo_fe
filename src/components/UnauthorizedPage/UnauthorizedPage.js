import React from "react";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background px-4 md:px-6">
      <div className="mx-auto max-w-md space-y-4 text-center">
        <TriangleAlertIcon className="mx-auto h-12 w-12 text-red-500" />
        <h1 className="text-3xl font-bold">Không có quyền truy cập</h1>
        <p className="text-muted-foreground">
          Bạn không có quyền xem nội dung được yêu cầu. Vui lòng liên hệ với
          quản trị viên trang web nếu bạn cho rằng đây là lỗi.
        </p>
        <Link
          to="/"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Trở về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;

function TriangleAlertIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
