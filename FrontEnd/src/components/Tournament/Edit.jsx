import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { updateTournament } from '../../redux/slice/tournamentSlice';
import { useNavigate } from "react-router-dom";


const Edit = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tournamentId } = useParams();
  const [tournament, setTournament] = useState({});
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [status, setStatus] = useState('');
  const [rules, setRules] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [winner, setWinner] = useState(null); 
  const [uploadedLogo, setUploadedLogo] = useState(null);
  // Add winner state

  const [nameError, setNameError] = useState('');
  const [dateDebutError, setDateDebutError] = useState('');
  const [dateFinError, setDateFinError] = useState('');
  console.log("tournois",tournamentId);
  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/tournament/${tournamentId}`);
        const tournamentData = response.data.tournament;
        setTournament(tournamentData);
        setName(tournamentData.name);
        setLogo(tournamentData.logo);
        const currentDate = new Date();
      // Convert tournament start date to Date object
      const startDate = new Date(tournamentData.date_debut);
      // Convert tournament end date to Date object
      const endDate = new Date(tournamentData.date_fin);

      // Check if tournament has started or ended
      if (currentDate < startDate) {
        tournamentData.status = 'Coming Soon';
      } else if (currentDate > endDate) {
        tournamentData.status = 'Ended';
      } else {
        tournamentData.status = 'Started';
      }
        setStatus(tournamentData.status);
        setRules(tournamentData.rules);
        setDateDebut(tournamentData.date_debut);
        setDateFin(tournamentData.date_fin);
        setWinner(tournamentData.winner); 
        // Set winner from tournament data
      } catch (error) {
        console.error('Error fetching tournament:', error);
      }
    };
    fetchTournament();
  }, [tournamentId]);

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
    setUploadedLogo(URL.createObjectURL(e.target.files[0])); // Store the selected file
  };
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    // Validate form fields
    validateName(name);
    validateDateDebut(dateDebut);
    validateDateFin(dateFin);
  
    let newLogoPath = tournament.logo; 

    if (logo instanceof File) {

      try {
        const formData = new FormData();
        formData.append("logo", logo);
        const response = await axios.post("http://localhost:8000/tournament/upload", formData);
        newLogoPath = response.data.filePath; 
         
      } catch (error) {
        console.error("Error uploading logo:", error);
        return; // Stop further execution
      }
    }
  
    // If there are errors, prevent submission
    if (!nameError && !dateDebutError && !dateFinError) {
      try {
        const tournamentData = {
          name,
          logo: newLogoPath,
          rules,
          status,
          winner,
          date_debut: dateDebut,
          date_fin: dateFin,
        };
  
        await dispatch(updateTournament({ id: tournamentId, ...tournamentData }));
        navigate(`/manage/tournament/${tournamentId}`);

      } catch (error) {
        console.error("Error updating tournament:", error);
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

  return (
    <>
      <form
        className="shadow-2xl p-6 bg-green-50 dark:border-strokedark dark:bg-boxdark rounded-lg"
        onSubmit={handleSaveChanges}
      >
        <div className="space-y-12">
          <div className="border-b border-slate-500 dark:border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-black dark:text-white">
              Updating Tournament Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-black dark:text-white">
              Please provide the tournament new information
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-5 mt-2 flex items-center gap-x-3">
                <div className="shrink-0">
                {uploadedLogo ? (
                    <img
                      className="h-29 w-29 object-cover rounded-full"
                      src={uploadedLogo}
                      alt="Uploaded logo"
                    />
                  ) : (
                  <img
                    className="h-29 w-29 object-cover rounded-full"
                    src={`http://localhost:8000/${tournament.logo}`}
                    alt="Tournament Logo"
                  /> )}
                </div>
                <label className="block">
                  <span className="sr-only">Choose logo</span>
                  <input
                    type="file"
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                    onChange={handleLogoChange}
                  />
                </label>
              </div>

              <div className="col-span-4">
                <label
                  htmlFor="tournament-name"
                  className="block text-sm font-medium leading-6 text-black dark:text-white"
                >
                  Tournament Name
                </label>
                <div className="mt-2">
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      validateName(e.target.value);
                    }}
                    type="text"
                    name="tournament-name"
                    id="tournament-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-slate-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-50 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {nameError && (
                  <p className="text-danger text-sm">{nameError}</p>
                )}
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="datedebut"
                  className="block text-sm font-medium leading-6 text-black dark:text-white"
                >
                  Start Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="datedebut"
                    id="datedebut"
                    autoComplete="datedebut"
                    value={dateDebut}
                    onChange={(e) => {
                      setDateDebut(e.target.value);
                      validateDateDebut(e.target.value);
                    }}
                    className="block w-full rounded-md border-0 py-1.5 text-slate-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {dateDebutError && (
                    <p className="text-danger text-sm">{dateDebutError}</p>
                  )}
                </div>
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="datefin"
                  className="block text-sm font-medium leading-6 text-black dark:text-white"
                >
                  End Date
                </label>
                <div className="mt-2">
                <input
  type="date"
  name="datefin"
  id="datefin"
  autoComplete="datefin"
  value={dateFin}
  onChange={(e) => {
    setDateFin(e.target.value);
    validateDateFin(e.target.value);
  }}
  className="block w-full rounded-md border-0 py-1.5 text-slate-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
/>
                </div>
                {dateFinError && (
                  <p className="text-danger text-sm">{dateFinError}</p>
                )}
              </div>

              <div className="col-span-5">
                <label
                  htmlFor="rules"
                  className="block text-sm font-medium leading-6 text-black dark:text-white"
                >
                  Rules
                </label>
                <div className="mt-2">
                  <textarea
                    value={rules}
                    onChange={(e) => setRules(e.target.value)}
                    id="rules"
                    name="rules"
                    rows="3"
                    className="block w-full rounded-md border-0 py-1.5 text-slate-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          
          <button
            type="submit"
            className="rounded-md bg-teal-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default Edit;
