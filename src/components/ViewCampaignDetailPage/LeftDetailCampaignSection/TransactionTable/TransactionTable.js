import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      donatorName: "NGUYEN TIEN PHAT",
      donationAmount: 30000,
      donationDate: "21:29:56 - 19/05/2024",
    },
    {
      id: "2",
      donatorName: "NGUYEN VAN DUNG",
      donationAmount: 10000,
      donationDate: "20:06:00 - 19/05/2024",
    },
    {
      id: "3",
      donatorName: "CHAU NHAT TRUONG",
      donationAmount: 1000000000000,
      donationDate: "19:53:22 - 19/05/2024",
    },
    {
      id: "4",
      donatorName: "TRUONG DINH DANG KHOA",
      donationAmount: 20000,
      donationDate: "17:47:26 - 19/05/2024",
    },
    {
      id: "5",
      donatorName: "VU THI THUY DUONG",
      donationAmount: 500000,
      donationDate: "16:06:30 - 19/05/2024",
    },
    {
      id: "6",
      donatorName: "HO TRUONG PHUONG THAO",
      donationAmount: 100000,
      donationDate: "07:10:59 - 20/05/2024",
    },
    {
      id: "7",
      donatorName: "HO TRUONG PHUONG THAO",
      donationAmount: 100000,
      donationDate: "07:10:59 - 20/05/2024",
    },
    {
      id: "8",
      donatorName: "NGUYEN THI PHUONG THAO",
      donationAmount: 50000,
      donationDate: "07:01:41 - 20/05/2024",
    },
    {
      id: "9",
      donatorName: "CHUYỂN TIỀN LIÊN NGÂN HÀNG",
      donationAmount: 30000,
      donationDate: "23:59:16 - 19/05/2024",
    },
    {
      id: "10",
      donatorName: "CHUYỂN TIỀN LIÊN NGÂN HÀNG",
      donationAmount: 100000,
      donationDate: "22:08:57 - 19/05/2024",
    },
    {
      id: "11",
      donatorName: "NGUYEN VAN PHUC",
      donationAmount: 10000,
      donationDate: "11:54:37 - 20/05/2024",
    },
    {
      id: "12",
      donatorName: "CAO THUY LINH",
      donationAmount: 20000,
      donationDate: "10:55:29 - 20/05/2024",
    },
    {
      id: "13",
      donatorName: "NGUYEN HONG HANH",
      donationAmount: 30000,
      donationDate: "09:24:05 - 20/05/2024",
    },
    {
      id: "14",
      donatorName: "NGUYEN THI LE",
      donationAmount: 60000,
      donationDate: "08:55:05 - 20/05/2024",
    },
    {
      id: "15",
      donatorName: "PHAN THI LE",
      donationAmount: 50000,
      donationDate: "08:44:54 - 20/05/2024",
    },

    // ...
  ];
}

const TransactionTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  return (
    <div className="max-w-[340px] transactionTable:max-w-full">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TransactionTable;
