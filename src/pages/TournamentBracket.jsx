import React from "react";
import "./TournamentBracket.css";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

const TournamentBracket = () => {
  const location = useLocation();

  console.log(location.state);

  const teams = [
    [
      {
        name: "Team A",
        score: 30,
      },
      {
        name: "Team B",
        score: 25,
      },
    ],
    [
      {
        name: "Team C",
        score: 20,
      },
      {
        name: "Team D",
        score: 35,
      },
    ],
    [
      {
        name: "Team E",
        score: 28,
      },
      {
        name: "Team F",
        score: 22,
      },
    ],
    [
      {
        name: "Team G",
        score: 32,
      },
      {
        name: "Team H",
        score: 27,
      },
    ],
    [
      {
        name: "Team I",
        score: 18,
      },
      {
        name: "Team J",
        score: 23,
      },
    ],
    [
      {
        name: "Team K",
        score: 29,
      },
      {
        name: "Team L",
        score: 33,
      },
    ],
    [
      {
        name: "Team M",
        score: 26,
      },
      {
        name: "Team N",
        score: 31,
      },
    ],
    [
      {
        name: "Team O",
        score: 24,
      },
      {
        name: "Team P",
        score: 21,
      },
    ],
  ];

  return (
    <div>
      <div>
        <Header />
        
        <section id="bracket">
          <div class="container-custom my-5">
            <div class="split split-one">
              <div class="round round-one current">
                <div class="round-details">
                  Round 1<br />
                  <span class="date">March 16</span>
                </div>
                {teams.map((team) => {
                  return (
                    <ul class="matchup">
                      <li class="team team-top">
                        {team[0].name}
                        <span class="score-custom">
                          <div className="score-text-custom">
                            {team[0].score}
                          </div>
                        </span>
                      </li>
                      <li class="team team-bottom">
                        {team[1].name}
                        <span class="score-custom">
                          <div className="score-text-custom">
                            {team[1].score}
                          </div>
                        </span>
                      </li>
                    </ul>
                  );
                })}
              </div>
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
                {teams.map((team) => {
                  return (
                    <ul class="matchup">
                      <li class="team team-top">
                        {team[0].name}
                        <span class="score-custom">
                          <div className="score-text-custom">
                            {team[0].score}
                          </div>
                        </span>
                      </li>
                      <li class="team team-bottom">
                        {team[1].name}
                        <span class="score-custom">
                          <div className="score-text-custom">
                            {team[1].score}
                          </div>
                        </span>
                      </li>
                    </ul>
                  );
                })}
              </div>
              {/* END ROUND ONE -->*/}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TournamentBracket;
