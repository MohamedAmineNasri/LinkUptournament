import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useLocation, useNavigate } from "react-router-dom";
import { addTournament } from "../../redux/slice/tournamentSlice";
import {  fetchTeamsByName } from "../../redux/slice/teamSlice";
import { createGroupsThunk } from "../../redux/slice/groupSlice";
import axios from "axios";

const AddTour = () => {
  const [type, setType] = useState("default_type");
  const [nbG, setNbG] = useState("default_type");
  const [nbT, setNbT] = useState("default_type");
  const [nbP, setNbP] = useState("default_type");
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [rules, setRules] = useState("");
  const [status, setStatus] = useState("Coming Soon");
  const [winner] = useState(null);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [nameError, setNameError] = useState(null);
  const [logoError, setlogoError] = useState(null);
  const [dateDebutError, setDateDebutError] = useState(null);
  const [dateFinError, setDateFinError] = useState(null);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [teamSelectionError, setTeamSelectionError] = useState("");
  const [searchInput, setSearchInput] = useState(""); 
  // State to store search input
  const teams = useSelector((state) => state.root.team.teamData);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTeams() {
      try {
        await dispatch(fetchTeamsByName(searchInput)); // Fetch teams based on search input
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }
    fetchTeams();
  }, [dispatch, searchInput]);
  

  useEffect(() => {
    if (location.state) {
      setType(location.state.type);
      setNbG(location.state.nbG);
      setNbT(location.state.nbT);
      setNbP(location.state.nbP);
    }
  }, [location.state]);
 
  const handleTeamSelection = (e, teamid) => {
     
    if (e.target.checked) {
      setSelectedTeams((prevSelectedTeams) => [...prevSelectedTeams, teamid]);
    } else {
      setSelectedTeams((prevSelectedTeams) =>
        prevSelectedTeams.filter((id) => id !== teamid)
      );
    }
    console.log(selectedTeams.length)
    setTeamSelectionError(`You have selected only ${selectedTeams.length+1} teams.`);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    setUploadedLogo(URL.createObjectURL(file));
    
    
  };
  const teamCount = (nbG !== undefined) ? parseInt(nbT * nbG) : nbT;

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    validateName(name);
    validateDateDebut(dateDebut);
    validateDateFin(dateFin);
    validateLogo(logo);

    if (!nameError && !dateDebutError && !dateFinError) {
      try {
        
        if (selectedTeams.length !== Number(teamCount)) {
          console.log(selectedTeams.length)
          console.log(teamCount)
          setTeamSelectionError(`You must select exactly ${teamCount} teams.`);
          return;
        } else {
          setTeamSelectionError("");
        }
        
        const formData = new FormData();
        formData.append("logo", logo);

        const response = await axios.post(
          "http://localhost:8000/tournament/upload",
          formData
        );

        const tournamentData = {
          name,
          logo: response.data.filePath,
          type,
          rules,
          status,
          winner,
          date_debut: dateDebut,
          date_fin: dateFin,
          teams: selectedTeams,
          nbphase:  nbP , 
        };
        console.log("here")
        const addTournamentResponse = await dispatch(
          addTournament(tournamentData)
        );
          
        if (addTournamentResponse.payload) {
          setStatus("");
          // Only create groups if the tournament type is not 'knockout'
          if (addTournamentResponse.payload.type !== 'knockout') {
            await dispatch(
              createGroupsThunk({ id: addTournamentResponse.payload._id, nbG, nbT })
            );
          }
          navigate(`/manage/tournament/${addTournamentResponse.payload._id}`);
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
  const validateLogo = (value) => {
    if (!value) {
      setlogoError("Logo is required");
    }else{
      setlogoError(null);
    }
  };
  

  return (
    <>
      <form
        className="shadow-2xl p-6 bg-green-50 dark:border-strokedark dark:bg-boxdark rounded-lg"
        onSubmit={handleSaveChanges}
      >
        <div className="space-y-12 ">
          <div className="border-b border-slate-500 dark:border-gray-900/10 pb-12 ">
            <h2 className="text-base font-semibold leading-7 text-black dark:text-white">
              Tournament Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-black dark:text-white ">
              Please provide the tournament information here and affect teams
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-5 mt-2 flex items-center gap-x-3 ">
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
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                      alt="Current profile photo"
                    />
                  )}
                </div>
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                    onChange={handleLogoChange}
                  />
                </label>
                {logoError && (
                  <p className="text-danger text-sm">{logoError}</p>
                )}
              </div>

              <div className="col-span-4 ">
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

        <div className="border-b border-slate-500 dark:border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-black dark:text-white pt-6">
            Teams
          </h2>
          <p className="mt-1 text-sm leading-6 text-black dark:text-white">
  Please Affect{" "}
  <span style={{ fontWeight: "bold", color: "#FF5733" }}>{teamCount}</span> teams to your tournament
</p>

          {teamSelectionError && (
            <p className="text-danger text-sm">{teamSelectionError}</p>
          )}

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-teal-800">
                <div className="p-4 ">
                  <div className="relative mt-1 ">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="bg-teal-800"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
  type="text"
  id="table-search"
  className="bg-gray-50 border border-gray-300 text-slate-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-90 pl-10 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
  placeholder="Search for teams"
  value={searchInput}
  onChange={(e) => setSearchInput(e.target.value)} // Update search input value
/>

                  </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
                    <tr>
                      <th scope="col" className="p-4"></th>
                      <th scope="col" className="px-6 py-3 text-white dark:text-slate-50">
                        Logo
                      </th>
                      <th scope="col" className="px-6 py-3  text-white dark:text-slate-50">
                        Team Name
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
  {searchInput === '' 
    ? selectedTeams.map(teamId => {
        const team = teams.find(t => t._id === teamId);
        if (team) {
          return (
            <tr
              key={team.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`checkbox-table-${team._id}`}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) =>
                      handleTeamSelection(e, team._id)
                    }
                    checked={selectedTeams.includes(team._id)} // Preserve selected teams
                  />
                  <label
                    htmlFor={`checkbox-table-${team.id}`}
                    className="sr-only"
                  >
                    checkbox
                  </label>
                </div>
              </td>
              <td className="px-6 py-4 text-slate-900 ">
                <img
                  src={`http://localhost:8000/${team.TeamLogo}`}
                  alt={team.TeamName}
                  className="h-15 w-auto"
                />
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-bold text-slate-500 whitespace-nowrap"
              >
                {team.TeamName}
              </th>
              
            </tr>
          );
        } else {
          return null;
        }
      })
    : teams
        .filter(team => team.TeamName.toLowerCase().includes(searchInput.toLowerCase()))
        .map((team) => (
          <tr
            key={team.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`checkbox-table-${team._id}`}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={(e) =>
                    handleTeamSelection(e, team._id)
                  }
                  checked={selectedTeams.includes(team._id)} // Preserve selected teams
                />
                <label
                  htmlFor={`checkbox-table-${team.id}`}
                  className="sr-only"
                >
                  checkbox
                </label>
              </div>
            </td>
            <td className="px-6 py-4 text-slate-900 ">
              <img
                src={`http://localhost:8000/${team.TeamLogo}`}
                alt={team.TeamName}
                className="h-15 w-auto"
              />
            </td>
            <th
              scope="row"
              className="px-6 py-4 font-bold text-slate-500 whitespace-nowrap"
            >
              {team.TeamName}
            </th>
           
          </tr>
        ))}
</tbody>

                </table>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-teal-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTour;