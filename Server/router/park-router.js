const express = require("express");
const router = express.Router();

const parkingSpotForm = require("../controllers/parking-spots-controller");
const searchParkingSpots = require("../controllers/search-parking-spots-controller");

router.route("/").post(parkingSpotForm); // Original endpoint
router.route("/nearby").get(searchParkingSpots); // New endpoint for location-based search

module.exports = router;
