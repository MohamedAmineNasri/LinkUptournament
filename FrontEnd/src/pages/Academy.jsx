import React, { Component } from "react";
import { Link } from "react-router-dom";
import KitchenSinkExample from "../components/TeamCard";
import TeamCard from "../components/TeamCard";
import DropDown from "../components/DropDown";

export class Academy extends Component {
  render() {
    return (
      <div>
        <div className="site-wrap">
          <div className="site-mobile-menu site-navbar-target">
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
                    <img src="/public/assets/images/logo.png" alt="Logo" />
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
                        <Link to="/matches" className="nav-link">
                          Matches
                        </Link>
                      </li>
                      <li>
                        <Link to="/players" className="nav-link">
                          Players
                        </Link>
                      </li>
                      <li className="active">
                        <Link to="/blog" className="nav-link">
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link to="/contact" className="nav-link">
                          Contact
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

          <div
            className="hero overlay"
            style={{
              backgroundImage: "url('/public/assets//images/bg_3.jpg')",
            }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-5 mx-auto text-center">
                  <h1 className="text-white">Matches</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Soluta, molestias repudiandae pariatur.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="site-section bg-dark">
            <div className="container">
              <div className="row mb-5">
                <div className="col-lg-12">
                  <div className="widget-next-match">
                    <div className="widget-title">
                      <div
                        className="row"
                        style={{
                          alignItems: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <div>
                          <img
                            src="/public/assets/images/logo_1.png"
                            alt="Logo"
                            className="img-fluid"
                            style={{ borderRadius: "20px" }}
                            width="80%"
                          />
                        </div>
                        <div>
                          <h3 style={{ paddingTop: "25px" }}>
                            Academy Name : Real Madrid FC
                          </h3>
                          <h3 style={{ paddingTop: "5px" }}>
                            Location : Spain, Madrid
                          </h3>
                          <h3 style={{ paddingTop: "5px" }}>
                            Creating Date : 2024-12-4
                          </h3>
                          <h3 style={{ paddingTop: "5px" }}>
                            Status : Verified
                          </h3>
                        </div>
                        <div
                          style={{
                            paddingTop: "2px",
                            paddingLeft: "25px",
                          }}
                        >
                          <DropDown></DropDown>
                        </div>
                      </div>
                    </div>
                    <div className="widget-body mb-3">
                      <div className="widget-vs">
                        <div>
                          <TeamCard></TeamCard>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="footer-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-3">
                  <div className="widget mb-3">
                    <h3>News</h3>
                    <ul className="list-unstyled links">
                      <li>
                        <a href="#">All</a>
                      </li>
                      <li>
                        <a href="#">Club News</a>
                      </li>
                      <li>
                        <a href="#">Media Center</a>
                      </li>
                      <li>
                        <a href="#">Video</a>
                      </li>
                      <li>
                        <a href="#">RSS</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="widget mb-3">
                    <h3>Tickets</h3>
                    <ul className="list-unstyled links">
                      <li>
                        <a href="#">Online Ticket</a>
                      </li>
                      <li>
                        <a href="#">Payment and Prices</a>
                      </li>
                      <li>
                        <a href="#">Contact &amp; Booking</a>
                      </li>
                      <li>
                        <a href="#">Tickets</a>
                      </li>
                      <li>
                        <a href="#">Coupon</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="widget mb-3">
                    <h3>Matches</h3>
                    <ul className="list-unstyled links">
                      <li>
                        <a href="#">Standings</a>
                      </li>
                      <li>
                        <a href="#">World Cup</a>
                      </li>
                      <li>
                        <a href="#">La Lega</a>
                      </li>
                      <li>
                        <a href="#">Hyper Cup</a>
                      </li>
                      <li>
                        <a href="#">World League</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-3">
                  <div className="widget mb-3">
                    <h3>Social</h3>
                    <ul className="list-unstyled links">
                      <li>
                        <a href="#">Twitter</a>
                      </li>
                      <li>
                        <a href="#">Facebook</a>
                      </li>
                      <li>
                        <a href="#">Instagram</a>
                      </li>
                      <li>
                        <a href="#">Youtube</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="row text-center">
                <div className="col-md-12">
                  <div className=" pt-5">
                    <p>
                      Copyright &copy;
                      <script>
                        document.write(new Date().getFullYear());
                      </script>{" "}
                      All rights reserved | This template is made with{" "}
                      <i className="icon-heart" aria-hidden="true"></i> by{" "}
                      <a href="https://colorlib.com" target="_blank">
                        Colorlib
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default Academy;
