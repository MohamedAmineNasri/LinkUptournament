import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './card.css';
import axios from "axios";

interface ChallengeData {
  id: number;
  title: string;
  company_id: number;
  status: string;
}
interface ChatroomData {
  _id: string;
  name: string;
  // Add more properties as needed
}

const defaultImagePath = 'https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=1000';

const Challenges = ({ status,searchQuery  }) => {
  const [chatrooms, setChatrooms] = useState<ChatroomData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [chatroomsPerPage] = useState(6);
  const [challenges, setChallenges] = useState<ChallengeData[]>([]);

  useEffect(() => {
    // Mock API call to fetch challenges
    const mockChallenges = [
      { id: 1, title: 'Challenge 1', company_id: 1, status: 'Active' },
      { id: 2, title: 'Challenge 2', company_id: 2, status: 'Inactive' },
      // Add more mock data as needed
    ];
    setChallenges(mockChallenges);
    setLoading(false);
  }, [status]);




  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  };
  function generateImg(index) {
    const imgs = [
      'https://c4.wallpaperflare.com/wallpaper/245/947/817/5bd47243d9c6b-wallpaper-preview.jpg',
      'https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/960/football-chromebook-wallpaper.jpg',
      'https://c4.wallpaperflare.com/wallpaper/202/747/791/4k-cristiano-ronaldo-strike-series-football-wallpaper-thumb.jpg',
      'https://wallpapersmug.com/large/fbd663/mohamed-salah-sports-football.jpg',

      // 'https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?cs=srgb&dl=pexels-rostislav-uzunov-5011647.jpg&fm=jpg',
      // 'https://img.freepik.com/premium-photo/3d-rendering-digital-art-illustration-variety-shapes_861655-30.jpg',
      // 'https://png.pngtree.com/thumb_back/fh260/background/20230519/pngtree-3d-cube-background-abstract-texture-wallpaper-image_2599710.jpg',
      // 'https://miro.medium.com/v2/resize:fit:1400/0*JG9ZJlqifvrgxS52',
      // 'https://img.freepik.com/premium-photo/3d-rendering-futuristic-abstract-structure-with-intricate-complex-geometries-as-modern-trendy_896648-1227.jpg',
      // 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbHBhcGVyJTIwM2R8ZW58MHx8MHx8fDA%3D',
    ];
    return imgs[index % imgs.length];
  }

  const [chatroomName, setChatroomName] = useState("");
    const [chatroomNameError, setChatroomNameError] = useState("");
    // const [chatrooms, setChatrooms] = useState([]);
    const [activeTab, setActiveTab] = useState('Ongoing');
    
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const getChatrooms = () => {
        axios
            .get("http://localhost:8000/chatroom", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                setChatrooms(response.data);
            })
            .catch((err) => {
                console.error(err);
                setTimeout(getChatrooms, 3000);
            });
    };

    const createChatroom = () => {
        if (validateChatroomName()) {
            axios
                .post(
                    "http://localhost:8000/chatroom",
                    { name: chatroomName }, 
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    }
                )
                .then((response) => {
                    getChatrooms();
                    setChatroomName("");
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const validateChatroomName = () => {
        if (chatroomName.trim() === "") {
            setChatroomNameError("Chatroom name is required");
            return false;
        } else {
            setChatroomNameError("");
            return true;
        }
    };

    useEffect(() => {
        getChatrooms();
    }, []);
    
    const indexOfLastChatroom = currentPage * chatroomsPerPage;
    const indexOfFirstChatroom = indexOfLastChatroom - chatroomsPerPage;
    const currentChatrooms = chatrooms.slice(indexOfFirstChatroom, indexOfLastChatroom);
    const filteredChatrooms = chatrooms
    .filter((chatroom) => chatroom.name && chatroom.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(indexOfFirstChatroom, indexOfLastChatroom);
  
    

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const Challenge = ({ chatroom, index }) => {
      return (
        <div className="relative group overflow-hidden rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
          {/* Your challenge card UI */}
          
              <div className="card" key={chatroom._id}>
              {/* block 1 */}
              <div className="img" style={{ backgroundImage: `url(${generateImg(index)})` }}>
              {/* +20 */}
              <div className="stats pl-4">
              <div className="viewer">
                  <span><img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" height="25px" width="25px" alt="Viewer 1" /></span>
                  <span><img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" height="25px" width="25px"   alt="Viewer 2" /></span>
                  <span><img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" height="25px" width="25px"   alt="Viewer 3" /></span>
                  <span className='smaller'>+20</span>
              </div>
              </div>
      
              {/* like */}
              <div className="save">
              <input 
              type="checkbox" 
              className="checkbox" 
              id={`checkbox-${chatroom._id}`} 
              // checked={isFavorite}
              // onChange={() => handleClickAddFavorite(challenge._id)}
              />
      
              <label htmlFor={`checkbox-${chatroom._id}`}>
                  <svg id="heart-svg" viewBox="467 420 58 57" width="35" height="35" xmlns="http://www.w3.org/2000/svg">
                      <g id="Group" fill="none" fillRule="evenodd" transform="translate(467 392)">
                      <path id="heart" d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" fill="#AAB8C2"/>
                      <circle id="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5"/>
      
                      <g id="grp7" opacity="0" transform="translate(7 6)">
                          <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2"/>
                          <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2"/>
                      </g>
      
                      <g id="grp6" opacity="0" transform="translate(0 28)">
                          <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2"/>
                          <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2"/>
                      </g>
      
                      <g id="grp3" opacity="0" transform="translate(52 28)">
                          <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2"/>
                          <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2"/>
                      </g>
      
                      <g id="grp2" opacity="0" transform="translate(44 6)">
                          <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2"/>
                          <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2"/>
                      </g>
      
                      <g id="grp5" opacity="0" transform="translate(14 50)">
                          <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2"/>
                          <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2"/>
                      </g>
      
                      <g id="grp4" opacity="0" transform="translate(35 50)">
                          <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2"/>
                          <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2"/>
                      </g>
      
                      <g id="grp1" opacity="0" transform="translate(24)">
                          <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2"/>
                          <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2"/>
                      </g>
                      </g>
                  </svg>
              </label>
              </div>
              {/* profile img */}
                  <div className="card__avatar">
                  {/* {image ? (
                  <img src={`http://localhost:3000/uploads/${image}`} height="45px" width="45px" alt="Logo" className='rounded-full shadow-lg' />
                  ) : ( */}
                  <img src="https://cdn4.vectorstock.com/i/1000x1000/09/33/company-icon-for-graphic-and-web-design-vector-31970933.jpg" height="45px" width="45px" alt="Default Logo" className='rounded-full shadow-lg' />
                  {/* )} */}
                  </div>
              </div>
              
              {/* block 2 */}
              {/* info */}
              <div className="text">
                  <p className="h3">{truncateText(chatroom.name, 15)}</p>
                  <div className="flex items-center">
                  <h4 className="company pr-1">
                  {/* by  */}
                  </h4>
                  {/* <h4 className="company"> {loadingCompany ? 'Loading...' : companyName}</h4> */}
              </div>
      
              <div className="aline">
              <div className="icon-box">
      
              <svg height="10px" width="10px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                  viewBox="0 0 451.827 451.827" xmlSpace="preserve">
              <g>
                  <g>
                      <path style={{ fill: "#9198e5" }}  d="M225.922,0C101.351,0,0.004,101.347,0.004,225.917s101.347,225.909,225.917,225.909
                          c124.554,0,225.901-101.347,225.901-225.909C451.823,101.347,350.476,0,225.922,0z"/>
                  </g>
              </g>
              </svg>
                  {/* <p className="span">{challenge.status}</p> */}
                  <p className="span">Active</p>
                  
                  </div>
                  <div className="btn-conteiner">
                  <Link to={`/chatroom/${chatroom._id}`} >
                      <a href="#" className="btn-content">
                          <span className="icon-arrow">
                          <svg
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              viewBox="0 0 66 43"
                              height="30px"
                              width="30px"
                          >
                              <g
                              fillRule="evenodd"
                              fill="none"
                              strokeWidth="1"
                              stroke="none"
                              id="arrow"
                              >
                              <path
                                  fill="#9ee5fa"
                                  d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                                  id="arrow-icon-one"
                              ></path>
                              <path
                                  fill="#9ee5fa"
                                  d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                                  id="arrow-icon-two"
                              ></path>
                              <path
                                  fill="#9ee5fa"
                                  d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                                  id="arrow-icon-three"
                              ></path>
                              </g>
                          </svg>
                          </span>
                      </a>
                  </Link>
              </div>
              </div>
      
              </div>
      
              </div>
        
        </div>
      );
    };
  
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-10">
        {loading ? (
          Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="max-w-xs rounded overflow-hidden shadow-lg my-2">
              {/* Placeholder for loading state */}
            </div>
          ))
        ) : (
          // currentChatrooms.map((chatroom, index) => (
          //   <Challenge chatroom={chatroom} index={index} key={chatroom._id} />
          // ))
          filteredChatrooms.map((chatroom, index) => (
            <Challenge chatroom={chatroom} index={index} key={chatroom._id} />
        ))
        )}

        </div>
        <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(chatrooms.length / chatroomsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className="mx-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-200">
            {index + 1}
          </button>
        ))}
      </div>
      </div>
    );
  }    

export default Challenges;
