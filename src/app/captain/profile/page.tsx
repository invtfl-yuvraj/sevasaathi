import React from "react";
import CaptainProfile from "@/components/CaptainProfile";
import HeaderWithBackButton from "@/components/HeaderWithBackButton";

const page = () => {
  return (
    <div className="h-screen w-full bg-gray-100 py-6 px-4">
      <div>
        <div className="">
          <HeaderWithBackButton title="Account" />
        </div>
      </div>
      <CaptainProfile />
    </div>
  );
};

export default page;
