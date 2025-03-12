import React from "react";
import CaptainHeader from "@/components/CaptainHeader";
import ButtonNavigation from "@/components/ButtonNavigation";
import Image from "next/image";
import CaptainOrders from "@/components/CaptainOrders";
import CaptainButtonNavigation from "@/components/CaptainButtonNavigation";

function page() {
  return (
    <div className="h-screen w-full bg-gray-100 px-6 py-6">
      <CaptainHeader />

      <h1 className="font-bold text-3xl tracking-wide py-6">Good Morning!🌞</h1>

      {/* Orders */}
      <div className=""><CaptainOrders/></div>

      
      <div className="fixed h-16 w-full bottom-0 left-0 right-0 z-10">
      <CaptainButtonNavigation />
      </div>
    </div>
  );
}

export default page;
