import Card from "react-bootstrap/Card";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeamOfAcademy } from "../../redux/slice/teamSlice";
import CardSubtitle from "react-bootstrap/esm/CardSubtitle";
import DropDownTeamSettings from "./DropDownTeamSettings";
import Spinner from "react-bootstrap/Spinner";

const TeamCard = (props) => {
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

      <div className="row">
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
                src={team.TeamLogo}
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
    </div>
  );
};

export default TeamCard;
