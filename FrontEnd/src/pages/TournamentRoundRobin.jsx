import React from "react";
import Header from "../components/Header";
import { Win, Draw, Lose } from "../components/GroupStageLogo";
import { Col, Row } from "react-bootstrap";

const TournamentRoundRobin = () => {
  const TeamsData = [
    {
      Team: "Napoli",
      MP: 0,
      W: 0,
      D: 0,
      L: 0,
      G: 0,
      GD: 0,
      PTS: 0,
    },
    {
      Team: "PSG",
      MP: 0,
      W: 0,
      D: 0,
      L: 0,
      G: 0,
      GD: 0,
      PTS: 0,
    },

    {
      Team: "Porto",
      MP: 0,
      W: 0,
      D: 0,
      L: 0,
      G: 0,
      GD: 0,
      PTS: 0,
    },
    {
      Team: "FC Barcelona",
      MP: 0,
      W: 0,
      D: 0,
      L: 0,
      G: 0,
      GD: 0,
      PTS: 0,
    },
  ];

  return (
    <div>
      <Header />
      <div
        className="row align-items-center"
        style={{ height: "100vh", margin: 0 }}
      >
        <div className="col mx-auto text-center mt-5">
          <div className="container">
            <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "5%" }}>
                    #
                  </th>
                  <th scope="col" colspan="12" style={{ width: "45%" }}>
                    GROUP A
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
                  <th scope="col" colspan="4" style={{ width: "20%" }}>
                    FORM
                  </th>
                </tr>
              </thead>
              <tbody>
                {TeamsData.map((team, index) => {
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td colspan="12">{team.Team}</td>
                      <td>{team.MP}</td>
                      <td>{team.W}</td>
                      <td>{team.D}</td>
                      <td>{team.L}</td>
                      <td>{team.G}</td>
                      <td>{team.GD}</td>
                      <td>{team.PTS}</td>
                      <td colspan="4">
                        <Row style={{ flexWrap: "nowrap" }}>
                          <Col>
                            <Win />
                          </Col>
                          <Col>
                            <Lose />
                          </Col>
                          <Col>
                            <Draw />
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentRoundRobin;
