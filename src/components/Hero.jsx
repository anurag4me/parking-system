import React from "react";

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
        <h3 className="py-3 text-base sm:text-lg md:text- xl lg:text-2xl xl:text-3xl">Find and book parking spots instantly with<br/> our smart, location-based system</h3>
      </div>
    </section>
  );
}
