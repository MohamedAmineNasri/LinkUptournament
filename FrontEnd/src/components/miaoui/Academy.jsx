import React, { useEffect } from "react";
import TeamCard from "./TeamCard";
import DropDownAcademy from "./DropDownAcademy";
import { useSelector, useDispatch } from "react-redux";
import { fetchAcademybyManagerId } from "../../redux/slice/academySlice";
import academyImagespectators from "../../assets/Mi-imgs/1.jpg";
import academyImageteam from "../../assets/Mi-imgs/team1.jpg";
import { Link } from "react-router-dom/dist/umd/react-router-dom.development";
import HeaderNavBar from "./HeaderNavBar";

export const Academy = () => {
  const dispatch = useDispatch();

  const { academyData, loading, error } = useSelector(
    (state) => state.root.academy
  );

  // fetch and refresh when academy updated
  useEffect(() => {
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
    }
  }, [loading, error, dispatch]);

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
        return "text-warning";
      case "Rejected":
        return "text-danger";
      case "Approved":
        return "text-success";
      default:
        return "text-muted";
    }
  };

  return (
    <div>
      <div className="site-wrap">
        <HeaderNavBar></HeaderNavBar>
        {/* header/overlay image */}
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
                    <p className="mb-2">
                      Status :{" "}
                      <span className={getStatusColor(academyData.Status)}>
                        {academyData.Status}
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
                <div className="col-md-7 col-lg-8">
                  <div className="widget-body mb-3 teamsBorderBox ">
                    <div className="teamsBordersolid">
                      <TeamCard idacademy={academyData._id} />
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
