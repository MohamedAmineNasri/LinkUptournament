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
    return (<di></di>);
  }
 

  return (
    <div className="rounded-sm border border-stroke bg-white px-3 py-2 shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="max-w-full overflow-x-auto">
      <div className="widget-title text-center bg-red-500 p-2">
        <h3>{group.name}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-custom-green text-left dark:bg-custom-green">
              <th className="min-w-[10px] py-2 px-2 font-medium text-white">P</th>
              <th className="min-w-[20px] py-2 px-2 font-medium text-white"></th>
              <th className="min-w-[120px] py-2 px-2 font-medium text-white">Team</th>
              <th className="min-w-[10px] py-2 px-2 font-medium text-white">MJ</th>
              <th className="min-w-[10px] py-2 px-2 font-medium text-white">G</th>
              <th className="min-w-[10px] py-2 px-2 font-medium text-white">N</th>
              <th className="min-w-[10px] py-2 px-2 font-medium text-white">P</th>
              <th className="min-w-[10px] py-2 px-2 font-medium text-white">BP</th>
              <th className="min-w-[10px] py-2 px-2 font-medium text-white">BC</th>
              <th className="min-w-[10px] py-2 px-2 font-medium text-white">DB</th>
              <th className="min-w-[10px] py-2 px-2 font-medium text-white">PTS</th>
              <th className="min-w-[70px] py-2 px-2 font-medium text-white">FORM</th>
            </tr>
          </thead>
          <tbody>
            {group.teams.map((team, index) => (
              <tr key={index}>
                <td className="text-black px-2 dark:text-white">{index + 1}</td>
                <td className="text-black dark:text-white">
                  <img
                    src={`http://localhost:8000/${team.TeamLogo}`}
                    
                    width={30}
                    className="h-auto rounded-full object-cover"
                  />
                </td>
                <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark font-normal text-black dark:text-white">{team.TeamName}</td>  
                <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark font-normal text-black dark:text-white">{team.MJ}</td>
                <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark font-normal text-black dark:text-white">{team.G}</td>
                <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark font-normal text-black dark:text-white">{team.N}</td>
                <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark font-normal text-black dark:text-white">{team.P}</td>
                <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark font-normal text-black dark:text-white">{team.BP}</td>
                <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark font-normal text-black dark:text-white">{team.BC}</td>
                <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark font-normal text-black dark:text-white">{team.DB}</td>
                <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark font-normal text-black dark:text-white">{team.PTS}</td>
                <td colSpan="4" className="flex justify-start pl-2 space-x-1">
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
