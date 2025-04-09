"use client";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import { useRandomColor } from "@/hooks/useRandomColor";
import ItemCard from "./ItemCard";

interface Captain {
  id: string;
  name: string;
  email: string;
  service: string;
  rating: number;
  experience: string;
}

export default function TopRatedPartners() {
  const { allColors } = useRandomColor();

  const [captains, setCaptains] = useState<Captain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopCaptains = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/top-partners");

        if (!response.ok) {
          throw new Error("Failed to fetch top partners");
        }

        const result = await response.json();

        if (result.success) {
          setCaptains(result.data);
        } else {
          setError(result.message || "Failed to load partners");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching top partners:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopCaptains();
  }, []);

  // Function to get a color based on index
  const getColorForIndex = (index: number) => {
    return allColors[index % allColors.length];
  };

  return (
    <div className="h-full w-full py-4 rounded-lg bg-white">
      <div className="h-full w-full flex items-center gap-2">
        <div className="h-8 w-1 rounded-xl bg-lightpurple"></div>
        <h2 className="text-xl font-bold">Top Partners</h2>
      </div>

      <div className="h-full w-full flex gap-4 py-4 overflow-scroll scroll-smooth scrollbar-hide">
        {loading ? (
          <div className="flex justify-center items-center w-full p-4">
            <Loading message="Loading partners..." />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center w-full p-4 text-red-500">
            <p>{error}</p>
          </div>
        ) : captains.length === 0 ? (
          <div className="flex justify-center items-center w-full p-4">
            <p>No partners found</p>
          </div>
        ) : (
          captains.map((captain, index) => (
            <ItemCard
              key={captain.id}
              color={getColorForIndex(index)}
              maintitle={`${captain.name}`}
              subtitle={`⭐️ ${captain.rating.toFixed(2)}`}
              bg={getColorForIndex(index)}
              subtitlecolor="text-gray-500"
              imageUrl="https://static.vecteezy.com/system/resources/previews/000/252/627/non_2x/vector-factory-worker-illustration.jpg"
            />
          ))
        )}
      </div>
    </div>
  );
}