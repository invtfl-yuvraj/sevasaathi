"use client";
import { MdOutlineLink, MdOutlineKeyboardVoice } from "react-icons/md";
import { useRouter } from "next/navigation";
import React from "react";
import UnitsCount from "@/components/UnitsCount";
import Link from "next/link";

function page() {
  const router = useRouter();
  return (
    <div className="h-screen w-full py-6 px-4 bg-gray-100">
      {/* Service Details Section */}
      <div className="flex flex-col bg-white py-4 px-4 rounded-xl shadow-md">
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 rounded-xl bg-[#A3B2FF]"></div>
          <h2 className="text-2xl font-semibold tracking-wide">
            Service Details
          </h2>
        </div>
        <p className="mt-6 text-gray-700">
          AC doctor ke paas jayega aur uska check-up hoga. Bohot mota kharcha
          aayega :)
        </p>
      </div>

      {/* Number of Units Section */}
      <div className="py-4">
        <UnitsCount />
      </div>

      {/* Description Section */}
      <div className="w-full max-w-lg mx-auto py-4 bg-white rounded-xl shadow-md">
        {/* Label Section */}
        <div className="flex items-center gap-2 px-4">
          <div className="h-8 w-1 rounded-xl bg-[#A3B2FF]"></div>
          <h2 className="text-2xl font-semibold tracking-wide">Description</h2>
        </div>

        {/* Input Box */}
        <div className="w-full p-4">
          <div className="mt-2 rounded-xl bg-gray-50 border-2 border-[#9A9FA5]">
            {/* Icons Row */}
            <div className="flex items-center gap-6 p-3 text-gray-500 text-2xl">
              <MdOutlineLink />
              <MdOutlineKeyboardVoice />
            </div>

            {/* Textarea */}
            <textarea
              className="w-full h-40 bg-gray-200 p-3 rounded-b-xl focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none text-lg"
              placeholder="Enter description..."
            ></textarea>
          </div>
        </div>
      </div>

      {/* Total Amount Section */}
      <div className=" py-4 bg-white rounded-xl shadow-md mt-4 p-4">
        <h3 className="text-lg text-gray-400">Total Cost: Rs 10</h3>

        <div className="flex justify-between  gap-2 mt-10">
          <Link href="/">
            <button className="h-full w-full px-4 py-4 bg-white text-black rounded-xl shadow-md font-bold border-2 border-gray-300 tracking-wide text-xl">
              Add More
            </button>
          </Link>

          <Link href="/user/service-details/schedule">
            <button
              className="h-full w-full px-4 py-4 bg-lightpurple text-white rounded-xl shadow-md font-bold border-2 border-gray-300 tracking-wide text-xl"
              
            >
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
