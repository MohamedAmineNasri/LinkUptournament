import React, { useState } from "react";

import Header from "../components/Header";
import "./PlayerForm.css";
import Swal from "sweetalert2";

const Tournament = () => {
  const [nbPhase, setNbPhase] = useState(0);
  const [nbTeams, setNbTeams] = useState(0);
  const [nbGroups, setNbGroups] = useState(0);

  const handleEliminationPhaseClick = () => {
    Swal.fire({
      title: "Elimination phase",
      html: `
          <div>
              <p>How many teams do you want to start the elimination phase with?</p>
              <select id="tournamentSelect" class="swal2-select">
                <option value="2">2</option>
                <option value="4">4</option>
                <option defaultValue="8" selected="selected">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
                <option value="64">64</option>
              </select>
          </div>  `,
      confirmButtonText: "Submit",
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        const selectedValue = document.getElementById("tournamentSelect").value;
        setNbPhase(selectedValue);
      },
    });
  };
  const handleGroupEliminationClick = () => {
    Swal.fire({
      title: "Group stages and elimination phase",
      html: `
          <div>
              <p>How many groups do you want to create?</p>
              <input type="number" class="swal2-input" value="4" id="groups"/>
              <p>How many teams are there in each group?</p>
              <input type="number" class="swal2-input" value="4" id="teams"/>
              <p>How many teams do you want to start the elimination phase with?</p>
              <select id="tournamentSelect" class="swal2-select">
                <option value="2">2</option>
                <option value="4">4</option>
                <option defaultValue="8" selected="selected">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
                <option value="64">64</option>
              </select>
          </div>  `,
      confirmButtonText: "Submit",
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        const selectedValue = document.getElementById("tournamentSelect").value;
        const groupsValue = document.getElementById("groups").value;
        const teamsValue = document.getElementById("teams").value;
        setNbGroups(groupsValue);
        setNbTeams(teamsValue);
        setNbPhase(selectedValue);
      },
    });
  };
  const handleGroupClick = () => {
    Swal.fire({
      title: "Group stages",
      html: `
          <div>
              <p>How many groups do you want to create?</p>
              <input type="number" class="swal2-input" value="4" id="groups"/>
              <p>How many teams are there in each group?</p>
              <input type="number" class="swal2-input" value="4" id="teams"/>
          </div>  `,
      confirmButtonText: "Submit",
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        const groupsValue = document.getElementById("groups").value;
        const teamsValue = document.getElementById("teams").value;
        setNbGroups(groupsValue);
        setNbTeams(teamsValue);
      },
    });
  };
  return (
    <div>
      <Header />

      <div
        className="row align-items-center"
        style={{ height: "100vh", margin: 0 }}
      >
        <div className="col mx-auto text-center mt-5">
          <div className="container">
            <h2 className="my-5">Choose a tournament ranking</h2>
            <div className="row align-items-center tournament">
              <div className="col">
                <h5>Group stages</h5>
                <img
                  src="/assets/images/groupe.png"
                  alt=""
                  style={{ width: "300px", cursor: "pointer" }}
                  onClick={handleGroupClick}
                />
              </div>
              <div className="col">
                <h5>Group stages and elimination phase</h5>
                <img
                  src="/assets/images/poule_eliminatoire.png"
                  alt=""
                  style={{ width: "300px", cursor: "pointer" }}
                  onClick={handleGroupEliminationClick}
                />
              </div>
              <div className="col">
                <h5>Elimination phase</h5>

                <img
                  src="/assets/images/eliminatoire.png"
                  alt=""
                  style={{ width: "300px", cursor: "pointer" }}
                  onClick={handleEliminationPhaseClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tournament;
