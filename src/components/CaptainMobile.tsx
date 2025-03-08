"use client"
import React, { useState } from "react";

function CaptainMobile() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState("+1");
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("")

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const selectCountryCode = (code: string) => {
    setSelectedCode(code);
    setDropdownOpen(false);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if(!/^\d*$/.test(value)) {
        setError("Only number are allowed");
        return;
    }


    if(value.length > 10) {
        setError("Mobile number doesn't exist");
        return;

    }
    else{
        setError("");
    }


    setMobileNumber(value);
  }

  return (
    <div>
      <form className="max-w-sm mx-auto">
        <div className="flex items-center">
          <button
            type="button"
            onClick={toggleDropdown}
            className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            aria-expanded={dropdownOpen}
            aria-controls="dropdown-phone"
          >
            {selectedCode}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div
              id="dropdown-phone"
              className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-52 dark:bg-gray-700"
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => selectCountryCode("+1")}
                  >
                    🇺🇸 +1 (USA)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => selectCountryCode("+91")}
                  >
                    🇮🇳 +91 (India)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => selectCountryCode("+44")}
                  >
                    🇬🇧 +44 (UK)
                  </button>
                </li>
              </ul>
            </div>
          )}

          <input
            type="number"
            className="rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full ps-2.5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter phone number" onChange={handleChange} maxLength={10} value={mobileNumber}
          />
        </div>
      </form>
    </div>
  );
}

export default CaptainMobile;
