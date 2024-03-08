import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TeamCard from "./TeamCard";
import DropDown from "./DropDown";

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
        <div className="site-mobile-menu site-navbar-target">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close">
              <span className="icon-close2 js-menu-toggle"></span>
            </div>
          </div>
          <div className="site-mobile-menu-body"></div>
        </div>

        <div
          className="hero overlay"
          style={{ backgroundImage: "url('/assets/images/academy.jpg')" }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12 mx-auto text-center">
                <img
                  src="/public/assets/images/logo_1.png"
                  alt="Logo"
                  className="img-fluid rounded-circle"
                  style={{ maxWidth: "200px" }}
                />
                <h1 className="text-white">{academyData.AcademyName}</h1>
              </div>
            </div>
          </div>
        </div>

        <div
          className="site-section "
          style={{ backgroundColor: "rgba(65, 141, 68, 0.24)" }}
        >
          <div
            className=""
            style={{ marginRight: "100px", marginLeft: "100px" }}
          >
            <div
              className="row mb-5 justify-content-center align-items-top "
              style={{
                borderRadius: "10px",
                border: "1px solid",
                borderWidth: "thin",
              }}
            >
              <div
                className="col-md-6 col-lg-4 word-wrap-break"
                style={{
                  borderRadius: "10px",
                  border: "1px solid",
                  borderWidth: "thin",
                }}
              >
                <div
                  className="text-center"
                  style={{ paddingTop: "20px", paddingBottom: "20px" }}
                >
                  <img
                    src="/public/assets/images/logo_1.png"
                    alt="Logo"
                    className="img-fluid rounded-circle"
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

                  <DropDown />
                </div>
              </div>
              <div className="col-md-6 col-lg-8">
                <div>
                  <div
                    className="widget-body mb-3"
                    style={{
                      borderRadius: "20px",
                      //boxShadow: "0px 1px 8px 1px green",
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
