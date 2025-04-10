"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import HeaderWithBackButton from "@/components/HeaderWithBackButton";
import ButtonNavigation from "@/components/ButtonNavigation";

interface ServiceData {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  discountPrice: number;
}

// Enhanced ServiceAddCard component that accepts more props
interface EnhancedServiceAddCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  discountPrice: number;
  onItemCountChange: (id: string, count: number) => void;
}

function EnhancedServiceAddCard({ 
  id, 
  name, 
  description, 
  imageUrl, 
  price, 
  discountPrice, 
  onItemCountChange 
}: EnhancedServiceAddCardProps) {
  const [itemAdded, setItemAdded] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    onItemCountChange(id, itemCount);
  }, [itemCount, onItemCountChange, id]);

  const clickHandler = () => {
    setItemAdded(!itemAdded);
    if (!itemAdded) {
      setItemCount(1);
    } else {
      setItemCount(0);
      setItemAdded(false);
    }
  };

  const posCountHandler = () => {
    setItemCount((prevCount) => prevCount + 1);
  };

  const negClickHandler = () => {
    setItemCount((prevCount) => {
      const newCount = prevCount - 1;
      if (newCount <= 0) {
        setItemAdded(false);
        return 0;
      }
      return newCount;
    });
  };

  return (
    <div className="h-full w-full flex justify-between">
      <div className="relative w-40 h-32 bg-gray-400 rounded-lg">
        <Image
          src={imageUrl}
          alt={`${name} Service`}
          fill
          className="object-cover object-right rounded-lg"
        />
      </div>

      <div className="h-full w-full flex flex-col justify-start px-4 gap-2 py-2">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="h-full w-full flex justify-between items-center">
          <div className="">
            <p className="text-gray-500 inline-block">Starts from</p>
            <br />
            <div className="p-2 mt-2 rounded-xl font-bold inline-block">
              <span className="text-red-500 line-through">₹{price}</span>
              <span className="text-green-600 text-lg"> ₹{discountPrice}</span>
            </div>
          </div>

          {itemAdded ? (
            <div className="border-2 py-2 px-6 border-lightpurple bg-lightpurple text-white rounded-2xl flex gap-4 font-bold">
              <button onClick={negClickHandler}>-</button>
              {itemCount}
              <button onClick={posCountHandler}>+</button>
            </div>
          ) : (
            <button
              onClick={clickHandler}
              className="border-2 py-2 px-6 border-lightpurple text-lightpurple rounded-2xl font-semibold"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const ACRepairSearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [services, setServices] = useState<ServiceData[]>([]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [itemCounts, setItemCounts] = useState<{ [key: string]: number }>({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching services based on search query
    const fetchServices = async () => {
      setLoading(true);
      try {
        // Make API call to fetch services
        const response = await fetch(`/api/search?q=${encodeURIComponent(query || '')}`);
        const data = await response.json();
        
        if (data.success && data.data) {
          // Map API response to our ServiceData structure
          const fetchedServices = data.data.map((service: any) => ({
            id: service.id,
            name: service.name,
            description: service.description || "",
            imageUrl: service.imageUrl || "https://previews.123rf.com/images/lacheev/lacheev2203/lacheev220300467/183798923-portrait-of-happy-handsome-moustached-ac-maintenance-service-worker-holding-screwdriver-looking-at.jpg",
            price: service.price,
            discountPrice: service.discountPrice
          }));
          setServices(fetchedServices);
        } else {
          // Fallback to mock data if API fails
          const acRepairServices: ServiceData[] = [
            {
              id: "ac-checkup",
              name: "AC Check-Up",
              description: "Complete inspection and tune-up of your AC unit",
              imageUrl: "https://previews.123rf.com/images/lacheev/lacheev2203/lacheev220300467/183798923-portrait-of-happy-handsome-moustached-ac-maintenance-service-worker-holding-screwdriver-looking-at.jpg",
              price: 500,
              discountPrice: 299
            },
            {
              id: "ac-servicing",
              name: "AC Servicing",
              description: "Deep cleaning and maintenance of your AC",
              imageUrl: "https://previews.123rf.com/images/lacheev/lacheev2203/lacheev220300467/183798923-portrait-of-happy-handsome-moustached-ac-maintenance-service-worker-holding-screwdriver-looking-at.jpg",
              price: 800,
              discountPrice: 499
            },
            {
              id: "ac-repair",
              name: "AC Repair",
              description: "Fix issues with your AC unit",
              imageUrl: "https://previews.123rf.com/images/lacheev/lacheev2203/lacheev220300467/183798923-portrait-of-happy-handsome-moustached-ac-maintenance-service-worker-holding-screwdriver-looking-at.jpg",
              price: 1000,
              discountPrice: 699
            },
            {
              id: "ac-installation",
              name: "AC Installation",
              description: "Professional installation of new AC units",
              imageUrl: "https://previews.123rf.com/images/lacheev/lacheev2203/lacheev220300467/183798923-portrait-of-happy-handsome-moustached-ac-maintenance-service-worker-holding-screwdriver-looking-at.jpg",
              price: 1200,
              discountPrice: 899
            }
          ];
          setServices(acRepairServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        // Fallback to mock data if API fails
        const acRepairServices: ServiceData[] = [
          {
            id: "ac-checkup",
            name: "AC Check-Up",
            description: "Complete inspection and tune-up of your AC unit",
            imageUrl: "https://previews.123rf.com/images/lacheev/lacheev2203/lacheev220300467/183798923-portrait-of-happy-handsome-moustached-ac-maintenance-service-worker-holding-screwdriver-looking-at.jpg",
            price: 500,
            discountPrice: 299
          },
          {
            id: "ac-servicing",
            name: "AC Servicing",
            description: "Deep cleaning and maintenance of your AC",
            imageUrl: "https://previews.123rf.com/images/lacheev/lacheev2203/lacheev220300467/183798923-portrait-of-happy-handsome-moustached-ac-maintenance-service-worker-holding-screwdriver-looking-at.jpg",
            price: 800,
            discountPrice: 499
          },
          {
            id: "ac-repair",
            name: "AC Repair",
            description: "Fix issues with your AC unit",
            imageUrl: "https://previews.123rf.com/images/lacheev/lacheev2203/lacheev220300467/183798923-portrait-of-happy-handsome-moustached-ac-maintenance-service-worker-holding-screwdriver-looking-at.jpg",
            price: 1000,
            discountPrice: 699
          },
          {
            id: "ac-installation",
            name: "AC Installation",
            description: "Professional installation of new AC units",
            imageUrl: "https://previews.123rf.com/images/lacheev/lacheev2203/lacheev220300467/183798923-portrait-of-happy-handsome-moustached-ac-maintenance-service-worker-holding-screwdriver-looking-at.jpg",
            price: 1200,
            discountPrice: 899
          }
        ];
        setServices(acRepairServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [query]);

  const handleItemCountChange = (id: string, count: number) => {
    setItemCounts((prevCounts) => {
      const newCounts = { ...prevCounts, [id]: count };
      
      // Calculate total items
      const total = Object.values(newCounts).reduce(
        (acc, curr) => acc + curr,
        0
      );
      setTotalItemCount(total);
      
      // Calculate total price
      const price = services.reduce((acc, service) => {
        const count = newCounts[service.id] || 0;
        return acc + (count * service.discountPrice);
      }, 0);
      setTotalPrice(price);
      
      return newCounts;
    });
  };

  return (
    <div className="h-full w-screen py-4 px-6 rounded-lg bg-white flex flex-col gap-4 relative">
      <HeaderWithBackButton title={`Results for "${query || ''}"`} />
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p>Loading services...</p>
        </div>
      ) : (
        <div className="h-full w-full flex flex-col justify-between gap-4">
          {services.length > 0 ? (
            services.map((service) => (
              <React.Fragment key={service.id}>
                <hr />
                <EnhancedServiceAddCard 
                  id={service.id}
                  name={service.name}
                  description={service.description}
                  imageUrl={service.imageUrl}
                  price={service.price}
                  discountPrice={service.discountPrice}
                  onItemCountChange={handleItemCountChange}
                />
              </React.Fragment>
            ))
          ) : (
            <div className="flex items-center justify-center h-64">
              <p>No services found for "{query}"</p>
            </div>
          )}
        </div>
      )}

      {totalItemCount > 0 && (
        <div className="fixed top-0 right-0 left-0 p-4 bg-white shadow-sm z-50 font-bold flex justify-end">
          <div className="mr-4">
            <p>Total Items: {totalItemCount}</p>
            <p className="text-green-600">Total Price: ₹{totalPrice}</p>
          </div>
        </div>
      )}

      {totalItemCount > 0 && (
        <div className="flex mt-10 items-center justify-center">
          <Link href='/schedule'>
            <button className="border-2 py-2 px-6 border-lightpurple bg-lightpurple text-white rounded-2xl flex gap-4 font-bold">
              {" "}
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}

      <div className="fixed h-16 w-full bottom-0 left-0 right-0 z-10">
        <ButtonNavigation />
      </div>
    </div>
  );
};

export default ACRepairSearchResults;
