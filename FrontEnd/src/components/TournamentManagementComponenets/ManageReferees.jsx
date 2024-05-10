import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Button as MuiButton, Dialog as MuiDialog } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { countriesData } from "../../data/coutriesData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { fetchReferees } from "../../redux/refereeReducers/fetchRefereeSlice";
import { useDispatch, useSelector } from "react-redux";
import { addReferee } from "../../redux/refereeReducers/addRefereeSlice";
import { deleteReferee } from "../../redux/refereeReducers/deleteRefereeSlice";
import { updateReferee } from "../../redux/refereeReducers/updateRefereeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { getRefereesQueryData } from "../../redux/refereeReducers/searchRefereeSlice";
import Pagination from "./Pagination";
import ImagePlaceholder from "/public/images/image-placeholder.jpg";
import axios from "axios";

const ManageReferees = () => {
  const [imageUrl, setImageUrl] = useState(ImagePlaceholder);
  const [img, setImg] = useState(null);

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

  const {
    referees = [],
    currentPage,
    totalPages,
  } = useSelector((state) => state.root.fetchReferees.referees);
  const navigate = useNavigate();

  const [openAddForm, setOpenAddForm] = useState(false);
  const [create, setCreate] = useState(true);
  const [refereeId, setRefereeId] = useState(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    location: "",
    availability: "",
    role: "",
  });
  const [searchQuery, setSearchQuery] = useState({
    availability: "",
    role: "",
  });

  useEffect(() => {
    dispatch(fetchReferees());
  }, [dispatch, fetchReferees]);

  useEffect(() => {
    dispatch(getRefereesQueryData(searchQuery));
  }, [searchQuery]);

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
        dispatch(addReferee({ ...formData, avatar: response.data.imageUrl }));
      } else {
        dispatch(
          updateReferee(refereeId, {
            ...formData,
            avatar: response.data.imageUrl,
          })
        );
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation

    if (!formData.name || !/^[A-Za-z\s]+$/.test(formData.name)) {
      toast.error("Name is required and must contain only letters");
      return;
    }
    
    if (!formData.country) {
      toast.error("Country is required");
      return;
    }

    if (!formData.location) {
      toast.error("Location is required");
      return;
    }

    if (!formData.availability) {
      toast.error("Availability is required");
      return;
    }

    if (!formData.role) {
      toast.error("Role is required");
      return;
    }

    if (create) {
      if (imageUrl != ImagePlaceholder) {
        handleUpload(img);
      } else {
        dispatch(addReferee(formData));
        toast.success("Referee added successfully 👌");
        setFormData({});
      }
    } else {
      if (imageUrl != ImagePlaceholder) {
        handleUpload(img);
      } else {
        dispatch(updateReferee(refereeId, formData));
        toast.success("Referee updated successfully 👌");
        setFormData({});
      }
    }
    setOpenAddForm(false);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {referees.length == 0 ? (
        <>
          <div className="p-3 flex items-center mt-2 justify-between gap-10">
            <h3 className="text-base font-bold flex-1 text-black dark:text-white ">
              Filter:
            </h3>
            <div className="flex-1 pb-3 text-end">
              <FormControl
                variant="standard"
                sx={{ minWidth: "40%", paddingRight: "20px" }}
              >
                <InputLabel id="location-label" sx={{ color: "gray" }}>
                  Availability
                </InputLabel>
                <Select
                  labelId="Availability"
                  id="Availability"
                  name="availability"
                  label="Availability"
                  value={searchQuery.availability}
                  onChange={(e) =>
                    setSearchQuery({
                      ...searchQuery,
                      availability: e.target.value,
                    })
                  }
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"All day"}>All day</MenuItem>
                  <MenuItem value={"Not available"}>Not available</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ minWidth: "40%" }}>
                <InputLabel id="role-label" sx={{ color: "gray" }}>
                  Role
                </InputLabel>
                <Select
                  labelId="role"
                  id="role"
                  name="role"
                  label="role"
                  value={searchQuery.role}
                  onChange={(e) =>
                    setSearchQuery({
                      ...searchQuery,
                      role: e.target.value,
                    })
                  }
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="py-6 px-4 md:px-6 xl:px-7.5 h-100 flex flex-col items-center justify-center">
            <h4 className="md:text-xl text-lg font-semibold text-black dark:text-white">
              Looks like there are no referees to assign.
            </h4>
            <span className="md:text-base text-xs font-semibold mt-2 mb-5">
              Ready to get started? Add your first referee now.
            </span>
            <button
              className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
              type="submit"
              onClick={() => {
                setOpenAddForm((prev) => !prev);
                setCreate(true);
              }}
            >
              Add Referee
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              All Referees
            </h4>
            <button
              className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
              type="submit"
              onClick={() => {
                setOpenAddForm((prev) => !prev);
                setCreate(true);
              }}
            >
              Add Referee
            </button>
          </div>

          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="p-3 flex items-center  justify-between gap-10">
              <h3 className="text-base font-bold flex-1 text-black dark:text-white ">
                Filter:
              </h3>
              <div className="flex-1 pb-3 text-end">
                <FormControl
                  variant="standard"
                  sx={{ minWidth: "40%", paddingRight: "20px" }}
                >
                  <InputLabel id="location-label" sx={{ color: "gray" }}>
                    Availability
                  </InputLabel>
                  <Select
                    labelId="Availability"
                    id="Availability"
                    name="availability"
                    label="Availability"
                    value={searchQuery.availability}
                    onChange={(e) =>
                      setSearchQuery({
                        ...searchQuery,
                        availability: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"All day"}>All day</MenuItem>
                    <MenuItem value={"Not available"}>Not available</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ minWidth: "40%" }}>
                  <InputLabel id="role-label" sx={{ color: "gray" }}>
                    Role
                  </InputLabel>
                  <Select
                    labelId="role"
                    id="role"
                    name="role"
                    label="role"
                    value={searchQuery.role}
                    onChange={(e) =>
                      setSearchQuery({
                        ...searchQuery,
                        role: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Name
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Locations and fields
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Availability
                    </th>

                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Role
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {referees.map((referee, key) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 text-black dark:text-white">
                        <div className="flex items-center gap-3">
                          {!referee?.avatar ? (
                            <img
                              src={"/assets/images/avatar_placeholder.jpg"}
                              alt="Product"
                              width={40}
                            />
                          ) : (
                            <img
                              src={referee.avatar}
                              alt="Product"
                              width={40}
                            />
                          )}
                          <h5 className="font-medium text-black dark:text-white">
                            {referee.name}
                          </h5>
                        </div>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-black dark:text-white">
                        <span className="pl-1 lg:pl-8">{referee.location}</span>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-black dark:text-white">
                        {referee.availability}
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-black dark:text-white">
                        <button>{referee.role}</button>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-black dark:text-white">
                        <div className="flex items-center space-x-3.5">
                          <button
                            className="hover:text-primary"
                            onClick={() => {
                              navigate("consult", { state: referee });
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
                              dispatch(deleteReferee(referee._id));
                              toast.success("Referee deleted successfully!");
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
                              setFormData(referee);
                              setRefereeId(referee._id);
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
            {totalPages == 1 ? (
              <></>
            ) : (
              <div className="mt-4 flex justify-end">
                <Pagination currentPage={currentPage} totalPages={totalPages} />
              </div>
            )}
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
          Add New Referee
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
                  REFEREE AVATAR
                </figcaption>
              </figure>
            </div>
            <TextField
              autoFocus
              margin="dense"
              id="Name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              InputLabelProps={{
                style: { color: "white" },
              }}
              value={formData.name}
              onChange={handleInputChange}
            />
            <FormControl variant="standard" sx={{ minWidth: "100%" }}>
              <InputLabel id="location-label" sx={{ color: "white" }}>
                Country
              </InputLabel>
              <Select
                labelId="Country"
                id="Country"
                name="country"
                label="Country"
                value={formData.country}
                onChange={handleInputChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {countriesData.map((country, index) => {
                  return (
                    <MenuItem value={country.name} key={index}>
                      {country.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="location"
              name="location"
              label="Location"
              type="text"
              fullWidth
              variant="standard"
              InputLabelProps={{
                style: { color: "white" },
              }}
              value={formData.location}
              onChange={handleInputChange}
            />
            <FormControl variant="standard" sx={{ minWidth: "100%" }}>
              <InputLabel id="ava-label" sx={{ color: "white" }}>
                Availability (Days and times)
              </InputLabel>
              <Select
                labelId="Availability"
                id="Availability"
                name="availability"
                label="Availability"
                value={formData.availability}
                onChange={handleInputChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"All day"}>All day</MenuItem>
                <MenuItem value={"Not available"}>Not available</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ minWidth: "100%" }}>
              <InputLabel id="location-label" sx={{ color: "white" }}>
                Role (1-5)
              </InputLabel>
              <Select
                labelId="role"
                id="role"
                name="role"
                label="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
            {/* Dialog Actions */}
            <DialogActions>
              <MuiButton
                style={{ color: "#2B9451" }}
                onClick={() => {
                  setOpenAddForm(false);
                  setImageUrl(ImagePlaceholder);
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
      <ToastContainer />
    </div>
  );
};

export default ManageReferees;
