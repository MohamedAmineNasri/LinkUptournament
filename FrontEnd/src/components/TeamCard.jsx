import Card from "react-bootstrap/Card";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeamOfAcademy } from "../redux/slice/teamSlice";
import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/ListGroup";
import DeleteTeamPopUp from "./DeleteTeamPopUp";

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
              backgroundColor: "rgb(42 64 53)",
              borderRadius: "5px",
              border: " solid",
              borderWidth: "thin",
            }}
          >
            <DeleteTeamPopUp teamid={team._id}></DeleteTeamPopUp>
            <Card.Img
              variant="top"
              src="/public/assets/images/logo_1.png"
              style={{ alignSelf: "center", maxWidth: "200px" }}
            />
            <Card.Body>
              <Card.Title style={{ fontSize: "24px" }}>
                <strong>{team.TeamName}</strong>
              </Card.Title>
              <ListGroup style={{ color: "white" }}>
                <ListGroup.Item
                  style={{
                    backgroundColor: "rgb(42 64 53)",
                    fontSize: "20px",
                    padding: "0px",
                    letterSpacing: "2px",
                  }}
                >
                  Total wins : {team.Total_MatchesWon}
                </ListGroup.Item>
                <ListGroup.Item
                  style={{
                    backgroundColor: "rgb(42 64 53)",
                    fontSize: "20px",
                    padding: "0px",
                    letterSpacing: "2px",
                  }}
                >
                  Total loses : {team.Total_MatchesLost}
                </ListGroup.Item>
                <ListGroup.Item
                  style={{
                    backgroundColor: "rgb(42 64 53)",
                    fontSize: "20px",
                    padding: "0px",
                    letterSpacing: "2px",
                  }}
                >
                  Total draw : {team.Total_MatchesDrawn}
                </ListGroup.Item>
                <ListGroup.Item
                  style={{
                    backgroundColor: "rgb(42 64 53)",
                    fontSize: "20px",
                    padding: "0px",
                    letterSpacing: "2px",
                  }}
                >
                  Total matches : {team.Total_MatchesPlayed}
                </ListGroup.Item>
                <ListGroup.Item
                  style={{
                    backgroundColor: "rgb(42 64 53)",
                    fontSize: "20px",
                    padding: "0px",
                    letterSpacing: "2px",
                  }}
                >
                  Total Goals scored : {team.Total_Goals_scored}
                </ListGroup.Item>
                <ListGroup.Item
                  style={{
                    backgroundColor: "rgb(42 64 53)",
                    fontSize: "20px",
                    padding: "0px",
                    letterSpacing: "2px",
                  }}
                >
                  Total Goals received: {team.Total_Goals_received}
                </ListGroup.Item>
              </ListGroup>
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
