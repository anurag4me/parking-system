import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="text-white body-font position-relative">
      <img
        src="/src/assets/hero_section.png"
        alt="hero section"
        className="w-full h-full"
      />

      <div className="container px-5 py-24 mx-auto absolute top-[10%] sm:top-[18%] md:top-[12%] lg:top-[16%] xl:top-[20%]">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold title-font text-left font-sans hover:font-serif hover:font-normal">
          Effortlessly Find, <br />
          Reserve and Pay <br />
          for parking spaces
        </h1>
        <h3 className="py-3 text-base sm:text-lg md:text- xl lg:text-2xl xl:text-3xl">
          Find and book parking spots instantly with
          <br /> our smart, location-based system
        </h3>
        <Link to="/search">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Search Parking Space Now!
            </span>
          </button>
        </Link>
      </div>
    </section>
  );
}
