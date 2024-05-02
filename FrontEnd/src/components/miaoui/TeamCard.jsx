import Card from "react-bootstrap/Card";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeamOfAcademy } from "../../redux/slice/teamSlice";
import CardSubtitle from "react-bootstrap/esm/CardSubtitle";
import Spinner from "react-bootstrap/Spinner";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import EditTeamNew from "./EditTeamNew";
import DeleteTeamNew from "./DeleteTeamNew";

const TeamCard = (props) => {
  const navigate = useNavigate();
  const { teamData, loading, error } = useSelector((state) => state.root.team);
  const [loader, setLoading] = useState("false"); //i did not use redux loading cuz alawys the empty message flashs even if i have teams

  const dispatch = useDispatch();
  useEffect(() => {
    if (props.idacademy) {
      // we make sure that props.idacademy value is readyu before rendering
      console.log(props.idacademy);

      dispatch(fetchTeamOfAcademy(props.idacademy));
      setLoading("false");
    } else {
      setLoading("true");
    }
  }, [dispatch, props.idacademy, loader]);

  // name modal logic
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (team) => {
    setSelectedTeam(team);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedTeam(null);
    setOpen(false);
  };

  //logo modal logic
  const [selectedTeam1, setSelectedTeam1] = useState(null);
  const [open1, setOpen1] = useState(false);

  const handleOpen1 = (team) => {
    setSelectedTeam1(team);
    setOpen1(true);
  };

  const handleClose1 = () => {
    setSelectedTeam1(null);
    setOpen1(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    // bgcolor: "#f8f8ff",
    bgcolor: "rgb(36 48 63)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      {loader === "true" && (
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            alignItems: "center",
            paddingTop: "250px",
            paddingBottom: "220px",
          }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {loader === "false" && teamData.length === 0 && (
        // when no team exists
        <div
          hidden={false}
          style={{
            padding: "20px",
            textAlign: "center",
            alignItems: "center",
            paddingTop: "250px",
            paddingBottom: "220px",
          }}
        >
          <h3
            style={{ color: "white", fontSize: "24px", marginBottom: "10px" }}
          >
            No teams created yet
          </h3>
          <p style={{ color: "#666", fontSize: "18px" }}>
            Start by creating a new team to get started!
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2">
        {teamData.map((team) => (
          <div key={team._id} className="col-xl-6 col-lg-6 col-md-12 mb-3">
            <Card
              className="teamCard"
              style={{
                width: "350px",
                height: "580px",
                backgroundColor: "#212529c4",
              }}
            >
              <div className="p-4  flex items-center  gap-10 justify-end">
                <div
                  className="w-1/2 mb-8 "
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#3ab93a54",
                  }}
                >
                  <FormControl variant="standard" sx={{ width: "100%" }}>
                    <InputLabel
                      id="Position"
                      variant="filled"
                      sx={{ color: "whitesmoke" }}
                    >
                      Settings
                    </InputLabel>
                    <Select
                      labelId="Position"
                      id="Position"
                      label="Position"
                      name="position"
                    >
                      <MenuItem value="">
                        <Button
                          variant="success"
                          style={{
                            width: "-webkit-fill-available",
                            color: "black",
                          }}
                          onClick={() => navigate(`/team/${team._id}`)}
                        >
                          Check Team
                        </Button>
                      </MenuItem>

                      <MenuItem value="">
                        <Button
                          variant="success"
                          style={{
                            width: "-webkit-fill-available",
                            color: "black",
                          }}
                          onClick={() => {
                            navigate("/manage/lineup", { state: team._id });
                          }}
                        >
                          Create LineUp
                        </Button>
                      </MenuItem>
                      <MenuItem value="">
                        <Button
                          variant="success"
                          style={{
                            width: "-webkit-fill-available",
                            color: "black",
                          }}
                          onClick={() => handleOpen(team)}
                        >
                          Edit Team
                        </Button>
                      </MenuItem>

                      <MenuItem value="">
                        <Button
                          variant="success"
                          style={{
                            width: "-webkit-fill-available",
                            color: "black",
                          }}
                          onClick={() => handleOpen1(team)}
                        >
                          Delete Team
                        </Button>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              {/* modal edit ---------------------------------------------------------- */}

              {selectedTeam && (
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <EditTeamNew
                      Tid={selectedTeam._id}
                      Tname={selectedTeam.TeamName}
                      Tlogo={selectedTeam.TeamLogo}
                    />
                  </Box>
                </Modal>
              )}
              {/* ---------------------------------------------------------- */}
              {/* modal delete ---------------------------------------------------------- */}
              {selectedTeam1 && (
                <Modal
                  open={open1}
                  onClose={handleClose1}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <DeleteTeamNew
                      teamid={selectedTeam1._id}
                      Tname={selectedTeam1.TeamName}
                    ></DeleteTeamNew>
                  </Box>
                </Modal>
              )}
              {/* ---------------------------------------------------------- */}

              {/* <DeleteTeamPopUp teamid={team._id}></DeleteTeamPopUp> */}
              <div style={{ textAlign: "-webkit-center" }}>
                <Card.Img
                  className="teamCardImg"
                  variant="top"
                  src={team.TeamLogo}
                />
              </div>
              <Card.Body style={{ paddingLeft: "20px", paddingTop: "20px" }}>
                <Card.Title className="pb-3 teamCardTitle">
                  <strong>{team.TeamName}</strong>
                </Card.Title>
                <CardSubtitle className="pb-3 teamCardData">
                  Total wins : {team.Total_MatchesWon}
                </CardSubtitle>
                <CardSubtitle className="pb-3 teamCardData">
                  Total loses : {team.Total_MatchesLost}
                </CardSubtitle>
                <CardSubtitle className="pb-3 teamCardData">
                  Total draw : {team.Total_MatchesDrawn}
                </CardSubtitle>
                <CardSubtitle className="pb-3 teamCardData">
                  Total matches : {team.Total_MatchesPlayed}
                </CardSubtitle>
                <CardSubtitle className="pb-3 teamCardData">
                  Total Goals scored : {team.Total_Goals_scored}
                </CardSubtitle>
                <CardSubtitle className="pb-3 teamCardData">
                  Total Goals received: {team.Total_Goals_received}
                </CardSubtitle>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamCard;
