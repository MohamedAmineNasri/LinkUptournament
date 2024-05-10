import React, { useEffect, useState } from "react";
import Header from "../../components/landingpage/Header";
import Footer from "../../components/landingpage/Footer";
import axios from "../../api/axios";
import { Bracket, Seed, SeedItem, SeedTeam } from "react-brackets";
import { useLocation, useParams } from "react-router-dom";

const TournamentBracketFrontOffice = () => {
  const { id } = useParams();
  const location = useLocation();
  const [bracketStagess, setBracketStagess] = useState([]);

  useEffect(() => {
    if (location.state) {
      const tournamentId = location.state.tournamentId;
      fetchBracketStages(tournamentId);
    }
  }, [location.state]);

  const fetchBracketStages = async (tournamentId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/bracketStage/tournament/${id}`
      );
      const bracketStageData = response.data;

      let transformedData = bracketStageData.map((stage, index) => ({
        title:
          index === bracketStageData.length - 1
            ? "Winner"
            : `Round ${stage.round}`,
        seeds: pairTeams(stage.teams, stage.scores),
      }));

      transformedData = transformedData
        .map((item) => ({ ...item })) // Create a shallow copy of each item
        .filter((item) => item.seeds.length > 0);

      console.log("transformedData", transformedData);
      setBracketStagess(transformedData);
    } catch (error) {
      console.error("Error fetching bracket stage data:", error);
    }
  };

  const pairTeams = (teams, scores) => {
    const pairedTeams = [];
    for (let i = 0; i < teams.length; i += 2) {
      pairedTeams.push({
        id: i / 2, // Seed ID
        teams: [
          { name: teams[i]?.TeamName || "", score: scores[i] || 0 },
          { name: teams[i + 1]?.TeamName || "", score: scores[i + 1] || 0 },
        ],
      });
    }
    return pairedTeams;
  };

  const CustomSeed = ({ seed }) => {
    console.log("CustomSeed ", seed);
    return (
      <Seed>
        <SeedItem>
          <div>
            {seed.teams[0].name !== "" && (
              <SeedTeam>
                <div>{seed.teams[0].name}</div>
                {seed.teams[1].name === "" ? null : (
                  <div>{seed.teams[0].score}</div>
                )}
              </SeedTeam>
            )}
            {seed.teams[1].name !== "" && (
              <SeedTeam>
                <div>{seed.teams[1].name}</div>
                {seed.teams[0].name === "" ? null : (
                  <div>{seed.teams[1].score}</div>
                )}
              </SeedTeam>
            )}
          </div>
        </SeedItem>
      </Seed>
    );
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
              <div className="max-w-6xl mx-auto px-4 sm:px-6  h-[95vh]">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20 ">
                  <h4 className="text-black text-center uppercase text-2xl font-semibold mb-30">
                    Stages
                  </h4>

                  <Bracket
                    rounds={bracketStagess}
                    renderSeedComponent={CustomSeed}
                  />
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
