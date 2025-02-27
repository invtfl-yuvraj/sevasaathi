import React from "react";
import "remixicon/fonts/remixicon.css";
import CityDropDown from "./CityDropDown";
import Link from "next/link";

const DashboardHeader = () => {
  return (
    <div className="flex justify-start items-center gap-4 ">
      <div>
        <i className="ri-menu-line text-2xl font-semibold"></i>
      </div>

      <div className="">
        <h4 className="uppercase text-[9px] text-locationcolor">Current Location</h4>
        <CityDropDown />
      </div>

      <div className="w-full flex justify-end">
        <Link href="/">
          <button className="border-2 p-2 border-red-500 bg-red-500 text-white rounded-2xl">Logout</button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
