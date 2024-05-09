import React, { useState, useEffect } from "react";
import Header from "../../components/landingpage/Header";
import Footer from "../../components/landingpage/Footer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";

const TournamentBracketFrontOffice = () => {
  const { id } = useParams();
  const location = useLocation();
  const [bracketStages, setBracketStages] = useState([]);
  useEffect(() => {
    if (location.state) {
      const tournamentId = location.state.tournamentId;
      fetchBracketStages(tournamentId);
    }
  }, [location.state]);

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

  return (
    <>
      <main className="grow">
        <div
          className={`font-inter antialiased bg-white text-gray-900 tracking-tight`}
        >
          <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            <Header />
            <section className="relative ">
              <div className=" px-4 sm:px-6 bg-red-200">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20 bg-blue-200">
                  {/* tournament content */}
                  <div className="pt-4 pb-24 ">
                    <div className="text-xl text-center  font-semibold text-black pb-8 bg-yellow-300">
                      {/* Bracket Content */}
                      <div className="mt-12 flex items-center gap-2 bg-green-300">
                        {/* Render the bracket stages */}
                        {bracketStages?.map(
                          ({ round, teams, scores }, index, array) => (
                            <div key={index} className="mb-8 flex-1">
                              <h3 className="text-lg font-semibold mb-4 text-black">
                                {index === array.length - 1 ? (
                                  "Winner"
                                ) : (
                                  <div className="text-black">
                                    Round {round}
                                  </div>
                                )}
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
                                                <div className="px-10">
                                                  {scores[teamIndex]}
                                                  <span className="text-primary font-medium p-2">
                                                    vs
                                                  </span>
                                                  {scores[teamIndex + 1]}
                                                </div>
                                                <div className="flex items-center gap-4">
                                                  <span>
                                                    {
                                                      teams[teamIndex + 1]
                                                        .TeamName
                                                    }
                                                  </span>
                                                  <img
                                                    src={
                                                      teams[teamIndex + 1]
                                                        .TeamLogo
                                                    }
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
                              </ul>
                            </div>
                          )
                        )}
                      </div>
                      {/* Bracket Content */}
                    </div>
                  </div>
                  {/* tournament content */}
                </div>
              </div>
            </section>
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
};

export default TournamentBracketFrontOffice;
