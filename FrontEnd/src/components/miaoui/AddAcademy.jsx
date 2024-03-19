import { useDispatch } from "react-redux";
import { addnewAcademy } from "../../redux/slice/academySlice";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { convertToBase64 } from "../../utilities/convertFileBase64";
import addformstadiumImage from "../../assets/Mi-imgs/2.jpg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom/dist/umd/react-router-dom.development";

export const AddAcademy = () => {
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

  const dispatch = useDispatch();

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
  const handleSaveChanges = (e) => {
    e.preventDefault(); // for refrech bug
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
        addnewAcademy({
          name: Name,
          location: Location,
          logo: Logo.myLogo,
          foundedYear: FoundedYear,
          doc: Doc.myDoc,
        })
      );
      //Alert ----------------------
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        window.location.href = "http://127.0.0.1:5173/Academy"; //i will send the id of acdemy created to this url so i can displayed in it
      }, 3000);
    } else {
      setsubmitFailure(true);
      setTimeout(() => {
        setsubmitFailure(false);
      }, 3000);
    }
  };
  return (
    <div>
      <div>
        <header className="site-navbar py-4" role="banner">
          <div className="container-fluid">
            <div className="d-flex align-items-center">
              <div className="site-logo">
                <a href="index.html">
                  <img src="/public/assets/images/logo.png" alt="Logo" />
                </a>
              </div>
              <div className="ml-auto">
                <nav
                  className="site-navigation position-relative text-right"
                  role="navigation"
                >
                  <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                    <li>
                      <Link to="/" className="nav-link">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/tests" className="nav-link">
                        Match Cards
                      </Link>
                    </li>
                    <li>
                      <Link to="/a" className="nav-link">
                        Match Time
                      </Link>
                    </li>
                    <li>
                      <Link to="/addAcademy" className="nav-link">
                        Academy Creation
                      </Link>
                    </li>
                    <li>
                      <Link to="/Academy" className="nav-link">
                        Academies
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="/signin" className="nav-link">
                        Signup
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile" className="nav-link">
                        Profile
                      </Link>
                    </li>
                  </ul>
                </nav>

                <a
                  href="#"
                  className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right text-white"
                >
                  <span className="icon-menu h3 text-white"></span>
                </a>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Hero image ------------------------- */}
      <div
        className="hero overlay2 HeroImageAddAcademy"
        style={{ backgroundImage: `url(${addformstadiumImage})` }}
      >
        {/* sucess msg when academy created "condional or Failure in iput" */}
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

        <div className="col-lg-12">
          <h1 className="col-md-12 pb-5 pt-5 TitleAddAcademy">
            Add You re Academy
          </h1>
        </div>
        {/* form inside the hero image ------------------------  */}
        {/* container --------> container-fluid  */}
        <div className=" container-fluid col-lg-9 pt-5">
          <div className="addAcademyFormBorder">
            <div className="col-lg-12">
              <form action="#">
                <div>
                  {/* name ----------------------------------------- */}
                  <div className="col-md-12 form-group pb-2 pt-3 ">
                    <label htmlFor="Aname">Academy Name</label>
                    <input
                      className="form-control custom-placeholder academyCreateInput"
                      type="text"
                      id="Aname"
                      placeholder="Enter the name of the academy"
                      value={Name}
                      onChange={(e) => handleName(e)}
                      style={{
                        borderColor: namefieldColor,
                      }}
                    />
                    {nameError && (
                      <strong className="text-danger">{nameError}</strong>
                    )}
                  </div>
                  {/* location---------------------------------------------- */}
                  <div className="col-md-12 form-group pb-2">
                    <label htmlFor="location">Academy Location</label>
                    <input
                      className="form-control custom-placeholder academyCreateInput"
                      type="text"
                      id="location"
                      placeholder="Enter the Location of the academy"
                      value={Location}
                      onChange={(e) => handleLocation(e)}
                      style={{
                        borderColor: locationfieldColor,
                      }}
                    />
                    {locationError && (
                      <strong className="text-danger">{locationError}</strong>
                    )}
                  </div>
                  {/* date-------------------------------------------------- */}
                  <div className="col-md-12 form-group pb-2">
                    <label htmlFor="foundedDate">Founded Date</label>
                    <input
                      className="form-control custom-placeholder academyCreateInput"
                      type="date"
                      id="foundedDate"
                      value={FoundedYear}
                      onChange={(e) => handleDate(e)}
                      style={{
                        borderColor: datefieldColor,
                      }}
                    />
                    {foundedDateError && (
                      <strong className="text-danger">
                        {foundedDateError}
                      </strong>
                    )}
                  </div>
                  {/* logo ---------------------------------------- */}
                  <div className="row" style={{ margin: "0px" }}>
                    <div className="col-md-11 form-group pb-2">
                      <label htmlFor="logoInput">Upload Logo</label>
                      <input
                        className="form-control custom-placeholder academyCreateInput"
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
                      />
                      {logoError && (
                        <strong className="text-danger">{logoError}</strong>
                      )}
                    </div>
                    <div className="col-md-1 align-self-center">
                      <img src={Logo.myLogo} style={{ maxWidth: "60px" }} />
                    </div>
                  </div>
                  {/* L documents --------------------------------------*/}
                  <div className="row" style={{ margin: "0px" }}>
                    <div className="col-md-11 form-group pb-2">
                      <label htmlFor="fileInput">
                        Upload Legitimacy Documents
                      </label>
                      <input
                        className="form-control custom-placeholder academyCreateInput "
                        type="file"
                        id="fileInput"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          handleDocsUpload(e);
                          handleDocs(e);
                        }}
                        style={{ borderColor: docsfieldColor }}
                      />
                      {docsError && (
                        <strong className="text-danger">{docsError}</strong>
                      )}
                    </div>
                    <div className="col-md-1 align-self-center">
                      <Button variant="success" size="lg" onClick={handleShow}>
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

                  {/* submit ------------------------------------------- */}
                  <div className="col-md-12 form-group ">
                    <input
                      type="submit"
                      className="btn btn-success py-3 px-5 btn-block"
                      value="add academy "
                      onClick={handleSaveChanges}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAcademy;
