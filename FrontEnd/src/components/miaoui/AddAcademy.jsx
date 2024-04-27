import { useDispatch, useSelector } from "react-redux";
import { addAcademyAndAssaignToManager } from "../../redux/slice/academySlice";
import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { convertToBase64 } from "../../utilities/convertFileBase64";
import addformstadiumImage from "../../assets/Mi-imgs/2.jpg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import HeaderNavBar from "./HeaderNavBar";
import DefaultLayout from "../../Dashboard/src/layout/DefaultLayout";

export const AddAcademy = () => {
  const dispatch = useDispatch();
  //modal logic
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //fields state
  const [Name, setName] = useState("");
  const [Location, setLocation] = useState("");
  const [FoundedYear, setFoundedYear] = useState(null);
  const [Logo, setLogo] = useState({ myLogo: "" });
  const [Doc, setDoc] = useState({ myDoc: "" });

  //Alerts
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitFailure, setsubmitFailure] = useState(false);

  //validator states
  const [nameError, setNameError] = useState("Academy Name is require");
  const [locationError, setLocationError] = useState("Location is required");
  const [foundedDateError, setFoundedDateError] = useState(
    "Founded Date is required"
  );
  const [logoError, setlogoError] = useState("Logo is required");
  const [docsError, setdocsError] = useState("Legitemacy docs are required");

  //fields colors states
  const [namefieldColor, setnamefieldColor] = useState("red");
  const [locationfieldColor, setlocationfieldColor] = useState("red");
  const [datefieldColor, setdatefieldColor] = useState("red");
  const [logofieldColor, setlogofieldColor] = useState("red");
  const [docsfieldColor, setdocsfieldColor] = useState("red");

  //handleName
  const handleName = async (e) => {
    setName(e.target.value);
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
        // dispatch(academybyNameexists({ name: Name }));
      }
    } else {
      setNameError("Academy Name is required");
      setnamefieldColor("red");
    }
  };

  //handleLocation
  const handleLocation = async (e) => {
    setLocation(e.target.value);
    if (e.target.value !== "") {
      if (!e.target.value.trim()) {
        setLocationError("Location is required");
        setlocationfieldColor("red");
      } else if (e.target.value.trim().length <= 6) {
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

  //handleDate
  const handleDate = async (e) => {
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
        // Check if the date is before the year 1700
        const earliestAllowedDate = new Date("1700-01-01");
        if (parsedDate < earliestAllowedDate) {
          setFoundedDateError(
            "Founded Date cannot be earlier than the year 1700"
          );
          setdatefieldColor("red");
        } else {
          setFoundedDateError(null);
          setdatefieldColor("green");
          setFoundedYear(enteredDate);
        }
      }
    }
  };

  //handle Logo
  const handleLogo = async (e) => {
    if (!e.target.files[0]) {
      setlogoError("Logo is required");
      setlogofieldColor("red");
    } else {
      setlogoError(null);
      setlogofieldColor("green");
    }
  };
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertToBase64(file);
    console.log(base64);
    setLogo({ ...Logo, myLogo: base64 });
  };
  //handle Docs
  const handleDocs = async (e) => {
    if (!e.target.files[0]) {
      setdocsError("Legetimcy documents are required");
      setdocsfieldColor("red");
    } else {
      setdocsError(null);
      setdocsfieldColor("green");
    }
  };
  const handleDocsUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertToBase64(file);
    console.log(base64);
    setDoc({ ...Doc, myDoc: base64 });
  };
  //submit logic
  const handleSaveChanges = async (e) => {
    e.preventDefault(); // for refrech bug

    // get manger id from local storage
    const userId = localStorage.getItem("user");
    const userObject = JSON.parse(userId);
    // Extract the id property from the user object
    const userIdOnly = userObject.id;
    console.log(userIdOnly);
    if (
      nameError == null &&
      Name.trim() != null &&
      locationError == null &&
      Location.trim() != null &&
      foundedDateError == null &&
      FoundedYear != null &&
      Logo.myLogo != "" &&
      logoError == null &&
      Doc.myDoc != ""
    ) {
      dispatch(
        addAcademyAndAssaignToManager({
          name: Name.trim(),
          location: Location,
          logo: Logo.myLogo,
          foundedYear: FoundedYear,
          doc: Doc.myDoc,
          mangerid: userIdOnly,
        })
      ).then((response) => {
        console.log(response.payload.status); //response.payload is the response that we get from the service/controller methode
        if (response.payload.status === false) {
          setnamefieldColor("red");
          setNameError("team name already exists");
          setsubmitFailure(true);
          setTimeout(() => {
            setsubmitFailure(false);
          }, 3000);
        } else {
          //Alert ----------------------
          setSubmitSuccess(true);
          setTimeout(() => {
            setSubmitSuccess(false);
            window.location.href = "http://127.0.0.1:5173/Academy"; //i will send the id of acdemy created to this url so i can displayed in it
          }, 3000);
        }
      });
    }
  };
  return (
    <DefaultLayout>
      <div>
        {(submitSuccess && (
          <Alert className="alertModified" variant="success">
            Academy added successfully!
          </Alert>
        )) ||
          (submitFailure && (
            <Alert className="alertModified" variant="success">
              You Must Enter Valid Data!
            </Alert>
          ))}
      </div>
      <div className="p-12">
        {/* <HeaderNavBar></HeaderNavBar> */}
        {/* Hero image ------------------------- */}
        <div>
          {/* sucess msg when academy created "condional or Failure in iput" */}

          <form onSubmit={handleSaveChanges}>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
              <div className="flex flex-col gap-9">
                {/* academy Name */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Add Academy
                    </h3>
                  </div>
                  <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Academy Name
                      </label>
                      <input
                        type="text"
                        placeholder="Add Achievement Name"
                        value={Name}
                        onChange={(e) => handleName(e)}
                        style={{
                          borderColor: namefieldColor,
                        }}
                        className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-white outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                          nameError ? "border-red-500" : ""
                        }`}
                      />
                      {nameError && <p className="text-red-500">{nameError}</p>}
                    </div>
                  </div>

                  {/* location */}
                  <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Academy Location
                      </label>
                      <input
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
                  </div>
                  {/* date */}
                  <div className="flex flex-col gap-5.5 p-6.5">
                    <label className="mb-3 block text-black dark:text-white">
                      Date
                    </label>
                    <input
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
                  </div>
                </div>
              </div>
              {/* Right column */}
              <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  {/* Icon */}
                  <div className="flex flex-row p-6.5">
                    <div className="col-lg-10">
                      <label className="mb-3 block text-black dark:text-white">
                        Attach Logo
                      </label>
                      <input
                        name="myLogo"
                        type="file"
                        id="logoInput"
                        accept=".png"
                        onChange={(e) => {
                          handleLogoUpload(e);
                          handleLogo(e);
                        }}
                        style={{
                          borderColor: logofieldColor,
                        }}
                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:border-0 file:border-r file:border-solid file:border-stroke file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                      />
                      {logoError && (
                        <strong className="text-danger">{logoError}</strong>
                      )}
                    </div>
                    <div className="col-md-1 align-self-end">
                      <img src={Logo.myLogo} style={{ maxWidth: "60px" }} />
                    </div>
                  </div>

                  {/* Upload Legitimacy Documents */}
                  <div className="flex flex-row p-6.5">
                    <div className="col-lg-10">
                      <label className="mb-3 block text-black dark:text-white">
                        Upload Legitimacy Documents
                      </label>
                      <input
                        name="docs"
                        type="file"
                        id="fileInput"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          handleDocsUpload(e);
                          handleDocs(e);
                        }}
                        style={{ borderColor: docsfieldColor }}
                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:border-0 file:border-r file:border-solid file:border-stroke file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                      />
                      {docsError && (
                        <strong className="text-danger">{docsError}</strong>
                      )}
                    </div>

                    <div className="col-md-1 align-self-center">
                      <Button
                        style={{
                          backgroundColor: "#8bc34a",
                          marginTop: "12px",
                        }}
                        variant="success"
                        size="lg"
                        onClick={handleShow}
                      >
                        Show
                      </Button>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Document</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <embed
                            src={Doc.myDoc}
                            type="application/pdf"
                            width="100%"
                            height="600px"
                          />
                        </Modal.Body>
                      </Modal>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary py-4 px-6 text-white transition duration-300 ease-in-out hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Add Achievement
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddAcademy;
