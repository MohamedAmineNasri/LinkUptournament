import  { useEffect, useState } from 'react';
import "./TournamentBracket.css";
import axios from 'axios';


const TournamentBracket = ({tournamentId}) => {

  const [matches, setMatches] = useState([]);
  const [matchesd, setMatchesd] = useState([]);
  const [winnersRound1, setWinnersRound1] = useState([]);


  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // Fetch matches by tournament ID
        const response = await axios.get(`http://localhost:8000/match/tournement/${tournamentId}`);
        setMatches(response.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();

  }, [tournamentId]);

  useEffect(() => {
    const fetchTeamsDetails = async () => {
      try {
        const updatedMatches = await Promise.all(matches.map(async match => {
          const team1Response = await axios.get(`http://localhost:8000/team/getTeam/${match.team1}`);
          const team2Response = await axios.get(`http://localhost:8000/team/getTeam/${match.team2}`);
          return {
            ...match,
            team1Details: team1Response.data,
            team2Details: team2Response.data
          };
        }));
        setMatchesd(updatedMatches);
      } catch (error) {
        console.error("Error fetching team details:", error);
      }
     
    };

    if (matches.length > 0) {
      fetchTeamsDetails();
    }

  }, [matches]); 
   

  // useEffect(() => {
  //   const updateRound2 = () => {
  //     console.log(matchesd)
  //     const winners = matchesd.filter(match => match.
  //       matchstatus === "Finished").map(match => {
  //       return match.w === match.team1 ? match.team1Details : match.team2Details;
  //     });
  //     // setWinnersRound1(prevWinners => {
  //     //   // Update winnersRound1 based on previous state
  //     //   return [...prevWinners, ...winners];
  //     // });
  //     console.log("w",winners)
  //     setWinnersRound1(winners);
  //   };
  
  //   updateRound2();
  // }, [matchesd]);
  

  // const renderRound2Matches = () => {
  //   const round2Matches = [];
  //   for (let i = 0; i < winnersRound1.length; i += 2) {
  //     round2Matches.push(
  //       <ul className="matchup" key={i}>
  //         <li className="team team-top">
  //           <span className="team-name text-black">{winnersRound1[i].TeamName}</span>
  //         </li>
  //         <li className="team team-bottom">
  //           <span className="team-name text-black">{winnersRound1[i + 1] ? winnersRound1[i + 1].TeamName : "Bye"}</span>
  //         </li>
  //       </ul>
  //     );
  //   }}
  const round1Matches = matchesd.filter(match => match.matchtype === 'Round1');
