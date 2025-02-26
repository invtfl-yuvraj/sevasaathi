import React from "react";
import SearchBar from "@/components/SearchBar";
import { FaArrowLeft } from "react-icons/fa6";
import Image from "next/image";
import HeaderWithBackButton from "@/components/HeaderWithBackButton";

const page = () => {
  const searchPlaceholder = "Search Category";

  return (
    <div className="p-4 flex flex-col justify-between gap-4 h-full w-full">
        <HeaderWithBackButton title="All Categories"/>
      {/* Search Bar with Back Icon */}
      <div className="bg-white flex items-center h-full w-full rounded-b-lg gap-2">
        <SearchBar searchPlaceholder={searchPlaceholder} />
      </div>

      {/* Categories Section */}
      <div className="px-4 py-4 items-center">
       

        {/* Categories Grid */}
        <div className="grid grid-cols-3 gap-4 mt-4">

          {[
            { bg: "bg-acrepair", src: "/Icon/ac_repair.png", alt: "AC Repair" },
            {
              bg: "bg-appliance",
              src: "/Icon/appliance.png",
              alt: "Appliance",
            },
            { bg: "bg-green2", src: "/Icon/painting.png", alt: "Painting" },
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
