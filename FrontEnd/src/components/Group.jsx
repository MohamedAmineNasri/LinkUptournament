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
        <div className="widget-title" style={{ textAlign: 'center', backgroundColor: "#ee1e46" }}>
          <h3>{group.name}</h3> {/* Render the group name */}
        </div>
        <table className="table custom-table">
          <thead>
            <tr>
              <th>P</th>
              <th>Team</th>
              <th>MJ</th>
              <th>G</th>
              <th>N</th>
              <th>P</th>
              <th>BP</th>
              <th>BC</th>
              <th>DB</th>
              <th>PTS</th>
            </tr>
          </thead>
          <tbody>
            {group.teams.map((team, index) => ( // Render a row for each team in the group
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <strong className="text-white">
                    {team.TeamName} {/* Render the team name */}
                  </strong>
                </td>
                <td>{team.MJ}</td>
                <td>{team.G}</td>
                <td>{team.N}</td>
                <td>{team.P}</td>
                <td>{team.BP}</td>
                <td>{team.BC}</td>
                <td>{team.DB}</td>
                <td>{team.PTS}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Group;
