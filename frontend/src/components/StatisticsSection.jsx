import {
  Download,
  Users,
  FileText,
  Shield,
} from "lucide-react"; 

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
          <StatCard icon={<Download color="#818cf8" />} value="2.7K" label="Downloads" />
          <StatCard icon={<Users color="#818cf8" />} value="1.3K" label="Users" />
          <StatCard icon={<FileText color="#818cf8" />} value="74" label="Files" />
          <StatCard icon={<Shield color="#818cf8" />} value="46" label="Places" />
        </div>
      </div>
    </section>
  );
}
