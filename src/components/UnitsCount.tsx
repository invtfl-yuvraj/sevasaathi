"use client";
import React from "react";
import { useState } from "react";
import { RiSubtractLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";

function UnitsCount() {
  const [count, setCount] = useState(0);
  const [isPlusClicked, setIsPlusClicked] = useState(false);
  const [isMinusClicked, setIsMinusClicked] = useState(false);
  function incrementCount() {
    setCount(count + 1);
    setIsPlusClicked(true);
    setTimeout(() => setIsPlusClicked(false), 300);
  }
  function decrementCount() {
    if (count > 0) {
      setCount(count - 1);
    }
    setIsMinusClicked(true);
    setTimeout(() => setIsMinusClicked(false), 300);
  }

  return (
    <div className="h-full w-full py-6 px-4 bg-white rounded-xl">
      {/* Number of Units */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl">Number of Units</h3>
        <div className="flex justify-center items-center gap-4 font-semibold">
          <button
            className={`h-14 w-14 border-2  rounded-2xl flex justify-center items-center text-2xl transition-colors ${isMinusClicked ? "border-lightpurple text-lightpurple " : "border-lightgray text-black"}`}
            onClick={decrementCount}
          >
            <RiSubtractLine />
          </button>
          <p className="text-2xl">{count}</p>
          <button
            className={`h-14 w-14 border-2 border-lightgray rounded-2xl flex justify-center items-center text-2xl ${isPlusClicked ? "border-lightpurple text-lightpurple" : "border-lightgray"}`}
            onClick={incrementCount}
          >
            <FaPlus className="" />
          </button>
        </div>
      </div>


    </div>
  );
}

export default UnitsCount;
