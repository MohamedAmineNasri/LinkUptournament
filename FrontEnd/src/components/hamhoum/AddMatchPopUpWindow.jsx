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
   const [isValid, setIsValid] = useState(true);
   const [isValid1, setIsValid1] = useState(true);
   const [isValid2, setIsValid2] = useState(true);
   const [isValid3, setIsValid3] = useState(true);
   const [isValidteam2, setIsValidteam2] = useState(true);
   const [isValidteam1, setIsValidteam1] = useState(true);
   
  const dispatch = useDispatch();
  const handleSaveChanges = (e) => {
    e.preventDefault();
    dispatch(
        addnewMatch({
          // matchTime: 0,
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
    
    
   
  };
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setMatchtype(newName);
    // Validate name (only letters)
    setIsValid(/^[a-zA-Z]+$/.test(newName));
  };
  const handleteam2 = (e) => {
    const newName = e.target.value;
    setTeam2(newName);
    // Validate name (only letters)
    setIsValidteam2(newName!=Team1 && newName!= "null") ;
   
  };
  const handleteam1 = (e) => {
    const newName = e.target.value;
    setTeam1(newName);
    // Validate name (only letters)
    setIsValidteam1(newName!=Team2 && newName!= "null");
   
  };
  const handlelocationChange = (e) => {
    const newName = e.target.value;
    setLocation(newName);
    // Validate name (only letters)
    setIsValid3(/^[a-zA-Z]+$/.test(newName));
  };
  const handlerefChange = (e) => {
    const newName = e.target.value;
    setReferee(newName);
    // Validate name (only letters)
    setIsValid2(/^[a-zA-Z]+$/.test(newName));
  };
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    // Validate date (greater than today)
    const today = new Date().toISOString().slice(0, 10); // Get today's date as string
    setIsValid1(newDate > today); // Compare entered date with today's date
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
        console.log("Successfully retrieved the tournament:", response.data.tournament.type);
        settournament(tournament)
        setMatchtype(response.data.tournament.type)
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
  <Button size="lg" variant="success" onClick={handleShow} className="mb-10  " >
    Add Match
  </Button>

  <Modal show={show} onHide={handleClose} className="w-full  mx-auto bg-gray-900" >
    <Modal.Header className="bg-gray-900 text-white" closeButton>
      <Modal.Title>Add Match</Modal.Title>
    </Modal.Header>
    <Modal.Body className="bg-gray-900 text-white">
      <Form>
        <Form.Group className="mb-3" controlId="locationInput">
          <Form.Label>Match Status: {Matchstatus}</Form.Label>
          <br />
          <Form.Label>Date:</Form.Label>
          <Form.Control
            type="date"
            placeholder="date"
            autoFocus
            value={Date}
            onChange={handleDateChange}
            className={`border ${isValid1 ? 'border-green-500' : 'border-red-500'}`}
          />
          {!isValid1 && <p className="text-red-500">Date must be greater than today.</p>}
          <Form.Label>Starting Time:</Form.Label>
          <Form.Control
            type="time"
            placeholder="time"
            autoFocus
            value={Startingtime}
            onChange={(e) => setStartingtime(e.target.value)}
          />
          <Form.Label>Match Type:</Form.Label>
          <Form.Control
            type="text"
            autoFocus
            value={Matchtype}
            className={`border ${isValid ? 'border-green-500' : 'border-red-500'}`}
          />
          {!isValid && <p className="text-red-500">Match type must contain only letters.</p>}
          <Form.Label>Team 1:</Form.Label>
          <br />
          <select onChange={handleteam1} className="border text-black">
            <option value="null">Select Team 1</option>
            {teamsWithNames.map((teamName, index) => (
              <option key={index} value={tournament.teams[index]}>
                {teamName}
              </option>
            ))}
          </select>
          {!isValidteam1 && <p className="text-red-500">Please select a different Team 1.</p>}
          <br />
          <Form.Label>Team 2:</Form.Label>
          <br />
          <select onChange={handleteam2} className="border text-black">
            <option value="null">Select Team 2</option>
            {teamsWithNames.map((teamName, index) => (
              <option key={index} value={tournament.teams[index]}>
                {teamName}
              </option>
            ))}
          </select>
          {!isValidteam2 && <p className="text-red-500">Please select a different Team 2.</p>}
          <Form.Label>Referee:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Referee"
            autoFocus
            value={Referee}
            onChange={handlerefChange}
            className={`border ${isValid1 ? 'border-green-500' : 'border-red-500'}`}
          />
          {!isValid2 && <p className="text-red-500">Referee must contain only letters.</p>}
          <Form.Label>Match Location:</Form.Label>
          <br />
          <select onChange={(e) => setLocation(e.target.value)} className="border text-black">
            <option>Select City</option>
            <option value="2464470">Tunis</option>
            <option value="2467454">Sfax</option>
            <option value="2464915">Sousse</option>
            <option value="2468369">Gabès</option>
            <option value="2465624">Kairouan</option>
            <option value="2473305">Bizerte</option>
            <option value="2467813">Gafsa</option>
            <option value="2504205">Ariana</option>
            <option value="2473448">Kasserine</option>
            <option value="2464008">Monastir</option>
            <option value="2471046">Ben Arous</option>
            <option value="2467580">La Marsa</option>
            <option value="2465440">Tataouine</option>
            <option value="2469566">Nabeul</option>
            <option value="2470233">Hammamet</option>
            <option value="2468843">Mahdia</option>
            <option value="2472771">Beja</option>
            <option value="2467815">Jendouba</option>
            <option value="2462881">Sidi Bouzid</option>
            <option value="2468560">Medenine</option>
            <option value="2469254">El Kef</option>
            <option value="2465196">Zaghouan</option>
            <option value="2462962">Siliana</option>
            <option value="2464475">Tozeur</option>
          </select>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer className="bg-gray-900">
      <Button variant="secondary" onClick={handleClose} className="bg-red-500 text-white">
        Close
      </Button>
      <Button variant="primary" onClick={handleSaveChanges} className="bg-green-500 text-white">
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
</>
  );
};

export default AddMatchPopUpWindow;