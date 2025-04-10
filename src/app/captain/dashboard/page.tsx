"use client";
import ButtonNavigation from "@/components/ButtonNavigation";
import CaptainHeader from "@/components/CaptainHeader";
import React from "react";
import CaptainDashboard from "@/components/CaptainDashboard";
import CaptainButtonNavigation from "@/components/CaptainButtonNavigation";



function page() {
  return (
    <div className="min-h-screen w-full bg-slate-200 pt-6 px-4 pb-16 relative">
      <CaptainHeader captainName="" />

      <div className="py-4">
        <CaptainDashboard />
      </div>

      <div className="fixed h-14 w-full bottom-0 left-0 right-0 z-50 bg-white shadow-md">
        <CaptainButtonNavigation />
      </div>
    </div>
  );
}

export default page;
