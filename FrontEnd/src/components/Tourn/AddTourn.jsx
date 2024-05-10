import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

let matchData = {
  date: "",
  referee: "null",
  logo: "",
  startingtime: "",
  matchstatus: "Starting Soon",
  location: "",
  matchtype: "knockout",
  weathercondition: "",
  team1: null,
  team2: null,
  team1Gols: 0,
  team2Gols: 0,
  tournementId: null,
  card: [],
  tournamentName: "",
  goal1: [],
  goal2: [],
  w: null,
  price: 0,
  ticketNumber: 0,
  tournId: "",
};

const AddTourn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    type: "knockout", // Default type is knockout
    numGroups: "",
    numTeamsPerGroup: "",
    numTeams: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const steps = ["Fill the form", "Add teams"];
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const [round, setRound] = useState(1);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/tourn", {
        ...formData,
        teams: activeTeamId,
      });
      const tournId = response.data._id;
      console.log(tournId);

      let teamLength = activeTeamId.length;
      let roundCounter = 1;
      for (let i = teamLength; i >= 1; i /= 2) {
        if (i == teamLength) {
          const arrayFilledWithEmptyScore = Array.from(
            { length: i },
            () => "0"
          );
          await axios.post("http://localhost:8000/bracketStage", {
            round: 1,
            teams: activeTeamId,
            tournament: tournId,
            scores: arrayFilledWithEmptyScore,
          });
          console.log(arrayFilledWithEmptyScore);
        } else {
          const arrayFilledWithEmptyStrings = Array.from(
            { length: i },
            () => "000000000000000000000000"
          );
          const arrayFilledWithEmptyScore = Array.from(
            { length: i },
            () => "0"
          );
          await axios.post("http://localhost:8000/bracketStage", {
            round: roundCounter + 1,
            teams: arrayFilledWithEmptyStrings,
            tournament: tournId,
            scores: arrayFilledWithEmptyScore,
          });
          console.log(arrayFilledWithEmptyScore);
          roundCounter++;
        }
      }
      let orderCounter = 0;
      for (let i = 0; i < activeTeamId.length; i += 2) {
        await axios.post("http://localhost:8000/match/", {
          ...matchData,
          team1: activeTeamId[i],
          team2: activeTeamId[i + 1],
          tournId: tournId,
          round: 1,
          matchOrder: orderCounter,
        });
        orderCounter++;
      }
      navigate("/manage");
    } catch (e) {
      console.log("post Tournament err axios");
    }
  };

  //teams

  const selectTeams = (teamId) => {
    const index = activeTeamId.indexOf(teamId);
    if (index !== -1) {
      // Remove team._id from activeTeamId
      const newActiveTeamId = activeTeamId.filter((id) => id !== teamId);
      setActiveTeamId(newActiveTeamId);
    } else {
      // Add team._id to activeTeamId
      setActiveTeamId((prev) => [...prev, teamId]);
    }
  };

  const [teamsData, setTeamsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTeamId, setActiveTeamId] = useState([]);

  useEffect(() => {
    const fetchTeams = async (name) => {
      let url = "http://localhost:8000/team/search?";
      if (name) url += `name=${name}`;
      const response = await axios.get(url);
      setTeamsData([...response.data.teams]);
    };
    fetchTeams(searchQuery);
  }, [searchQuery]);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    console.log(value);
  };

  return (
    <div className="rounded-sm border p-4 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-4 px-2 md:px-2 xl:px-3.5 flex justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Create Tournament
        </h4>
      </div>
      <div className="py-6 px-4 md:px-6 xl:px-7.5  flex flex-col items-center max-w-screen-sm mx-auto">
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === 1 ? (
            <React.Fragment>
              <form onSubmit={(e) => e.preventDefault()} className="my-8">
                <div className="relative flex items-center border-white border p-4 rounded-md">
                  <input
                    type="text"
                    placeholder="Type team name to search..."
                    className="border-none text-lg w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </form>
              <div className="p-4 bg-transparent bg-white dark:bg-boxdark mb-4">
                <div className="bg-white dark:bg-boxdark grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                  {teamsData.map((team) => {
                    return (
                      <div
                        key={team._id}
                        className={`flex flex-col items-center justify-center gap-2 p-2 cursor-pointer ${
                          activeTeamId.includes(team._id)
                            ? "bg-green-400"
                            : "hover:bg-green-400"
                        }`}
                        onClick={() => {
                          console.log(activeTeamId);
                          selectTeams(team._id);
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
                </div>
              </div>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleSubmit}>Submit</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                <form className="w-full">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-black dark:text-white text-xs font-bold mb-2"
                        htmlFor="tournamentName"
                      >
                        Name
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="tournamentName"
                        type="text"
                        placeholder="Tournament XYZ"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-black dark:text-white text-xs font-bold mb-2"
                        htmlFor="tournamentDate"
                      >
                        Date
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="tournamentDate"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-black dark:text-white text-xs font-bold mb-2"
                        htmlFor="tournamentType"
                      >
                        Type
                      </label>
                      <div className="relative">
                        <select
                          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="tournamentType"
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                        >
                          <option value="knockout">Knockout</option>
                          <option value="group">Group</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.293 11.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 010-1.414zM7 7a1 1 0 011-1h4a1 1 0 010 2H8a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  {formData.type === "group" && (
                    <>
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                          <label
                            className="block uppercase tracking-wide text-black dark:text-white text-xs font-bold mb-2"
                            htmlFor="numGroups"
                          >
                            How many groups?
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="numGroups"
                            type="number"
                            placeholder="Enter number of groups"
                            name="numGroups"
                            value={formData.numGroups}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                          <label
                            className="block uppercase tracking-wide text-black dark:text-white text-xs font-bold mb-2"
                            htmlFor="numTeamsPerGroup"
                          >
                            How many teams per group?
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="numTeamsPerGroup"
                            type="number"
                            placeholder="Enter number of teams per group"
                            name="numTeamsPerGroup"
                            value={formData.numTeamsPerGroup}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {formData.type === "knockout" && (
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-black dark:text-white text-xs font-bold mb-2"
                          htmlFor="numTeams"
                        >
                          How many teams in tournament?
                        </label>
                        <select
                          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="numTeams"
                          name="numTeams"
                          value={formData.numTeams}
                          onChange={handleChange}
                        >
                          <option value="">Select number of teams</option>
                          <option value="2">2</option>
                          <option value="4">4</option>
                          <option value="8">8</option>
                          <option value="16">16</option>
                          <option value="32">32</option>
                        </select>
                      </div>
                    </div>
                  )}
                </form>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext}>Next</Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>
    </div>
  );
};

export default AddTourn;
