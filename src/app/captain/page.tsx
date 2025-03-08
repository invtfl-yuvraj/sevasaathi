import React from "react";
import Image from "next/image";
import CaptainMobile from "@/components/CaptainMobile";

const Page = () => {
  return (
    <>
      {/* <div className="mt-6"></div> */}

      {/* Fixed gradient background */}
      <div className="h-full w-full bg-gradient-to-b from-[#906BFF] via-[#B484FC] to-[#FFE8D6] p-10 flex justify-center flex-col ">
        <Image
          src="/Icon/captain_home.png"
          alt="captain-homepage"
          height={380}
          width={380}
          className="object-cover"
        />

        <div className="flex justify-between flex-col gap-2">
          <h3 className="font-semibold text-lg">Be a SevaSaathi Partner</h3>
          <p className="font-bold text-xl">
            We will contact you through WhatsApp
          </p>
        </div>
      </div>

      <div className="h-full w-full flex justify-center flex-col gap-2 px-6 py-4">
        <h4>Enter a Mobile Number</h4>
        <CaptainMobile/>
        <button className="w-full h-full bg-[#6759FF] text-white mt-12 border-none rounded-lg placeholder:text-base flex flex-col justify-center items-center text-base py-2 ">
          Send Request
        </button>
      </div>
    </>
  );
};

export default Page;
