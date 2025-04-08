'use client'
import { useState, useEffect } from 'react';
import Loading from './Loading';
import { useRandomColor } from '@/hooks/useRandomColor';
import ItemCard from './ItemCard';

interface Captain {
  id: string;
  userId: string;
  serviceId: string | null;
  availability: boolean;
  experience: number;
  hourlyRate: number;
  location: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;

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
        // Changed the endpoint to match your API route
        const response = await fetch('/api/top-partners');
        
        if (!response.ok) {
          throw new Error('Failed to fetch top partners');
        }
        
        const result = await response.json();
        
        if (result.success) {
          // Updated to match the actual API response structure
          setCaptains(result.data);
        } else {
          setError(result.message || 'Failed to load partners');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching top partners:', err);
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
    <div className="container mx-auto px-4 py-8">
      <div className="h-full w-full flex items-center gap-2">
        <div className="h-8 w-1 rounded-xl bg-lightpurple"></div>
        <h2 className="text-xl font-bold">Top Partners</h2>
      </div>
      
      <div className="flex justify-center items-center w-full p-4">
        {loading ? (
          <div className="col-span-full flex justify-center">
            <Loading />
          </div>
        ) : error ? (
          <div className="col-span-full text-center text-red-500">
            {error}
          </div>
        ) : captains.length === 0 ? (
          <div className="col-span-full text-center">
            No partners found
          </div>
        ) : (
          captains.map((captain, index) => (
            <ItemCard
              key={captain.id}
              captain={captain}
              color={getColorForIndex(index)}
              maintitle={`${captain.userId}`}
              subtitle={`Rating: ${captain.rating}`}
              bg={getColorForIndex(index)}
              subtitlecolor="text-gray-500"
            />
          ))
        )}
      </div>
    </div>
  );
}