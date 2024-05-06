import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function TournamentGroup() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/tourn/${id}`);
        setTournament(response.data);
      } catch (error) {
        console.error("Error fetching tournament:", error);
      }
    };

    fetchTournament();
  }, [id]);

  // Function to generate groups and distribute teams
  const generateGroups = () => {
    const { numGroups, numTeamsPerGroup, teams } = tournament;
    const groups = [];

    // Distribute teams into groups
    for (let i = 0; i < numGroups; i++) {
      const group = {
        id: i + 1,
        name: `Group ${String.fromCharCode(65 + i)}`,
        teams: teams.slice(i * numTeamsPerGroup, (i + 1) * numTeamsPerGroup),
      };
      groups.push(group);
    }

    return groups;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {tournament && (
        <>
          <h1 className="text-3xl font-bold mb-4 text-primary">{tournament.name}</h1>
          <h2 className="text-lg font-semibold mb-2 mt-4 text-black dark:text-white">
            Number of Groups: {tournament.numGroups}
          </h2>
          <h2 className="text-lg font-semibold mb-8 text-black dark:text-white">
            Number of Teams Per Group: {tournament.numTeamsPerGroup}
          </h2>
          {/* Render GroupStage */}
          <div className="grid grid-cols-2 gap-4 ">
            {generateGroups().map((group) => (
              <>
                <div
                  key={group.id}
                  className="bg-white dark:dark:bg-boxdark rounded-lg shadow-md p-4 "
                >
                  <h3 className="text-xl font-bold mb-2 text-black dark:text-white text-primary">
                    {group.name}
                  </h3>
                  <ul>
                    {group.teams.map((team) => (
                      <li
                        key={team._id}
                        className="dark:text-white text-gray-800 mb-1"
                      >
                        {team.TeamName}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TournamentGroup;
