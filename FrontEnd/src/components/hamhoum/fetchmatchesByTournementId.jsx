import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import MatchCard from './match';
import AddMatchPopUpWindow from "./AddMatchPopUpWindow";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import EditPopUpSelectedMatch from "./update";
import DeleateMatchPopUp from "./DeleateMatchPopUp";
import not_found from "../../../public/assets/images/not found.png"
import Button from "react-bootstrap/Button";
import DefaultLayout from '../../Dashboard/src/layout/DefaultLayout';

export const fetchtour = () => {
    const { tournamentId } = useParams();
  
  const [TournementId, setTournementId] = useState([]);
  const[Team1name,setteam1name]=useState([]);
  const[Team1logo,setteam1logo]=useState([]);
  const[Team2name,setteam2name]=useState([]);
  const[Team2logo,setteam2logo]=useState([]);
  
  const handleShow = () => MatchCard
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        
      
        const response = await axios.get('http://localhost:8000/match/tournement/'+tournamentId);
        setTournementId(response.data);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };
    const fetchMatchesWithTeamDetails = async () => {
      try {
        const matchesResponse = await axios.get('http://localhost:8000/match/tournement/'+tournamentId);
        
        const team2 = matchesResponse.data.map((e)=>e.team2);
        const teamPromises2 = team2.map(teamId =>
          axios.get(`http://localhost:8000/team/getTeam/${teamId}`)
        );
        
        try {
          const teamResponses2 = await Promise.all(teamPromises2);
          
          // Extract team names from responses
          const teamNames2 = teamResponses2.map(response => response.data.TeamName);
          const teamNameslogo2 = teamResponses2.map(response => response.data.TeamLogo);
          
          
          setteam2name(teamNames2)
          setteam2logo(teamNameslogo2)
          // console.log("Team Names:2", teamNames2,"team2logo",teamNameslogo2);
        } catch (error) {
          console.error("Error fetching team data:", error);
        }
        const team1 = matchesResponse.data.map((e)=>e.team1);
        const teamPromises1 = team1.map(teamId =>
          axios.get(`http://localhost:8000/team/getTeam/${teamId}`)
        );
        
        try {
          const teamResponses1 = await Promise.all(teamPromises1);
          
          // Extract team names from responses
          const teamNames1 = teamResponses1.map(response => response.data.TeamName);
          const teamNameslogo1 = teamResponses1.map(response => response.data.TeamLogo);
          setteam1name(teamNames1)
          setteam1logo(teamNameslogo1)
          // console.log("Team Names:1", teamNames1,"team1logo",teamNameslogo1);
        } catch (error) {
          console.error("Error fetching team data:", error);
        }


        
        

        ;

       
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };
    
    fetchTournaments();
    fetchMatchesWithTeamDetails()
    

  }, []);
if (TournementId.length ==0) {
 
        return <div style={{ backgroundColor:"rgb(35, 79, 30)"}}><AddMatchPopUpWindow tourid={tournamentId}  /><br/>Loading tournament...</div>;
       
      }
  return (
    <>
   <DefaultLayout>
    <div>
        <div className="site-wrap">
          <div className="site-mobile-menu site-navbar-target">
            <div className="site-mobile-menu-header">
              <div className="site-mobile-menu-close">
                <span className="icon-close2 js-menu-toggle"></span>
              </div>
            </div>
            <div className="site-mobile-menu-body"></div>
          </div>

          <header className="site-navbar py-4" role="banner">
            <div className="container">
              <div className="d-flex align-items-center">
                <div className="site-logo">
                  <AddMatchPopUpWindow></AddMatchPopUpWindow>
                </div>
                <div className="ml-auto">
                

                  <a
                    href="#"
                    className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right text-white"
                  >
                    <span className="icon-menu h3 text-white"></span>
                  </a>
                </div>
              </div>
            </div>
          </header>

          

          <div className="site-section bg-dark">
            <div className="container">
              

              <div className="row">
                <div className="col-12 title-section">
                  <h2 className="heading">Upcoming Match</h2>
                </div>
                {TournementId
        .slice()
        .reverse()
        .map((match, index) => (
                <div className="col-lg-6 mb-4">
                  <div className="bg-light p-4 rounded">
                    <div className="widget-body">
                      <div className="widget-vs">
                        <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                          <div className="team-1 text-center">
                            <img
                              src={Team1logo.slice().reverse()[index]}
                              alt="Image"
                            />
                            <h3>{Team1name.slice().reverse()[index]}</h3>
                          </div>
                          <div>
                            <span className="vs" >
                              <span style={{display: 'flex',alignItems: 'center',justifyContent: 'center',}}>VS</span>
                              
                            </span>
                            <span  >
                              <span style={{display: 'flex',alignItems: 'center',justifyContent: 'center',}}>{match.goal1.length}:{match.goal2.length}</span>
                              
                            </span>
                          </div>
                          <div className="team-2 text-center">
                            <img
                              src={Team2logo.slice().reverse()[index]} 
                              alt="Image"
                            />
                            <h3>{Team2name.slice().reverse()[index]}</h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center widget-vs-contents mb-4">
                      <h4>{match.matchstatus}</h4>
                      <p className="mb-5">
                        <span className="d-block">{match.date}</span>
                        <span className="d-block">{match.startingtime}</span>
                        <strong className="text-primary">{match.tournamentName}</strong>
                      </p>
                    </div>
                    
                <div className="row justify-content-around">                  
                  {/* <Fetch matchid={match._id}
                    time={match.startingTime}
                    date={match.Date}
                    type={match.matchType}
                    location={match.location}> </Fetch> */}
                    {/* <MatchByID matchid={match._id}>test</MatchByID> */}
                   {/* <AddMatchPopUpWindow TournementId= {match._id}/> */}
                   <EditPopUpSelectedMatch
                    matchid={match._id}
                    referee = {match.referee}
                    date = {match.date}
                    logo={match.logo}
                    matchstatus={match.matchstatus}
                    team1={match.team1}
                    team2={match.team2}
                    weathercondition={match.weathercondition}
                    startingtime={match.startingtime}
                    matchtype={match.matchtype}
                    location={match.location}
                    tournementId={match.tournementId}
                    team1Gols={match.team1Gols}
                    team2Gols={match.team2Gols}
                  ></EditPopUpSelectedMatch>
                  <DeleateMatchPopUp matchid={match._id}></DeleateMatchPopUp>
                  <Link to ={`/panel/${match._id}`}  tournementId={match.tournementId} ><Button  size='lg' variant="outline-info" >
                  Referee
      </Button></Link>
                </div>
                  </div>
                </div>   ))}
               
                
              </div>
            </div>
          </div>

          

          
          
        </div>
      </div>
    
    
    
    
    
 
      </DefaultLayout>
    </>
  );
};

export default fetchtour;
