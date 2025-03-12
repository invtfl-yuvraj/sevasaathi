import React from "react";
import Link from "next/link";
import Image from "next/image";

function CaptainDashboard() {
  return (
    <div>
      <div className="flex justify-center items-center flex-col gap-6 py-10">
        <Image
          src="/Icon/upcoming_order.png"
          height={80}
          width={80}
          alt="No order Image"
          className="bg-cover"
        ></Image>
        <h2 className="font-bold text-xl">No Upcoming Order</h2>
        <p className="text-sm px-4 text-gray-500">
          Currently you don't have any upcoming order. We will notify you for
          orders near you.
        </p>

      </div>
        <Link href="/captain/orders">
            <button className="w-full h-full py-2 bg-[#6759FF] text-white border-none rounded-lg placeholder:text-base flex flex-col justify-center items-center text-base mb-5 font-bold">
              Start Activity
            </button>
        </Link>
    </div>
  );
}

export default CaptainDashboard;
