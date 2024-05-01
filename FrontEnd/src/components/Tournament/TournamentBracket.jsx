import  { useEffect, useState } from 'react';
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
        <div className="container-custom">
          <div className="split split-one">
            <div className="round round-one current">
              <div className="round-details">
                Round 1<br />
                <span className="date">March 16</span>
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
            <div className="round round-two">
              <div className="round-details">
                Round 2<br />
                <span className="date">March 18</span>
              </div>
              <ul className="matchup">
                <li className="team team-top">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
                <li className="team team-bottom">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
              </ul>
              <ul className="matchup">
                <li className="team team-top">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
                <li className="team team-bottom">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
              </ul>
              <ul className="matchup">
                <li className="team team-top">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
                <li className="team team-bottom">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
              </ul>
              <ul className="matchup">
                <li className="team team-top">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
                <li className="team team-bottom">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
              </ul>
            </div>{" "}
            {/*<!-- END ROUND TWO -->*/}
            <div className="round round-three">
              <div className="round-details">
                Round 3<br />
                <span className="date">March 22</span>
              </div>
              <ul className="matchup">
                <li className="team team-top">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
                <li className="team team-bottom">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
              </ul>
              <ul className="matchup">
                <li className="team team-top">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
                <li className="team team-bottom">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
              </ul>
            </div>{" "}
            {/*<!-- END ROUND THREE -->*/}
          </div>

          <div className="champion">
            <div className="semis-l">
              <div className="round-details">
                west semifinals <br />
                <span className="date">March 26-28</span>
              </div>
              <ul className="matchup championship">
                <li className="team team-top">
                  &nbsp;<span className="vote-count">&nbsp;</span>
                </li>
                <li className="team team-bottom">
                  &nbsp;<span className="vote-count">&nbsp;</span>
                </li>
              </ul>
            </div>
            <div className="final">
              <i className="fa fa-trophy"></i>
              <div className="round-details">
                championship <br />
                <span className="date">March 30 - Apr. 1</span>
              </div>
              <ul className="matchup championship">
                <li className="team team-top">
                  &nbsp;<span className="vote-count">&nbsp;</span>
                </li>
                <li className="team team-bottom">
                  &nbsp;<span className="vote-count">&nbsp;</span>
                </li>
              </ul>
            </div>
            <div className="semis-r">
              <div className="round-details">
                east semifinals <br />
                <span className="date">March 26-28</span>
              </div>
              <ul className="matchup championship">
                <li className="team team-top">
                  &nbsp;<span className="vote-count">&nbsp;</span>
                </li>
                <li className="team team-bottom">
                  &nbsp;<span className="vote-count">&nbsp;</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="split split-two">
            <div className="round round-three">
              <div className="round-details">
                Round 3<br />
                <span className="date">March 22</span>
              </div>
              <ul className="matchup">
                <li className="team team-top">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
                <li className="team team-bottom">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
              </ul>
              <ul className="matchup">
                <li className="team team-top">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
                <li className="team team-bottom">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
              </ul>
            </div>{" "}
            {/*<!-- END ROUND THREE -->  */}
            <div className="round round-two">
              <div className="round-details">
                Round 2<br />
                <span className="date">March 18</span>
              </div>
              <ul className="matchup">
                <li className="team team-top">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
                <li className="team team-bottom">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
              </ul>
              <ul className="matchup">
                <li className="team team-top">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
                <li className="team team-bottom">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
              </ul>
              <ul className="matchup">
                <li className="team team-top">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
                <li className="team team-bottom">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
              </ul>
              <ul className="matchup">
                <li className="team team-top">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
                <li className="team team-bottom">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
              </ul>
            </div>{" "}
            {/*<!-- END ROUND TWO -->*/}
            <div className="round round-one current">
              <div className="round-details">
                Round 1<br />
                <span className="date">March 16</span>
              </div>
              <ul className="matchup">
                <li className="team team-top">
                  Minnesota<span className="score">62</span>
                </li>
                <li className="team team-bottom">
                  Northwestern<span className="score">54</span>
                </li>
              </ul>
              <ul className="matchup">
                <li className="team team-top">
                  Michigan<span className="score">68</span>
                </li>
                <li className="team team-bottom">
                  Iowa<span className="score">66</span>
                </li>
              </ul>
              <ul className="matchup">
                <li className="team team-top">
                  Illinois<span className="score">64</span>
                </li>
                <li className="team team-bottom">
                  Wisconsin<span className="score">56</span>
                </li>
              </ul>
              <ul className="matchup">
                <li className="team team-top">
                  Purdue<span className="score">36</span>
                </li>
                <li className="team team-bottom">
                  Boise State<span className="score">40</span>
                </li>
              </ul>
              <ul className="matchup">
                <li className="team team-top">
                  Penn State<span className="score">38</span>
                </li>
                <li className="team team-bottom">
                  Indiana<span className="score">44</span>
                </li>
              </ul>
              <ul className="matchup">
                <li className="team team-top">
                  Ohio State<span className="score">52</span>
                </li>
                <li className="team team-bottom">
                  VCU<span className="score">80</span>
                </li>
              </ul>
              <ul className="matchup">
                <li className="team team-top">
                  USC<span className="score">58</span>
                </li>
                <li className="team team-bottom">
                  Cal<span className="score">59</span>
                </li>
              </ul>
              <ul className="matchup">
                <li className="team team-top">
                  Virginia Tech<span className="score">74</span>
                </li>
                <li className="team team-bottom">
                  Dartmouth<span className="score">111</span>
                </li>
              </ul>
            </div>{" "}
            {/* END ROUND ONE -->*/}
          </div>
        </div>
      </section>
      <section className="share">
        <div className="share-wrap">
          <a className="share-icon" href="https://twitter.com/_joebeason">
            <i className="fa fa-twitter"></i>
          </a>
          <a className="share-icon" href="#">
            <i className="fa fa-facebook"></i>
          </a>
          <a className="share-icon" href="#">
            <i className="fa fa-envelope"></i>
          </a>
        </div>
      </section>
    </div>
  );
};

export default TournamentBracket;
