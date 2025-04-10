"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RiSearchLine } from "react-icons/ri";

interface Props {
  searchPlaceholder: string;
}

const SearchBar: React.FC<Props> = ({ searchPlaceholder }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch suggestions when typing
  const fetchSuggestions = async (keyword: string) => {
    if (!keyword.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/search-services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword }),
      });

      const data = await res.json();
      if (data.success) {
        setSuggestions(data.suggestions || []);
        setShowSuggestions(true);
      }
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchSuggestions(value);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/services/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    router.push(`/services/search?q=${encodeURIComponent(suggestion)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Click outside to hide suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(e.target as Node) &&
        inputRef.current !== e.target
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full">
      <div className="h-full w-full flex justify-between items-center gap-4 mt-2 bg-[#FBFBFB] border-2 border-bordersearch rounded-lg py-2 px-4">
        <input
          ref={inputRef}
          type="text"
          placeholder={searchPlaceholder}
          className="h-full w-full text-black text-sm bg-transparent outline-none"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSearch}
          className="w-1/5 h-10 bg-lightpurple rounded-lg flex justify-center items-center"
        >
          <RiSearchLine className="text-white text-lg" />
        </button>
      </div>

      {showSuggestions && searchTerm && (
        <div
          ref={resultsRef}
          className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-4 text-sm text-gray-500 text-center">Loading...</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((s, i) => (
              <div
                key={i}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(s)}
              >
                {s}
              </div>
            ))
          ) : (
            <div className="p-4 text-sm text-gray-500 text-center">
              No suggestions found for "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
