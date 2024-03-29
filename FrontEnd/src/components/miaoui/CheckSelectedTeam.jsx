import { useState } from "react";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchteamById } from "../../redux/slice/teamSlice";
import video from "../../assets/Mi-imgs/teamV.mp4";
import HeaderNavBar from "./HeaderNavBar";

export const CheckSelectedTeam = () => {
  const { idTeam } = useParams();
  const dispatch = useDispatch();
  const { SelectedteamDataById, loading, error } = useSelector(
    (state) => state.root.team
  );
  // get team Data
  useEffect(() => {
    if (loading === false && error === null) {
      dispatch(
        fetchteamById({
          teamId: idTeam,
        })
      );
    }
  }, [dispatch, loading, error]);
  return (
    <>
      <div className="site-wrap bg-black">
        <HeaderNavBar></HeaderNavBar>
        {/* header/overlay image */}
        <div className="hero overlay" style={{ position: "relative" }}>
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
                style={{ textAlign: "-webkit-center", opacity: 0.9 }}
              >
                {/* <img
                  src={SelectedteamDataById.TeamLogo}
                  alt="Logo"
                  className="img-fluid academyLogosizeInHero"
                  style={{ opacity: 0.8 }}
                /> */}
                {/* <h1 className="text-white " style={{ fontSize: "72px" }}>
                  {SelectedteamDataById.TeamName}
                </h1> */}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="row mr-0 ml-0 justify-content-center align-items-top AcademyandTeamsBox ">
              <div
                className="col-lg-12 col-md-8 word-wrap-break"
                style={{ textAlign: "-webkit-center" }}
              >
                <div className=" row teamBox">
                  <div className="col-lg-4">
                    <img
                      src={SelectedteamDataById.TeamLogo}
                      alt="Logo"
                      className="img-fluid teamLogoMwidth " //rounded-circle
                    />
                    <h3
                      className="mb-4 mt-1 "
                      style={{
                        fontWeight: "bold",
                        fontSize: "24px",
                      }}
                    >
                      <strong>{SelectedteamDataById.TeamName}</strong>
                    </h3>
                  </div>
                  <div
                    style={{
                      textAlignLast: "start",
                      alignContent: "center",
                      fontSize: "22px",
                    }}
                    className="ml-10 col-lg-3"
                  >
                    <h1 className=" mb-4 ">
                      Total_MatchesPlayed :{" "}
                      {SelectedteamDataById.Total_MatchesPlayed}
                    </h1>
                    <h1 className=" mb-4 ">
                      Total_MatchesWon : {SelectedteamDataById.Total_MatchesWon}
                    </h1>

                    <h1 className=" mb-4 ">
                      Total_MatchesDrawn :{" "}
                      {SelectedteamDataById.Total_MatchesDrawn}
                    </h1>
                  </div>
                  <div
                    style={{
                      textAlignLast: "start",
                      alignContent: "center",
                      fontSize: "22px",
                    }}
                    className=" ml-10 col-lg-3 "
                  >
                    <h1 className=" mb-4 ">
                      Total_MatchesLost :{" "}
                      {SelectedteamDataById.Total_MatchesLost}
                    </h1>
                    <h1 className=" mb-4 ">
                      Total_Goals_scored :{" "}
                      {SelectedteamDataById.Total_Goals_scored}
                    </h1>
                    <h1 className=" mb-4 ">
                      Total_Goals_received :{" "}
                      {SelectedteamDataById.Total_Goals_received}
                    </h1>
                  </div>
                </div>
              </div>
              {/* Academy teams */}
              <div className="col-lg-12">
                <div className="widget-body mb-3 teamsBorderBox ">
                  <div className="teamsBordersolid">
                    {/* <TeamCard idacademy={academyData._id} /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckSelectedTeam;
