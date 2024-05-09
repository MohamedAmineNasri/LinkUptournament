import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import MatchCard from "./match";
import AddMatchPopUpWindow from "./AddMatchPopUpWindow";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import EditPopUpSelectedMatch from "./update";
import DeleateMatchPopUp from "./DeleateMatchPopUp";
import not_found from "../../../public/assets/images/not found.png";
// import Button from "react-bootstrap/Button";
import DefaultLayout from "../../Dashboard/src/layout/DefaultLayout";
import { Button } from "@material-tailwind/react";

export const FetchTour = ({ tournamentId }) => {
  const [TournementId, setTournementId] = useState([]);
  const [Team1name, setTeam1name] = useState([]);
  const [Team1logo, setTeam1logo] = useState([]);
  const [Team2name, setTeam2name] = useState([]);
  const [Team2logo, setTeam2logo] = useState([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/match/tourn/${tournamentId}`
        );
        setTournementId(response.data);
        console.log(response.data);
        /*  response.data.map(async (tournData, index) => {
          console.log(tournData);
          let teamOne = await axios.get(
            `http://localhost:8000/team/getTeam/${response.data[index].team1}`
          );
          let teamTwo = await axios.get(
            `http://localhost:8000/team/getTeam/${response.data[index].team2}`
          );
          setTeam1name((prevState) => [...prevState, teamOne.data.TeamName]);
          setTeam2name((prevState) => [...prevState, teamTwo.data.TeamName]);
          setTeam1logo((prevState) => [...prevState, teamOne.data.TeamLogo]);
          setTeam2logo((prevState) => [...prevState, teamTwo.data.TeamLogo]);
        });*/
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    const fetchMatchesWithTeamDetails = async () => {
      try {
        const matchesResponse = await axios.get(
          `http://localhost:8000/match/tourn/${tournamentId}`
        );

        const team2 = matchesResponse.data.map((e) => e.team2);
        const teamPromises2 = team2.map((teamId) =>
          axios.get(`http://localhost:8000/team/getTeam/${teamId}`)
        );

        try {
          const teamResponses2 = await Promise.all(teamPromises2);
          const teamNames2 = teamResponses2.map(
            (response) => response.data.TeamName
          );
          const teamNameslogo2 = teamResponses2.map(
            (response) => response.data.TeamLogo
          );
          setTeam2name(teamNames2);
          setTeam2logo(teamNameslogo2);
        } catch (error) {
          console.error("Error fetching team data:", error);
        }

        const team1 = matchesResponse.data.map((e) => e.team1);
        const teamPromises1 = team1.map((teamId) =>
          axios.get(`http://localhost:8000/team/getTeam/${teamId}`)
        );

        try {
          const teamResponses1 = await Promise.all(teamPromises1);
          const teamNames1 = teamResponses1.map(
            (response) => response.data.TeamName
          );
          const teamNameslogo1 = teamResponses1.map(
            (response) => response.data.TeamLogo
          );
          setTeam1name(teamNames1);
          setTeam1logo(teamNameslogo1);
        } catch (error) {
          console.error("Error fetching team data:", error);
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchTournaments();
    fetchMatchesWithTeamDetails();
  }, [tournamentId]);

  //if (true) {
  if (TournementId.length === 0) {
    return (
      <div style={{ backgroundColor: "rgb(35, 79, 30)" }}>
        <AddMatchPopUpWindow tournamentId={tournamentId} />
        <br />
        Loading tournament...
      </div>
    );
  }
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-3 py-2 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="site-section bg-dark ">
          {/* <AddMatchPopUpWindow
            tournamentId={tournamentId}
          ></AddMatchPopUpWindow> */}
          <div className="container">
            <div className="row">
              <div className="col-12 title-section">
                <h2 className="heading">Upcoming Match</h2>
              </div>
              {TournementId.slice()
                .reverse()
                .map((match, index) => (
                  <div key={match._id} className="col-lg-6 mb-4">
                    <div className="bg-light p-4 rounded">
                      <div className="widget-body">
                        <div className="widget-vs">
                          <div className="flex justify-between items-center">
                            <div className="team-1 text-center">
                              <img
                                src={Team1logo.slice().reverse()[index]}
                                alt="Image"
                              />
                              <h3>{Team1name.slice().reverse()[index]}</h3>
                            </div>
                            <div>
                              <span className="vs">
                                <span className="flex items-center justify-center">
                                  VS
                                </span>
                              </span>
                              <span>
                                <span className="flex items-center justify-center">
                                  {match.goal1.length}:{match.goal2.length}
                                </span>
                              </span>
                            </div>
                            <div className="team-2 text-center">
                              <img
                                src={Team2logo.slice().reverse()[index]}
                                alt="Image"
                              />
                              <h3>{Team2name.slice().reverse()[index]}</h3>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center widget-vs-contents mb-4">
                        <h4>{match.matchstatus}</h4>
                        <p className="mb-5">
                          <span className="block text-yellow-500">
                            {match.matchTime}
                          </span>
                          <span className="block">{match.date}</span>
                          <span className="block">{match.startingtime}</span>
                          <strong className="text-primary">
                            {match.tournamentName}
                          </strong>
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <EditPopUpSelectedMatch
                          matchid={match._id}
                          referee={match.referee}
                          logo={match.logo}
                          matchstatus={match.matchstatus}
                          team1={match.team1}
                          team2={match.team2}
                          weathercondition={match.weathercondition}
                          startingtime={match.startingtime}
                          matchtype={match.matchtype}
                          location={match.location}
                          tournementId={match.tournId}
                          team1Gols={match.team1Gols}
                          team2Gols={match.team2Gols}
                          date={match.date}
                        />
                        {/*
                         */}
                        <DeleateMatchPopUp matchid={match._id} />
                        <Link
                          to={`/panel/${match._id}`}
                          tournementId={match.tournementId}
                        >
                          <Button
                            size="lg"
                            variant="outline-info"
                            className="bg-yellow-300 text-black
                        "
                          >
                            Referee
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FetchTour;
