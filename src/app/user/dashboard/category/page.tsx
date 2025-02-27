"use client";

import React, { useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import HeaderWithBackButton from "@/components/HeaderWithBackButton";
import ServiceCategoryCard from "@/components/ServiceCategoryCard";
import { useRouter } from "next/navigation";

interface Category {
  name: string;
  bg: string;
  src: string;
  alt: string;
}

const page = () => {
  const searchPlaceholder = "Search Category";
  const router = useRouter();

  const [currService, setCurrService] = React.useState("");


  useEffect(() => {
    if (currService) {
      router.push(`/user/dashboard/service/${currService}`);
    }
  }, [currService]);

  const handleCategorySelect = (serviceName: string) => {
    setCurrService(serviceName);
  };

  return (
    <div className="p-4 flex flex-col justify-between gap-4 h-full w-full">
      <HeaderWithBackButton title="All Categories" />
      {/* Search Bar with Back Icon */}

      <SearchBar searchPlaceholder={searchPlaceholder} />

      {/* Categories Section */}
      <div className="px-4 py-4 items-center">
        {/* Categories Grid */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[
            { name: "service-acrepair", bg: "bg-acrepair", src: "/Icon/ac_repair.png", alt: "AC Repair" },
            { name: "service-appliance", bg: "bg-appliance", src: "/Icon/appliance.png", alt: "Appliance" },
            { name: "service-painting", bg: "bg-green2", src: "/Icon/painting.png", alt: "Painting" },
            { name: "service-cleaning", bg: "bg-cleaning", src: "/Icon/cleaning.png", alt: "Cleaning" },
            { name: "service-plumbing", bg: "bg-plumbing", src: "/Icon/plumbing.png", alt: "Plumbing" },
            { name: "service-electronics", bg: "bg-electronics", src: "/Icon/electronics.png", alt: "Electronics"},
            { name: "service-shifting", bg: "bg-shifting", src: "/Icon/shifting.png", alt: "Shifting" },
          ].map((item, index) => (
            <div
              key={index}
              className={`${item.name} h-full w-full`}
              onClick={() => handleCategorySelect(item.name)}
            >
              <ServiceCategoryCard
            iconSrc={item.src}
            bgColor={item.bg}
            imageAltText={item.alt}
            text={item.alt}
            height={24}
            width={24}
          />
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
