import React from "react";
import { useDispatch } from "react-redux";
import { addnewAcademy } from "../redux/slice/academySlice";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";

export const AddAcademy = () => {
  const [Name, setName] = useState("");
  const [Location, setLocation] = useState("");
  const [Logo, setLogo] = useState("");
  const [FoundedYear, setFoundedYear] = useState("");
  const [Docs, setDoc] = useState("");
  //Alert
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const dispatch = useDispatch();
  const handleSaveChanges = (e) => {
    // for refrech bug
    e.preventDefault();
    dispatch(
      addnewAcademy({
        name: Name,
        location: Location,
        logo: Logo,
        foundedYear: FoundedYear,
        doc: Docs,
      })
    );
    //Alert
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      window.location.href = "http://127.0.0.1:5173/Academy";
    }, 3000);
  };
  return (
    <div className="site-wrap">
      <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close">
            <span className="icon-close2 js-menu-toggle"></span>
          </div>
        </div>
        <div className="site-mobile-menu-body"></div>
      </div>
      {submitSuccess && (
        <Alert variant="success">Academy added successfully!</Alert>
      )}
      <br></br>
      <div className="site-section">
        <div className="container">
          <div
            className="row-wrapper"
            style={{
              backgroundColor: "#222831",
              boxShadow: "10px 10px 30px rgba(1, 0, 0, 0.5)",
              paddingTop: "30px",
              paddingBottom: "30px",
              paddingLeft: "5px",
              paddingRight: "5px",
              borderRadius: "40px",
            }}
          >
            <div
              className="row"
              style={{ alignItems: "center", justifyContent: "space-evenly" }}
            >
              <div className="col-lg-5 order-lg-1 ">
                <img
                  src="/public/assets/images/foot.jpg"
                  alt="Logo"
                  className="img-fluid "
                  style={{ borderRadius: "20px" }}
                  width="96%"
                />
              </div>
              <div className="col-lg-6 order-lg-2">
                <h1>Add You're Academy !</h1>
                <form action="#">
                  <div className="row">
                    <div className="col-md-12 form-group">
                      <label htmlFor="Aname">Academy Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="Aname"
                        placeholder="Academy Name"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <label htmlFor="location">Academy Location:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        placeholder="Location"
                        value={Location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <label htmlFor="foundedDate">Founded Date:</label>
                      <input
                        type="date"
                        className="form-control"
                        id="foundedDate"
                        value={FoundedYear}
                        onChange={(e) => setFoundedYear(e.target.value)}
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <label htmlFor="logoInput">Upload Logo:</label>
                      <input
                        type="file"
                        className="form-control-file"
                        id="logoInput"
                        accept=".jpg,.jpeg,.png,.pdf"
                        value={Logo}
                        onChange={(e) => setLogo(e.target.value)}
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <label htmlFor="fileInput">
                        Upload Legitimacy Documents:
                      </label>
                      <input
                        type="file"
                        className="form-control-file"
                        id="fileInput"
                        accept=".pdf,.doc,.docx"
                        value={Docs}
                        onChange={(e) => setDoc(e.target.value)}
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <input
                        type="submit"
                        className="btn btn-primary py-3 px-5 btn-block"
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

export default AddAcademy;
