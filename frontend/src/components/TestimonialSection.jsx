import React from 'react';
import TestimonialCard from './cards/TestimonialCard';

export default function TestimonialSection() {
  return (
    <section className="text-white body-font">
      <div className="container px-5 py-16 mx-auto">
        <h1 className="text-3xl font-medium title-font mb-12 text-center">
          Testimonials
        </h1>
        <div className="flex flex-wrap -m-4">
          <TestimonialCard
            quote="Since implementing the smart parking management system, our parking experience has been transformed. No more circling endlessly for a spot, now it's efficient and stress-free!"
            name="Sarah M"
            role="City Resident"
          />
          <TestimonialCard
            quote="The smart parking system has made a significant impact on our business. Customers spend less time searching for parking, leading to increased foot traffic and sales."
            name="John D."
            role="Small Business Owner"
          />
        </div>
      </div>
    </section>
  );
}