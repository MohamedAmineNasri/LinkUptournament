import React, { useEffect, useState } from "react";
import { DialogContent, DialogTitle } from "@mui/material";
import { Dialog as MuiDialog } from "@mui/material";
import axios from "axios";

const AssignPlayer = ({ openAssignField, setOpenAssignField, playerId }) => {
  const [teamsData, setTeamsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTeamId, setActiveTeamId] = useState(null);

  const handleClick = async () => {
    setOpenAssignField(false);
    await axios.post(
      `http://localhost:8000/team/assignPlayerToTeam/${activeTeamId}/${playerId}`
    );
    window.location.reload();
  };

  useEffect(() => {
    const fetchTeams = async (name) => {
      let url = "http://localhost:8000/team/search?";
      if (name) url += `name=${name}`;
      const response = await axios.get(url);
      setTeamsData([...response.data.teams]);
    };
    fetchTeams(searchQuery);
  }, [searchQuery]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    console.log(value);
  };

  return (
    <div>
      {/**Add Team Model */}
      <MuiDialog
        open={openAssignField}
        className="rounded ml-0 lg:ml-65"
        style={{ display: "absolute" }}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle
          className="text-black dark:text-white  bg-white dark:bg-boxdark uppercase text-center"
          style={{ borderBottom: "1px solid #2B9451" }}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex items-center">
              <button className="absolute left-0 top-[14px] -translate-y-1/2">
                <svg
                  className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                    fill=""
                  />
                </svg>
              </button>

              <input
                type="text"
                placeholder="Type team name to search..."
                className="border-none text-lg w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
                value={searchQuery}
                onChange={handleChange}
              />
            </div>
          </form>
        </DialogTitle>
        <div className="p-4 bg-transparent bg-white dark:bg-boxdark">
          <DialogContent className="bg-white dark:bg-boxdark grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {teamsData.map((team) => {
              return (
                <div
                  key={team._id}
                  className={`flex flex-col items-center justify-center gap-2 p-2 cursor-pointer ${
                    activeTeamId === team._id
                      ? "bg-green-400"
                      : "hover:bg-green-400"
                  }`}
                  onClick={() => {
                    console.log(team._id, playerId);
                    setActiveTeamId(team._id);
                  }}
                >
                  <div>
                    <img
                      src={
                        team.TeamLogo
                          ? team.TeamLogo
                          : "../../public/assets/images/logo_1.png"
                      }
                      alt="nice"
                      height={"50px"}
                      width={"50px"}
                    />
                  </div>
                  <p className="text-black uppercase text-center font-normal dark:text-white">
                    {team.TeamName}
                  </p>
                </div>
              );
            })}
          </DialogContent>
          <div className="flex gap-4">
            <button
              className="btn bg-primary w-full"
              onClick={() => setOpenAssignField(false)}
            >
              Cancel
            </button>
            <button
              className="btn bg-primary w-full"
              onClick={() => handleClick()}
            >
              Assign
            </button>
          </div>{" "}
        </div>
      </MuiDialog>
    </div>
  );
};

export default AssignPlayer;
