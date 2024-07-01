import React from "react";
import { TailSpin } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        wrapperStyle={{
    
        }}
        wrapperClass=""
      />
    </div>
  );
}
