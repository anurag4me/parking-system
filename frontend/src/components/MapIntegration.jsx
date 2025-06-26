import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const MapIntegration = ({ parkingSpots }) => {
  const mapRef = useRef(null); // Reference to the map container
  const googleMapRef = useRef(null); // Reference to the Google Maps instance
  const [isMapLoaded, setIsMapLoaded] = useState(false); // State to track if map is loaded
  const [isError, setIsError] = useState(false); // Error handling state
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // API key from environment variables
  const navigate = useNavigate(); // To navigate to Booking when location is selected

  // Load the Google Maps API
  useEffect(() => {
    if (apiKey && !isMapLoaded) {
      const googleMapScript = document.createElement("script");
      googleMapScript.src = `https://maps.gomaps.pro/maps/api/js?key=${apiKey}&libraries=places`;
      googleMapScript.async = true;
      window.document.body.appendChild(googleMapScript);

      googleMapScript.onload = () => {
        setIsMapLoaded(true);
      };

      googleMapScript.onerror = () => {
        console.error("Error loading Google Maps API");
        setIsError(true);
      };

      return () => {
        window.document.body.removeChild(googleMapScript);
      };
    }
  }, [apiKey, isMapLoaded]);

  // Initialize Google Map after loading the script
  useEffect(() => {
    if (isMapLoaded && !googleMapRef.current) {
      initializeMap();
    }
  }, [isMapLoaded]);

  // Plot the markers whenever the parkingSpots prop is updated
  useEffect(() => {
    if (googleMapRef.current && parkingSpots.length > 0) {
      plotMarkers();
    }
  }, [parkingSpots]);

  // Initialize the map
  const initializeMap = () => {
    googleMapRef.current = new window.google.maps.Map(mapRef.current, {
      center: { lat: 21.205243878195102, lng: 72.84063645542184 }, // Set default center
      zoom: 12,
    });
  };

  // Plot markers on the map based on the parking spots data
  const plotMarkers = () => {
    if (googleMapRef.current) {
      // Clear any existing markers
      googleMapRef.current.markers?.forEach((marker) => marker.setMap(null));

      // Initialize a markers array if not already defined
      googleMapRef.current.markers = [];

      // Create and add markers for each parking spot
      parkingSpots.forEach((spot) => {
        const latitude = spot.location.coordinates[1];
        const longitude = spot.location.coordinates[0];

        const marker = new window.google.maps.Marker({
          position: { lng: longitude, lat: latitude },
          map: googleMapRef.current,
          title: spot.locName,
        });

        // Create an InfoWindow for each marker
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div><h3 style="color:black;" >${spot.locName}</h3><p style="color:black;" >2-wheel slots: ${spot.slot2wheel}</p><p style="color:black;" >4-wheel slots: ${spot.slot4wheel}</p></div>`,
        });

        // Add a click event listener to open the info window when marker is clicked
        marker.addListener("click", () => {
          infoWindow.open(googleMapRef.current, marker);
          navigate("/booking");
        });

        // Store the marker to clear it later if necessary
        googleMapRef.current.markers.push(marker);
      });
    }
  };

  if (!isMapLoaded)
    return (
      <div className="h-[400px] w-full flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl animate-pulse">Loading map...</div>
      </div>
  );
  
  return <div className='rounded-lg' ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapIntegration;
