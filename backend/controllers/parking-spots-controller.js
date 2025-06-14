const ParkingSpot = require("../models/maps-model");

const parkingSpotForm = async (req, res) => {
  try {
    // Logging to see if request received and parameters are correct
    console.log("Fetching parking spots");

    // Static coordinates for debugging (longitude, latitude)
    const options = {
      location: {
        $geoWithin: {
          $centerSphere: [[72.84063645542184, 21.205243878195102], 50 / 3963.2], // 50 miles radius for debugging
        },
      },
    };

    // Fetch parking spots based on options
    const spots = await ParkingSpot.find(options);
    // console.log("Found spots:", spots); // Debug log to check fetched data

    if (spots.length === 0) {
      console.log("No parking spots found for the given criteria");
    }

    res.json(spots);
  } catch (error) {
    console.error("Error fetching parking spots:", error);
    res.status(500).json({ message: "Error fetching parking spots" });
  }
};

module.exports = parkingSpotForm;
