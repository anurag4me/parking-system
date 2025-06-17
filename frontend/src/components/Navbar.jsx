import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/no-parking_12504620.png";
import { useAuth } from "../store/auth";
import { ActiveLinkContext } from "../App";

const Navbar = () => {
  const { activeLink, setActiveLink } = useContext(ActiveLinkContext);
  const { isLoggedIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[rgba(10,10,10,0.8)] backdrop-blur-md border-b border-white/10 shadow-lg h-16">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between h-full">
          <Link to="/" className="flex items-center space-x-2" onClick={() => handleLinkClick("Home")}>
            <img src={logo} alt="Logo" className="h-8" />
            <span className="text-white text-xl font-semibold">SmartPark</span>
          </Link>

          {/* Hamburger */}
          <div
            className="relative w-7 h-6 z-50 cursor-pointer md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span
              className={`absolute top-0 left-0 w-full h-0.5 bg-white transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-[11px]" : ""
              }`}
            />
            <span
              className={`absolute top-2.5 left-0 w-full h-0.5 bg-white transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[11px]" : ""
              }`}
            />
          </div>


          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 items-center text-white text-sm font-medium">
            {[
              ["Home", "/"],
              ["Search", "/search"],
              ["Booking", "/booking"],
              ...(isLoggedIn ? [["User Profile", "/profile"]] : []),
              ["Contact", "/contact-us"],
              isLoggedIn ? ["Logout", "/logout"] : ["Login", "/login"],
            ].map(([label, to]) => (
              <li key={label}>
                <Link
                  to={to}
                  onClick={() => handleLinkClick(label)}
                  className={`hover:text-blue-400 transition-colors ${
                    activeLink === label ? "text-blue-500" : "text-white"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="h-16" />

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-md transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-40 md:hidden`}
      >
        <ul className="flex flex-col items-center justify-center h-full space-y-6 px-4 py-6 text-white text-lg font-semibold">
          {[
            ["Home", "/"],
            ["Search", "/search"],
            ["Booking", "/booking"],
            ...(isLoggedIn ? [["User Profile", "/profile"]] : []),
            ["Contact", "/contact-us"],
            isLoggedIn ? ["Logout", "/logout"] : ["Login", "/login"],
          ].map(([label, to]) => (
            <li key={label}>
              <Link
                to={to}
                onClick={() => handleLinkClick(label)}
                className={`hover:text-blue-400 transition-colors ${
                  activeLink === label ? "text-blue-500" : "text-white"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
