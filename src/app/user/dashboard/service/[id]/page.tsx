"use client";
import Link from "next/link";
import React, { useState, useCallback } from "react";
import ServiceAddCard from "@/components/ServiceAddCard";
import HeaderWithBackButton from "@/components/HeaderWithBackButton";
import ButtonNavigation from "@/components/ButtonNavigation";

const page = () => {
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [itemCounts, setItemCounts] = useState<{ [key: string]: number }>({});

  const handleItemCountChange = useCallback((id: string, count: number) => {
    setItemCounts((prevCounts) => {
      const newCounts = { ...prevCounts, [id]: count };
      const total = Object.values(newCounts).reduce(
        (acc, curr) => acc + curr,
        0
      );
      setTotalItemCount(total);
      return newCounts;
    });
  }, []);

  return (
    <div className="h-full w-screen py-4 px-6 rounded-lg bg-white flex flex-col gap-4 relative">
      <HeaderWithBackButton title="AC Services" />
      <div className="h-full w-full flex flex-col justify-between gap-4">
        <hr />
        <ServiceAddCard id="card1" onItemCountChange={handleItemCountChange} />
        <hr />
        <ServiceAddCard id="card2" onItemCountChange={handleItemCountChange} />
        <hr />
        <ServiceAddCard id="card3" onItemCountChange={handleItemCountChange} />
        <hr />
        <ServiceAddCard id="card4" onItemCountChange={handleItemCountChange} />
      </div>
      {totalItemCount >0 && (
        <div className="fixed top-0 right-0 left-0 p-4 bg-white shadow-sm z-50 font-bold flex justify-end">
        <div className="mr-4">
          <p>Total Items: {totalItemCount}</p>
          <p className="text-green-600">Total Price: ₹{totalItemCount * 299}</p>
        </div>
      </div>
      
      )}

      {totalItemCount > 0 && (
        <div className="flex mt-10 items-center justify-center">
          <Link href='/schedule'>
            <button className="border-2 py-2 px-6 border-lightpurple bg-lightpurple text-white rounded-2xl flex gap-4 font-bold">
              {" "}
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}

      <div className="fixed h-16 w-full bottom-0 left-0 right-0 z-10">
        <ButtonNavigation />
      </div>
    </div>
  );
};

export default page;
