import React from "react";
import SearchBar from "@/components/SearchBar";
import { FaArrowLeft } from "react-icons/fa6";
import Image from "next/image";

const page = () => {
  const searchPlaceholder = "Search Category";

  return (
    <div className="p-4 flex flex-col justify-between gap-4 h-full w-full">
      {/* Search Bar with Back Icon */}
      <div className="bg-white flex items-center h-full w-full rounded-b-lg gap-2">
        <FaArrowLeft className="cursor-pointer text-2xl" />
        <SearchBar searchPlaceholder={searchPlaceholder} />
      </div>

      {/* Categories Section */}
      <div className="px-4 py-4 items-center">
        <div className="flex gap-2 items-center">
          <div className="h-6 w-1 rounded-xl bg-[#CABDFF]"></div>
          <h2 className="text-lg font-semibold">All Categories</h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[
            { bg: "bg-acrepair", src: "/Icon/ac_repair.png", alt: "AC Repair" },
            {
              bg: "bg-appliance",
              src: "/Icon/appliance.png",
              alt: "Appliance",
            },
            { bg: "bg-painting", src: "/Icon/painting.png", alt: "Painting" },
            { bg: "bg-cleaning", src: "/Icon/cleaning.png", alt: "Cleaning" },
            { bg: "bg-plumbing", src: "/Icon/plumbing.png", alt: "Plumbing" },
            {
              bg: "bg-electronics",
              src: "/Icon/electronics.png",
              alt: "Electronics",
            },
            { bg: "bg-shifting", src: "/Icon/shifting.png", alt: "Shifting" },
          ].map((item, index) => (
            <div
              key={index}
              className={`${item.bg} aspect-square rounded-full h-16 w-16 flex justify-center items-center`}
            >
              <Image src={item.src} alt={item.alt} height={30} width={30} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
