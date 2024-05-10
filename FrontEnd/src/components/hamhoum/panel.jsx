import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import MatchCard from "./match";
import Button from "react-bootstrap/Button";
import AddMatchPopUpWindow from "./AddMatchPopUpWindow";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import EditPopUpSelectedMatch from "./update";
import DeleateMatchPopUp from "./DeleateMatchPopUp";
import not_found from "../../../public/assets/images/not found.png";
import { editMatch } from "../../redux/slice/matchSlice";
import { useDispatch } from "react-redux";
import DefaultLayout from "../../Dashboard/src/layout/DefaultLayout";
import Swal from "sweetalert2";
import Timer from "./timer";

export const fetchtour = (props) => {
  const { match } = useParams();
  const [Matchstatus, setmatchstatus] = useState();
  const [TournementId, setTournementId] = useState([]);
  const [Team1name, setteam1name] = useState();
  const [Team1logo, setteam1logo] = useState();
  const [Team2name, setteam2name] = useState();
  const [Team2logo, setteam2logo] = useState();
  const [T1, setT1] = useState([]);
  const [T2, setT2] = useState([]);
  const [l, setl] = useState();
  const [T2playerid, sett2id] = useState([]);
  const [T2playername, sett2name] = useState([]);
  const [T1playername, sett1name] = useState([]);
  const [T1playerid, sett1id] = useState([]);
  const [W, setw] = useState();
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [matchTime, setmatchTime] = useState(0);
  const [team1goaltime, setteam1goaltime] = useState([]);
  const [team2goaltime, setteam2goaltime] = useState([]);

  const handleShow = () => MatchCard;
  const dispatch = useDispatch();
  const handleSaveChanges = () => {
    localStorage.setItem("Timer", timeLeft);

    dispatch(
      editMatch({
        team1goaltime: team1goaltime,
        team2goaltime: team2goaltime,
        matchid: match,
        goal1: T1,
        goal2: T2,
        matchTime: matchTime,
      })
    );

    // window.location.reload();
  };
  const handleEndMatch = async () => {
    const response = await axios.get("http://localhost:8000/match/" + match);
    console.log("end__________________", response.data.goal1.length);
    let order = response.data.matchOrder;
    console.log("TeamOne_________", response.data.team1);

    const res = await axios.get(
      `http://localhost:8000/bracketStage/tournament/${response.data.tournId}/${response.data.round + 1}`
    );
    const resForUpdatingScore = await axios.get(
      `http://localhost:8000/bracketStage/tournament/${response.data.tournId}/${response.data.round}`
    );
    console.log("resForUpdatingScore___________", resForUpdatingScore.data);
    const teamsArray = resForUpdatingScore.data.teams;

    //updateScore

    console.log("for update ", resForUpdatingScore.data._id);

    let indexTeamOne = teamsArray.indexOf(response.data.team1);
    console.log("indexTeamOne", indexTeamOne);
    let indexTeamTwo = teamsArray.indexOf(response.data.team2);
    console.log("indexTeamTwo", indexTeamTwo);
    let scores = resForUpdatingScore.data.scores;
    scores[indexTeamOne] = response.data.goal1.length || 0;
    scores[indexTeamTwo] = response.data.goal2.length || 0;
    console.log(scores);
    await axios.put(
      `http://localhost:8000/bracketStage/${resForUpdatingScore.data._id}`,
      { scores }
    );
    //updateScore

    let fetchedTeams = res.data.teams;
    if (response.data.goal2.length > response.data.goal1.length) {
      fetchedTeams[order] = response.data.team2;
      await axios.put(`http://localhost:8000/bracketStage/${res.data._id}`, {
        teams: fetchedTeams,
      });
    } else {
      fetchedTeams[order] = response.data.team1;
      await axios.put(`http://localhost:8000/bracketStage/${res.data._id}`, {
        teams: fetchedTeams,
      });
    }

    if (response.data.matchtype == "Final") {
      await axios.put(
        "http://localhost:8000/tournament/update/" + response.data.tournementId,
        { winner: W }
      );
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, end it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // If user clicks "Yes", execute the winer function
        localStorage.removeItem("Timer");

        setTimerRunning(false);
        winer();

        setmatchstatus("Finished");
      }
    });
    //to fix
    // await axios.put('http://localhost:8000/group/updatetgroupaftermatch/'+match)
  };
  const dispatch2 = useDispatch();
  const winer = () => {
    dispatch2(
      editMatch({
        matchid: match,
        matchstatus: "Finished",
        w: W,
        matchTime: matchTime,
        l: l,
      })
    );
  };
  useEffect(() => {
    setTimeLeft(Number(localStorage.getItem("Timer")));

    setmatchTime(Math.floor(timeLeft / 60));
    console.log(Math.floor(timeLeft / 60));

    const fetchTournaments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/match/" + match
        );
        if (
          response.data.matchtype == "Final" &&
          response.data.matchstatus == "Finished"
        ) {
          await axios.put(
            "http://localhost:8000/tournament/update/" +
              response.data.tournementId,
            { winner: W }
          );
        }

        setTournementId(response.data);

        setT1(response.data.goal1);
        setT2(response.data.goal2);

        await axios.get(
          `http://localhost:8000/bracketStage/tournament/${response.data.tournId}`
        );
        //console.log(response.data.tournId, "tournId");
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    const fetchMatchesWithTeamDetails = async () => {
      try {
        const matchesResponse = await axios.get(
          "http://localhost:8000/match/" + match
        );
        console.log(matchesResponse.data.team1);

        if (matchesResponse.data.matchstatus == "Finished") {
          setmatchstatus("Finished");
        }
        if (
          matchesResponse.data.goal1.length > matchesResponse.data.goal2.length
        ) {
          setw(matchesResponse.data.team1), setl(matchesResponse.data.team2);
        }

        if (
          matchesResponse.data.goal1.length < matchesResponse.data.goal2.length
        ) {
          setw(matchesResponse.data.team2), setl(matchesResponse.data.team1);
        }
        if (
          matchesResponse.data.goal1.length == matchesResponse.data.goal2.length
        ) {
          setw(null), setl(null);
        }

        const team2 = matchesResponse.data.team2;

        const teamPromises2 = await axios.get(
          `http://localhost:8000/team/getTeam/${team2}`
        );
        const getteam2player = await axios.get(
          `http://localhost:8000/player/team/${team2}`
        );

        try {
          const teamResponses2 = await teamPromises2;
          const playerResponse2name = await (
            await getteam2player
          ).data.map((e) => e.name + " " + e.number);
          sett2name(playerResponse2name);
          const playerResponse2id = await (
            await getteam2player
          ).data.map((e) => e._id);
          sett2id(playerResponse2id);

          // Extract team names from responses
          const teamNames2 = teamResponses2.data.TeamName;

          const teamNameslogo2 = teamResponses2.data.TeamLogo;

          setteam2name(teamNames2);
          setteam2logo(teamNameslogo2);
          //    console.log("Team Names:2", teamNames2,"team2logo",teamNameslogo2);
        } catch (error) {
          console.error("Error fetching team data:", error);
        }
        const team1 = matchesResponse.data.team1;
        const teamPromises1 = axios.get(
          `http://localhost:8000/team/getTeam/${team1}`
        );
        const getteam1player = axios.get(
          `http://localhost:8000/player/team/${team1}`
        );

        try {
          const teamResponses1 = await teamPromises1;
          const playerResponse1name = await (
            await getteam1player
          ).data.map((e) => e.name + " " + e.number);
          sett1name(playerResponse1name);
          const playerResponse1id = await (
            await getteam1player
          ).data.map((e) => e._id);
          sett1id(playerResponse1id);

          // Extract team names from responses
          const teamNames1 = teamResponses1.data.TeamName;
          const teamNameslogo1 = teamResponses1.data.TeamLogo;
          setteam1name(teamNames1);
          setteam1logo(teamNameslogo1);

          // console.log("Team Names:1", teamNames1,"team1logo",teamNameslogo1);
        } catch (error) {
          console.error("Error fetching team data:", error);
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchTournaments();
    fetchMatchesWithTeamDetails();
    let intervalId;

    if (timerRunning) {
      intervalId = setInterval(async () => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft < 2700) {
            // 45 minutes = 2700 seconds
            axios.put(`http://localhost:8000/match/${match}`, {
              matchTime: Math.floor(prevTimeLeft / 60),
            });
            return prevTimeLeft + 1;
          } else if (prevTimeLeft < 5400) {
            // 90 minutes = 5400 seconds
            // Stop timer at 45 minutes
            if (prevTimeLeft === 2700) {
              stopTimer();
            }
            return prevTimeLeft + 1;
          } else {
            // Stop timer at 90 minutes
            stopTimer();
            return prevTimeLeft;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [timerRunning, Matchstatus]);

  const startTimer = async () => {
    if (!timerRunning) {
      setTimeLeft(Number(localStorage.getItem("Timer")));

      try {
        await axios.put(`http://localhost:8000/match/${match}`, {
          matchstatus: "Started",
        });
      } catch (error) {
        console.error("Error updating match status:", error);
      }

      setTimerRunning(true);
    }
    if (timerRunning == 10) {
      setTimerRunning(false);
    }
  };
  const cancelgoal1 = async () => {
    try {
      setT1((prevT1) => prevT1.slice(0, -1));
      setteam1goaltime((prevT1) => prevT1.slice(0, -1));
      await axios.put(`http://localhost:8000/match/${match}`, {
        goal1: T1,
        team1goaltime: team1goaltime,
      });
    } catch (error) {
      console.error("Error updating match status:", error);
    }
  };
  const cancelgoal2 = async () => {
    try {
      setT2((prevT2) => prevT2.slice(0, -1));
      setteam2goaltime((prevT2) => prevT2.slice(0, -1));
      await axios.put(`http://localhost:8000/match/${match}`, {
        goal2: T2,
        team2goaltime: team2goaltime,
      });
    } catch (error) {
      console.error("Error updating match status:", error);
    }
  };
  const stopTimer = async () => {
    if (timerRunning) {
      try {
        localStorage.setItem("Timer", timeLeft);
        await axios.put(`http://localhost:8000/match/${match}`, {
          matchstatus: "On Hold",
        });
      } catch (error) {
        console.error("Error updating match status:", error);
      }
      setTimerRunning(false);
    }
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <>
      <DefaultLayout>
        <div className="site-section bg-dark">
          <Link to={`/manage/`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Return
            </button>
          </Link>
          <div className="container">
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="widget-next-match">
                  <div className="widget-title">
                    <h3>{TournementId.tournamentName}</h3>
                  </div>
                  <div className="widget-body mb-3">
                    <div className="widget-vs">
                      <div className="flex justify-between w-full items-center">
                        <div className="team-1 text-center">
                          <img src={Team1logo} alt="Image" />
                          <h1>{Team1name}</h1>
                        </div>
                        <div className="flex items-center justify-around">
                          <span className="vs">
                            {/* <Timer/> */}
                            {T1.length}
                            <span>VS</span> {T2.length}
                          </span>
                        </div>
                        <div className="team-2 text-center">
                          <img src={Team2logo} alt="Image" />
                          <h1>{Team2name}</h1>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <h4 className="text-primary">{TournementId.matchstatus}</h4>
                    <div>
                      <h1 className="text-black-200">
                        {" "}
                        {formatTime(timeLeft)}
                      </h1>
                      <button
                        disabled={Matchstatus === "Finished"}
                        onClick={startTimer}
                        className="text-red-500 mr-2"
                      >
                        Start
                      </button>
                      <button
                        disabled={Matchstatus === "Finished"}
                        onClick={stopTimer}
                        className="text-black-200 ml-2"
                      >
                        Pause
                      </button>
                    </div>

                    <p className="mb-5 ">
                      <span className="block font-medium">
                        {TournementId.date}
                      </span>
                      <span className="block font-medium">
                        {TournementId.startingtime}
                      </span>
                      <span className="block font-medium">
                        {TournementId.weathercondition}
                      </span>
                      <strong className="text-primary">
                        {TournementId.matchtype}
                      </strong>
                    </p>
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="flex team-vs">
                            <div className="team-1 w-1/2">
                              <div className="team-details w-full text-center">
                                <ul className="list-none">
                                  <li>{Team1name} Gola</li>
                                  <select
                                    disabled={Matchstatus === "Finished"}
                                    onChange={(e) => {
                                      setteam1goaltime([
                                        ...team1goaltime,
                                        Math.floor(timeLeft / 60),
                                      ]);
                                      setT1([...T1, e.target.value]);
                                    }}
                                    className="bg-black text-white"
                                  >
                                    <option>select player1</option>
                                    {T1playername.map((teamName, index) => (
                                      <option
                                        key={index}
                                        value={T1playerid[index]}
                                      >
                                        {teamName}
                                      </option>
                                    ))}
                                  </select>
                                  <button onClick={cancelgoal1}>
                                    Cancel goal 1
                                  </button>
                                </ul>
                              </div>
                            </div>
                            <div className="team-2 w-1/2">
                              <div className="team-details w-full text-center">
                                <ul className="list-none">
                                  <li>{Team2name} Gola</li>
                                  <select
                                    disabled={Matchstatus === "Finished"}
                                    onChange={(a) => {
                                      setteam2goaltime([
                                        ...team2goaltime,
                                        Math.floor(timeLeft / 60),
                                      ]);
                                      setT2([...T2, a.target.value]);
                                    }}
                                    className="bg-black text-white"
                                  >
                                    <option>select player2</option>
                                    {T2playername.map((teamName, index) => (
                                      <option
                                        key={index}
                                        value={T2playerid[index]}
                                      >
                                        {teamName}
                                      </option>
                                    ))}
                                  </select>
                                  <button onClick={cancelgoal2}>
                                    Cancel goal 2
                                  </button>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pb-1"></div>
                  </div>
                  <div className="flex justify-between">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handleSaveChanges}
                      disabled={Matchstatus === "Finished"}
                    >
                      Save Changes
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handleEndMatch}
                      disabled={Matchstatus === "Finished"}
                    >
                      End Match
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default fetchtour;
