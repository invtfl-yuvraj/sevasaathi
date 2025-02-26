import React from "react";

interface Props {
  searchPlaceholder: string;
}

const SearchBar: React.FC<Props> = ({ searchPlaceholder }) => {
  return (
    <div className="flex justify-between items-center gap-4 mt-2 bg-[#FBFBFB] border-2 border-bordersearch rounded-lg">
      <div className="px-2">
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="text-[#9B9E9F] text-sm"
        ></input>
      </div>
      <div className="w-10 bg-lightpurple p-2 rounded-lg flex justify-center items-center">
        <i className="ri-search-line text-white font-semibold"></i>
      </div>
    </div>
  );
};

export default SearchBar;
