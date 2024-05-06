import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function BracketGenerator() {
  const location = useLocation();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (location.state) {
      setTeams([...location.state]);
    }
  }, [location.state]);

  // Generate bracket data whenever teams change
  useEffect(() => {
    const generateBracket = () => {
      // Logic to generate bracket data based on the number of teams
      // For simplicity, let's assume a single-elimination bracket
      const numRounds = Math.ceil(Math.log2(teams.length));
      const bracketData = Array.from({ length: numRounds }, (_, roundIndex) => {
        const numMatches = Math.pow(2, numRounds - roundIndex - 1);
        return Array.from({ length: numMatches }, (_, matchIndex) => ({
          home: teams[matchIndex * 2]?.TeamName || "Team",
          away: teams[matchIndex * 2 + 1]?.TeamName || "Team",
        }));
      });
      return bracketData;
    };

    setBracket(generateBracket());
  }, [teams]);

  const [bracket, setBracket] = useState([]);

  return (
    <div className="max-w-lg mx-auto">
      {/* Render the bracket UI using the bracket data */}
      {bracket.map((round, roundIndex) => (
        <div key={roundIndex} className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Round {roundIndex + 1}</h3>
          {round.map((matchup, matchupIndex) => (
            <div
              key={matchupIndex}
              className="flex items-center justify-between mb-2"
            >
              {/* Render matchup UI */}
              <div className="flex items-center">
                <div className="w-50 h-30 bg-gray-200 rounded flex items-center justify-center mr-4">
                  <span className="font-semibold text-gray-800">
                    {matchup.home}
                  </span>
                </div>
                <span className="text-gray-600 dark:text-white">vs</span>
                <div className="w-50 h-30 bg-gray-200 rounded flex items-center justify-center ml-4">
                  <span className="font-semibold text-gray-800">
                    {matchup.away}
                  </span>
                </div>
              </div>
              {/* You can add more styling here for the matchup */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default BracketGenerator;
