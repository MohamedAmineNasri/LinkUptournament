import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";
import TournHeader from "./TournHeader";
import FetchTour from "../hamhoum/fetchmatchesByTournementId";

function BracketGenerator() {
  const { id } = useParams();
  const location = useLocation();
  const [bracketStages, setBracketStages] = useState([]);
  const [nav, setNav] = useState(true);
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
      setBracketStages(bracketStageData);
    } catch (error) {
      console.error("Error fetching bracket stage data:", error);
    }
  };

  return (
    <div>
      <TournHeader setNav={setNav} nav={nav} />
      {!nav && id && <FetchTour key={id} tournamentId={id} />}
      {nav && (
        <div className="max-w-2xl mx-auto mt-12">
          {/* Render the bracket stages */}
          {bracketStages?.map(({ round, teams }, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
                Round {round}
              </h3>
              <ul className="">
                {teams && teams.length > 0 ? (
                  teams?.map((team, teamIndex) => (
                    <li key={teamIndex} className="py-2 ">
                      {teamIndex % 2 === 0 && teamIndex < teams.length - 1 ? (
                        <div className="bg-blue-gray-100 dark:bg-white p-8 rounded-md text-center">
                          <div className="text-black font-semibold flex items-center justify-center">
                            {team.TeamName}
                            <span className="text-primary font-medium px-16 md:px-24 lg:px-28 ">
                              vs
                            </span>
                            {teams[teamIndex + 1].TeamName}
                          </div>
                        </div>
                      ) : null}
                    </li>
                  ))
                ) : (
                  <li className="py-2">No teams available for this round</li>
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
