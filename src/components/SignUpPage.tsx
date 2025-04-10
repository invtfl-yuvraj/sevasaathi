"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUpValidation } from "@/validations/signUpValidation";
import { ZodError } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface SignupProps {
  profession: "User" | "Captain";
}

const SignUpPage: React.FC<SignupProps> = ({ profession }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  // Determine the login path based on profession
  const loginPath =
    profession.toLowerCase() === "captain" ? "/captain/login" : "/user/login";

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });

    // clearing the error message when user starts typing
    if (errors[name] || errors.api) {
      setErrors((prevState) => {
        const newState = { ...prevState };
        delete newState[name];
        return newState;
      });
    }
  }

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();

    setIsSubmitting(true);
    console.log("Form Data :", formData);

    try {
      const validatedData = signUpValidation.parse(formData);
      console.log("Validated Signup Form Data :", validatedData);

      // Include the profession in the request to handle user type in the backend
      const requestData = {
        ...validatedData,
        role: profession.toUpperCase(), // Assuming your backend expects CAPTAIN or USER
      };

      fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to register, Try again");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);

          setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });

          // Sign in the user immediately after signup
          signIn("credentials", {
            email: validatedData.email,
            password: validatedData.password,
            redirect: false,
          }).then((signInResult) => {
            if (signInResult?.error) {
              console.error("Sign-in error:", signInResult.error);
              setErrors({
                api: "Failed to log in automatically. Please log in manually.",
              });
            } else {
              // Now that the user is authenticated, redirect to verification page
              // Use the profession to determine the correct route
              const verifyPath =
                profession.toLowerCase() === "captain"
                  ? `/captain/verifyemail/${validatedData.email}`
                  : `/user/verifyemail/${validatedData.email}`;

              router.push(verifyPath);
            }
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          setErrors({ api: "Failed to register. Please try again." });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error("Validation Error:", error);
        setErrors({ form: "Invalid form data. Please check your inputs." });
      }
      console.log("Error:", error);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-6">
      <div className="object-cover flex justify-center items-center">
        <Image src="/Icon/logo.png" height={200} width={200} alt=""></Image>
      </div>
      <div>
        <h2 className="text-2xl font-semibold tracking-wide text-center">
          Create New {profession} Account
        </h2>
      </div>

      <div className="mt-[10%]">
        <form
          className="flex flex-col justify-center items-center w-full h-1/2 gap-6"
          onSubmit={submitHandler}
        >
          {/* Username */}
          <div className="flex flex-col justify-evenly w-full">
            <label className="text-base font-medium mb-2" htmlFor="username">
              Enter your Full Name
            </label>
            <input
              required
              className={`text-lg w-full border-none py-2 rounded bg-[#eeeeee] placeholder:text-base px-4 ${
                errors.username ? "border-2 border-red-500" : ""
              }`}
              type="text"
              placeholder="Full Name"
              name="username"
              id="username"
              value={formData.username}
              onChange={changeHandler}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col justify-evenly w-full">
            <label className="text-base font-medium mb-2" htmlFor="email">
              Enter your Email
            </label>
            <input
              required
              className={`text-lg w-full border-none py-2 rounded bg-[#eeeeee] placeholder:text-base px-4 ${
                errors.email ? "border-2 border-red-500" : ""
              }`}
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              value={formData.email}
              onChange={changeHandler}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1"> {errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col justify-evenly w-full">
            <label className="text-base font-medium mb-2" htmlFor="password">
              Enter your Password
            </label>
            <div className="relative">
              <input
                required
                className={`text-lg w-full border-none py-2 rounded bg-[#eeeeee] placeholder:text-base px-4 ${
                  errors.password ? "border-2 border-red-500" : ""
                }`}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                id="password"
                value={formData.password}
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
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col justify-evenly w-full">
            <label
              className="text-base font-medium mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                required
                className={`text-lg w-full border-none py-2 rounded bg-[#eeeeee] placeholder:text-base px-4 ${
                  errors.confirmPassword ? "border-2 border-red-500" : ""
                }`}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={changeHandler}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {errors.form && (
            <p className="text-red-500 text-sm mt-1 w-full">{errors.form}</p>
          )}
          {errors.api && (
            <p className="text-red-500 text-sm mt-1 w-full">{errors.api}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#6759FF] text-white mt-2 border-none rounded-lg py-2 placeholder:text-base flex flex-col justify-center items-center mb-2 px-4 text-base disabled:bg-opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center">
          Already have an account?{" "}
          <Link href={loginPath} className="text-lightpurple">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
