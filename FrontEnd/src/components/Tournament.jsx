import { useEffect , useState } from 'react';
import { useParams } from 'react-router-dom';
import Group from './Group';
import axios from 'axios';

export const Tournament = () => {
    const [groups, setGroups] = useState(null);
    const [tournament, setTournament] = useState(null);

    
    const { tournamentId } = useParams(); // get the tournament id from the URL
  
   

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
      
    }, [ tournamentId]);
    if (!tournament) {
        return <div>Loading tournament...</div>;
      }

      if (!groups) {
        return <div>Loading groups ...</div>;
      }
    // render your tournament and groups data
    // replace with your actual rendering logic
    return (
        <div className="container col-lg-8 pt-5">
            <div className='class="row"'>
                <div className="col-lg-6">
                    <div className="custom-media d-flex">
                    <div className="img mr-4">
                    <img src={`${tournament.logo}`}  alt="Image" className="img-fluid"></img>

                        </div>
                     <h1>{tournament.name}</h1>
                    </div>
               
               </div>
            </div>
            <div className='class="row"'>
          {groups.map(group => (
            <Group key={group._id} groupId={group._id} />
          ))}</div>
        </div>
      );
      
  };

export default Tournament ; 