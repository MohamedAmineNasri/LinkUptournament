import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { addTeam } from "../redux/slice/teamSlice";
import { useDispatch } from "react-redux";
import { convertToBase64 } from "../utilities/convertFileBase64";

export const AddTeamPopUpWindow = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  //add logic
  const [Name, setName] = useState("");
  const [Logo, setLogo] = useState("");

  const [nameError, setNameError] = useState("Academy Name is require");
  const [logoError, setlogoError] = useState(
    "if you don't upload a team logo, the academy Logo will be selected instead."
  );

  const [namefieldColor, setnamefieldColor] = useState("red");
  const [logofieldColor, setlogofieldColor] = useState("green");
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

  //handle Logo
  const handleLogo = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setLogo(base64);
      console.log(editedLogo);
    }
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (!nameError) {
      dispatch(
        addTeam({
          idAcademy: props.id,
          name: Name,
          logo: Logo,
        })
      );
      handleClose();
    }
  };

  return (
    <>
      <Button
        variant="success"
        onClick={handleShow}
        style={{ width: "-webkit-fill-available" }}
      >
        Add Team
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="popUpWindowBlackColor" closeButton>
          <Modal.Title>Add Team</Modal.Title>
        </Modal.Header>
        <Modal.Body className="popUpWindowBlackColor">
          <Form className="popUpWindowBlackColor">
            <Form.Group className="mb-3" controlId="nameInput">
              <Form.Label className="popUpWindowLabelColor">
                Team Name :{" "}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Team name"
                autoFocus
                value={Name}
                onChange={(e) => handleName(e)}
                style={{ borderColor: namefieldColor }}
              />
              {nameError && (
                <strong className="text-danger">{nameError}</strong>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="locationInput">
              <Form.Label className="popUpWindowLabelColor">
                Team Logo :
              </Form.Label>
              <Form.Control
                type="file"
                placeholder="Team Logo"
                autoFocus
                onChange={(e) => handleLogo(e)}
                style={{
                  borderColor: logofieldColor,
                }}
              />
              {logoError && (
                <strong className="text-warning">{logoError}</strong>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="popUpWindowBlackColor">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTeamPopUpWindow;
