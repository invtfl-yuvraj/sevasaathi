"use client";

import React, { useState } from "react";

type Service = {
  id: string;
  status: "Pending" | "Completed";
  title: string;
  price: number;
  discount: number;
  location: string;
  date: string;
  time: string;
  customer: string;
  image: string;
};

const mockServices: Service[] = [
  {
    id: "#123",
    status: "Pending",
    title: "Window Cleaning",
    price: 120,
    discount: 21,
    location: "Kahi pe to karna hai...",
    date: "31 February, 2022",
    time: "8:30 AM",
    customer: "Pranay Shaurya",
    image: "/window.jpg",
  },
  {
    id: "#124",
    status: "Completed",
    title: "Home Cleaning",
    price: 400,
    discount: 21,
    location: "VIT mein ghar toh nahi hai lekin kar do...",
    date: "28 February, 2025",
    time: "8:30 AM",
    customer: "Bharti Jayprakash",
    image: "/home.jpg",
  },
];

export default function ServiceFilter() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredServices =
    selectedFilter === "All"
      ? mockServices
      : mockServices.filter((service) => service.status === selectedFilter);

  return (
    <div className="p-4">
      <div className="mb-4">
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="border px-4 py-2 rounded-lg bg-slate-100"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="border p-4 rounded-lg shadow bg-white space-y-2"
          >
            <div className="flex justify-between">
              <span
                className={`px-2 py-1 text-xs rounded ${
                  service.status === "Pending"
                    ? "bg-red-200 text-red-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {service.status}
              </span>
              <span className="text-xs font-semibold text-violet-600">
                {service.id}
              </span>
            </div>
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-40 object-cover rounded"
            />
            <div className="text-lg font-bold">{service.title}</div>
            <div className="text-blue-600 font-semibold text-xl">
              ₹{service.price}{" "}
              <span className="text-green-600 text-sm">
                {service.discount}% Off
              </span>
            </div>
            <div className="text-sm text-gray-500">{service.location}</div>
            <div className="text-sm text-gray-500">
              📅 {service.date} ⏰ {service.time}
            </div>
            <div className="text-sm text-gray-700">👤 {service.customer}</div>

            <div className="flex gap-4 mt-2">
              <button className="bg-violet-600 text-white px-4 py-2 rounded-lg">
                Accept
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
