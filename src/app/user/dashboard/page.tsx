import React from "react";
import DashboardHeader from "@/components/DashboardHeader";
import "../login/page";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const page = () => {
  return (
    <div className="p-4">
      <DashboardHeader />

      <header className="mt-4 text-locationcolor font-sans">
        HELLO 👋 <br></br>
        <span className="text-2xl font-bold text-dashboardfontcolor tracking-wide">
          What are you looking for today?
        </span>
      </header>

      <div className="flex justify-between items-center gap-4 mt-4 bg-[#FBFBFB] border-2 border-bordersearch rounded-lg">
        <input
          type="text"
          placeholder="Search what you need..."
          className="text-[#9B9E9F] text-sm ml-3"
        ></input>
        <div className="w-10 bg-lightpurple p-2 rounded-lg flex justify-center items-center">
          <i className="ri-search-line text-white font-semibold"></i>
        </div>
      </div>

      <div className="grid grid-cols-4 mt-[10%]">
        <div className="h-10 w-10 bg-[#FFBC99] rounded-full flex justify-between items-center flex-col gap-2 p-2">
          <Image
            className=""
            src="/Icon/ac_repair.png"
            height={30}
            width={30}
            alt="AC Repair"
          />
          <p className="text-xs w-10">AC Repair</p>
        </div>
        <div>
          <Image
            className="h-10 w-10 bg-painting rounded-full flex justify-between items-center flex-col gap-2 p-2"
            src="/Icon/painting.png"
            height={30}
            width={30}
            alt="Painting"
          />
          <p className="text-xs">Painting</p>
        </div>
        <div>
          <Image
            className="h-10 w-10 bg-appliance rounded-full flex justify-between items-center flex-col gap-2 p-2"
            src="/Icon/appliance.png"
            height={30}
            width={30}
            alt="Painting"
          />
          <p className="text-xs">Appliance</p>
        </div>

        <div className="h-10 w-10 bg-lightgray rounded-full flex justify-between items-center flex-col gap-2 p-2">
          <i className="ri-arrow-right-line text-xl"></i>
          <p className="text-xs w-12">See All</p>
        </div>
      </div>
    </div>
  );
};

export default page;
