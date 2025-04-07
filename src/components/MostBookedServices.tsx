'use client'
import { useState, useEffect } from 'react';

// ItemCard component for service cards
interface ItemCardProps {
  maintitle: string;
  subtitle: string;
  bg?: string;
}

const ItemCard = ({ maintitle, subtitle, bg = "bg-green1" }: ItemCardProps) => {
  return (
    <div className={`min-w-32 h-24 ${bg} rounded-lg flex flex-col justify-center items-center p-4`}>
      <h3 className="font-semibold text-center">{maintitle}</h3>
      <p className="text-sm">{subtitle}</p>
    </div>
  );
};

// Main component for Most Booked Services
export default function MostBookedServices() {
  interface Service {
    id: string;
    name: string;
    price?: number;
  }

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/top-services');
        
        if (!response.ok) {
          throw new Error('Failed to fetch top services');
        }
        
        const result = await response.json();
        
        if (result.success) {
          setServices(result.data);
        } else {
          setError(result.message || 'Failed to load services');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching top services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopServices();
  }, []);

  return (
    <div className="h-full w-full py-4 px-6 rounded-lg bg-white">
      <div className="h-full w-full flex items-center gap-2">
        <div className="h-8 w-1 rounded-xl bg-[#FFA3A3]"></div>
        <h2 className="text-xl font-bold">Most Booked Services</h2>
      </div>
      
      <div className="h-full w-full flex gap-4 py-4 overflow-scroll scroll-smooth scrollbar-hide">
        {loading ? (
          <div className="flex justify-center items-center w-full p-4">
            <p>Loading services...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center w-full p-4 text-red-500">
            <p>{error}</p>
          </div>
        ) : services.length === 0 ? (
          <div className="flex justify-center items-center w-full p-4">
            <p>No services found</p>
          </div>
        ) : (
          services.map((service) => (
            <ItemCard 
              key={service.id}
              maintitle={service.name}
              subtitle={`₹${service.price || '500'}`} 
              bg="bg-green1"
            />
          ))
        )}
      </div>
    </div>
  );
}