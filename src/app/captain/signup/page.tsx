import React from "react";
import Image from "next/image";
import CaptainMobile from "@/components/CaptainMobile";
import Link from "next/link";

function page() {
  return (
    <div className="h-screen w-full">
      <div className="flex justify-center items-center py-8">
        <Image
          src="/Icon/sevasaathi_logo.png"
          alt="Logo"
          height={200}
          width={200}
          className="object-cover"
        />
      </div>

      <div className="gap-2 px-6">
        <h3 className="font-semibold text-xl">Sign In</h3>
        <div className="h-full w-full text-xl flex flex-col gap-4 py-8 ">
        <p className="text-sm font-semibold">Phone Number</p>
          <CaptainMobile />
        </div>
        <Link href="/captain/dashboard">
            <button className="w-full h-full bg-[#6759FF] text-white border-none rounded-lg placeholder:text-base flex flex-col justify-center items-center text-base py-2 mb-5">
              Send OTP
            </button>
        </Link>
      </div>
    </div>
  );
}

export default page;
