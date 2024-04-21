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
                onChange={handleDateChange}
                style={{ borderColor: isValid1 ? 'green' : 'red' }} 
              />
               {!isValid1 && <p>Date must be greater than today.</p>}
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
               
                autoFocus
                value={Matchtype}
                
                style={{ borderColor: isValid ? 'green' : 'red'  }} 
              />
              {!isValid && <p style={{ color:"red"}}>match type must contain only letters.</p>}
               
              {/* <Form.Label style={{ color: "white" }}>weathercondition :</Form.Label> */}

               {/* <Form.Select size="lg"
                onChange={(e) => setWeathercondition(e.target.value)}>
      <option> select weather</option>
      <option value="sunny">sunny</option>
      <option value="rainy">rainy</option>
      <option value="windy">windy</option>
      <option value="stormy">stormy</option>
      <option value="cloudy">cloudy</option>
     
    </Form.Select> */}
            </Form.Group>
          
            <Form.Group className="mb-3" controlId="locationInput">
              <Form.Label style={{ color: "white" }}>team1 :</Form.Label>
              <br/>
              <select onChange={handleteam1}>
              <option value= "null"> select Team1 </option>
    {teamsWithNames.map((teamName, index) => (
      <option key={index} value={tournament.teams[index]}>
        {teamName}
      </option>
      
    ))}
  </select>
  {!isValidteam1 && <p style={{ color:"red"}}>please select deferent team1</p>}
         <br/>
         <Form.Label style={{ color: "white" }}>team2 :</Form.Label>
              <br/>
              <select onChange={handleteam2}>
              <option value= "null"> select Team2</option>
    {teamsWithNames.map((teamName, index) => (
      <option key={index} value={tournament.teams[index]}>
        {teamName}
      </option>
      
      
    ))}
  </select>
   {!isValidteam2 && <p style={{ color:"red"}}>please select deferent team2</p>}
            </Form.Group>
         
          <Form.Group className="mb-3" controlId="locationInput">
              <Form.Label style={{ color: "white" }}>Referee :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Referee"
                autoFocus
                value={Referee}
                onChange={handlerefChange}
                style={{ borderColor: isValid1 ? 'green' : 'red' }} 
                />
                 {!isValid2 && <p style={{ color:"red"}}>Referee must contain only letters.</p>}

              
            </Form.Group>
            
            
           
            <Form.Group className="mb-3" controlId="locationInput">
              <Form.Label style={{ color: "white" }}>match location :</Form.Label>
              
        
              <br/>
              <select onChange={(e) => setLocation(e.target.value)}>
              <option> select City</option>
    
              <option  value="2464470">Tunis</option>
              <option  value="2467454">Sfax </option>
              <option  value="2464915">Sousse </option>
              <option  value="2468369">Gabès </option>
              <option  value="2465624">Kairouan </option>
              <option  value="2473305">Bizerte </option>
              <option  value="2467813">Gafsa </option>
              <option  value="2504205">Ariana </option>
              <option  value="2473448">Kasserine </option>
              <option  value="2464008">Monastir </option>
              <option  value="2471046">Ben Arous </option>
              <option  value="2467580">La Marsa</option>
              <option  value="2465440">Tataouine</option>
              <option  value="2469566">Nabeul </option>
              <option  value="2470233">Hammamet </option>
              <option  value="2468843">Mahdia </option>
              <option  value="2472771">Beja</option>
              <option  value="2467815">Jendouba </option>
              <option  value="2462881">Sidi Bouzid</option>
              <option  value="2468560">Medenine </option>
              <option  value="2469254">El Kef</option>
              <option  value="2465196">Zaghouan </option>
              <option  value="2462962">Siliana </option>
              <option  value="2464475">Tozeur </option>

      
    
  </select>
              
              {/* <Form.Control
                type="select"
                placeholder="match location"
                autoFocus
                value={Location}
                onChange={handlelocationChange}
                style={{ borderColor: isValid1 ? 'green' : 'red' }} 
                />
                 {!isValid3 && <p style={{ color:"white"}}>location must contain only letters.</p>} */}
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