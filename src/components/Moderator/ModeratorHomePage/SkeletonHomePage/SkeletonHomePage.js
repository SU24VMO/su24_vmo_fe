import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../ui/card";
import {
    Activity,
    ArrowUpRight,
    Building2,
    CreditCard,
    DollarSign,
    HeartHandshake,
    User,
    Users,
} from "lucide-react";
import { Button } from "../../../ui/button";
import { Link } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Helmet } from "react-helmet";
import { Skeleton } from "../../../ui/skeleton";

export default function SkeletonHomePage() {

    const columns = 1;
    const rows = 5;

    const columnsAccount = 1;
    const rowsAccount = 7;

    return <>
        <Helmet>
            <title>Trang chủ người kiểm duyệt • VMO</title>
            <meta
                name="description"
                content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
            />
        </Helmet>
        <p className="font-bold text-2xl">Thống kê số liệu</p>
        {/* CARD FULL*/}
        <div className="grid gap-4 mobile:grid-cols-2 mobile:gap-8 laptop:grid-cols-4">
            <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Số lượng người dùng</CardTitle>
                    <div className="w-fit">
                        <User className="w-fit" />

                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold"><Skeleton className="w-8 h-8" /></div>

                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Số lượng chiến dịch</CardTitle>
                    <div className="w-fit">
                        <HeartHandshake className="w-fit" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold"><Skeleton className="w-8 h-8" /></div>

                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Số lượng tổ chức</CardTitle>
                    <div className="w-fit">
                        <Building2 className="w-fit" />

                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold"><Skeleton className="w-8 h-8" /></div>

                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Số lượng tình nguyện viên</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold"><Skeleton className="w-8 h-8" /></div>

                </CardContent>
            </Card>
        </div>
        {/* CARD 2 */}
        <div className="grid gap-4 mobile:gap-8 laptop:grid-cols-3">
            <Card className="laptop:col-span-2" x-chunk="dashboard-01-chunk-4">
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>Giao dịch</CardTitle>
                        <CardDescription>
                            Giao dịch gần đây
                        </CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1">
                        {/* <Link to="#">
                                Xem tất cả
                                <ArrowUpRight className="h-4 w-4" />
                            </Link> */}
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow >
                                <TableHead>Người dùng</TableHead>
                                <TableHead className="text-right">Số tiền</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>


                            {[...Array(rows)].map((_, rowIndex) => (
                                <TableRow key={rowIndex} className="">
                                    {[...Array(columns)].map((_, cellIndex) => (
                                        <TableCell key={cellIndex}>
                                            <div className="font-medium"> <Skeleton className="h-5 w-40" /></div>
                                            <div className="hidden text-sm text-muted-foreground mobile:inline">
                                                <Skeleton className="h-5 w-20" />
                                            </div>
                                        </TableCell>
                                    ))}
                                    {[...Array(columns)].map((_, cellIndex) => (
                                        <TableCell key={cellIndex} className="text-right flex justify-end"> <Skeleton className="h-5 w-20" /></TableCell>

                                    ))}
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-5">
                <CardHeader>
                    <CardTitle>Tài khoản</CardTitle>
                    <CardDescription>
                        Tài khoản gần đây
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-8">


                    {[...Array(rowsAccount)].map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {[...Array(columnsAccount)].map((_, cellIndex) => (
                                <div key={cellIndex} className="flex items-center gap-4">
                                    <Skeleton className="rounded-full" >
                                        <Avatar className="hidden  mobile:flex">
                                        </Avatar>
                                    </Skeleton>

                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            <Skeleton className="h-4 w-40" />
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <Skeleton className="h-4 w-40" />

                                        </p>
                                    </div>
                                </div>
                            ))}

                        </TableRow>
                    ))}






                </CardContent>
            </Card>
        </div>
    </>;
}
