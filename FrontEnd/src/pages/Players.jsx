import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Players extends Component {
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
            style={{ backgroundImage: "url('/public/assets/images/bg_3.jpg')" }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-5 mx-auto text-center">
                  <h1 className="text-white">Players</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Soluta, molestias repudiandae pariatur.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="site-section">
            <div className="container">
              <div className="row">
                <div className="col-6 title-section">
                  <h2 className="heading">Star Players / Videos</h2>
                </div>
                <div className="col-6 text-right">
                  <div className="custom-nav">
                    <a href="#" className="js-custom-prev-v2">
                      <span className="icon-keyboard_arrow_left"></span>
                    </a>
                    <span></span>
                    <a href="#" className="js-custom-next-v2">
                      <span className="icon-keyboard_arrow_right"></span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="owl-4-slider owl-carousel">
                <div className="item">
                  <div className="video-media">
                    <img
                      src="/public/assets/images/img_1.jpg"
                      alt="Image"
                      className="img-fluid"
                    />
                    <a
                      href="https://vimeo.com/139714818"
                      className="d-flex play-button align-items-center"
                      data-fancybox
                    >
                      <span className="icon mr-3">
                        <span className="icon-play"></span>
                      </span>
                      <div className="caption">
                        <span className="meta">#10 / Forward</span>
                        <h3 className="m-0">Phillip Hobbs</h3>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="item">
                  <div className="video-media">
                    <img
                      src="/public/assets/images/img_2.jpg"
                      alt="Image"
                      className="img-fluid"
                    />
                    <a
                      href="https://vimeo.com/139714818"
                      className="d-flex play-button align-items-center"
                      data-fancybox
                    >
                      <span className="icon mr-3">
                        <span className="icon-play"></span>
                      </span>
                      <div className="caption">
                        <span className="meta">#7 / Forward</span>
                        <h3 className="m-0">Garry Norris</h3>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="item">
                  <div className="video-media">
                    <img
                      src="/public/assets/images/img_3.jpg"
                      alt="Image"
                      className="img-fluid"
                    />
                    <a
                      href="https://vimeo.com/139714818"
                      className="d-flex play-button align-items-center"
                      data-fancybox
                    >
                      <span className="icon mr-3">
                        <span className="icon-play"></span>
                      </span>
                      <div className="caption">
                        <span className="meta">#4 / Forward</span>
                        <h3 className="m-0">Romolu Harper</h3>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="item">
                  <div className="video-media">
                    <img
                      src="/public/assets/images/img_1.jpg"
                      alt="Image"
                      className="img-fluid"
                    />
                    <a
                      href="https://vimeo.com/139714818"
                      className="d-flex play-button align-items-center"
                      data-fancybox
                    >
                      <span className="icon mr-3">
                        <span className="icon-play"></span>
                      </span>
                      <div className="caption">
                        <span className="meta">#4 / Forward</span>
                        <h3 className="m-0">Phillip Hobbs</h3>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="item">
                  <div className="video-media">
                    <img
                      src="/public/assets/images/img_2.jpg"
                      alt="Image"
                      className="img-fluid"
                    />
                    <a
                      href="https://vimeo.com/139714818"
                      className="d-flex play-button align-items-center"
                      data-fancybox
                    >
                      <span className="icon mr-3">
                        <span className="icon-play"></span>
                      </span>
                      <div className="caption">
                        <span className="meta">#1 / GoalKeeper</span>
                        <h3 className="m-0">Garry Norris</h3>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="item">
                  <div className="video-media">
                    <img
                      src="/public/assets/images/img_3.jpg"
                      alt="Image"
                      className="img-fluid"
                    />
                    <a
                      href="https://vimeo.com/139714818"
                      className="d-flex play-button align-items-center"
                      data-fancybox
                    >
                      <span className="icon mr-3">
                        <span className="icon-play"></span>
                      </span>
                      <div className="caption">
                        <span className="meta">#8 / Forward</span>
                        <h3 className="m-0">Romolu Harper</h3>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container site-section">
            <div className="row">
              <div className="col-6 title-section">
                <h2 className="heading">Our Blog</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="custom-media d-flex">
                  <div className="img mr-4">
                    <img
                      src="/public/assets/images/img_1.jpg"
                      alt="Image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="text">
                    <span className="meta">May 20, 2020</span>
                    <h3 className="mb-4">
                      <a href="#">Romolu to stay at Real Nadrid?</a>
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Possimus deserunt saepe tempora dolorem.
                    </p>
                    <p>
                      <a href="#">Read more</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="custom-media d-flex">
                  <div className="img mr-4">
                    <img
                      src="/public/assets/images/img_3.jpg"
                      alt="Image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="text">
                    <span className="meta">May 20, 2020</span>
                    <h3 className="mb-4">
                      <a href="#">Romolu to stay at Real Nadrid?</a>
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Possimus deserunt saepe tempora dolorem.
                    </p>
                    <p>
                      <a href="#">Read more</a>
                    </p>
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
                        <a href="#">Tournament</a>
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

export default Players;
