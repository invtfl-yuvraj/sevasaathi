"use client";

import React, { useState } from "react";

const stateCityData: Record<string, string[]> = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Karnataka: ["Bangalore", "Mysore", "Mangalore"],
  TamilNadu: ["Chennai", "Coimbatore", "Madurai"],
  Delhi: ["New Delhi", "Dwarka", "Rohini"],
};

function StateCityDropdown() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setSelectedState(newState);
    // setSelectedCity("");
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
    // setSelectedCity("");

  };

  const cityOptions = selectedState ? stateCityData[selectedState] || [] : [];

  return (
    <div className="p-2 flex justify-center items-center gap-2 w-full">
      {/* State Dropdown */}
      <select
        value={selectedState}
        onChange={handleStateChange}
        className="border rounded-lg p-4 w-full bg-slate-200"
      >
        <option value="">Select State</option>
        {Object.keys(stateCityData).map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      <select
        value={selectedCity}
        onChange={handleCityChange}
        className="border rounded-lg p-4 w-full bg-slate-200"
        disabled={!selectedState}
      >
        <option value="">Select City</option>
        {cityOptions.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}

export default StateCityDropdown;
