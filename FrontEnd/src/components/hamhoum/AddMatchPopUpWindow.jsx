import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import { useState, useEffect } from "react";
import { addnewMatch, fetchAllTour } from "../../redux/slice/matchSlice";
import { useDispatch } from "react-redux";
import MatchByID from "./getAllTournement";
import { useParams } from 'react-router-dom';
import { convertToBase64 } from "../../utilities/convertFileBase64";

export const AddMatchPopUpWindow = (props) => {
  const [show, setShow] = useState(false);
  const { tournamentId } = useParams();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  


  //add logic
 
  const [Matchtype, setMatchtype] = useState(null);
  const [Location, setLocation ] = useState(null);
   const [Referee, setReferee ] = useState(null);
   const [Date, setDate ] = useState(null);
   const [Startingtime, setStartingtime] = useState(null);
   const [Logo, setLogo ] = useState({myLogo:""});
   const [Matchstatus, setMatchstatus ] = useState(null);
   const [tournament, settournament ] = useState(null);
   
   const [Team1, setTeam1 ] = useState(null);
   const [Team2, setTeam2 ] = useState(null);
    const [TournementId, setTournementId ] = useState([]);
    const [Weathercondition, setWeathercondition ] = useState(null);
   const [teamsWithNames, setteamsWithNames ] = useState([]);
   const [Team1Gols, setTeam1Gols ] = useState(null);
   const [Team2Gols, setTeam2Gols ] = useState(null);
   
  const dispatch = useDispatch();
  const handleSaveChanges = (e) => {
    e.preventDefault();
    dispatch(
        addnewMatch({
          
          referee:Referee,
          date:Date,
          logo:Logo.myLogo,
          matchstatus:Matchstatus,         
          team1:Team1,
          team2:Team2,
          weathercondition:Weathercondition,
          startingtime:Startingtime,
          matchtype:Matchtype,
          location:Location,
          tournementId:TournementId,
          team1Gols:Team1Gols,
          team2Gols:Team2Gols,
       
      }),
       fetchAllTour(),
      
       
    );
    handleClose();
    consolo.log(props.tourid+"44")
    
   
  };
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertToBase64(file);
    console.log(base64);
    setLogo({ ...Logo, myLogo: base64 });
  };
  
 
  useEffect(() => {
   
    const fetchTournaments = async () => {
      try {
        setTeam1Gols(0)
        setTeam2Gols(0)
        setTournementId(tournamentId)
        setMatchstatus("Starting Soon")
        const response = await axios.get('http://localhost:8000/tournament/' + tournamentId);
        const tournament = response.data.tournament;
        // console.log("Successfully retrieved the tournament:", tournament);
        settournament(tournament)
        // Fetch team names for each team ID
        const teamsWithNames = await Promise.all(tournament.teams.map(async teamId => {
          const teamResponse = await axios.get(`http://localhost:8000/team/getTeam/${teamId}`);
          return teamResponse.data.TeamName;
        }));
  
        // console.log("Teams with names:", teamsWithNames);
        
        // Optionally, you can update the tournament object with team names
        const tournamentWithTeamNames = { ...tournament, teams: teamsWithNames };
        // console.log("Tournament with team names:", tournamentWithTeamNames);
        setteamsWithNames(teamsWithNames)
      } catch (error) {
        // console.error("Error fetching tournament:", error);
      }
    };
  
    fetchTournaments();
  }, [tournamentId]);
 

  return (
    <>
      <Button  size='lg' variant="success" onClick={handleShow}>
        Add Match
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#222831" }} closeButton>
          <Modal.Title>Add Match</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#222831" }}>
          <Form style={{ color: "black" }}>
          <Form.Group className="mb-3" controlId="locationInput">
          <Form.Group className="mb-3" controlId="locationInput">
          <Form.Group className="mb-3" controlId="locationInput">
            
            <Form.Label style={{ color: "white" }}>match statu : {Matchstatus}</Form.Label>
<br/>
               {/* <Form.Select size="lg"
                onChange={(e) => setMatchstatus(e.target.value)}>
      <option>Open this select menu</option>
      <option value="On HOld">On HOld</option>
      <option value="Finished">Finished</option>
      <option value="Half Time">Half Time</option>
      <option value="Starting Soon">Starting Soon</option>
      
     
    </Form.Select> */}
            </Form.Group>
              <Form.Label style={{ color: "white" }}>Date :</Form.Label>
              <Form.Control
                type="date"
                placeholder="date"
                autoFocus
                value={Date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
          <Form.Label style={{ color: "white" }}>starting time :</Form.Label>
              <Form.Control
                type="time"
                placeholder="time"
                autoFocus
                value={Startingtime}
                onChange={(e) => setStartingtime(e.target.value)}
              />
              <Form.Label style={{ color: "white" }}>match type :</Form.Label>
              <Form.Control
                type="tex"
                placeholder="match type"
                autoFocus
                value={Matchtype}
                onChange={(e) => setMatchtype(e.target.value)}
              />
               
              <Form.Label style={{ color: "white" }}>weathercondition :</Form.Label>
<br/>
               <Form.Select size="lg"
                onChange={(e) => setWeathercondition(e.target.value)}>
      <option>Open this select menu</option>
      <option value="sunny">sunny</option>
      <option value="rainy">rainy</option>
      <option value="windy">windy</option>
      <option value="stormy">stormy</option>
      <option value="cloudy">cloudy</option>
     
    </Form.Select>
            </Form.Group>
          
            <Form.Group className="mb-3" controlId="locationInput">
              <Form.Label style={{ color: "white" }}>team1 :</Form.Label>
              <br/>
              <select onChange={(e) => setTeam1(e.target.value)}>
    {teamsWithNames.map((teamName, index) => (
      <option key={index} value={tournament.teams[index]}>
        {teamName}
      </option>
      
    ))}
  </select>
         <br/>
         <Form.Label style={{ color: "white" }}>team2 :</Form.Label>
              <br/>
              <select onChange={(e) => setTeam2(e.target.value)}>
    {teamsWithNames.map((teamName, index) => (
      <option key={index} value={tournament.teams[index]}>
        {teamName}
      </option>
      
    ))}
  </select>
            </Form.Group>
         
          <Form.Group className="mb-3" controlId="locationInput">
              <Form.Label style={{ color: "white" }}>Referee :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Referee"
                autoFocus
                value={Referee}
                onChange={(e) => setReferee(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="locationInput">
              <Form.Label style={{ color: "white" }}>logo :</Form.Label>
              <Form.Control
                type="file"
                accept=".png"
                placeholder="match location"
                autoFocus
              
                onChange={(e) => handleLogoUpload(e)}
              />
            </Form.Group>
           
            <Form.Group className="mb-3" controlId="locationInput">
              <Form.Label style={{ color: "white" }}>match location :</Form.Label>
              <Form.Control
                type="select"
                placeholder="match location"
                autoFocus
                value={Location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
           
            {/* <Form.Group> <select  onChange={(e) => setTournementId(e.target.value)}>
           
        {tournementId.map(tournament => (
          <option  value={tournament._id}>
            {tournament.name}
          </option>
        ))}
      </select></Form.Group>
            */}
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#222831" }}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddMatchPopUpWindow;