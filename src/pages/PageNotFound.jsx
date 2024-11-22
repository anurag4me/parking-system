import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <section id="error-page">
        <div className="content p-4">
          <h1 className="header text-9xl text-center pt-10 text-blue-400">
            404
          </h1>
          <h3 className="text-center text-2xl pb-10 text-blue-400">
            Sorry! Page not found
          </h3>
          <p className="text-center text-white-900 pb-3">
            Ohoo! looks like the page you trying to reach doesn't exist.
            <br />
            If you think there is an issue, feel free to report it.
          </p>
          <div className="btns text-center">
            <NavLink
              to="/"
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg m-4"
            >
              return home
            </NavLink>
            <NavLink
              to="/contact-us"
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg m-4"
            >
              report problem
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default PageNotFound;
