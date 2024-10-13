import React, { useEffect, useRef } from 'react';

const MapIntegration = () => {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const parkingSpots = [
    { id: 1, name: 'Ck pithawala', latitude: 21.132194655174033, longitude: 72.71809419773714, address: '4PJ9+R64, Near Malvan Mandir Via Magdalla Port, Dumas Rd, Surat, Gujarat 395007' },
    { id: 2, name: 'Surat Station', latitude: 21.2049, longitude: 72.8411, address: '6R3R+X8R, Railway Station Area, Varachha, Surat, Gujarat 395101' },
    { id: 3, name: 'Sachin Railway Station', latitude: 21.07798835551378, longitude: 72.87442935109092, address: '3VHF+3QX, Pali Gam, Sachin, Surat, Gujarat 394230' },
    // Add more sample parking spots as needed
  ];
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener('load', () => {
      initializeMap();
    });

    return () => {
      window.document.body.removeChild(googleMapScript);
    };
  }, []);

  useEffect(() => {
    if (googleMapRef.current) {
      plotMarkers();
    }
  }, [parkingSpots]);

  const initializeMap = () => {
    googleMapRef.current = new window.google.maps.Map(mapRef.current, {
      center: { lat: 21.2049, lng: 72.8411 },
      zoom: 10,
    });
    plotMarkers();
  };

  const plotMarkers = () => {
    parkingSpots.forEach((spot) => {
      const marker = new window.google.maps.Marker({
        position: { lat: spot.latitude, lng: spot.longitude },
        map: googleMapRef.current,
        title: spot.name,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div><h3>${spot.name}</h3><p>${spot.address}</p></div>`,
      });

      marker.addListener('click', () => {
        infoWindow.open(googleMapRef.current, marker);
      });
    });
  };

  return <div className='rounded-lg' ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapIntegration;