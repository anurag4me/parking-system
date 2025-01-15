import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { createContext, useState, useEffect } from "react";

export const ActiveLinkContext = createContext();

function App() {
  const [activeLink, setActiveLink] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setActiveLink("Home");
    } else if (path === "/search") {
      setActiveLink("Search");
    } else if (path === "/rent-your-space") {
      setActiveLink("Rent Parking");
    } else if (path === "/contact-us") {
      setActiveLink("Contact");
    } else if (path === "/login") {
      setActiveLink("Login");
    } else if (path === "/logout") {
      setActiveLink("Logout");
    }
  }, [location.pathname]);

  return (
    <ActiveLinkContext.Provider value={{ activeLink, setActiveLink }}>
      <Navbar />
      <Outlet />
      <Footer />
    </ActiveLinkContext.Provider>
  );
}

export default App;