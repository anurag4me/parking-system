const mongoose = require("mongoose");

const parkingSpotSchema = new mongoose.Schema({
  locName: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  slot2wheel: {
    type: Number,
    required: true,
  },
  slot4wheel: {
    type: Number,
    required: true,
  },
});

// Add geospatial index on the location field for efficient spatial queries
parkingSpotSchema.index({ location: "2dsphere" });

const ParkingSpots = mongoose.model("location", parkingSpotSchema);

module.exports = ParkingSpots;
