import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { useDispatch} from "react-redux";
import { updateTournament } from '../../redux/slice/tournamentSlice';
import { Link } from "react-router-dom/dist/umd/react-router-dom.development";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button as MuiButton} from "@mui/material";

const EditTournament = () => {
  const navigate = useNavigate();
  const { tournamentId } = useParams();
  const [tournament, setTournament] = useState({});
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [status, setStatus] = useState('');
  const [rules, setRules] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [winner, setWinner] = useState(null); // Add winner state
  const [teams, setTeams] = useState([]);
 
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [nameError, setNameError] = useState('');
  const [dateDebutError, setDateDebutError] = useState('');
  const [dateFinError, setDateFinError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/tournament/${tournamentId}`);
        const tournamentData = response.data.tournament;
        setTournament(tournamentData);
        setName(tournamentData.name);
        setLogo(tournamentData.logo);
        setStatus(tournamentData.status);
        setRules(tournamentData.rules);
        setDateDebut(tournamentData.dateDebut);
        setDateFin(tournamentData.dateFin);
        setTeams(tournamentData.teams);
        setWinner(tournamentData.winner); // Set winner from tournament data
      } catch (error) {
        console.error('Error fetching tournament:', error);
      }
    };
    fetchTournament();
  }, [tournamentId]);

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]); // Store the selected file
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    // Validate form fields
    validateName(name);
    validateDateDebut(dateDebut);
    validateDateFin(dateFin);

    // If there are errors, prevent submission
    if (!nameError && !dateDebutError && !dateFinError) {
      try {
        const formData = new FormData();
        formData.append("logo", logo);

        const response = await axios.post("http://localhost:8000/tournament/upload", formData);

        const tournamentData = {
          name,
          logo: response.data.filePath,
          rules,
          status,
          winner,
          date_debut: dateDebut,
          date_fin: dateFin,
          teams: tournament.teams,
        };

        await dispatch(updateTournament({ id: tournamentId, ...tournamentData }));
        navigate(`/manage`);
      } catch (error) {
        console.error("Error updating tournament:", error);
      }
    }
  };

  // Form validation functions
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

  return (
    <>
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
          InputLabelProps={{ style: { color: "white" } }}
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
          InputLabelProps={{ style: { color: "white" } }}
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
            <option value="comming soon">Coming Soon</option>
            <option value="ended">Ended</option>
            <option value="started">Started</option>
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
          InputLabelProps={{ style: { color: "white" } }}
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
          InputLabelProps={{ style: { color: "white" } }}
        />
        {dateFinError && <p className="text-danger">{dateFinError}</p>}

        {/* Winner Select Box */}
        <div className="col-md-12 form-group pb-2">
          <select
            style={{ height: "60px" }}
            className="form-control custom-placeholder"
            id="tournamentWinner"
            value={winner}
            onChange={(e) => setWinner(e.target.value)}
          >
            <option value="">Select Winner</option>
            {teams.map((team, index) => (
              <option key={index} value={team}>{team}</option>
            ))}
          </select>
        </div>

        <div>
          <MuiButton class="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90" type="submit" >Create</MuiButton>
        </div>
      </form>
    </>
  );
};

export default EditTournament;
