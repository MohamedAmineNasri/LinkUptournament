// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import { addnewMatch, fetchAllTour } from "../../redux/slice/matchSlice";
import { useDispatch } from "react-redux";
import MatchByID from "./getAllGroup";
import { useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
  Input,
} from "@material-tailwind/react";
import { convertToBase64 } from "../../utilities/convertFileBase64";
import { number } from "prop-types";

export const AddMatchPopUpWindow = ({ tournamentId }) => {
  // console.log("Matchpopup ",tournamentId)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //add logic

  const [Matchtype, setMatchtype] = useState(null);
  const [Location, setLocation] = useState(null);
  const [Referee, setReferee] = useState(null);
  const [Datee, setDate] = useState(null);
  const [Startingtime, setStartingtime] = useState(null);
  const [Logo, setLogo] = useState({ myLogo: "" });
  const [Matchstatus, setMatchstatus] = useState(null);
  const [tournament, settournament] = useState(null);
  const [Team1, setTeam1] = useState(null);
  const [Team2, setTeam2] = useState(null);
  const [TournementId, setTournementId] = useState([]);
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
  const [isValidticketnumber, setIsValidticketnumber] = useState(true);
  const [isValidticketprice, setIsValidticketprice] = useState(true);
  const [matchgroupe, setgroup] = useState();
  const [matchgroupe1, setgroup1] = useState();
  const [teambygroup, setteambygroup] = useState([]);
  const [price, setprice] = useState();
  const [ticketNumber, setticketNumber] = useState();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const dispatch = useDispatch();
  const handleSaveChanges = (e) => {
    e.preventDefault();
    dispatch(
      addnewMatch({
        matchTime: 0,
        referee: Referee,
        date: Datee,
        logo: Logo.myLogo,
        matchstatus: Matchstatus,
        team1: Team1,
        team2: Team2,
        weathercondition: Weathercondition,
        startingtime: Startingtime,
        matchtype: Matchtype,
        location: Location,
        tournementId: TournementId,
        team1Gols: Team1Gols,
        team2Gols: Team2Gols,
        ticketNumber: ticketNumber,
        price: price,
        group: matchgroupe1,
      }),
      fetchAllTour()
    );
    handleClose();
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setMatchtype(newName);
    // Validate name (only letters)
    setIsValid(/^[a-zA-Z]+$/.test(newName));
  };
  const handeleTicketnumber = (e) => {
    const newNamee = e.target.value;
    setticketNumber(newNamee);
    setIsValidticketnumber(newNamee > 1);
  };
  const handeleTicketprice = (e) => {
    const newNamee = e.target.value;
    setprice(newNamee);
    setIsValidticketprice(newNamee > 1);
  };
  const handleteam2 = (e) => {
    const newName = e.target.value;
    setTeam2(newName);
    // Validate name (only letters)
    setIsValidteam2(newName != Team1 && newName != "null");
  };
  const handleteam1 = (e) => {
    const newName = e.target.value;
    setTeam1(newName);
    // Validate name (only letters)
    setIsValidteam1(newName != Team2 && newName != "null");
  };

  const handlerefChange = (e) => {
    const newName = e.target.value;
    setReferee(newName);
    // Validate name (only letters)
    setIsValid2(/^[a-zA-Z]+$/.test(newName));
  };
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(e.target.value);
    const dd = tournament.date_debut;
    const df = tournament.date_fin;
    // console.log(dd,df,)
    // console.log(currentDate.getDay > today.getDay)
    setIsValid3(newDate > dd && newDate < df);
    // console.log( setIsValid3(currentDate > today))

    // setIsValid3(false);
    // const newDate = e.target.value;
    // const currentDate = new Date(); // Get the current date

    // console.log("tse", newDate, currentDate);

    // setDate("2024-06-06"); // Update the state with the new date

    // setIsValid3(currentDate > new Date(newDate));
    // Get today's date as a string in YYYY-MM-DD format
    // const d = new Date(newDate).getDate()
    //   const m = new Date().getMonth();
    //   const d = new Date().getDate();
    //   const y =new Date().getFullYear();
    //  const day = m+"-"+d+"-"+y
    // Check if the entered date is valid (greater than today's date)

    // Update the state with the validation result
  };
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const base64 = await convertToBase64(file);
    // console.log(base64);
    setLogo({ ...Logo, myLogo: base64 });
  };

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setTeam1Gols(0);
        setTeam2Gols(0);
        setTournementId(tournamentId);
        setMatchstatus("Starting Soon");
        const response = await axios.get(
          "http://localhost:8000/tournament/" + tournamentId
        );
        if (response.data.tournament.type == "Group Stage") {
          //   groupresponse =await axios.get("http://localhost:8000/group/tournament"+tournamentId)
          //   console.log("test",groupresponse.data.map(a=>a.name))
          // setteambygroup(groupresponse.data.map(a=>a.name))
        }
        const tournament = response.data.tournament;
        // console.log("Successfully retrieved the tournament:", response.data.tournament.type);
        settournament(tournament);
        // Fetch team names for each team ID
        const teamsWithNames = await Promise.all(
          tournament.teams.map(async (teamId) => {
            const teamResponse = await axios.get(
              `http://localhost:8000/team/getTeam/${teamId}`
            );
            return teamResponse.data.TeamName;
          })
        );
        const responseforgroup = await axios.get(
          "http://localhost:8000/group/tournament/" + tournamentId
        );
        const groupData = response.data;
        setgroup(responseforgroup.data);
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
        data-modal-target="crud-modal"
        data-modal-toggle="crud-modal"
        className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
        type="button"
        onClick={toggleModal}
      >
        Add match
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
                <Form>
                  <Form.Group className="mb-3" controlId="locationInput">
                    <Form.Label>Match Status: {Matchstatus}</Form.Label>
                    <br />
                    <Form.Label>Date:</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="date"
                      autoFocus
                      value={Datee}
                      onChange={handleDateChange}
                      className={`border ${isValid3 ? "border-green-500" : "border-red-500"}`}
                    />
                    {!isValid3 && (
                      <p className="text-red-500">
                        Date must be greater than today.
                      </p>
                    )}
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
                    {Matchtype === "Group Stage" && (
                      <>
                        <Form.Label>Group 1:</Form.Label>
                        <br />
                        <select
                          onChange={(e) => setgroup1(e.target.value)}
                          className="border text-black"
                        >
                          <option value="null">Select group 1</option>
                          {matchgroupe.map((teamName, index) => (
                            <option key={index} value={teamName._id}>
                              {teamName.name}
                            </option>
                          ))}
                        </select>
                        <Form.Label>Team 1:</Form.Label>
                        <br />

                        <select
                          onChange={handleteam1}
                          className="border text-black"
                        >
                          <option value="null">Select Team 1</option>
                          {matchgroupe
                            .filter((team) => team._id == matchgroupe1)
                            .map((teamName, index) =>
                              teamName.teams.map((e) => (
                                <option value={e.team}>{e.TeamName}</option>
                              ))
                            )}
                        </select>

                        {!isValidteam1 && (
                          <p className="text-red-500">
                            Please select a different Team 1.
                          </p>
                        )}
                        <br />
                        <Form.Label>Team 2:</Form.Label>
                        <br />

                        <select
                          onChange={handleteam2}
                          className="border text-black"
                        >
                          <option value="null">Select Team 2</option>
                          {matchgroupe
                            .filter((team) => team._id == matchgroupe1)
                            .map((teamName, index) =>
                              teamName.teams.map((e) => (
                                <option value={e.team}>{e.TeamName}</option>
                              ))
                            )}
                        </select>

                        {!isValidteam2 && (
                          <p className="text-red-500">
                            Please select a different Team 2.
                          </p>
                        )}
                      </>
                    )}
                    {!isValid && (
                      <p className="text-red-500">
                        Please select a valid Match Type.
                      </p>
                    )}

                    {Matchtype !== "Group Stage" && (
                      <>
                        <Form.Label>Team 1:</Form.Label>
                        <br />

                        <select
                          onChange={handleteam1}
                          className="border text-black"
                        >
                          <option value="null">Select Team 1</option>
                          {teamsWithNames.map((teamName, index) => (
                            <option key={index} value={tournament.teams[index]}>
                              {teamName}
                            </option>
                          ))}
                        </select>

                        {!isValidteam1 && (
                          <p className="text-red-500">
                            Please select a different Team 1.
                          </p>
                        )}
                        <br />
                        <Form.Label>Team 2:</Form.Label>
                        <br />
                        <select
                          onChange={handleteam2}
                          className="border text-black"
                        >
                          <option value="null">Select Team 2</option>
                          {teamsWithNames.map((teamName, index) => (
                            <option key={index} value={tournament.teams[index]}>
                              {teamName}
                            </option>
                          ))}
                        </select>
                        {!isValidteam2 && (
                          <p className="text-red-500">
                            Please select a different Team 2.
                          </p>
                        )}
                      </>
                    )}

                    <Form.Label>Referee:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Referee"
                      autoFocus
                      value={Referee}
                      onChange={handlerefChange}
                      className={`border ${isValid1 ? "border-green-500" : "border-red-500"}`}
                    />
                    {!isValid2 && (
                      <p className="text-red-500">
                        Referee must contain only letters.
                      </p>
                    )}
                    <Form.Label>Match Location:</Form.Label>
                    <br />
                    <select
                      onChange={(e) => setLocation(e.target.value)}
                      className="border text-black"
                    >
                      <option>Select City</option>
                      <option value="2464470">Tunis</option>
                      <option value="2467454">Sfax</option>
                      <option value="2464915">Sousse</option>
                      <option value="2468369">Gabès</option>
                      <option value="2473449">Kairouan</option>
                      <option value="2472706">Bizerte</option>
                      <option value="2468353">Gafsa</option>
                      <option value="2473245">Ariana</option>
                      <option value="2473457">Kasserine</option>
                      <option value="2473493">Monastir</option>
                      <option value="2472479">Ben Arous</option>
                      <option value="2464698">Tataouine</option>
                      <option value="2468576">Nabeul</option>
                      <option value="2473744">Hammamet</option>
                      <option value="2473572">Mahdia</option>
                      <option value="2470085">Jendouba</option>
                      <option value="2465840">Sidi Bouzid</option>
                      <option value="2469473">Medenine</option>
                      <option value="2473634">El Kef</option>
                      <option value="2464041">Zaghouan</option>
                      <option value="2465030">Siliana</option>
                      <option value="2464648">Tozeur</option>
                    </select>
                  </Form.Group>
                  <Form.Label>Ticket number:</Form.Label>
                  <Form.Control
                    type="number"
                    autoFocus
                    value={ticketNumber}
                    onChange={handeleTicketnumber}
                    className={`border ${isValidticketnumber ? "border-green-500" : "border-red-500"}`}
                  />
                  {!isValidticketnumber && (
                    <p className="text-red-500">
                      Ticket number must be positive.
                    </p>
                  )}
                  <Form.Label>Ticket price:</Form.Label>
                  <Form.Control
                    type="number"
                    autoFocus
                    onChange={handeleTicketprice}
                    value={price}
                    className={`border ${isValidticketprice ? "border-green-500" : "border-red-500"}`}
                  />
                  {!isValidticketprice && (
                    <p className="text-red-500">
                      Ticket price must be positive.
                    </p>
                  )}
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

export default AddMatchPopUpWindow;
