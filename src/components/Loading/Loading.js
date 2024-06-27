import React from "react";
import { TailSpin } from "react-loader-spinner";
export default function Loading() {
  return (
    <div className="absolute z-50 w-full h-full flex flex-col items-center justify-center opacity-5">
        <h1 className="text-4xl">Chưa có ý tưởng loading screen...</h1>
      <TailSpin
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>
  );
}
