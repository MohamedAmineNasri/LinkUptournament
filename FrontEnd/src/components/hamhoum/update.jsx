import { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { editMatch, fetchAllTour } from "../../redux/slice/matchSlice";
import { convertToBase64 } from "../../utilities/convertFileBase64";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
  Input,
} from "@material-tailwind/react";

import MatchByID from "./getAllGroup";
import Panel from "./panel";

export const EditPopUpSelectedMatch = (props) => {
  // pop up logic --------------
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const { tournamentId } = useParams();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [referees, setReferees] = useState([]);
  const [Matchtype, setMatchtype] = useState(null);
  const [Location, setLocation] = useState(null);
  const [Referee, setReferee] = useState(null);
  const [Date, setDate] = useState(null);
  const [Startingtime, setStartingtime] = useState(null);
  const [Logo, setLogo] = useState({ myLogo: "" });
  const [Matchstatus, setMatchstatus] = useState(null);
  const [tournament, settournament] = useState(null);
  const [Team1, setTeam1] = useState(null);
  const [Team2, setTeam2] = useState(null);
  const [TournementId, setTournementId] = useState([]);
  const [TournId, setTournId] = useState();
  const [Weathercondition, setWeathercondition] = useState(null);
  const [teamsWithNames, setteamsWithNames] = useState([]);
  const [Team1Gols, setTeam1Gols] = useState(null);
  const [Team2Gols, setTeam2Gols] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [isValid1, setIsValid1] = useState(true);
  const [isValid2, setIsValid2] = useState(true);
  const [isValid3, setIsValid3] = useState(true);
  const [isValidteam2, setIsValidteam2] = useState(true);
  const [isValidteam1, setIsValidteam1] = useState(true);

  // to change
  const [T1, setT1] = useState(null);
  const [T2, setT2] = useState(null);

  // Initialize flag to track changes
  const [isChanged, setIsChanged] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
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
    const selectedRefereeName = e.target.value;
    const selectedReferee = referees.find(
      (referee) => referee.name === selectedRefereeName
    );
    setReferee(selectedReferee);
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

    const base64 = await convertToBase64(file);

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
          referee: Referee || props.referee,
          date: Date || props.date,
          logo: Logo.myLogo || props.logo,
          matchstatus: Matchstatus || props.matchstatus,
          team1: Team1 || props.team1,
          team2: Team2 || props.team2,
          weathercondition: Weathercondition || props.weathercondition,
          startingtime: Startingtime || props.startingtime,
          matchtype: Matchtype || props.matchtype,
          location: Location || props.location,
          tournementId: TournementId || props.tournementId,
          tournId: TournId || props.tournementId,
          team1Gols: Team1Gols || props.team1Gols,
          team2Gols: Team2Gols || props.team2Gols,
        }),
        fetchAllTour()
      );
    }
    window.location.reload();
    handleClose();
  };
  useEffect(() => {
    // fetch referee
    const fetchReferees = async () => {
      const response = await axios.get(
        `http://localhost:8000/referee/available`
      );
      setReferees(response.data);
      console.log(response.data);
    };
    fetchReferees();
    // fetch referee
    const fetchTournaments = async () => {
      try {
        setTeam1Gols(0);
        setTeam2Gols(0);
        setTournementId(tournamentId);
        setMatchstatus("Starting Soon");
        const response = await axios.get(
          `http://localhost:8000/tourn/${props.tournementId}`
        );
        const tournament = response.data.tournament;
        // console.log("Successfully retrieved the tournament:", tournament);
        settournament(tournament);
        const t2 = await axios.get(
          `http://localhost:8000/team/getTeam/${props.team2}`
        );
        setT2(t2.data.TeamName);
        const t1 = await axios.get(
          `http://localhost:8000/team/getTeam/${props.team1}`
        );
        setT1(t1.data.TeamName);
        // Fetch team names for each team ID
        const teamsWithNames = await Promise.all(
          tournament.teams.map(async (teamId) => {
            const teamResponse = await axios.get(
              `http://localhost:8000/team/getTeam/${teamId}`
            );
            return teamResponse.data.TeamName;
          })
        );

        // console.log("Teams with names:", teamsWithNames);

        // Optionally, you can update the tournament object with team names
        const tournamentWithTeamNames = {
          ...tournament,
          teams: teamsWithNames,
        };
        // console.log("Tournament with team names:", tournamentWithTeamNames);
        setteamsWithNames(teamsWithNames);
      } catch (error) {
        // console.error("Error fetching tournament:", error);
      }
    };

    fetchTournaments();
  }, [tournamentId]);

  return (
    <>
      <button
        size="lg"
        data-modal-target="crud-modal"
        data-modal-toggle="crud-modal"
        className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
        type="button"
        onClick={toggleModal}
      >
        Edit Match
      </button>

      {showModal && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-red bg-opacity-1 overflow-y-auto"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Match
                </h3>
              </div>
              <form className="p-4 md:p-5">
                <Form style={{ color: "black" }}>
                  <Form.Group className="mb-3" controlId="locationInput">
                    <Form.Group className="mb-3" controlId="locationInput">
                      <Form.Group className="mb-3" controlId="locationInput">
                        <Form.Label style={{ color: "white" }}>
                          match statu : {Matchstatus || props.matchstatus}
                        </Form.Label>
                        <br />

                        <Form.Select
                          size="sm"
                          onChange={(e) => handleMatchstatus(e)}
                        >
                          <option>select Match Status</option>
                          <option value="On HOld">On HOld</option>
                          <option value="Started">Started</option>
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
                        value={Date || props.date}
                        onChange={(e) => handleDateChange(e)}
                      />
                    </Form.Group>
                    <Form.Label style={{ color: "white" }}>
                      starting time :
                    </Form.Label>
                    <Form.Control
                      type="time"
                      placeholder="time"
                      autoFocus
                      value={Startingtime || props.startingtime}
                      onChange={(e) => handleStartingtimeChange(e)}
                    />
                    <Form.Label>Match Type:</Form.Label>
                    <Form.Control
                      as="select"
                      autoFocus
                      value={Matchtype}
                      onChange={(e) => setMatchtype(e.target.value)}
                      className={`border ${isValid ? "border-green-500" : "border-red-500"}`}
                    >
                      <option value="">Select Match Type</option>
                      <option value="Group Stage">Group Stage</option>
                      <option value="Round1">Round 1</option>
                      <option value="Round2">Round 2</option>
                      <option value="Round3">Round 3</option>
                      <option value="Round4">Round 4</option>
                      <option value="Round5">Round 5</option>
                      <option value="Semi Final">Semi Final</option>
                      <option value="Final">Final</option>
                    </Form.Control>

                    {/* <Form.Label style={{ color: "white" }}>weathercondition :</Form.Label> */}
                    {/* <br/> */}
                    {/* <Form.Select size="lg"
                onChange={(e) => handleWeatherconditionChange(e)}>
      <option> {props.weathercondition||"null"}</option>
      <option value="sunny">sunny</option>
      <option value="rainy">rainy</option>
      <option value="windy">windy</option>
      <option value="stormy">stormy</option>
      <option value="cloudy">cloudy</option>
     
    </Form.Select> */}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="locationInput">
                    <Form.Label style={{ color: "white" }}>team1 :</Form.Label>
                    <br />
                    <select onChange={(e) => handleTeam1Change(e)}>
                      <option> {T1}</option>
                      {teamsWithNames.map((teamName, index) => (
                        <option key={index} value={tournament.teams[index]}>
                          {teamName}
                        </option>
                      ))}
                    </select>
                    <br />
                    <Form.Label style={{ color: "white" }}>team2 :</Form.Label>
                    <br />
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
                    <Form.Label>Referee:</Form.Label>
                    <Form.Control
                      as="select"
                      autoFocus
                      value={Referee ? Referee.name : ""}
                      onChange={(e) => setReferee(e.target.value)}
                      className={`border ${isValid ? "border-green-500" : "border-red-500"}`}
                    >
                      <option value="">Select Referee</option>
                      {referees.map((referee) => (
                        <option key={referee._id} value={referee.name}>
                          {referee.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="locationInput">
                    <Form.Label style={{ color: "white" }}>
                      match location :
                    </Form.Label>
                    <select
                      onChange={(e) => setLocation(e.target.value)}
                      className="border text-black"
                    >
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
                <div className="flex justify-between">
                  <Button
                    variant="secondary"
                    onClick={toggleModal}
                    className="bg-red-500 text-white"
                  >
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSaveChanges}
                    className="bg-green-500 text-white"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default EditPopUpSelectedMatch;
