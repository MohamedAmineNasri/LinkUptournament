import Card from "react-bootstrap/Card";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeam } from "../redux/slice/teamSlice";

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
        <div key={index} className="col-md-4 mb-3">
          <Card style={{ backgroundColor: "#222222" }}>
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
              <Card.Link href="#">Add Players</Card.Link>
              <Card.Link href="#">Check Players</Card.Link>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default TeamCard;
