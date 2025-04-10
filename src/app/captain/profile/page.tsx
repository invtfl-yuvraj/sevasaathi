import React from "react";
import CaptainProfile from "@/components/CaptainProfile";
import HeaderWithBackButton from "@/components/HeaderWithBackButton";
import CaptainButtonNavigation from "@/components/CaptainButtonNavigation";

const page = () => {
  return (
    <div className="h-screen w-full">
      
      <CaptainProfile />
      <div className="fixed h-16 w-full bottom-0 left-0 right-0 z-10">
        <CaptainButtonNavigation />
      </div>
    </div>
  );
};

export default page;
