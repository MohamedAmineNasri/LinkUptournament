import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { useDispatch} from "react-redux";
import { updateTournament } from '../../redux/slice/tournamentSlice';
import addformstadiumImage from "../../assets/Mi-imgs/2.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom/dist/umd/react-router-dom.development";
import { useNavigate } from 'react-router-dom';

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
  const [winner, setWinner] = useState(null);
  const [teams , setTeams] = useState([]) ;
 

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
          

          navigate(`/tournament/${tournamentId}`);
          
    
         
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
    <div>
    <div>
      <header className="site-navbar py-4" role="banner">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <div className="site-logo">
              <a href="index.html">
                <img src="/public/assets/images/logo.png" alt="Logo" />
              </a>
            </div>
            <div className="ml-auto">
                <nav
                  className="site-navigation position-relative text-right"
                  role="navigation"
                >
                  <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                    <li>
                      <Link to="/" className="nav-link">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/tests" className="nav-link">
                        Match Cards
                      </Link>
                    </li>
                    <li>
                      <Link to="/a" className="nav-link">
                        Match Time
                      </Link>
                    </li>
                    <li>
                      <Link to="/addAcademy" className="nav-link">
                        Academy Creation 
                      </Link>
                    </li>
                    <li>
                      <Link to="/Academy" className="nav-link">
                        Academies
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/signin" className="nav-link">
                        Signup
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile" className="nav-link">
                        Profile
                      </Link>
                    </li>
                  </ul>
                </nav>

                <a
                  href="#"
                  className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right text-white"
                >
                  <span className="icon-menu h3 text-white"></span>
                </a>
              </div>
          </div>
        </div>
      </header>
    </div>

    {/* Hero image ------------------------- */}
    <div
      className="hero overlay2 HeroImageAddAcademy"
     
    >
      {/* sucess msg when academy created "condional or Failure in iput" */}
      <div>
        {(submitSuccess && (
          <Alert className="alertModified" variant="success">
           tournament edited successfully!
          </Alert>
        )) }
      </div>

      <div className="col-lg-12">
        <h1 className="col-md-12 pb-5 pt-5 TitleAddAcademy">
          Edit your Tournament
        </h1>
      </div>
      {/* form inside the hero image ------------------------  */}
         {/* container --------> container-fluid  */}
         <div className=" container-fluid col-lg-9 pt-5">
          <div className="addAcademyFormBorder">
            <div className="col-lg-12">
                <form onSubmit={handleSaveChanges}>
                  <div>
                    {/* Tournament Name */}
                    <div className="col-md-12 form-group pb-2 pt-3">
                      <label >Tournament Name</label>
                      <input
                        style={{ height: "60px" }}
                        type="text"
                        className="form-control"
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
                    {/* Tournament winner */}
                    <div className="col-md-12 form-group pb-2 pt-3">
                  <label htmlFor="tournamentWinner">Winner</label>
                  <select
                    style={{ height: "60px" }}
                    className="form-control custom-placeholder"
                    id="tournamentWinner"
                    value={winner}
                    onChange={(e) => setWinner(e.target.value)}
                  >
                    <option value="">Select Winner</option>
                    {teams.map((team) => (
                      <option key={team.id} value={team}>
                        {team}
                      </option>
                    ))}
                  </select>
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
                    
                    {/* Tournament Status */}
                    <div className="col-md-12 form-group pb-2">
                      <label htmlFor="tournamentStatus">Tournament Status</label>
                      <select
                        style={{ height: "60px" }}
                        className="form-control custom-placeholder"
                        id="tournamentStatus"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="">Select Tournament status</option>
                        <option value="coming soon">coming soon</option>
                        <option value="ended">ended</option>
                        <option value="started">started</option>
                      </select>
                    </div>
                    {/* Tournament Rules */}
                    <div className="col-md-12 form-group pb-2">
                      <label htmlFor="tournamentRules">Tournament Rules</label>
                      <input
                        style={{ height: "60px" }}
                        type="text"
                        className="form-control "
                        id="tournamentRules"
                        placeholder="Enter the rules of the tournament"
                        value={rules}
                        onChange={(e) => setRules(e.target.value)}
                      />
                    </div>
                    {/* Start Date */}
                    <div className="col-md-12 form-group pb-2">
                      <label htmlFor="startDate">Start Date</label>
                      <input
                        style={{ height: "60px" }}
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
                        style={{ height: "60px" }}
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
                    
                    {/* Submit Button */}
                    <div className="col-md-12 form-group ">
                      <input
                        type="submit"
                        className="btn btn-success py-3 px-5 btn-block"
                        value="update"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default EditTournament;
