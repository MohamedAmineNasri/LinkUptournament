import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import MatchCard from './match';
import AddMatchPopUpWindow from "./AddMatchPopUpWindow";
import { Link } from 'react-router-dom';
import Deleatetour from "./deleattournamentpopup";
import not_found from "../../../public/assets/images/not found.png"



export const fetchtour = (props) => {
  const [Show,setShow] = useState([]);
  const [TournementId, setTournementId] = useState([]);
  
  const handleShow = () => MatchCard
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get('http://localhost:8000/tournament');
        setTournementId(response.data);
      
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };
 
    fetchTournaments();
  }, []);
  

  return (
    <>
      <div className="row"style={{backgroundColor:"#1A1E25"}}>
   

   
      
      {TournementId
        .slice()
        .reverse()
        .map((match, index) => (
          <div key={match._id} className="col-xl-6 col-lg-6 col-md-12 mb-3">
            <Card 
            onClick={handleShow}
              id={match.id}
              style={{
                backgroundColor: "#FFFFFF0D",
                borderRadius: "5px",
                border: " solid",
                borderWidth: "thin",
              }}
            >
            
              <Card.Img
                variant="top"
                //to do get logo frome upload 
                src={match.logo||not_found} 
                style={{ alignSelf: "center", maxWidth: "200px" }}
              />
              <Card.Body>
                <Card.Title style={{ fontSize: "24px" }}>
                  <strong>{match.name}</strong>
                </Card.Title>
                <ListGroup style={{ color: "white" }}>
                  <ListGroup.Item
                    style={{
                      backgroundColor: "#FFFFFF0D",
                      fontSize: "20px",
                      padding: "0px",
                      letterSpacing: "2px",
                    }}
                  >
                    starting Time : {match.date_debut}
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{
                      backgroundColor: "#FFFFFF0D",
                      fontSize: "20px",
                      padding: "0px",
                      letterSpacing: "2px",
                    }}
                  >
                    ending Time : {match.date_fin}
                  </ListGroup.Item>
                  
                 
                  
                </ListGroup>
              </Card.Body>
              <Card.Body><div>
                < Link to={`/fetchmatchbytour/${match._id}`}><Button  variant="info"  >Get Matches</Button></Link>
                &nbsp;  <Deleatetour matchid={match._id} ></Deleatetour>
                </div>
                <div className="row justify-content-around">                  
                  {/* <Fetch matchid={match._id}
                    time={match.startingTime}
                    date={match.Date}
                    type={match.matchType}
                    location={match.location}> </Fetch> */}
                    {/* <MatchByID matchid={match._id}>test</MatchByID> */}
                   
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      
    </div>
    </>
  );
};

export default fetchtour;