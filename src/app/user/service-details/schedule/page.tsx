import ScheduleService from "@/components/ScheduleService";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegAddressBook } from "react-icons/fa6";
import { BsCalendarDate } from "react-icons/bs";
import { LuClock4 } from "react-icons/lu";
import { IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";

function page() {
  return (
    <div>
      <div className="h-screen w-full p-4">
        <div className="w-full flex flex-col">
          <div className="flex justify-between">
            <div className="h-8 w-1 rounded-xl bg-[#A3B2FF]"></div>
            <h2 className="text-2xl font-semibold tracking-wide">
              Schedule Your Service
            </h2>
            <div className="h-8 w-8 rounded-full bg-gray-500 flex justify-center items-center">
              <IoCloseSharp className="text-2xl" />
            </div>
          </div>
        </div>
        <div className="h-full w-full py-8 flex flex-col gap-4">
          {/* Address */}
          <div className="py-6 px-4 w-full flex bg-lightyellowB gap-4 rounded-xl">
            <div>
              <FaRegAddressBook className="text-2xl" />
            </div>
            <div>
              <h3 className="text-gray">ADDRESS</h3>
              <p className="text-black">Select your Address</p>
            </div>
          </div>
          {/* Date */}
          <div className="py-6 px-4 w-full flex bg-peach gap-4 rounded-xl">
            <div>
              <BsCalendarDate className="text-2xl" />
            </div>
            <div>
              <h3 className="text-gray">DATE </h3>
              <div className="text-black">
                <input
                  type="date"
                  id="myDate"
                  className="w-full border-2 border-none p-2 bg-peach rounded-xl"
                ></input>
              </div>
            </div>
          </div>
          {/* Time */}
          <div className="py-6 px-4 w-full flex bg-lightgreenA gap-4 rounded-xl">
            <div>
              <LuClock4 className="text-2xl" />
            </div>
            <div>
              <h3 className="text-gray">TIME</h3>
              <p className="text-black">Select your Time</p>
            </div>
          </div>


          <div className="flex justify-between text-xl">
            <p className="text-gray ">Total:<span className="font-bold text-black"> ₹ 400</span></p>
            <div className="flex">
              <p className="text-orange-400">View Details </p>
              <IoMdArrowDropdown  className="text-orange-400 text-lg"/>
            </div>
          </div>


          <Link href="/user/service-details/service-summary"><button className="w-full bg-lightpurple text-white py-4 text-xl rounded-xl font-bold">Continue</button></Link>
        </div>
      </div>
    </div>
  );
}

export default page;
