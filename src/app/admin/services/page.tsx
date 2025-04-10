// pages/admin/services.js
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  FaUser,
  FaUsers,
  FaDesktop,
  FaAirFreshener,
  FaWater,
  FaPhone,
  FaCalendarAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import PipeCleaningCard from "@/components/PipeliningCard";

export default function ServicesDashboard() {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "AC Check-Up",
      referenceCode: "ID-571224",
      status: "Pending",
      schedule: "10:00-11:00 AM, 26 Apr",
      assigned: null,
      icon: <FaAirFreshener />,
    },
    {
      id: 2,
      name: "Pipe Cleaning",
      referenceCode: "ID-571224",
      status: "Confirmed",
      schedule: "00:00-01:00 AM, 14 Feb",
      assigned: "Srijan Maurya",
      icon: <FaWater />,
    },
  ]);

  // State for mobile sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Set sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <Head>
        <title>Services | Seva Sathi</title>
      </Head>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b">
        <div className="flex justify-between gap-8">
          {/* <img src="/seva-sathi-logo.svg" alt="Seva Sathi Logo" className="h-8 mr-2" /> */}
          <button
            onClick={toggleSidebar}
            className="text-gray-600 focus:outline-none"
          >
            {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <div className="">
            <h1 className="text-lg font-bold text-blue-800">Seva Sathi</h1>
            <p className="text-xs text-gray-600">Empowering Rural Services</p>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 transform transition-transform duration-300 ease-in-out
          fixed md:relative z-40 bg-white border-r w-64 md:w-64 h-full overflow-y-auto
        `}
      >
        {/* Logo and Brand (hidden on mobile) */}
        <div className="p-4 border-b hidden md:flex items-center">
          <img
            src="/seva-sathi-logo.svg"
            alt="Seva Sathi Logo"
            className="h-12 mr-3"
          />
          <div>
            <h1 className="text-lg font-bold text-blue-800">Seva Sathi</h1>
            <p className="text-xs text-gray-600">Empowering Rural Services</p>
          </div>
        </div>

        {/* Dashboard Link */}
        <div className="p-4 border-b">
          <Link
            href="/admin/dashboard"
            className="flex items-center p-2 text-gray-700"
          >
            <FaDesktop className="mr-3" />
            <span className="font-medium">Dashboard</span>
          </Link>
        </div>

        {/* User Details Section */}
        <div className="p-4">
          <h2 className="text-sm font-medium text-gray-600 mb-4">
            User Details
          </h2>

          {/* Admin Link */}
          <div className="mb-4">
            <Link
              href="/admin/users"
              className="flex items-center px-2 py-3 text-gray-700 border-l-4 border-white"
            >
              <FaUser className="mr-3 text-gray-500" />
              <span>Admin</span>
              <span className="ml-auto bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full">
                8
              </span>
            </Link>
          </div>

          {/* Partners Link */}
          <div className="mb-4">
            <Link
              href="/admin/partners"
              className="flex items-center px-2 py-3 text-gray-700 border-l-4 border-white"
            >
              <FaUsers className="mr-3 text-gray-500" />
              <span>Partners</span>
              <span className="ml-auto bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full">
                15
              </span>
            </Link>
          </div>

          {/* Services Link (Active) */}
          <div>
            <Link
              href="/admin/services"
              className="flex items-center px-2 py-3 bg-red-200 text-gray-700 rounded-md"
            >
              <FaDesktop className="mr-3 text-gray-500" />
              <span>Services</span>
              <span className="ml-auto bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                12
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed md:hidden inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Breadcrumb */}
        <div className="bg-red-50 p-4">
          <div className="text-sm">
            <Link
              href="/admin/dashboard"
              className="text-red-500 hover:underline"
            >
              Home
            </Link>
            <span className="mx-2">&gt;</span>
            <Link
              href="/admin/services"
              className="text-red-500 hover:underline"
            >
              Services
            </Link>
          </div>
        </div>

        {/* Service Cards */}
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* AC Check-Up Card */}
            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <div className="bg-red-200 p-3 rounded-full mr-3">
                  <FaAirFreshener className="text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium">AC Check-Up</h3>
                  <p className="text-sm text-gray-500">
                    Reference Code: ID-571224
                  </p>
                </div>
              </div>

              <div className="mb-4 flex justify-between">
                <p className="text-sm text-gray-500">Status</p>
                <p className="text-sm text-yellow-600 bg-yellow-50 p-2">
                  Pending
                </p>
              </div>

              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-gray-400 mr-2" />
                <div>
                  <p className="font-medium">10:00-11:00 AM, 26 Apr</p>
                  <p className="text-sm text-gray-500">Schedule</p>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
                  <span className="mr-2">Assign</span>
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded flex items-center">
                  <FaPhone className="mr-2" />
                  Call
                </button>
              </div>
            </div>

            {/* Pipe Cleaning Card */}

            <PipeCleaningCard />
          </div>
        </div>
      </div>
    </div>
  );
}
