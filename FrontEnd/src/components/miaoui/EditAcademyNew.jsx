import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAcademyById,
  editAcademy,
  editAcademysameName,
} from "../../redux/slice/academySlice";
import { convertToBase64 } from "../../utilities/convertFileBase64";

export const EditAcademyNew = (props) => {
  //validator states
  const [nameError, setNameError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [foundedDateError, setFoundedDateError] = useState("");

  //fields colors states
  const [namefieldColor, setnamefieldColor] = useState("green");
  const [locationfieldColor, setlocationfieldColor] = useState("green");
  const [datefieldColor, setdatefieldColor] = useState("green");

  const dispatch = useDispatch();

  // Redux state
  const { academyDataById } = useSelector((state) => state.root.academy);
  // Fetch academyById -------------

  //date correct format
  let formattedDate = "";
  if (academyDataById.FoundedYear) {
    const date = new Date(academyDataById.FoundedYear);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  }
  // Initialize state for edited values
  const [editedName, setEditedName] = useState(props.academyname); // i used props from academy component bcz fetch take time and the value gets empty to condition
  const [editedLocation, setEditedLocation] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedLogo, setEditedLogo] = useState(null);
  const [editedDoc, seteditedDoc] = useState(null);

  const [docChanged, setdocChanged] = useState("false");

  // useEffect(() => {
  //   dispatch(fetchAcademyById(props.id));
  // }, [dispatch]);

  // Update edited values only if the input fields are changed
  const handleNameChange = (e) => {
    setEditedName(e.target.value);
    if (e.target.value !== "") {
      if (!e.target.value.trim()) {
        setNameError("Academy Name is required");
        setnamefieldColor("red");
      } else if (!/^[a-zA-Z0-9\s]+$/.test(e.target.value)) {
        setNameError("Academy Name should contain only alphabetic characters");
        setnamefieldColor("red");
      } else if (e.target.value.trim().length <= 7) {
        setNameError("Academy Name should be at least 8 characters long");
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

  const handleLocationChange = (e) => {
    setEditedLocation(e.target.value);
    if (e.target.value !== "") {
      if (!e.target.value.trim()) {
        setLocationError("Location is required");
        setlocationfieldColor("red");
      } else if (e.target.value.trim().length <= 5) {
        setLocationError(
          "Academy Location should be at least 6 characters long"
        );
        setlocationfieldColor("red");
      } else {
        setLocationError(null);
        setlocationfieldColor("green");
      }
    } else {
      setLocationError("Location is required");
      setlocationfieldColor("red");
    }
  };

  const handleDateChange = (e) => {
    const enteredDate = e.target.value;
    if (!enteredDate) {
      setFoundedDateError("Founded Date is required");
      setdatefieldColor("red");
    } else {
      const parsedDate = new Date(enteredDate);
      // Check if the date is in the future
      const currentDate = new Date();
      if (parsedDate > currentDate) {
        setFoundedDateError("Founded Date cannot be in the future");
        setdatefieldColor("red");
      } else {
        setFoundedDateError(null);
        setdatefieldColor("green");
        setEditedDate(enteredDate);
      }
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setEditedLogo(base64);
    }
  };

  const handleDocsUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    seteditedDoc(base64);
    setdocChanged("true");
  };

  //redux
  useEffect(() => {
    dispatch(fetchAcademyById(props.id));
  }, [dispatch]);

  // Handle save changes
  const handleSaveChanges = (e) => {
    e.preventDefault();

    //---1
    if (!nameError && !locationError && !foundedDateError) {
      //---2 doc modified
      if (academyDataById.Status === "Rejected" && docChanged === "true") {
        dispatch(
          editAcademy({
            //IT WILL be excuted only when changing to name that dosen't exist in db
            id: props.id,
            name: editedName || academyDataById.AcademyName,
            location: editedLocation || academyDataById.Location,
            date: editedDate || academyDataById.FoundedYear,
            logo: editedLogo || academyDataById.Logo,
            doc: editedDoc,
            status: "Pending",
          })
        ).then((response) => {
          // console.log(response);
          if (response.payload === false) {
            //name exist in db
            if (editedName === academyDataById.AcademyName) {
              // when user update with the same name (no change but click in button)
              console.log("the name exists");
              console.log("same name");
              console.log("docchanged :" + docChanged);
              dispatch(
                editAcademysameName({
                  //we call this update that do not check for duplicate name and do the update
                  id: props.id,
                  name: editedName || academyDataById.AcademyName,
                  location: editedLocation || academyDataById.Location,
                  date: editedDate || academyDataById.FoundedYear,
                  logo: editedLogo || academyDataById.Logo,
                  doc: editedDoc,
                  status: "Pending",
                })
              );
            } else {
              console.log("the name exists");
              setnamefieldColor("red");
              setNameError(
                "name  :    " + editedName + "      do already exists"
              );
            }
          }
        });
      }
      //---2 doc not modified
      if (academyDataById.Status === "Rejected" && docChanged !== "true") {
        dispatch(
          editAcademy({
            id: props.id,
            name: editedName || academyDataById.AcademyName,
            location: editedLocation || academyDataById.Location,
            date: editedDate || academyDataById.FoundedYear,
            logo: editedLogo || academyDataById.Logo,
            doc: editedDoc,
            status: "Rejected",
          })
        ).then((response) => {
          if (response.payload === false) {
            if (editedName === academyDataById.AcademyName) {
              console.log("the name exists");
              console.log("same name");
              console.log("docchanged :" + docChanged);
              dispatch(
                editAcademysameName({
                  id: props.id,
                  name: editedName || academyDataById.AcademyName,
                  location: editedLocation || academyDataById.Location,
                  date: editedDate || academyDataById.FoundedYear,
                  logo: editedLogo || academyDataById.Logo,
                  doc: editedDoc,
                  status: "Rejected",
                })
              );
            } else {
              console.log("the name exists");
              setnamefieldColor("red");
              setNameError(
                "name  :    " + editedName + "      do already exists"
              );
            }
          }
        });
      }
      //---2
      else if (
        academyDataById.Status === "Pending" ||
        academyDataById.Status === "Approved"
      ) {
        dispatch(
          editAcademy({
            id: props.id,
            name: editedName || academyDataById.AcademyName,
            location: editedLocation || academyDataById.Location,
            date: editedDate || academyDataById.FoundedYear,
            logo: editedLogo || academyDataById.Logo,
            doc: editedDoc || academyDataById.LegitimacyDocuments,
            status: academyDataById.Status,
          })
        ).then((response) => {
          if (response.payload === false) {
            if (editedName === academyDataById.AcademyName) {
              console.log("the name exists");
              console.log("same name");
              console.log("docchanged :" + docChanged);
              dispatch(
                editAcademysameName({
                  id: props.id,
                  name: editedName || academyDataById.AcademyName,
                  location: editedLocation || academyDataById.Location,
                  date: editedDate || academyDataById.FoundedYear,
                  logo: editedLogo || academyDataById.Logo,
                  doc: editedDoc || academyDataById.LegitimacyDocuments,
                  status: academyDataById.Status,
                })
              );
            } else {
              console.log("the name exists");
              setnamefieldColor("red");
              setNameError(
                "name  :    " + editedName + "      do already exists"
              );
            }
          }
        });
      }
    }
  };

  return (
    <>
      <form>
        <div>
          <div className="grid grid-cols-1  sm:grid-cols-1">
            <div className="flex flex-col gap-9">
              {/* academy Name */}
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Edit Academy
                  </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-2">
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Academy Name
                    </label>
                    <input
                      style={{ borderColor: namefieldColor }}
                      type="text"
                      placeholder="Change Academy Name"
                      autoFocus
                      value={editedName || academyDataById.AcademyName}
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
                {/* location */}
                <div className="flex flex-col gap-5.5 p-2">
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Academy Location
                    </label>
                    <input
                      style={{
                        borderColor: locationfieldColor,
                      }}
                      type="text"
                      id="location"
                      placeholder="Enter the Location of the academy"
                      value={editedLocation || academyDataById.Location}
                      onChange={(e) => handleLocationChange(e)}
                      className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-white outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                        locationError ? "border-red-500" : ""
                      }`}
                    />
                    {locationError && (
                      <p className="text-red-500">{locationError}</p>
                    )}
                  </div>
                </div>
                {/* date */}
                <div className="flex flex-col gap-5.5 p-2">
                  <label className="mb-3 block text-black dark:text-white">
                    Date
                  </label>
                  <input
                    style={{
                      borderColor: datefieldColor,
                    }}
                    type="date"
                    id="foundedDate"
                    value={editedDate || formattedDate}
                    onChange={(e) => handleDateChange(e)}
                    className={`w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                      foundedDateError ? "border-red-500" : ""
                    }`}
                  />
                  {foundedDateError && (
                    <p className="text-red-500">{foundedDateError}</p>
                  )}
                </div>
                {/* Icon */}
                <div className="flex flex-row p-2">
                  <div className="col-lg-10">
                    <label className="mb-3 block text-black dark:text-white">
                      Attach Logo
                    </label>
                    <input
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
                    {/* <img src={Logo.myLogo} style={{ maxWidth: "60px" }} /> */}
                  </div>
                </div>
                {academyDataById.Status == "Rejected" && (
                  <>
                    <div className="flex flex-row p-2">
                      <div className="col-lg-10">
                        <label className="mb-3 block text-black dark:text-white">
                          Legitimacy document :
                        </label>
                        <input
                          name="myLogo"
                          type="file"
                          id="logoInput"
                          accept=".pdf"
                          placeholder="Legitimacy document"
                          autoFocus
                          onChange={(e) => handleDocsUpload(e)}
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
                  </>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSaveChanges}
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-primary py-4 px-6 text-white transition duration-300 ease-in-out hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Edit Academy
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditAcademyNew;
