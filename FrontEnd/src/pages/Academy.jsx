import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TeamCard from "../components/TeamCard";
import DropDown from "../components/DropDown";

import { useSelector, useDispatch } from "react-redux";
import { fetchAcademy } from "../redux/slice/academySlice";
import { render } from "sass";

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
            <div className="row mb-5 justify-content-center align-items-top ">
              <div
                className="col-md-6 col-lg-4 word-wrap-break"
                style={{
                  borderRadius: "20px",
                  boxShadow: "0px 1px 8px 1px green",
                }}
              >
                <div className="text-center">
                  <img
                    src="/public/assets/images/logo_1.png"
                    alt="Logo"
                    className="img-fluid rounded-circle"
                    style={{ maxWidth: "200px" }}
                  />
                  <h4 className="mb-4 mt-3 mb-0  ">
                    <strong>{academyData.AcademyName}</strong>
                  </h4>
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

                  <DropDown />
                </div>
              </div>
              <div className="col-md-6 col-lg-8">
                <div>
                  <div
                    className="widget-body mb-3"
                    style={{
                      borderRadius: "20px",
                      boxShadow: "0px 1px 8px 1px green",
                    }}
                  >
                    <div className="widget-vs">
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
