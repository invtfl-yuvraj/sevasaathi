import ButtonNavigation from "@/components/ButtonNavigation";
import HeaderWithBackButton from "@/components/HeaderWithBackButton";
import React from "react";

const page = () => {
  return (
    <div className="h-full w-full flex flex-col justify-between gap-4 p-4">
      <HeaderWithBackButton title="Bookings" />

      <div className="h-full w-full flex gap-4 justify-around items-center">
        <div className="flex justify-center items-center">
          <h4 className="text-lightpurple bg-lightpurple bg-opacity-10 py-1 px-2">
            Upcoming
          </h4>
        </div>
        <div>
          <h4 className="text-[#535763]">History</h4>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10 h-16 w-full">
        <ButtonNavigation />
      </div>
    </div>
  );
};

export default page;
