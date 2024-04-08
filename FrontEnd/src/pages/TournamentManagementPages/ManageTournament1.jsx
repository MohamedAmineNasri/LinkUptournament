import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";


import { Button as MuiButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { addTournament } from "../../redux/slice/tournamentSlice";
import { fetchteams } from "../../redux/slice/teamSlice";
import { createGroupsThunk } from "../../redux/slice/groupSlice" ; 
import axios from "axios";

const AddTournament = () => {

 
  const [type, setType] = useState("default_type");
  const [nbG, setNbG] = useState("default_type");
  const [nbT, setNbT] = useState("default_type");
  const [nbP, setNbP] = useState("default_type");
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);


  const [rules, setRules] = useState("");
  const [status, setStatus] = useState("");
   const [winner] = useState(null);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  
//   const [submitSuccess, setSubmitSuccess] = useState(false);
  const [nameError, setNameError] = useState("Tournament Name is required");
  const [dateDebutError, setDateDebutError] = useState("Start Date is required");
  const [dateFinError, setDateFinError] = useState("End Date is required");
  const [selectedTeams, setSelectedTeams] = useState([]);

//   const [division, setDivision] = useState("");
//   const [divisionError, setDivisionError] = useState("");
  const teams = useSelector((state) => state.root.team.teams );
  console.log("im here");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  
 
  useEffect(() => {
    if (location.state ) {
      setType(location.state.type);
      setNbG(location.state.nbG) ;
      setNbT(location.state.nbT);
      setNbP(location.state.nbP);
    }
  }, [location.state]);
  console.log("Updated type:", type);
  console.log("nb groupe:", nbG);
  console.log("nb teams:", nbT);
  console.log("nbPhase:", nbP);

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
    // validateType(type);
    validateDateDebut(dateDebut);
    validateDateFin(dateFin);
  
    if (!nameError && !dateDebutError && !dateFinError) {
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
          // setSubmitSuccess(true);
          // setName("");
          // setLogo(null);
          // setType("");
          // setRules("");
           setStatus("");
          // setWinner(null);
          // setDateDebut("");
          // setDateFin("");
          // setSelectedTeams([]);
          
          console.log("im here just before create groups" ,addTournamentResponse.payload._id, nbG , nbT )  ;

          await dispatch(createGroupsThunk({ id: addTournamentResponse.payload._id, nbG, nbT }));
          navigate(`/manage`);
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

//   const validateDivision = (value) => {
//     if (!value.trim()) {
//       setDivisionError("Division is required");
//     } else {
//       setDivisionError("");
//     }
//   };

  return (
    <>
    {location.pathname == "/manage/addtournament" ? (
        <div>
   <form onSubmit={handleSaveChanges}>
  <TextField
    autoFocus
    margin="dense"
    id="tournamentName"
    label="Tournament Name"
    type="text"
    fullWidth
    variant="standard"
    value={name}
    onChange={(e) => {
      setName(e.target.value);
      validateName(e.target.value);
    }}
    InputLabelProps={{ style: { color: "white" }, }}
  />
  {nameError && <p className="text-danger">{nameError}</p>}

  <TextField
    autoFocus
    margin="dense"
    id="tournamentName"
    label="Rules"
    type="text"
    fullWidth
    variant="standard"
    value={rules}
    onChange={(e) => setRules(e.target.value)}
    InputLabelProps={{ style: { color: "white" }, }}
  />
  {/* File Upload */}
  <div className="col-span-2">
    <label htmlFor="tournamentLogo" className="block text-white">Tournament Logo</label>
    <input
      type="file"
      className="form-control-file"
      id="tournamentLogo"
      onChange={handleLogoChange}
    />
  </div>

  <div className="col-md-12 form-group pb-2">
    <select
      style={{ height: "60px" }}
      className="form-control custom-placeholder"
      id="tournamentStatus"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="">Select Tournament status</option>
      <option value="comming soon">comming soon</option>
      <option value="ended">ended</option>
      <option value="started">started</option>
    </select>
  </div>

  <TextField
    autoFocus
    margin="dense"
    id="tournamentDate"
    label=""
    type="date"
    fullWidth
    variant="standard"
    value={dateDebut}
    onChange={(e) => {
      setDateDebut(e.target.value);
      validateDateDebut(e.target.value);
    }}
    style={{ marginTop: "1rem" }}
    InputLabelProps={{ style: { color: "white" }, }}
  />
  {dateDebutError && <p className="text-danger">{dateDebutError}</p>}
  
  <TextField
    autoFocus
    margin="dense"
    id="tournamentDatef"
    label=""
    type="date"
    fullWidth
    variant="standard"
    value={dateFin}
    onChange={(e) => {
      setDateFin(e.target.value);
      validateDateFin(e.target.value);
    }}
    style={{ marginTop: "1rem" }}
    InputLabelProps={{ style: { color: "white" }, }}
  />
  {dateFinError && <p className="text-danger">{dateFinError}</p>}
  
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

  <div>
    <MuiButton class="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90" type="submit" >Create</MuiButton>
  </div>
</form>

    </div>) : (
        <Outlet />
      )}
    </>
  );
};

export default AddTournament;
