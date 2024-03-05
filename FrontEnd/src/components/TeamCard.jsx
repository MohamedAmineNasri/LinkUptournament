import Card from "react-bootstrap/Card";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeam } from "../redux/slice/teamSlice";
import Button from "react-bootstrap/esm/Button";
import DeleteTeamPopUp from "./DeleteTeamPopUp";

const TeamCard = () => {
  const teamData = useSelector((state) => state.team.teamData);
  const loading = useSelector((state) => state.team.loading);
  const error = useSelector((state) => state.team.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="row">
      {teamData.length === 0 && !loading && !error && (
        <div>No data available</div>
      )}
      {teamData.map((team, index) => (
        <div key={team._id} className="col-md-6 mb-3">
          <Card
            id={team.id}
            style={{ backgroundColor: "#222222", borderRadius: "1.25rem" }}
          >
            <DeleteTeamPopUp teamid={team._id}></DeleteTeamPopUp>
            <Card.Img
              variant="top"
              src="/public/assets/images/logo_1.png"
              style={{ alignSelf: "center" }}
            />
            <Card.Body>
              <Card.Title>{team.TeamName}</Card.Title>
              <Card.Subtitle>Total wins: {team.Total_MatchesWon}</Card.Subtitle>
              <Card.Subtitle style={{ marginTop: "10px" }}>
                Total loses: {team.Total_MatchesLost}
              </Card.Subtitle>
              <Card.Subtitle style={{ marginTop: "10px" }}>
                Total draw: {team.Total_MatchesDrawn}
              </Card.Subtitle>
              <Card.Subtitle style={{ marginTop: "10px" }}>
                Total matches: {team.TotalMatchesPlayed}
              </Card.Subtitle>
              <Card.Subtitle style={{ marginTop: "10px" }}>
                Total Goals scored: {team.Total_Goals_scored}
              </Card.Subtitle>
              <Card.Subtitle style={{ marginTop: "10px" }}>
                Total Goals received: {team.Total_Goals_received}
              </Card.Subtitle>
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
