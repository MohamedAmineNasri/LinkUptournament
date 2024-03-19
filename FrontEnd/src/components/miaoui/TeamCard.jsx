import Card from "react-bootstrap/Card";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeamOfAcademy } from "../../redux/slice/teamSlice";
import CardSubtitle from "react-bootstrap/esm/CardSubtitle";
import DropDownTeamSettings from "./DropDownTeamSettings";

const TeamCard = (props) => {
  const { teamData, loading, error } = useSelector((state) => state.root.team);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeamOfAcademy());
  }, [dispatch]);
  // useEffect(() => {
  //   if (loading === false && error === null) {
  //     // Data fetching successful, update UI or perform other actions
  //     dispatch(fetchTeamOfAcademy());
  //   }
  // }, [loading, error, dispatch]);

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
          <Card className="teamCard">
            {/* setting buttonthat display a drop down for various option */}
            <DropDownTeamSettings
              idTeam={team._id}
              teamname={team.TeamName}
              teamlogo={team.TeamLogo}
            ></DropDownTeamSettings>

            {/* <DeleteTeamPopUp teamid={team._id}></DeleteTeamPopUp> */}
            <Card.Img
              className="teamCardImg"
              variant="top"
              src={team.TeamLogo || props.academyLogo} // props.academyLogo OR the file Uploaded ||team.logo
            />
            <Card.Body>
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
              <CardSubtitle className="teamCardData">
                Total Goals received: {team.Total_Goals_received}
              </CardSubtitle>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default TeamCard;
