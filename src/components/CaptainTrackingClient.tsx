"use client";
import React, { useEffect, useState, useRef } from "react";
import { MdMyLocation, MdLocationOn } from "react-icons/md";

type CaptainTrackingProps = {
  tripId: string;
  userId: string;
};

const CaptainTrackingClient: React.FC<CaptainTrackingProps> = ({ tripId, userId }) => {
  const [tracking, setTracking] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<{
    distanceToUser: number;
    isArrived: boolean;
  } | null>(null);
  const watchPositionRef = useRef<number | null>(null);

  // Start tracking when component mounts
  useEffect(() => {
    startTracking();
    
    // Cleanup on unmount
    return () => {
      stopTracking();
    };
  }, [tripId]);

  const startTracking = () => {
    // Check if geolocation is available
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setTracking(true);
    setError("");

    // Start watching position
    watchPositionRef.current = navigator.geolocation.watchPosition(
      handlePositionUpdate,
      handlePositionError,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const stopTracking = () => {
    // Clear the watch if exists
    if (watchPositionRef.current !== null) {
      navigator.geolocation.clearWatch(watchPositionRef.current);
      watchPositionRef.current = null;
    }
    setTracking(false);
  };

  const handlePositionUpdate = async (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    
    try {
      // Send location update to server
      const response = await fetch("/api/tracking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude,
          longitude,
          tripId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update location");
      }

      const data = await response.json();
      setSuccess(data);
      
      // If arrived, stop tracking after a short delay
      if (data.isArrived) {
        setTimeout(() => {
          stopTracking();
        }, 60000); // Continue tracking for 1 more minute after arrival
      }
    } catch (error: any) {
      console.error("Error updating location:", error);
      setError(error.message || "Failed to update location");
    }
  };

  const handlePositionError = (error: GeolocationPositionError) => {
    let errorMsg = "Unknown error occurred when getting your location";
    
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMsg = "Location access denied. Please enable location services.";
        break;
      case error.POSITION_UNAVAILABLE:
        errorMsg = "Location information unavailable.";
        break;
      case error.TIMEOUT:
        errorMsg = "Location request timed out.";
        break;
    }
    
    setError(errorMsg);
    setTracking(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Location Tracking</h3>
      
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MdMyLocation className="text-blue-500 text-xl mr-2" />
            <span>Status:</span>
          </div>
          <span className={`px-2 py-1 rounded text-sm ${
            tracking ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {tracking ? "Sharing Location" : "Not Tracking"}
          </span>
        </div>
      </div>
      
      {success && (
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <MdLocationOn className="text-red-500 text-xl mr-2" />
            <span>Distance to user:</span>
          </div>
          <div className="text-center">
            <span className="text-xl font-bold">
              {success.distanceToUser < 0.1 
                ? `${Math.round(success.distanceToUser * 1000)} meters` 
                : `${success.distanceToUser.toFixed(1)} km`}
            </span>
          </div>
          
          {success.isArrived && (
            <div className="mt-2 p-2 bg-green-100 text-green-800 text-center rounded">
              You have arrived at the user's location!
            </div>
          )}
        </div>
      )}
      
      {error && (
        <div className="p-2 bg-red-100 text-red-800 text-sm rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="flex justify-center">
        <button
          onClick={tracking ? stopTracking : startTracking}
          className={`px-4 py-2 rounded font-medium ${
            tracking
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {tracking ? "Stop Sharing Location" : "Start Sharing Location"}
        </button>
      </div>
      
      <div className="text-xs text-gray-500 text-center mt-4">
        Your location is only shared while you're on this trip.
      </div>
    </div>
  );
};

export default CaptainTrackingClient;