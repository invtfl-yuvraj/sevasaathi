"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  // const router = useRouter();

  function changeHandler(event: any) {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  function submitHandler(event : any){
    event.preventDefault();
    console.log("Form Data :", formData);
    setFormData({
      fullname : "",
      email : "",
      password : ""
    })

    // router.push(`/user/verifyemail/${formData.email}`);
    
  }

  return (
    <div className="p-7">
      <div>
        <h2 className="text-2xl font-semibold tracking-wide text-center mt-[10%]">
          Create New Account
        </h2>
      </div>

      <div className="mt-[10%]">
        <form
          className="flex flex-col justify-center items-center w-full h-1/2 gap-6"
          action={`/user/verifyemail/${formData.email}`} onSubmit={submitHandler}
        >
          <div className="flex flex-col justify-evenly w-full">
            <label className="text-base font-medium mb-2" htmlFor="fullname">
              Enter your Full Name
            </label>
            <input
              required
              className="text-lg w-full border-none py-2 rounded bg-[#eeeeee] placeholder:text-base px-4"
              type="text"
              placeholder="Full Name"
              name="fullname"
              id="fullname"
              value={formData.fullname}
              onChange={changeHandler}
            />
          </div>

          <div className="flex flex-col justify-evenly w-full">
            <label className="text-base font-medium mb-2" htmlFor="email">
              Enter your Email
            </label>
            <input
              required
              className="text-lg  w-full border-none py-2  rounded  bg-[#eeeeee] placeholder:text-base px-4"
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              value={formData.email}
              onChange={changeHandler}
            />
          </div>

          <div className="flex flex-col justify-evenly w-full">
            <label className="text-base font-medium mb-2" htmlFor="password">
              Enter your Password
            </label>
            <input
              required
              className="text-lg  w-full border-none py-2 rounded  bg-[#eeeeee] placeholder:text-base px-4"
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={formData.password}
              onChange={changeHandler}
            />
          </div>

          <button className="w-full bg-[#6759FF] text-white mt-2 border-none rounded-lg py-2 placeholder:text-base flex flex-col justify-center items-center mb-2 px-4 text-base">
            Create Account
          </button>
        </form>

        <p className="text-center">
          Already have an account?{" "}
          <Link href="/user/login" className="text-lightpurple">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
