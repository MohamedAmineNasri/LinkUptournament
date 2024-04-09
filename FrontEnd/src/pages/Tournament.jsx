import React, { useState } from "react";

import Header from "../components/Header";
import "./PlayerForm.css";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
const Tournament = () => {
  const navigate = useNavigate();

  const [nbPhase, setNbPhase] = useState(0);
  const [nbTeams, setNbTeams] = useState(0);
  const [nbGroups, setNbGroups] = useState(0);
  const [tournamentType, setTournamentType] = useState("");


  const handleEliminationPhaseClick = () => {
    Swal.fire({
      title: "Knockout",
      html: `
          <div>
          <p>How many teams in this tournament?</p>
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
        const teamsValue = document.getElementById("teams").value;
        const state ={ type: "Knockout", nbP: selectedValue , nbT: teamsValue };
        setNbPhase(selectedValue);
        setNbPhase(teamsValue);
        setTournamentType("Knockout");
        navigate("/addTournament", { state });
      },
    });
  };
  const handleGroupEliminationClick = () => {
    Swal.fire({
      title: "Group stage and Knockout",
      html: `
      <div>
      <p>How many teams in this tournament?</p>
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
        
        const teamsValue = document.getElementById("teams").value;
        const state = { type:"Group stage and Knockout", nbG:1, nbT: teamsValue, nbP: selectedValue  };
        setTournamentType("Group stage and Knockout");
        setNbGroups(1);
        setNbTeams(teamsValue);
        setNbPhase(selectedValue);
        console.log("Navigating with state:", state);
        navigate("/addTournament", {
          state ,
        });
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
        const state = { type: "Group Stage", nbG: groupsValue, nbT: teamsValue };

        console.log("Navigating with state:", state); // Log the state

        navigate("/addTournament", { state });
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
        <div className="col mx-auto text-center">
          <div className="container-fluid">
            <h1 className="my-5 h1">Choose a tournament type</h1>
            <div className="row align-items-center tournament">
              <div className="col">
                <h5>Group stage</h5>
                <img
                  src="/assets/images/groupe.png"
                  className="team-avatar"
                  alt=""
                  style={{ width: "300px", cursor: "pointer" }}
                  onClick={handleGroupClick}
                />
              </div>
              <div className="col">
                <h5>Group stage and Knockout</h5>
                <img
                  src="/assets/images/poule_eliminatoire.png"
                  className="team-avatar"
                  alt=""
                  style={{ width: "300px", cursor: "pointer" }}
                  onClick={handleGroupEliminationClick}
                />
              </div>
              <div className="col">
                <h5>Knockout</h5>

                <img
                  src="/assets/images/eliminatoire.png"
                  className="team-avatar"
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