"use client"
import ButtonNavigation from "@/components/ButtonNavigation";
import CaptainHeader from "@/components/CaptainHeader";
import React from "react";
import CaptainDashboard from "@/components/CaptainDashboard";
import CaptainButtonNavigation from "@/components/CaptainButtonNavigation";


function page() {
  return (
    <div className="h-screen w-full bg-slate-200 py-6 px-4">
      <CaptainHeader captainName=""/>

     

      <CaptainDashboard />
      <div className="fixed h-16 w-full bottom-0 left-0 right-0 z-10">
        <CaptainButtonNavigation />
      </div>
    </div>
  );
}

export default page;
