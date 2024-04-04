import { useState } from "react";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { fetchteamById } from "../../redux/slice/teamSlice";
import video from "../../assets/Mi-imgs/teamV.mp4";
import HeaderNavBar from "./HeaderNavBar";
import Table from "react-bootstrap/Table";
import logo from "../../assets/Mi-imgs/personpng.png";
import { fetchplayerByTeamId } from "../../redux/slice/teamSlice";
import nightFeildImage from "../../assets/Mi-imgs/nightFeild.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

export const CheckSelectedTeam = () => {
  const { idTeam } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { SelectedteamDataById, loading, error } = useSelector(
    (state) => state.root.team
  );
  const { players } = useSelector((state) => state.root.team);
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

  // Fetch player data for each player ID in team data
  useEffect(() => {
    dispatch(
      fetchplayerByTeamId({
        teamId: idTeam,
      })
    );
    console.log(players);
  }, [dispatch, idTeam]);

  // delete logic

  // const handledeletePlayer = () => {
  //   dispatch(deleteTeam(props.teamid));
  //   window.location.reload();
  // };
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
              <div className="col-lg-12">
                <h1
                  style={{ fontSize: "7rem", wordBreak: "break-word" }}
                  className="col-md-12 pb-5 pt-5 TitleTeam"
                >
                  {SelectedteamDataById.TeamName}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div
          className=" overlay backImgAcademyandTeam"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${nightFeildImage})`,
          }}
        >
          <div className="container-fluid px-30 pt-40">
            <div
              className="row mr-0 ml-0 justify-content-center align-items-top SelectedTeamsBox "
              style={{
                borderRadius: "20px",
              }}
            >
              <div
                className="col-lg-12 col-md-8  word-wrap-break"
                style={{
                  textAlign: "-webkit-center",
                  backgroundColor: "#228b221c",
                  borderRadius: "20px",
                }}
              >
                <div className=" row teamBox">
                  {/* --------------------------------------------------------------------------------- */}
                  <div className="col-lg-4 col-md-3">
                    <img
                      src={SelectedteamDataById.TeamLogo}
                      alt="Logo"
                      className="img-fluid teamLogoMwidth " //rounded-circle
                    />
                    <h3
                      className="mb-3 mt-1 "
                      style={{
                        fontWeight: "bold",
                        fontSize: "24px",
                      }}
                    >
                      <strong>{SelectedteamDataById.TeamName}</strong>
                    </h3>
                    {/* add players ----------------------------------------------------- */}
                    <div>
                      <Button
                        className="mb-3"
                        variant="success"
                        style={{
                          backgroundColor: "rgba(139, 195, 74, 0.2)",
                        }}
                        // onClick={() => navigate(`/player/`)}
                        onClick={() => navigate(`/player/${idTeam}`)} //need to add id in the route of add player
                      >
                        Player <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </div>
                  </div>
                  {/* --------------------------------------------------------------------------------- */}
                  <div className="row col-lg-8 col-md-8">
                    {/* --------------------------------------------------------------------------------- */}
                    <div
                      style={{
                        textAlignLast: "start",
                        alignContent: "center",
                        fontSize: "16px",
                      }}
                      className=" pl-5 col-lg-6"
                    >
                      <h1 className=" mb-4 ">
                        Total_MatchesPlayed :{" "}
                        {SelectedteamDataById.Total_MatchesPlayed}
                      </h1>
                      <h1 className=" mb-4 ">
                        Total_MatchesWon :{" "}
                        {SelectedteamDataById.Total_MatchesWon}
                      </h1>

                      <h1 className=" mb-4 ">
                        Total_MatchesDrawn :{" "}
                        {SelectedteamDataById.Total_MatchesDrawn}
                      </h1>
                    </div>
                    {/* --------------------------------------------------------------------------------- */}
                    <div
                      style={{
                        textAlignLast: "start",
                        alignContent: "center",
                        fontSize: "16px",
                      }}
                      className=" pl-5 col-lg-6 "
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
                    {/* --------------------------------------------------------------------------------- */}
                  </div>
                </div>
              </div>
              {/* Players of team */}
              <div className="col-lg-12 px-0">
                <div className=" playersBorderBox ">
                  <div>
                    {/* condition if no players exist */}
                    {players.length === 0 && (
                      <div
                        hidden={false}
                        style={{
                          padding: "20px",
                          textAlign: "center",
                          alignItems: "center",
                          paddingTop: "150px",
                          paddingBottom: "220px",
                        }}
                      >
                        <h3
                          style={{
                            color: "white",
                            fontSize: "24px",
                            marginBottom: "10px",
                          }}
                        >
                          No Players created yet
                        </h3>
                        <p style={{ color: "#666", fontSize: "18px" }}>
                          Start by creating a new Player to this Team!
                        </p>
                      </div>
                    )}
                    {/* --------------------------------------------------------------------------------- */}
                    {players.length !== 0 && (
                      <div>
                        <Table hover responsive="xl">
                          <thead>
                            <tr>
                              <th>Player Image</th>
                              <th>Player Name</th>
                              <th>Table heading</th>
                              <th>Table heading</th>
                              <th>Table heading</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          {players.map((player) => (
                            <tbody style={{ borderTop: "none" }}>
                              {SelectedteamDataById.Players &&
                                SelectedteamDataById.Players.length > 0 && (
                                  <tr>
                                    <td>
                                      <img
                                        style={{ maxWidth: "80px" }}
                                        src={logo}
                                      ></img>
                                    </td>
                                    <td>{player.position}</td>
                                    <td>{player.academic_membership}</td>
                                    <td>{player.legal_guardian}</td>
                                    <td>Table cell</td>
                                    <td>
                                      <button className="hover:text-warning px-3">
                                        <FontAwesomeIcon icon={faEdit} />
                                      </button>
                                      <button className="hover:text-warning">
                                        <FontAwesomeIcon icon={faTrash} />
                                      </button>
                                    </td>
                                  </tr>
                                )}
                            </tbody>
                          ))}
                        </Table>
                      </div>
                    )}
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
