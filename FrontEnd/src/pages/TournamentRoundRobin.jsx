import React, { useState } from "react";
import Header from "../components/Header";
import { Win, Draw, Lose } from "../components/GroupStageLogo";
import { Button } from "react-bootstrap";
import { Tooltip } from "react-tooltip";
const TournamentRoundRobin = () => {
  const TeamsData = [
    {
      Team: "Napoli",
      MP: 0,
      W: 0,
      D: 0,
      L: 0,
      G: "0:0",
      GD: 0,
      PTS: 0,
    },
    {
      Team: "PSG",
      MP: 0,
      W: 0,
      D: 0,
      L: 0,
      G: "0:0",
      GD: 0,
      PTS: 0,
    },

    {
      Team: "Porto",
      MP: 0,
      W: 0,
      D: 0,
      L: 0,
      G: "0:0",
      GD: 0,
      PTS: 0,
    },
    {
      Team: "FC Barcelona",
      MP: 0,
      W: 0,
      D: 0,
      L: 0,
      G: "0:0",
      GD: 0,
      PTS: 0,
    },
  ];

  const getAlphabetLetter = (index) => {
    return String.fromCharCode(65 + index);
  };

  return (
    <div>
      <Header />
      <div
        className="row align-items-center"
        style={{ height: "100vh", margin: 0 }}
      >
        <div className="col mx-auto text-center mt-5 addMarg">
          <div className="container">
            {Array.from({ length: 4 }, (_, index) => (
              <table className="table table-dark" key={index}>
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "5%" }}>
                      #
                    </th>
                    <th
                      scope="col"
                      colSpan="12"
                      style={{ width: "45%", textAlign: "justify" }}
                    >
                      GROUP {getAlphabetLetter(index)}
                    </th>
                    <th scope="col" style={{ width: "5%" }}>
                      MP
                    </th>
                    <th scope="col" style={{ width: "5%" }}>
                      W
                    </th>
                    <th scope="col" style={{ width: "5%" }}>
                      D
                    </th>
                    <th scope="col" style={{ width: "5%" }}>
                      L
                    </th>
                    <th scope="col" style={{ width: "5%" }}>
                      G
                    </th>
                    <th scope="col" style={{ width: "5%" }}>
                      GD
                    </th>
                    <th scope="col" style={{ width: "5%" }}>
                      PTS
                    </th>
                    <th scope="col" colSpan="4" style={{ width: "20%" }}>
                      FORM
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {TeamsData.map((team, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td colSpan="12" style={{ textAlign: "justify" }}>
                          <img
                            src="/public/assets/images/TeamLogo.svg"
                            alt="team_logo"
                            style={{
                              width: "24px",
                              paddingBottom: "8px",
                              marginRight: "8px",
                            }}
                          />

                          {team.Team}
                        </td>
                        <td>{team.MP}</td>
                        <td>{team.W}</td>
                        <td>{team.D}</td>
                        <td>{team.L}</td>
                        <td>{team.G}</td>
                        <td>{team.GD}</td>
                        <td>{team.PTS}</td>
                        <td
                          colSpan="4"
                          className="d-flex justify-content-start pl-4"
                        >
                          <Win />
                          <div style={{ margin: "0 2px" }}></div>
                          <Lose />
                          <div style={{ margin: "0 2px" }}></div>
                          <Win />
                          <div style={{ margin: "0 2px" }}></div>
                          <Draw />
                          <div style={{ margin: "0 2px" }}></div>
                          <Draw />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentRoundRobin;
