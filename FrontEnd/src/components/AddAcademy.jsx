import React from "react";
import { useDispatch } from "react-redux";
import { addnewAcademy } from "../redux/slice/academySlice";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";

export const AddAcademy = () => {
  //fields state
  const [Name, setName] = useState(null);
  const [Location, setLocation] = useState(null);
  const [Logo, setLogo] = useState(null);
  const [FoundedYear, setFoundedYear] = useState(null);
  const [Docs, setDoc] = useState(null);

  const dispatch = useDispatch();

  //Alert
  const [submitSuccess, setSubmitSuccess] = useState(false);

  //validator states
  const [nameError, setNameError] = useState("Academy Name is require");
  const [locationError, setLocationError] = useState("Location is required");
  const [foundedDateError, setFoundedDateError] = useState(
    "Founded Date is required"
  );
  //fields colors states
  const [namefieldColor, setnamefieldColor] = useState("red");
  const [locationfieldColor, setlocationfieldColor] = useState("red");
  const [datefieldColor, setdatefieldColor] = useState("red");

  //submit logic
  const handleSaveChanges = (e) => {
    e.preventDefault(); // for refrech bug
    //Validators
    // Validation for name
    if (Name != null) {
      // it won't work if Name is null and we do trim()
      if (!Name.trim()) {
        setNameError("Academy Name is required");
        setnamefieldColor("red");
      } else if (!/^[a-zA-Z\s]+$/.test(Name)) {
        setNameError("Academy Name should contain only alphabetic characters");
        setnamefieldColor("red");
      } else if (Name.trim().length <= 8) {
        setNameError("Academy Name should be at least 8 characters long");
        setnamefieldColor("red");
      } else {
        setNameError(null);
        setnamefieldColor("green");
      }
    }
    // Validation for Location
    if (Location != null) {
      if (!Location.trim()) {
        setLocationError("Location is required");
        setlocationfieldColor("red");
      } else {
        setLocationError(null);
        setlocationfieldColor("green");
      }
    }

    // Validation for Founded Date
    if (!FoundedYear) {
      setFoundedDateError("Founded Date is required");
      setdatefieldColor("red");
    } else {
      setFoundedDateError(null);
      setdatefieldColor("green");
    }
    if (
      nameError == null &&
      Name.trim() != null &&
      locationError == null &&
      Location.trim() != null &&
      foundedDateError == null &&
      FoundedYear != null
    ) {
      dispatch(
        addnewAcademy({
          name: Name,
          location: Location,
          logo: Logo,
          foundedYear: FoundedYear,
          doc: Docs,
        })
      );
      //Alert ----------------------
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        window.location.href = "http://127.0.0.1:5173/Academy";
      }, 3000);
    }
  };
  return (
    <div>
      <div>
        <header className="site-navbar py-4" role="banner">
          <div className="container">
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
                      <a href="index.html" className="nav-link">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="matches.html" className="nav-link">
                        Matches
                      </a>
                    </li>
                    <li>
                      <a href="players.html" className="nav-link">
                        Players
                      </a>
                    </li>
                    <li className="active">
                      <a href="blog.html" className="nav-link">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="contact.html" className="nav-link">
                        Contact
                      </a>
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
      <div className="hero overlay2 HeroImageAddAcademy">
        {/* sucess msg when academy created "condional" */}
        <div>
          {submitSuccess && (
            <Alert className="alertModified" variant="success">
              Academy added successfully!
            </Alert>
          )}
        </div>

        <div className="col-lg-12">
          <h1 className="col-md-12 pb-5 pt-5 TitleAddAcademy">
            Add You're Academy
          </h1>
        </div>
        {/* form inside the hero image ------------------------  */}
        <div className=" container col-lg-8 pt-5">
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
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        borderColor: namefieldColor,
                      }}
                    />
                    {nameError && (
                      <medium className="text-danger">{nameError}</medium>
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
                      onChange={(e) => setLocation(e.target.value)}
                      style={{
                        borderColor: locationfieldColor,
                      }}
                    />
                    {locationError && (
                      <medium className="text-danger">{locationError}</medium>
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
                      onChange={(e) => setFoundedYear(e.target.value)}
                      style={{
                        borderColor: datefieldColor,
                      }}
                    />
                    {foundedDateError && (
                      <medium className="text-danger">
                        {foundedDateError}
                      </medium>
                    )}
                  </div>
                  {/* logo */}
                  <div className="col-md-12 form-group pb-2">
                    <label htmlFor="logoInput">Upload Logo</label>
                    <input
                      className="form-control custom-placeholder academyCreateInput"
                      type="file"
                      id="logoInput"
                      accept=".jpg,.jpeg,.png"
                      value={Logo}
                      onChange={(e) => setLogo(e.target.value)}
                    />
                  </div>
                  {/* L documents */}
                  <div className="col-md-12 form-group pb-2">
                    <label htmlFor="fileInput">
                      Upload Legitimacy Documents
                    </label>
                    <input
                      className="form-control custom-placeholder academyCreateInput "
                      type="file"
                      id="fileInput"
                      accept=".pdf,.doc,.docx"
                      value={Docs}
                      onChange={(e) => setDoc(e.target.value)}
                    />
                  </div>
                  {/* submit  */}
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
