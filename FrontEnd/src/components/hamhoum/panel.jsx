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
import Swal from "sweetalert2";

export const fetchtour = (props) => {
  const { match } = useParams();
  const[Matchstatus,setmatchstatus]=useState();
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
  const[W,setw]=useState();
  

  
  
  const handleShow = () => MatchCard
  const dispatch = useDispatch();
  const handleSaveChanges = () => {
    
      dispatch(
        editMatch({
          
          matchid: match,
          goal1: T1,
          goal2: T2,
          
          
        })
      );
    
    // window.location.reload();
   
       
  };
  const handleEndMatch = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, end it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setmatchstatus("test")
        // If user clicks "Yes", execute the winer function
        winer();
        setmatchstatus("Finished")
      }
    });
  };
  const dispatch2 = useDispatch();
  const winer = () => { 
    


    dispatch2(
    editMatch({
      matchid: match,
      matchstatus:"Finished",
      w:W,
    }, )
  );
  ;
 

}
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        
      
        const response = await axios.get('http://localhost:8000/match/'+match);
       
        setTournementId(response.data);
       
        setT1(response.data.goal1)
        setT2(response.data.goal2)
        
        console.log(response.data,"rrrrr")
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };
    
    const fetchMatchesWithTeamDetails = async () => {
      try {
        const matchesResponse = await axios.get('http://localhost:8000/match/'+match);
        console.log(matchesResponse.data.team1 )
        // setw(matchesResponse.team1)
         if(matchesResponse.data.matchstatus=="Finished"){setmatchstatus("Finished")}
         if(matchesResponse.data.goal1.length>matchesResponse.data.goal2.length){setw(matchesResponse.data.team1)}
     
         if(matchesResponse.data.goal1.length<matchesResponse.data.goal2.length){setw(matchesResponse.data.team2)}
        if(matchesResponse.data.goal1.length==matchesResponse.data.goal2.length){setw(null)}
        
       
        
        const team2 = matchesResponse.data.team2;
       

        


         const teamPromises2 = await axios.get(`http://localhost:8000/team/getTeam/${team2}`);
         const getteam2player= await axios.get(`http://localhost:8000/player/team/${team2}`)
         
        
      
        
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
  <Link to={`/fetchmatchbytour/${TournementId.tournementId}`}>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Return
    </button>
  </Link>
  <div className="container">
    <div className="row mb-5">
      <div className="col-lg-12">
        <div className="widget-next-match">
          <div className="widget-title">
            <h3>{TournementId.tournamentName}</h3>
          </div>
          <div className="widget-body mb-3">
            <div className="widget-vs">
              <div className="flex justify-between w-full items-center">
                <div className="team-1 text-center">
                  <img src={Team1logo} alt="Image" />
                  <h1>{Team1name}</h1>
                </div>
                <div className="flex items-center justify-around">
                  <span className="vs">
                    {T1.length}<span>VS</span> {T2.length}
                  </span>
                </div>
                <div className="team-2 text-center">
                  <img src={Team2logo} alt="Image" />
                  <h1>{Team2name}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center widget-vs-contents mb-4">
            <h4>{TournementId.matchstatus}</h4>
            <p className="mb-5">
              <span className="block">{TournementId.date}</span>
              <span className="block">{TournementId.startingtime}</span>
              <span className="block">{TournementId.weathercondition}</span>
              <strong className="text-primary">{TournementId.matchtype}</strong>
            </p>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="flex team-vs">
                    <div className="team-1 w-1/2">
                      <div className="team-details w-full text-center">
                        <ul className="list-none">
                          <li>{Team1name} Gola</li>
                          <select
                            disabled={Matchstatus === "Finished"}
                            onChange={(e) => setT1([...T1, e.target.value])}
                            className="bg-black text-white"
                          >
                            <option>select player1</option>
                            {T1playername.map((teamName, index) => (
                              <option key={index} value={T1playerid[index]}>
                                {teamName}
                              </option>
                            ))}
                          </select>
                        </ul>
                      </div>
                    </div>
                    <div className="team-2 w-1/2">
                      <div className="team-details w-full text-center">
                        <ul className="list-none">
                          <li>{Team2name} Gola</li>
                          <select
                            disabled={Matchstatus === "Finished"}
                            onChange={(a) => setT2([...T2, a.target.value])}
                            className="bg-black text-white"
                          >
                            <option>select player2</option>
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
            </div>
            <div className="pb-1"></div>
          </div>
          <div className="flex justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSaveChanges}
              disabled={Matchstatus === "Finished"}
            >
              Save Changes
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleEndMatch}
              disabled={Matchstatus === "Finished"}
            >
              End Match
            </button>
          </div>
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
