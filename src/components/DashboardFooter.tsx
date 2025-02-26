import React from "react";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const DashboardFooter = () => {
  return (
    <div className="h-full w-full bg-[#B6B6D6] py-4 px-6 rounded-lg flex justify-center flex-col gap-10">
      {/* logo */}
      <div>
        <img src="/Icon/dashboard_logo.png" alt="" />
      </div>

      {/* description */}
      <div className="text-base tracking-wide font-inter">
        SevaSathi is your premier destination for top-notch smart home service
        and repair.{" "}
      </div>

      {/* For Partners */}

      <div className="flex flex-col justify-start gap-2">
        <h3 className="font-bold text-2xl ">
          For Partners
        </h3>
        <Link href="/">
          <h3>Register as Professional</h3>
        </Link>
        <Link href="/">
          <h3>Login</h3>
        </Link>
      </div>

      {/* company */}
      <div className="flex justify-between gap-10">
        <div className="flex justify-start gap-2 flex-col">
          <h3 className="text-2xl font-bold">Company</h3>
          <h3>About Us</h3>
          <h3>Services</h3>
          <h3>Contact Us</h3>
        </div>
        {/* legal */}
        <div>
          <h3 className="text-2xl font-semibold">Legal</h3>
          <h3>Terms</h3>
          <h3>Privacy</h3>
          <h3>Cookies</h3>
          <h3>License</h3>
        </div>
      </div>
      <div className="w-full  bg-black"></div>

      <div>
        <h2>©2025 SevaSathi . All rights reserved</h2>
      </div>
    </div>
  );
};

export default DashboardFooter;
