import Card from "react-bootstrap/Card";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMatch } from "../../redux/slice/matchSlice";
import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/ListGroup";
import DeleateMatchPopUp from "./DeleateMatchPopUp";
import AddMatchPopUpWindow from "./AddMatchPopUpWindow";
import NavBar from "./navbar";
import Footer from "./foter";
import MatchByID from "./getAllGroup"
import EditPopUpmatch from "./EditPopUpMatch";
import EditPopUpSelectedMatch from "./update";
import Showmatch from "./getAllGroup";

const MatchCard = (props) => {
  const matchData = useSelector((state) => state.root.match.matchData);
  const loading = useSelector((state) => state.root.match.loading);
  const error = useSelector((state) => state.root.match.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMatch());
    
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

 
  return (<>
  <div style={{ backgroundColor:"rgb(35, 79, 30)"}}><AddMatchPopUpWindow  /></div>
    <div className="row"style={{backgroundColor:"rgb(35, 79, 30)"}}>
      


      {matchData.length === 0 && !loading && !error && (
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
            No match created yet
          </h3>
          <p style={{ color: "#666", fontSize: "18px" }}>
            Start by creating a new match to get started!
          </p>
        </div>
      )}
      
      {matchData
        .slice()
        .reverse()
        .map((match, index) => (
          <div key={match._id} className="col-xl-6 col-lg-6 col-md-12 mb-3">
            <Card
              id={match.id}
              style={{
                backgroundColor: "rgb(42 64 53)",
                borderRadius: "5px",
                border: " solid",
                borderWidth: "thin",
              }}
            >
              <DeleateMatchPopUp matchid={match._id}></DeleateMatchPopUp>
              <Card.Img
                variant="top"
                src="/public/assets/images/bg_2.jpg"
                style={{ alignSelf: "center", maxWidth: "200px" }}
              />
              <Card.Body>
                <Card.Title style={{ fontSize: "24px" }}>
                  <strong>{match.date}</strong>
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
                    starting Time : {match.startingtime}
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{
                      backgroundColor: "rgb(42 64 53)",
                      fontSize: "20px",
                      padding: "0px",
                      letterSpacing: "2px",
                    }}
                  >
                    match Type : {match.matchtype}
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{
                      backgroundColor: "rgb(42 64 53)",
                      fontSize: "20px",
                      padding: "0px",
                      letterSpacing: "2px",
                    }}
                  >
                    location : {match.location}
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{
                      backgroundColor: "rgb(42 64 53)",
                      fontSize: "20px",
                      padding: "0px",
                      letterSpacing: "2px",
                    }}
                  >
                    team1 : {match.team1}
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{
                      backgroundColor: "rgb(42 64 53)",
                      fontSize: "20px",
                      padding: "0px",
                      letterSpacing: "2px",
                    }}
                  > 
                    team2 : {match.team2}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
              <Card.Body>
                <div className="row justify-content-around">                  
                  {/* <Fetch matchid={match._id}
                    time={match.startingTime}
                    date={match.Date}
                    type={match.matchType}
                    location={match.location}> </Fetch> */}
                    {/* <MatchByID matchid={match._id}>test</MatchByID> */}
                   
                  <EditPopUpSelectedMatch
                    matchid={match._id}
                    time={match.startingtime}
                    date={match.date}
                    type={match.matchtype}
                    location={match.location}
                  ></EditPopUpSelectedMatch>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      
    </div>
    </>
  );
};

export default MatchCard;
