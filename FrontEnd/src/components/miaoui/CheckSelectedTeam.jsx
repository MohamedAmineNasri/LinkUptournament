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
import trohy from "../../assets/Mi-imgs/trophy.png";
import { fetchplayerByTeamId } from "../../redux/slice/teamSlice";
import nightFeildImage from "../../assets/Mi-imgs/nightFeild.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faPlus,
  faTrophy,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { updatetachievementStatus } from "../../redux/slice/tachievementSlice";
import { fetchDefaultAchievementOfTeamByTeamId } from "../../redux/slice/tachievementSlice";
import Modal from "react-bootstrap/Modal";

export const CheckSelectedTeam = () => {
  const { idTeam } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //modal logic
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Step 1: Create a state variable for the active achievement type
  const [achievementType, setAchievementType] = useState("active");

  // Step 2: Create a toggle function to switch between achievement types
  const toggleAchievementType = (type) => {
    setAchievementType(type);
  };

  const { SelectedteamDataById, loading, error } = useSelector(
    (state) => state.root.team
  );
  // tachivement redux
  const { ActiveAchievementData, NonActiveAchievementData } = useSelector(
    (state) => state.root.tachievement
  );

  //player redux
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

  //unlocked team achievements if milestone is hit.
  useEffect(() => {
    dispatch(
      updatetachievementStatus({
        idTeam: idTeam,
      })
    );
  }, [dispatch]);
  //get default achivements of the team
  useEffect(() => {
    dispatch(
      fetchDefaultAchievementOfTeamByTeamId({
        idTeam: idTeam,
      })
    );
  }, [dispatch]);

  //locked or unlocked effect
  // const getRowStyle = (status) => {
  //   // Define a default style
  //   let style = {
  //     opacity: 1,
  //     transition: "all 0.3s ease-in-out",
  //   };

  //   // Apply a darker style if status is not "Active"
  //   if (status !== "NOTActive") {
  //     style.opacity = 0.5; // Make the row semi-transparent
  //     style.backgroundColor = "#e0e0e0"; // Optional: apply a light gray background
  //   }

  //   return style;
  // };

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
                className="col-lg-12 col-md-12  word-wrap-break"
                style={{
                  textAlign: "-webkit-center",
                  backgroundColor: "#228b221c",
                  borderRadius: "20px",
                }}
              >
                {/* trophies button MODAL ---------------------------------------------- */}
                <div
                  style={{
                    display: "flex", //Flexbox for alignment
                    justifyContent: "space-between", // Place items at opposite ends
                    paddingTop: "20px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  {/* Back button ---------------------------------------------------------- */}
                  <Button
                    variant="success"
                    style={{
                      border: "none",
                      backgroundColor: "rgba(255, 255, 255, 0)",
                    }}
                    onClick={() => navigate(`/Academy/`)}
                  >
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                    <span className="pl-2">Back</span>
                  </Button>
                  {/* Back button End ---------------------------------------------------------- */}
                  <Button
                    variant="success"
                    style={{
                      backgroundColor: "rgba(139, 195, 74, 0.2)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    onClick={handleShow}
                  >
                    <FontAwesomeIcon fontSize="25px" icon={faTrophy} />
                    <span style={{ marginTop: "10px" }}>Achievements</span>
                  </Button>

                  <Modal size="lg" show={show} onHide={handleClose}>
                    <Modal.Header
                      closeButton
                      style={{
                        backgroundColor: "#1d2631",
                        border: "solid thin",
                        borderBottom: "none",
                      }}
                    >
                      <Modal.Title>Achievements</Modal.Title>
                      {/* button toggle , active / non active --------------------- */}
                      <div
                        style={{ display: "inline-block", marginLeft: "auto" }}
                      >
                        <Button
                          variant={
                            achievementType === "active"
                              ? "success"
                              : "secondary"
                          }
                          onClick={() => toggleAchievementType("active")}
                          style={{
                            marginRight: "2px",
                            backgroundColor: "transparent",
                          }}
                        >
                          Unlocked
                        </Button>
                        <Button
                          variant={
                            achievementType === "non-active"
                              ? "primary"
                              : "secondary"
                          }
                          onClick={() => toggleAchievementType("non-active")}
                          style={{ backgroundColor: "transparent" }}
                        >
                          Locked
                        </Button>
                      </div>
                      {/* ----------------------------------------------------- */}
                    </Modal.Header>
                    <Modal.Body
                      style={{
                        backgroundColor: "#1d2631",
                        padding: "0px",
                        border: "solid thin",
                        borderTop: "none",
                      }}
                    >
                      <div>
                        <Table hover responsive="xl">
                          <thead>
                            <tr>
                              <th>Title</th>
                              <th>Description</th>
                              <th>Type</th>
                              <th>MileStone</th>
                              <th>Reward</th>
                            </tr>
                          </thead>
                          {/* Achivements active /non active condition ----------------- */}
                          {achievementType === "active" ? (
                            // Display a message if ActiveAchievementData is empty
                            ActiveAchievementData.length === 0 ? (
                              <tbody>
                                <tr>
                                  <td
                                    colSpan="5"
                                    style={{
                                      textAlign: "center",
                                      padding: "20px",
                                    }}
                                  >
                                    You did not unlock any achievements
                                  </td>
                                </tr>
                              </tbody>
                            ) : (
                              ActiveAchievementData.map((achi) => (
                                <tbody
                                  key={achi.id}
                                  style={{ borderTop: "none" }}
                                >
                                  <tr>
                                    <td className="tableTDwordwrap">
                                      <img
                                        style={{
                                          maxWidth: "60px",
                                          opacity: "0.6",
                                        }}
                                        src={trohy}
                                      />
                                      {achi.Name}
                                    </td>
                                    <td className="tableTDwordwrap">
                                      {achi.Description}
                                    </td>
                                    <td className="tableTDwordwrap">
                                      {achi.Type}
                                    </td>
                                    <td className="tableTDwordwrap">
                                      {achi.MileStone}
                                    </td>
                                    <td className="tableTDwordwrap">
                                      {achi.Reward}
                                    </td>
                                  </tr>
                                </tbody>
                              ))
                            )
                          ) : // Display a message if NonActiveAchievementData is empty
                          NonActiveAchievementData.length === 0 ? (
                            <tbody>
                              <tr>
                                <td
                                  colSpan="5"
                                  style={{
                                    textAlign: "center",
                                    padding: "20px",
                                  }}
                                >
                                  You unlocked all achievements !
                                </td>
                              </tr>
                            </tbody>
                          ) : (
                            NonActiveAchievementData.map((achi) => (
                              <tbody
                                key={achi.id}
                                style={{ borderTop: "none" }}
                              >
                                <tr>
                                  <td className="tableTDwordwrap">
                                    <img
                                      style={{
                                        maxWidth: "60px",
                                        opacity: "0.6",
                                      }}
                                      src={trohy}
                                    />
                                    {achi.Name}
                                  </td>
                                  <td className="tableTDwordwrap">
                                    {achi.Description}
                                  </td>
                                  <td className="tableTDwordwrap">
                                    {achi.Type}
                                  </td>
                                  <td className="tableTDwordwrap">
                                    {achi.MileStone}
                                  </td>
                                  <td className="tableTDwordwrap">
                                    {achi.Reward}
                                  </td>
                                </tr>
                              </tbody>
                            ))
                          )}
                        </Table>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
                {/* -------------------------------------------------------- */}
                <div className=" row ">
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
                      className=" col-lg-4"
                    >
                      <h1 className=" mb-4 ">
                        Tourenement_Rank_1 :{" "}
                        {SelectedteamDataById.Total_Tournement_win_1}
                      </h1>
                      <h1 className=" mb-4 ">
                        Tourenement_Rank_2 :{" "}
                        {SelectedteamDataById.Total_Tournement_second_2}
                      </h1>

                      <h1 className=" mb-4 ">
                        Tourenement_Rank_3 :{" "}
                        {SelectedteamDataById.Total_Tournement_third_3}
                      </h1>
                    </div>
                    {/* --------------------------------------------------------------------------------- */}
                    <div
                      style={{
                        textAlignLast: "start",
                        alignContent: "center",
                        fontSize: "16px",
                      }}
                      className=" col-lg-4"
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
                      className="  col-lg-4 "
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
                              <th>Player Number</th>
                              <th>Position</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          {players.map((player) => (
                            <tbody
                              style={{
                                borderTop: "none",
                              }}
                            >
                              {SelectedteamDataById.Players &&
                                SelectedteamDataById.Players.length > 0 && (
                                  <tr style={{}}>
                                    <td>
                                      <img
                                        style={{ maxWidth: "80px" }}
                                        src={logo}
                                      ></img>
                                    </td>
                                    <td className="tableTDwordwrap">
                                      {player.name}
                                    </td>
                                    <td className="tableTDwordwrap">
                                      {player.number}
                                    </td>
                                    <td className="tableTDwordwrap">
                                      {player.position}
                                    </td>
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
