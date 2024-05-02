import { useState } from "react";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import {
  deletePlayerFromTeam,
  fetchteamById,
} from "../../redux/slice/teamSlice";
import Table from "react-bootstrap/Table";
import logo from "../../assets/Mi-imgs/personpng.png";
import trohy from "../../assets/Mi-imgs/trophy.png";
import { fetchplayerByTeamId } from "../../redux/slice/teamSlice";
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
import { deletePlayer } from "../../redux/playerReducers/deletePlayerSlice";
import DefaultLayout from "../../Dashboard/src/layout/DefaultLayout";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
export const CheckSelectedTeam = () => {
  const { idTeam } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //modal logic
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    // setSelectedTeam(team);
    setOpen(true);
  };

  const handleClose = () => {
    // setSelectedTeam(null);
    setOpen(false);
  };

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

  const handleDeletePlayer = async (teamid, idp) => {
    dispatch(deletePlayer(idp));
    if (SelectedteamDataById !== null) {
      console.log(teamid, idp);
      dispatch(deletePlayerFromTeam({ it: teamid, ip: idp }));
    }
    window.location.reload();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "#1a2635",
    boxShadow: 24,
    p: 4,
    height: "100vh",
  };
  return (
    <>
      <DefaultLayout>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            Team
          </h2>
        </div>
        <div>
          <div>
            <div className="container-fluid  pb-20 pt-5">
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
                    borderBottomRightRadius: "0px",
                    borderBottomLeftRadius: "0px",
                    paddingBottom: "20px",
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
                      onClick={handleOpen}
                    >
                      <FontAwesomeIcon fontSize="25px" icon={faTrophy} />
                      <span style={{ marginTop: "10px" }}>Achievements</span>
                    </Button>

                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-title"
                      aria-describedby="modal-description"
                    >
                      <Box sx={style}>
                        <div
                          style={{
                            textAlign: "center",
                            marginBottom: "20px",
                            paddingTop: "10px",
                          }}
                        >
                          <h2 className="p-2">Achievements</h2>
                          <Button
                            variant={
                              achievementType === "active"
                                ? "success"
                                : "secondary"
                            }
                            onClick={() => toggleAchievementType("active")}
                            style={{
                              marginRight: "2px",
                              backgroundColor: "#00800052",
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
                            style={{ backgroundColor: "#ff000073" }}
                          >
                            Locked
                          </Button>
                        </div>

                        <TableContainer
                          sx={{
                            maxHeight: "90%",
                            overflowY: "auto",
                            overflowX: "hidden",
                          }}
                        >
                          <Table hover responsive="xl">
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ color: "white" }}>
                                  Title
                                </TableCell>
                                <TableCell sx={{ color: "white" }}>
                                  Description
                                </TableCell>
                                <TableCell sx={{ color: "white" }}>
                                  Type
                                </TableCell>
                                <TableCell sx={{ color: "white" }}>
                                  MileStone
                                </TableCell>
                                <TableCell sx={{ color: "white" }}>
                                  Reward
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {achievementType === "active" ? (
                                ActiveAchievementData.length === 0 ? (
                                  <TableRow>
                                    <TableCell
                                      colSpan={5}
                                      align="center"
                                      sx={{ color: "white" }}
                                    >
                                      You did not unlock any achievements
                                    </TableCell>
                                  </TableRow>
                                ) : (
                                  ActiveAchievementData.map((achi) => (
                                    <TableRow key={achi.id}>
                                      <TableCell sx={{ color: "white" }}>
                                        <img
                                          style={{
                                            maxWidth: "60px",
                                            opacity: "0.6",
                                          }}
                                          src={trohy}
                                          alt="trophy"
                                        />
                                        {achi.Name}
                                      </TableCell>
                                      <TableCell sx={{ color: "white" }}>
                                        {achi.Description}
                                      </TableCell>
                                      <TableCell sx={{ color: "white" }}>
                                        {achi.Type}
                                      </TableCell>
                                      <TableCell sx={{ color: "white" }}>
                                        {achi.MileStone}
                                      </TableCell>
                                      <TableCell sx={{ color: "white" }}>
                                        {achi.Reward}
                                      </TableCell>
                                    </TableRow>
                                  ))
                                )
                              ) : NonActiveAchievementData.length === 0 ? (
                                <TableRow>
                                  <TableCell
                                    colSpan={5}
                                    align="center"
                                    sx={{ color: "white" }}
                                  >
                                    You unlocked all achievements!
                                  </TableCell>
                                </TableRow>
                              ) : (
                                NonActiveAchievementData.map((achi) => (
                                  <TableRow key={achi.id}>
                                    <TableCell sx={{ color: "white" }}>
                                      <img
                                        style={{
                                          maxWidth: "60px",
                                          opacity: "0.6",
                                        }}
                                        src={trohy}
                                        alt="trophy"
                                      />
                                      {achi.Name}
                                    </TableCell>
                                    <TableCell sx={{ color: "white" }}>
                                      {achi.Description}
                                    </TableCell>
                                    <TableCell sx={{ color: "white" }}>
                                      {achi.Type}
                                    </TableCell>
                                    <TableCell sx={{ color: "white" }}>
                                      {achi.MileStone}
                                    </TableCell>
                                    <TableCell sx={{ color: "white" }}>
                                      {achi.Reward}
                                    </TableCell>
                                  </TableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </Modal>
                  </div>
                  {/* -------------------------------------------------------- */}
                  <div className="flex flex-wrap">
                    {/* First Section */}
                    <div className="w-full lg:w-1/3 md:w-1/4 flex flex-col items-center">
                      <img
                        src={SelectedteamDataById.TeamLogo}
                        alt="Logo"
                        className="w-1/2 h-auto" // Adjust width and height as needed
                      />
                      <h3 className="mt-1 mb-3 font-bold text-2xl">
                        <strong>{SelectedteamDataById.TeamName}</strong>
                      </h3>
                      {/* Add Player Button */}
                      <div>
                        <button
                          className="mb-3 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                          // onClick={() => navigate(`/player/${idTeam}`)}
                          onClick={() =>
                            navigate("/manage/participant/player", {
                              state: idTeam,
                            })
                          }
                        >
                          Player <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    </div>

                    {/* Second Section */}
                    <div
                      className="flex flex-wrap w-full lg:w-2/3 md:w-3/4"
                      style={{ alignSelf: "center" }}
                    >
                      {/* First Column */}
                      <div className="w-full lg:w-1/3 flex flex-col text-left text-lg">
                        <h1 className="mb-4">
                          Tourenement Rank 1:{" "}
                          {SelectedteamDataById.Total_Tournement_win_1}
                        </h1>
                        <h1 className="mb-4">
                          Tourenement Rank 2:{" "}
                          {SelectedteamDataById.Total_Tournement_second_2}
                        </h1>
                        <h1 className="mb-4">
                          Tourenement Rank 3:{" "}
                          {SelectedteamDataById.Total_Tournement_third_3}
                        </h1>
                      </div>

                      {/* Second Column */}
                      <div className="w-full lg:w-1/3 flex flex-col text-left text-lg">
                        <h1 className="mb-4">
                          Total Matches Played:{" "}
                          {SelectedteamDataById.Total_MatchesPlayed}
                        </h1>
                        <h1 className="mb-4">
                          Total Matches Won:{" "}
                          {SelectedteamDataById.Total_MatchesWon}
                        </h1>
                        <h1 className="mb-4">
                          Total Matches Drawn:{" "}
                          {SelectedteamDataById.Total_MatchesDrawn}
                        </h1>
                      </div>

                      {/* Third Column */}
                      <div className="w-full lg:w-1/3 flex flex-col text-left text-lg">
                        <h1 className="mb-4">
                          Total Matches Lost:{" "}
                          {SelectedteamDataById.Total_MatchesLost}
                        </h1>
                        <h1 className="mb-4">
                          Total Goals Scored:{" "}
                          {SelectedteamDataById.Total_Goals_scored}
                        </h1>
                        <h1 className="mb-4">
                          Total Goals Received:{" "}
                          {SelectedteamDataById.Total_Goals_received}
                        </h1>
                      </div>
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
                          <div className="w-full">
                            <div className=" rounded-2xl ">
                              {players.length === 0 ? (
                                <div className="text-center py-20">
                                  <h3 className="text-white text-xl">
                                    No Players created yet
                                  </h3>
                                  <p className="text-gray-400">
                                    Start by creating a new Player for this
                                    Team!
                                  </p>
                                </div>
                              ) : (
                                <Table
                                  hover
                                  responsive="xl"
                                  className="w-full text-gray-300"
                                >
                                  <thead className="bg-gray-900">
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
                                      key={player.id}
                                      className=" hover:bg-gray-700"
                                    >
                                      <tr
                                        className="leading-8"
                                        style={{
                                          textAlign: "-webkit-center",
                                        }}
                                      >
                                        <td>
                                          <img
                                            style={{ maxWidth: "100px" }}
                                            src={logo}
                                          ></img>
                                        </td>
                                        <td>{player.name}</td>
                                        <td>{player.number}</td>
                                        <td>{player.position}</td>
                                        <td>
                                          <Button
                                            variant="secondary"
                                            onClick={() =>
                                              handleDeletePlayer(
                                                SelectedteamDataById._id,
                                                player._id
                                              )
                                            }
                                          >
                                            <FontAwesomeIcon icon={faTrash} />
                                          </Button>
                                        </td>
                                      </tr>
                                    </tbody>
                                  ))}
                                </Table>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default CheckSelectedTeam;
