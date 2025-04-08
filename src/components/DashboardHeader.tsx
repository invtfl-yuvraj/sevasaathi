// components/DashboardHeader.tsx
"use client";
import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLocationOn } from "react-icons/md";
import { signOut } from "next-auth/react";
import Sidebar from "./Sidebar";
import { useLocation } from "@/hooks/useLocation";

const DashboardHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { currentCity, locationError, updateLocation } = useLocation();

  return (
    <div className="flex justify-start items-center gap-4">
      <button>
        <GiHamburgerMenu
          className="text-2xl"
          onClick={() => setIsVisible(true)}
        />
      </button>
      <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} />
      <div className="h-full w-full flex flex-col gap-1">
        {/* Label */}
        <h4 className="uppercase text-xs text-locationcolor">
          Current Location
        </h4>
        <div className="flex items-start gap-1">
          <MdLocationOn className="text-red-500 text-lg mt-0.5" />
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-base">{currentCity}</span>
            {locationError && (
              <span className="text-xs text-red-500">({locationError})</span>
            )}
            {/* Add refresh button if needed */}
            {locationError && (
              <button 
                onClick={() => updateLocation()}
                className="text-xs text-blue-500 underline mt-1"
              >
                Retry
              </button>
            )}
          </div>
        </div>
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