import React from "react";
import Link from "next/link";


const page = () => {
  const [fullname, setFullName] = React.useState("");
  return (
    <div className="p-7">
      <div>
        <h2 className="text-2xl font-semibold tracking-wide text-center mt-[10%]">
          Create New Account
        </h2>
      </div>

      <div className="mt-[10%]">
        <form>
          <h3 className="text-base font-medium mb-2" >Enter your Full Name</h3>

          <div className="flex gap-3 mb-5">
            <input
              required
              className="text-lg w-full border-none py-2 rounded bg-[#eeeeee] placeholder:text-base mb-7 px-4"
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
          </div>

          <div className="mt-[-22px]">
            <h3 className="text-base font-medium mb-2">Enter your Email</h3>
            <input
              required
              className="text-lg  w-full border-none py-2  rounded  bg-[#eeeeee] placeholder:text-base px-4 mb-10"
              type="email"
              placeholder="email"
            />
          </div>

          <div className="mt-[-20px]">
            <h3 className="text-base font-medium mb-2">Enter your Password</h3>
            <input
              required
              className="text-lg  w-full border-none py-2 rounded  bg-[#eeeeee] placeholder:text-base px-4 mb-7"
              type="password"
              placeholder="password"
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
