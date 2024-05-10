import React, { useState, useEffect } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";
import TournHeader from "./TournHeader";
import FetchTour from "../hamhoum/fetchmatchesByTournementId";

let matchData = {
  date: "",
  referee: "null",
  logo: "",
  startingtime: "",
  matchstatus: "Starting Soon",
  location: "",
  matchtype: "knockout",
  weathercondition: "",
  team1: null,
  team2: null,
  team1Gols: 0,
  team2Gols: 0,
  tournementId: null,
  card: [],
  tournamentName: "",
  goal1: [],
  goal2: [],
  w: null,
  price: 0,
  ticketNumber: 0,
  tournId: "",
};

function BracketGenerator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [bracketStages, setBracketStages] = useState([]);
  const [nav, setNav] = useState(true);
  useEffect(() => {
    if (location.state) {
      const tournamentId = location.state.tournamentId;
      fetchBracketStages(tournamentId);
    }
  }, [location.state]);

  const generateMatch = async (round, teams) => {
    let orderCounter = 0;
    for (let i = 0; i < teams.length; i += 2) {
      await axios.post("http://localhost:8000/match/", {
        ...matchData,
        team1: teams[i]._id,
        team2: teams[i + 1]._id,
        tournId: id,
        round: round,
        matchOrder: orderCounter,
      });
      orderCounter++;
    }
  };

  const fetchBracketStages = async (tournamentId) => {
    try {
      // Simulate fetching bracket stage data for the tournament
      let response = await axios.get(
        `http://localhost:8000/bracketStage/tournament/${id}`
      );

      const bracketStageData = response.data;

      // Set bracket stages with paired teams
      console.log(bracketStageData);
      setBracketStages(bracketStageData);
    } catch (error) {
      console.error("Error fetching bracket stage data:", error);
    }
  };

  const deleteTournament = async () => {
    await axios.delete(`http://localhost:8000/tourn/${id}`);
    navigate("/manage");
  };

  return (
    <div>
      <TournHeader
        setNav={setNav}
        nav={nav}
        nameOne={"Bracket"}
        nameTwo={"Matchs"}
      />
      {nav && (
        <div className="text-end">
          <button
            className="bg-red-500 btn flex"
            onClick={() => deleteTournament()}
          >
            Delete tournament
          </button>
        </div>
      )}
      {!nav && id && <FetchTour key={id} tournamentId={id} />}
      {nav && (
        <div className="max-w-2xl mx-auto mt-12">
          {/* Render the bracket stages */}
          {bracketStages?.map(({ round, teams, scores }, index, array) => (
            <div key={index} className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
                {index === array.length - 1 ? "Winner" : <>Round {round}</>}
              </h3>
              <ul>
                {teams.length == 1 ? (
                  <div className="bg-blue-gray-100 dark:bg-white p-8 rounded-md text-center">
                    <div className="text-black font-semibold flex items-center justify-center">
                      {teams[0].TeamName}
                    </div>
                  </div>
                ) : (
                  <>
                    {teams && teams.length > 0 ? (
                      teams?.map((team, teamIndex) => (
                        <li key={teamIndex} className="py-2 ">
                          {teamIndex % 2 === 0 &&
                          teamIndex < teams.length - 1 ? (
                            <div className="bg-blue-gray-100 dark:bg-white p-8 rounded-md text-center">
                              <div className="text-black font-semibold flex items-center justify-center">
                                <div className="flex items-center gap-4">
                                  <img
                                    src={team.TeamLogo}
                                    alt="logo"
                                    className="pb-3"
                                    width={40}
                                    height={40}
                                  />
                                  <span>{team.TeamName}</span>
                                </div>
                                <div className="px-16 md:px-24 lg:px-28 ">
                                  {scores[teamIndex]}
                                  <span className="text-primary font-medium p-2">
                                    vs
                                  </span>
                                  {scores[teamIndex + 1]}
                                </div>
                                <div className="flex items-center gap-4">
                                  <span>{teams[teamIndex + 1].TeamName}</span>
                                  <img
                                    src={teams[teamIndex + 1].TeamLogo}
                                    alt="logo"
                                    className="pb-3"
                                    width={40}
                                    height={40}
                                  />
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </li>
                      ))
                    ) : (
                      <li className="py-2">
                        No teams available for this round
                      </li>
                    )}
                  </>
                )}
                {index !== array.length - 1 ? (
                  <button
                    className="btn bg-primary"
                    onClick={() => generateMatch(round, teams)}
                  >
                    Generate
                  </button>
                ) : (
                  <></>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BracketGenerator;
