import React, { Component } from "react";

export class AddAcademy extends Component {
  render() {
    return (
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
                      <a href="index.html" className="nav-link">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="matches.html" className="nav-link">
                        Matches
                      </a>
                    </li>
                    <li>
                      <a href="players.html" className="nav-link">
                        Players
                      </a>
                    </li>
                    <li>
                      <a href="blog.html" className="nav-link">
                        Blog
                      </a>
                    </li>
                    <li className="active">
                      <a href="contact.html" className="nav-link">
                        Contact
                      </a>
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
          style={{ backgroundImage: "url('/assets/images/bg_3.jpg')" }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-9 mx-auto text-center">
                <h1 className="text-white">add Academy ! </h1>
              </div>
            </div>
          </div>
        </div>

        <div class="site-section">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 order-lg-1">
                <img
                  src="/public/assets/images/fbAcademy.jpg"
                  alt="Logo"
                  class="img-fluid"
                />
              </div>
              <div class="col-lg-6 order-lg-2">
                <form action="#">
                  <div class="row">
                    <div class="col-md-12 form-group">
                      <label for="Aname">Academy Name:</label>
                      <input
                        type="text"
                        class="form-control"
                        id="Aname"
                        placeholder="Academy Name"
                      />
                    </div>
                    <div class="col-md-12 form-group">
                      <label for="location">Academy Location:</label>
                      <input
                        type="text"
                        class="form-control"
                        id="location"
                        placeholder="Location"
                      />
                    </div>
                    <div class="col-md-12 form-group">
                      <label for="foundedDate">Founded Date:</label>
                      <input
                        type="date"
                        class="form-control"
                        id="foundedDate"
                      />
                    </div>
                    <div class="col-md-12 form-group">
                      <label for="logoInput">Upload Logo:</label>
                      <input
                        type="file"
                        class="form-control-file"
                        id="logoInput"
                        accept=".jpg,.jpeg,.png"
                      />
                    </div>
                    <div class="col-md-12 form-group">
                      <label for="fileInput">
                        Upload Legitimacy Documents:
                      </label>
                      <input
                        type="file"
                        class="form-control-file"
                        id="fileInput"
                        accept=".pdf,.doc,.docx"
                      />
                    </div>
                    <div class="col-md-12 form-group">
                      <input
                        type="submit"
                        class="btn btn-primary py-3 px-5 btn-block"
                        value="Send Message"
                      />
                    </div>
                  </div>
                </form>
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
    );
  }
}

export default AddAcademy;
