import React, { useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (searchTerm) => {
    // Implement your search logic here
    console.log("Searching for:", searchTerm);
    // Update parkingSpots based on the search results
    // For now, we'll just log the search term
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
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
  );
};

export default Search;
