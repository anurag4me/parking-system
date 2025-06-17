import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ActiveLinkContext } from "../App";
import hero from "../assets/hero_section.png";

const Hero = () => {
  const { setActiveLink } = useContext(ActiveLinkContext);

  const handleButtonClick = () => {
    setActiveLink("Search");
  };

  return (
    <section className="w-full pb-[9vw] relative overflow-x-hidden">
      <img
        src={hero}
        alt="hero section"
        className="w-full h-full"
      />
      <div className="z-0 container mx-auto absolute top-[4vw] left-[5vw]">
        <h1 className="text-[6vw] font-bold title-font text-left font-sans hover:font-serif hover:font-normal">
          Effortlessly Find, <br />
          Reserve and Pay <br />
          for parking spaces
        </h1>
        <h3 className="py-3 text-[2vw]">
          Find and book parking spots instantly with
          <br /> our smart, location-based system
        </h3>
        <Link 
            to="/booking"
            onClick={handleButtonClick}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-[1.5vw] font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-purple-800"
         >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Book Parking Space Now!
            </span>
        </Link>
      </div>
    </section>
  );
};

export default Hero;