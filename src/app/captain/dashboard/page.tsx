import ButtonNavigation from "@/components/ButtonNavigation";
import CaptainHeader from "@/components/CaptainHeader";
import React from "react";

function page() {
  return (
    <div className="h-screen w-full bg-gray-100 py-4 px-4">
      <CaptainHeader />
      <div className="py-6">
        <h1 className="font-bold text-3xl">Good Morning!🌞</h1>
      </div>
      <div className="fixed h-16 w-full bottom-0 left-0 right-0 z-10">
        <ButtonNavigation />
      </div>
    </div>
  );
}

export default page;
