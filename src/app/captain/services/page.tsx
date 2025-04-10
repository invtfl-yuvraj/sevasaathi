// pages/services.js
"use client";
import { useState } from "react";
import { ArrowLeft, MapPin, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CaptainButtonNavigation from "@/components/CaptainButtonNavigation";
import { useRouter } from "next/navigation";

export default function Services() {
    const router = useRouter();
  const [status, setStatus] = useState("Pending");

  const services = [
    {
      id: 123,
      title: "Window Cleaning",
      price: 120,
      discount: "21% Off",
      location: "Kahi pe to karna hai...",
      date: "31 Febuary, 2025",
      time: "8:30 AM",
      provider: "Pranay Shaurya",
      image: "/Icon/Window Cleaning.jpeg",
    },
    {
      id: 124,
      title: "Sofa Cleaning", // This service doesn't have an explicit title in the UI
      price: 400,
      discount: "25% Off",
      location: "VIT mein ghar toh nahi hai lekin kar do...",
      date: "28 Febuary, 2025",
      time: "8:30 AM",
      provider: "Bharti Jayprakash",
      image: "/Icon/Sofa Cleaning.png",
    },
    {
      id: 125,
      title: "TV Repair",
      price: 420,
      discount: "69% Off",
      location: "Mars, Solar System, Milky Way",
      date: "",
      time: "",
      provider: "",
      image: "/Icon/TV Repair.png",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4  flex flex-col gap-4">
        <Link href="/captain/dashboard" className="text-gray-800">
          <ArrowLeft size={24}/>
        </Link>
        <div className="h-full w-full flex items-center gap-2">
          <div className="h-8 w-1 rounded-xl bg-[#FFA3A3]"></div>
          <h2 className="text-xl font-bold">Most Booked Services</h2>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="rounded-lg p-4 ">
          {/* Status Dropdown */}
          <div className="bg-slate-100 p-4 rounded-md mb-4">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-transparent text-gray focus:outline-none text-lg tracking-wide"
            >
              <option className="text-lg tracking-wide">All</option>
              <option className="text-lg tracking-wide">Pending</option>
              <option className="text-lg tracking-wide">Completed</option>
              <option className="text-lg tracking-wide">Cancelled</option>
            </select>
          </div>

          {/* Service Cards */}
          <div className="space-y-4 border-2 p-2">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm border"
              >
                {service.image && (
                  <div className="relative h-40 w-full">
                    <Image
                      src={service.image}
                      alt={service.title}
                      layout="fill"
                      objectFit="cover"

                    />
                  </div>
                )}

                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-medium">{service.title}</h3>
                    {service.id && (
                      <span className="bg-lightpurple text-white rounded-full px-3 py-1 text-sm">
                        #{service.id}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl font-semibold text-lightpurple">
                      ₹{service.price}
                    </span>
                    {service.discount && (
                      <span className="text-green text-sm font-semibold">
                        {service.discount}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 text-[#6C757D]">
                      {service.location && (
                        <div className="flex items-start space-x-2 text-gray-600 mb-1">
                          <MapPin size={18} className="flex-shrink-0 mt-1 text-black" />
                          <span className="text-sm">{service.location}</span>
                        </div>
                      )}
                      {service.date && (
                        <div className="flex items-center space-x-2 text-gray-600 mb-1">
                          <Calendar size={18} className="flex-shrink-0  text-black" />
                          <span className="text-sm">
                            {service.date} {service.time}
                          </span>
                        </div>
                      )}
                      {service.provider && (
                        <div className="flex items-center space-x-2 text-gray-600 mb-3">
                          <User size={18} className="flex-shrink-0  text-black" />
                          <span className="text-sm">{service.provider}</span>
                        </div>
                      )}
                  </div>

                  <div className="pt-3 flex space-x-2 border-t-2">
                    <button className="bg-lightpurple text-white rounded py-2 px-4 flex-1 font-medium">
                      Accept
                    </button>
                    <button className="bg-slate-200 text-gray-800 rounded py-2 px-4 flex-1 font-medium">
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <CaptainButtonNavigation />
    </div>
  );
}
