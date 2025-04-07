import React from "react";
import { RiSearchLine } from "react-icons/ri"; // Import the search icon

interface Props {
  searchPlaceholder: string;
}

const SearchBar: React.FC<Props> = ({ searchPlaceholder }) => {
  return (
    <div className="h-full w-full flex justify-between items-center gap-4 mt-2 bg-[#FBFBFB] border-2 border-bordersearch rounded-lg py-2 px-4">
      <input
        type="text"
        placeholder={searchPlaceholder}
        className="h-full w-full text-black text-sm bg-transparent outline-none"
      />
      <div className="w-1/5 h-10 bg-lightpurple rounded-lg flex justify-center items-center">
        <RiSearchLine className="text-white text-lg" />
      </div>
    </div>
  );
};

export default SearchBar;