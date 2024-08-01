import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
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
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

import { Helmet } from "react-helmet";
import { axiosPrivate } from "../../../api/axiosInstance";
import { GETALLACCOUNT, GETALLCAMPAIGN, GETALLORGANIZATION, GETALLTRANSACTIONRECENTLY, GETALLVOLUNTEER, GETNUMBERACCOUNT } from "../../../api/apiConstants";
import { toast } from "../../ui/use-toast";
import { ToastAction } from "../../ui/toast";
import SkeletonHomePage from "./SkeletonHomePage/SkeletonHomePage";
import axios from "axios";

const ModeratorHomePage = () => {
  const [loading, setLoading] = useState(true);
  const [numberAccount, setNumberAccount] = useState();
  const [dataAccount, setDataAccount] = useState();
  const [numberCampaign, setNumberCampaign] = useState();
  const [numberOrganization, setNumberOrganization] = useState();
  const [numberVolunteer, setNumberVolunteer] = useState();
  const [transactionRecently, setTransactionRecently] = useState([]);



  async function getNumberAccount(controller) {

    try {
      const response = await axiosPrivate.get(GETNUMBERACCOUNT, {
        signal: controller.signal
      });
      if (response.status === 200) {
        setNumberAccount(response?.data?.data?.totalItem);
        setDataAccount(response?.data?.data?.list.slice(0, 7));

      } else {
        toast({
          variant: "destructive",
          title: "Thất bại!",
          description: "Vui lòng kiểm tra lại thông tin!",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        toast({
          variant: "destructive",
          title: "Thất bại!",
          description: "Vui lòng kiểm tra lại thông tin!",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    }
  };


  async function getAllAccount(controller) {

    try {
      const response = await axiosPrivate.get(GETALLACCOUNT, {
        signal: controller.signal
      });
      if (response.status === 200) {
      
        setDataAccount(response?.data?.data?.list.slice(0, 7));

      } else {
        toast({
          variant: "destructive",
          title: "Thất bại!",
          description: "Vui lòng kiểm tra lại thông tin!",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        toast({
          variant: "destructive",
          title: "Thất bại!",
          description: "Vui lòng kiểm tra lại thông tin!",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    }
  };

  async function getAllCampaign(controller) {
    try {
      const response = await axiosPrivate.get(GETALLCAMPAIGN, {
        signal: controller.signal
      });

      if (response.status === 200) {
        setNumberCampaign(response?.data?.data?.totalItem);

      } else {
        toast({
          variant: "destructive",
          title: "Thất bại!",
          description: "Vui lòng kiểm tra lại thông tin!",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        toast({
          variant: "destructive",
          title: "Thất bại!",
          description: "Vui lòng kiểm tra lại thông tin!",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    }
  };

  async function getAllOrganization(controller) {
    try {
      const response = await axiosPrivate.get(GETALLORGANIZATION, {
        signal: controller.signal
      });

      if (response.status === 200) {
        setNumberOrganization(response?.data?.data?.totalItem);

      } else {
        toast({
          variant: "destructive",
          title: "Thất bại!",
          description: "Vui lòng kiểm tra lại thông tin!",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        toast({
          variant: "destructive",
          title: "Thất bại!",
          description: "Vui lòng kiểm tra lại thông tin!",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    }
  };

  async function getAllTransaction(controller) {
    try {
      const response = await axiosPrivate.get(GETALLTRANSACTIONRECENTLY + `?pageSize=5`, {
        signal: controller.signal
      });

      if (response.status === 200) {
        setTransactionRecently(response?.data?.data?.list);

      } else {
        toast({
          variant: "destructive",
          title: "Thất bại!",
          description: "Vui lòng kiểm tra lại thông tin!",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        toast({
          variant: "destructive",
          title: "Thất bại!",
          description: "Vui lòng kiểm tra lại thông tin!",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    }
  };

  async function getAllVolunteer(controller) {
    try {
      const response = await axiosPrivate.get(GETALLVOLUNTEER, {
        signal: controller.signal
      });

      if (response.status === 200) {
        setNumberVolunteer(response?.data?.data?.totalItem);

      } else {
        toast({
          variant: "destructive",
          title: "Thất bại!",
          description: "Vui lòng kiểm tra lại thông tin!",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        toast({
          variant: "destructive",
          title: "Thất bại!",
          description: "Vui lòng kiểm tra lại thông tin!",
          action: <ToastAction altText="undo">Ẩn</ToastAction>,
        });
      }
    }
  };


  //bế cái fetch ra ngoài thì load ngon nhưng mà cancel có vẻ ko hoạt động

  useEffect(() => {
    const controller = new AbortController();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    let isMounted = true;

    const fetchData = async () => {

      try {
        if (isMounted) setLoading(true);

        await Promise.allSettled([
          getNumberAccount(controller),
          getAllOrganization(controller),
          getAllAccount(controller),
          getAllCampaign(controller),
          getAllTransaction(controller),
          getAllVolunteer(controller)
        ]);


      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {

        if (isMounted) setLoading(false);

      }
    };
    fetchData();
    return () => {
      isMounted = false;
      controller.abort();
    };

  }, []);
  useEffect(() => {
    console.log('====================================');
    console.log("loading: ", loading);
    console.log('====================================');
  }, [loading])

  const formatAmount = (value) => {
    if (!value) return '';
    const stringValue = value.toString();
    const cleanValue = stringValue.replace(/\D/g, '');
    const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedValue + " VND";
  };

  return (
    <>
      {loading ? (<SkeletonHomePage />) : (
        <>
          <Helmet>
            <title>Trang chủ người kiểm duyệt • VMO</title>
            <meta
              name="description"
              content="Mô hình tình nguyện cho người có hoàn cảnh khó khăn"
            />
          </Helmet>
          <span className="font-bold text-2xl">Thống kê số liệu</span>
          {/* CARD FULL*/}
          <div className="grid gap-4 mobile:grid-cols-2 mobile:gap-8 laptop:grid-cols-4" >
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Số lượng người dùng</CardTitle>
                <div className="w-fit">
                  <User className="w-fit" />

                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold animate-zoomInOut">{numberAccount}</div>

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
                <div className="text-2xl font-bold animate-zoomInOut">{numberCampaign}</div>

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
                <div className="text-2xl font-bold animate-zoomInOut">{numberOrganization}</div>

              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Số lượng tình nguyện viên</CardTitle>
                <div className="w-fit">
                  <Users className="w-fit" />

                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold animate-zoomInOut">{numberVolunteer}</div>

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
                {/* <Button asChild size="sm" className="ml-auto gap-1">
                  <Link to="#">
                    Xem tất cả
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button> */}
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
                    {transactionRecently && transactionRecently.map(transaction => (
                      <TableRow>
                        <TableCell>
                          <div className="font-medium animate-fadeInLeft">{transaction.payerName}</div>
                          <div className="hidden text-sm text-muted-foreground mobile:inline animate-fadeInLeft">
                            {transaction.donatationPeriod}
                          </div>
                        </TableCell>

                        <TableCell className="text-right animate-fadeInLeft">{transaction?.amount ? (formatAmount(transaction?.amount)) : ("0 VND")}</TableCell>
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

                {dataAccount && dataAccount.map(data => (
                  <div key={data.accountID} className="flex items-center gap-4 animate-slide-in-left">
                    <Avatar className="hidden h-9 w-9 mobile:flex">
                      <AvatarImage src={data.avatar !== ("string" || "") ? data.avatar : ""} alt="Avatar" />
                      <AvatarFallback className="capitalize">{data.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <span className="text-sm font-medium leading-none">
                        {data.username}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {data.email}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default ModeratorHomePage;
