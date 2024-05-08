import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/no-parking_12504620.png";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <img
            src={logo}
            className="w-10 h-10 text-white bg-blue-500 rounded-full"
          ></img>
          <span className="ml-3 text-xl">SmartPark</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/" className="mr-5 hover:text-white">
            Home
          </Link>
          <Link to="/about" className="mr-5 hover:text-white">
            About
          </Link>
          <Link to="/contact-us" className="mr-5 hover:text-white">
            Contact Us
          </Link>
          {/* <a className="mr-5 hover:text-white">Fourth Link</a> */}
        </nav>
        <button
          to="/login"
          className="inline-flex items-center bg-yellow-400 border-0 py-1 px-3 focus:outline-none hover:bg-yellow-500 text-black rounded text-base mt-4 md:mt-0"
          onClick={() => navigate("/login")}
        >
          Login
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
