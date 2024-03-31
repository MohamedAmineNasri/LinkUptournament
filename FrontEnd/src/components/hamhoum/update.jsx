import { useState ,useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { editMatch ,fetchAllTour} from "../../redux/slice/matchSlice";
import { convertToBase64 } from "../../utilities/convertFileBase64";
import axios from 'axios';

import MatchByID from "./getAllTournement";



export const EditPopUpSelectedMatch = (props) => {
  // pop up logic --------------
  
  const [show, setShow] = useState(false);
  const { tournamentId } = useParams();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




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
   

  // to change
  const [T1, setT1] = useState(null);
  const [T2, setT2] = useState(null);
  

  // Initialize flag to track changes
  const [isChanged, setIsChanged] = useState(false);

  // Update edited values only if the input fields are changed
  const dispatch = useDispatch();
  const handleMatchtype = (e) => {
    setMatchtype(e.target.value);
    setIsChanged(true);
  };
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setIsChanged(true);
  };
  const handleRefereeChange = (e) => {
    setReferee(e.target.value);
    setIsChanged(true);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
    setIsChanged(true);
  };
  const handleStartingtimeChange = (e) => {
    setStartingtime(e.target.value);
    setIsChanged(true);
  };
  const handleLogoChange = (e) => {
    setLogo(e.target.value);
    setIsChanged(true);
  };
  const handleMatchstatus = (e) => {
    setMatchstatus(e.target.value);
    setIsChanged(true);
  };
  const handletournamentChange = (e) => {
    settournament(e.target.value);
    setIsChanged(true);
  };
  const handleTeam1Change = (e) => {
    setTeam1(e.target.value);
    setIsChanged(true);
  };
  const handleTeam2Change = (e) => {
    setTeam2(e.target.value);
    setIsChanged(true);
  };
  const handleTournementIdChange = (e) => {
    setTournementId(e.target.value);
    setIsChanged(true);
  };
  const handleWeatherconditionChange = (e) => {
    setWeathercondition(e.target.value);
    setIsChanged(true);
  };
  const handleteamsWithNamesChange = (e) => {
    setteamsWithNames(e.target.value);
    setIsChanged(true);
  };
  const handleTeam1GolsChange = (e) => {
    setTeam1Gols(e.target.value);
    setIsChanged(true);
  };
  const handleTeam2GolsChange = (e) => {
    setTeam2Gols(e.target.value);
    setIsChanged(true);
  };
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertToBase64(file);
    console.log(base64);
    setLogo({ ...Logo, myLogo: base64 });
  };





  // const handleTimeChange = (e) => {
  //   setEditedTime(e.target.value);
  //   setIsChanged(true);
  // };
  
  // const handleTypeChange = (e) => {
  //   setEditedType(e.target.value);
  //   setIsChanged(true);
  // };
  // const handleLocChange = (e) => {
  //   setEditedLoc(e.target.value);
  //   setIsChanged(true);
  // };

  // Handle save changes
  const handleSaveChanges = () => {
    if (isChanged) {
      dispatch(
        editMatch({
          matchid: props.matchid,
         referee:Referee||props.referee,
          date:Date||props.date,
          logo:Logo.myLogo||props.logo,
          matchstatus:Matchstatus||props.matchstatus,         
          team1:Team1||props.team1,
          team2:Team2||props.team2,
          weathercondition:Weathercondition||props.weathercondition,
          startingtime:Startingtime||props.startingtime,
          matchtype:Matchtype||props.matchtype,
          location:Location||props.location,
          tournementId:TournementId|| props.tournementId,
          team1Gols:Team1Gols|| props.team1Gols,
          team2Gols:Team2Gols||  props.team2Gols,
       
        }),fetchAllTour(),
      );
    }
    window.location.reload();
    handleClose();
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
        const t2 = await axios.get(`http://localhost:8000/team/getTeam/${props.team2}`);
           setT2(t2.data.TeamName);
        const t1 = await axios.get(`http://localhost:8000/team/getTeam/${props.team1}`);
           setT1(t1.data.TeamName);
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
      <Button  variant="success" onClick={handleShow}>
        Edit Team
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#222831" }} closeButton>
          <Modal.Title>Edit Match</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#222831" }}>
          <Form style={{ color: "black" }}>
          <Form.Group className="mb-3" controlId="locationInput">
          <Form.Group className="mb-3" controlId="locationInput">
          <Form.Group className="mb-3" controlId="locationInput">
            
            <Form.Label style={{ color: "white" }}>match statu : {Matchstatus||props.matchstatus}</Form.Label>
<br/>
                <Form.Select size="lg"
                onChange={(e) => handleMatchstatus(e)}>
      <option>Open this select menu</option>
      <option value="On HOld">On HOld</option>
      <option value="Finished">Finished</option>
      <option value="Half Time">Half Time</option>
      <option value="Starting Soon">Starting Soon</option>
      
     
    </Form.Select> 
            </Form.Group>
              <Form.Label style={{ color: "white" }}>Date :</Form.Label>
              <Form.Control
                type="date"
                placeholder="date"
                autoFocus
                value={Date||props.date}
                onChange={(e) => handleDateChange(e)}
              />
            </Form.Group>
          <Form.Label style={{ color: "white" }}>starting time :</Form.Label>
              <Form.Control
                type="time"
                placeholder="time"
                autoFocus
                value={Startingtime||props.startingtime}
                onChange={(e) => handleStartingtimeChange(e)}
              />
              <Form.Label style={{ color: "white" }}>match type :</Form.Label>
              <Form.Control
                type="tex"
                placeholder="match type"
                autoFocus
                value={Matchtype||props.matchtype}
                onChange={(e) => handleMatchtype(e)}
              />
               
              <Form.Label style={{ color: "white" }}>weathercondition :</Form.Label>
<br/>
               <Form.Select size="lg"
                onChange={(e) => handleWeatherconditionChange(e)}>
      <option> {props.weathercondition||"null"}</option>
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
              <select onChange={(e) => handleTeam1Change(e)}>
              <option> {T1}</option>
    {teamsWithNames.map((teamName, index) => (
      <option key={index} value={tournament.teams[index]}>
        {teamName}
      </option>
      
    ))}
  </select>
         <br/>
         <Form.Label style={{ color: "white" }}>team2 :</Form.Label>
              <br/>
              <select onChange={(e) => handleTeam2Change(e)}>
              <option> {T2}</option>
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
                value={Referee||props.referee}
                onChange={(e) => handleRefereeChange(e)}
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
                value={Location||props.location}
                onChange={(e) => handleLocationChange(e)}
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
export default EditPopUpSelectedMatch;
