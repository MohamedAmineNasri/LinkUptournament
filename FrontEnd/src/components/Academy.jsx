import React, { useEffect } from "react";
import TeamCard from "./TeamCard";
import DropDownAcademy from "./DropDownAcademy";
import { useSelector, useDispatch } from "react-redux";
import { fetchAcademy } from "../redux/slice/academySlice";
import academyImagespectators from "../assets/Mi-imgs/1.jpg";
import academyImageteam from "../assets/Mi-imgs/team1.jpg";
import { Link } from "react-router-dom/dist/umd/react-router-dom.development";

export const Academy = () => {
  const dispatch = useDispatch();

  const { academyData, loading, error } = useSelector((state) => state.root.academy);
  useEffect(() => {
    dispatch(fetchAcademy());
  }, [dispatch]);

  //date correct format
  // const date = new Date(academyData.FoundedYear);
  const date = academyData ? new Date(academyData.FoundedYear) : null;

  // const year = date.getFullYear();
  // const month = date.getMonth() + 1;
  // const day = date.getDate();
  // const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
  //   .toString()
  //   .padStart(2, "0")}`;
let formattedDate = '';
if (date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
} else {
  // Handle the case when date is null
  formattedDate = 'N/A';
}

  return (
    <div>
      <div className="site-wrap">
        {/* header/overlay image */}
        <div>
          <header className="site-navbar py-4" role="banner">
            <div className="container-fluid">
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
                        <Link to="/tests" className="nav-link">
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
        <div
          className="hero overlay"
          style={{ backgroundImage: `url(${academyImagespectators})` }}
        >
          <div className="container">
            <div className="row align-items-center">
               <div
                className="col-lg-12 mx-auto "
                style={{ textAlign: "-webkit-center" }}
              >
                <img
                  src={academyData.Logo}
                  alt="Logo"
                  className="img-fluid academyLogosizeInHero"
                />
                <h1 className="text-white">{academyData.AcademyName}</h1>
              </div>
            </div>
          </div>
        </div>
        {/* separator */}

        {/* Academy */}
        <div
          className="hero backImgAcademyandTeam"
          style={{
            backgroundImage: `url(${academyImageteam})`,
          }}
        >
          <div className="site-section ">
            <div className="AcademyandTeamsLRmargin">
              <div className="row  justify-content-center align-items-top AcademyandTeamsBox ">
                 <div
                  className="col-md-5 col-lg-4 word-wrap-break"
                  style={{ textAlign: "-webkit-center" }}
                >
                  <div className="academyBox">
                    <img
                      src={academyData.Logo}
                      alt="Logo"
                      className="img-fluid academyLogoMwidth " //rounded-circle
                    />
                    <h3
                      className="mb-4 mt-3 "
                      style={{ fontWeight: "bold", fontSize: "40px" }}
                    >
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
                  <div className="widget-body mb-3 teamsBorderBox ">
                    <div className="teamsBordersolid">
                      <TeamCard academyLogo={academyData.Logo} />
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
