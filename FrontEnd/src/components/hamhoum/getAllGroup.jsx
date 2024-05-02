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
// import DefaultLayout from '../../Dashboard/src/layout/DefaultLayout.js';
import DefaultLayout from '../../Dashboard/src/layout/DefaultLayout';
import { useParams } from 'react-router-dom';



export const fetchtour = () => {
   const { tournamentId } = useParams();
    const [Show,setShow] = useState([]);
  const [TournementId, setTournementId] = useState([]);
  
  const handleShow = () => MatchCard
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        console.log(tournamentId,"fffffff")
        const response = await axios.get('http://localhost:8000/group/tournament/'+tournamentId);
        console.log( "test",response.data)
        setTournementId(response.data);
      
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };
 
    fetchTournaments();
  }, []);
  

  return (
    <>
    <DefaultLayout>
      
      <div className="row"style={{backgroundColor:"#1A1E25"}}>
   

<div>



      </div>
   
      
      {TournementId
        .slice()
        .reverse()
        .map((match, index) => (
          <Link to={`/matchBygroup/${tournamentId}/${match._id}`}  className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
           
 
<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{match.name}</h5>

</Link>
          
        ))}
     
    </div>
    </DefaultLayout>
    </>
  );
};

export default fetchtour;