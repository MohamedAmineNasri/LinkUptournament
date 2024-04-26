import { useEffect, useState } from 'react';
import axios from 'axios';
import { Win, Draw, Lose } from "../components/GroupStageLogo";

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
        <div className="widget-title text-center bg-red-500 p-2">
          <h3>{group.name}</h3>
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
              <th colSpan="4">FORM</th>
            </tr>
          </thead>
          <tbody>
            {group.teams.map((team, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <strong>{team.TeamName}</strong>
                </td>
                <td>{team.MJ}</td>
                <td>{team.G}</td>
                <td>{team.N}</td>
                <td>{team.P}</td>
                <td>{team.BP}</td>
                <td>{team.BC}</td>
                <td>{team.DB}</td>
                <td>{team.PTS}</td>
                <td colSpan="4" className="flex justify-start pl-4 space-x-2">
                  <Win />
                  <Lose />
                  <Win />
                  <Draw />
                  <Draw />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default Group;
