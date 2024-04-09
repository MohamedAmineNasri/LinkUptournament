import { useEffect, useState } from 'react';
import axios from 'axios';

export const Group = ({ groupId }) => { 
  
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const fetchGroup = async () => {
      const response = await axios.get(`http://localhost:8000/group/${groupId}`);
      
      setGroup(response.data);
    };

    fetchGroup();
  }, [groupId]); // Add groupId to the dependency array

  if (!group) {
    return <div>Loading...</div>;
  }
 

  return (
    <div className="col-lg-6">
      <div className="widget-next-match">
        <div className="widget-title text-center bg-red-500 p-4">
          <h3>{group.name}</h3> {/* Render the group name */}
        </div>
        <table className="table custom-table " >
          <thead>
            <tr>
              <th className="p-2">P</th>
              <th className="p-2">Team</th>
              <th className="p-2">MJ</th>
              <th className="p-2">G</th>
              <th className="p-2">N</th>
              <th className="p-2">P</th>
              <th className="p-2">BP</th>
              <th className="p-2">BC</th>
              <th className="p-2">DB</th>
              <th className="p-2">PTS</th>
            </tr>
          </thead>
          <tbody>
            {group.teams.map((team, index) => ( // Render a row for each team in the group
              <tr key={index}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  <strong>
                    {team.TeamName} {/* Render the team name */}
                  </strong>
                </td>
                <td className="p-2">{team.MJ}</td>
                <td className="p-2">{team.G}</td>
                <td className="p-2">{team.N}</td>
                <td className="p-2">{team.P}</td>
                <td className="p-2">{team.BP}</td>
                <td className="p-2">{team.BC}</td>
                <td className="p-2">{team.DB}</td>
                <td className="p-2">{team.PTS}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Group;
