import React, { useEffect, useState } from "react";
import TeamCard from "./TeamCard";
import DropDownAcademy from "./DropDownAcademy";
import { useSelector, useDispatch } from "react-redux";
import { fetchAcademybyManagerId } from "../../redux/slice/academySlice";
import Badge from "react-bootstrap/Badge";
import DefaultLayout from "../../Dashboard/src/layout/DefaultLayout";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import EditAcademyNew from "./EditAcademyNew";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddTeamNew from "./AddTeamNew";

export const Academy = () => {
  const dispatch = useDispatch();

  const { academyData, loading, error } = useSelector(
    (state) => state.root.academy
  );

  useEffect(() => {
    //normally hethi nhezeha lel login jsx
    const userId = localStorage.getItem("user");
    const userObject = JSON.parse(userId);
    //Extract the id property from the user object
    const userIdOnly = userObject.id;

    if (loading === false && error === null) {
      dispatch(
        fetchAcademybyManagerId({
          idmanger: userIdOnly,
        })
      );
      localStorage.setItem("AcademyStatus", academyData.Status);
      if (academyData !== null) {
        //hide the add academy  page if the manger already have one mesh tethaz lel home page or login
        localStorage.setItem("hideAddAcademy", true);
      }
    }
  }, []);

  //date correct format
  const date = academyData ? new Date(academyData.FoundedYear) : null;
  let formattedDate = "";
  if (date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  } else {
    formattedDate = "N/A";
  }
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Rejected":
        return "danger";
      case "Approved":
        return "success";
      default:
        return "text-muted";
    }
  };

  // name modal logic
  const [selectedAcademy, setSelectedAcademy] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (academy) => {
    setSelectedAcademy(academy);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedAcademy(null);
    setOpen(false);
  };

  //logo modal logic
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [open1, setOpen1] = useState(false);

  const handleOpen1 = (team) => {
    setSelectedTeam(team);
    setOpen1(true);
  };

  const handleClose1 = () => {
    setSelectedTeam(null);
    setOpen1(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    // bgcolor: "#f8f8ff",
    bgcolor: "rgb(36 48 63)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 0,
  };
  return (
    <DefaultLayout>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Academy
        </h2>
      </div>
      <div className="pt-13">
        <div>
          <div>
            <div>
              <div
                style={{
                  paddingRight: "20px",
                  paddingLeft: "20px",
                  paddingTop: "50px",
                }}
                className=" border border-gray-300 bg-opacity-25 bg-gray-900"
              >
                <div className="flex justify-center items-top">
                  <div className="col-md-12 col-lg-12 word-wrap-break  pb-6 text-center">
                    <div className="flex flex-col sm:flex-row gap-19">
                      <div className="sm:w-1/2">
                        <img
                          src={academyData.Logo}
                          alt="Logo"
                          className="img-fluid max-w-sm sm:max-w-none m-auto mb-4"
                          style={{ maxWidth: "220px" }}
                        />
                        <h3
                          className="mb-4 mt-3 text-white font-bold text-3xl"
                          style={{ fontWeight: "bold", fontSize: "40px" }}
                        >
                          <strong>{academyData.AcademyName}</strong>
                        </h3>
                      </div>
                      <div className="sm:w-1/2 sm:self-center text-white">
                        <p className="mb-4">
                          Location :{" "}
                          <span className="text-gray-400 notranslate">
                            {academyData.Location}
                          </span>
                        </p>
                        <p className="mb-4">
                          Creating Date :{" "}
                          <span className="text-gray-400">{formattedDate}</span>
                        </p>
                        <p className="mb-2">
                          Status :{" "}
                          <span>
                            <Badge
                              style={{ color: "white" }}
                              className="p-2 notranslate"
                              bg={getStatusColor(academyData.Status)}
                            >
                              {academyData.Status}
                            </Badge>
                          </span>
                        </p>
                        {academyData.Status === "Approved" && (
                          <p className="text-green-500 mb-4">
                            This academy is approved, You can participate in
                            tournaments.
                          </p>
                        )}
                        {academyData.Status === "Pending" && (
                          <p className="text-yellow-500 mb-4">
                            This academy is still pending approval.
                          </p>
                        )}
                        {academyData.Status === "Rejected" && (
                          <p className="text-red-500 mb-4">
                            This academy has been rejected, You must provide
                            convincing Documents!
                          </p>
                        )}
                        {/* <DropDownAcademy
                          id={academyData._id}
                          academyLogo={academyData.Logo}
                          academyname={academyData.AcademyName}
                        /> */}
                        <div className="p-4 flex items-center  gap-10 justify-center">
                          <div
                            className="w-1/2 "
                            style={{
                              borderRadius: "10px",
                              backgroundColor: "#3ab93a54",
                            }}
                          >
                            <FormControl
                              variant="standard"
                              sx={{ width: "100%" }}
                            >
                              <InputLabel
                                id="Position"
                                variant="filled"
                                sx={{ color: "whitesmoke" }}
                              >
                                Options
                              </InputLabel>
                              <Select
                                labelId="Position"
                                id="Position"
                                label="Position"
                                name="position"
                              >
                                <MenuItem value="">
                                  <Button
                                    variant="success"
                                    style={{
                                      width: "-webkit-fill-available",
                                      color: "black",
                                    }}
                                    onClick={() => handleOpen(academyData)}
                                  >
                                    Edit Academy
                                  </Button>
                                </MenuItem>
                                <MenuItem value="">
                                  <Button
                                    variant="success"
                                    style={{
                                      width: "-webkit-fill-available",
                                      color: "black",
                                    }}
                                    onClick={() => handleOpen1(academyData)}
                                  >
                                    Add Team
                                  </Button>
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                        {/* modal edit ---------------------------------------------------------- */}

                        {selectedAcademy && (
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <EditAcademyNew
                                id={academyData._id}
                                academyname={academyData.AcademyName}
                              />
                            </Box>
                          </Modal>
                        )}
                        {/* ---------------------------------------------------------- */}
                        {/* modal delete ---------------------------------------------------------- */}
                        {selectedTeam && (
                          <Modal
                            open={open1}
                            onClose={handleClose1}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <AddTeamNew
                                id={academyData._id}
                                aLogo={academyData.Logo}
                              ></AddTeamNew>
                            </Box>
                          </Modal>
                        )}
                        {/* ---------------------------------------------------------- */}
                      </div>
                    </div>
                  </div>
                  {/* Academy teams */}
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-12">
              <div
                className=" mb-3  teamsBorderBox"
                style={{
                  borderRight: "solid thin",
                  borderLeft: "solid thin",
                  borderBottom: "solid thin",
                  borderRadius: "0px",
                  padding: "10px",
                }}
              >
                <div className="p-4">
                  <TeamCard idacademy={academyData._id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Academy;
