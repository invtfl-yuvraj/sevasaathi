"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CaptainLocationTracker from "@/components/CaptainLocationTracker";
import CaptainTrackingClient from "@/components/CaptainTrackingClient";
import TripLocationMap from "@/components/TripLocationMap";
import { useWebSocket } from "@/contexts/WebSocketProvider";

interface TripDetailsPageProps {
  params: {
    id: string;
  };
}

const TripDetailsPage: React.FC<TripDetailsPageProps> = ({ params }) => {
  const { id: tripId } = params;
  const { data: session } = useSession();
  const { isConnected, isAuthenticated } = useWebSocket();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Fetch trip details
  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/trips/${tripId}`);
        console.log("Trip response", response);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch trip details");
        }
        
        const data = await response.json();
        setTrip(data.trip);
        
        // Determine role based on trip data
        if (session?.user?.email) {
          const userId = session.user.id;
          if (data.trip.captainId === userId) {
            setUserRole("CAPTAIN");
          } else if (data.trip.userId === userId) {
            setUserRole("USER");
          }
        }
      } catch (error: any) {
        console.error("Error fetching trip:", error);
        setError(error.message || "Failed to fetch trip details");
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchTripDetails();
    }
  }, [tripId, session]);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center min-h-[60vh]">
          <p>Loading trip details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-100 p-4 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  // No trip found
  if (!trip) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-yellow-100 p-4 rounded-lg">
          <p className="text-yellow-700">Trip not found or you don't have permission to view it.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Trip Details</h1>
      
      {/* Trip status indicator */}
      <div className="mb-6">
        <div className={`inline-block px-3 py-1 rounded-full font-medium ${
          trip.status === "COMPLETED" ? "bg-green-100 text-green-800" :
          trip.status === "CANCELLED" ? "bg-red-100 text-red-800" :
          trip.status === "ARRIVED" ? "bg-blue-100 text-blue-800" :
          trip.status === "IN_PROGRESS" ? "bg-yellow-100 text-yellow-800" :
          "bg-gray-100 text-gray-800"
        }`}>
          {trip.status}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Trip info */}
        <div className="col-span-1 md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Trip Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">From</p>
                <p className="font-medium">{trip.pickupAddress}</p>
              </div>
              
              <div>
                <p className="text-gray-600">To</p>
                <p className="font-medium">{trip.destinationAddress || "Not specified"}</p>
              </div>
              
              <div>
                <p className="text-gray-600">Date</p>
                <p className="font-medium">{new Date(trip.createdAt).toLocaleDateString()}</p>
              </div>
              
              <div>
                <p className="text-gray-600">Time</p>
                <p className="font-medium">{new Date(trip.createdAt).toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
          
          {/* Map component */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <TripLocationMap
              tripId={tripId}
              initialUserLocation={{
                latitude: trip.pickupLatitude || 0,
                longitude: trip.pickupLongitude || 0,
              }}
              initialCaptainLocation={{
                latitude: trip.captainLatitude || 0,
                longitude: trip.captainLongitude || 0,
              }}
            />
          </div>
        </div>
        
        {/* Tracking components (conditionally rendered based on role) */}
        <div className="col-span-1">
          {isConnected ? (
            <>
              {userRole === "CAPTAIN" && (
                <CaptainTrackingClient tripId={tripId} userId={trip.userId} />
              )}
              
              {userRole === "USER" && (
                <CaptainLocationTracker tripId={tripId} />
              )}
              
              {!userRole && (
                <div className="bg-yellow-100 p-4 rounded-lg">
                  <p className="text-yellow-700">
                    You don't appear to be associated with this trip.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-center text-gray-500">
                Connecting to tracking service...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripDetailsPage;