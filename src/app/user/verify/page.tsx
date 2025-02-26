"use client";
import React, { useState } from "react";
import Link from "next/link";

const Page = () => {
  const [otp, setOtp] = useState(["", "", "", "","",""]);

  /**
   * Handles OTP input changes
   * @param {number} index - The index of the OTP input field
   * @param {object} event - The input event object
   */
  const handleChange = (index, event) => {
    const value = event.target.value;
    if (!/^\d?$/.test(value)) return; 

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // moving to next block if digits are entered continuously
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  /**
   * Handles keydown events for backspace navigation
   * @param {number} index - The index of the OTP input field
   * @param {object} event - The keyboard event object
   */

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center py-6 px-4 bg-white gap-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-semibold">Enter verification code</h2>
        <p className="text-gray-600 text-sm">
          We have sent you a 4-digit verification code on
        </p>
        <p className="text-gray-700 font-medium">+91 6267634192</p>

        {/* OTP Input Fields */}
        <div className="flex gap-2 justify-center items-center py-6">
          {otp.map((data, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              className="h-12 w-12 border-gray-300 border-2 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={data}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
      </div>

      {/* Login Button */}
      <Link href="/user/dashboard" className="w-full">
          <button className="bg-lightpurple text-white font-medium rounded-lg w-full h-10 transition-all duration-200">
            Login
          </button>
      </Link>
    </div>
  );
};

export default Page;
