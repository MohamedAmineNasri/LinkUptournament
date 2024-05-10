import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Button as MuiButton, Dialog as MuiDialog } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { soccerPositions } from "../../data/playersPositions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPlayer } from "../../redux/playerReducers/addPlayerSlice";
import { updatePlayer } from "../../redux/playerReducers/updatePlayerSlice";
import { deletePlayer } from "../../redux/playerReducers/deletePlayerSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import {
  getPlayersPosition,
  getPlayersTeam,
} from "../../redux/playerReducers/searchPlayerSlice";
import axios from "axios";
import ImagePlaceholder from "/public/images/image-placeholder.jpg";
import Pagination from "./Pagination";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssignPlayer from "./AssignPlayer";
import { useLocation } from "react-router-dom/dist/umd/react-router-dom.development";
import { fetchPlayers } from "../../redux/playerReducers/fetchPlayerSlice";

const ManagePlayer = () => {
  const [imageUrl, setImageUrl] = useState(ImagePlaceholder);
  const [img, setImg] = useState(null);
  const [openAssignField, setOpenAssignField] = useState(false);
  const [teamFilter, setTeamFilter] = useState("");
  const location = useLocation();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImg(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  let {
    players = [],
    currentPage,
    totalPages,
    type,
  } = useSelector((state) => state.root.fetchPlayers.players);

  const teams =
    useSelector((state) => state.root.academy.academyData.teams) || [];
  const academy = useSelector((state) => state.root.academy.academyData);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openAddForm, setOpenAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",

    position: "",
    skills: [""],
    age: undefined,
    current_team: "",
    number: undefined,
    avatar: "",
    team: "",
  });
  const [create, setCreate] = useState(true);
  const [skillsSize, setSkillsSize] = useState(1);
  const [playerId, setPlayerId] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    console.log(
      "mount__________________________________________________________"
    );
    console.log(user?.roles[0] == "Admin" && players.length == 0);
    if (user?.roles[0] == "Admin" && players.length == 0) {
      dispatch(fetchPlayers());
    }

    if (user?.roles[0] == "Manager" && teams.length != 0) {
      dispatch(getPlayersTeam(teams[22]?._id));
      setTeamFilter(teams[22]?._id);
    }

    if (location.state) {
      setFormData({ ...formData, team: location.state });
      setOpenAddForm(true);
    }
  }, [dispatch, teams, location.state]);

  const handleAddSkill = () => {
    setFormData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, ""],
    }));
    setSkillsSize(Object.keys(formData.skills).length + 1);
  };

  const handleSkillInputChange = (e, index) => {
    const newSkills = [...formData.skills];
    newSkills[index] = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      skills: newSkills,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //save avatar
  const handleUpload = async (uploadedPhoto) => {
    try {
      const imageData = new FormData();

      imageData.append("avatar", uploadedPhoto);

      const response = await axios.post(
        "http://localhost:8000/upload/image",
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (create) {
        if (teamFilter != "") {
          dispatch(
            addPlayer(
              { ...formData, avatar: response.data.imageUrl },
              teamFilter
            )
          );
        } else {
          dispatch(addPlayer({ ...formData, avatar: response.data.imageUrl }));
        }
      } else {
        if (teamFilter != "") {
          dispatch(
            updatePlayer(
              playerId,
              {
                ...formData,
                avatar: response.data.imageUrl,
              },
              teamFilter
            )
          );
        } else {
          dispatch(
            updatePlayer(playerId, {
              ...formData,
              avatar: response.data.imageUrl,
            })
          );
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /** Validator */

    /*    if (!formData.name || !/^[a-zA-Z ]+$/.test(formData.name.trim())) {
      toast.error("Name is required and must contain only letters");
      return;
    }

    if (!formData.age || isNaN(formData.age) || formData.age <= 0) {
      toast.error("Age is required and must be a positive number");
      return;
    }

    if (!formData.position || formData.position.trim() === "") {
      toast.error("Position is required");
      return;
    }

    /* if (!formData.current_team || formData.current_team.trim() === "") {
      toast.error("Current team is required");
      return;
    } 

    if (!formData.number || isNaN(formData.number) || formData.number <= 0) {
      toast.error("Number is required and must be a positive number");
      return;
    }
    /** Validator */

    if (create) {
      if (imageUrl != ImagePlaceholder) {
        handleUpload(img);
      } else {
        if (formData.team == "") delete formData.team;
        dispatch(addPlayer(formData, teamFilter));
        toast.success("Player added successfully 👌");
        setFormData({});
      }
    } else {
      if (imageUrl != ImagePlaceholder) {
        handleUpload(img);
      } else {
        dispatch(updatePlayer(playerId, formData, teamFilter));
        toast.success("Player updated successfully 👌");
        setFormData({});
      }
    }
    setOpenAddForm(false);
  };
  console.log(players?.length);
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {(academy.length != 0 &&
        !teams.length &&
        players?.length == 0 &&
        user.roles[0] == "Manager") ||
      (user.roles[0] == "Admin" && players?.length == 0) ? (
        <>
          <div className="p-4 flex items-center justify-between gap-10">
            <h3 className="text-base font-bold text-black dark:text-white ">
              Filter:
            </h3>
            <div className="w-1/5 pb-3">
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel id="Position" sx={{ color: "gray" }}>
                  Position
                </InputLabel>
                <Select
                  labelId="Position"
                  id="Position"
                  label="Position"
                  name="position"
                  value={position}
                  onChange={(e) => {
                    setPosition(e.target.value);
                    dispatch(getPlayersPosition(e.target.value));
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Object.entries(soccerPositions).map(([key, value]) => (
                    <MenuItem value={key}>{value}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="py-6 px-4 pb-20 md:px-6 xl:px-7.5 h-100 flex flex-col items-center justify-center">
            <h4 className="md:text-xl text-lg font-semibold text-black dark:text-white">
              Looks like there are no players on the roster.
            </h4>
            <span className="md:text-base text-xs font-semibold mt-2 mb-5">
              Ready to get started? Add your first player now.
            </span>
            {user?.roles[0] != "Manager" && (
              <button
                class="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                type="submit"
                onClick={() => {
                  setOpenAddForm((prev) => !prev);
                  setCreate(true);
                }}
              >
                Add Player
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              All Players
            </h4>
            {user?.roles[0] != "Manager" && (
              <button
                class="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                type="submit"
                onClick={() => {
                  setOpenAddForm((prev) => !prev);
                  setCreate(true);
                }}
              >
                Add Player
              </button>
            )}
          </div>

          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
              <div className="p-3 flex items-center justify-between gap-10">
                <h3 className="text-base flex-1 font-bold text-black dark:text-white ">
                  Filter:
                </h3>
                <div className="flex-1 pb-3 flex justify-end">
                  {user?.roles[0] == "Manager" && teams ? (
                    <FormControl
                      variant="standard"
                      sx={{ minWidth: "40%", paddingRight: "20px" }}
                    >
                      <InputLabel id="Position" sx={{ color: "gray" }}>
                        Teams
                      </InputLabel>
                      <Select
                        labelId="Teams"
                        id="Teams"
                        label="Teams"
                        name="team"
                        value={teamFilter}
                        onChange={(e) => {
                          setTeamFilter(e.target.value);

                          dispatch(getPlayersTeam(e.target.value));
                        }}
                      >
                        {teams?.map((team) => (
                          <MenuItem value={team._id}>{team.TeamName}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <></>
                  )}
                  <FormControl variant="standard" sx={{ width: "40%" }}>
                    <InputLabel id="Position" sx={{ color: "gray" }}>
                      Position
                    </InputLabel>
                    <Select
                      labelId="Position"
                      id="Position"
                      label="Position"
                      name="position"
                      value={position}
                      onChange={(e) => {
                        setPosition(e.target.value);
                        dispatch(getPlayersPosition(e.target.value));
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {Object.entries(soccerPositions)?.map(([key, value]) => (
                        <MenuItem value={key}>{value}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Player
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Position
                    </th>
                    <th className="min-w-[140px] py-4 px-4 font-medium text-black dark:text-white">
                      Current Team
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Age
                    </th>
                    <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {players?.map((player, key) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <div className="flex items-center gap-3">
                          {!player?.avatar ? (
                            <img
                              src={"/assets/images/avatar_placeholder.jpg"}
                              alt="Product"
                              width={40}
                            />
                          ) : (
                            <img src={player.avatar} alt="Product" width={40} />
                          )}
                          <h5 className="font-medium text-black dark:text-white">
                            {player.name}
                          </h5>
                        </div>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-black dark:text-white font-normal">
                        {player.position}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {player.team?.TeamName == "" ||
                        player.team?.TeamName == undefined ? (
                          <button
                            className="pl-5"
                            onClick={() => {
                              setPlayerId(player._id);
                              setOpenAssignField(true);
                            }}
                          >
                            <PersonAddIcon />
                          </button>
                        ) : (
                          <p
                            className="pl-5 hover:text-primary hover:font-medium cursor-pointer text-black dark:text-white"
                            onClick={() => {
                              setPlayerId(player._id);
                              setOpenAssignField(true);
                            }}
                          >
                            {player.team.TeamName}
                          </p>
                        )}
                      </td>
                      <td className=" border-b border-[#eee] py-5 px-4 dark:border-strokedark text-black dark:text-white">
                        <section className="pl-1">{player.age}</section>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-black dark:text-white">
                        <div className="flex items-center space-x-3.5">
                          <button
                            className="hover:text-primary"
                            onClick={() => {
                              navigate("consult", { state: player });
                            }}
                          >
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                fill=""
                              />
                              <path
                                d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                fill=""
                              />
                            </svg>
                          </button>
                          <button
                            className="hover:text-primary"
                            onClick={() => {
                              dispatch(deletePlayer(player._id, teamFilter));

                              toast.success("Player deleted successfully!");
                            }}
                          >
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                fill=""
                              />
                              <path
                                d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                fill=""
                              />
                              <path
                                d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                fill=""
                              />
                              <path
                                d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                fill=""
                              />
                            </svg>
                          </button>
                          <button
                            className="hover:text-primary"
                            onClick={() => {
                              setCreate(false);
                              setOpenAddForm(true);
                              setFormData(player);
                              setPlayerId(player._id);
                            }}
                          >
                            <FontAwesomeIcon icon={faSyncAlt} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                type={type}
              />
            </div>
          </div>
        </>
      )}
      {/**Add Team Model */}
      <MuiDialog
        open={openAddForm}
        className="rounded ml-0 lg:ml-65"
        style={{ display: "absolute" }}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle
          className="text-black dark:text-white  bg-white dark:bg-boxdark"
          style={{ borderBottom: "1px solid #2B9451" }}
        >
          {create ? "Create New" : "Update"} Player
        </DialogTitle>
        <DialogContent className="bg-white dark:bg-boxdark">
          {/* Form for updating user details */}
          <form className="mt-5" onSubmit={handleSubmit}>
            <div>
              <input
                type="file"
                className="mb-4 rounded-lg text-white font-light text-sm"
                accept="image/*"
                onChange={handleFileChange}
              />
              <figure className="will-change-auto">
                <img
                  className="h-70 mx-auto max-w-full rounded-lg"
                  src={imageUrl}
                  alt="image description"
                />
                <figcaption className="mt-2 text-sm font-semibold text-center text-gray-500 dark:text-gray-400">
                  PLAYER AVATAR
                </figcaption>
              </figure>
            </div>

            <TextField
              autoFocus
              margin="dense"
              id="PlayerName"
              name="name"
              label="Player name"
              type="text"
              fullWidth
              variant="standard"
              InputLabelProps={{
                style: { color: "white" },
              }}
              value={formData.name}
              onChange={handleInputChange}
            />

            <TextField
              autoFocus
              margin="dense"
              id="Number"
              name="number"
              label="Number"
              type="number"
              fullWidth
              variant="standard"
              InputLabelProps={{
                style: { color: "white" },
              }}
              value={formData.number}
              onChange={handleInputChange}
            />

            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel id="Position" sx={{ color: "white" }}>
                Position
              </InputLabel>
              <Select
                labelId="Position"
                id="Position"
                label="Position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Object.entries(soccerPositions).map(([key, value]) => (
                  <MenuItem value={key}>{value}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              autoFocus
              margin="dense"
              id="age"
              name="age"
              label="Age"
              type="number"
              fullWidth
              variant="standard"
              InputLabelProps={{
                style: { color: "white" },
              }}
              value={formData.age}
              onChange={handleInputChange}
            />

            {/**ggggggg */}
            <div>
              {formData?.skills?.map((skill, index) => (
                <div key={index} className="flex items-center relative">
                  <TextField
                    autoFocus
                    margin="dense"
                    id="Skill"
                    name="Skill"
                    label={"Add Skill n°" + (index + 1)}
                    type="text"
                    fullWidth
                    variant="standard"
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    value={skill}
                    onChange={(e) => handleSkillInputChange(e, index)}
                  />
                  {skillsSize == index + 1 ? (
                    <button
                      className="bg-[#2b945175] w-6 h-6 text-center text-white font-bold flex items-center justify-center absolute right-0 pb-[3px]"
                      onClick={handleAddSkill}
                      disabled={skillsSize == 3}
                      style={skillsSize == 3 ? { background: "gray" } : {}}
                    >
                      +
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>

            {/* Dialog Actions */}
            <DialogActions>
              <MuiButton
                style={{ color: "#2B9451" }}
                onClick={() => {
                  setOpenAddForm(false);
                  setImageUrl(ImagePlaceholder);
                  setFormData({});
                }}
              >
                Cancel
              </MuiButton>
              <MuiButton style={{ color: "#2B9451" }} type="submit">
                {create ? "Create" : "Update"}
              </MuiButton>
            </DialogActions>
          </form>
        </DialogContent>
      </MuiDialog>
      <AssignPlayer
        openAssignField={openAssignField}
        setOpenAssignField={setOpenAssignField}
        playerId={playerId}
      />
      <ToastContainer />
    </div>
  );
};

export default ManagePlayer;
