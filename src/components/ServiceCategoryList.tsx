import React from 'react'
import ServiceCategoryCard from '@/components/ServiceCategoryCard'
import Link from 'next/link'

const ServiceCategoryList = () => {
  return (
    <div className="h-full w-full grid grid-cols-4 gap-6 py-4 px-6 rounded-lg bg-white ">
    <ServiceCategoryCard
      iconSrc={"/Icon/ac_repair.png"}
      bgColor={"#FFBC99"}
      imageAltText={"AC Repair"}
      text={"AC Repair"}
      height={24}
      width={24}
    />
    <ServiceCategoryCard
      iconSrc={"/Icon/painting.png"}
      bgColor={"#FFD700"}
      imageAltText={"Painting"}
      text={"Painting"}
      height={24}
      width={24}
    />
    <ServiceCategoryCard
      iconSrc={"/Icon/appliance.png"}
      bgColor={"#ADD8E6"}
      imageAltText={"Appliance"}
      text={"Appliance"}
      height={24}
      width={24}
    />
    <Link href="">
      <ServiceCategoryCard
        iconSrc={"/Icon/right_arrow.png"}
        bgColor={"#ECECEC"}
        imageAltText={"right arrow"}
        text={"See All"}
        height={24}
        width={24}
      />
    </Link>
  </div>
  )
}

export default ServiceCategoryList
