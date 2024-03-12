import React from "react";
import { useDispatch } from "react-redux";
import { addnewMatch } from "../redux/slice/matchSlice";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";

export const AddMatch = () => {
  //fields state
  const [Time, setTime] = useState(null);
  const [Type, setType] = useState(null);


  const dispatch = useDispatch();

  //Alert
  const [submitSuccess, setSubmitSuccess] = useState(false);

  //validator
  const [TimeError, setNameError] = useState("Time Name is require");
  const [TypeError, setLocationError] = useState("Type is required");
  

  //submit logic
  const handleSaveChanges = (e) => {
    e.preventDefault(); // for refrech bug

    //Validators
    // Validation for name
  
    // Validation for Location
    

    // Validation for Founded Date
    
     {
      dispatch(
        addnewMatch({
          time: Time,
        
          type: Type,
        })
      );
      //Alert
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        window.location.href = "http://127.0.0.1:5173/match";
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

      {/* Hero image */}
      <div
        className="hero overlay2 "
        style={{
          backgroundImage: "url('/assets/images/2.jpg')",
          paddingTop: "100px",
          height: "1300px",
        }}
      >
        {/* sucess msg when academy created "condional" */}
        <div>
          {submitSuccess && (
            <Alert variant="success">match added successfully!</Alert>
          )}
        </div>

        <div className="col-lg-12">
          <h1
            className="col-md-12 pb-5 pt-5"
            style={{
              textShadow: "5px 2px 0px #1db428e6",
              textAlign: "-webkit-center",
              fontSize: "5rem",
            }}
          >
            Add You're match
          </h1>
        </div>
        {/* form inside the hero image  */}
        <div className=" container col-lg-8 pt-5">
          <div
            style={{
              borderRadius: "40px",
            }}
          >
            <div
              style={{
                boxShadow: "1px 1px 30px 10px rgba(1, 0, 0, 0.5)",
                backgroundColor: "#2f4f4f6b",
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingTop: "20px",
                paddingBottom: "20px",
                borderRadius: "40px",
              }}
            >
              <div className="col-lg-12">
                <form action="#">
                  <div className="">
                    {/* name */}
                    <div className="col-md-12 form-group pb-2 pt-3">
                      <label htmlFor="Aname">match time</label>
                      <input
                        style={{
                          height: "60px",
                        }}
                        type="text"
                        className="form-control custom-placeholder"
                        id="Aname"
                        placeholder="Enter the name of the academy"
                        value={Time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                      {TimeError && (
                        <medium className="text-danger">{TimeError}</medium>
                      )}
                    </div>
                    {/* location */}
                    <div className="col-md-12 form-group pb-2">
                      <label htmlFor="location">match type</label>
                      <input
                        style={{
                          height: "60px",
                        }}
                        type="text"
                        className="form-control custom-placeholder"
                        id="location"
                        placeholder="Enter the Location of the academy"
                        value={Type}
                        onChange={(e) => setType(e.target.value)}
                      />
                      {TypeError && (
                        <medium className="text-danger">{TypeError}</medium>
                      )}
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
    </div>
  );
};

export default AddMatch;