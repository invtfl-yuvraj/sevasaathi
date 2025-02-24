import React from "react";

const page = () => {
  return (
    <div className="p-7">
      <div className="mt-[20%]">
        <h2 className="font-semibold text-3xl text-center">Sign In</h2>
      </div>

      <div className="mt-[10%]">
        <form className="flex flex-col gap-3">
          <h3 className="font-medium text-base">Email</h3>

          <div className="flex gap-2">
            <input
              required
              className="w-full px-4 py-2 text-lg bg-[#F5F5F5] placeholder:text-sm border-none rounded-lg"
              type="email"
              placeholder="Email"
            />
          </div>

          <div className="">
            <h3 className="font-medium text-base mb-2">Password</h3>
            <input
              required
              className="w-full px-4 py-2 text-lg bg-[#F5F5F5] placeholder:text-sm border-none rounded-lg"
              type="password"
              placeholder="Password"
            />
          </div>

          <button className="w-full px-4 py-2 text-base text-[#F5F5F5] bg-[#6759FF] rounded-lg border-none mt-2 flex flex-col justify-center items-center placeholder:text-base">
            Sign In
          </button>
        </form>



        
      </div>
    </div>
  );
};

export default page;
