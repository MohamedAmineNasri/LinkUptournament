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
import Header from "../landingpage/Header";
import Footer from "../landingpage/Footer";
import "./twink.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

export const fetchtour = () => {
  const { tournamentId } = useParams();

  const [openDialog, setOpenDialog] = useState(false);
  const [firstTeam, setFirstTeam] = useState("");
  const [secondTeam, setSecondTeam] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const [TournementId, setTournementId] = useState([]);
  const [Team1name, setteam1name] = useState();
  const [Team1logo, setteam1logo] = useState();
  const [Team2name, setteam2name] = useState();
  const [Team2logo, setteam2logo] = useState();
  const [matchstatus, setmatchstatus] = useState();
  const [T1, sett1] = useState([]);
  const [T1go, sett1go] = useState([]);
  const [T2go, sett2go] = useState([]);
  const [T2, sett2] = useState([]);
  const [Weather, setweather] = useState([]);
  const [Location, setlocation] = useState([]);
  const [test, settest] = useState([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/match/${tournamentId}`
        );
        setTournementId(response.data);
        sett1(response.data.goal1);
        sett2(response.data.goal2);

        // Fetch and process team data for goal1
        const teamsWithNames1 = await Promise.all(
          response.data.goal1.map(async (teamId) => {
            const teamResponse1 = await axios.get(
              `http://localhost:8000/player/${teamId}`
            );
            console.log(teamResponse1.data);
            return teamResponse1.data.name + " " + teamResponse1.data.number;
          })
        );

        sett1go(teamsWithNames1);

        // Fetch and process team data for goal2
        const teamsWithNames2 = await Promise.all(
          response.data.goal2.map(async (teamId) => {
            const teamResponse2 = await axios.get(
              `http://localhost:8000/player/${teamId}`
            );
            return teamResponse2.data.name + " " + teamResponse2.data.number;
          })
        );
        sett2go(teamsWithNames2);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    const fetchMatchesWithTeamDetails = async () => {
      try {
        const matchesResponse = await axios.get(
          "http://localhost:8000/match/" + tournamentId
        );

        const team2 = matchesResponse.data.team2;

        const teamPromises2 = await axios.get(
          `http://localhost:8000/team/getTeam/${team2}`
        );

        try {
          const teamResponses2 = teamPromises2;

          // Extract team names from responses
          const teamNames2 = teamResponses2.data.TeamName;
          setSecondTeam(teamResponses2.data);
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

        try {
          const teamResponses1 = await teamPromises1;

          // Extract team names from responses
          const teamNames1 = teamResponses1.data.TeamName;
          setFirstTeam(teamResponses1.data);
          const teamNameslogo1 = teamResponses1.data.TeamLogo;
          setteam1name(teamNames1);
          setteam1logo(teamNameslogo1);
          // console.log("Team Names:1", teamNames1,"team1logo",teamNameslogo1);
          const weather = await axios.get(
            "http://api.openweathermap.org/data/2.5/forecast?id=" +
              matchesResponse.data.location +
              "&dt=1712750400&appid=f30fae93770f8d10eec128c5c8627b54"
          );
          setweather(weather.data);
          // console.log(matchesResponse.data.date)
          setlocation(weather.data.city.name);
          // console.log(weather.data.list[0].weather[0].description,"gtgtgtrgtrgtr")
          setweather(weather.data.list[0].weather[0]);
        } catch (error) {
          console.error("Error fetching team data:", error);
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchTournaments();
    fetchMatchesWithTeamDetails();

    //
  }, [T2, T1, TournementId.startingtime]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:8000/match/${tournamentId}`
      );

      sett1(response.data.goal1);
      sett2(response.data.goal2);
      settest(response.data.matchTime);
    };
    fetch();
  }, [T1, T2, TournementId.matchTime]);
  console.log(firstTeam);
  return (
    <>
      <Header />
      <div className="site-section bg-dark">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-12">
              <div className="widget-next-match">
                <div className="widget-title">
                  <h3>{TournementId.tournamentName}</h3>
                </div>
                <div className="widget-body mb-3">
                  <div className="widget-vs mt-10">
                    <div className="flex justify-around items-center w-full">
                      <div
                        className="team-1 text-center cursor-pointer"
                        onClick={() => {
                          handleClickOpen();
                          setSelectedTeam(firstTeam);
                        }}
                      >
                        <img src={Team1logo} alt="Image" />
                        <h1>{Team1name}</h1>
                      </div>
                      <div className="flex items-center space-x-4 ">
                        <span className="vs flex gap-4">
                          <p>{T1.length}</p>
                          <span>VS</span>
                          <p>{T2.length}</p>
                        </span>
                      </div>
                      <div
                        className="team-2 text-center cursor-pointer"
                        onClick={() => {
                          handleClickOpen();
                          setSelectedTeam(secondTeam);
                        }}
                      >
                        <img src={Team2logo} alt="Image" />
                        <h1>{Team2name}</h1>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center widget-vs-contents mb-4 ">
                  <h4>{TournementId.matchstatus}</h4>
                  <p className="mb-5">
                    <span className="d-block text-yellow-500 animate-twinkle">
                      "{TournementId.matchTime}
                    </span>{" "}
                    <br />
                    <span className="d-block">{TournementId.date}</span>
                    <br />
                    <span className="d-block">{TournementId.startingtime}</span>
                    <br />
                    <strong className="text-primary">
                      {TournementId.matchtype}
                    </strong>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      <svg
                        fill="#ffff"
                        version="1.1"
                        height="4%"
                        width="4%"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 221.538 221.538"
                        xml:space="preserve"
                        stroke="#ffff"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <g>
                            {" "}
                            <g>
                              {" "}
                              <path d="M158.389,81.099c-3.009,7.71-12.826,27.33-34.88,27.33c-0.099,0-60.939,60.828-81.83,81.711 c-3.837,3.843-10.524,4.392-14.946,1.248l-23.24-16.539l0.901,8.265l30.468,21.717c4.417,3.148,10.964,2.454,14.623-1.548 l55.305-60.548l47.758,24.456c20.691,9.274,48.358-7.514,61.801-37.484c9.538-21.277,9.295-43.434,0.983-57.845L158.389,81.099z"></path>{" "}
                              <path d="M25.899,188.318c4.422,3.143,11.13,2.589,14.975-1.232l81.698-81.193c25.093,1.642,34.104-27.553,34.104-27.553 l60.563-9.817l-14.779-9.15c3.506-5.432,6.131-10.905,7.597-15.975c2.973-10.304,1.062-18.962-5.38-24.358 c-4.557-3.827-12.49-7.063-24.348-0.699c-7.255,3.884-13.883,10.273-18.724,15.716l-17.477-10.827 c-22.918-3.822-45.829,19.102-45.829,19.102C79.746,75.072,60.101,69.609,60.101,69.609L1.637,159.051 c-2.969,4.535-1.786,10.76,2.636,13.908L25.899,188.318z M184.968,26.988c8.472-4.546,12.185-1.45,13.401-0.424 c3.376,2.827,4.132,7.576,2.247,14.11c-1.201,4.153-3.479,8.833-6.515,13.51l-24.006-14.872 C175.228,33.75,180.407,29.432,184.968,26.988z M101.173,44.811l52.928,29.096c-7.094,26.186-30.281,28.511-30.281,28.511 C85.08,99.963,61.892,72.82,61.892,72.82C85.212,76.506,101.173,44.811,101.173,44.811z"></path>{" "}
                            </g>{" "}
                          </g>{" "}
                        </g>
                      </svg>
                      &nbsp;&nbsp;{TournementId.referee}
                    </span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        fill="#ffff"
                        version="1.1"
                        height="4%"
                        width="4%"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 456.985 456.985"
                        xml:space="preserve"
                        stroke="#ffff"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <g>
                            {" "}
                            <g>
                              {" "}
                              <path d="M449.134,70.604H7.85c-4.34,0-7.85,3.518-7.85,7.85V378.53c0,4.349,3.51,7.851,7.85,7.851h441.284 c4.332,0,7.851-3.502,7.851-7.851V78.454C456.985,74.122,453.466,70.604,449.134,70.604z M441.284,362.829 c0,4.349-3.503,7.851-7.851,7.851H23.551c-4.34,0-7.851-3.502-7.851-7.851V94.155c0-4.332,3.511-7.851,7.851-7.851h409.882 c4.348,0,7.851,3.519,7.851,7.851V362.829z"></path>{" "}
                              <path d="M34.057,262.399h19.718c4.342,0,7.851-3.511,7.851-7.847v-52.095c0-4.34-3.508-7.851-7.851-7.851H34.057 c-4.342,0-7.851,3.511-7.851,7.851v52.095C26.207,258.881,29.715,262.399,34.057,262.399z M43.813,212.194L43.813,212.194 c0.022-0.008,0.058,0,0.088,0c0.022,0,0.046-0.008,0.068-0.008v0.016c1.673,0.08,3.001,1.445,3.001,3.14 c0,1.689-1.329,3.062-3.001,3.138v0.008c-0.022,0-0.052,0-0.076,0c-0.034,0-0.064,0-0.088,0v-0.008 c-1.671-0.084-2.998-1.449-2.998-3.138C40.815,213.647,42.142,212.282,43.813,212.194z M40.224,219.927 c0.042-0.108,0.097-0.196,0.159-0.281c0-0.008,0.008-0.008,0.008-0.008c0.022-0.042,0.05-0.072,0.08-0.102l0,0 c0.134-0.143,0.291-0.255,0.487-0.301l-0.008-0.03h0.068h0.15h0.068h5.356h0.072h0.138h0.074l-0.008,0.03 c0.194,0.046,0.353,0.15,0.487,0.301h0.006c0.032,0.03,0.054,0.06,0.078,0.102c0,0,0.006,0,0.006,0.008 c0.066,0.084,0.12,0.172,0.15,0.281l4.098,11.188c0.23,0.644-0.106,1.341-0.744,1.575c-0.643,0.23-1.349-0.101-1.579-0.744 l-2.577-6.628l0.473,7.146l2.342,13.501c0.178,0.829,0.006,1.611-1.07,1.747c-1.086,0.145-2.104-0.412-2.292-1.234l-2.338-11.706 l-2.342,11.706c-0.181,0.822-1.2,1.387-2.28,1.234c-1.086-0.136-1.25-0.914-1.07-1.747l2.338-13.501l0.471-7.146l-2.575,6.628 c-0.218,0.643-0.932,0.974-1.569,0.744c-0.644-0.227-0.974-0.932-0.748-1.575L40.224,219.927z"></path>{" "}
                              <path d="M425.682,194.607h-19.724c-4.341,0-7.851,3.511-7.851,7.851v52.095c0,4.336,3.51,7.847,7.851,7.847h19.724 c4.341,0,7.852-3.511,7.852-7.847v-52.095C433.534,198.118,430.023,194.607,425.682,194.607z"></path>{" "}
                              <path d="M215.988,97.452H67.709c-4.34,0-7.754,3.564-8.752,7.78c-2.919,12.343-12.629,22.061-24.972,24.99 c-4.216,1.004-7.778,4.418-7.778,8.75v26.755c0,4.332,3.508,7.851,7.851,7.851h40.97c4.342,0,7.851,3.519,7.851,7.851v7.444 c0,4.34,0.525,7.851,1.184,7.851h1.188c16.421,1.473,29.396,15.038,29.396,31.777c0,14.022-9.11,25.812-21.73,29.992 c-4.114,1.37-7.927,1.623-8.271,1.639c-0.314,0.017-0.629,0.017-0.629,0.017c-0.188,0.016-0.383,0.048-0.563,0.067 c-0.315,0.049-0.583,3.575-0.583,7.907c0,2.404,0,5.041,0,7.434c0,4.332-3.509,7.858-7.851,7.858H34.057 c-4.342,0-7.851,3.503-7.851,7.851v26.766c0,4.328,3.555,7.742,7.771,8.752c12.343,2.914,22.053,12.62,24.98,24.963 c0.998,4.216,4.412,7.79,8.752,7.79h148.287c4.342,0,7.851-3.507,7.851-7.851v-84.669c0-4.34-3.468-8.64-7.295-10.695 c-9.896-5.374-16.631-15.77-16.631-27.82s6.734-22.47,16.631-27.822c3.819-2.074,7.295-6.374,7.295-10.71v-84.667 C223.838,100.97,220.328,97.452,215.988,97.452z M189.125,128.91v-0.008c0.024,0,0.054,0.008,0.086,0.008 c0.022,0,0.056-0.008,0.08-0.008v0.016c1.671,0.076,2.998,1.453,2.998,3.14c0,1.688-1.327,3.062-2.998,3.14v0.006 c-0.024,0-0.058,0-0.08,0c-0.032,0-0.062,0-0.086,0v-0.006c-1.675-0.084-3-1.46-3-3.14 C186.125,130.362,187.449,128.988,189.125,128.91z M145.147,181.391L145.147,181.391c0.024-0.008,0.054,0,0.084,0 c0.024,0,0.058-0.008,0.08-0.008v0.016c1.671,0.076,2.998,1.452,2.998,3.138c0,1.687-1.327,3.063-2.998,3.14v0.008 c-0.022,0-0.056,0-0.08,0c-0.03,0-0.06,0-0.084,0v-0.008c-1.671-0.084-3.002-1.461-3.002-3.14 C142.145,182.852,143.476,181.476,145.147,181.391z M117.073,128.91v-0.008c0.022,0,0.054,0.008,0.088,0.008 c0.022,0,0.054-0.008,0.076-0.008v0.016c1.671,0.076,2.998,1.453,2.998,3.14c0,1.688-1.327,3.062-2.998,3.14v0.006 c-0.022,0-0.054,0-0.076,0c-0.034,0-0.066,0-0.088,0v-0.006c-1.671-0.084-2.998-1.46-2.998-3.14 C114.075,130.362,115.402,128.988,117.073,128.91z M117.073,287.369L117.073,287.369c0.022-0.008,0.054,0,0.088,0 c0.022,0,0.054-0.008,0.076-0.008v0.017c1.671,0.076,2.998,1.458,2.998,3.146c0,1.683-1.327,3.058-2.998,3.134v0.008 c-0.022,0-0.054,0-0.076,0c-0.034,0-0.066,0-0.088,0v-0.008c-1.671-0.084-2.998-1.463-2.998-3.134 C114.075,288.836,115.402,287.454,117.073,287.369z M124.21,307.863c-0.643,0.229-1.349-0.1-1.579-0.745l-2.577-6.624l0.479,7.146 l2.342,13.5c0.18,0.83,0.008,1.611-1.068,1.748c-1.086,0.156-2.112-0.413-2.292-1.242l-2.338-11.698l-2.351,11.698 c-0.181,0.837-1.2,1.398-2.284,1.242c-1.082-0.137-1.247-0.918-1.066-1.748l2.338-13.5l0.471-7.146l-2.575,6.624 c-0.218,0.646-0.932,0.974-1.569,0.745c-0.644-0.224-0.974-0.938-0.748-1.579l4.098-11.176c0.038-0.117,0.096-0.201,0.15-0.293 h0.008c0.022-0.048,0.05-0.076,0.08-0.108h0.008c0.134-0.145,0.291-0.244,0.487-0.292l-0.008-0.036h0.068h0.142h0.07h5.37h0.072 h0.15h0.068l-0.008,0.036c0.188,0.048,0.353,0.147,0.487,0.292h0.008c0.03,0.032,0.054,0.061,0.076,0.108h0.012 c0.062,0.092,0.114,0.176,0.152,0.293l4.092,11.176C125.184,306.926,124.847,307.631,124.21,307.863z M124.21,149.406 c-0.643,0.23-1.349-0.098-1.579-0.743l-2.577-6.626l0.479,7.144l2.342,13.501c0.18,0.832,0.008,1.611-1.068,1.753 c-1.086,0.141-2.112-0.415-2.292-1.242l-2.338-11.704l-2.351,11.704c-0.181,0.828-1.2,1.391-2.284,1.242 c-1.082-0.142-1.247-0.921-1.066-1.753l2.338-13.501l0.471-7.144l-2.575,6.626c-0.218,0.645-0.932,0.974-1.569,0.743 c-0.644-0.226-0.974-0.934-0.748-1.579l4.098-11.185c0.038-0.112,0.096-0.196,0.15-0.285c0-0.008,0.008-0.008,0.008-0.008 c0.022-0.038,0.05-0.068,0.08-0.098h0.008c0.134-0.142,0.291-0.254,0.487-0.298l-0.008-0.032h0.068h0.142h0.07h5.37h0.072h0.15 h0.068l-0.008,0.032c0.188,0.044,0.353,0.14,0.487,0.298h0.008c0.03,0.03,0.054,0.06,0.076,0.098c0,0,0.012,0,0.012,0.008 c0.062,0.088,0.114,0.185,0.152,0.285l4.092,11.185C125.184,148.472,124.847,149.173,124.21,149.406z M152.28,262.079 c-0.643,0.224-1.348-0.108-1.575-0.75l-2.577-6.624l0.473,7.146l2.338,13.501c0.18,0.817,0.008,1.606-1.066,1.755 c-1.084,0.145-2.104-0.425-2.292-1.242l-2.343-11.706l-2.346,11.706c-0.186,0.825-1.2,1.387-2.284,1.242 c-1.084-0.141-1.249-0.922-1.066-1.755l2.338-13.501l0.473-7.146l-2.577,6.624c-0.218,0.642-0.936,0.974-1.571,0.75 c-0.646-0.229-0.974-0.935-0.746-1.579l4.092-11.193c0.038-0.107,0.092-0.192,0.156-0.276c0-0.016,0.008-0.016,0.008-0.016 c0.024-0.028,0.046-0.061,0.076-0.092h0.008c0.135-0.152,0.293-0.261,0.487-0.305l-0.008-0.032h0.074h0.14h0.07h5.37h0.068h0.142 h0.072l-0.006,0.032c0.187,0.044,0.353,0.152,0.487,0.305h0.008c0.03,0.031,0.052,0.063,0.076,0.092c0,0,0.008,0,0.008,0.016 c0.06,0.084,0.118,0.169,0.148,0.276l4.098,11.193C153.254,261.145,152.917,261.843,152.28,262.079z M148.303,244.738 c0,1.688-1.327,3.058-2.998,3.134v0.008c-0.024,0-0.058,0-0.082,0c-0.03,0-0.061,0-0.084,0v-0.008 c-1.671-0.084-3.001-1.446-3.001-3.134c0-1.703,1.331-3.073,3.001-3.149v-0.008c0.024,0,0.054,0.008,0.084,0.008 c0.024,0,0.058-0.008,0.082-0.008v0.012C146.982,241.665,148.303,243.035,148.303,244.738z M152.28,201.887 c-0.643,0.226-1.348-0.104-1.575-0.748l-2.577-6.624l0.473,7.145l2.338,13.501c0.18,0.832,0.008,1.609-1.066,1.751 c-1.084,0.15-2.104-0.419-2.292-1.242l-2.343-11.702l-2.346,11.702c-0.186,0.831-1.2,1.393-2.284,1.242 c-1.084-0.143-1.249-0.92-1.066-1.751l2.338-13.501l0.473-7.145l-2.577,6.624c-0.218,0.644-0.936,0.974-1.571,0.748 c-0.646-0.227-0.974-0.936-0.746-1.579l4.092-11.187c0.038-0.11,0.092-0.194,0.156-0.283c0-0.008,0.008-0.008,0.008-0.008 c0.024-0.038,0.046-0.068,0.076-0.101h0.008c0.135-0.148,0.293-0.252,0.487-0.298l-0.008-0.03h0.074h0.14h0.07h5.37h0.068h0.142 h0.072l-0.006,0.03c0.187,0.046,0.353,0.15,0.487,0.298h0.008c0.03,0.032,0.052,0.062,0.076,0.101c0,0,0.008,0,0.008,0.008 c0.06,0.088,0.118,0.172,0.148,0.283l4.098,11.187C153.254,200.951,152.917,201.653,152.28,201.887z M181.44,147.827l4.09-11.185 c0.038-0.112,0.092-0.196,0.156-0.285c0-0.008,0.008-0.008,0.008-0.008c0.024-0.038,0.046-0.068,0.078-0.098h0.006 c0.135-0.142,0.293-0.254,0.487-0.298l-0.006-0.032h0.072h0.148h0.07h5.37h0.07h0.148h0.072l-0.006,0.032 c0.186,0.044,0.353,0.14,0.483,0.298h0.012c0.03,0.03,0.052,0.06,0.076,0.098c0,0,0.008,0,0.008,0.008 c0.06,0.088,0.118,0.185,0.156,0.285l4.089,11.185c0.227,0.645-0.11,1.346-0.747,1.579c-0.64,0.23-1.349-0.098-1.575-0.743 l-2.577-6.626l0.481,7.144l2.336,13.501c0.181,0.832,0.008,1.611-1.063,1.753c-1.086,0.141-2.114-0.415-2.292-1.242l-2.342-11.704 l-2.346,11.704c-0.181,0.828-1.201,1.391-2.285,1.242c-1.082-0.142-1.246-0.921-1.065-1.753l2.338-13.501l0.471-7.144 l-2.575,6.626c-0.219,0.645-0.936,0.974-1.573,0.743C181.541,149.18,181.209,148.472,181.44,147.827z M186.416,292.515 c0-1.703,1.326-3.073,2.997-3.149v-0.008c0.026,0,0.059,0.008,0.088,0.008c0.024,0,0.054-0.008,0.076-0.008v0.016 c1.675,0.076,3.001,1.455,3.001,3.142c0,1.688-1.326,3.059-3.001,3.135v0.008c-0.022,0-0.052,0-0.076,0c-0.03,0-0.062,0-0.088,0 v-0.008C187.742,295.573,186.416,294.202,186.416,292.515z M196.55,309.855c-0.644,0.232-1.349-0.093-1.579-0.733l-2.573-6.633 l0.479,7.146l2.338,13.501c0.181,0.826,0.008,1.607-1.068,1.747c-1.082,0.152-2.102-0.417-2.292-1.234l-2.338-11.705 l-2.347,11.705c-0.18,0.834-1.204,1.387-2.284,1.234c-1.086-0.14-1.25-0.913-1.07-1.747l2.342-13.501l0.467-7.146l-2.57,6.633 c-0.223,0.641-0.936,0.966-1.573,0.733c-0.643-0.221-0.974-0.926-0.743-1.571l4.089-11.185c0.038-0.116,0.092-0.2,0.154-0.284 c0-0.009,0.012-0.009,0.012-0.009c0.022-0.044,0.044-0.075,0.076-0.107h0.008c0.134-0.145,0.291-0.245,0.479-0.289l-0.008-0.032 h0.068h0.15h0.072h5.37h0.07h0.15h0.068l-0.008,0.032c0.188,0.044,0.353,0.145,0.487,0.289h0.008 c0.034,0.032,0.058,0.063,0.08,0.107c0,0,0.008,0,0.008,0.009c0.062,0.084,0.118,0.168,0.156,0.284l4.092,11.185 C197.524,308.93,197.187,309.627,196.55,309.855z"></path>{" "}
                              <path d="M424.625,283.414h-39.926c-4.34,0-7.851-3.511-7.851-7.851v-7.498c0-4.344-0.124-7.818-0.261-7.826 c-0.092-0.008-0.176-0.024-0.276-0.024h-0.396c-17.104-0.549-30.837-14.494-30.837-31.714c0-17.226,13.733-31.182,30.837-31.685 c0.188-0.016,0.337-0.03,0.465-0.046c0.252-0.03,0.484-3.572,0.484-7.909c0-2.398,0-5.035,0-7.423c0-4.34,3.503-7.859,7.851-7.859 h39.927c4.34,0,7.851-3.519,7.851-7.851v-26.755c0-4.332-3.575-7.747-7.791-8.75c-12.343-2.921-22.064-12.639-24.982-24.99 c-0.997-4.216-4.408-7.78-8.748-7.78H247.392c-4.344,0-7.853,3.519-7.853,7.851v84.667c0,4.336,3.469,8.645,7.288,10.71 c9.897,5.352,16.635,15.771,16.635,27.822s-6.737,22.461-16.635,27.82c-3.812,2.071-7.288,6.371-7.288,10.695v84.669 c0,4.344,3.509,7.851,7.853,7.851h143.562c4.34,0,7.75-3.559,8.748-7.774c2.921-12.343,12.627-22.064,24.982-24.979 c4.231-1.01,7.79-4.424,7.79-8.752v-26.766C432.475,286.933,428.964,283.414,424.625,283.414z M296.123,215.705L296.123,215.705 c0.012-0.008,0.044,0,0.076,0c0.028,0,0.06-0.008,0.084-0.008v0.016c1.671,0.076,2.998,1.449,2.998,3.14 c0,1.687-1.327,3.063-2.998,3.14V222c-0.024,0-0.056,0-0.084,0c-0.032,0-0.064,0-0.076,0l0,0c-1.671-0.084-3.006-1.455-3.006-3.14 C293.117,217.162,294.452,215.789,296.123,215.705z M303.251,236.215c-0.645,0.221-1.351-0.108-1.579-0.753l-2.576-6.625 l0.48,7.146l2.341,13.501c0.185,0.821,0.008,1.611-1.066,1.755c-1.082,0.145-2.107-0.421-2.292-1.242l-2.336-11.705l-2.356,11.705 c-0.177,0.83-1.194,1.387-2.284,1.242c-1.074-0.144-1.242-0.917-1.059-1.755l2.333-13.501l0.473-7.146l-2.573,6.625 c-0.216,0.645-0.938,0.974-1.574,0.753c-0.634-0.232-0.975-0.942-0.742-1.585l4.092-11.185c0.032-0.112,0.093-0.196,0.156-0.285 l0.008-0.008c0.021-0.038,0.045-0.068,0.076-0.102h0.009c0.136-0.146,0.288-0.25,0.473-0.296v-0.034h0.068h0.147h0.076h5.366 h0.068h0.148h0.076l-0.009,0.034c0.193,0.046,0.354,0.15,0.481,0.296h0.016c0.032,0.034,0.049,0.064,0.076,0.102v0.008 c0.068,0.088,0.124,0.172,0.161,0.285l4.087,11.185C304.225,235.267,303.889,235.966,303.251,236.215z"></path>{" "}
                            </g>{" "}
                          </g>{" "}
                        </g>
                      </svg>
                      &nbsp;&nbsp;{Location}{" "}
                    </span>
                    <div className="flex items-center justify-center">
                      <p>{Weather.description}</p>
                      <img
                        src={`http://openweathermap.org/img/w/${Weather.icon}.png`}
                        alt="Weather Icon"
                      />
                    </div>
                    <br></br>
                  </p>
                  <br />
                  <br />
                  <span>
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="flex team-vs">
                            <div className="team-1 w-1/2">
                              <div className="team-details w-full text-center">
                                <ul className="list-unstyled">
                                  {T1go.map((item, index) => (
                                    <li key={index}>
                                      {TournementId.team1goaltime[index]}"{" "}
                                      {item}{" "}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="team-2 w-1/2">
                              <div className="team-details w-full text-center">
                                <ul className="list-unstyled">
                                  {T2go.map((item, index) => (
                                    <li key={index}>
                                      {TournementId.team2goaltime[index]}"{" "}
                                      {item}{" "}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </span>

                  <div id="date-countdown2" className="pb-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog((prev) => !prev);
          setSelectedTeam("");
        }}
      >
        <DialogTitle sx={{ color: "black !important", textAlign: "center" }}>
          {selectedTeam.TeamName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedTeam?.avatar ? (
              <img src={selectedTeam.avatar} alt="lineup" />
            ) : (
              <>LineUp Not Found</>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </>
  );
};

export default fetchtour;
