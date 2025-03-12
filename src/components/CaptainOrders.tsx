import React from "react";
import Image from "next/image";

function CaptainOrders() {
  return (
    <div className="h-full w-full py-4">
      <h3 className="font-bold text-2xl tracking-wide">Orders Near You</h3>
      <div className="h-full w-full bg-lightpeach px-4  py-4 mt-5 rounded-lg">
        {/* Title and work icon */}
        <div className="flex justify-start items-center gap-4">
          <div className="bg-acrepair rounded-full p-3">
            <Image
              src="/Icon/ac_repair.png"
              alt="work_icon"
              height={30}
              width={30}
              className="object-cover"
            />
          </div>

          {/* title and reference id */}
          <div className="flex flex-col">
            <h2 className="font-bold tracking-wide font-Inter">AC Check-Up</h2>
            <p className="text-sm text-gray-500">Reference Code: #D-571224</p>
          </div>
        </div>

        {/* status */}

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-500">Status</p>
          <div className="bg-lightyellow px-2 rounded-lg">
            <p className="text-lemonyellow font-semibold">Pending</p>
          </div>

          {/* date and location */}
        </div>
        <div className="py-4 flex justify-start items-center gap-6">
          <div className="h-10 w-10 border-2 border-[#C4C4C4] rounded-full p-2">
            <Image
              src="/Icon/schedule.png"
              height={80}
              width={80}
              alt="schedule"
            />
          </div>

          <div>
            <h3 className="font-semibold font-Inter">10:00-11:00 AM, 26 Apr</h3>
            <p className="text-xs text-textgray">Schedule</p>
          </div>
        </div>

        {/* Location */}
        <div className="py-4 flex justify-start items-center gap-6">
          <div className="h-10 w-10 border-2 border-[#C4C4C4] rounded-full p-2">
            <Image
              src="/Icon/location.png"
              height={80}
              width={80}
              alt="schedule"
            />
          </div>

          <div>
            <h3 className="font-semibold font-Inter">VIT BHOPAL UNIVERSITY</h3>
            <p className="text-xs text-textgray">Address</p>
          </div>
        </div>

        <div className="h-full w-full flex justify-around items-center text-white gap-6">
            <button className="h-full w-full bg-lightgreen py-3 rounded-xl font-semibold">Accept</button>
            <button className="h-full w-full bg-lightred py-3 rounded-xl font-semibold">Reject</button>
        </div>
      </div>
    </div>
  );
}

export default CaptainOrders;
