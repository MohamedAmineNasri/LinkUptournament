import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

import { editTeam, editTeamSameName } from "../../redux/slice/teamSlice";
import { convertToBase64 } from "../../utilities/convertFileBase64";

const EditTeamNew = (props) => {
  const navigate = useNavigate();
  //   const { teamData, loading, error } = useSelector((state) => state.root.team);
  //   const [loader, setLoading] = useState("false"); //i did not use redux loading cuz alawys the empty message flashs even if i have teams

  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     if (props.idacademy) {
  //       // we make sure that props.idacademy value is readyu before rendering
  //       console.log(props.idacademy);

  //       dispatch(fetchTeamOfAcademy(props.idacademy));
  //       setLoading("false");
  //     } else {
  //       setLoading("true");
  //     }
  //   }, [dispatch, props.idacademy, loader]);

  const dispatch = useDispatch();

  // Initialize state for edited values
  const [teamName, setteamName] = useState(props.Tname);
  const [editedLogo, setEditedLogo] = useState(null);
  //validator states
  const [nameError, setNameError] = useState("");
  //validator color
  const [namefieldColor, setnamefieldColor] = useState("green");

  // Update edited values only if the input fields are changed
  const handleNameChange = (e) => {
    setteamName(e.target.value);
    if (e.target.value !== "") {
      if (!e.target.value.trim()) {
        setNameError("Academy Name is required");
        setnamefieldColor("red");
      } else if (!/^[a-zA-Z0-9\s]+$/.test(e.target.value)) {
        setNameError("Academy Name should contain only alphabetic characters");
        setnamefieldColor("red");
      } else if (e.target.value.trim().length <= 3) {
        setNameError("Academy Name should be at least 4 characters long");
        setnamefieldColor("red");
      } else {
        setNameError(null);
        setnamefieldColor("green");
      }
    } else {
      setNameError("Academy Name is required");
      setnamefieldColor("red");
    }
  };
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setEditedLogo(base64);
      console.log(editedLogo);
    }
  };

  // Handle save changes
  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (!nameError) {
      dispatch(
        editTeam({
          teamid: props.Tid,
          name: teamName || props.Tname,
          logo: editedLogo || props.Tlogo,
        })
      ).then((response) => {
        // console.log(response);
        if (response.payload === false) {
          //name exist in db
          if (teamName === props.Tname) {
            // when user update with the same name (no change but click in button)
            console.log("the name exists");
            console.log("same name");

            dispatch(
              editTeamSameName({
                //we call this update that do not check for duplicate name and do the update
                teamid: props.Tid,
                name: teamName || props.Tname,
                logo: editedLogo || props.Tlogo,
              })
            );
          } else {
            console.log("the name exists");
            setnamefieldColor("red");
            setNameError("name  :    " + teamName + "      do already exists");
          }
        }
      });
    }
  };
  console.log(props.Tname);

  return (
    <form>
      <div>
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
          <div className="flex flex-col gap-9">
            {/* academy Name */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Edit Team
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Team Name
                  </label>
                  <input
                    style={{ padding: "10px", borderColor: namefieldColor }}
                    type="text"
                    placeholder="Edit Team Name"
                    autoFocus
                    value={teamName || props.Tname}
                    onChange={(e) => handleNameChange(e)}
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-white outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                      nameError ? "border-red-500" : ""
                    }`}
                  />
                  {nameError && (
                    <strong className="text-danger">{nameError}</strong>
                  )}
                </div>
              </div>
              {/* Icon */}
              <div className="flex flex-row p-6.5">
                <div className="col-lg-10">
                  <label className="mb-3 block text-black dark:text-white">
                    Attach Logo
                  </label>
                  <input
                    style={{ padding: "10px" }}
                    name="myLogo"
                    type="file"
                    id="logoInput"
                    accept=".png"
                    placeholder="Team Logo"
                    autoFocus
                    onChange={(e) => handleLogoUpload(e)}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:border-0 file:border-r file:border-solid file:border-stroke file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                  />
                </div>
                <div className="col-md-1 align-self-end">
                  <img
                    // src={Logo.myLogo}
                    style={{ maxWidth: "60px" }}
                  />
                </div>
              </div>

              {/* location */}
              {/* <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Academy Location
                      </label>
                      <input
                        style={{ padding: "10px" }}
                        type="text"
                        id="location"
                        placeholder="Enter the Location of the academy"
                        value={Location}
                        onChange={(e) => handleLocation(e)}
                        style={{
                          borderColor: locationfieldColor,
                        }}
                        className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-white outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                          locationError ? "border-red-500" : ""
                        }`}
                      />
                      {locationError && (
                        <p className="text-red-500">{locationError}</p>
                      )}
                    </div>
                  </div> */}
              {/* date */}
              {/* <div className="flex flex-col gap-5.5 p-6.5">
                    <label className="mb-3 block text-black dark:text-white">
                      Date
                    </label>
                    <input
                      style={{ padding: "10px" }}
                      type="date"
                      id="foundedDate"
                      value={FoundedYear}
                      onChange={(e) => handleDate(e)}
                      style={{
                        borderColor: datefieldColor,
                      }}
                      className={`w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                        foundedDateError ? "border-red-500" : ""
                      }`}
                    />
                    {foundedDateError && (
                      <p className="text-red-500">{foundedDateError}</p>
                    )}
                  </div> */}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSaveChanges}
            type="submit"
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary py-4 px-6 text-white transition duration-300 ease-in-out hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Edit Team
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditTeamNew;
