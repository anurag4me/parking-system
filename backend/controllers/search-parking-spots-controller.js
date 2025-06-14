const ParkingSpot = require("../models/maps-model");

const searchParkingSpots = async (req, res) => {
  try {
    // Get the location name from query parameters
    const locationName = req.query.locationName;

    // Step 1: Get coordinates of the location using Google Places API
    const locationResponse = await fetch(
      `https://maps.gomaps.pro/maps/api/place/textsearch/json`,
      {
        method: get,
        params: {
          query: locationName,
          key: process.env.VITE_GOOGLE_MAPS_API_KEY,
        },
      }
    );

    if (!locationResponse.data.results.length) {
      return res.status(404).json({ message: "Location not found" });
    }

    const coordinates = locationResponse.data.results[0].geometry.location;

    // Step 2: Find nearby parking spots using MongoDB geospatial query
    const options = {
      location: {
        $geoWithin: {
          $centerSphere: [[coordinates.lng, coordinates.lat], 5 / 3963.2], // Adjust radius as needed
        },
      },
    };

    const spots = await ParkingSpot.find(options);

    res.json(spots);
  } catch (error) {
    console.error("Error searching for parking spots:", error);
    res.status(500).json({ message: "Error searching for parking spots" });
  }
};

module.exports = searchParkingSpots;
