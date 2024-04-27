import React, { useEffect, useState } from 'react';
import { useParams , useLocation} from 'react-router-dom';
import Group from './Group';
import TournamentBracket from './TournamentBracket';
import axios from 'axios';
import { Outlet, useNavigate } from "react-router-dom";

export const Tournament = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [groups, setGroups] = useState(null);
  const [tournament, setTournament] = useState(null);
  const [displayComponent, setDisplayComponent] = useState("groups");
  const { tournamentId } = useParams();

  useEffect(() => {
    const fetchTournament = async () => {
      const response = await axios.get(`http://localhost:8000/tournament/${tournamentId}`);
      const tournamentData = response.data.tournament;

      // Get current date
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

      setTournament({
        ...tournamentData,
        // Format the date_debut field
        date_debut: new Date(tournamentData.date_debut).toLocaleDateString('en-US'),
      });
    };

    const fetchGroups = async () => {
      const response = await axios.get(`http://localhost:8000/group/tournament/${tournamentId}`);
      setGroups(response.data);
    };

    fetchTournament();
    fetchGroups();
  }, [tournamentId]);

  if (!tournament) {
    return <div>Loading tournament...</div>;
  }

  if (!groups) {
    return <div>Loading groups ...</div>;
  }

  const handleClick = (component) => {
    setDisplayComponent(component);
  };

  return (
    <>
      <div>
        {/* Header */}
        <div class="flex p-6 font-mono">
          <div class=" flex-none w-48 mb-10 relative z-10 before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-custom-green">
            <img src={`http://localhost:8000/${tournament.logo}`} alt="" class="absolute z-10 inset-0 w-full h-full object-cover rounded-lg" loading="lazy" />
          </div>
          <form class="flex-auto pl-6">
            <div class="relative flex flex-wrap items-baseline pb-6 before:bg-red-500 before:absolute before:-top-6 before:bottom-0 before:-left-60 before:-right-6">
              <h1 class="relative uppercase w-full flex-none mb-2 text-2xl font-semibold text-black">
                {tournament.name}
              </h1>
              <div class="relative uppercase text-white w-full  ">{tournament.status}</div>
              <div class="relative text-xs text-white ml-90 mt-1  ">{tournament.date_debut}</div>
            </div>
            <div class="flex items-baseline my-6">
              <div class="space-x-3 flex text-sm font-medium"></div>
            </div>
            <div class="flex space-x-2 mb-4 text-sm font-medium">
              <div class="flex space-x-4">
                <button class="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-custom-green text-white" type="submit" onClick={() => navigate(`/manage/editt/${tournament._id}`)}>
                  Edit
                </button>
                
              </div>
              <button class="flex-none flex items-center justify-center w-12 h-12 text-black" type="button" aria-label="Like">
                <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
              </button>
            </div>
            
            <p class="text-xs leading-6 text-slate-500">{tournament.rules}</p>
          </form>
        </div>
        {/* Hero Image */}
        <div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-4">
          <div className="py-4 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
            <button
              className={`text-lg font-semibold ${displayComponent === 'groups' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'} mx-auto`}
              onClick={() => handleClick("groups")}
            >
              Groups
            </button>
            <button
              className={`text-lg font-semibold ${displayComponent === 'bracket' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'} mx-auto`}
              onClick={() => handleClick("bracket")}
            >
              Bracket
            </button>
            <button
              className={`text-lg font-semibold ${displayComponent === 'bracket' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'} mx-auto`}
              onClick={() => handleClick("bracket")}
            >
              Matches
            </button>
          </div>
        </div>
    </div>
        {/* Render Group components */}
        {displayComponent === 'groups' && (
          <div className="flex flex-wrap gap-4">
            {groups.map((group) => (
              <Group key={group._id} groupId={group._id} />
            ))}
          </div>
        )}
        {/* Only render TournamentBracket if tournament type is 'knockout' */}
        {displayComponent === 'bracket' && tournament.type === 'Knockout' && (
          <TournamentBracket tournamentId={tournament._id}></TournamentBracket>
        )}
       
        
      </div>
    </>
  );
};

export default Tournament;