const round2Matches = matchesd.filter(match => match.matchtype === 'Round2');
const round3Matches = matchesd.filter(match => match.matchtype === 'Round3');
const finalMatches = matchesd.filter(match => match.matchtype === 'Final');
const semifinalMatches = matchesd.filter(match => match.matchtype === 'Semi Final');


  return (
    <div className="rounded-sm border border-stroke bg-white px-3 py-2 shadow-default dark:border-strokedark dark:bg-boxdark">
      <section id="bracket">
        <div className="container-custom">
          <div className="split split-one">
          {matchesd.some(m => m.matchtype === 'Round1') && (
            <div className="round round-one current">
              <div className="round-details">
                Round 1<br />
              </div>
              {/* Render matches for Round 2 */}
              {round1Matches.map((m, index) => {

                if ( index < round1Matches.length/2 &&
                  m.team1Details &&
                  m.team2Details &&
                  m.team1Details.TeamName &&
                  m.team2Details.TeamName && m.matchtype === 'Round1'
                ) {
                  return (
                    <ul className="matchup" key={index} style={{ marginBottom: '3rem' }}>
                      {/* Team 1 */}
                      <li className="team team-top  ">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center">
                            <img
                              src={`http://localhost:8000/${m.team1Details.TeamLogo}`}
                              alt={m.team1Details.TeamName}
                              width={20}
                              className="h-auto rounded-full object-cover mr-2"
                            />
                            <span className="team-name text-black">{m.team1Details.TeamName}</span>
                          </div>
                          <div>
                            <span className="score text-white bg-orange-200 px-2 py-1 rounded">{m.goal1.length}</span>
                          </div>
                        </div>
                      </li>
                      {/* Team 2 */}
                      <li className="team team-bottom dark:shadow-white">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center">
                            <img
                              src={`http://localhost:8000/${m.team2Details.TeamLogo}`}
                              alt={m.team2Details.TeamName}
                              width={20}
                              className="h-auto rounded-full object-cover mr-2"
                            />
                            <span className="team-name text-black">{m.team2Details.TeamName}</span>
                          </div>
                          <div>
                            <span className="score text-white bg-orange-200 px-2 py-1 rounded">{m.goal2.length}</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          )}
          {" "}
            {/*<!-- END ROUND ONE -->*/}

            {matchesd.some(m => m.matchtype === 'Round2') && (
            <div className="round round-two current">
              <div className="round-details">
                Round 2<br />
                <span className="date">March 18</span>
              </div>
              {/* Render matches for Round 2 */}
              {round2Matches.map((m, index) => {
                if ( index < round2Matches.length/2 &&
                  m.team1Details &&
                  m.team2Details &&
                  m.team1Details.TeamName &&
                  m.team2Details.TeamName && m.matchtype === 'Round2'
                ) {
                  return (
                    <ul className="matchup" key={index} style={{ marginBottom: '3rem' }}>
                      {/* Team 1 */}
                      <li className="team team-top">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center">
                            <img
                              src={`http://localhost:8000/${m.team1Details.TeamLogo}`}
                              alt={m.team1Details.TeamName}
                              width={20}
                              className="h-auto rounded-full object-cover mr-2"
                            />
                            <span className="team-name text-black">{m.team1Details.TeamName}</span>
                          </div>
                          <div>
                            <span className="score text-white bg-orange-200 px-2 py-1 rounded">{m.goal1.length}</span>
                          </div>
                        </div>
                      </li>
                      {/* Team 2 */}
                      <li className="team team-bottom">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center">
                            <img
                              src={`http://localhost:8000/${m.team2Details.TeamLogo}`}
                              alt={m.team2Details.TeamName}
                              width={20}
                              className="h-auto rounded-full object-cover mr-2"
                            />
                            <span className="team-name text-black">{m.team2Details.TeamName}</span>
                          </div>
                          <div>
                            <span className="score text-white bg-orange-200 px-2 py-1 rounded">{m.goal2.length}</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          )}
          {/*<!-- END ROUND TWO -->*/}{" "}

          {matchesd.some(m => m.matchtype === 'Round3') && (
            <div className="round round-two current">
              <div className="round-details">
                Round 3<br />
              </div>
              {round3Matches.map((m, index) => {
                if ( index < round3Matches.length/2 &&
                  m.team1Details &&
                  m.team2Details &&
                  m.team1Details.TeamName &&
                  m.team2Details.TeamName && m.matchtype === 'Round3'
                ) {
                  return (
                    <ul className="matchup" key={index} style={{ marginBottom: '3rem' }}>
                      {/* Team 1 */}
                      <li className="team team-top">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center">
                            <img
                              src={`http://localhost:8000/${m.team1Details.TeamLogo}`}
                              alt={m.team1Details.TeamName}
                              width={20}
                              className="h-auto rounded-full object-cover mr-2"
                            />
                            <span className="team-name text-black">{m.team1Details.TeamName}</span>
                          </div>
                          <div>
                            <span className="score text-white bg-orange-200 px-2 py-1 rounded">{m.goal1.length}</span>
                          </div>
                        </div>
                      </li>
                      {/* Team 2 */}
                      <li className="team team-bottom">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center">
                            <img
                              src={`http://localhost:8000/${m.team2Details.TeamLogo}`}
                              alt={m.team2Details.TeamName}
                              width={20}
                              className="h-auto rounded-full object-cover mr-2"
                            />
                            <span className="team-name text-black">{m.team2Details.TeamName}</span>
                          </div>
                          <div>
                            <span className="score text-white bg-orange-200 px-2 py-1 rounded">{m.goal2.length}</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          )}
          {/*<!-- END ROUND 3 -->*/}
          
  
        
          </div>
          <div className="champion current">
          {matchesd.some(m => m.matchtype === 'Semi Final') && (
            <div className="semis-l">
              
              <div className="round-details">
              semifinals <br />
              </div>
              {semifinalMatches.map((m, index) => {
                if ( index < semifinalMatches.length/2 &&
                  m.team1Details &&
                  m.team2Details &&
                  m.team1Details.TeamName &&
                  m.team2Details.TeamName 
                ) {
                  return (
                    <ul className="matchup" key={index} style={{ marginBottom: '3rem' }}>
                      {/* Team 1 */}
                      <li className="team team-top">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center">
                            <img
                              src={`http://localhost:8000/${m.team1Details.TeamLogo}`}
                              alt={m.team1Details.TeamName}
                              width={20}
                              className="h-auto rounded-full object-cover mr-2"
                            />
                            <span className="team-name text-black">{m.team1Details.TeamName}</span>
                          </div>
                          <div>
                            <span className="score text-white bg-orange-200 px-2 py-1 rounded">{m.goal1.length}</span>
                          </div>
                        </div>
                      </li>
                      {/* Team 2 */}
                      <li className="team team-bottom">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center">
                            <img
                              src={`http://localhost:8000/${m.team2Details.TeamLogo}`}
                              alt={m.team2Details.TeamName}
                              width={20}
                              className="h-auto rounded-full object-cover mr-2"
                            />
                            <span className="team-name text-black">{m.team2Details.TeamName}</span>
                          </div>
                          <div>
                            <span className="score text-white bg-orange-200 px-2 py-1 rounded">{m.goal2.length}</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          )}
          {/*<!-- END ROUND Semi Final -->*/}{" "}
          {matchesd.some(m => m.matchtype === 'Final') && (
            <div className="final">
              <i className="fa fa-trophy"></i>
              <div className="round-details">
              
                Final<br />
              </div>
              {finalMatches.map((m, index) => {
                if (
                  m.team1Details &&
                  m.team2Details &&
                  m.team1Details.TeamName &&
                  m.team2Details.TeamName && m.matchtype === 'Final'
                ) {
                  return (
                    <ul className="matchup" key={index} style={{ marginBottom: '3rem' }}>
                      {/* Team 1 */}
                      <li className="team team-top">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center">
                            <img
                              src={`http://localhost:8000/${m.team1Details.TeamLogo}`}
                              alt={m.team1Details.TeamName}
                              width={20}
                              className="h-auto rounded-full object-cover mr-2"
                            />
                            <span className="team-name text-black">{m.team1Details.TeamName}</span>
                          </div>
                          <div>
                            <span className="score text-white bg-orange-200 px-2 py-1 rounded">{m.goal1.length}</span>
                          </div>
                        </div>
                      </li>
                      {/* Team 2 */}
                      <li className="team team-bottom">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center">
                            <img
                              src={`http://localhost:8000/${m.team2Details.TeamLogo}`}
                              alt={m.team2Details.TeamName}
                              width={20}
                              className="h-auto rounded-full object-cover mr-2"
                            />
                            <span className="team-name text-black">{m.team2Details.TeamName}</span>
                          </div>
                          <div>
                            <span className="score text-white bg-orange-200 px-2 py-1 rounded">{m.goal2.length}</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          )}
          {/*<!-- END ROUND Final -->*/}{" "}
          {matchesd.some(m => m.matchtype === 'Semi Final') && (
            <div className="semis-r">
              
              <div className="round-details">
              semifinals <br />
              </div>
              {semifinalMatches.map((m, index) => {
                if ( index >= semifinalMatches.length/2 &&
                  m.team1Details &&
                  m.team2Details &&
                  m.team1Details.TeamName &&
                  m.team2Details.TeamName 
                ) {
                  return (
                    <ul className="matchup" key={index} style={{ marginBottom: '3rem' }}>
                      {/* Team 1 */}
                      <li className="team team-top">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center">
                            <img
                              src={`http://localhost:8000/${m.team1Details.TeamLogo}`}
                              alt={m.team1Details.TeamName}
                              width={20}
                              className="h-auto rounded-full object-cover mr-2"
                            />
                            <span className="team-name text-black">{m.team1Details.TeamName}</span>
                          </div>
                          <div>
                            <span className="score text-white bg-orange-200 px-2 py-1 rounded">{m.goal1.length}</span>
                          </div>
                        </div>
                      </li>
                      {/* Team 2 */}
                      <li className="team team-bottom">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center">
                            <img
                              src={`http://localhost:8000/${m.team2Details.TeamLogo}`}
                              alt={m.team2Details.TeamName}
                              width={20}
                              className="h-auto rounded-full object-cover mr-2"
                            />
                            <span className="team-name text-black">{m.team2Details.TeamName}</span>
                          </div>
                          <div>
                            <span className="score text-white bg-orange-200 px-2 py-1 rounded">{m.goal2.length}</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          )}
          {/*<!-- END ROUND Semi Final -->*/}{" "}
          </div>
          <div className="split split-two">

          {matchesd.some(m => m.matchtype === 'Round3') && (
            <div className="round round-two current">
              <div className="round-details">
                Round 3<br />
              </div>
              {round3Matches.map((m, index) => {
                if ( index >= round3Matches.length / 2 &&
                  m.team1Details &&
                  m.team2Details &&
                  m.team1Details.TeamName &&
                  m.team2Details.TeamName && m.matchtype === 'Round3'
                ) {
                  return (
                    <ul className="matchup" key={index} style={{ marginBottom: '3rem' }}>
                      {/* Team 1 */}
                      <li className="team team-top">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center">
                            <img
                              src={`http://localhost:8000/${m.team1Details.TeamLogo}`}
                              alt={m.team1Details.TeamName}
                              width={20}
                              className="h-auto rounded-full object-cover mr-2"
                            />
                            <span className="team-name text-black">{m.team1Details.TeamName}</span>
                          </div>
                          <div>
                            <span className="score text-white bg-orange-200 px-2 py-1 rounded">{m.goal1.length}</span>
                          </div>
                        </div>
                      </li>
                      {/* Team 2 */}
                      <li className="team team-bottom">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center">
                            <img
                              src={`http://localhost:8000/${m.team2Details.TeamLogo}`}
                              alt={m.team2Details.TeamName}
                              width={20}
                              className="h-auto rounded-full object-cover mr-2"
                            />
                            <span className="team-name text-black">{m.team2Details.TeamName}</span>
                          </div>
                          <div>
                            <span className="score text-white bg-orange-200 px-2 py-1 rounded">{m.goal2.length}</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          )}
          {" "}
          {/*<!-- END ROUND 3 -->*/}
            {matchesd.some(m => m.matchtype === 'Round2') && (
            <div className="round round-two current">
              <div className="round-details">
                Round 2<br />
                <span className="date">March 18</span>
              </div>
              {/* Render matches for Round 2 */}
              {round2Matches.map((m, index) => {
                if ( index >= round2Matches.length / 2&&
                  m.team1Details &&
                  m.team2Details &&
                  m.team1Details.TeamName &&
                  m.team2Details.TeamName && m.matchtype === 'Round2'
                ) {
                  return (
                    <ul className="matchup" key={index} style={{ marginBottom: '3rem' }}>
                      {/* Team 1 */}
                      <li className="team team-top">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center">
                            <img
                              src={`http://localhost:8000/${m.team1Details.TeamLogo}`}
                              alt={m.team1Details.TeamName}
                              width={20}
                              className="h-auto rounded-full object-cover mr-2"
                            />
                            <span className="team-name text-black">{m.team1Details.TeamName}</span>
                          </div>
                          <div>
                            <span className="score text-white bg-orange-200 px-2 py-1 rounded">{m.goal1.length}</span>
                          </div>
                        </div>
                      </li>
                      {/* Team 2 */}
                      <li className="team team-bottom">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center">
                            <img
                              src={`http://localhost:8000/${m.team2Details.TeamLogo}`}
                              alt={m.team2Details.TeamName}
                              width={20}
                              className="h-auto rounded-full object-cover mr-2"
                            />
                            <span className="team-name text-black">{m.team2Details.TeamName}</span>
                          </div>
                          <div>
                            <span className="score text-white bg-orange-200 px-2 py-1 rounded">{m.goal2.length}</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          )}
          {/*<!-- END ROUND TWO -->*/}{" "}
           {matchesd.some(m => m.matchtype === 'Round1') && (
            <div className="round round-one current">
              <div className="round-details">
                Round 1<br />
              </div>
              {/* Render matches for Round 2 */}
              {round1Matches.map((m, index) => {

                if ( index >= round1Matches.length / 2 &&
                  m.team1Details &&
                  m.team2Details &&
                  m.team1Details.TeamName &&
                  m.team2Details.TeamName && m.matchtype === 'Round1'
                ) {
                  return (
                    <ul className="matchup" key={index} style={{ marginBottom: '3rem' }}>
                      {/* Team 1 */}
                      <li className="team team-top">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center">
                            <img
                              src={`http://localhost:8000/${m.team1Details.TeamLogo}`}
                              alt={m.team1Details.TeamName}
                              width={20}
                              className="h-auto rounded-full object-cover mr-2"
                            />
                            <span className="team-name text-black">{m.team1Details.TeamName}</span>
                          </div>
                          <div>
                            <span className="score text-white bg-orange-200 px-2 py-1 rounded">{m.goal1.length}</span>
                          </div>
                        </div>
                      </li>
                      {/* Team 2 */}
                      <li className="team team-bottom">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center">
                            <img
                              src={`http://localhost:8000/${m.team2Details.TeamLogo}`}
                              alt={m.team2Details.TeamName}
                              width={20}
                              className="h-auto rounded-full object-cover mr-2"
                            />
                            <span className="team-name text-black">{m.team2Details.TeamName}</span>
                          </div>
                          <div>
                            <span className="score text-white bg-orange-200 px-2 py-1 rounded">{m.goal2.length}</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          )}
          {" "}
            {/*<!-- END ROUND ONE -->*/}
  
        
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default TournamentBracket;