"use client";
import React, { useState, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "./Sidebar";
import { signOut } from "next-auth/react";
import { MdLocationOn } from "react-icons/md";

const DashboardHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentCity, setCurrentCity] = useState("Loading...");
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    // Check for cached city first
    const cachedCity = localStorage.getItem("userCity");
    if (cachedCity) {
      setCurrentCity(cachedCity);
      return; // Use cached city and don't attempt to get new location
    }

    // Fetch current location
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported by your browser");
      setCurrentCity("Location unavailable");
      return;
    }

    // Define success handler
    const handleSuccess = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;

      console.log("Got coordinates:", latitude, longitude);

      try {
        // For testing - use a free service that doesn't require API key
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
        );

        const data = await response.json();
        console.log("Location data:", data);

        if (data && data.address) {
          // Extract city from results
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.county ||
            "Unknown";

          console.log("Detected city:", city);
          setCurrentCity(city);
          localStorage.setItem("userCity", city);
        } else {
          setLocationError("Could not determine city name");
          setCurrentCity("Unknown location");
        }
      } catch (error) {
        console.error("Error getting city name:", error);
        setLocationError("Failed to get city name");
        setCurrentCity("Location error");
      }
    };

    // Define error handler
    const handleError = (error: GeolocationPositionError) => {
      console.error("Geolocation error:", error);

      let errorMsg = "Could not get your location";

      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMsg = "Location permission denied";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMsg = "Location unavailable";
          break;
        case error.TIMEOUT:
          errorMsg = "Location request timed out";
          break;
      }

      setLocationError(errorMsg);
      setCurrentCity("Location unavailable");
    };

    // Request location
    const locationWatcher = navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );

    // Set a timeout for geolocation
    const timeoutId = setTimeout(() => {
      setLocationError("Location request took too long");
      setCurrentCity("Location timeout");
    }, 15000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="flex justify-start items-center gap-4">
      <button>
        <GiHamburgerMenu
          className="text-2xl"
          onClick={() => setIsVisible(true)}
        />
      </button>

      <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} />

      <div className="h-full w-full flex flex-col gap-1">
        {/* Label */}
        <h4 className="uppercase text-xs text-locationcolor">
          Current Location
        </h4>
        <div className="flex items-start gap-1">
          <MdLocationOn className="text-red-500 text-lg mt-0.5" />
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-base">{currentCity}</span>
            {locationError && (
              <span className="text-xs text-red-500">({locationError})</span>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end">
        <button
          onClick={() =>
            signOut({
              callbackUrl: "/user/login",
            })
          }
          className="border-2 p-2 border-red-500 bg-red-500 text-white rounded-2xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
