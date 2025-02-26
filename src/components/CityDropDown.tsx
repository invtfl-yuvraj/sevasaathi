"use client";
import React from "react";
import { useState } from "react";

const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Lucknow",
  "Ahmedabad",
];

const CityDropDown = () => {
  const [selectCity, setSelectedCity] = useState("");

  return (
    <div className="">
      <select
        id="city"
        value={selectCity}
        className="border-none text-sm font-medium"
        onChange={(e) => {
          setSelectedCity(e.target.value);
        }}
      >
        <option value="" className="">
          Select a city
        </option>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CityDropDown;
