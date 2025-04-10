"use client";

import Link from "next/link";
import React, { useState, useCallback } from "react";
import HeaderWithBackButton from "@/components/HeaderWithBackButton";
import ButtonNavigation from "@/components/ButtonNavigation";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  estimatedTime: string;
  imageUrl: string;
}

const ACRepairServices = () => {
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [itemCounts, setItemCounts] = useState<{ [key: string]: number }>({});
  const [totalPrice, setTotalPrice] = useState(0);

  const services: Service[] = [
    {
      id: "ac-service",
      title: "AC Regular Service",
      description: "Complete cleaning of indoor & outdoor units, gas refilling if needed",
      price: 499,
      estimatedTime: "60-90 min",
      imageUrl: "/images/ac-service.jpg"
    },
    {
      id: "ac-repair",
      title: "AC Repair & Diagnostics",
      description: "Troubleshooting cooling issues, fixing leaks, electrical repairs",
      price: 699,
      estimatedTime: "Varies",
      imageUrl: "/images/ac-repair.jpg"
    },
    {
      id: "ac-installation",
      title: "AC Installation",
      description: "Professional installation with all necessary equipment and materials",
      price: 1299,
      estimatedTime: "2-3 hours",
      imageUrl: "/images/ac-installation.jpg"
    },
    {
      id: "ac-maintenance",
      title: "AC Annual Maintenance",
      description: "Comprehensive yearly maintenance plan with 2 scheduled services",
      price: 2499,
      estimatedTime: "Annual plan",
      imageUrl: "/images/ac-maintenance.jpg"
    }
  ];

  const handleItemCountChange = useCallback((id: string, count: number, price: number) => {
    setItemCounts((prevCounts) => {
      const newCounts = { ...prevCounts, [id]: count };
      const total = Object.values(newCounts).reduce(
        (acc, curr) => acc + curr,
        0
      );
      
      setTotalItemCount(total);
      
      // Calculate total price based on the selected services
      let newTotalPrice = 0;
      Object.keys(newCounts).forEach((serviceId) => {
        const service = services.find(s => s.id === serviceId);
        if (service) {
          newTotalPrice += service.price * newCounts[serviceId];
        }
      });
      
      setTotalPrice(newTotalPrice);
      
      return newCounts;
    });
  }, [services]);

  return (
    <div className="min-h-screen w-full pb-20 bg-gray-50 flex flex-col">
      <HeaderWithBackButton title="AC Repair Services" />
      
      <div className="px-4 py-3">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Available Services</h2>
          <p className="text-sm text-gray-600">Professional AC repair and maintenance services</p>
        </div>
      </div>
      
      <div className="flex-1 pb-24">
        {services.map((service) => (
          <ServiceCard 
            key={service.id}
            service={service}
            count={itemCounts[service.id] || 0}
            onCountChange={(count) => handleItemCountChange(service.id, count, service.price)}
          />
        ))}
      </div>
      
      {totalItemCount > 0 && (
        <div className="fixed top-0 right-0 left-0 p-4 bg-white shadow-sm z-40 font-bold flex justify-end">
          <div className="mr-4">
            <p>Total Items: {totalItemCount}</p>
            <p className="text-green-600">Total Price: ₹{totalPrice}</p>
          </div>
        </div>
      )}
      
      {totalItemCount > 0 && (
        <div className="fixed bottom-16 left-0 right-0 flex justify-center p-4 bg-white border-t border-gray-200 z-30">
          <Link href="/schedule">
            <button className="py-3 px-8 bg-purple-600 text-white rounded-lg flex items-center justify-center font-semibold">
              Proceed to Schedule
            </button>
          </Link>
        </div>
      )}
      
      <div className="fixed h-16 w-full bottom-0 left-0 right-0 z-20">
        <ButtonNavigation />
      </div>
    </div>
  );
};

interface ServiceCardProps {
  service: Service;
  count: number;
  onCountChange: (count: number) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, count, onCountChange }) => {
  const decrementCount = () => {
    if (count > 0) {
      onCountChange(count - 1);
    }
  };

  const incrementCount = () => {
    onCountChange(count + 1);
  };

  return (
    <div className="bg-white p-4 mb-3 mx-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{service.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{service.description}</p>
          <div className="flex items-center mt-2">
            <span className="text-purple-600 font-bold">₹{service.price}</span>
            <span className="text-xs text-gray-500 ml-2">• {service.estimatedTime}</span>
          </div>
        </div>
        
        <div className="flex items-center">
          {count > 0 ? (
            <div className="flex items-center">
              <button 
                onClick={decrementCount}
                className="h-8 w-8 flex items-center justify-center bg-gray-100 rounded-full"
              >
                <span className="text-lg font-medium text-gray-700">-</span>
              </button>
              <span className="mx-3 font-medium">{count}</span>
              <button 
                onClick={incrementCount}
                className="h-8 w-8 flex items-center justify-center bg-purple-100 rounded-full"
              >
                <span className="text-lg font-medium text-purple-700">+</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={incrementCount}
              className="py-2 px-4 bg-purple-50 text-purple-600 rounded-lg text-sm font-medium"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ACRepairServices;