import React from "react";
import { IoCameraOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
import { GoChecklist } from "react-icons/go";
function CaptainProfile() {
  return (
    <div className="py-6">
      {/* Profile photo */}
      <div className="flex justify-between items-center gap-4">
        <div className="h-22 w-22 rounded-full border-2 border-violet-400 flex justify-center items-center p-6">
          <IoCameraOutline className="text-3xl text-gray-500" />
        </div>
        {/* Name and Phone Number */}
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <FaRegUser className="text-md  text-lightpurple" />
            <p className="text-lg font-Inter">Harsh Mahajan</p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <FaPhone className="text-md text-lightpurple" />
            <p className="text-md font-Inter ">+91 9999988888</p>
          </div>
        </div>
        {/* Ratings Section (Add content if needed) */}
        <div className="bg-white rounded-md px-4 py-2 flex items-center gap-1">
          <p className="text-lg font-semibold">4.9</p>
          <FaStar className="text-orange-500 text-lg" />
        </div>
      </div>

      {/* Sections for the div */}
      <div className="h-full w-full py-10 flex flex-col gap-4">
        {/* Edit Profile */}
        <div className="h-full w-full flex justify-between bg-white px-4 py-4 rounded-xl">
          <div className="flex gap-6">
            <FaRegUser className="text-lg  text-lightpurple" />
            <h3>Edit Profile</h3>
          </div>
          <FaAngleRight className="text-lg  text-lightpurple" />
        </div>
        {/* Alotted Area */}
        <div className="h-full w-full flex justify-between bg-white px-4 py-4 rounded-xl">
          <div className="flex gap-6">
            <GrLocation className="text-lg  text-lightpurple" />
            <h3>Allotted Area</h3>
          </div>
          <FaAngleRight className="text-lg  text-lightpurple" />
        </div>
        {/* Support */}
        <div className="h-full w-full flex justify-between bg-white px-4 py-4 rounded-xl">
          <div className="flex gap-6">
            <LuPhone className="text-lg  text-lightpurple" />
            <h3>Support</h3>
          </div>
          <FaAngleRight className="text-lg  text-lightpurple" />
        </div>
        {/* Terms and Conditions */}
        <div className="h-full w-full flex justify-between bg-white px-4 py-4 rounded-xl">
          <div className="flex gap-6">
            <GoChecklist className="text-lg  text-lightpurple" />
            <h3>Terms & Conditions</h3>
          </div>
          <FaAngleRight className="text-lg  text-lightpurple" />
        </div>
        {/* Privacy Policy */}
        <div className="h-full w-full flex justify-between bg-white px-4 py-4 rounded-xl">
          <div className="flex gap-6">
            <FaRegEye className="text-lg  text-[#6759FF]" />
            <h3>Privacy Policy</h3>
          </div>
          <FaAngleRight className="text-lg  text-lightpurple" />
        </div>

        <div className="h-full w-full flex gap-6 bg-white px-4 py-4 rounded-lg">
          <RiLogoutBoxRLine className="text-lg  text-lightpurple" />
          <h3>Logout</h3>
        </div>
      </div>
    </div>
  );
}

export default CaptainProfile;
