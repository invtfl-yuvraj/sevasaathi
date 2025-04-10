// hooks/useLocation.ts
import { useState, useEffect } from 'react';

type LocationData = {
  latitude: number;
  longitude: number;
  city?: string;
};

export function useLocation() {
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [currentCity, setCurrentCity] = useState("Loading...");
  const [locationError, setLocationError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Get the current location using the browser's geolocation API
  const getCurrentLocation = (): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported by your browser"));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Get city name from coordinates
            const city = await getCityFromCoordinates(latitude, longitude);
            resolve({ latitude, longitude, city });
          } catch (error) {
            // If city lookup fails, still return coordinates
            console.error("City lookup failed:", error);
            resolve({ latitude, longitude, city: "Unknown" });
          }
        },
        (error) => {
          let errorMsg = "Could not get your location";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMsg = "Location permission denied";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMsg = "Location unavailable";
              break;
            case error.TIMEOUT:
              errorMsg = "Location request timed out";
              break;
          }
          reject(new Error(errorMsg));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    });
  };

  // Get city name from coordinates using OpenStreetMap API
  const getCityFromCoordinates = async (
    latitude: number,
    longitude: number
  ): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
      );
      const data = await response.json();
      if (data && data.address) {
        return (
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.county ||
          "Unknown"
        );
      }
      return "Unknown";
    } catch (error) {
      console.error("Error getting city name:", error);
      throw new Error("Failed to get city name");
    }
  };

  // Save location data to server
  const saveLocationToServer = async (locationData: LocationData): Promise<boolean> => {
    try {
      const response = await fetch("/api/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(locationData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        console.error("Failed to save location:", error);
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error saving location:", error);
      return false;
    }
  };

  // Get stored location from server
  const getStoredLocation = async (): Promise<{location: LocationData, updatedAt: string} | null> => {
    try {
      const response = await fetch("/api/location");
      
      if (!response.ok) {
        return null;
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching stored location:", error);
      return null;
    }
  };

  // Update location data
  const updateLocation = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    try {
      const location = await getCurrentLocation();
      setCurrentLocation(location);
      setCurrentCity(location.city || "Unknown location");
      
      // Save to server
      const saved = await saveLocationToServer(location);
      if (!saved) {
        console.error("Failed to save location to server");
      }
    } catch (error: any) {
      console.error("Location error:", error);
      setLocationError(error.message || "Location unavailable");
      setCurrentCity("Location unavailable");
    } finally {
      setIsUpdating(false);
    }
  };

  // Initialize location data
  const fetchLocationData = async () => {
    // First try to get stored location from server
    try {
      const storedLocationData = await getStoredLocation();
      
      if (storedLocationData && storedLocationData.location) {
        const { location } = storedLocationData;
        setCurrentLocation(location);
        setCurrentCity(location.city || "Unknown location");
        
        // If stored location is older than 30 minutes, update in background
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
        if (storedLocationData.updatedAt && new Date(storedLocationData.updatedAt) < thirtyMinutesAgo) {
          updateLocation();
        }
        return;
      }
    } catch (error) {
      console.log("No stored location found, getting new location");
    }
    
    // If no stored location, get new location
    updateLocation();
  };

  // Run once on component mount
  useEffect(() => {
    fetchLocationData();
  }, []);

  return {
    currentLocation,
    currentCity,
    locationError,
    isUpdating,
    updateLocation
  };
}