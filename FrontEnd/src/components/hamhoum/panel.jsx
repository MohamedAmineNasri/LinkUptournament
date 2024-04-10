import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import MatchCard from './match';
import Button from "react-bootstrap/Button";
import AddMatchPopUpWindow from "./AddMatchPopUpWindow";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import EditPopUpSelectedMatch from "./update";
import DeleateMatchPopUp from "./DeleateMatchPopUp";
import not_found from "../../../public/assets/images/not found.png"
import { editMatch } from "../../redux/slice/matchSlice";
import { useDispatch } from "react-redux";
import DefaultLayout from '../../Dashboard/src/layout/DefaultLayout';

export const fetchtour = () => {
    const { match } = useParams();
  
  const [TournementId, setTournementId] = useState([]);
  const[Team1name,setteam1name]=useState();
  const[Team1logo,setteam1logo]=useState();
  const[Team2name,setteam2name]=useState();
  const[Team2logo,setteam2logo]=useState();
  const[T1,setT1]=useState([]);
  const[T2,setT2]=useState([]);
  const[T2playerid,sett2id]=useState([]);
  const[T2playername,sett2name]=useState([]);
  const[T1playername,sett1name]=useState([]);
  const[T1playerid,sett1id]=useState([]);
  const[w,setw]=useState();
  const [isChanged, setIsChanged] = useState(false);
  
  const handleShow = () => MatchCard
  const dispatch = useDispatch();
  const handleSaveChanges = () => {
    
      dispatch(
        editMatch({
          matchid: match,
          goal1: T1,
          goal2: T2
        })
      );
    
    // window.location.reload();
    
  };
  useEffect(() => {
    const fetchplayer=async()=>{}
    const fetchTournaments = async () => {
      try {
        
      
        const response = await axios.get('http://localhost:8000/match/'+match);
       
        setTournementId(response.data);
        
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };
    const popone = ( )=>{T1.pop(1)}
    const fetchMatchesWithTeamDetails = async () => {
      try {
        const matchesResponse = await axios.get('http://localhost:8000/match/'+match);
        setT1(matchesResponse.data.goal1)
        setT2(matchesResponse.data.goal2)
        
        const team2 = matchesResponse.data.team2;
       

        


         const teamPromises2 =    axios.get(`http://localhost:8000/team/getTeam/${team2}`);
         const getteam2player= axios.get(`http://localhost:8000/player/team/${team2}`)
         
        
      
        
        try {
          const teamResponses2 = await teamPromises2;
          const playerResponse2name = await (await getteam2player).data.map((e)=>e.name+" "+e.number)
          sett2name(playerResponse2name)
          const playerResponse2id = await (await getteam2player).data.map((e)=>e._id)
          sett2id(playerResponse2id)
          

          
          // Extract team names from responses
          const teamNames2 = teamResponses2.data.TeamName;
          
          const teamNameslogo2 = teamResponses2.data.TeamLogo;
          
          
          setteam2name(teamNames2)
          setteam2logo(teamNameslogo2)
        //    console.log("Team Names:2", teamNames2,"team2logo",teamNameslogo2);
        } catch (error) {
          console.error("Error fetching team data:", error);
        }
        const team1 = matchesResponse.data.team1;
        const teamPromises1 = axios.get(`http://localhost:8000/team/getTeam/${team1}`);
        const getteam1player= axios.get(`http://localhost:8000/player/team/${team1}`)
        
        try {
          const teamResponses1 = await teamPromises1;
          const playerResponse1name = await (await getteam1player).data.map((e)=>e.name+" "+e.number)
          sett1name(playerResponse1name)
          const playerResponse1id = await (await getteam1player).data.map((e)=>e._id)
          sett1id(playerResponse1id)
          
          
          // Extract team names from responses
          const teamNames1 = teamResponses1.data.TeamName;
          const teamNameslogo1 = teamResponses1.data.TeamLogo;
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
    

  }, [match]);


  return (
    <>
    <DefaultLayout>
     <div className="site-section bg-dark">
            <div className="container">
   <div className="row mb-5">
                <div className="col-lg-12">
                  <div className="widget-next-match">
                    <div className="widget-title">
                      <h3>{TournementId.tournamentName}</h3>
                    </div>
                    <div className="widget-body mb-3"  >
                        
                      <div className="widget-vs">
                        <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                          <div className="team-1 text-center"  >
                            <img
                              src={Team1logo}
                              alt="Image"
                            /> <br/>
                            <h1 >{Team1name}</h1>
                          </div>
                          <div style={{display: 'flex',alignItems: 'center',justifyContent: 'space-evenly',}}>
                            <span className="vs" >
                                {T1.length}<span >VS</span> {T2.length}
                              
                            </span>
                           
                          </div>
                          <div className="team-2 text-center">
                            <img
                              src={Team2logo} 
                              alt="Image"
                            />
                            <h1>{Team2name}</h1>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center widget-vs-contents mb-4">
                      <h4>{TournementId.matchstatus}</h4>
                      <p className="mb-5">
                        <span className="d-block">{TournementId.date}</span>
                        <span className="d-block">{TournementId.startingtime}</span>
                        <span className="d-block">{TournementId.weathercondition}</span>

                        <strong className="text-primary">{TournementId.matchtype}</strong>
                        
                        
                      </p>
                      <br/>
                      <br/>
                      <span><div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex team-vs">
                  
                  <div className="team-1 w-50">
                    <div className="team-details w-100 text-center">
                    
                      
                      <ul className="list-unstyled">
                        
                        <li>{Team1name} Gola</li>
                        <select onChange={(e) => setT1([...T1,e.target.value])} style={{ backgroundColor: 'black', color: 'white' }}>
  <option>select player</option>
  {T1playername.map((teamName, index) => (
    <option key={index} value={T1playerid[index]}>
      {teamName}
    </option>
  ))}
</select>
                        
                        
                      </ul>
                    </div>
                  </div>
                  <div className="team-2 w-50">
                    <div className="team-details w-100 text-center">
                    
                      
                      <ul className="list-unstyled">
                        
                        <li>{Team2name} Gola</li>
                        <select onChange={(e) => setT2([...T2,e.target.value])} style={{ backgroundColor: 'black', color: 'white' }}>
  <option>select player</option>
  {T2playername.map((teamName, index) => (
    <option key={index} value={T2playerid[index]}>
      {teamName}
    </option>
  ))}
</select>

          
                        
                      </ul>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div></span>

                      <div id="date-countdown2" className="pb-1"></div>
                    </div> <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center',}}>
                    <Button variant="primary"  onClick={handleSaveChanges}>
            Save Changes
          </Button></div>
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