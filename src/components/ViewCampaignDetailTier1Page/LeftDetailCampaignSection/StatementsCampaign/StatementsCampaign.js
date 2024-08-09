import React from "react";
import StatementCard from "./StatementCard/StatementCard";
import { format } from "date-fns";

const StatementsCampaign = ({ statement, statementFiles }) => {
  return (
    <section className="w-full py-12">
      <div className="container grid items-center justify-center gap-8 px-4 mobile:px-6">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold tracking-tighter mobile:text-2xl">
            Giai đoạn sao kê
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-base/relaxed">
            Đã bắt đầu giai đoạn vào lúc{" "}
            {format(new Date(statement.startDate), "dd/MM/yyyy, h:mm:ss a")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 mobile:grid-cols-2 laptop:grid-cols-3">
          {statementFiles.map((statementFile, index) => (
            <StatementCard
              key={index}
              statementImage={statementFile.link}
              statementCreatedDate={statement.createDate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatementsCampaign;
