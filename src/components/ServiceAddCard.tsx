import React from "react";
import Link from "next/link";
import Image from "next/image";

function ServiceAddCard() {
  return (
    <div className="h-full w-full flex justify-between ">
      <div className="relative w-40 h-32 bg-gray-400 rounded-lg">
        <Image src="https://previews.123rf.com/images/lacheev/lacheev2203/lacheev220300467/183798923-portrait-of-happy-handsome-moustached-ac-maintenance-service-worker-holding-screwdriver-looking-at.jpg"
        alt="AC Check-Up Service" fill className="object-cover object-right rounded-lg" />
      </div>

      <div className="h-full w-full flex flex-col justify-start px-4 gap-2 py-2">
        <h3 className="font-semibold ">AC Check-Up</h3>
        <div className="h-full w-full flex justify-between items-center">
          <div className="">
            <p className="text-gray-500 inline-block">Starts from</p>
            <br />
            <p className="bg-green2 p-2 mt-2 rounded-xl font-bold inline-block">
              <span>₹400</span>
            </p>
          </div>
          <Link href="/user/login">
            <button className="border-2 py-2 px-6 border-lightpurple text-lightpurple rounded-2xl">
              Add
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ServiceAddCard;
