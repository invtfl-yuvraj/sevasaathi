import React from "react";
import SearchBar from "@/components/SearchBar";
import { FaArrowLeft } from "react-icons/fa6";

const page = () => {
  const searchPlaceholder = "Search Category";

  return (
    <div className="p-4">
      <div className="flex justify-between items-center gap-2 py-4 px-6">
          <FaArrowLeft />
          <SearchBar searchPlaceholder={searchPlaceholder} />
      </div>


      <div>
        
      </div>
    </div>
  );
};

export default page;
