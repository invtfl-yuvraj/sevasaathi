"use client";
import React, { useEffect, useState } from "react";
import { MdLocationOn, MdDirectionsCar } from "react-icons/md";

type TrackerProps = {
  tripId: string;
}

type TrackingData = {
  captainLocation: {
    latitude: number;
    longitude: number;
    updatedAt: string;
  };
  distanceInKm: number;
  estimatedArrivalMinutes: number;
  captainName: string;
  status: string;
}

const CaptainLocationTracker: React.FC<TrackerProps> = ({ tripId }) => {
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch captain's location
  const fetchCaptainLocation = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/tracking?tripId=${tripId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch captain location");
      }
      
      const data = await response.json();
      setTrackingData(data);
      setError("");
    } catch (error: any) {
      console.error("Error fetching captain location:", error);
      setError(error.message || "Failed to get captain's location");
    } finally {
      setLoading(false);
    }
  };

  // Set up polling interval
  useEffect(() => {
    // Initial fetch
    fetchCaptainLocation();
    
    // Set up polling every 10 seconds
    const intervalId = setInterval(() => {
      fetchCaptainLocation();
    }, 10000); // 10 seconds
    
    // Check if we need to stop polling
    const checkIfArrived = setInterval(() => {
      if (trackingData?.status === "ARRIVED" || trackingData?.status === "COMPLETED") {
        clearInterval(intervalId);
      }
    }, 2000);
    
    // Clean up on unmount
    return () => {
      clearInterval(intervalId);
      clearInterval(checkIfArrived);
    };
  }, [tripId]);

  // Format distance to be more readable
  const formatDistance = (distance: number) => {
    if (distance < 0.1) {
      return `${Math.round(distance * 1000)} meters`;
    }
    return `${distance.toFixed(1)} km`;
  };

  if (loading && !trackingData) {
    return <div className="p-4 text-center">Loading captain location...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!trackingData) {
    return <div className="p-4">No tracking data available</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Captain Tracking</h3>
        <span className={`px-2 py-1 rounded text-sm ${
          trackingData.status === "ARRIVED" ? "bg-green-100 text-green-800" :
          trackingData.status === "IN_PROGRESS" ? "bg-blue-100 text-blue-800" :
          "bg-gray-100 text-gray-800"
        }`}>
          {trackingData.status}
        </span>
      </div>
      
      <div className="flex items-center mb-3">
        <MdDirectionsCar className="text-blue-500 text-xl mr-2" />
        <span className="font-medium">{trackingData.captainName}</span>
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <MdLocationOn className="text-red-500 text-xl mr-2" />
          <div>
            <div className="text-sm font-medium">Distance</div>
            <div className="text-lg">{formatDistance(trackingData.distanceInKm)}</div>
          </div>
        </div>
        
        <div className="text-center mt-2">
          <div className="text-sm text-gray-600">Estimated Arrival</div>
          <div className="text-xl font-bold">
            {trackingData.status === "ARRIVED" ? (
              "Captain has arrived!"
            ) : (
              `${trackingData.estimatedArrivalMinutes} minutes`
            )}
          </div>
        </div>
        
        <div className="text-xs text-gray-500 text-right mt-2">
          Last updated: {new Date(trackingData.captainLocation.updatedAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default CaptainLocationTracker;