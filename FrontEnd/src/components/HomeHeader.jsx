import React from "react";
import { Link } from "react-router-dom";

const HomeHeader = () => {
  return (
    <div>
      <div className="site-mobile-menu site-navbar-target ">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close">
            <span className="icon-close2 js-menu-toggle"></span>
          </div>
        </div>
        <div className="site-mobile-menu-body"></div>
      </div>
      <header className="site-navbar py-4" role="banner">
        <div className="container">
          <div className="d-flex align-items-center">
            <div className="site-logo">
              <a href="index.html">
                <img src="./public/assets/images/logo.png" alt="Logo" />
              </a>
            </div>
            <div className="ml-auto">
              <nav
                className="site-navigation position-relative text-right"
                role="navigation"
              >
                <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                  <li>
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/fetchmatchforview" className="nav-link">
                      Match Cards
                    </Link>
                  </li>
                  <li>
                    <Link to="/a" className="nav-link">
                      Match Time
                    </Link>
                  </li>
                  <li>
                    <Link to="/addAcademy" className="nav-link">
                      Academy Creation
                    </Link>
                  </li>
                  <li>
                    <Link to="/Academy" className="nav-link">
                      Academies
                    </Link>
                  </li>
                  <li>
                    <Link to="/lineup" className="nav-link">
                      LineUp Builder
                    </Link>
                  </li>
                  <li className="active">
                    <Link to="/signin" className="nav-link">
                      Signup
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" className="nav-link">
                      Profile
                    </Link>
                  </li>
                </ul>
              </nav>

              <a
                href="#"
                className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right text-white"
              >
                <span className="icon-menu h3 text-white"></span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HomeHeader;
