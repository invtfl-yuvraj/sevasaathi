import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import BackButton from "@/components/BackButton";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineModeEdit } from "react-icons/md";
import { LuClock3 } from "react-icons/lu";
import Link from "next/link";

function page() {
  return (
    <div className="h-screen w-full p-4">
      <div className="w-full flex flex-col gap-6">
        <BackButton />
        <div className="h-10 w-full flex items-center gap-2">
          <div className="h-8 w-1 rounded-xl bg-[#FF595B]"></div>
          <h2 className="font-semibold text-2xl">Service Summary</h2>
        </div>
      </div>

      {/* address section */}
      <div className="py-6 border-2 border-gray-200 px-2 rounded-2xl flex flex-col gap-4">
        {/* address */}
        <div className="flex justify-between gap-2">
          <AiOutlineHome className="text-lg" />
          <div>
            <p className="">Home</p>
            <p className="text-xs text-grayA">
              VIT BHOPAL UNIVERSITY, Kothri, Madhya Pradesh
            </p>
          </div>
          <MdOutlineModeEdit className="text-xl" />
        </div>
        {/* time and date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LuClock3 className="text-lg" />
            <p className="text-sm text-grayA">Sat, Apr 26 - 10:00 AM</p>
          </div>
          <MdOutlineModeEdit className="text-xl cursor-pointer text-gray-600 hover:text-black" />
        </div>
      </div>

      {/* Selected Services */}

      <div className="mt-8  rounded-xl w-full border-2 border-gray-200 p-2 bg-lightpeach">
        <h3 className="text-lg font-bold">Selected Services</h3>

        <div className="py-4 flex gap-6">
          <div className="h-20 w-20 bg-gray rounded-lg"></div>
          <div className="">
            {/* Service Name */}
            <p className="text-lg">AC Check-Up</p>
            {/* Pricing */}
            <p className="font-bold text-[#283891]">₹400</p>
          </div>
        </div>
        <div>
            <p>1 unit</p>
            <p>Regular AC tune-up for inner and outer unit</p>
            <p>Calibration of thermostat for good operation</p>
        </div>
      </div>



      <div className="mt-8">
          <Link href="/service-details/booking"><button className="w-full py-2 bg-lightpurple rounded-xl text-white">Continue</button></Link>
      </div>
    </div>
  );
}

export default page;
