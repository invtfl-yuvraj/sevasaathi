import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import BackButton from "@/components/BackButton";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineModeEdit } from "react-icons/md";
import { LuClock3 } from "react-icons/lu";

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
      <div className="py-6 border-2 border-gray-200 px-2 rounded-xl">
        {/* address */}
        <div className="flex justify-between gap-2">
          <AiOutlineHome />
          <div>
            <p className="">Home</p>
            <p className="text-sm text-gray-200">VIT BHOPAL UNIVERSITY, Kothri, Madhya Pradesh</p>
          </div>
          <MdOutlineModeEdit className="text-xl" />
        </div>
        {/* time and date */}
        <div className="flex justify-between items-center">
          <LuClock3 />
          <p>Sat, Apr 26 - 10:00 AM</p>
          <MdOutlineModeEdit className="text-xl" />
        </div>
      </div>
    </div>
  );
}

export default page;
