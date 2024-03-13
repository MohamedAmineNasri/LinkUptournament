import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTournament } from "../redux/slice/tournamentSlice";
import Alert from "react-bootstrap/Alert";
import { fetchteams } from "../redux/slice/teamSlice"; import { createGroupsThunk } from "../redux/slice/groupSlice" ; 
import axios from "axios";
// import Group from "./Group";

export const AddTournament = () => {
  
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [type, setType] = useState("");
  const [rules, setRules] = useState("");
  const [status, setStatus] = useState("");
  const [winner, setWinner] = useState(null);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [nameError, setNameError] = useState("Tournament Name is required");
  const [typeError, setTypeError] = useState("Type is required");
  const [dateDebutError, setDateDebutError] = useState("Start Date is required");
  const [dateFinError, setDateFinError] = useState("End Date is required");
  const [selectedTeams, setSelectedTeams] = useState([]);

  const dispatch = useDispatch();
  const teams = useSelector((state) => state.team.teams); // Adjusted selector

  useEffect(() => {
    async function fetchTeams() {
      try {
        await dispatch(fetchteams());
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }
    fetchTeams();
  }, [dispatch]) ;
  

  const handleTeamSelection = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedTeams(selectedOptions);
  };
  
  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]); // Store the selected file
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
  
    validateName(name);
    validateType(type);
    validateDateDebut(dateDebut);
    validateDateFin(dateFin);
  
    if (!nameError && !typeError && !dateDebutError && !dateFinError) {
      try {
        const formData = new FormData();
        formData.append("logo", logo);
  
        const response = await axios.post("http://localhost:8000/tournament/upload", formData);
  
        const selectedTeamIds = selectedTeams.map((teamName) => {
          const selectedTeam = teams.find((team) => team.TeamName === teamName);
          return selectedTeam._id;
        });
  
        const tournamentData = {
          name,
          logo: response.data.filePath,
          type,
          rules,
          status,
          winner,
          date_debut: dateDebut,
          date_fin: dateFin,
          teams: selectedTeamIds,
        };
  
        const addTournamentResponse = await dispatch(addTournament(tournamentData));
  
        if (addTournamentResponse.payload) {
          setSubmitSuccess(true);
          setName("");
          setLogo(null);
          setType("");
          setRules("");
          setStatus("");
          setWinner("");
          setDateDebut("");
          setDateFin("");
          setSelectedTeams([]);
  
          await dispatch(createGroupsThunk(addTournamentResponse.payload._id)); // Pass the tournament ID here
        }
      } catch (error) {
        console.error("Error adding tournament:", error);
      }
      
    }
  };
  
  
  

  const validateName = (value) => {
    if (!value.trim()) {
      setNameError("Tournament Name is required");
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
      setNameError("Tournament Name should contain only alphabetic characters");
    } else if (value.trim().length <= 8) {
      setNameError("Tournament Name should be at least 8 characters long");
    } else {
      setNameError(null);
    }
  };

  const validateType = (value) => {
    if (!value.trim()) {
      setTypeError("Type is required");
    } else {
      setTypeError(null);
    }
  };

  const validateDateDebut = (value) => {
    if (!value) {
      setDateDebutError("Start Date is required");
    } else if (new Date(value) < new Date()) {
      setDateDebutError("Start Date must be today's date or later");
    } else {
      setDateDebutError(null);
    }
  };

  const validateDateFin = (value) => {
    if (!value) {
      setDateFinError("End Date is required");
    } else if (new Date(value) <= new Date(dateDebut)) {
      setDateFinError("End Date should be after the Start Date");
    } else {
      setDateFinError(null);
    }
  };

  return (
    <div>
      <div className="hero overlay2" style={{backgroundImage: "url('/assets/images/2.jpg')", paddingTop: "100px", height: "1300px"}}>
        <div>
          {submitSuccess && (
            <Alert variant="success">Tournament added successfully!</Alert>
          )}
        </div>

        <div className="col-lg-12">
          <h1 className="col-md-12 pb-5 pt-5" style={{textShadow: "5px 2px 0px #1db428e6", textAlign: "-webkit-center", fontSize: "5rem"}}>
            Add Your Tournament
          </h1>
        </div>

        <div className="container col-lg-8 pt-5">
          <div style={{borderRadius: "40px"}}>
            <div style={{boxShadow: "1px 1px 30px 10px rgba(1, 0, 0, 0.5)", backgroundColor: "#2f4f4f6b", paddingLeft: "10px", paddingRight: "10px", paddingTop: "20px", paddingBottom: "20px", borderRadius: "40px"}}>
              <div className="col-lg-12">
                <form onSubmit={handleSaveChanges}>
                  <div className="">
                    <div className="col-md-12 form-group pb-2 pt-3">
                      <label htmlFor="tournamentName">Tournament Name</label>
                      <input
                        style={{height: "60px"}}
                        type="text"
                        className="form-control custom-placeholder"
                        id="tournamentName"
                        placeholder="Enter the name of the tournament"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          validateName(e.target.value);
                        }}
                      />
                      {nameError && <p className="text-danger">{nameError}</p>}
                    </div>
                     
                    {/* File Upload */}
                    <div className="col-md-12 form-group pb-2">
                      <label htmlFor="tournamentLogo">Tournament Logo</label>
                      <input
                        type="file"
                        className="form-control-file"
                        id="tournamentLogo"
                        onChange={handleLogoChange}
                      />
                    </div>

                    <div className="col-md-12 form-group pb-2">
                      <label htmlFor="tournamentType">Tournament Type</label>
                      <select
                        style={{height: "60px"}}
                        className="form-control custom-placeholder"
                        id="tournamentType"
                        value={type}
                        onChange={(e) => {
                          setType(e.target.value);
                          validateType(e.target.value);
                        }}
                      >
                        <option value="">Select Tournament Type</option>
                        <option value="Group Stage Tournament">Group Stage Tournament</option>
                        <option value="Knockout Tournament">Knockout Tournament</option>
                        <option value="Round Robin Tournament">Round Robin Tournament</option>
                      </select>
                      {typeError && <p className="text-danger">{typeError}</p>}
                    </div>

                    {/* Add other fields with validation errors rendering */}
                    {/* Règles du tournoi */}
                    <div className="col-md-12 form-group pb-2">
                      <label htmlFor="tournamentRules">Tournament Rules</label>
                      <input
                        style={{height: "60px"}}
                        type="text"
                        className="form-control custom-placeholder"
                        id="tournamentRules"
                        placeholder="Enter the rules of the tournament"
                        value={rules}
                        onChange={(e) => setRules(e.target.value)}
                      />
                    </div>

                    {/* Statut du tournoi */}
                    <div className="col-md-12 form-group pb-2">
                      <label htmlFor="tournamentStatus">Tournament Status</label>
                      <input
                        style={{height: "60px"}}
                        type="text"
                        className="form-control custom-placeholder"
                        id="tournamentStatus"
                        placeholder="Enter the status of the tournament"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      />
                    </div>

                    {/* Start Date */}
                    <div className="col-md-12 form-group pb-2">
                      <label htmlFor="startDate">Start Date</label>
                      <input
                        style={{height: "60px"}}
                        type="date"
                        className="form-control custom-placeholder"
                        id="startDate"
                        value={dateDebut}
                        onChange={(e) => {
                          setDateDebut(e.target.value);
                          validateDateDebut(e.target.value);
                        }}
                      />
                      {dateDebutError && <p className="text-danger">{dateDebutError}</p>}
                    </div>

                    {/* End Date */}
                    <div className="col-md-12 form-group pb-2">
                      <label htmlFor="endDate">End Date</label>
                      <input
                        style={{height: "60px"}}
                        type="date"
                        className="form-control custom-placeholder"
                        id="endDate"
                        value={dateFin}
                        onChange={(e) => {
                          setDateFin(e.target.value);
                          validateDateFin(e.target.value);
                        }}
                      />
                      {dateFinError && <p className="text-danger">{dateFinError}</p>}
                    </div>
                    <div className="col-md-12 form-group pb-2">
                      <label htmlFor="tournamentTeams">Select Teams</label>
                      <select
                        style={{ height: "120px" }}
                        multiple={true} // or simply multiple
                        className="form-control custom-placeholder"
                        id="tournamentTeams"
                        value={selectedTeams}
                        onChange={handleTeamSelection}
                      >
                        {teams &&
                          teams.map((team) => (
                            <option key={team.id} value={team.id}>
                              {team.TeamName}
                            </option>
                          ))}
                      </select>
                    </div>

      {/* Bouton de soumission */}
      <div className="col-md-12 form-group ">
                      <input
                        type="submit"
                        className="btn btn-success py-3 px-5 btn-block"
                        value="Add Tournament"
                        onClick={handleSaveChanges}
                      />
                    </div>
                  </div>
                </form>
                {/* <Group groupId="665f1a76800f7ca93c7e7b514" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTournament;
