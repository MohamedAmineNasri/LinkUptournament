import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import Group from './Group';
import axios from 'axios';
import addformstadiumImage from "../assets/Mi-imgs/2.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteTournament } from '../redux/slice/tournamentSlice';
import { useDispatch } from "react-redux";

export const Tournament = () => {
  const dispatch = useDispatch();
    const [groups, setGroups] = useState(null);
    const [tournament, setTournament] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate hook

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

    }, [tournamentId]);

    const handleDelete = async () => {
      try {
          
          await  dispatch(deleteTournament(tournamentId)); // Dispatch the deleteTournament action
          navigate('/'); // Redirect to the homepage or any other route after deletion
      } catch (error) {
          console.error('Error deleting tournament:', error);
      }
  };

    if (!tournament) {
        return <div>Loading tournament...</div>;
    }

    if (!groups) {
        return <div>Loading groups ...</div>;
    }

    // render your tournament and groups data
    // replace with your actual rendering logic
    return (
        <div>
            {/* Header */}
            <header className="site-navbar py-4" role="banner">
                <div className="container">
                    <div className="d-flex align-items-center">
                        <div className="site-logo">
                            <a href="index.html">
                                <img src="/public/assets/images/logo.png" alt="Logo" />
                            </a>
                        </div>
                        <div className="ml-auto">
                            <nav className="site-navigation position-relative text-right" role="navigation">
                                <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                                    <li><a href="index.html" className="nav-link">Home</a></li>
                                    <li><a href="matches.html" className="nav-link">Matches</a></li>
                                    <li><a href="players.html" className="nav-link">Players</a></li>
                                    <li className="active"><a href="blog.html" className="nav-link">Blog</a></li>
                                    <li><a href="contact.html" className="nav-link">Contact</a></li>
                                </ul>
                            </nav>
                            <a href="#" className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right text-white">
                                <span className="icon-menu h3 text-white"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Image */}
            <div className="hero overlay2 HeroImageAddAcademy" style={{ backgroundImage: `url(${addformstadiumImage})` }}>
                <div className="row">
                    <div className="card mb-3" style={{ maxWidth: "700px" }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={`http://localhost:8000/${tournament.logo}`} alt="Logo" className="img-fluid" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{tournament.name}</h5>
                                    <p className="card-text" style={{ color: "black" }}>
                                        This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">{tournament.status}</small>
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">{tournament.date_debut}</small>
                                    </p>
                                    <div>
                                        <button type="button" className="btn btn-outline-success" onClick={() => navigate(`/edit-tournament/${tournamentId}`)}>
                                            Edit
                                        </button>
                                        <button type="button" className="btn btn-outline-danger"onClick={handleDelete}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Render Group components */}
                <div className="row">
                    {groups.map(group => (
                        <Group key={group._id} groupId={group._id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tournament;
