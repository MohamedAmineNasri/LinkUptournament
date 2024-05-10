import React, { useState } from "react";
import Swal from "sweetalert2";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const FormatSelect = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
        const state ={ type: "Knockout", nbT: selectedValue , open :true };
        setNbPhase(selectedValue);
        setTournamentType("Knockout");
        navigate("/manage/addT", { state  });
      },
    });
  };

  const handleGroupEliminationClick = () => {
    Swal.fire({
      title: "Group stage and Knockout",
      html: `
      <div>
      <p>How many groups do you want to create?</p>
          <input type="number" class="swal2-input" value="2" id="groups"/>
              <p>How many teams are there in each group?</p>
              <input type="number" class="swal2-input" value="3" id="teams"/>
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
        const state = { type:"Group stage and Knockout", nbG: groupsValue, nbT: teamsValue, nbP: selectedValue ,open : true };
        setTournamentType("Group stage and Knockout");
        setNbTeams(teamsValue);
        setNbPhase(selectedValue);
        console.log("Navigating with state:", state);
        navigate("/manage/addT", {
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
          <input type="number" class="swal2-input" value="2" id="groups"/>
              <p>How many teams are there in each group?</p>
              <input type="number" class="swal2-input" value="3" id="teams"/>
          </div>  `,
      confirmButtonText: "Submit",
      showCancelButton: true,
      focusConfirm: false,
      customClass: {
        confirmButton: "bg-green-500",
      },
      preConfirm: () => {
        const groupsValue = document.getElementById("groups").value;
        const teamsValue = document.getElementById("teams").value;
        const state = { type: "Group Stage", nbG: groupsValue, nbT: teamsValue , open : true };

        console.log("Navigating with state:", state); // Log the state

        navigate("/manage/addT", { state });
      },
      
    });
  };

  return (
    <>
      {location.pathname == "/manage/format" ? (
        <div className="rounded-sm border p-4  border-stroke  shadow-default bg-green-100 dark:bg-slate-700 dark:border-strokedark dark:bg-boxdark">
          <h1 className="text-xl uppercase font-semibold text-black dark:text-white text-center my-5">
            Choose a tournament ranking
          </h1>
          <div className="flex items-center justify-between p-8 my-16">
            <div className="flex flex-col items-center">
              <h5 className="text-black dark:text-white" >Group stages</h5>
              <img
                src="/assets/images/groupe.png"
                className="hover:scale-110 hover:animate-pulse"
                alt=""
                style={{ width: "300px", cursor: "pointer" }}
                onClick={handleGroupClick}
              />
            </div>
            <div className="flex flex-col items-center">
              <h5 className="text-black dark:text-white">Group stages and elimination phase</h5>
              <img
                src="/assets/images/poule_eliminatoire.png"
                className="hover:scale-110 hover:animate-pulse"
                alt=""
                style={{ width: "300px", cursor: "pointer" }}
                onClick={handleGroupEliminationClick}
              />
            </div>
            <div className="flex flex-col items-center">
              <h5 className="text-black dark:text-white">Elimination phase</h5>
              <img
                src="/assets/images/eliminatoire.png"
                className="hover:scale-110 hover:animate-pulse"
                alt=""
                style={{ width: "300px", cursor: "pointer" }}
                onClick={handleEliminationPhaseClick}
              />
            </div>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default FormatSelect;
