"use client";
import React, { useState } from "react";
import Image from "next/image";
import OnBoardingScreen from "@/components/OnBoardingScreen";
import Link from "next/link";
import FindServicePage from "@/components/FindServicePage";
import BookTheAppointment from "@/components/BookTheAppointment";
import PaymentGateway from "@/components/PaymentGateway";
import HomePage from "@/components/HomePage";

function Page() {
  const [currentPage, setCurrentPage] = useState("onboarding");

  const handleGetStarted = () => {
    setCurrentPage("findService");
  };

  const handleSkip = () => {
    // Navigate based on current page
    if (currentPage === "findService") {
      setCurrentPage("bookAppointment");
    } else if (currentPage === "bookAppointment") {
      setCurrentPage("paymentGateway");
    } else if (currentPage === "paymentGateway") {
      setCurrentPage("home");
    }
  };

  // Handle navigation to next page
  const handleNext = () => {
    if (currentPage === "onboarding") {
      setCurrentPage("findService");
    } else if (currentPage === "findService") {
      setCurrentPage("bookAppointment");
    } else if (currentPage === "bookAppointment") {
      setCurrentPage("paymentGateway");
    } else if (currentPage === "paymentGateway") {
      setCurrentPage("home");
    }
  };

  // Function to handle the text button click
  const handleTextButtonClick = () => {
    if (currentPage === "onboarding") {
      handleGetStarted();
    } else if (currentPage !== "home") {
      handleSkip();
    }
  };

  // Check if we're on the homepage
  const isHomePage = currentPage === "home";

  return (
    <div className="h-full w-full">
      <div className="h-screen w-full overflow-hidden bg-white relative">
        {/* SVG Background - Only show when not on homepage */}
        {!isHomePage && (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 375 812"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 right-0 z-0"
          >
            {/* Large purple circle in top right */}
            <circle cx="490" cy="180" r="420" fill="#d9c6ff" />
            {/* Progress dots at bottom */}
            <g transform="translate(32, 760)">
              {/* Dots change based on current page */}
              {currentPage === "onboarding" ? (
                <>
                  <rect
                    x="0"
                    y="0"
                    width="20"
                    height="8"
                    rx="4"
                    fill="#7b52ff"
                  />
                  <circle cx="36" cy="4" r="4" fill="#d9d9d9" />
                  <circle cx="52" cy="4" r="4" fill="#d9d9d9" />
                  <circle cx="68" cy="4" r="4" fill="#d9d9d9" />
                </>
              ) : currentPage === "findService" ? (
                <>
                  <circle cx="4" cy="4" r="4" fill="#d9d9d9" />
                  <rect
                    x="20"
                    y="0"
                    width="20"
                    height="8"
                    rx="4"
                    fill="#7b52ff"
                  />
                  <circle cx="52" cy="4" r="4" fill="#d9d9d9" />
                  <circle cx="68" cy="4" r="4" fill="#d9d9d9" />
                </>
              ) : currentPage === "bookAppointment" ? (
                <>
                  <circle cx="4" cy="4" r="4" fill="#d9d9d9" />
                  <circle cx="20" cy="4" r="4" fill="#d9d9d9" />
                  <rect
                    x="36"
                    y="0"
                    width="20"
                    height="8"
                    rx="4"
                    fill="#7b52ff"
                  />
                  <circle cx="68" cy="4" r="4" fill="#d9d9d9" />
                </>
              ) : currentPage === "paymentGateway" ? (
                // For payment gateway page
                <>
                  <circle cx="4" cy="4" r="4" fill="#d9d9d9" />
                  <circle cx="20" cy="4" r="4" fill="#d9d9d9" />
                  <circle cx="36" cy="4" r="4" fill="#d9d9d9" />
                  <rect
                    x="52"
                    y="0"
                    width="20"
                    height="8"
                    rx="4"
                    fill="#7b52ff"
                  />
                </>
              ) : (
                <>
                  <circle cx="4" cy="4" r="4" fill="#d9d9d9" />
                  <circle cx="20" cy="4" r="4" fill="#d9d9d9" />
                  <circle cx="36" cy="4" r="4" fill="#d9d9d9" />
                  <circle cx="52" cy="4" r="4" fill="#d9d9d9" />
                </>
              )}
            </g>

            {/* Button text at bottom */}
            <text
              x="325"
              y="764"
              fontFamily="Arial, sans-serif"
              fontSize="20"
              fontWeight="bold"
              textAnchor="end"
              fill="#7b52ff"
              style={{ cursor: "pointer" }}
              onClick={handleTextButtonClick}
            >
              {currentPage === "onboarding" ? "Get Started" : "Skip"}
            </text>
          </svg>
        )}

        {/* Component rendering based on current page */}
        {isHomePage ? (
          // For HomePage, render with full screen and no extra styling
          <div className="w-full h-full">
            <HomePage />
          </div>
        ) : (
          // For onboarding screens, keep original styling
          <div className="absolute z-10 p-6 inset-2 flex items-center justify-center my-[40%]">
            {currentPage === "onboarding" ? (
              <div
                onClick={handleGetStarted}
                style={{ cursor: "pointer", width: "100%", height: "100%" }}
              >
                <OnBoardingScreen />
              </div>
            ) : currentPage === "findService" ? (
              <div
                onClick={handleNext}
                style={{ cursor: "pointer", width: "100%", height: "100%" }}
              >
                <FindServicePage />
              </div>
            ) : currentPage === "bookAppointment" ? (
              <div
                onClick={handleNext}
                style={{ cursor: "pointer", width: "100%", height: "100%" }}
              >
                <BookTheAppointment />
              </div>
            ) : currentPage === "paymentGateway" ? (
              <div style={{ width: "100%", height: "100%" }}>
                <PaymentGateway />
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
