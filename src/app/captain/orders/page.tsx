import React from "react";
import CaptainHeader from "@/components/CaptainHeader";
import ButtonNavigation from "@/components/ButtonNavigation";
import Image from "next/image";
function page() {
  return (
    <div className="h-screen w-full bg-gray-100 px-4 py-6">
      <CaptainHeader />

      <h1 className="font-bold text-3xl tracking-wide py-6">Good Morning!🌞</h1>

      {/* Orders */}

      <div className="py-4">
        <h3>Orders Near You</h3>
        <div>
            {/* Title and work icon */}
            <div><Image src="/Icon/ac_repair" alt="work_icon" height={80} width={80} /></div>

            <div>

            </div>
        </div>
      </div>
      <div className="fixed h-16 w-full bottom-0 left-0 right-0 z-10">
        <ButtonNavigation />
      </div>
    </div>
  );
}

export default page;
