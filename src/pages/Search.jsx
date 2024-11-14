import React, { useState } from "react";
import MapIntegration from "../components/MapIntegration";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [parkingSpots, setParkingSpots] = useState([]); // State to store parking spots data

  // Function to handle the search request
  const handleSearch = async (searchTerm) => {
    try {
      // Fetch parking spots based on the location name using the backend API
      const response = await fetch(
        `http://localhost:5000/api/parking-spots/nearby?locationName=${encodeURIComponent(
          searchTerm
        )}`
      );
      const data = await response.json();

      if (response.ok) {
        // Update the parking spots state with the fetched data
        setParkingSpots(data);
      } else {
        console.error("Error fetching parking spots:", data.message);
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center max-w-3xl mx-auto mt-8 mb-4"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for parking spaces..."
          className="w-full px-4 py-2 text-gray-700 bg-white border rounded-l-lg focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
        >
          Search
        </button>
      </form>

      {/* Pass the parkingSpots data to the MapIntegration component */}
      <MapIntegration parkingSpots={parkingSpots} />

    </>
  );
};

export default Search;
