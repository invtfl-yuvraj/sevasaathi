"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInValidation } from "@/validations/signInValidation";
import { ZodError } from "zod";
import { signIn } from "next-auth/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));

    if (errors[name] || errors.api) {
      setErrors((prevState) => {
        const newState = { ...prevState };
        delete newState[name];
        delete newState.api;
        return newState;
      });
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = signInValidation.parse(loginData);

      const result = await signIn("credentials", {
        email: validatedData.email,
        password: validatedData.password,
        redirect: false,
      });

      if (result?.error) {
        setErrors({ api: "Invalid email or password. Please try again." });
      } else {
        setLoginData({ email: "", password: "" });
        router.push("/user/dashboard");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error("Unexpected error:", error);
        setErrors({ form: "Something went wrong. Please try again." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-7">
      <div className="mt-[20%]">
        <h2 className="font-semibold text-3xl text-center">Login Here</h2>
      </div>

      <div className="mt-[10%]">
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-base" htmlFor="email">
              Enter your Email
            </label>
            <input
              required
              className={`w-full px-4 py-2 text-lg bg-[#F5F5F5] placeholder:text-sm border-none rounded-lg ${
                errors.email ? "border-2 border-red-500" : ""
              }`}
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              value={loginData.email}
              onChange={changeHandler}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1"> {errors.email}</p>
            )}
          </div>

          {/* Password */}

          <div className="flex flex-col gap-2">
            <label className="font-medium text-base" htmlFor="password">
              Enter your Password
            </label>
            <div className="relative">
              <input
                required
                className={`w-full px-4 py-2 text-lg bg-[#F5F5F5] placeholder:text-sm border-none rounded-lg ${
                  errors.password ? "border-2 border-red-500" : ""
                }`}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                id="password"
                value={loginData.password}
                onChange={changeHandler}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1"> {errors.password}</p>
            )}
          </div>

          {errors.form && (
            <p className="text-red-500 text-sm mt-1 w-full">{errors.form}</p>
          )}
          {errors.api && (
            <p className="text-red-500 text-sm mt-1 w-full"> {errors.api}</p>
          )}

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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 text-base text-[#F5F5F5] bg-lightpurple rounded-lg border-none mt-2 flex flex-col justify-center items-center placeholder:text-base  disabled:bg-opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
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

export default LoginPage;
