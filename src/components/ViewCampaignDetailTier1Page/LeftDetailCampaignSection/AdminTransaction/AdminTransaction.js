import React from "react";
import AdminTransactionCard from "./AdminTransactionCard/AdminTransactionCard";

const AdminTransaction = ({ statementFiles, campaignCreator }) => {
  return (
    <section className="w-full py-12">
      <div className="container grid items-center justify-center gap-8 px-4 mobile:px-6">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold tracking-tighter mobile:text-2xl">
            Giao dịch từ hệ thống
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-base/relaxed">
            Đây là giao dịch từ hệ thống chuyển tới chủ chiến dịch{" "}
            <span className="font-bold text-black">{campaignCreator} </span>
            để thực hiện các hoạt động từ thiện.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 mobile:grid-cols-2">
          {statementFiles.map((statementFile, index) => (
            <AdminTransactionCard
              key={index}
              statementImage={statementFile.transactionImageUrl}
              statementCreatedDate={statementFile.createDate}
              statementAmount={statementFile.amount}
              statementNote={statementFile.note}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminTransaction;
