import React, { useEffect } from "react";
import TeamCard from "./TeamCard";
import DropDownAcademy from "./DropDownAcademy";
import { useSelector, useDispatch } from "react-redux";
import { fetchAcademy } from "../redux/slice/academySlice";

export const Academy = () => {
  const dispatch = useDispatch();

  const { academyData, loading, error } = useSelector((state) => state.academy);
  useEffect(() => {
    dispatch(fetchAcademy());
  }, [dispatch]);

  //date correct format
  const date = new Date(academyData.FoundedYear);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  return (
    <div>
      <div className="site-wrap">
        {/* header/overlay image */}
        <div>
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
                      <li className="active">
                        <a href="blog.html" className="nav-link">
                          Blog
                        </a>
                      </li>
                      <li>
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
        </div>
        <div
          className="hero overlay"
          style={{ backgroundImage: "url('/assets/images/1.jpg')" }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12 mx-auto text-center">
                <img
                  src="/public/assets/images/rmLogo.png"
                  alt="Logo"
                  className="img-fluid"
                  style={{ width: "300px" }}
                />
                <h1 className="text-white">{academyData.AcademyName}</h1>
              </div>
            </div>
          </div>
        </div>
        {/* separator */}

        {/* Academy */}
        <div
          className="hero "
          style={{
            backgroundImage: "url('/assets/images/team1.jpg')",
            height: "1000px",
          }}
        >
          <div className="site-section ">
            <div style={{ marginRight: "100px", marginLeft: "100px" }}>
              <div
                className="row  justify-content-center align-items-top "
                style={{
                  marginTop: "80px",
                  borderRadius: "20px",
                  boxShadow: "1px 1px 7px 3px rgba(1, 0, 0, 0.5)",
                  backgroundColor: "#2f4f4f6b",
                }}
              >
                <div className="col-md-5 col-lg-4 word-wrap-break">
                  <div
                    className="text-center"
                    style={{ paddingTop: "50px", paddingBottom: "20px" }}
                  >
                    <img
                      src="/public/assets/images/rmLogo.png"
                      alt="Logo"
                      className="img-fluid " //rounded-circle
                      style={{ maxWidth: "200px" }}
                    />
                    <h3 className="mb-4 mt-3 mb-0  ">
                      <strong>{academyData.AcademyName}</strong>
                    </h3>
                    <p className=" mb-4">
                      Location :{" "}
                      <span className="text-muted">{academyData.Location}</span>
                    </p>
                    <p className=" mb-4">
                      Creating Date :{" "}
                      <span className="text-muted">{formattedDate}</span>
                    </p>
                    <p className="mb-4">
                      Status :{" "}
                      <span className="text-muted">{academyData.Status}</span>
                    </p>

                    <DropDownAcademy id={academyData._id} />
                  </div>
                </div>
                {/* Academy teams */}
                <div className="col-md-7 col-lg-8">
                  <div
                    className="widget-body mb-3"
                    style={{
                      borderRadius: "20px",
                      height: "650px",
                      overflowY: "auto",
                      scrollbarWidth: "none", // Hide the scrollbar for Firefox
                      msOverflowStyle: "none", // Hide the scrollbar for Internet Explorer/Edge
                      WebkitScrollbarWidth: "none", // Hide the scrollbar for WebKit browsers (Chro
                    }}
                  >
                    <div
                      style={{
                        border: "solid",
                        borderWidth: "thin",
                        borderRadius: "20px",
                        padding: "30px",
                      }}
                    >
                      <TeamCard />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academy;
