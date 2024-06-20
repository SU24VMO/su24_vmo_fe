import React from "react";

const SkeletonProfile = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 h-24 w-24 rounded-full"></div>
      <div className="mt-4 bg-gray-300 h-6 w-48 rounded"></div>
      <div className="mt-2 bg-gray-300 h-6 w-64 rounded"></div>
    </div>
  );
};

export default SkeletonProfile;
