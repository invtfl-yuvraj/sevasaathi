import React from "react";
import SearchBar from "@/components/SearchBar";

const page = () => {
  const searchPlaceholder = "Search what you need...";

  return (
    <div className="bg-gray-100 w-full flex flex-col justify-between gap-2">
      <div className="bg-white px-6 py-4 w-full rounded-b-lg">
        <SearchBar searchPlaceholder={searchPlaceholder} />
      </div>
    </div>
  );
};

export default page;
