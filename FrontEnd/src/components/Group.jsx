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
          <th colSpan="4">FORM</th>
        </tr>
      </thead>
      <tbody>
        {group.teams.map((team, index) => ( // Render a row for each team in the group
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <strong>
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
            <td colSpan="4" className="d-flex justify-content-start pl-4" >
              <Win />
              <div style={{ margin: "0 2px" }}></div>
              <Lose />
              <div style={{ margin: "0 2px" }}></div>
              <Win />
              <div style={{ margin: "0 2px" }}></div>
              <Draw />
              <div style={{ margin: "0 2px" }}></div>
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
