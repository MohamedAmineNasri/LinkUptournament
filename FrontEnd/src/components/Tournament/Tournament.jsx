import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Group from '../../pages/group/Group';
import axios from 'axios';

export const Tournament = () => {
  const [groups, setGroups] = useState(null);
  const [tournament, setTournament] = useState(null);

  const { tournamentId } = useParams();

  useEffect(() => {
    const fetchTournament = async () => {
      const response = await axios.get(`http://localhost:8000/tournament/${tournamentId}`);
      setTournament(response.data.tournament);
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

  return (
    <>
      <div>
        {/* Header */}
        

        {/* Hero Image */}
        <div className="hero overlay2 HeroImageAddAcademy" >
          <div className="flex justify-center">
            <div className="max-w-md mx-auto bg-white bg-opacity-30 rounded-md overflow-hidden md:max-w-xl">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img src={`http://localhost:8000/${tournament.logo}`} alt="Logo" className="w-full h-64 object-cover md:w-48" />
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-semibold text-gray-800">{tournament.name}</h2>
                  <p className="mt-2 text-Black-600">{tournament.status}</p>
                  <p className="mt-2 text-gray-600">{tournament.date_debut}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Render Group components */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mx-4">
            {groups.map(group => (
              <Group key={group._id} groupId={group._id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tournament;
