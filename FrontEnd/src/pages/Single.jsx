import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Single extends Component {
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
                  <Link to="/">
                    <img src="/public/assets/images/logo.png" alt="Logo" />
                  </Link>
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
                      <li>
                        <Link to="/contact" className="nav-link">
                          SignUp
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
            style={{ backgroundImage: "url('/assets/images/bg_3.jpg')" }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-9 mx-auto text-center">
                  <h1 className="text-white">Romolu to stay at Real Nadrid?</h1>
                  <p>
                    <span>May 20, 2020</span>{" "}
                    <span className="mx-3">&bullet;</span> <span>by Admin</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="site-section first-section">
            <div className="container">
              <div className="row">
                <div className="col-md-8 blog-content">
                  <p className="lead">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Assumenda nihil aspernatur nemo sunt, qui, harum repudiandae
                    quisquam eaque dolore itaque quod tenetur quo quos labore?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quae expedita cumque necessitatibus ducimus debitis totam,
                    quasi praesentium eveniet tempore possimus illo esse,
                    facilis? Corrupti possimus quae ipsa pariatur cumque,
                    accusantium tenetur voluptatibus incidunt reprehenderit,
                    quidem repellat sapiente, id, earum obcaecati.
                  </p>
                  <p>
                    <img
                      src="/public/assets/images/img_1.jpg"
                      alt="Image"
                      className="img-fluid"
                    />
                  </p>

                  <blockquote>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Provident vero tempora aliquam excepturi labore, ad soluta
                      voluptate necessitatibus. Nulla error beatae, quam,
                      facilis suscipit quaerat aperiam minima eveniet quis
                      placeat.
                    </p>
                  </blockquote>

                  <p>
                    Eveniet deleniti accusantium nulla natus nobis nam
                    asperiores ipsa minima laudantium vero cumque cupiditate
                    ipsum ratione dicta, expedita quae, officiis provident harum
                    nisi! Esse eligendi ab molestias, quod nostrum hic saepe
                    repudiandae non. Suscipit reiciendis tempora ut, saepe
                    temporibus nemo.
                  </p>
                  <p>
                    Accusamus, temporibus, ullam. Voluptate consectetur laborum
                    totam sunt culpa repellat, dolore voluptas. Quaerat cum
                    ducimus aut distinctio sit, facilis corporis ab vel alias,
                    voluptas aliquam, expedita molestias quisquam sequi eligendi
                    nobis ea error omnis consequatur iste deleniti illum,
                    dolorum odit.
                  </p>
                  <p>
                    In adipisci corporis at delectus! Cupiditate, voluptas, in
                    architecto odit id error reprehenderit quam quibusdam
                    excepturi distinctio dicta laborum deserunt qui labore
                    dignissimos necessitatibus reiciendis tenetur corporis quas
                    explicabo exercitationem suscipit. Nisi quo nulla, nihil
                    harum obcaecati vel atque quos.
                  </p>
                  <p>
                    <img
                      src="/public/assets/images/img_2.jpg"
                      alt="Image"
                      className="img-fluid"
                    />
                  </p>
                  <p>
                    Amet sint explicabo maxime accusantium qui dicta enim quia,
                    nostrum id libero voluptates quae suscipit dolor quam
                    tenetur dolores inventore illo laborum, corporis non ex,
                    debitis quidem obcaecati! Praesentium maiores illo atque
                    error! Earum, et, fugit. Sint, delectus molestiae. Totam.
                  </p>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Culpa iste, repudiandae facere aperiam sapiente, officia
                    delectus soluta molestiae nihil corporis animi quos ratione
                    qui labore? Sint eaque perspiciatis minus illum.
                  </p>
                  <p>
                    Consectetur porro odio quod iure quaerat cupiditate
                    similique, dolor reprehenderit molestias provident, esse
                    dolorum omnis architecto magni amet corrupti neque ratione
                    sunt beatae perspiciatis? Iste pariatur omnis sed ut itaque.
                  </p>
                  <p>
                    Id similique, rem ipsam accusantium iusto dolores sit velit
                    ex quas ea atque, molestiae. Sint, sed. Quisquam, suscipit!
                    Quisquam quibusdam maiores fugiat eligendi eius
                    consequuntur, molestiae saepe commodi expedita nemo!
                  </p>
                  <div className="pt-5">
                    <p>
                      Categories: <a href="#">HTML5</a>,{" "}
                      <a href="#">Bootstrap 4</a> Tags: <a href="#">#html</a>,{" "}
                      <a href="#">#trends</a>
                    </p>
                  </div>

                  <div className="pt-5">
                    <h3 className="mb-5 text-white">6 Comments</h3>
                    <ul className="comment-list">
                      <li className="comment">
                        <div className="vcard bio">
                          <img
                            src="/public/assets/images/person_1.jpg"
                            alt="Image placeholder"
                          />
                        </div>
                        <div className="comment-body">
                          <h3>Jean Doe</h3>
                          <div className="meta">January 9, 2018 at 2:21pm</div>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Pariatur quidem laborum necessitatibus, ipsam
                            impedit vitae autem, eum officia, fugiat saepe enim
                            sapiente iste iure! Quam voluptas earum impedit
                            necessitatibus, nihil?
                          </p>
                          <p>
                            <a href="#" className="reply">
                              Reply
                            </a>
                          </p>
                        </div>
                      </li>

                      <li className="comment">
                        <div className="vcard bio">
                          <img
                            src="/public/assets/images/person_1.jpg"
                            alt="Image placeholder"
                          />
                        </div>
                        <div className="comment-body">
                          <h3>Jean Doe</h3>
                          <div className="meta">January 9, 2018 at 2:21pm</div>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Pariatur quidem laborum necessitatibus, ipsam
                            impedit vitae autem, eum officia, fugiat saepe enim
                            sapiente iste iure! Quam voluptas earum impedit
                            necessitatibus, nihil?
                          </p>
                          <p>
                            <a href="#" className="reply">
                              Reply
                            </a>
                          </p>
                        </div>

                        <ul className="children">
                          <li className="comment">
                            <div className="vcard bio">
                              <img
                                src="/public/assets/images/person_1.jpg"
                                alt="Image placeholder"
                              />
                            </div>
                            <div className="comment-body">
                              <h3>Jean Doe</h3>
                              <div className="meta">
                                January 9, 2018 at 2:21pm
                              </div>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Pariatur quidem laborum
                                necessitatibus, ipsam impedit vitae autem, eum
                                officia, fugiat saepe enim sapiente iste iure!
                                Quam voluptas earum impedit necessitatibus,
                                nihil?
                              </p>
                              <p>
                                <a href="#" className="reply">
                                  Reply
                                </a>
                              </p>
                            </div>

                            <ul className="children">
                              <li className="comment">
                                <div className="vcard bio">
                                  <img
                                    src="/public/assets/images/person_1.jpg"
                                    alt="Image placeholder"
                                  />
                                </div>
                                <div className="comment-body">
                                  <h3>Jean Doe</h3>
                                  <div className="meta">
                                    January 9, 2018 at 2:21pm
                                  </div>
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Pariatur quidem laborum
                                    necessitatibus, ipsam impedit vitae autem,
                                    eum officia, fugiat saepe enim sapiente iste
                                    iure! Quam voluptas earum impedit
                                    necessitatibus, nihil?
                                  </p>
                                  <p>
                                    <a href="#" className="reply">
                                      Reply
                                    </a>
                                  </p>
                                </div>

                                <ul className="children">
                                  <li className="comment">
                                    <div className="vcard bio">
                                      <img
                                        src="/public/assets/images/person_1.jpg"
                                        alt="Image placeholder"
                                      />
                                    </div>
                                    <div className="comment-body">
                                      <h3>Jean Doe</h3>
                                      <div className="meta">
                                        January 9, 2018 at 2:21pm
                                      </div>
                                      <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit. Pariatur quidem
                                        laborum necessitatibus, ipsam impedit
                                        vitae autem, eum officia, fugiat saepe
                                        enim sapiente iste iure! Quam voluptas
                                        earum impedit necessitatibus, nihil?
                                      </p>
                                      <p>
                                        <a href="#" className="reply">
                                          Reply
                                        </a>
                                      </p>
                                    </div>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>

                      <li className="comment">
                        <div className="vcard bio">
                          <img
                            src="/public/assets/images/person_1.jpg"
                            alt="Image placeholder"
                          />
                        </div>
                        <div className="comment-body">
                          <h3>Jean Doe</h3>
                          <div className="meta">January 9, 2018 at 2:21pm</div>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Pariatur quidem laborum necessitatibus, ipsam
                            impedit vitae autem, eum officia, fugiat saepe enim
                            sapiente iste iure! Quam voluptas earum impedit
                            necessitatibus, nihil?
                          </p>
                          <p>
                            <a href="#" className="reply">
                              Reply
                            </a>
                          </p>
                        </div>
                      </li>
                    </ul>

                    <div className="comment-form-wrap pt-5">
                      <h3 className="mb-5">Leave a comment</h3>
                      <form action="#" className="p-5 bg-light">
                        <div className="form-group">
                          <label for="name">Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                          />
                        </div>
                        <div className="form-group">
                          <label for="email">Email *</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                          />
                        </div>
                        <div className="form-group">
                          <label for="website">Website</label>
                          <input
                            type="url"
                            className="form-control"
                            id="website"
                          />
                        </div>

                        <div className="form-group">
                          <label for="message">Message</label>
                          <textarea
                            name=""
                            id="message"
                            cols="30"
                            rows="10"
                            className="form-control"
                          ></textarea>
                        </div>
                        <div className="form-group">
                          <input
                            type="submit"
                            value="Post Comment"
                            className="btn btn-primary py-3 px-4 text-white"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 sidebar">
                  <div className="sidebar-box">
                    <form action="#" className="search-form">
                      <div className="form-group">
                        <span className="icon fa fa-search"></span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Type a keyword and hit enter"
                        />
                      </div>
                    </form>
                  </div>
                  <div className="sidebar-box">
                    <div className="categories">
                      <h3 className="text-uppercase">Categories</h3>
                      <li>
                        <a href="#">
                          Creatives <span>(12)</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          News <span>(22)</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Design <span>(37)</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          HTML <span>(42)</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          Web Development <span>(14)</span>
                        </a>
                      </li>
                    </div>
                  </div>
                  <div className="sidebar-box">
                    <img
                      src="/public/assets/images/person_1.jpg"
                      alt="Image placeholder"
                      className="img-fluid mb-4"
                    />
                    <h3 className="text-uppercase">About The Author</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Ducimus itaque, autem necessitatibus voluptate quod
                      mollitia delectus aut, sunt placeat nam vero culpa
                      sapiente consectetur similique, inventore eos fugit
                      cupiditate numquam!
                    </p>
                    <p>
                      <a href="#" className="btn btn-primary text-white">
                        Read More
                      </a>
                    </p>
                  </div>

                  <div className="sidebar-box">
                    <h3 className="text-uppercase">Paragraph</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Ducimus itaque, autem necessitatibus voluptate quod
                      mollitia delectus aut, sunt placeat nam vero culpa
                      sapiente consectetur similique, inventore eos fugit
                      cupiditate numquam!
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

export default Single;
