"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";

const page = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function changeHandler(event: any) {
    const { name, value } = event.target;
    setLoginData((prevState) => {
      return { ...prevState, [name]: value };
    });
  }
  return (
    <div className="p-7">
      <div className="mt-[20%]">
        <h2 className="font-semibold text-3xl text-center">Sign In</h2>
      </div>

      <div className="mt-[10%]">
        <form className="flex flex-col gap-4" action="/user/verify">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-base">Email</label>
            <input
              required
              className="w-full px-4 py-2 text-lg bg-[#F5F5F5] placeholder:text-sm border-none rounded-lg"
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              value={loginData.email}
              onChange={changeHandler}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-base">Password</label>
            <input
              required
              className="w-full px-4 py-2 text-lg bg-[#F5F5F5] placeholder:text-sm border-none rounded-lg"
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={loginData.password}
              onChange={changeHandler}
            />
          </div>

          <div className="flex justify-end ">
            <p className="">
              <Link
                href="/user-forgot-password"
                className="text-lightpurple text-base"
              >
                Forgot Password?
              </Link>
            </p>
          </div>

          <button className="w-full px-4 py-2 text-base text-[#F5F5F5] bg-lightpurple rounded-lg border-none mt-2 flex flex-col justify-center items-center placeholder:text-base">
            Sign In
          </button>
        </form>

        <div className="flex flex-col mt-5 justify-center items-center ">
          <h5>Sign in with</h5>

          <div className="flex gap-4 mt-3">
            <Link href="/">
              <button className="h-12 w-12 bg-whitecolor border-2 border-lightgray flex justify-center items-center rounded-xl">
                <img
                  className="h-8 w-8 object-cover"
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                />
              </button>
            </Link>

            <Link href="/">
              <button className="h-12 w-12 bg-whitecolor border-2 border-lightgray flex justify-center items-center rounded-xl">
                <img
                  className="h-6 w-6 object-cover"
                  src="https://cdn-icons-png.flaticon.com/512/145/145802.png"
                />
              </button>
            </Link>

            <Link href="/">
              <button className="h-12 w-12 bg-whitecolor border-2 border-lightgray flex justify-center items-center rounded-xl">
                <img
                  className="h-6 w-6 object-contain"
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                />
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/">
            <button className="text-lg  w-4/5 ml-9 border-2 border-x-lightgray py-2 rounded-xl bg-whitecolor  placeholder:text-base px-4 mb-7">
              Continue As Guest
            </button>
          </Link>

          {/* <button
            onClick={() => {
              sendVerificationEmail(
                "bhartijayprakash19@gmail.com",
                "2345678",
                "Bharti Jayprakash"
              );

              console.log("button clicked")
            }}


          >
            Send Verification Code
          </button> */}
          <p className="text-center">
            Create an Account{" "}
            <Link href="/user/signup" className="text-lightpurple">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
