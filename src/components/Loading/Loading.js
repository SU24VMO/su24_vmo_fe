import React from "react";
export default function Loading() {
  return (
    <div className="absolute z-50 w-full h-full flex flex-col items-center justify-center bg-white">
        <h1 className="text-4xl">Chưa có ý tưởng loading screen...</h1>
      <video
        width={800}
        height={800}
        src={require('../../assets/images/fuunyloading.mp4')}
        autoPlay
        loop
      ></video>
    </div>
  );
}
