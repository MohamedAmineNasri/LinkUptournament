import Card from "react-bootstrap/Card";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeamOfAcademy } from "../redux/slice/teamSlice";
import Button from "react-bootstrap/esm/Button";
import DeleteTeamPopUp from "./DeleteTeamPopUp";
import CardSubtitle from "react-bootstrap/esm/CardSubtitle";
import SettingsIcon from "@mui/icons-material/Settings";
import DropDownTeamSettings from "./DropDownTeamSettings";

const TeamCard = () => {
  const { teamData, loading, error } = useSelector((state) => state.team);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeamOfAcademy());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="row">
      {teamData.length === 0 && !loading && !error && (
        // when no team exists
        <div
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
      {teamData.map((team) => (
        <div key={team._id} className="col-xl-6 col-lg-6 col-md-12 mb-3">
          <Card
            style={{
              backgroundColor: "#212529c4",
              borderRadius: "5px",
              border: " solid",
              borderWidth: "thin",
            }}
          >
            {/* settingicon that display a drop down for various option */}
            <DropDownTeamSettings idTeam={team._id}></DropDownTeamSettings>

            {/* <DeleteTeamPopUp teamid={team._id}></DeleteTeamPopUp> */}
            <Card.Img
              variant="top"
              src="/public/assets/images/logo_1.png"
              style={{ alignSelf: "center", maxWidth: "150px" }}
            />
            <Card.Body className="pt-0">
              <Card.Title className="pb-3" style={{ fontSize: "24px" }}>
                <strong>{team.TeamName}</strong>
              </Card.Title>

              <CardSubtitle
                className="pb-3"
                style={{
                  fontSize: "16px",
                  padding: "0px",
                  letterSpacing: "2px",
                }}
              >
                Total wins : {team.Total_MatchesWon}
              </CardSubtitle>
              <CardSubtitle
                className="pb-3"
                style={{
                  fontSize: "16px",
                  padding: "0px",
                  letterSpacing: "2px",
                }}
              >
                Total loses : {team.Total_MatchesLost}
              </CardSubtitle>
              <CardSubtitle
                className="pb-3"
                style={{
                  fontSize: "16px",
                  padding: "0px",
                  letterSpacing: "2px",
                }}
              >
                Total draw : {team.Total_MatchesDrawn}
              </CardSubtitle>
              <CardSubtitle
                className="pb-3"
                style={{
                  fontSize: "16px",
                  padding: "0px",
                  letterSpacing: "2px",
                }}
              >
                Total matches : {team.Total_MatchesPlayed}
              </CardSubtitle>
              <CardSubtitle
                className="pb-3"
                style={{
                  fontSize: "16px",
                  padding: "0px",
                  letterSpacing: "2px",
                }}
              >
                Total Goals scored : {team.Total_Goals_scored}
              </CardSubtitle>
              <CardSubtitle
                style={{
                  fontSize: "16px",
                  padding: "0px",
                  letterSpacing: "2px",
                }}
              >
                Total Goals received: {team.Total_Goals_received}
              </CardSubtitle>
            </Card.Body>
            <Card.Body>
              <div className="row justify-content-around">
                <Button variant="success">Add Players</Button>
                <Button variant="success">Check Players</Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default TeamCard;
