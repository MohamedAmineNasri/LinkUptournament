import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Button as MuiButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate  } from 'react-router-dom';
import { deleteTournament ,sendSMSToPlayer} from '../../redux/slice/tournamentSlice';
import { useDispatch } from "react-redux";



const ManageTournament = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");   
  const [filteredTournaments, setFilteredTournaments] = useState([]); // New state for filtered tournaments


  useEffect(() => {
    const fetchTournamentsByName = async () => {
      try {
        let response;
        if (searchInput.trim() === "") {
          // If search input is empty, fetch all tournaments
          response = await axios.get('http://localhost:8000/tournament/all');
        } else {
          // If search input is not empty, fetch tournaments by name
          response = await axios.get(`http://localhost:8000/tournament/search/${searchInput}`);
        }
        setFilteredTournaments(response.data);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };
  
    fetchTournamentsByName();
  }, [searchInput]);
  

  // const [anchorEl, setAnchorEl] = useState(null);
  // Inside your component function
  const [anchorElMap, setAnchorElMap] = useState({});
  const open = Boolean(anchorElMap);

  const handleClick = (event, tournamentId) => {
    setAnchorElMap(prevState => ({
      ...prevState,
      [tournamentId]: event.currentTarget
    }));
  };

  const handleDeleteTournament = async (tournamentId) => {
    try {
      await dispatch(deleteTournament(tournamentId));
      // Remove the deleted tournament from the state
      setFilteredTournaments(prevTournaments => prevTournaments.filter(tournament => tournament._id !== tournamentId));
      console.log(`Tournament with ID ${tournamentId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting tournament:', error);
    }
  };
  
  const handleClose = (index) => {
    // Close the menu associated with the clicked tournament
    setAnchorElMap(prevState => ({
      ...prevState,
      [index]: null
    }));
  };
  
  const handleMenuClose = (tournamentId) => {
    handleClose(tournamentId); // Close the menu
  };
  
  const handleDeleteClick = async (tournamentId) => {
    await handleDeleteTournament(tournamentId); // Delete the tournament
    handleClose(tournamentId); // Close the menu
  };
  
  const handleVerifySMS = async (tournamentId) => {
    const playerId = '660e413aa3c478b801ebb62b';
    try {
      // Dispatch the sendSMSToPlayer action with the tournamentId and playerId
      await dispatch(sendSMSToPlayer({ tournamentId, playerId }));
      console.log('SMS verification triggered successfully');
      // Close the menu after triggering SMS verification
      handleClose(tournamentId);
    } catch (error) {
      console.error('Error triggering SMS verification:', error);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value); // Update search input value
  };

  return (
    <div className="rounded-sm border p-4 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-4 px-2 md:px-2 xl:px-3.5 flex justify-between">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            All Tournaments
          </h4>
          
          <button
            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
            type="submit"
            onClick={() => {
              navigate(`/manage/format`);
            }}
          >
            Add Tournament
          </button>
        </div>
        <div className="relative mt-1">
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
            className="bg-gray-50 border border-gray-300 text-slate-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-90 pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for tournaments"
            value={searchInput}
            onChange={handleSearchInputChange} // Update search input value
          />
        </div>
      {filteredTournaments.length === 0 ? (
        <div className="py-6 px-4 md:px-6 xl:px-7.5 h-100 flex flex-col items-center justify-center">
          <h4 className="md:text-xl text-lg font-semibold text-black dark:text-white">
            Looks like there are no tournaments to display.
          </h4>
        
          
        </div>
      ) : (


        <div>

        <div className="py-4 px-2 md:px-2 xl:px-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredTournaments.map((tournament, index) => (
                <div key={index} className="bg-black-2 h-65 relative  hover:scale-105 transition-all duration-300 cursor-default">
                  <img 
                    src={`http://localhost:8000/${tournament.logo}`} 
                    alt={tournament.name} 
                    style={{ 
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.5
                    }}
                  />
                  <p className="text-4xl font-semibold absolute bottom-0 left-0" style={{ userSelect: "none" }}>
                    {index + 1}
                  </p>
                  <h2 className="text-3xl uppercase max-w-50 " style={{ position: 'absolute' }}>
                    {tournament.name}
                  </h2>
                  <div className="absolute top-5 right-0">
                    <MuiButton
                      id={`demo-positioned-button-${index}`}
                      aria-controls={anchorElMap[index] ? `demo-positioned-menu-${index}` : undefined}
                      aria-haspopup="true"
                      aria-expanded={anchorElMap[index] ? "true" : undefined}
                      onClick={(event) => handleClick(event, index)}
                      sx={{ cursor: "pointer" }}
                    >
                      <MoreVertIcon sx={{ color: "green" }} />
                    </MuiButton>
                    <Menu
                      id={`demo-positioned-menu-${index}`}
                      aria-labelledby={`demo-positioned-button-${index}`}
                      anchorEl={anchorElMap[index]}
                      open={Boolean(anchorElMap[index])}
                      onClose={() => handleMenuClose(index)} // Update onClose handler
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <MenuItem onClick={() => navigate(`/manage/tournament/${tournament._id}`)}>Select tournament</MenuItem>
                      <MenuItem onClick={() => navigate(`/manage/editt/${tournament._id}`)}>Edit tournament</MenuItem>
                      <MenuItem onClick={() => handleVerifySMS(tournament._id)}>send SMS to players</MenuItem>
                      <MenuItem onClick={() => handleDeleteClick(tournament._id)}>Delete tournament</MenuItem>
                    </Menu>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      )}
    </div>
  );
  
};

export default ManageTournament;