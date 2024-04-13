import { useEffect, useState } from 'react';
import axios from 'axios';
import { Win, Draw, Lose } from "../GroupStageLogo";


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
  <div className="col-lg-26">
  <div className="widget-next-match">
    <div className="widget-title text-center bg-red-500 p-2">
      <h3>{group.name}</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="table custom-table w-full">
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
              <td className=" text-black dark:text-white">{index + 1}</td>
              <td className=" text-black dark:text-white">{team.TeamName}</td>  
               <td className=" text-black dark:text-white">{team.MJ}</td>
              <td className=" text-black dark:text-white">{team.G}</td>
              <td className=" text-black dark:text-white">{team.N}</td>
              <td className=" text-black dark:text-white">{team.P}</td>
              <td className=" text-black dark:text-white">{team.BP}</td>
              <td className=" text-black dark:text-white">{team.BC}</td>
              <td className=" text-black dark:text-white">{team.DB}</td>
              <td className=" text-black dark:text-white">{team.PTS}</td>
              <td colSpan="4" className="flex justify-start pl-4 space-x-2">
                  {[...Array(team.G)].map((_, i) => (
                    <Win key={i} />
                  ))}
                  {[...Array(team.P)].map((_, i) => (
                    <Draw key={i} />
                  ))}
                  {[...Array(team.N)].map((_, i) => (
                    <Lose key={i} />
                  ))}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
  )
};

export default Group;
