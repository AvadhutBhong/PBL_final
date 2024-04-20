import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="p-3 text-light bg-dark mb-5">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-light text-decoration-none"
          >
            <svg
              className="bi me-2"
              width="40"
              height="32"
              role="img"
              aria-label="Bootstrap"
            >
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </Link>

          <span className="fs-4 me-4">StudiousHub</span>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <NavLink to="/" className="nav-link px-2 text-light">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/amcat" className="nav-link px-2 text-light">
                Amcat
              </NavLink>
            </li>
            <li>
              <Link to="/university" className="nav-link px-2 text-light">
                University
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link px-2 text-light">
                About
              </Link>
            </li>
          </ul>

          <div className="text-end">
            <button type="button" className="btn btn-outline-light me-2">
              <Link to="/login" className="text-light text-decoration-none">
                Login
              </Link>
            </button>
            <button type="button" className="btn btn-warning">
              <Link to="/signup" className="text-dark text-decoration-none">
                SignUp
              </Link>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
