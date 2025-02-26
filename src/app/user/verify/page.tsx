"use client";
import React,{useState} from "react";

const Page = () => {
  const [otp, setOtp] = useState(["", "","",""]);


  

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center py-6 px-8 bg-white gap-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-semibold">Enter verification code</h2>
        <p className="text-gray-600 text-sm">
          We have sent you a 4-digit verification code on
        </p>
        <p className="text-gray-700 font-medium">+91 6267634192</p>

        <div className="flex gap-4">
          <input
            type="number"
            className="h-12 w-12 border-gray-300 border-2 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="number"
            className="h-12 w-12 border-gray-300 border-2 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="number"
            className="h-12 w-12 border-gray-300 border-2 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="number"
            className="h-12 w-12 border-gray-300 border-2 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
      <button className="bg-lightpurple text-white font-medium rounded-lg w-full h-10 transition-all duration-200">
        Login
      </button>
    </div>
  );
};

export default Page;
