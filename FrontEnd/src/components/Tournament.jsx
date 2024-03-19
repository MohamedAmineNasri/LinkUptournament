import { useEffect , useState } from 'react';
import { useParams } from 'react-router-dom';
import Group from './Group';
import axios from 'axios';
import addformstadiumImage from "../assets/Mi-imgs/2.jpg";

export const Tournament = () => {
    const [groups, setGroups] = useState(null);
    const [tournament, setTournament] = useState(null);

    
    const { tournamentId } = useParams(); // get the tournament id from the URL
  
   

    useEffect(() => {

        const fetchTournament = async () => {
            const response = await axios.get(`http://localhost:8000/tournament/${tournamentId}`);
            console.log("tournamnt", response.data.tournament)
            setTournament(response.data.tournament);
            
          };
       const fetchGroups = async () => {
            const response = await axios.get(`http://localhost:8000/group/tournament/${tournamentId}`);
            console.log("groups", response.data)
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
      <div >
        <div>
        <header className="site-navbar py-4" role="banner">
          <div className="container">
            <div className="d-flex align-items-center">
              <div className="site-logo">
                <a href="index.html">
                  <img src="/public/assets/images/logo.png" alt="Logo" />
                </a>
              </div>
              <div className="ml-auto">
                <nav
                  className="site-navigation position-relative text-right"
                  role="navigation"
                >
                  <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                    <li>
                      <a href="index.html" className="nav-link">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="matches.html" className="nav-link">
                        Matches
                      </a>
                    </li>
                    <li>
                      <a href="players.html" className="nav-link">
                        Players
                      </a>
                    </li>
                    <li className="active">
                      <a href="blog.html" className="nav-link">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="contact.html" className="nav-link">
                        Contact
                      </a>
                    </li>
                  </ul>
                </nav>

                <a
                  href="#"
                  className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right text-white"
                >
                  <span className="icon-menu h3 text-white"></span>
                </a>
              </div>
            </div>
          </div>
        </header>
      </div>
       {/* Hero image ------------------------- */}
       <div
        className="hero overlay2 HeroImageAddAcademy"
        style={{ backgroundImage: `url(${addformstadiumImage})` }}
      > 

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
        </div>
      );
      
  };

export default Tournament ; 