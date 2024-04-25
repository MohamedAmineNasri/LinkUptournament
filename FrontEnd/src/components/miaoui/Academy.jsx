import React, { useEffect } from "react";
import TeamCard from "./TeamCard";
import DropDownAcademy from "./DropDownAcademy";
import { useSelector, useDispatch } from "react-redux";
import { fetchAcademybyManagerId } from "../../redux/slice/academySlice";
import academyImageteam from "../../assets/Mi-imgs/team1.jpg";
import { Link } from "react-router-dom/dist/umd/react-router-dom.development";
import HeaderNavBar from "./HeaderNavBar";
import Badge from "react-bootstrap/Badge";
import video from "../../assets/Mi-imgs/stadiumvideo.mp4";
import DefaultLayout from "../../Dashboard/src/layout/DefaultLayout";

export const Academy = () => {
  const dispatch = useDispatch();

  const { academyData, loading, error } = useSelector(
    (state) => state.root.academy
  );

  useEffect(() => {
    //normally hethi nhezeha lel login jsx
    const userId = localStorage.getItem("user");
    const userObject = JSON.parse(userId);
    //Extract the id property from the user object
    const userIdOnly = userObject.id;

    if (loading === false && error === null) {
      dispatch(
        fetchAcademybyManagerId({
          idmanger: userIdOnly,
        })
      );
      localStorage.setItem("AcademyStatus", academyData.Status);
      if (academyData !== null) {
        //hide the add academy  page if the manger already have one mesh tethaz lel home page or login
        localStorage.setItem("hideAddAcademy", true);
      }
    }
  }, []);

  //date correct format
  const date = academyData ? new Date(academyData.FoundedYear) : null;
  let formattedDate = "";
  if (date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  } else {
    formattedDate = "N/A";
  }
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Rejected":
        return "danger";
      case "Approved":
        return "success";
      default:
        return "text-muted";
    }
  };

  return (
    <DefaultLayout>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Academy
        </h2>
      </div>
      <div className="pt-13">
        <div>
          {/* <div className="site-wrap"> */}
          {/* <HeaderNavBar></HeaderNavBar> */}
          {/* header/overlay image */}
          {/* <div className="hero overlay2" style={{ position: "relative" }}>
            <video
              className="video-background"
              src={video}
              autoPlay
              loop
              muted
            ></video>
            <div className="container">
              <div className="row align-items-center">
                <div
                  className="col-lg-12 mx-auto"
                  style={{ textAlign: "-webkit-center", opacity: 0.8 }}
                >
                  <img
                    src={academyData.Logo}
                    alt="Logo"
                    className="img-fluid academyLogosizeInHero"
                    style={{ opacity: 0.8 }}
                  />
                  <h1 className="text-white notranslate">
                    {academyData.AcademyName}
                  </h1>
                </div>
              </div>
            </div>
          </div> */}

          {/* separator */}

          {/* Academy */}

          <div
          // className="hero backImgAcademyandTeam"
          // style={{
          //   backgroundImage: `url(${academyImageteam})`,
          // }}
          >
            {/* <div className="site-section "> */}
            <div>
              <div
                style={{
                  paddingRight: "20px",
                  paddingLeft: "20px",
                  paddingBottom: "80px",
                }}
              >
                <div
                  className="justify-content-center align-items-top  "
                  style={{
                    border: "solid thin",
                    borderRadius: "20px",
                    backgroundColor: "#212529c4",
                  }}
                >
                  {/* <div className="row  justify-content-center align-items-top AcademyandTeamsBox "> */}
                  <div
                    className="col-md-12 col-lg-12 word-wrap-break border-b pb-6"
                    style={{
                      textAlign: "-webkit-center",
                    }}
                  >
                    <div className="academyBox">
                      <img
                        src={academyData.Logo}
                        alt="Logo"
                        className="img-fluid academyLogoMwidth "
                        style={{ maxWidth: "250px" }}
                      />

                      <h3
                        className="mb-4 mt-3 notranslate "
                        style={{ fontWeight: "bold", fontSize: "62px" }}
                      >
                        <strong>{academyData.AcademyName}</strong>
                      </h3>
                      <p className=" mb-4 ">
                        Location :
                        <span className="text-muted notranslate">
                          {academyData.Location}
                        </span>
                      </p>
                      <p className=" mb-4 ">
                        Creating Date :{" "}
                        <span className="text-muted">{formattedDate}</span>
                      </p>
                      <p className="mb-2 ">
                        Status :{" "}
                        <span>
                          <Badge
                            className=" p-2 notranslate"
                            bg={getStatusColor(academyData.Status)}
                          >
                            {academyData.Status}
                          </Badge>
                        </span>
                      </p>
                      {academyData.Status === "Approved" && (
                        <p className="text-success mb-4">
                          This academy is approved, You can particpate in
                          tournements.
                        </p>
                      )}
                      {academyData.Status === "Pending" && (
                        <p className="text-warning mb-4">
                          This academy is still pending approval.
                        </p>
                      )}
                      {academyData.Status === "Rejected" && (
                        <p className="text-danger mb-4">
                          This academy has been rejected, You must provide
                          convencing Documents!
                        </p>
                      )}
                      <DropDownAcademy
                        id={academyData._id}
                        academyLogo={academyData.Logo}
                        academyname={academyData.AcademyName}
                      />
                    </div>
                  </div>
                  {/* Academy teams */}
                  <div className="col-md-12 col-lg-12">
                    <div className="widget-body mb-3 teamsBorderBox ">
                      <div className="p-4">
                        <TeamCard idacademy={academyData._id} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <footer className="footer-section">
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
          </footer> */}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Academy;
