import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Button as MuiButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate  } from 'react-router-dom';
import { deleteTournament } from '../../redux/slice/tournamentSlice';
import { useDispatch } from "react-redux";


const ManageTournament = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [TournementId, setTournementId] = useState([]);
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get('http://localhost:8000/tournament/all');
        setTournementId(response.data);
      
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };
 
    fetchTournaments();
  }, []);

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
  const handleClose = async (tournamentId) => {
    try {
      await dispatch(deleteTournament(tournamentId));
      // Remove the deleted tournament from the state
      setTournementId(prevTournaments => prevTournaments.filter(tournament => tournament._id !== tournamentId));
      console.log(`Tournament with ID ${tournamentId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting tournament:', error);
    }
    // Close the menu after deleting the tournament
    setAnchorElMap(prevState => ({
      ...prevState,
      [tournamentId]: null
    }));
  };
  

  return (
    <div className="rounded-sm border p-4  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {false ? (
        <>
          <div className="py-6 px-4 md:px-6 xl:px-7.5 h-100 flex flex-col items-center justify-center">
            <h4 className="md:text-xl text-lg font-semibold text-black dark:text-white">
              Looks like there are no tournaments to display.
            </h4>
            <span className="md:text-base text-xs font-semibold mt-2 mb-5">
              Ready to get started? Add your first tournament now.
            </span>
            <button
              class="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
              type="submit"
              onClick={() => {
                navigate(`/manage/format`);
              }}
            >
              Create Tournament
            </button>
          </div>
        </>
      ) : (
        <div>
          <div className="py-4 px-2 md:px-2 xl:px-3.5 flex justify-between">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              All Tournaments
            </h4>
            <button
              class="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
              type="submit"
              onClick={() => {
                navigate(`/manage/format`);
              }}
            >
              Add Tournament
            </button>
          </div>
          <div className="py-4 px-2 md:px-2 xl:px-3.5">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          { TournementId.map((tournament, index) => (
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
    <h2 className="text-3xl uppercase max-w-50 " style={{ 
        position: 'absolute',
        
      }}>
      {tournament.name} {/* Replace with the actual property name for the tournament name */}
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
        onClose={handleClose}
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
                    <MenuItem onClick={() => navigate(`/fetchmatchbytour/${tournament._id}`)}>get matches </MenuItem>

                    <MenuItem onClick={() => handleClose(tournament._id)}>Delete tournament</MenuItem>
                  </Menu>
                </div>
  </div>
))} 
     </div></div>    

        </div>
      )}
    </div>
  );
};

export default ManageTournament;