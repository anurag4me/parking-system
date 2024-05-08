import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import About from "./components/About.jsx";
import ContactUs from "./components/ContactUs.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/about", element: <About /> },
      { path: "/contact-us", element: <ContactUs /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
