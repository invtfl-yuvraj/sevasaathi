"use client";
import React, { useEffect, useRef, useState } from "react";
import { useWebSocket } from "@/contexts/WebSocketProvider";
import { MdMyLocation, MdDirections } from "react-icons/md";

interface MapProps {
  tripId: string;
  initialUserLocation?: {
    latitude: number;
    longitude: number;
  };
  initialCaptainLocation?: {
    latitude: number;
    longitude: number;
  };
}

// This component renders a map showing captain and user locations
const TripLocationMap: React.FC<MapProps> = ({
  tripId,
  initialUserLocation,
  initialCaptainLocation,
}) => {
  const { socket, isAuthenticated } = useWebSocket();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  const captainMarkerRef = useRef<google.maps.Marker | null>(null);
  const routeRef = useRef<google.maps.Polyline | null>(null);
  
  const [userLocation, setUserLocation] = useState(initialUserLocation || {
    latitude: 0,
    longitude: 0,
  });
  
  const [captainLocation, setCaptainLocation] = useState(initialCaptainLocation || {
    latitude: 0,
    longitude: 0,
  });
  
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load Google Maps API
  useEffect(() => {
    // Function to load Google Maps script
    const loadGoogleMapsScript = () => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (!apiKey) {
        setError("Google Maps API key is missing");
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsMapLoaded(true);
      script.onerror = () => setError("Failed to load Google Maps");
      document.head.appendChild(script);
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      setIsMapLoaded(true);
    }
  }, []);

  // Initialize map when it's loaded
  useEffect(() => {
    if (!isMapLoaded || !mapRef.current) return;

    try {
      // Initialize map centered on user location or default
      const mapCenter = userLocation.latitude && userLocation.longitude
        ? { lat: userLocation.latitude, lng: userLocation.longitude }
        : { lat: 34.0522, lng: -118.2437 }; // Default to Los Angeles
      
      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: 15,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
      });

      // Create user marker if we have coordinates
      if (userLocation.latitude && userLocation.longitude) {
        userMarkerRef.current = new google.maps.Marker({
          position: { lat: userLocation.latitude, lng: userLocation.longitude },
          map: mapInstanceRef.current,
          title: "Your Location",
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          },
        });
      }

      // Create captain marker if we have coordinates
      if (captainLocation.latitude && captainLocation.longitude) {
        captainMarkerRef.current = new google.maps.Marker({
          position: { lat: captainLocation.latitude, lng: captainLocation.longitude },
          map: mapInstanceRef.current,
          title: "Captain",
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
          },
        });
        
        // Draw route between points if both exist
        if (userLocation.latitude && userLocation.longitude) {
          drawRoute();
        }
      }
    } catch (err) {
      console.error("Error initializing map:", err);
      setError("Failed to initialize map");
    }
  }, [isMapLoaded, userLocation, captainLocation]);

  // Listen for captain location updates
  useEffect(() => {
    if (!socket || !isAuthenticated) return;

    // Request initial captain location
    socket.emit('request_captain_location', { tripId });

    // Listen for captain location updates
    const handleLocationUpdate = (data: any) => {
      if (data.tripId === tripId) {
        setCaptainLocation({
          latitude: data.latitude,
          longitude: data.longitude,
        });
      }
    };

    socket.on('captain_location_update', handleLocationUpdate);

    // Clean up listener
    return () => {
      socket.off('captain_location_update', handleLocationUpdate);
    };
  }, [socket, isAuthenticated, tripId]);

  // Update captain marker when location changes
  useEffect(() => {
    if (!isMapLoaded || !mapInstanceRef.current) return;
    if (!captainLocation.latitude || !captainLocation.longitude) return;

    const newPosition = { 
      lat: captainLocation.latitude, 
      lng: captainLocation.longitude 
    };

    // Update existing marker or create new one
    if (captainMarkerRef.current) {
      captainMarkerRef.current.setPosition(newPosition);
    } else {
      captainMarkerRef.current = new google.maps.Marker({
        position: newPosition,
        map: mapInstanceRef.current,
        title: "Captain",
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
        },
      });
    }

    // Update route if user position exists
    if (userLocation.latitude && userLocation.longitude) {
      drawRoute();
    }

    // Pan map to keep captain in view
    mapInstanceRef.current.panTo(newPosition);
  }, [captainLocation]);

  // Helper function to draw route between captain and user
  const drawRoute = () => {
    if (!isMapLoaded || !mapInstanceRef.current) return;
    if (!userLocation.latitude || !userLocation.longitude) return;
    if (!captainLocation.latitude || !captainLocation.longitude) return;

    const userLatLng = { lat: userLocation.latitude, lng: userLocation.longitude };
    const captainLatLng = { lat: captainLocation.latitude, lng: captainLocation.longitude };

    // Remove existing route
    if (routeRef.current) {
      routeRef.current.setMap(null);
    }

    // Draw new route - simple direct line
    routeRef.current = new google.maps.Polyline({
      path: [captainLatLng, userLatLng],
      geodesic: true,
      strokeColor: "#4285F4",
      strokeOpacity: 1.0,
      strokeWeight: 3,
      map: mapInstanceRef.current,
    });

    // Fit bounds to include both points
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(userLatLng);
    bounds.extend(captainLatLng);
    mapInstanceRef.current.fitBounds(bounds);
  };

  // Handle user clicking "My Location" button
  const handleCenterOnUser = () => {
    if (!isMapLoaded || !mapInstanceRef.current) return;
    if (!userLocation.latitude || !userLocation.longitude) {
      // Try to get current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatLng = { 
            lat: position.coords.latitude, 
            lng: position.coords.longitude 
          };
          
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          
          mapInstanceRef.current?.setCenter(userLatLng);
          
          // Update user marker
          if (userMarkerRef.current) {
            userMarkerRef.current.setPosition(userLatLng);
          } else if (mapInstanceRef.current) {
            userMarkerRef.current = new google.maps.Marker({
              position: userLatLng,
              map: mapInstanceRef.current,
              title: "Your Location",
              icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              },
            });
          }
        },
        (err) => {
          setError("Could not get your location: " + err.message);
        }
      );
    } else {
      // Center on existing location
      mapInstanceRef.current.setCenter({ 
        lat: userLocation.latitude, 
        lng: userLocation.longitude 
      });
    }
  };

  // Handle user clicking "Show Route" button
  const handleShowRoute = () => {
    if (userLocation.latitude && userLocation.longitude &&
        captainLocation.latitude && captainLocation.longitude) {
      drawRoute();
    }
  };

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Map loading indicator */}
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          Loading map...
        </div>
      )}
      
      {/* Map controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={handleCenterOnUser}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          title="My Location"
        >
          <MdMyLocation className="text-blue-500 text-xl" />
        </button>
        
        <button
          onClick={handleShowRoute}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          title="Show Route"
        >
          <MdDirections className="text-blue-500 text-xl" />
        </button>
      </div>
    </div>
  );
};

export default TripLocationMap;