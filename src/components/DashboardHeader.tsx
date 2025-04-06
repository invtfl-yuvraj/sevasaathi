"use client";
import React from "react";
import "remixicon/fonts/remixicon.css";
import CityDropDown from "./CityDropDown";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { signOut } from "next-auth/react";

const DashboardHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex justify-start items-center gap-4">
      <button>
        <GiHamburgerMenu
          className="text-2xl"
          onClick={() => setIsVisible(true)}
        />
      </button>

      <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} />

      <div className="">
        <h4 className="uppercase text-[9px] text-locationcolor">
          Current Location
        </h4>
        <CityDropDown />
      </div>

      <div className="w-full flex justify-end">
          <button
            onClick={() =>
              signOut({
                callbackUrl: "/user/login",
              })
            }
            className="border-2 p-2 border-red-500 bg-red-500 text-white rounded-2xl"
          >
            Logout
          </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
