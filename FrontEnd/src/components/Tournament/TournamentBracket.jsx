import React, { useEffect, useState } from 'react';
import "./TournamentBracket.css";
import axios from 'axios';


const TournamentBracket = ({tournamentId}) => {

  const [leftTeams, setTeamsData] = useState([]);

  useEffect(() => {
    const fetchTournament = async () => {
      const response = await axios.get(`http://localhost:8000/tournament/${tournamentId}`);
      setTeamsData(response.data.tournament.teams);
      console.log(response)
    };

    fetchTournament();

  }, [tournamentId]);

  

  return (
    <div>
      <section id="bracket">
        <div class="container-custom">
          <div class="split split-one">
            <div class="round round-one current">
              <div class="round-details">
                Round 1<br />
                <span class="date">March 16</span>
              </div>
              {leftTeams.map((team, index) => {
  // Check if the current index is divisible by 2 and less than the length of the array
  if (index % 2 === 0 && index < leftTeams.length - 1) {
    return (
      <ul className="matchup" key={index}>
        <li className="team team-top">
          {leftTeams[index]}
          <span className="score">&nbsp;
            <div className="score-text">{leftTeams[index].score}</div>&nbsp;
          </span>
        </li>
        <li className="team team-bottom">
          {leftTeams[index + 1]}
          <span className="score"> &nbsp;
            <div className="score-text">{leftTeams[index + 1].score}</div> &nbsp;
          </span>
        </li>
      </ul>
    );
  } else {
    return null; // If the condition is not met, return null to skip rendering
  }
})}

            </div>{" "}
            {/*<!-- END ROUND ONE -->*/}
            <div class="round round-two">
              <div class="round-details">
                Round 2<br />
                <span class="date">March 18</span>
              </div>
              <ul class="matchup">
                <li class="team team-top">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
                <li class="team team-bottom">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
              </ul>
              <ul class="matchup">
                <li class="team team-top">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
                <li class="team team-bottom">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
              </ul>
              <ul class="matchup">
                <li class="team team-top">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
                <li class="team team-bottom">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
              </ul>
              <ul class="matchup">
                <li class="team team-top">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
                <li class="team team-bottom">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
              </ul>
            </div>{" "}
            {/*<!-- END ROUND TWO -->*/}
            <div class="round round-three">
              <div class="round-details">
                Round 3<br />
                <span class="date">March 22</span>
              </div>
              <ul class="matchup">
                <li class="team team-top">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
                <li class="team team-bottom">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
              </ul>
              <ul class="matchup">
                <li class="team team-top">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
                <li class="team team-bottom">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
              </ul>
            </div>{" "}
            {/*<!-- END ROUND THREE -->*/}
          </div>

          <div class="champion">
            <div class="semis-l">
              <div class="round-details">
                west semifinals <br />
                <span class="date">March 26-28</span>
              </div>
              <ul class="matchup championship">
                <li class="team team-top">
                  &nbsp;<span class="vote-count">&nbsp;</span>
                </li>
                <li class="team team-bottom">
                  &nbsp;<span class="vote-count">&nbsp;</span>
                </li>
              </ul>
            </div>
            <div class="final">
              <i class="fa fa-trophy"></i>
              <div class="round-details">
                championship <br />
                <span class="date">March 30 - Apr. 1</span>
              </div>
              <ul class="matchup championship">
                <li class="team team-top">
                  &nbsp;<span class="vote-count">&nbsp;</span>
                </li>
                <li class="team team-bottom">
                  &nbsp;<span class="vote-count">&nbsp;</span>
                </li>
              </ul>
            </div>
            <div class="semis-r">
              <div class="round-details">
                east semifinals <br />
                <span class="date">March 26-28</span>
              </div>
              <ul class="matchup championship">
                <li class="team team-top">
                  &nbsp;<span class="vote-count">&nbsp;</span>
                </li>
                <li class="team team-bottom">
                  &nbsp;<span class="vote-count">&nbsp;</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="split split-two">
            <div class="round round-three">
              <div class="round-details">
                Round 3<br />
                <span class="date">March 22</span>
              </div>
              <ul class="matchup">
                <li class="team team-top">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
                <li class="team team-bottom">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
              </ul>
              <ul class="matchup">
                <li class="team team-top">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
                <li class="team team-bottom">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
              </ul>
            </div>{" "}
            {/*<!-- END ROUND THREE -->  */}
            <div class="round round-two">
              <div class="round-details">
                Round 2<br />
                <span class="date">March 18</span>
              </div>
              <ul class="matchup">
                <li class="team team-top">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
                <li class="team team-bottom">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
              </ul>
              <ul class="matchup">
                <li class="team team-top">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
                <li class="team team-bottom">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
              </ul>
              <ul class="matchup">
                <li class="team team-top">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
                <li class="team team-bottom">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
              </ul>
              <ul class="matchup">
                <li class="team team-top">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
                <li class="team team-bottom">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
              </ul>
            </div>{" "}
            {/*<!-- END ROUND TWO -->*/}
            <div class="round round-one current">
              <div class="round-details">
                Round 1<br />
                <span class="date">March 16</span>
              </div>
              <ul class="matchup">
                <li class="team team-top">
                  Minnesota<span class="score">62</span>
                </li>
                <li class="team team-bottom">
                  Northwestern<span class="score">54</span>
                </li>
              </ul>
              <ul class="matchup">
                <li class="team team-top">
                  Michigan<span class="score">68</span>
                </li>
                <li class="team team-bottom">
                  Iowa<span class="score">66</span>
                </li>
              </ul>
              <ul class="matchup">
                <li class="team team-top">
                  Illinois<span class="score">64</span>
                </li>
                <li class="team team-bottom">
                  Wisconsin<span class="score">56</span>
                </li>
              </ul>
              <ul class="matchup">
                <li class="team team-top">
                  Purdue<span class="score">36</span>
                </li>
                <li class="team team-bottom">
                  Boise State<span class="score">40</span>
                </li>
              </ul>
              <ul class="matchup">
                <li class="team team-top">
                  Penn State<span class="score">38</span>
                </li>
                <li class="team team-bottom">
                  Indiana<span class="score">44</span>
                </li>
              </ul>
              <ul class="matchup">
                <li class="team team-top">
                  Ohio State<span class="score">52</span>
                </li>
                <li class="team team-bottom">
                  VCU<span class="score">80</span>
                </li>
              </ul>
              <ul class="matchup">
                <li class="team team-top">
                  USC<span class="score">58</span>
                </li>
                <li class="team team-bottom">
                  Cal<span class="score">59</span>
                </li>
              </ul>
              <ul class="matchup">
                <li class="team team-top">
                  Virginia Tech<span class="score">74</span>
                </li>
                <li class="team team-bottom">
                  Dartmouth<span class="score">111</span>
                </li>
              </ul>
            </div>{" "}
            {/* END ROUND ONE -->*/}
          </div>
        </div>
      </section>
      <section class="share">
        <div class="share-wrap">
          <a class="share-icon" href="https://twitter.com/_joebeason">
            <i class="fa fa-twitter"></i>
          </a>
          <a class="share-icon" href="#">
            <i class="fa fa-facebook"></i>
          </a>
          <a class="share-icon" href="#">
            <i class="fa fa-envelope"></i>
          </a>
        </div>
      </section>
    </div>
  );
};

export default TournamentBracket;
