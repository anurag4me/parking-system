import FeatureCard from "../components/cards/FeatureCard";

const About = () => {
  return (
    <section className="container px-5 py-24 mx-auto">
      <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
        <FeatureCard
          icon={<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>}
          title="Efficient Parking Solutions"
          description="Smart parking systems offer an innovative and efficient solution for managing parking spaces, alleviating the problems of parking congestion and difficulty finding available spaces. By utilizing advanced technologies such as sensors, wireless communication, and data analytics, smart parking systems can provide real-time information about parking availability, helping drivers locate and access available parking spots quickly and easily."
        />
        <FeatureCard
          icon={
            <>
              <circle cx="6" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
            </>
          }
          title="Smart Parking Innovations"
          description="The potential of smart parking systems is immense, and numerous applications are being explored to enhance the user experience and provide further benefits. For example, research is currently being conducted to develop autonomous robot valets that can take cars to and from parking spots, as well as intelligent charging systems that can detect electric vehicles and provide charging services."
        />
        <FeatureCard
          icon={
            <>
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </>
          }
          title="Smart Parking Revolution"
          description="Smart parking systems offer a great opportunity to improve the efficiency and convenience of parking, as well as reduce traffic congestion in urban areas. As the technology continues to advance and become more widely available, more applications of this technology will be developed and implemented, providing even greater benefits to drivers and cities alike."
        />
      </div>
    </section>
  );
};

export default About;
