"use client"

import React from "react";

interface Props{
    maintitle : string,
    subtitle : string,
    bg : string
}

const ItemCard = ({maintitle, subtitle, bg} : Props) => {
  return (
    <div className="h-full w-full flex flex-col justify-between gap-2">
      {/* Image for sqaure div */}
      <div className={`w-20 aspect-square ${bg} rounded-lg`}></div>

      <div>
        {/* Service Title */}
        <h3 className="font-semibold ">{maintitle}</h3>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default ItemCard;
