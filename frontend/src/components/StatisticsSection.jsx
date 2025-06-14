import React from "react";
import StatCard from "./cards/StatCard";

export default function StatisticsSection() {
  return (
    <section className="text-white body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4">
            Majority support from customers
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Customer satisfaction surveys consistently reveal overwhelming
            support for our smart parking system. With its user-friendly
            interface and seamless operation, it has become an indispensable
            tool for urban commuters and city dwellers alike.
          </p>
        </div>
        <div className="flex flex-wrap -m-4 text-center">
          <StatCard
            icon={<path d="M8 17l4 4 4-4m-4-5v9"></path>}
            value="2.7K"
            label="Downloads"
          />
          <StatCard
            icon={<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>}
            value="1.3K"
            label="Users"
          />
          <StatCard
            icon={<path d="M3 18v-6a9 9 0 0118 0v6"></path>}
            value="74"
            label="Files"
          />
          <StatCard
            icon={<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>}
            value="46"
            label="Places"
          />
        </div>
      </div>
    </section>
  );
}
